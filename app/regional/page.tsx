'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegionalPage = () => {
  const router = useRouter();
  const regions = ['Jawa', 'Kalimantan', 'Sulawesi', 'Sumatra', 'Nusa Tenggara'];

  const [openRegion, setOpenRegion] = useState(null);

  const toggleRegion = (region) => {
    setOpenRegion(openRegion === region ? null : region);
  };

  const handleRegionSelect = (region) => {
    router.push(`/regional/${region.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative bg-orange-500 text-white p-6 lg:p-12 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-2xl lg:text-3xl font-bold">pi/y</span>
            <h1 className="text-xl lg:text-3xl font-bold">Temukan Internet Cepat di Jawa Tengah</h1>
          </div>
          <p className="text-sm lg:text-base mt-2">Apa rencana internet rumah yang tepat untuk Anda?</p>
          <ul className="list-disc list-inside text-sm lg:text-base mt-2 space-y-1">
            <li>Internet Super Cepat untuk Streaming dan Gaming Tanpa Batas</li>
            <li>Jaringan Handal, Nikmati Koneksi Stabil Setiap Saat</li>
            <li>Pelayanan Pelanggan Terbaik, Sempurna untuk Kapasitas Saja</li>
          </ul>
          <button
            onClick={() => router.push('/cek-ketersediaan')}
            className="mt-4 bg-white text-orange-500 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100"
          >
            Cek Ketersediaan Sekarang
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <img src="/images/students.jpg" alt="Students" className="w-48 h-48 object-cover rounded-lg" />
        </div>
      </div>

      {/* Region Selection Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Pilih Daerah Lokasimu</h2>
        <div className="space-y-4">
          {regions.map((region) => (
            <div key={region} className="border-b py-2">
              <button
                onClick={() => toggleRegion(region)}
                className="w-full text-left text-lg font-medium flex justify-between items-center"
              >
                <span>{region}</span>
                <span className={`transition-transform ${openRegion === region ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {openRegion === region && (
                <div className="mt-2 p-2 bg-gray-50 rounded">
                  <button
                    onClick={() => handleRegionSelect(region)}
                    className="w-full text-center py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Pilih {region}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionalPage;