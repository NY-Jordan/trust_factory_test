import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '@/layouts/ecommerce-layout';

interface CartSidebarProps {
    items: CartItem[];
    isOpen: boolean;
    onRemove: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
}

export const CartSidebar = ({ items, isOpen, onRemove, onUpdateQuantity }: CartSidebarProps) => {
    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <aside className={`${isOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <ShoppingCart size={24} />
                    <span>Shopping Cart</span>
                </h2>

                {items.length === 0 ? (
                    <div className="text-center py-8">
                        <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 pb-4 border-b">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-blue-600 font-bold text-sm">
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="ml-auto text-red-500 hover:text-red-700 text-xs font-semibold"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Shipping:</span>
                                <span className="font-semibold">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                <span>Total:</span>
                                <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Checkout
                        </button>
                        <button
                            onClick={() => {
                                // Clear cart logic
                            }}
                            className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Clear Cart
                        </button>
                    </>
                )}
            </div>
        </aside>
    );
};

export default CartSidebar;
