<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminRegisterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public home
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Products
    Route::resource('products', ProductController::class);

    // ===============================
    // ADMIN REGISTRATION
    // ===============================
    Route::get('/register-admin', [AdminRegisterController::class, 'create'])
        ->name('register.admin');

    Route::post('/register-admin', [AdminRegisterController::class, 'store'])
        ->name('register.admin.store');
});

require __DIR__.'/settings.php';
