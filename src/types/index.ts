export interface Review {
    id: number;
    text: string;
}

export interface Product {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
}

export interface CartItem {
    id: number;
    quantity: number;
}
