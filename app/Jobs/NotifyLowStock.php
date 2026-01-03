<?php

namespace App\Jobs;

use App\Mail\LowStockNotification;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class NotifyLowStock implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public const LOW_STOCK_THRESHOLD = 10;
    private const ADMIN_EMAIL = 'admin@example.com';

    /**
     * Create a new job instance.
     */
    public function __construct(private Product $product)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->product->stock <= self::LOW_STOCK_THRESHOLD && $this->product->stock > 0) {
            Mail::to(self::ADMIN_EMAIL)->send(
                new LowStockNotification($this->product)
            );
        }
    }
}
