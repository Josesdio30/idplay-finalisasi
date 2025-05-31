'use client';
import React, { useState } from 'react';

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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-teal-500 to-white">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">FAQ (Pertanyaan Umum)</h2>
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4 border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-800">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-700 text-sm pb-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;