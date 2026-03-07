import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInventory {
    productId: bigint;
    productName: string;
    stock: bigint;
    category: string;
    price: number;
}
export interface CustomerView {
    totalOrders: bigint;
    totalSpending: number;
    city: string;
    name: string;
    lastOrderDate: bigint;
    email: string;
    phone: string;
}
export interface CartItem {
    productId: bigint;
    productName: string;
    quantity: bigint;
    price: number;
}
export interface AdminStats {
    totalOrders: bigint;
    revenue: number;
    pendingOrders: bigint;
    lowStockCount: bigint;
    totalCustomers: bigint;
}
export interface Review {
    reviewText: string;
    productId: bigint;
    reviewerName: string;
    timestamp: bigint;
    rating: bigint;
}
export interface OrderView {
    customerName: string;
    status: string;
    paymentMethod: string;
    city: string;
    email: string;
    orderId: bigint;
    cartItems: Array<CartItem>;
    state: string;
    address: string;
    phone: string;
    pincode: string;
}
export interface backendInterface {
    addToCart(sessionId: string, productId: bigint, productName: string, price: number, quantity: bigint): Promise<void>;
    clearCart(sessionId: string): Promise<void>;
    getAdminStats(): Promise<AdminStats>;
    getAllCustomers(): Promise<Array<CustomerView>>;
    getAllOrders(): Promise<Array<OrderView>>;
    getAverageRating(productId: bigint): Promise<number>;
    getCart(sessionId: string): Promise<Array<CartItem>>;
    getOrder(orderId: bigint): Promise<OrderView | null>;
    getProductInventory(): Promise<Array<ProductInventory>>;
    getReviews(productId: bigint): Promise<Array<Review>>;
    getSubscriberCount(): Promise<bigint>;
    placeOrder(sessionId: string, customerName: string, email: string, phone: string, address: string, city: string, state: string, pincode: string, paymentMethod: string): Promise<bigint>;
    removeFromCart(sessionId: string, productId: bigint): Promise<void>;
    submitReview(productId: bigint, rating: bigint, reviewText: string, reviewerName: string): Promise<void>;
    subscribe(email: string): Promise<void>;
    updateInventory(productId: bigint, newStock: bigint): Promise<boolean>;
    updateOrderStatus(orderId: bigint, status: string): Promise<boolean>;
}
