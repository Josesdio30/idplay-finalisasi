'use client';

import { useState } from 'react';
import Image from 'next/image';
import CompareProduct from '@/app/_components/CompareProduct';
import KeunggulanKamiSection from '@/app/_components/KeunggulanSection';
import ProductFacts from '../_component/ProductFacts';
import ProductFilters from '../_component/ProductFilters';
import RegionSelector, { type RegionType } from '../_component/RegionSelector';

export default function Kategori() {
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('');
  const [selectedSpeedRange, setSelectedSpeedRange] = useState<{
    min?: number;
    max?: number;
  } | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'Bulanan' | 'Tahunan' | null>(
    null
  );

  return (
    <div className="min-h-screen font-sans bg-white">
      <div className="relative container mx-auto lg:pt-14">
        <Image
          src="/category/hero-rumah.svg"
          width={1000}
          height={1000}
          alt="Kategori Rumah"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Section Keunggulan */}
      <KeunggulanKamiSection />

      <div className="container mx-auto px-4">
        <RegionSelector
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        {selectedRegion && (
          <>
            <ProductFilters
              region={selectedRegion}
              selectedSpeedRange={selectedSpeedRange}
              selectedBillingCycle={selectedBillingCycle}
              onSpeedRangeChange={setSelectedSpeedRange}
              onBillingCycleChange={setSelectedBillingCycle}
            />

            <ProductFacts
              category="RETAIL"
              region={selectedRegion}
              selectedSpeedRange={selectedSpeedRange || undefined}
              selectedBillingCycle={selectedBillingCycle || undefined}
            />
          </>
        )}
      </div>

      <CompareProduct />
    </div>
  );
}
