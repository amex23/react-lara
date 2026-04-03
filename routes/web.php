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
use App\Models\User;
use App\Models\VisitorLog;


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

    $fallback = 'https://naturepackaged.myshopify.com/cart';

    $images = collect([1, 2, 3, 4, 5, 6])
        ->map(fn($i) => $user->{"image$i"} ? [
            'url'          => Storage::url($user->{"image$i"}),
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

    $query->when($filter === 'today', fn($q) => $q->whereDate('created_at', today()));
    $query->when($filter === 'week',  fn($q) => $q->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]));
    $query->when($filter === 'month', fn($q) => $q->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year));

    $views     = (clone $query)->where('type', 'view')->count();
    $checkouts = (clone $query)->where('type', 'checkout')->count();

    // Daily breakdown for calendar - use DB::raw in groupBy to match selectRaw
    $daily = DB::table('profile_events')
        ->where('user_id', $user->id)
        ->whereMonth('created_at', now()->month)
        ->whereYear('created_at', now()->year)
        ->selectRaw('DATE(created_at) as date, type, COUNT(*) as count')
        ->groupBy(DB::raw('DATE(created_at)'), 'type')
        ->orderBy(DB::raw('DATE(created_at)'))
        ->get()
        ->map(function ($item) {
            // Ensure consistent Y-m-d format
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

Route::middleware('auth')->get('/api/visitor-logs', function () {
    abort_unless(auth()->user()->user_type === 'admin', 403);
    return VisitorLog::latest()->limit(100)->get();
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

Route::middleware('auth')->get('/api/visitor-logs', function () {
    abort_unless(auth()->user()->user_type === 'admin', 403);
    return VisitorLog::latest()->get();
});


require __DIR__.'/settings.php';