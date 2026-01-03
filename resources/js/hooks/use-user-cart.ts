import {  router } from '@inertiajs/react';

export const useUserCart = () => {
    /**
     * Add product to cart
     */
    const addToCart = async (productId: number, quantity: number = 1) => {
        return new Promise((resolve) => {
            router.post('/api/cart/add', { product_id: productId, quantity }, {
                onSuccess: (page) => {
                    const data = page.props;
                    if (data.success) {
                        resolve({ success: true, message: data.message });
                    } else {
                        resolve({ success: false, message: data.message });
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                    resolve({ success: false, message: 'Failed to add item to cart' });
                },
            });
        });
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = async (productId: number) => {
        return new Promise((resolve) => {
            router.delete(`/api/cart/remove/${productId}`, {
                onSuccess: (page) => {
                    const data = page.props;
                    if (data.success) {
                        resolve({ success: true, message: data.message });
                    } else {
                        resolve({ success: false, message: data.message });
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                    resolve({ success: false, message: 'Failed to remove item from cart' });
                },
            });
        });
    };

    /**
     * Update item quantity
     */
    const updateQuantity = async (productId: number, quantity: number) => {
        return new Promise((resolve) => {
            router.put(`/api/cart/update/${productId}`, { quantity }, {
                onSuccess: (page) => {
                    const data = page.props;
                    if (data.success) {
                        resolve({ success: true, message: data.message });
                    } else {
                        resolve({ success: false, message: data.message });
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                    resolve({ success: false, message: 'Failed to update cart' });
                },
            });
        });
    };

    return {
        addToCart,
        removeFromCart,
        updateQuantity,
    };
};

export default useUserCart;
