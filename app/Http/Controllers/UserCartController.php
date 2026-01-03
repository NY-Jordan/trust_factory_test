<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Support\Facades\Auth;

class UserCartController extends Controller
{
    public function __construct(private CartService $cartService){}

    /**
     * Add product to user's cart
     */
    public function add(AddToCartRequest $request)
    {
        $product = Product::findOrFail($request->product_id);
        $quantity = $request->quantity ?? 1;

        if ($product->stock < $quantity) {
            return response()->json([
                'success' => false,
                'message' => "Only {$product->stock} units available",
            ], 422);
        }

        $this->cartService->addUserCartItem(Auth::user(), $product, $quantity);

        return redirect()->back()->with('success', "{$product->name} added to cart");
    }

    /**
     * Update cart item quantity
     */
    public function update(UpdateCartRequest $request, int $productId)
    {
        if ($request->quantity === 0) {
            $this->cartService->removeUserCartItem(Auth::user(), $productId);
            $message = 'Item removed from cart';
        } else {
            $product = Product::findOrFail($productId);

            if ($product->stock < $request->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => "Only {$product->stock} units available",
                ], 422);
            }

            $this->cartService->updateUserCartItemQuantity(Auth::user(), $productId, $request->quantity);
            $message = 'Cart updated';
        }

        return redirect()->back()->with('success', $message);
    }

    /**
     * Remove item from cart
     */
    public function remove(int $productId)
    {
        $item = $this->cartService->getUserCartItems(Auth::user())
            ->firstWhere('id', $productId);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found in cart',
            ], 404);
        }

        $this->cartService->removeUserCartItem(Auth::user(), $productId);

        return redirect()->back()->with('success', "Item removed from cart");
    }

    /**
     * Checkout cart and process order
     */
    public function checkout()
    {
        $result = $this->cartService->checkout(Auth::user());

        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        }

        return redirect()->back()->withErrors(['checkout' => $result['message']]);
    }
}
