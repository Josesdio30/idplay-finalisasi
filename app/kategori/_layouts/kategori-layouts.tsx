import React from "react";
import { Carousel } from "@/app/_components/ui/carousel";

const promotions = [
  { image: '/promo-1.jpg', alt: 'Promo 1' },
  { image: '/promo-2.jpg', alt: 'Promo 2' },
  { image: '/promo-3.jpg', alt: 'Promo 3' },
];

const KategoriLayouts: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-2 md:px-0 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"> </h1>
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full">
            <Carousel slides={promotions} />
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="bg-teal-100 border-l-4 border-teal-400 rounded-lg px-6 py-4 shadow w-full max-w-lg mb-2">
            <span className="text-lg font-semibold text-teal-700">Daftar Paket</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-2">
            <div className="flex-1 bg-white rounded-lg shadow px-4 py-3 border border-gray-200 text-center">
              <span className="font-medium text-gray-700">Paket Home</span>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow px-4 py-3 border border-gray-200 text-center">
              <span className="font-medium text-gray-700">Paket Bisnis</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mb-2">
            <div className="bg-green-100 border-l-4 border-green-400 rounded-lg px-6 py-3 shadow w-full max-w-md mb-2">
              <span className="font-semibold text-green-700">Add-On</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <div className="flex-1 bg-white rounded-lg shadow px-4 py-3 border border-gray-200 text-center">
                <span className="font-medium text-gray-700">Speed Boost</span>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow px-4 py-3 border border-gray-200 text-center">
                <span className="font-medium text-gray-700">IP Public</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="bg-yellow-100 border-l-4 border-yellow-400 rounded-lg px-6 py-3 shadow w-full max-w-md">
              <span className="font-semibold text-yellow-700">Perbandingan Paket (Dengan Kompetitor)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KategoriLayouts;