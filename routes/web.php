<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminRegisterController;
use App\Http\Controllers\LemonSqueezyController;
use App\Models\User;
use App\Models\VisitorLog;

Fortify::redirects('login', '/dashboard');

if (!defined('HOME')) {
    define('HOME', '/dashboard');
}

Route::bind('product', fn($value) => User::findOrFail($value));

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [ProductController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/setup', [ProductController::class, 'create'])->name('dashboard.create');
    Route::post('/dashboard/setup', [ProductController::class, 'store'])->name('dashboard.store');
    Route::get('/dashboard/{product}/edit', [ProductController::class, 'edit'])->name('dashboard.edit');
    Route::match(['POST', 'PUT'], '/dashboard/{product}', [ProductController::class, 'update'])->name('dashboard.update');
    Route::delete('/dashboard/{product}', [ProductController::class, 'destroy'])->name('dashboard.destroy');

    Route::middleware(['admin'])->group(function () {
        Route::resource('products', ProductController::class);
    });
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/register-admin', [AdminRegisterController::class, 'create'])->name('register.admin');
    Route::post('/register-admin', [AdminRegisterController::class, 'store'])->name('register.admin.store');
});

// ─────────────────────────────────────────────
// Lemon Squeezy
// ─────────────────────────────────────────────

// Redirect user to Lemon Squeezy checkout (pre-filled with their email)
Route::middleware('auth')->get('/subscribe', function () {
    $user = auth()->user();
    $base = env('LEMONSQUEEZY_STORE_URL');
    $url  = $base
        . '?checkout[email]=' . urlencode($user->email)
        . '&checkout[name]='  . urlencode($user->name);
    return redirect()->away($url);
})->name('subscribe');

// After successful payment, redirect back to dashboard
Route::middleware('auth')->get('/subscribe/success', function () {
    return redirect()->route('dashboard')->with('message', 'Subscription activated! Your store is now live.');
})->name('subscribe.success');

// Webhook — no auth, no CSRF (covered by signature verification inside controller)
Route::post('/api/webhooks/lemonsqueezy', [LemonSqueezyController::class, 'webhook'])
    ->name('webhooks.lemonsqueezy');

// ─────────────────────────────────────────────
// Public API — no auth, called by Shopify
// ─────────────────────────────────────────────

Route::options('/api/{any}', function () {
    return response('', 204)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
})->where('any', '.*');

// Get store profile + images
Route::get('/api/store-profile/{id}', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    $fallback = 'https://naturepackaged.myshopify.com/cart';

    $images = collect([1, 2, 3, 4, 5, 6])
        ->map(fn($i) => $user->{"image$i"} ? [
            'url'          => Storage::url($user->{"image$i"}),
            'checkout_url' => $user->{"checkout_url$i"} ?: $fallback,
            'price'        => $user->price,
        ] : null)
        ->filter()
        ->values();

    return response()->json([
        'name'        => $user->name,
        'description' => $user->description,
        'price'       => $user->price,
        'images'      => $images,
    ])->header('Access-Control-Allow-Origin', '*');
})->name('api.store.profile');

// Track profile view — records image_index
Route::post('/api/store-profile/{id}/view', function ($id, Request $request) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    $user->increment('profile_views');

    DB::table('profile_events')->insert([
        'user_id'     => $user->id,
        'type'        => 'view',
        'image_index' => $request->input('image_index') ?? null,
        'created_at'  => now(),
        'updated_at'  => now(),
    ]);

    return response()->json(['views' => $user->profile_views])
        ->header('Access-Control-Allow-Origin', '*');
});

// Track checkout click
Route::post('/api/store-profile/{id}/checkout', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    $user->increment('profile_checkouts');

    DB::table('profile_events')->insert([
        'user_id'    => $user->id,
        'type'       => 'checkout',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json(['checkouts' => $user->profile_checkouts])
        ->header('Access-Control-Allow-Origin', '*');
});

// Get filtered stats + calendar data + per-image daily views
Route::get('/api/store-profile/{id}/stats', function ($id, Request $request) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    $filter = $request->query('filter', 'today');
    $from   = $request->query('from');
    $to     = $request->query('to');

    $query = DB::table('profile_events')->where('user_id', $user->id);

    $query->when($filter === 'today', fn($q) => $q->whereDate('created_at', today()));
    $query->when($filter === 'week',  fn($q) => $q->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]));
    $query->when($filter === 'month', fn($q) => $q->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year));
    $query->when($filter === 'range' && $from && $to, fn($q) => $q->whereBetween('created_at', [$from . ' 00:00:00', $to . ' 23:59:59']));

    $views     = (clone $query)->where('type', 'view')->count();
    $checkouts = (clone $query)->where('type', 'checkout')->count();

    $dailyQuery = DB::table('profile_events')->where('user_id', $user->id);

    if ($filter === 'range' && $from && $to) {
        $dailyQuery->whereBetween('created_at', [$from . ' 00:00:00', $to . ' 23:59:59']);
    } elseif ($filter === 'week') {
        $dailyQuery->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
    } elseif ($filter === 'today') {
        $dailyQuery->whereDate('created_at', today());
    } else {
        $dailyQuery->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year);
    }

    $daily = $dailyQuery
        ->selectRaw('DATE(created_at) as date, type, COUNT(*) as count')
        ->groupBy(DB::raw('DATE(created_at)'), 'type')
        ->orderBy(DB::raw('DATE(created_at)'))
        ->get()
        ->map(function ($item) {
            $item->date = \Carbon\Carbon::parse($item->date)->format('Y-m-d');
            return $item;
        });

    $imageViews = DB::table('profile_events')
        ->where('user_id', $user->id)
        ->where('type', 'view')
        ->whereDate('created_at', today())
        ->whereNotNull('image_index')
        ->selectRaw('image_index, COUNT(*) as count')
        ->groupBy('image_index')
        ->get()
        ->pluck('count', 'image_index');

    return response()->json([
        'views'       => $views,
        'checkouts'   => $checkouts,
        'daily'       => $daily,
        'filter'      => $filter,
        'image_views' => $imageViews,
    ])->header('Access-Control-Allow-Origin', '*');
})->name('api.store.stats');

// ─────────────────────────────────────────────
// Shopify Orders Webhook
// ─────────────────────────────────────────────
Route::post('/api/webhooks/shopify/orders', function (Request $request) {

    $secret   = env('SHOPIFY_WEBHOOK_SECRET');
    $hmac     = $request->header('X-Shopify-Hmac-Sha256');
    $body     = $request->getContent();
    $computed = base64_encode(hash_hmac('sha256', $body, $secret, true));

    if (!hash_equals($computed, $hmac ?? '')) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $order = $request->json()->all();

    $landingSite = $order['landing_site'] ?? null;
    $userId      = null;

    $cartAttributes = $order['cart_attributes'] ?? $order['note_attributes'] ?? [];
    foreach ($cartAttributes as $attr) {
        if (($attr['name'] ?? '') === 'utm_user' && !empty($attr['value'])) {
            $userId = (int) $attr['value'];
            break;
        }
    }

    if (!$userId && $landingSite && $landingSite !== '/') {
        $qs = [];
        parse_str(parse_url($landingSite, PHP_URL_QUERY) ?? '', $qs);
        if (!empty($qs['utm_user'])) {
            $userId = (int) $qs['utm_user'];
        }
    }

    if (!$userId) {
        return response()->json(['ok' => true, 'skipped' => 'no utm_user']);
    }

    $user = User::find($userId);
    if (!$user || !$user->subscription) {
        return response()->json(['ok' => true, 'skipped' => 'user not found or not subscribed']);
    }

    $shopifyOrderId = (string) ($order['id'] ?? '');
    if (DB::table('shopify_orders')->where('shopify_order_id', $shopifyOrderId)->exists()) {
        return response()->json(['ok' => true, 'skipped' => 'duplicate']);
    }

    $firstName     = $order['billing_address']['first_name'] ?? $order['customer']['first_name'] ?? '';
    $lastName      = $order['billing_address']['last_name']  ?? $order['customer']['last_name']  ?? '';
    $customerName  = trim("$firstName $lastName") ?: null;
    $customerEmail = $order['email'] ?? $order['customer']['email'] ?? null;

    $lineItems = collect($order['line_items'] ?? [])->map(fn($item) => [
        'name'     => $item['name']     ?? '',
        'quantity' => $item['quantity'] ?? 1,
        'price'    => $item['price']    ?? '0.00',
    ])->values()->all();

    DB::table('shopify_orders')->insert([
        'user_id'          => $userId,
        'shopify_order_id' => $shopifyOrderId,
        'customer_name'    => $customerName,
        'customer_email'   => $customerEmail,
        'total_price'      => (float) ($order['total_price'] ?? 0),
        'line_items'       => json_encode($lineItems),
        'landing_site'     => $landingSite,
        'ordered_at'       => isset($order['created_at'])
                                ? \Carbon\Carbon::parse($order['created_at'])->toDateTimeString()
                                : now(),
        'created_at'       => now(),
        'updated_at'       => now(),
    ]);

    return response()->json(['ok' => true]);
});

// ─────────────────────────────────────────────
// Orders API — authenticated, for dashboard
// ─────────────────────────────────────────────
Route::middleware('auth')->get('/api/orders', function (Request $request) {
    $user = auth()->user();

    $query = DB::table('shopify_orders')
        ->where('user_id', $user->id)
        ->orderByDesc('ordered_at');

    $from = $request->query('from');
    $to   = $request->query('to');
    if ($from) $query->where('ordered_at', '>=', $from . ' 00:00:00');
    if ($to)   $query->where('ordered_at', '<=', $to   . ' 23:59:59');

    $total   = (clone $query)->count();
    $revenue = (clone $query)->sum('total_price');
    $orders  = (clone $query)->paginate(20);

    return response()->json([
        'total'   => $total,
        'revenue' => round((float) $revenue, 2),
        'orders'  => $orders,
    ]);
});

// ─────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────
Route::get('/contact-us', [\App\Http\Controllers\ContactController::class, 'index'])->name('contact-us');
Route::get('/terms-of-service', fn() => inertia('terms-of-service'))->name('terms-of-service');
Route::get('/privacy-policy', fn() => inertia('privacy-policy'))->name('privacy-policy');
Route::get('/refund-policy', fn() => inertia('refund-policy'))->name('refund-policy');
Route::post('/contact-us', [\App\Http\Controllers\ContactController::class, 'send'])->name('contact-us.send');
Route::get('/pricing', fn() => inertia('pricing'))->name('pricing');

// ─────────────────────────────────────────────
// Visitor logs
// ─────────────────────────────────────────────
Route::middleware('auth')->get('/api/visitor-logs', function () {
    abort_unless(auth()->user()->user_type === 'admin', 403);
    return VisitorLog::latest()->get();
});

Route::post('/api/visitor-location', function (Request $request) {
    $log = \App\Models\VisitorLog::where('ip', $request->ip())
        ->latest()
        ->first();

    if ($log) {
        $log->update([
            'precise_lat'      => $request->input('lat'),
            'precise_lon'      => $request->input('lon'),
            'precise_accuracy' => $request->input('accuracy'),
        ]);
    }

    return response()->json(['ok' => true]);
});

require __DIR__.'/settings.php';