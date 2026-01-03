export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    stock: number;
    quantity: number;
    cart_item_id: number;
}

export interface CartSummary {
    items: CartItem[];
    item_count: number;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    is_empty: boolean;
}
