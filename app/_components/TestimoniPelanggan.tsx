import React from 'react';

const TestimoniPelanggan: React.FC = () => {
  const testimonials = [
    {
      quote: 'Layanan internetnya cepat dan stabil, sangat membantu untuk kerja dari rumah dan hiburan.',
      name: 'Pelanggan A',
      city: 'Jakarta',
    },
    {
      quote: 'Sangat puas dengan koneksi 100% fiber optiknya, gaming jadi bebas lag!',
      name: 'Pelanggan B',
      city: 'Bandung',
    },
    {
      quote: 'Support 24/7 sangat responsif, masalah cepat teratasi.',
      name: 'Pelanggan C',
      city: 'Surabaya',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Testimoni Pelanggan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimoni, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer text-left"
            >
              <p className="text-gray-700 italic mb-4">"{testimoni.quote}"</p>
              <p className="text-gray-900 font-semibold">- {testimoni.name}</p>
              <p className="text-gray-600 text-sm">{testimoni.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniPelanggan; 