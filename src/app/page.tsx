import React from 'react';
import { Reviews } from '../components/Reviews';
import { ProductsList } from '../components/ProductsList';
import { CartProvider } from '../components/CartContext';
import { CartSummary } from '../components/CartSummary';
import { PhoneInput } from '../components/PhoneInput';
import { OrderForm } from '../components/OrderForm';

export default async function Home() {
  return (
      <html lang="ru" >
      <body className="bg-[#222] min-h-screen">
          <CartProvider>
            <main className="grid max-w-5xl mx-auto p-4 space-y-8">
                <div className="bg-[#777] rounded-lg">
                    <h1 className="text-white text-2xl text-center py-3">Тестовое задание</h1>
                </div>
              <section>
                <Reviews />
              </section>
                <section className="bg-gray-300 p-2 rounded-lg space-y-4 w-full max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Добавленные товары</h2>
                    <CartSummary />
                    <div className="flex gap-3">
                        <PhoneInput />
                        <OrderForm />
                    </div>
                </section>
              <section>
                <ProductsList />
              </section>
            </main>
          </CartProvider>
      </body>
      </html>
  );
}
