'use client';

import React, { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 blur-sm. backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
        >
            <div
                className={`bg-[#222] backdrop-blur-lg rounded-2xl shadow-2xl max-w-sm w-full p-6 relative border border-gray-100/30 transform transition-transform duration-300 ${
                    isOpen ? 'scale-100' : 'scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100/50 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200"
                    aria-label="Закрыть окно"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};
