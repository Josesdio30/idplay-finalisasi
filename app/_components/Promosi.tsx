'use client';

import React from 'react';
import { Carousel } from './ui/carousel';

const Promosi: React.FC = () => {
  const promotions = [
    { image: '/promo-1.jpg', alt: 'Promo 1' },
    { image: '/promo-2.jpg', alt: 'Promo 2' },
    { image: '/promo-3.jpg', alt: 'Promo 3' },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Promosi Menarik</h2>
        <div className="max-w-none mx-auto">
          <Carousel slides={promotions} />
        </div>
      </div>
    </section>
  );
};

export default Promosi;
