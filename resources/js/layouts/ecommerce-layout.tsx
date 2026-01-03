import { useState } from 'react';
import { type ReactNode } from 'react';
import Header from '@/components/header';
import { usePage } from '@inertiajs/react';
import { CartSummary } from '@/domain/entities/cart.entities';
import { Cart } from '@/components/Cart';
import useUserCart from '@/hooks/use-user-cart';




interface AppLayoutProps {
    children: ReactNode;
}

const EcommerceLayout = ({ children }: AppLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = usePage().props as unknown as { cart: CartSummary };
    const { removeFromCart, updateQuantity } = useUserCart();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                cartCount={cart?.item_count || 0}
                onCartToggle={() => setIsCartOpen(!isCartOpen)}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            <main className="flex-1 w-full">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                        {/* Main content - 3 columns on desktop */}
                        <div className="lg:col-span-3">
                            {children}
                        </div>

                        {/* Cart sidebar - 2 columns on desktop, below on mobile */}
                        <div className="lg:col-span-2">
                            {isCartOpen && (
                                <div className="lg:sticky lg:top-24 h-fit">
                                    <Cart onRemove={removeFromCart} onUpdateQuantity={updateQuantity} items={cart.items} />
                                </div>
                            )}
                            {!isCartOpen && (
                                <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
                                    <Cart onRemove={removeFromCart} onUpdateQuantity={updateQuantity} items={cart.items} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EcommerceLayout;
