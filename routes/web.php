<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/products',[ProductController::class,'index'])->name('products.index');
    Route::post('/products',[ProductController::class,'store'])->name('products.store');
    Route::get('/products/create', [ProductController::class,'create'])->name('products.create');
    
});

require __DIR__.'/settings.php';
