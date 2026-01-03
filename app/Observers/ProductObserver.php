<?php

namespace App\Observers;

use App\Jobs\NotifyLowStock;
use App\Models\Product;

class ProductObserver
{
    private const LOW_STOCK_THRESHOLD = 10;

    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        $this->checkAndNotifyLowStock($product);
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        // Check if stock was updated
        if ($product->isDirty('stock')) {
            $this->checkAndNotifyLowStock($product);
        }
    }

    /**
     * Check stock level and dispatch notification if needed
     */
    private function checkAndNotifyLowStock(Product $product): void
    {
        if ($product->stock <= self::LOW_STOCK_THRESHOLD && $product->stock > 0) {
            NotifyLowStock::dispatch($product);
        }
    }
}
