import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Star } from 'lucide-react';
import useUserCart from '@/hooks/use-user-cart';
import { Product } from '@/domain/entities/products.entities';




export default function Dashboard({products}: {products: Product[]}) {
    const { addToCart } = useUserCart();
    const handleAddToCart = (product: Product) => {
        addToCart(product.id, 1);
    };

    return (
        <EcommerceLayout>
            <Head title="Dashboard" />

            <div className="space-y-12">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 md:p-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopHub</h1>
                    <p className="text-xl text-blue-100 mb-6">
                        Discover our premium collection of tech accessories and office equipment
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                            Shop Now
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Featured Products Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                            <p className="text-gray-600 mt-2">
                                {products?.length || 0} products available
                            </p>
                        </div>
                        <a href="/products" className="text-blue-600 font-semibold hover:text-blue-700">
                            View All →
                        </a>
                    </div>

                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product: Product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                                >
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden bg-gray-100 h-48">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                        {product.stock === 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <span className="text-white font-bold">Out of Stock</span>
                                            </div>
                                        )}
                                        {product.stock > 0 && product.stock < 5 && (
                                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                Only {product.stock} left!
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                                            {product.name}
                                        </h3>

                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                            {product.description}
                                        </p>

                                        {/* Rating */}
                                        <div className="flex items-center mb-3">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill="currentColor" />
                                                ))}
                                            </div>
                                            <span className="text-gray-600 text-xs ml-2">(125)</span>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold text-blue-600">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}
                                            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                                                product.stock === 0
                                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                        >
                                            <ShoppingCart size={18} />
                                            {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-12 text-center">
                            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg">No products available at the moment</p>
                        </div>
                    )}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            {products?.length || 0}
                        </div>
                        <p className="text-gray-600">Products Available</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                        <p className="text-gray-600">Customer Support</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">FREE</div>
                        <p className="text-gray-600">Shipping on Orders $100+</p>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
