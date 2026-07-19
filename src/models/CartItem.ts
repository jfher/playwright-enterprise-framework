export interface CartItem {
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    subtotal?: number;
}
