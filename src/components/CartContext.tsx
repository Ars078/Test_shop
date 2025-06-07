'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {CartItem, Product} from '../types';
interface ResponseProducts {
    page: number;
    total: number;
    amount: number;
    items: Product[];
}
interface CartContextValue {
    cart: CartItem[];
    phone: string;
    setPhone: (phone: string) => void;
    addItem: (id: number, qty: number) => void;
    updateItem: (id: number, qty: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    products: Product[];
    productsLoading: boolean;
    productsError: string | null;
    page: number;
    setPage: (page: number) => void;
    hasMore: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = (): CartContextValue => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [phone, setPhone] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);
    const [productsError, setProductsError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const storedPhone = localStorage.getItem('phone');
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedPhone) setPhone(storedPhone);
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            if (!hasMore || productsLoading) return;
            try {
                setProductsLoading(true);
                const res = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=6`);
                if (!res.ok) throw new Error('Ошибка загрузки продуктов');
                const data: ResponseProducts = await res.json();
                setProducts((prev) => [...prev, ...data.items]);
                setHasMore(data.items.length === 6);
                setProductsError(null);
            } catch (error) {
                console.error('Ошибка загрузки продуктов:', error);
                setProductsError('Не удалось загрузить продукты');
            } finally {
                setProductsLoading(false);
            }
        }
        fetchProducts();
    }, [page]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('phone', phone);
    }, [phone]);

    const addItem = (id: number, qty: number) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === id);
            if (exists) {
                return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + qty } : i));
            }
            return [...prev, { id, quantity: qty }];
        });
    };

    const updateItem = (id: number, qty: number) => {
        if (qty <= 0) {
            removeItem(id);
        } else {
            setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
        }
    };

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };
    return (
        <CartContext.Provider
            value={{
                cart,
                phone,
                setPhone,
                addItem,
                updateItem,
                removeItem,
                clearCart,
                products,
                productsLoading,
                productsError,
                page,
                setPage,
                hasMore,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
