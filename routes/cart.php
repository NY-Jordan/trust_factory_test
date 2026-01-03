<?php

use App\Http\Controllers\UserCartController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('api/cart')->group(function () {
        Route::get('/', [UserCartController::class, 'index'])->name('cart.index');
        Route::get('/summary', [UserCartController::class, 'summary'])->name('cart.summary');
        Route::post('/add', [UserCartController::class, 'add'])->name('cart.add');
        Route::put('/update/{productId}', [UserCartController::class, 'update'])->name('cart.update');
        Route::delete('/remove/{productId}', [UserCartController::class, 'remove'])->name('cart.remove');
        Route::post('/clear', [UserCartController::class, 'clear'])->name('cart.clear');
        Route::post('/checkout', [UserCartController::class, 'checkout'])->name('cart.checkout');
    });
});
