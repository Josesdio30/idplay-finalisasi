import { cn } from '@/lib/utils';
import ProductBroadband from './ProductBroadband';
import ProductCard from './ProductCard';
import { useState } from 'react';

const ProductSection = () => {
  const [paketTab, setPaketTab] = useState<'bulan' | 'tahun'>('bulan');
  return (
    <section className="relative container mx-auto w-full ">
      <div className="py-14 rounded-2xl bg-[#FFEFE6]">
        <h2 className="text-xl lg:text-4xl font-medium tracking-[6%] leading-[29px] text-center mb-4 lg:mb-10 text-black">
          Mulai <span className="text-orange-500">Berlangganan</span>
        </h2>
        <p className="text-base lg:text-lg font-medium text-center text-gray-600 mb-8">
          Harga Jelas, Tanpa Biaya Tersembunyi.
          <br />
          Pilih paket yang sesuai dengan kebutuhan.
          <br />
          Tanpa biaya tambahan, tanpa kejutan—hanya harga jujur untuk layanan yang andal.
        </p>

        {/* Toggle Month/Year */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-md">
            <button
              className={cn(
                'px-6 py-2 rounded-md text-white font-semibold transition-all ease-in-out duration-300',
                paketTab === 'bulan'
                  ? 'bg-orange-500'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              onClick={() => setPaketTab('bulan')}
            >
              Bulan
            </button>
            <button
              className={cn(
                'px-6 py-2 rounded-md text-white font-semibold transition-all ease-in-out duration-300',
                paketTab === 'tahun'
                  ? 'bg-orange-500'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              onClick={() => setPaketTab('tahun')}
            >
              Tahun
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-10 z-10 w-full px-4 lg:px-8">
        {/* Pricing Cards */}
        <ProductCard />

        {/* Broadband Facts Cards */}
        <ProductBroadband />
      </div>
    </section>
  );
};

export default ProductSection;
