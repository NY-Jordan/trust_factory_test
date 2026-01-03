import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/layouts/ecommerce-layout';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative overflow-hidden bg-gray-100 h-64">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
                >
                    <Heart
                        size={20}
                        className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                </button>
                {product.stock > 0 && product.stock < 5 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Only {product.stock} left!
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">(125 reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full mt-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition ${
                        product.stock === 0
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    <ShoppingCart size={20} />
                    <span>{product.stock === 0 ? 'Unavailable' : 'Add to Cart'}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
