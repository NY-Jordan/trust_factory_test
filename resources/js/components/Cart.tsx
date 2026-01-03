import { CartItem } from '@/domain/entities/cart.entities';
import { ShoppingCart, Trash2, Plus, Minus, Loader } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';


interface CartProps {
    items: CartItem[];
    onRemove: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
}

export const Cart = ({ items, onRemove, onUpdateQuantity }: CartProps) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            router.post('/api/cart/checkout', {}, {
                onSuccess: () => {
                    setIsCheckingOut(false);
                },
                onError: (errors) => {
                    console.error('Checkout error:', errors);
                    setIsCheckingOut(false);
                },
            });
        } catch (error) {
            console.error('Checkout failed:', error);
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart size={28} />
                Shopping Cart
            </h2>

            {items.length === 0 ? (
                <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-2">Add products to get started!</p>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                {/* Item Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />

                                {/* Item Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-blue-600 font-bold text-lg">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                                            title="Decrease quantity"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-3 py-1 bg-white border border-gray-300 rounded font-semibold min-w-12 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                                            title="Increase quantity"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="text-red-500 hover:text-red-700 transition p-2"
                                    title="Remove from cart"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-700">Subtotal ({items.length} items):</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-700">Shipping:</span>
                            <span className="font-semibold">
                                {shipping === 0 ? (
                                    <span className="text-green-600">Free</span>
                                ) : (
                                    `$${shipping.toFixed(2)}`
                                )}
                            </span>
                        </div>
                        {subtotal <= 100 && (
                            <p className="text-xs text-green-600 text-center py-2 bg-green-50 rounded">
                                Free shipping on orders over $100!
                            </p>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-700">Tax (10%):</span>
                            <span className="font-semibold">${tax.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut || items.length === 0}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isCheckingOut && <Loader size={20} className="animate-spin" />}
                        {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                    </button>

                    <button className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                        Continue Shopping
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;


