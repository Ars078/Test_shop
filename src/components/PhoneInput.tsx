'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCart } from './CartContext';
import IMaskInput from 'imask';
export const PhoneInput: React.FC = () => {
    const { phone, setPhone } = useCart();
    const [error, setError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            const mask = IMaskInput(inputRef.current, {
                mask: '+7 (000) 000-00-00',
                lazy: true,
            });

            return () => mask.destroy();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        if (digits.length > 11) return;

        setPhone(e.target.value);
        setError(digits.length < 11 && digits.length > 0 ? 'Введите полный номер телефона' : '');
    };

    return (
        <>
            <input
                ref={inputRef}
                type="tel"
                value={phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                className={`bg-[#222222] w-full text-white border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-describedby={error ? 'phone-error' : undefined}
            />
        </>
    );
};