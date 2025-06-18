'use client'

import React, { useState } from "react";
import { Carousel } from "@/app/_components/ui/carousel";

const promotions = [
  { image: '/promo-1.jpg', alt: 'Promo 1' },
  { image: '/promo-2.jpg', alt: 'Promo 2' },
  { image: '/promo-3.jpg', alt: 'Promo 3' },
];

const KategoriLayouts: React.FC = () => {
  const [region, setRegion] = useState("Jawa");
  const paketData = [
    { bandwidth: "20Mbps", jawa: "Rp179,000", sulkal: "Rp199,000", paket5jawa: "Rp95,000", paket5sulkal: "Rp95,000", paket10jawa: "Rp1,790,000", paket10sulkal: "Rp1,990,000" },
    { bandwidth: "30Mbps", jawa: "Rp239,000", sulkal: "Rp269,000", paket5jawa: "Rp1,195,000", paket5sulkal: "Rp1,345,000", paket10jawa: "Rp2,390,000", paket10sulkal: "Rp2,690,000" },
    { bandwidth: "50Mbps", jawa: "Rp279,000", sulkal: "Rp319,000", paket5jawa: "Rp1,395,000", paket5sulkal: "Rp1,595,000", paket10jawa: "Rp2,790,000", paket10sulkal: "Rp3,190,000" },
    { bandwidth: "75Mbps", jawa: "Rp299,000", sulkal: "Rp349,000", paket5jawa: "Rp1,495,000", paket5sulkal: "Rp1,745,000", paket10jawa: "Rp2,990,000", paket10sulkal: "Rp3,490,000" },
    { bandwidth: "100Mbps", jawa: "Rp319,000", sulkal: "Rp369,000", paket5jawa: "Rp1,595,000", paket5sulkal: "Rp1,845,000", paket10jawa: "Rp3,190,000", paket10sulkal: "Rp3,690,000" },
    { bandwidth: "200Mbps", jawa: "Rp369,000", sulkal: "Rp399,000", paket5jawa: "Rp1,845,000", paket5sulkal: "Rp1,995,000", paket10jawa: "Rp3,690,000", paket10sulkal: "Rp3,990,000" },
  ];

  return (
    <>
      <section className="w-full h-[320px] xs:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-white">
        <div className="w-full h-full">
          <Carousel
            slides={promotions}
          />
        </div>
      </section>
      <section className="min-h-screen bg-gray-50 py-12 px-2 md:px-0 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">Kategori Produk</h1>
        <div className="w-full max-w-3xl flex flex-col items-center gap-8">
          <div className="w-full flex justify-center mb-4">
            <button
              className={`px-4 py-2 mr-2 rounded-lg ${region === "Jawa" ? "bg-teal-500 text-white" : "bg-gray-200"}`}
              onClick={() => setRegion("Jawa")}
            >
              Jawa
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${region === "Sulsel" ? "bg-teal-500 text-white" : "bg-gray-200"}`}
              onClick={() => setRegion("Sulsel")}
            >
              Sulsel
            </button>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="bg-teal-100 border-l-4 border-teal-400 rounded-lg px-6 py-4 shadow w-full max-w-lg mb-2">
              <span className="text-lg font-semibold text-teal-700">Daftar Paket</span>
            </div>
            {paketData.map((paket, index) => (
              <div key={index} className="w-full max-w-lg mb-2">
                <div className="bg-white rounded-lg shadow px-4 py-3 border border-gray-200">
                  <span className="font-medium text-gray-700">{paket.bandwidth}</span>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Paket Home: {region === "Jawa" ? paket.jawa : paket.sulkal}</p>
                    <p className="text-sm text-gray-600">Paket Bisnis: {region === "Jawa" ? paket.paket5jawa : paket.paket5sulkal}</p>
                    <p className="text-sm text-gray-600">Paket 10+2: {region === "Jawa" ? paket.paket10jawa : paket.paket10sulkal}</p>
                  </div>
                </div>
              </div>
            ))}
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
      </section>
    </>
  );
};

export default KategoriLayouts;