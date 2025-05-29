import React from 'react';
import Image from 'next/image';

const CaraBerlangganan: React.FC = () => {
  const steps = [
    {
      step: 'Pilih Lokasi & Paket Langganan',
      description: 'Temukan paket yang sesuai dengan kebutuhan Anda dan pilih lokasi layanan yang tersedia.',
      icon: '/icons/location-plan.png',
    },
    {
      step: 'Isi Formulir & Tunggu Konfirmasi',
      description: 'Lengkapi data pendaftaran, lalu tunggu konfirmasi dari tim kami.',
      icon: '/icons/form-confirmation.png',
    },
    {
      step: 'Instalasi',
      description: 'Teknisi profesional idPlay akan melaksanakan pemasangan dan memastikan semuanya siap digunakan.',
      icon: '/icons/installation.png',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-500">Cara Berlangganan</h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group h-full"
            >
              <div className="w-48 h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={item.icon}
                  alt={item.step}
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md w-72 min-h-[200px] flex-1 flex flex-col justify-between transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.step}</h3>
                <p className="text-gray-700 text-sm flex-grow">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaraBerlangganan;