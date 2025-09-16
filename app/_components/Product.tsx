import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const ProductSection = () => {
  const [paketTab, setPaketTab] = useState<'bulan' | 'tahun'>('bulan');
  const [regionTab, setRegionTab] = useState<'Jawa' | 'Sulawesi' | 'Kalimantan' | 'Sumatera'>(
    'Jawa'
  );
  const navigate = useRouter();

  const products = {
    Jawa: [
      { id: 1, speed: '700', yearlyPrice: '1.700.000', monthlyPrice: '350.000' },
      { id: 2, speed: '700', yearlyPrice: '1.700.000', monthlyPrice: '350.000' },
      { id: 3, speed: '700', yearlyPrice: '1.700.000', monthlyPrice: '350.000' }
    ],
    Sulawesi: [
      { id: 1, speed: '700', yearlyPrice: '1.800.000', monthlyPrice: '370.000' },
      { id: 2, speed: '700', yearlyPrice: '1.800.000', monthlyPrice: '370.000' },
      { id: 3, speed: '700', yearlyPrice: '1.800.000', monthlyPrice: '370.000' }
    ],
    Kalimantan: [
      { id: 1, speed: '700', yearlyPrice: '1.750.000', monthlyPrice: '360.000' },
      { id: 2, speed: '700', yearlyPrice: '1.750.000', monthlyPrice: '360.000' },
      { id: 3, speed: '700', yearlyPrice: '1.750.000', monthlyPrice: '360.000' }
    ],
    Sumatera: [
      { id: 1, speed: '700', yearlyPrice: '1.650.000', monthlyPrice: '340.000' },
      { id: 2, speed: '700', yearlyPrice: '1.650.000', monthlyPrice: '340.000' },
      { id: 3, speed: '700', yearlyPrice: '1.650.000', monthlyPrice: '340.000' }
    ]
  };

  const broadbandPlans = [
    {
      id: 1,
      title: 'IDPlay',
      subtitle: '12 Months 25 MBp/S',
      description: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 2,
      title: 'IDPlay',
      subtitle: '12 Months 25 MBp/S',
      description: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 3,
      title: 'IDPlay',
      subtitle: '12 Months 25 MBp/S',
      description: 'Lorem Ipsum Dolor Sit Amet'
    }
  ];

  const [openId, setOpenId] = useState<number | null>(null);
  const toggleOpen = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  // Komponen ProductCard untuk reusability
  const ProductCard = ({ product, idx }: { product: any; idx: number }) => {
    const plan = broadbandPlans[idx];
    const isOpen = openId === product.id;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent">
        {/* Product Card */}
        <div className="flex items-center justify-center bg-orange-500 text-white px-4 py-6 sm:py-7 lg:py-9 text-center">
          <div className="text-[36px] sm:text-[40px] lg:text-[70px] tracking-[1%] leading-[45px] font-bold text-center">
            {product.speed}
            <span className="text-[16px] sm:text-[20px]">/Mbps</span>
          </div>
        </div>
        <div className="relative flex flex-col justify-center items-center p-4 lg:p-6">
          <div className="text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3 lg:mb-5">
            <span className="relative">
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-orange-500 w-full h-0.5 lg:h-1 rounded-full" />
              Rp.{product.yearlyPrice}
            </span>
            <span className="text-[16px] sm:text-[20px]">
              /{paketTab === 'bulan' ? 'Bulan' : 'Tahun'}
            </span>
          </div>
          <Image
            src="/icons/arrow-pricing.svg"
            alt=""
            width={65}
            height={65}
            className="size-[45px] sm:size-[55px] lg:size-[65px] absolute z-10 left-10 sm:left-12 lg:left-9 top-10 lg:top-13"
          />
          <div className="text-base lg:text-[30px] tracking-[1%] leading-[26px] font-medium text-orange-700 mb-2">
            Rp.{product.monthlyPrice}
            <span className="text-[16px] sm:text-[20px]">
              /{paketTab === 'bulan' ? 'Bulan' : 'Tahun'}
            </span>
          </div>
          <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">
            Mau langganan setahun? Bisa dicicil, kok!
          </p>
        </div>

        {/* Feature block between product and broadband */}
        <div className="mx-4 mb-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
          <div className="space-y-3">
            {['Fast and reliable connection', 'No contract required', 'Easy setup Process'].map(
              (text, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                    ✓
                  </span>
                  <span className="text-sm text-gray-800">{text}</span>
                </div>
              )
            )}
          </div>
          <div className="my-4 h-0.5 w-full bg-orange-300" />
          <div className="flex items-center justify-around text-orange-600">
            <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">
              1080p FULLHD
            </span>
            <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">🎮 Gaming</span>
            <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">∞ Unlimited</span>
          </div>
        </div>

        {/* Bottom action buttons: Selengkapnya (di atas) dan Subscribe (di bawah) */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <button
            className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            onClick={() => navigate.push('/kategori/rumah')}
          >
            <span>Selengkapnya</span>
            <span className="transition-transform">▾</span>
          </button>
          <button
            onClick={() => navigate.push('/entri-prospek')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Subscribe
          </button>
        </div>
      </div>
    );
  };

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

        {/* Toggle Region */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-md">
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                regionTab === 'Jawa'
                  ? 'bg-green-600'
                  : 'bg-white hover:bg-green-200 text-black hover:text-green-600'
              )}
              onClick={() => setRegionTab('Jawa')}
            >
              Jawa
            </button>
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                regionTab === 'Sulawesi'
                  ? 'bg-green-600'
                  : 'bg-white hover:bg-green-200 text-black hover:text-green-600'
              )}
              onClick={() => setRegionTab('Sulawesi')}
            >
              Sulawesi
            </button>
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                regionTab === 'Kalimantan'
                  ? 'bg-green-600'
                  : 'bg-white hover:bg-green-200 text-black hover:text-green-600'
              )}
              onClick={() => setRegionTab('Kalimantan')}
            >
              Kalimantan
            </button>
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                regionTab === 'Sumatera'
                  ? 'bg-green-600'
                  : 'bg-white hover:bg-green-200 text-black hover:text-green-600'
              )}
              onClick={() => setRegionTab('Sumatera')}
            >
              Sumatera
            </button>
          </div>
        </div>

        {/* Toggle Month/Year */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-md">
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
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
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
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
        {/* Mobile Carousel */}
        <div className="block md:hidden mb-12">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000
              })
            ]}
            opts={{
              align: 'start',
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products[regionTab].map((product, idx) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full"
                >
                  <ProductCard
                    product={product}
                    idx={idx}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-12 mb-12">
          {products[regionTab].map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
