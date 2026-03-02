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

// Get store profile + images
Route::get('/api/store-profile/{id}', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403);
    }

    return response()->json([
        'name'         => $user->name,
        'description'  => $user->description,
        'price'        => $user->price,
        'images'       => collect(['image1','image2','image3','image4','image5','image6'])
            ->map(fn($key) => $user->$key ? Storage::url($user->$key) : null)
            ->filter()
            ->values(),
        'checkout_url' => 'https://naturepackaged.myshopify.com/cart',
    ]);
})->name('api.store.profile');

// Track profile view
Route::post('/api/store-profile/{id}/view', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403);
    }

    $user->increment('profile_views');

    DB::table('profile_events')->insert([
        'user_id'    => $user->id,
        'type'       => 'view',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json(['views' => $user->profile_views]);
});

// Track checkout click
Route::post('/api/store-profile/{id}/checkout', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403);
    }

    $user->increment('profile_checkouts');

    DB::table('profile_events')->insert([
        'user_id'    => $user->id,
        'type'       => 'checkout',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json(['checkouts' => $user->profile_checkouts]);
});

// Get filtered stats + calendar data
Route::get('/api/store-profile/{id}/stats', function ($id, Request $request) {
    $user = User::findOrFail($id);

    if (!$user->subscription) {
        return response()->json(['error' => 'Store not connected.'], 403);
    }

    $filter = $request->query('filter', 'today');

    $query = DB::table('profile_events')->where('user_id', $user->id);

    $query->when($filter === 'today', fn($q) => $q->whereDate('created_at', today()));
    $query->when($filter === 'week',  fn($q) => $q->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]));
    $query->when($filter === 'month', fn($q) => $q->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year));

    $views     = (clone $query)->where('type', 'view')->count();
    $checkouts = (clone $query)->where('type', 'checkout')->count();

    // Daily breakdown for calendar (always current month)
    $daily = DB::table('profile_events')
        ->where('user_id', $user->id)
        ->whereMonth('created_at', now()->month)
        ->whereYear('created_at', now()->year)
        ->selectRaw('DATE(created_at) as date, type, COUNT(*) as count')
        ->groupBy('date', 'type')
        ->get();

    return response()->json([
        'views'     => $views,
        'checkouts' => $checkouts,
        'daily'     => $daily,
        'filter'    => $filter,
    ]);
})->name('api.store.stats');

require __DIR__.'/settings.php';