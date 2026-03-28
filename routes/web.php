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
use App\Http\Controllers\ContactController;
use App\Models\User;

// Force Fortify to redirect to /dashboard after login
Fortify::redirects('login', '/dashboard');

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

if (!defined('HOME')) {
    define('HOME', '/dashboard');
}

Route::bind('product', fn($value) => User::findOrFail($value));

// Public home
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Authenticated routes
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

// Admin-only routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/register-admin', [AdminRegisterController::class, 'create'])
        ->name('register.admin');

    Route::post('/register-admin', [AdminRegisterController::class, 'store'])
        ->name('register.admin.store');
});

// ─────────────────────────────────────────────
// Public API — no auth, called by Shopify
// ─────────────────────────────────────────────

// CORS preflight for all API routes
Route::options('/api/{any}', function () {
    return response('', 204)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
})->where('any', '.*');

// Get store profile + images (each with its own checkout URL)
Route::get('/api/store-profile/{id}', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    // Priority: per-user default → global env fallback
    $fallback = $user->default_checkout_url
        ?: env('SHOPIFY_FALLBACK_URL', 'https://naturepackaged.myshopify.com/cart');

    $images = collect([1, 2, 3, 4, 5, 6])
        ->map(fn($i) => $user->{"image$i"} ? [
            'url'          => Storage::url($user->{"image$i"}),
            // Priority: per-image checkout URL → user's default → global fallback
            'checkout_url' => $user->{"checkout_url$i"} ?: $fallback,
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

// Track profile view
Route::post('/api/store-profile/{id}/view', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    $user->increment('profile_views');

    DB::table('profile_events')->insert([
        'user_id'    => $user->id,
        'type'       => 'view',
        'created_at' => now(),
        'updated_at' => now(),
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

// Get filtered stats + calendar data
Route::get('/api/store-profile/{id}/stats', function ($id, Request $request) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403)
            ->header('Access-Control-Allow-Origin', '*');
    }

    $filter = $request->query('filter', 'today');

    $query = DB::table('profile_events')->where('user_id', $user->id);

    if ($filter === 'today') {
        $query->whereDate('created_at', today());
    } elseif ($filter === 'week') {
        $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
    } elseif ($filter === 'month') {
        $query->whereMonth('created_at', now()->month)
              ->whereYear('created_at', now()->year);
    } elseif ($filter === 'range') {
        $from = $request->query('from');
        $to   = $request->query('to');

        if ($from && $to) {
            $query->whereDate('created_at', '>=', $from)
                  ->whereDate('created_at', '<=', $to);
        }
    }

    $views     = (clone $query)->where('type', 'view')->count();
    $checkouts = (clone $query)->where('type', 'checkout')->count();

    // Daily breakdown for calendar
    $dailyQuery = DB::table('profile_events')->where('user_id', $user->id);

    if ($filter === 'range') {
        $from = $request->query('from');
        $to   = $request->query('to');
        if ($from && $to) {
            $dailyQuery->whereDate('created_at', '>=', $from)
                       ->whereDate('created_at', '<=', $to);
        }
    } else {
        $dailyQuery->whereMonth('created_at', now()->month)
                   ->whereYear('created_at', now()->year);
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

    return response()->json([
        'views'     => $views,
        'checkouts' => $checkouts,
        'daily'     => $daily,
        'filter'    => $filter,
    ])->header('Access-Control-Allow-Origin', '*');
})->name('api.store.stats');

Route::get('/contact-us', [ContactController::class, 'index'])->name('contact-us');
Route::post('/contact-us', [ContactController::class, 'send'])->name('contact-us.send');


require __DIR__.'/settings.php';