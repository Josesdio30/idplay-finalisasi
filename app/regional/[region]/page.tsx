'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface BannerImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
  formats: {
    large: { url: string };
  };
}

interface BannerData {
  id: number;
  documentId: string;
  altname: string;
  image: BannerImage;
}

interface ProductData {
  ID: number;
  Product_Name: string;
  Region: string;
  Price: number;
}

const RegionalPageDetail = () => {
  const router = useRouter();
  const params = useParams();
  const region = params?.region as string | undefined;
  const [regionData, setRegionData] = useState<any | null>(null);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch region data based on region name
        if (region) {
          const regionResponse = await fetch(`https://inspiring-power-f8fa08a4a5.strapiapp.com/api/regionals?filters[region][$eq]=${encodeURIComponent(region)}`);
          const regionDataResult = await regionResponse.json();
          if (regionDataResult.data.length > 0) {
            setRegionData(regionDataResult.data[0]);
          }

          // Fetch banners based on selected region
          const bannerResponse = await fetch(`https://inspiring-power-f8fa08a4a5.strapiapp.com/api/regional-banners?filters[regional][region][$eq]=${encodeURIComponent(region)}&populate=image`);
          const bannerData = await bannerResponse.json();
          if (bannerData.data) {
            setBanners(bannerData.data);
          }
        }

        // Fetch product data based on selected region
        if (region) {
          const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/common/products?offset=1&list_per_page=100000&customer_type=Retail&product_type=NORMAL&region=${encodeURIComponent(region)}`);
          const productData = await productResponse.json();
          if (productData.data) {
            setProducts(productData.data);
          } else {
            const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/common/products?offset=1&list_per_page=100000&customer_type=Retail&product_type=NORMAL`);
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.data) {
              setProducts(fallbackData.data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (banners.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [region, banners.length]);

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen space-y-8"> {/* Gap konsisten antar section */}
      {/* Hero Section with Banner Slider */}
      <div className="relative w-full overflow-hidden pb-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <div key={banner.documentId} className="w-full flex-shrink-0">
                <div className="w-full bg-gray-100 flex items-center justify-center">
                  <img
                    src={banner.image.formats.large.url}
                    alt={banner.altname || 'Banner'}
                    className="max-h-full w-full"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full bg-gray-200 h-64 flex items-center justify-center flex-shrink-0">
              No banner available
            </div>
          )}
        </div>
      </div>

      {/* New Responsive Section after Banner */}
      <div className="container mx-auto px-4 py-8 rounded-lg">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src="/imgs/dummy-foto.jpg"
              alt="Placeholder"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-3xl font-bold mb-4">Nikmati Keunggulan Internet Kami</h2>
            <p className="text-gray-700 mb-4">
              Kami menghadirkan koneksi internet fiber optik berkecepatan tinggi yang dirancang untuk kebutuhan digital keluarga modern. Nikmati streaming mulus, gaming tanpa lag, dan kerja dari rumah yang produktif.
            </p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✔</span> Kecepatan Unggul untuk Semua Perangkat
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✔</span> Jaminan Kestabilan Jaringan 24/7
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✔</span> Pemasangan Mudah dan Cepat
              </li>
            </ul>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Cek Paket & Harga
            </button>
          </div>
        </div>
      </div>

      {/* New Text Section above Product Card */}
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-2">Temukan Layanan yang Tepat di Daerahmu</h2>
        <p className="text-lg text-gray-600 mb-2">
          Kami paham, internet cepat bukan lagi pilihan — tapi kebutuhan utama.
        </p>
        <p className="text-xs text-gray-600">
          Karena semua orang butuh koneksi yang bisa diandalkan, kapan pun dan di mana pun.
        </p>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 lg:px-8">
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
          className="w-full mb-12"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.ID} className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent">
                  {/* Product Card */}
                  <div className="flex items-center justify-center bg-orange-500 text-white px-4 py-6 sm:py-7 lg:py-9 text-center">
                    <div className="text-[36px] sm:text-[40px] lg:text-[70px] tracking-[1%] leading-[45px] font-bold text-center">
                      {product.Product_Name.match(/Up To (\d+)/)?.[1] || 'N/A'}
                      <span className="text-[16px] sm:text-[20px]">/Mbps</span>
                    </div>
                  </div>
                  <div className="relative flex flex-col justify-center items-center p-4 lg:p-6">
                    <div className="text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3 lg:mb-5">
                      Rp.{(product.Price * 12).toLocaleString('id-ID')}
                      <span className="text-[16px] sm:text-[20px]">/Tahun</span>
                    </div>
                    <img src="/icons/arrow-pricing.svg" alt="" width={65} height={65} className="size-[45px] sm:size-[55px] lg:size-[65px] absolute z-10 left-10 sm:left-12 lg:left-9 top-10 lg:top-13" />
                    <div className="text-base lg:text-[30px] tracking-[1%] leading-[26px] font-medium text-orange-700 mb-2">
                      Rp.{product.Price.toLocaleString('id-ID')}
                      <span className="text-[16px] sm:text-[20px]">/Bulan</span>
                    </div>
                    <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">Mau langganan setahun? Bisa dicicil, kok!</p>
                  </div>

                  {/* Feature block */}
                  <div className="mx-4 mb-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
                    <div className="space-y-3">
                      {['Fast and reliable connection', 'No contract required', 'Easy setup Process'].map((text, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">✓</span>
                          <span className="text-sm text-gray-800">{text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="my-4 h-0.5 w-full bg-orange-300" />
                    <div className="flex items-center justify-around text-orange-600">
                      <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">1080p FULLHD</span>
                      <span className="text-xs font-semibold">🎮 Gaming</span>
                      <span className="text-xs font-semibold">∞ Unlimited</span>
                    </div>
                  </div>

                  {/* Bottom action buttons */}
                  <div className="px-4 pb-6 flex flex-col gap-3">
                    <button
                      className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                      onClick={() => router.push('/kategori/rumah')}
                    >
                      <span>Selengkapnya</span>
                      <span className="transition-transform">▾</span>
                    </button>
                    <button
                      onClick={() => router.push('/entri-prospek')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Subscribe
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Artikel Section as Carousel */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Artikel</h2>
        <p className="text-gray-700 mb-6">Biarakan Customer yang Menilai Produk Kita!</p>
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
          className="w-full mb-12"
        >
          <CarouselContent>
            {[
              {
                title: 'Tips & Tricks',
                description: 'Apa rencana internet rumah yang tepat untuk Anda?',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."'
              },
              {
                title: 'Tips & Tricks',
                description: 'Apa rencana internet rumah yang tepat untuk Anda?',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."'
              },
              {
                title: 'Tips & Tricks',
                description: 'Apa rencana internet rumah yang tepat untuk Anda?',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."'
              }
            ].map((article, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-gray-100 p-4 rounded-lg h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-700 mb-2">{article.description}</p>
                    <p className="text-gray-700">{article.content}</p>
                  </div>
                  <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                    Learn More +
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default RegionalPageDetail;