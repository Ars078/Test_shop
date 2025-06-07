'use client';

import React, { useEffect, useState } from 'react';
import { Review } from '../types';
import { sanitize } from '../lib/sanitizeHtml';

export const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://o-complex.com:1337/reviews')
            .then((res) => res.json())
            .then((data: Review[]) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setError('Не удалось загрузить отзывы');
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center py-4">Загрузка отзывов...</p>;
    if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

    return (
        <div className="grid grid-cols-2 gap-5">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-gray-300 rounded-lg shadow-md p-4 break-words"
                    dangerouslySetInnerHTML={{ __html: sanitize(review.text) }}
                />
            ))}
        </div>
    );
};
