'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Modal } from './Modal';

export const OrderForm: React.FC = () => {
    const { cart, phone, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleOrder = () => {
        const digits = phone.replace(/\D/g, '');
        if (digits.length !== 11) {
            setError('Введите корректный телефон');
            return;
        }
        if (cart.length === 0) {
            setError('Корзина пуста');
            return;
        }
        setError('');
        setLoading(true);
        const body = {
            phone: digits,
            cart: cart.map((i) => ({ id: i.id, quantity: i.quantity })),
        };
        fetch('http://o-complex.com:1337/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    setSuccessMsg('Заказ успешно оформлен!');
                    clearCart();
                } else {
                    setError(data.error || 'Ошибка при оформлении');
                }
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
                setError('Ошибка сервера');
            })
            .finally(() => setIsOpen(true));
    };

    const closeModal = () => {
        setIsOpen(false);
        setError('');
        setSuccessMsg('');
    };

    return (
        <>
            <button
                onClick={handleOrder}
                className="bg-[#222] text-white px-10 cursor-pointer rounded-xl transition"
            >
                Заказать
            </button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {loading && <p>Отправка запроса...</p>}
                {!loading && error && <p className="text-red-500">{error}</p>}
                {!loading && successMsg && <p className="text-white">{successMsg}</p>}
            </Modal>
        </>
    );
};
