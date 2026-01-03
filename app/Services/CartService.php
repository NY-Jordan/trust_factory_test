<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Collection;

class CartService
{
    /**
     * Get user's cart items from database
     */
    public function getUserCartItems(User $user): Collection
    {
        $cart = $user->cart()->first();

        if (!$cart) {
            return collect([]);
        }

        return $cart->items()
            ->with('product')
            ->get()
            ->map(fn ($cartItem) => [
                'id' => $cartItem->product_id,
                'name' => $cartItem->product->name,
                'price' => $cartItem->product->price,
                'image' => $cartItem->product->image,
                'description' => $cartItem->product->description,
                'stock' => $cartItem->product->stock,
                'quantity' => $cartItem->quantity,
                'cart_item_id' => $cartItem->id,
            ]);
    }

    /**
     * Get user's cart total from database
     */
    public function getUserCartTotal(User $user): float
    {
        return $this->getUserCartItems($user)
            ->sum(fn ($item) => $item['price'] * $item['quantity']);
    }

    /**
     * Get user's cart count from database
     */
    public function getUserCartCount(User $user): int
    {
        return $this->getUserCartItems($user)
            ->sum('quantity');
    }

    /**
     * Get user's cart summary from database
     */
    public function getUserCartSummary(User $user): array
    {
        $items = $this->getUserCartItems($user);
        $subtotal = $this->getUserCartTotal($user);
        $shipping = $subtotal > 100 ? 0 : 10;
        $tax = $subtotal * 0.1;

        return [
            'items' => $items->toArray(),
            'item_count' => $this->getUserCartCount($user),
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $subtotal + $shipping + $tax,
            'is_empty' => $items->isEmpty(),
        ];
    }

    /**
     * Add item to user's cart (database)
     */
    public function addUserCartItem(User $user, Product $product, int $quantity = 1): CartItem
    {
        $cart = $user->cart()->firstOrCreate(['status' => 'active']);

        $existingItem = $cart->items()
            ->where('product_id', $product->id)
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $quantity,
                'price_at_purchase' => $product->price,
            ]);
            return $existingItem;
        }

        return $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => $quantity,
            'price_at_purchase' => $product->price,
        ]);
    }

    /**
     * Update user's cart item quantity
     */
    public function updateUserCartItemQuantity(User $user, int $productId, int $quantity): bool
    {
        if ($quantity <= 0) {
            return $this->removeUserCartItem($user, $productId);
        }

        $cart = $user->cart()->first();

        if (!$cart) {
            return false;
        }

        return (bool) $cart->items()
            ->where('product_id', $productId)
            ->update(['quantity' => $quantity]);
    }

    /**
     * Remove item from user's cart
     */
    public function removeUserCartItem(User $user, int $productId): bool
    {
        $cart = $user->cart()->first();

        if (!$cart) {
            return false;
        }

        return (bool) $cart->items()
            ->where('product_id', $productId)
            ->delete();
    }

    /**
     * Clear user's cart
     */
    public function clearUserCart(User $user): bool
    {
        $cart = $user->cart()->first();

        if (!$cart) {
            return true;
        }

        return (bool) $cart->items()->delete();
    }

    /**
     * Decrement product stock after purchase
     */
    public function decrementProductStock(int $productId, int $quantity = 1): void
    {
        $product = Product::find($productId);

        if ($product && $product->stock >= $quantity) {
            $product->decrement('stock', $quantity);
        }
    }

    /**
     * Checkout: Process cart items and decrement stock
     */
    public function checkout(User $user): array
    {
        $cartItems = $this->getUserCartItems($user);

        if ($cartItems->isEmpty()) {
            return [
                'success' => false,
                'message' => 'Cart is empty',
            ];
        }

        // Validate stock availability
        foreach ($cartItems as $item) {
            $product = Product::find($item['id']);
            if (!$product || $product->stock < $item['quantity']) {
                $availableStock = $product?->stock ?? 0;
                return [
                    'success' => false,
                    'message' => "Insufficient stock for {$item['name']}. Available: {$availableStock}",
                ];
            }
        }

        // Decrement stock for each item
        foreach ($cartItems as $item) {
            $this->decrementProductStock($item['id'], $item['quantity']);
        }

        // Get order summary before clearing cart
        $orderSummary = $this->getUserCartSummary($user);

        // Clear the cart
        $this->clearUserCart($user);

        return [
            'success' => true,
            'message' => 'Order processed successfully',
            'order' => $orderSummary,
        ];
    }
}
