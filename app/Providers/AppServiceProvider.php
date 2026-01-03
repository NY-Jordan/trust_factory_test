<?php

namespace App\Providers;

use App\Models\Product;
use App\Observers\ProductObserver;
use App\Services\CartService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register Product observer
        Product::observe(ProductObserver::class);

        Inertia::share([
            'auth' => [
                'user' => fn () => Auth::user(),
            ],
            'cart' => fn () => Auth::check()
                ? app(CartService::class)->getUserCartSummary(Auth::user())
                : null,
        ]);
    }
}
