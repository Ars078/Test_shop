'use client';
import React, {useRef, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import {useCart} from "@/src/components/CartContext";

export const ProductsList: React.FC = () => {
    const { products, productsLoading, productsError, page, setPage, hasMore } = useCart();
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastElemRef = useCallback(
        (node: HTMLDivElement) => {
            if (productsLoading) return;
            if (observerRef.current) if ("disconnect" in observerRef.current) {
                observerRef.current.disconnect();
            }
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(page + 1);
                }
            });
            if (node) if ("observe" in observerRef.current) {
                observerRef.current.observe(node);
            }
        },
        [productsLoading, hasMore, page, setPage]
    );
    if (productsLoading && page === 1) {
        return <div className="text-center py-4 text-gray-600">Загрузка...</div>;
    }

    if (productsError) {
        return <div className="text-center py-4 text-red-600">{productsError}</div>;
    }

    if (products.length === 0 && !productsLoading) {
        return <div className="text-center py-4 text-gray-600">Нет продуктов</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, idx) => {
                if (idx === products.length - 1) {
                    return (
                        <div key={prod.id} ref={lastElemRef}>
                            <ProductCard product={prod} />
                        </div>
                    );
                }
                return <ProductCard key={prod.id} product={prod} />;
            })}
            {productsLoading && <p className="col-span-full text-center py-4 text-gray-600">Загрузка...</p>}
        </div>
    );
};
