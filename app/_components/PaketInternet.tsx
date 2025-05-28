import React from 'react';
import Image from 'next/image';

const PaketInternet: React.FC = () => {
  const packages = [
    {
      image: '/placeholder-home-internet.jpg', // Placeholder Image
      title: 'Biznet Home Internet',
      description: 'Koneksi Lebih untuk Lebih Hidup',
      price: 'mulai dari Rp 250,000/bulan',
    },
    {
      image: '/placeholder-home-gamers.jpg', // Placeholder Image
      title: 'Biznet Home Gamers',
      description: 'untuk Sang Juara',
      price: 'mulai dari Rp 700,000/bulan',
    },
    {
      image: '/placeholder-biznet-iptv.jpg', // Placeholder Image
      title: 'Nonton Seru dengan Biznet IPTV',
      description: '',
      price: 'mulai dari Rp 225,000/bulan',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Pilihan Paket Internet</h2> {/* Judul section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{pkg.title}</h3>
                  {pkg.description && <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>}
                </div>
                <p className="text-orange-500 font-bold text-lg mt-4">{pkg.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaketInternet; 