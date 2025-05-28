import React from 'react';

const CaraBerlangganan: React.FC = () => {
  const steps = [
    {
      step: 'Langkah 1',
      description: 'Deskripsi langkah pertama untuk berlangganan.',
    },
    {
      step: 'Langkah 2',
      description: 'Deskripsi langkah kedua untuk berlangganan.',
    },
    {
      step: 'Langkah 3',
      description: 'Deskripsi langkah ketiga untuk berlangganan.',
    },
    {
      step: 'Langkah 4',
      description: 'Deskripsi langkah keempat untuk berlangganan.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Cara Berlangganan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <div className="text-2xl font-bold mb-2 text-orange-500">{item.step}</div>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaraBerlangganan; 