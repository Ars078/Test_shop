import './globals.css';
import React from "react";

export const metadata = {
    title: 'Тестовое задание',
    description: 'React Developer (Next.js) тестовое задание',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
