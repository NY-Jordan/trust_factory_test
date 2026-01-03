<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'price_at_purchase'
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    /**
     * Get the product associated with this cart item
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the cart associated with this cart item
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }
}
