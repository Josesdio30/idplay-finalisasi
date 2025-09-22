import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Metadata, Product } from '../type';
import Autoplay from 'embla-carousel-autoplay';

interface IProps {
  products: Product[];
  loading: boolean;
  fetching: boolean;
  pagination: Metadata['pagination'];
}

type RegionKey = 'Jawa' | 'Sulawesi' | 'Kalimantan' | 'Sumatera';
type RegionMapping = Record<RegionKey, string[]>;

const ProductSection = ({
  products: initialProducts,
  loading: initialLoading,
  fetching: initialFetching,
  pagination: initialPagination
}: IProps) => {
  const [paketTab, setPaketTab] = useState<'bulan' | 'tahun'>('bulan');
  const [regionTab, setRegionTab] = useState<RegionKey>('Jawa');
  const [openId, setOpenId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [fetching, setFetching] = useState<boolean>(initialFetching);
  const [pagination, setPagination] = useState<Metadata['pagination']>(initialPagination);
  const navigate = useRouter();

  // Mapping region names dari UI ke API
  const regionMapping: RegionMapping = {
    Jawa: ['JABODETABEK', 'JABAR'],
    Sulawesi: ['SULAWESI'],
    Kalimantan: ['KALIMANTAN'],
    Sumatera: ['SUMATERA']
  };

  // Fungsi untuk membangun URL API
  const buildApiUrl = (regionTab: RegionKey, paketTab: string) => {
    const regions = regionMapping[regionTab] || ['JABODETABEK'];
    const billingCycle = paketTab === 'bulan' ? 'Bulanan' : 'Tahunan';

    const regionFilter = regions
      .map((region) => `filters[regionals][region][$in][]=${encodeURIComponent(region)}`)
      .join('&');
    const billingFilter = `filters[billingCycle][$eq]=${encodeURIComponent(billingCycle)}`;

    return `https://inspiring-power-f8fa08a4a5.strapiapp.com/api/products?${regionFilter}&${billingFilter}&populate=*`;
  };

  // Fetch data ketika regionTab atau paketTab berubah
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setFetching(true);
      try {
        const url = buildApiUrl(regionTab, paketTab);
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.data || []);
        setPagination(data.meta.pagination);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
        setFetching(false);
      }
    };

    fetchProducts();
  }, [regionTab, paketTab]);

  // Filter products berdasarkan billing cycle dan region (fallback jika diperlukan)
  const getFilteredProducts = () => {
    return products; // Karena sudah difilter di API, langsung return
  };

  const filteredProducts = getFilteredProducts();

  // Komponen Skeleton untuk loading state
  const ProductCardSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent animate-pulse">
        {/* Skeleton untuk gambar produk */}
        <div className="w-full h-48 bg-gray-200"></div>

        {/* Skeleton untuk nama produk dan speed */}
        <div className="px-4 pt-4 lg:px-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        {/* Skeleton untuk harga */}
        <div className="relative flex flex-col justify-center items-center px-4 lg:px-6 lg:pt-2">
          <div className="h-8 lg:h-12 bg-gray-200 rounded w-32 mb-2 sm:mb-3 lg:mb-5"></div>
          <div className="h-6 lg:h-8 bg-gray-200 rounded w-28 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>

        {/* Skeleton untuk benefits */}
        <div className="mx-4 my-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 h-5 w-5 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton untuk buttons */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  };

  // Komponen ProductCard untuk reusability
  const ProductCard = ({ product }: { product: Product }) => {
    const isOpen = openId === product.id;

    // Helper function untuk format harga
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('id-ID').format(price);
    };

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent">
        {/* Product Card */}
        <div className="flex items-center justify-center bg-orange-500 text-white text-center">
          <Image
            src={product.thumbnail.url}
            alt={product.productName}
            width={500}
            height={500}
            className="w-full h-auto object-cover aspect-auto object-center"
            loading="lazy"
            priority={false}
          />
        </div>

        <div className="px-4 pt-4 lg:px-6">
          <h3 className="text-lg font-bold text-orange-500 text-center">{product.productName}</h3>

          <div className="flex items-center justify-center gap-1.5 mt-2">
            {product.originalSpeedInMbps && product.finalSpeedInMbps && (
              <p className="relative text-lg font-semibold text-gray-300 text-center px-0.5">
                <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-gray-300 w-full h-0.5 rounded-full" />
                {product.originalSpeedInMbps} Mbps
              </p>
            )}
            <p className="text-lg font-semibold text-orange-500 text-center">
              {product.finalSpeedInMbps || product.originalSpeedInMbps} Mbps
            </p>
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center px-4 lg:px-6 lg:pt-2">
          <div
            className={cn(
              'text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3',
              product.promoPrice ? 'lg:mb-5' : 'lg:mb-0'
            )}
          >
            <span className="relative">
              {product.promoPrice && (
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-orange-500 w-full h-0.5 lg:h-1 rounded-full" />
              )}
              Rp.{formatPrice(product.originalPrice)}
            </span>
            <span className="text-[16px] sm:text-[20px]">
              /{product.billingCycle === 'Bulanan' ? 'Bulan' : 'Tahun'}
            </span>
          </div>
          {product.promoPrice && (
            <>
              {/* <Image
                src="/icons/arrow-pricing.svg"
                alt=""
                width={65}
                height={65}
                className="size-[45px] sm:size-[55px] lg:size-[65px] absolute z-10 left-10 sm:left-12 lg:left-9 top-10 lg:top-13"
              /> */}
              <div className="text-base lg:text-[30px] tracking-[1%] leading-[26px] font-medium text-orange-700 mb-2">
                Rp.{formatPrice(product.promoPrice)}
                <span className="text-[16px] sm:text-[20px]">
                  /{product.billingCycle === 'Bulanan' ? 'Bulan' : 'Tahun'}
                </span>
              </div>
            </>
          )}
          <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">
            {product.priceHint || 'Mau langganan setahun? Bisa dicicil, kok!'}
          </p>
        </div>

        {/* Feature block between product and broadband */}
        <div className="mx-4 my-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
          <div className="space-y-3">
            {product.benefits.map((benefit, i) => (
              <div
                key={benefit.id}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                  ✓
                </span>
                <span className="text-sm text-gray-800">{benefit.name}</span>
              </div>
            ))}
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

      <div className="-mt-10 z-10 w-full px-4 lg:px-8 min-h-[800px]">
        {/* Unified Carousel for both Mobile and Desktop */}
        <div className="mb-12">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000
              })
            ]}
            opts={{
              align: 'start',
              loop: true
            }}
            className="w-full max-w-full overflow-x-hidden"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {loading || fetching
                ? // Skeleton untuk carousel
                  [1, 2, 3, 4, 5, 6].map((_, index) => (
                    <CarouselItem
                      key={`skeleton-${index}`}
                      className="pl-2 md:pl-4 basis-full md:basis-1/3"
                    >
                      <ProductCardSkeleton />
                    </CarouselItem>
                  ))
                : filteredProducts.map((product: Product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/3"
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
            {/* <div className="absolute top-1/2 left-2 flex items-center justify-center">
              <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
            </div>
            <div className="absolute top-1/2 right-2 flex items-center justify-center">
              <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
            </div> */}
          </Carousel>
        </div>

        {/* Message ketika tidak ada produk dan tidak loading */}
        {filteredProducts.length === 0 && !loading && !fetching && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk tersedia untuk pilihan ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
