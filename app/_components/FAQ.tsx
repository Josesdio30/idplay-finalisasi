import React from 'react';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: 'Bagaimana cara mendaftar layanan idPlay?',
      answer: 'Anda dapat mendaftar melalui website kami, menghubungi pusat kontak, atau mengunjungi lokasi IdPlAy terdekat.',
    },
    {
      question: 'Apa saja pilihan paket internet yang tersedia?',
      answer: 'Kami memiliki berbagai pilihan paket internet yang dapat disesuaikan dengan kebutuhan Anda, termasuk paket untuk rumah dan gamers.',
    },
    {
      question: 'Apakah layanan idPlay tersedia di wilayah saya?',
      answer: 'Anda dapat memeriksa ketersediaan layanan di wilayah Anda melalui fitur Cek Coverage di website kami.',
    },
    {
      question: 'Bagaimana jika saya mengalami masalah dengan koneksi internet?',
      answer: 'Anda dapat menghubungi layanan Support 24/7 kami melalui telepon atau chat untuk bantuan teknis.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">FAQ (Pertanyaan Umum)</h2>
        <div className="max-w-2xl mx-auto text-left">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.question}</h3>
              <p className="text-gray-700 text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 