'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export type RegionType = string;

interface RegionOption {
  value: string;
  label: string;
}

interface RegionSelectorProps {
  onRegionChange: (region: RegionType) => void;
  selectedRegion: RegionType;
}

function RegionSelectorContent({ onRegionChange, selectedRegion }: RegionSelectorProps) {
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
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
          
          // Ambil region dari query string jika ada
          const regionFromQuery = searchParams.get('region');
          if (regionFromQuery && formattedRegions.some(r => r.value === regionFromQuery)) {
            onRegionChange(regionFromQuery);
          } else if (formattedRegions.length > 0) {
            onRegionChange(formattedRegions[0].value);
          }
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setIsLoadingRegions(false);
      }
    };

    fetchAndSetRegions();
  }, [onRegionChange, searchParams]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRegionChange(event.target.value as RegionType);
  };

  return (
    <div className="mb-12 mt-6 flex flex-col items-center">
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
  );
}

export default function RegionSelector({ onRegionChange, selectedRegion }: RegionSelectorProps) {
  return (
    <Suspense fallback={
      <div className="mb-12 mt-6 flex flex-col items-center">
        <label className="text-lg font-semibold text-gray-700 mb-2">
          Pilih Wilayah Anda:
        </label>
        <div className="w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100">
          <span className="text-gray-500">Memuat wilayah...</span>
        </div>
      </div>
    }>
      <RegionSelectorContent onRegionChange={onRegionChange} selectedRegion={selectedRegion} />
    </Suspense>
  );
}