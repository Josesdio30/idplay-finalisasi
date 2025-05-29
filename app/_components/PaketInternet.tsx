import React from 'react';
import Image from 'next/image';

const images = [
  '/20mbps-idplay.jpg',
  '/30mbps-idplay.jpg',
  '/50mbps-idplay.jpg',
  '/75mbps-idplay.jpg',
];

const PaketInternet: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">Pilihan Paket Internet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-[40rem] rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={img}
                alt={`Paket ${img.replace('.jpg', '').replace('/', '')}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaketInternet;