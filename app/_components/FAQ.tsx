'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: 'Bagaimana cara mendaftar layanan idPlay?',
      answer:
        'Anda dapat mendaftar melalui website kami, menghubungi pusat kontak, atau mengunjungi lokasi IdPlAy terdekat.'
    },
    {
      question: 'Apa saja pilihan paket internet yang tersedia?',
      answer:
        'Kami memiliki berbagai pilihan paket internet yang dapat disesuaikan dengan kebutuhan Anda, termasuk paket untuk rumah dan gamers.'
    },
    {
      question: 'Apakah layanan idPlay tersedia di wilayah saya?',
      answer:
        'Anda dapat memeriksa ketersediaan layanan di wilayah Anda melalui fitur Cek Coverage di website kami.'
    },
    {
      question: 'Bagaimana jika saya mengalami masalah dengan koneksi internet?',
      answer:
        'Anda dapat menghubungi layanan Support 24/7 kami melalui telepon atau chat untuk bantuan teknis.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="basis-1/2">
            <h2 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-6 text-gray-800">
              Have Any Questions?
            </h2>
            <p className="text-sm lg:text-base">
              Our customer service team is ready to help with any questions about internet services.
              Contact us now for a free consultation!
            </p>
            <div className="relative mt-6 w-full">
              <Input
                className="w-full rounded-full px-4 py-5 lg:p-7 text-black placeholder:text-black text-sm lg:text-lg"
                placeholder="Enter your Email"
              />
              <Button className="absolute top-1/2 -translate-y-1/2 right-2 lg:right-3 text-sm lg:text-base rounded-full bg-[#00a63e] text-white hover:bg-[#00a63e]/60 h-auto py-1 lg:py-2">
                Submit
              </Button>
            </div>
          </div>
          <div className="basis-1/2">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 lg:mb-12 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="w-full">
              <div className="">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 border border-orange-300 rounded-xl"
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      <span className="text-sm lg:text-lg font-semibold text-gray-800">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-orange-500 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden px-4 transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-700 text-xs lg:text-sm pb-4">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
