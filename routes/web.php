<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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


// Define HOME constant for post-login redirect
if (!defined('HOME')) {
    define('HOME', '/dashboard');
}

// Tell Laravel to resolve {product} route segments as User model rows.
Route::bind('product', fn($value) => User::findOrFail($value));

// Public home
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Authenticated routes - REMOVED 'verified' middleware for testing
Route::middleware(['auth'])->group(function () {

    // /dashboard  → store profile for 'user' type (this is their products page)
    Route::get('/dashboard', [ProductController::class, 'index'])->name('dashboard');

    // /dashboard/setup → 'user' type sets up their profile
    Route::get('/dashboard/setup', [ProductController::class, 'create'])->name('dashboard.create');
    Route::post('/dashboard/setup', [ProductController::class, 'store'])->name('dashboard.store');

    // /dashboard/{product}/edit → 'user' type edits their own profile
    Route::get('/dashboard/{product}/edit', [ProductController::class, 'edit'])->name('dashboard.edit');
    Route::match(['POST', 'PUT'], '/dashboard/{product}', [ProductController::class, 'update'])->name('dashboard.update');
    Route::delete('/dashboard/{product}', [ProductController::class, 'destroy'])->name('dashboard.destroy');

    // /products/* → admin only; 'user' type gets 403
    Route::middleware(['admin'])->group(function () {
        Route::resource('products', ProductController::class);
    });
});

// Admin-only routes - REMOVED 'verified' middleware for testing
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/register-admin', [AdminRegisterController::class, 'create'])
        ->name('register.admin');

    Route::post('/register-admin', [AdminRegisterController::class, 'store'])
        ->name('register.admin.store');
});

// Public API - no auth, called by Shopify
Route::get('/api/store-profile/{user}', function (User $user) {
    return response()->json([
        'name'        => $user->name,
        'description' => $user->description,
        'price'       => $user->price,
        'images'      => collect(['image1','image2','image3','image4','image5','image6'])
            ->map(fn($key) => $user->$key ? Storage::url($user->$key) : null)
            ->filter()
            ->values(),
        'checkout_url' => 'https://your-shopify-store.myshopify.com/cart', // or dynamic
    ]);
})->name('api.store.profile');


Route::post('/api/store-profile/{id}/view', function ($id) {
    $user = User::findOrFail($id);
    $user->increment('profile_views');
    return response()->json(['views' => $user->profile_views]);
});

// Track checkout click
Route::post('/api/store-profile/{id}/checkout', function ($id) {
    $user = User::findOrFail($id);
    $user->increment('profile_checkouts');
    return response()->json(['checkouts' => $user->profile_checkouts]);
});


require __DIR__.'/settings.php';