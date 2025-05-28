'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);
  const formattedCount = count.toLocaleString('id-ID');

  return <span ref={ref}>{formattedCount}</span>;
};

const CountingAnimation: React.FC = () => {
  const counts = [
    { end: 186, label: 'Kota/Kabupaten' },
    { end: 3603, label: 'Kelurahan' },
    { end: 8817, label: 'Gedung/Area' },
    { end: 2636358, label: 'Homepass' },
  ];

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {counts.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-bold mb-2">
                <CountUp end={item.end} duration={2000} /> {/* Duration in milliseconds */}
              </div>
              <div className="text-sm md:text-base text-gray-400">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountingAnimation; 