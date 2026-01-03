<?php

namespace App\Jobs;

use App\Mail\DailySalesReport;
use App\Models\CartItem;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendDailySalesReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const ADMIN_EMAIL = 'admin@example.com';

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $today = Carbon::now()->startOfDay();

        // Get all items sold today with product details
        $items = CartItem::whereBetween('created_at', [
            $today,
            $today->copy()->endOfDay(),
        ])
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->get();

        if ($items->isEmpty()) {
            return; // Don't send if no sales
        }

        // Group by product and calculate stats
        $salesByProduct = $items->groupBy('product_id')->map(fn($productItems) => [
            'product_name' => $productItems->first()->product->name,
            'product_id' => $productItems->first()->product_id,
            'total_quantity' => $productItems->sum('quantity'),
            'unit_price' => $productItems->first()->price_at_purchase,
            'total_revenue' => $productItems->sum(fn($item) => $item->quantity * $item->price_at_purchase),
            'sold_count' => $productItems->count(), // Number of separate sales
        ])->sortByDesc('total_revenue')->values();

        $stats = [
            'total_products_sold' => $salesByProduct->count(),
            'total_units_sold' => $items->sum('quantity'),
            'total_revenue' => $items->sum(fn($item) => $item->quantity * $item->price_at_purchase),
            'total_transactions' => $items->count(),
        ];

        Mail::to(self::ADMIN_EMAIL)->send(
            new DailySalesReport($salesByProduct, $stats, $today)
        );
    }
}
