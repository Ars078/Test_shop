'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from './CartContext';

interface Props {
    product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    const { cart, addItem, updateItem } = useCart();
    const existing = cart.find((i) => i.id === product.id);
    const [qty, setQty] = useState<number>(existing ? existing.quantity : 0);

    useEffect(() => {
        if (existing) setQty(existing.quantity);
        else setQty(0);
    }, [existing]);

    const handleBuy = () => {
        addItem(product.id, 1);
    };

    const increment = () => updateItem(product.id, qty + 1);
    const decrement = () => updateItem(product.id, qty - 1);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) || 0;
        updateItem(product.id, val);
    };

    return (
        <div className="p-2 bg-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
                <img
                    src={product.image_url}
                    alt={product.title}
                    className="h-full w-full object-cover"
                />
                {/*<Image src={product.image_url} alt={product.title} fill className="object-cover" />*/}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg text-center font-semibold mb-2 truncate">{product.title}</h3>
                <p className="text-sm text-gray-600 flex-grow mb-4">{product.description}</p>
                <div className="flex flex-col items-center justify-between">
                    <span className="mb-3">цена: {product.price}₽</span>
                    {qty === 0 ? (
                        <button
                            onClick={handleBuy}
                            className="px-5 py-1 bg-[#222] w-full text-white rounded-md cursor-pointer"
                        >
                            Купить
                        </button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={decrement}
                                className="px-2 py-1 bg-[#222] text-white rounded cursor-pointer"
                            >
                                –
                            </button>
                            <input
                                type="number"
                                min={0}
                                className="w-12 bg-[#222] text-white text-center border rounded"
                                value={qty}
                                onChange={onChange}
                            />
                            <button
                                onClick={increment}
                                className="px-2 py-1 bg-[#222] text-white rounded cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
