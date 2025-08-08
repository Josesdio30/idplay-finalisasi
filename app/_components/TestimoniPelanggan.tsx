'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { MdFormatQuote } from 'react-icons/md';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    quote: 'The signal is super stable with no buffering when streaming movies!',
    name: 'Emily Carter',
    role: 'Content Creator',
    rating: 5,
    avatar: '/imgs/avatar1.jpg'
  },
  {
    quote: 'Gaming is smooth with zero lag just the way I like it!',
    name: 'Ethan Davis',
    role: 'Gamer & Streamer',
    rating: 5,
    avatar: '/imgs/avatar2.jpg'
  },
  {
    quote: 'Been using it for months, and the signal stays strong with no issues!',
    name: 'Chloe Anderson',
    role: 'Graphic Designer',
    rating: 5,
    avatar: '/imgs/avatar3.jpg'
  },
  {
    quote: 'The internet is perfect for remote work and meetings!',
    name: 'James Walker',
    role: 'Remote Worker',
    rating: 5,
    avatar: '/imgs/avatar4.jpg'
  },
  {
    quote: 'Fast downloads and uploads make my work so much easier!',
    name: 'Sarah Johnson',
    role: 'Video Editor',
    rating: 5,
    avatar: '/imgs/avatar5.jpg'
  },
  {
    quote: 'Customer support is amazing, always ready to help!',
    name: 'Michael Brown',
    role: 'Business Owner',
    rating: 5,
    avatar: '/imgs/avatar6.jpg'
  },
  {
    quote: 'No data limits means I can stream and work without worry!',
    name: 'Lisa Martinez',
    role: 'Marketing Manager',
    rating: 5,
    avatar: '/imgs/avatar7.jpg'
  },
  {
    quote: 'Installation was quick and the technicians were professional!',
    name: 'David Wilson',
    role: 'Freelancer',
    rating: 5,
    avatar: '/imgs/avatar8.jpg'
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`inline-block w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-[347px] mx-3 flex-shrink-0">
      <MdFormatQuote className="text-[#00934C] w-[35px] h-[35px] mb-2 rotate-180" />
      <p className="text-black font-semibold text-xl lg:text-2xl">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3 mt-3">
        <div className="w-11 lg:w-12 h-11 lg:h-12 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              const initials = testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('');
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full bg-[#00934C] text-white flex items-center justify-center font-semibold">${initials}</div>`;
              }
            }}
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
          <p className="text-gray-500 text-xs">{testimonial.role}</p>
          <div className="flex gap-1 mt-1">{renderStars(testimonial.rating)}</div>
        </div>
      </div>
    </div>
  );
};

const TestimoniPelanggan = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const startMarquee = async (fromX = 0) => {
    const containerWidth = marqueeRef.current?.scrollWidth ?? 0;
    const visibleWidth = marqueeRef.current?.clientWidth ?? 0;
    const toX = fromX - (containerWidth - visibleWidth) / 2;

    await controls.start({
      x: [fromX, toX],
      transition: {
        duration: 30,
        ease: 'linear',
        repeat: Infinity
      }
    });
  };

  useEffect(() => {
    startMarquee();
  }, []);

  useEffect(() => {
    if (isDragging) {
      controls.stop();
    } else {
      const currentX = x.get();
      startMarquee(currentX);
    }
  }, [isDragging]);

  return (
    <section className="w-full py-14 text-black overflow-hidden">
      <div className="container mx-auto pl-10 lg:pl-0">
        <div className="mb-6 lg:mb-12">
          <div className="relative ">
            <div className="absolute -left-5 -top-3 space-y-1">
              <Image
                src="/icons/arrow-testimonials-title.svg"
                alt=""
                width={26}
                height={26}
                className="rotate-45"
              />
              <Image
                src="/icons/arrow-testimonials-title.svg"
                alt=""
                width={26}
                height={26}
                className="-ml-2"
              />
            </div>
            <h3 className="text-xl md:text-4xl md:leading-[181%] tracking-[-4%] font-semibold">
              Pelanggan yang Puas <br /> Adalah Layanan Terbaik Kami.
            </h3>
          </div>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative">
          <motion.div
            ref={marqueeRef}
            className="flex"
            animate={controls}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimoniPelanggan;
