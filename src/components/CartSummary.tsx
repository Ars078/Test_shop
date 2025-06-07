'use client';

import React from 'react';
import { useCart } from './CartContext';
export const CartSummary: React.FC = () => {
    const { cart, products, productsLoading, productsError, clearCart } = useCart();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    if (productsLoading) {
        return (
            <div className="w-full rounded-lg p-4 bg-gray-100 text-center text-gray-600">
                Загрузка...
            </div>
        );
    }

    if (productsError) {
        return (
            <div className="w-full rounded-lg p-4 bg-red-100 text-center text-red-600">
                {productsError}
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="p-4 text-center text-gray-600">
                Корзина пуста
            </div>
        );
    }
    return (
        <div className="rounded-lg flex justify-between items-center">
            <span className="flex gap-2">Товаров: {totalItems}<span>{totalPrice.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</span></span>
            <button
                onClick={clearCart}
                className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
            >
                Очистить
            </button>
        </div>
    );
};
