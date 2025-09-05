'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface RegionItem {
  documentId: string;
  region: string;
}

const RegionalPage = () => {
  const router = useRouter();
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [openLetter, setOpenLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('https://inspiring-power-f8fa08a4a5.strapiapp.com/api/regionals/');
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          const uniqueRegions = data.data.map((item: { documentId: string; region: string }) => ({
            documentId: item.documentId,
            region: item.region,
          }));
          setRegions(uniqueRegions);
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const toggleLetter = (letter: string) => {
    setOpenLetter(openLetter === letter ? null : letter);
  };

  const handleRegionSelect = (region: string) => {
    router.push(`/regional/${encodeURIComponent(region)}`);
  };

  const getUniqueLetters = (): string[] => {
    const letters = regions.map(item => item.region.charAt(0).toUpperCase());
    return [...new Set(letters)].sort();
  };

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-14 md:pt-16">
      {/* Header Section */}
      <div className="relative bg-orange-500 text-white p-6 lg:p-12 flex items-center justify-between mb-8">
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
          {getUniqueLetters().map((letter) => (
            <div key={letter} className="border-b py-2">
              <button
                onClick={() => toggleLetter(letter)}
                className="w-full text-left text-lg font-medium flex justify-between items-center"
              >
                <span>{letter}</span>
                <span className={`transition-transform ${openLetter === letter ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {openLetter === letter && (
                <div className="mt-2 p-2 bg-gray-50 rounded grid grid-cols-2 md:grid-cols-3 gap-2">
                  {regions
                    .filter((item) => item.region.charAt(0).toUpperCase() === letter)
                    .map((item) => (
                      <button
                        key={item.documentId}
                        onClick={() => handleRegionSelect(item.region)}
                        className="text-left py-2 px-4 bg-white text-gray-800 rounded hover:bg-gray-200 transition-colors"
                      >
                        {item.region}
                      </button>
                    ))}
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