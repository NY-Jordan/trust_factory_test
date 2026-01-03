import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import UserProfile from './user-profile';

interface HeaderProps {
    cartCount: number;
    onCartToggle: () => void;
    isMobileMenuOpen: boolean;
    onMobileMenuToggle: () => void;
}

export const Header = ({
    cartCount,
    onCartToggle,
    isMobileMenuOpen,
    onMobileMenuToggle,
}: HeaderProps) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                            <ShoppingCart size={28} />
                            <span>ShopHub</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
                                Home
                            </a>
                            <a href="/products" className="text-gray-700 hover:text-blue-600 transition">
                                Products
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                                Categories
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                                Contact
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="hidden sm:flex relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                        </div>

                        {/* Cart Button */}
                        <button
                            onClick={onCartToggle}
                            className="relative p-2 text-gray-700 hover:text-blue-600 transition"
                            title="Shopping Cart"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* User Profile */}
                        <UserProfile />

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={onMobileMenuToggle}
                            className="md:hidden p-2 text-gray-700"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2">
                        <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Home
                        </a>
                        <a href="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Products
                        </a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Categories
                        </a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Contact
                        </a>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
