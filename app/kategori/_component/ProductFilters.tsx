import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getSpeedRanges } from '@/lib/services/productService';

interface ProductFiltersProps {
  region: string | null;
  selectedSpeedRange: { min?: number; max?: number } | null;
  selectedBillingCycle: 'Bulanan' | 'Tahunan' | null;
  onSpeedRangeChange: (range: { min?: number; max?: number } | null) => void;
  onBillingCycleChange: (cycle: 'Bulanan' | 'Tahunan' | null) => void;
  loading?: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  region,
  selectedSpeedRange,
  selectedBillingCycle,
  onSpeedRangeChange,
  onBillingCycleChange,
  loading = false,
}) => {
  const [speedOptions, setSpeedOptions] = useState<number[]>([]);
  const [loadingSpeedOptions, setLoadingSpeedOptions] = useState(false);

  useEffect(() => {
    const fetchSpeedOptions = async () => {
      if (!region) {
        setSpeedOptions([]);
        return;
      }

      setLoadingSpeedOptions(true);
      try {
        const speedData = await getSpeedRanges(region);
        setSpeedOptions(speedData.options);
      } catch (error) {
        console.error('Error fetching speed options:', error);
        setSpeedOptions([]);
      } finally {
        setLoadingSpeedOptions(false);
      }
    };

    fetchSpeedOptions();
  }, [region]);

  if (!region) {
    return null;
  }

  return (
      <div className="py-8 rounded-2xl bg-[#FFEFE6] mb-8">

      {/* Billing Cycle Filter */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-md">
            <button
              onClick={() => {
                if (selectedBillingCycle === 'Bulanan') {
                  onBillingCycleChange(null);
                } else {
                  onBillingCycleChange('Bulanan');
                }
              }}
              disabled={loading}
              className={cn(
                'px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                selectedBillingCycle === 'Bulanan'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              aria-label="Pilih periode tagihan bulanan"
            >
              Bulan
            </button>
            <button
              onClick={() => {
                if (selectedBillingCycle === 'Tahunan') {
                  onBillingCycleChange(null);
                } else {
                  onBillingCycleChange('Tahunan');
                }
              }}
              disabled={loading}
              className={cn(
                'px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                selectedBillingCycle === 'Tahunan'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              aria-label="Pilih periode tagihan tahunan"
            >
              Tahun
            </button>
          </div>
        </div>
      </div>

      {/* Speed Filter */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white rounded-lg p-2 shadow-md max-w-4xl">
            {loadingSpeedOptions ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="px-4 py-2 rounded-md bg-gray-200 w-24 h-8 animate-pulse" />
              ))
            ) : speedOptions.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 w-full md:flex md:flex-wrap md:items-center md:justify-center md:gap-2">
                {speedOptions.map((speed) => {
                  const isSelected = selectedSpeedRange?.min === speed && selectedSpeedRange?.max === speed;
                  return (
                    <button
                      key={speed}
                      onClick={() => {
                        if (isSelected) {
                          onSpeedRangeChange(null);
                        } else {
                          onSpeedRangeChange({ min: speed, max: speed });
                        }
                      }}
                      disabled={loadingSpeedOptions || loading}
                      className={cn(
                        'px-2 lg:px-4 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                        // 'px-2 py-1 text-xs rounded-md font-semibold transition-all ease-in-out duration-300 md:px-4 md:py-2 md:text-sm lg:text-base',
                        isSelected
                          ? 'bg-orange-500 text-white'
                          : 'bg-white hover:bg-orange-200 text-black hover:text-orange-600'
                      )}
                      aria-label={`Pilih kecepatan ${speed} Mbps`}
                    >
                      {speed} Mbps
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                Tidak ada opsi kecepatan.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear All Filters */}
      {(selectedSpeedRange || selectedBillingCycle) && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              onSpeedRangeChange(null);
              onBillingCycleChange(null);
            }}
            className="text-orange-600 hover:text-orange-800 font-medium text-sm bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            aria-label="Hapus semua filter"
          >
            Hapus Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;