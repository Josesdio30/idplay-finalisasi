'use client';

import API from '@/lib/axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Banner, StrapiApiResponseBanner } from '@/app/type';

function BannerSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await API.get<StrapiApiResponseBanner<Banner[]>>(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/national-banners?populate=*`
        );

        if (res.data && Array.isArray(res.data.data)) {
          setBanners(res.data.data);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading || banners.length === 0) {
    return null;
  }

  return (
    <section className="px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <Carousel
          opts={{ loop: true }}
          setApi={(api) => {
            if (!api) return;
            api.on('select', () => {
              setActiveIndex(api.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative w-full">
                  <Image
                    src={banner.image.url}
                    alt={banner.altname || banner.image.alternativeText || 'Banner'}
                    width={banner.image.width}
                    height={banner.image.height}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === idx ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
