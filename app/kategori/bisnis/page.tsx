'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CompareProduct from '../../_components/CompareProduct';
import ProductFacts, { type RegionType } from '../_component/ProductFacts';

interface RegionOption {
  value: string;
  label: string;
}

export default function Kategori() {
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('');
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAndSetRegions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/regionals/`);
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          const formattedRegions: RegionOption[] = data.data.map((item: { region: string }) => ({
            value: item.region.toUpperCase().replace(/ /g, ''),
            label: item.region,
          }));
          setRegionOptions(formattedRegions);
          // Ambil region dari query string jika ada, untuk case page regional
          const regionFromQuery = searchParams.get('region');
          if (regionFromQuery && formattedRegions.some(r => r.value === regionFromQuery)) {
            setSelectedRegion(regionFromQuery);
          } else if (formattedRegions.length > 0) {
            setSelectedRegion(formattedRegions[0].value);
          }
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setIsLoadingRegions(false);
      }
    };
    fetchAndSetRegions();
  }, []);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value as RegionType);
  };
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Banner/Card Section for Bisnis */}
      <div className="relative container mx-auto lg:pt-14">
        <Image
          src="/category/hero-bisnis.svg"
          width={1000}
          height={1000}
          alt="Kategori Bisnis"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Keunggulan Section */}
      <section className="w-full py-8 bg-white mt-10 md:mt-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-xl lg:text-4xl font-bold text-center mb-2 text-green-700">Keunggulan Kami</h2>
            <p className="text-center text-gray-500 text-base lg:text-lg mb-6">Mengapa memilih layanan kami? Berikut keunggulan utama yang kami tawarkan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-start">
            <div className="flex flex-col items-center">
              <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <Image
                  src="/category/5g.svg"
                  alt="5G"
                  width={60}
                  height={60}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Koneksi Full 5G</h3>
              <p className="text-center text-gray-700 text-base">Akses Internet dengan koneksi Full 5G untuk pengalaman internet tanpa hambatan.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <Image
                  src="/category/Keamanan.svg"
                  alt="Keamanan"
                  width={60}
                  height={60}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Keamanan Terjamin</h3>
              <p className="text-center text-gray-700 text-base">Internet aman dengan enkripsi canggih dan proteksi real-time.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <Image
                  src="/category/Router.svg"
                  alt="Router"
                  width={60}
                  height={60}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Wifi Super Cepat</h3>
              <p className="text-center text-gray-700 text-base">Streaming, Gaming, dan Kerja tanpa Hambatan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Region Selection */}
      <div className="container mx-auto px-4">
        <div className="mb-16 mt-6 flex flex-col items-center">
            <label htmlFor="region-select" className="text-lg font-semibold text-gray-700 mb-2">
              Pilih Wilayah Anda:
            </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={handleRegionChange}
              disabled={isLoadingRegions}
              className="w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              style={{ background: 'white' }}
            >
              {isLoadingRegions ? (
                <option style={{ background: 'white', color: '#888' }}>Memuat wilayah...</option>
              ) : (
                regionOptions.map(option => (
                  <option key={option.value} value={option.value} style={{ background: 'white', color: '#222' }}>
                    {option.label}
                  </option>
                ))
              )}
            </select>
        </div>
        
        {/* Broadband Facts Cards - NON_RETAIL/Bisnis */}
        {selectedRegion && (
            <ProductFacts customerType="NON_RETAIL" region={selectedRegion} />
        )}
      </div>

      {/* Compare Product Section */}
      <CompareProduct />
    </div>
  );
}
