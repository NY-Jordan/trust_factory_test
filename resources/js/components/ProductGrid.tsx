import { ShoppingCart, Star } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    stock: number;
}

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            onClick={() => onAddToCart(product)}
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
    );
};

export default ProductGrid;
