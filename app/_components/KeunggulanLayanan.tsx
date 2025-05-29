import React from 'react';
import Image from 'next/image';

const KeunggulanLayanan: React.FC = () => {
  const services = [
    {
      icon: '/speed-burst.png',
      title: 'Speed Burst',
      description: 'Pengalaman streaming dan gaming super lancar tanpa buffering dengan koneksi cepat dan stabil',
    },
    {
      icon: '/true-unlimited.png',
      title: 'True Unlimited',
      description: 'Tanpa batasan kuota, bebas browsing, streaming, dan gaming sepuasnya tanpa khawatir kuota habis',
    },
    {
      icon: '/support-24.png',
      title: 'Support 24/7',
      description: 'Hadir dengan layanan customer service 24/7 yang responsif untuk pengalaman tanpa hambatan',
    },
    {
      icon: '/fiber-optic.png',
      title: '100% Fiber Optic',
      description: 'Koneksi 100% fiber optic sampai rumah, bikin internet super cepat, super stabil, dan tahan cuaca ekstrem',
    },
  ];

  return (
    <section className="py-16 bg-teal-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-white">Kenapa Memilih idPlay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg cursor-pointer relative h-64"
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={60}
                height={60}
                className="mb-4 z-10"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 z-10 pb-6">{service.title}</h3>
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-white bg-opacity-95 rounded-b-lg z-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <p className="text-gray-600 text-sm mb-4 pt-4">{service.description}</p>
                <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-orange-600 transition-colors">
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeunggulanLayanan; 