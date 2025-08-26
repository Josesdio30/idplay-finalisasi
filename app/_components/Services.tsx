import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'For Home',
      description:
        "As a home internet provider, fast and stable connectivity is key to your family's comfort and productivity.",
      image: '/imgs/card1.jpg',
      gradient: 'from-[#FE5E00] to-[#FE5E00]/0',
      colSpan: 'md:col-span-2'
    },
    {
      id: 2,
      title: 'For Business',
      description:
        'Add-ons are optional features that enhance your main service — offering more control, speed, or coverage based on your needs.',
      image: '/imgs/card2.jpg',
      gradient: 'from-green-700/70 to-transparent',
      colSpan: ''
    },
    {
      id: 3,
      title: 'Add-Ons',
      description:
        'Add-ons are optional features that enhance your main service — offering more control, speed, or coverage based on your needs.',
      image: '/imgs/card3.jpg',
      gradient: 'from-green-500/60 to-transparent',
      colSpan: ''
    }
  ];

  const ServiceCard = ({
    service,
    className = ''
  }: {
    service: (typeof services)[0];
    className?: string;
  }) => (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg h-[280px] sm:h-[340px] md:h-[400px] flex items-end ${className}`}
    >
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient}`} />
      <div className="relative z-10 p-4 sm:p-6 text-white">
        <div className="text-2xl font-bold mb-2">{service.title}</div>
        <div className="text-base font-light mb-2">{service.description}</div>
      </div>
    </div>
  );

  return (
    <section className="w-full py-14 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-xl lg:text-4xl leading-[106%] tracking-[6%] font-bold text-center mb-[30px] text-orange-500">
          Layanan Kami?
        </h2>
        <p className="text-center text-gray-500 text-base lg:text-lg leading-[161%] tracking-[10%] font-base mb-10">
          Internet cepat dan andal dengan teknologi terbaru. <br /> Koneksi stabil untuk semua
          kebutuhan digital Anda.
        </p>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
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
              {services.map((service) => (
                <CarouselItem
                  key={service.id}
                  className="pl-2 md:pl-4 basis-full"
                >
                  <ServiceCard service={service} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className={service.colSpan}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
