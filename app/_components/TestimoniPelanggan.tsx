'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const testimonials = [
  { quote: 'Sejak pake idPlay,\nnonton 4K ama YouTube\nbener-bener mulus,\ngak ada drama buffering.\nInternetnya ngebut dan stabil.', name: 'Riko', city: 'Content Creator' },
  { quote: 'Sangat puas dengan\nkoneksi 100% fiber\noptiknya, gaming jadi\nbebas lag! Luar biasa\ndan sangat memuaskan.', name: 'Pelanggan B', city: 'Bandung' },
  { quote: 'Support 24/7 sangat\nresponsif, masalah\ncepat teratasi.\nPelayanan top banget,\nsangat membantu sekali.', name: 'Pelanggan C', city: 'Surabaya' },
  { quote: 'Internetnya kencang,\nstreaming 4K lancar\ntanpa buffering!\nSungguh memuaskan,\nlayanan terbaik abis.', name: 'Pelanggan D', city: 'Yogyakarta' },
  { quote: 'Harga terjangkau untuk\nkecepatan yang diberikan,\nsangat worth it.\nKeren abis, sangat\nmenguntungkan user!', name: 'Pelanggan E', city: 'Medan' },
  { quote: 'Instalasi cepat,\nteknisi ramah dan\nprofesional.\nLayanan yang sangat oke,\nselalu memuaskan hati.', name: 'Pelanggan F', city: 'Semarang' },
  { quote: 'Tidak pernah ada\ngangguan, sangat\nreliable untuk bisnis\nonline. Top markotop,\nlayanan unggulan abis.', name: 'Pelanggan G', city: 'Makassar' },
  { quote: 'Koneksi stabil,\nmeeting online jadi\nlancar tanpa putus.\nSangat membantu sekali,\ninternet terbaik banget.', name: 'Pelanggan H', city: 'Bali' },
  { quote: 'Kecepatan upload dan\ndownload sama-sama\nkencang, cocok untuk\ncontent creator.\nSangat luar biasa abis!', name: 'Pelanggan I', city: 'Palembang' },
  { quote: 'Pelayanan pelanggan\nsangat baik, selalu\nsiap membantu kapan\nsaja. Mantap abis,\nlayanan top level!', name: 'Pelanggan J', city: 'Malang' },
  { quote: 'Internetnya ngebut,\ndownload file besar\nhanya butuh hitungan\ndetik. Keren abis,\nperforma luar biasa!', name: 'Pelanggan K', city: 'Batam' },
  { quote: 'Keren, sekarang kerja\nremote jauh lebih\nmudah dengan internet\nini. Memuaskan,\nlayanan unggul abis.', name: 'Pelanggan L', city: 'Pekanbaru' },
  { quote: 'Gaming online jadi\nmenyenangkan, ping\nrendah dan stabil.\nLayanan terbaik abis,\npuas banget pakai ini!', name: 'Pelanggan M', city: 'Manado' },
  { quote: 'Tidak ada batasan\nkuota, bebas internetan\nsepuasnya!\nPelayanan sangat oke,\nmemuaskan hati user.', name: 'Pelanggan N', city: 'Balikpapan' },
  { quote: 'Layanan internet\nterbaik yang pernah\nsaya coba, sangat\nrecommended.\nKeren abis, top banget!', name: 'Pelanggan O', city: 'Bogor' },
];

const TestimoniPelanggan = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const startMarquee = async (fromX = 0) => {
    const containerWidth = marqueeRef.current?.scrollWidth ?? 0;
    const toX = fromX - containerWidth / 2;

    await controls.start({
      x: [fromX, toX],
      transition: {
        duration: 200 * (1 - Math.abs(fromX / toX)),
        ease: "linear",
        repeat: Infinity,
      },
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
    <section className="py-16 bg-teal-500 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-white">Testimoni Pelanggan</h2>
        <div className="relative w-full overflow-hidden">
          <motion.div
            ref={marqueeRef}
            className="flex w-max whitespace-nowrap"
            drag="x"
            style={{ x }}
            dragConstraints={{ left: -1000, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              requestAnimationFrame(() => {
                const finalX = x.get();
                startMarquee(finalX);
              });
            }}
            animate={controls}
          >
            {[...testimonials, ...testimonials].map((testimoni, index) => (
              <div
                key={index}
                className="relative inline-block bg-white p-6 pb-0 rounded-lg shadow-md mx-4 mb-1 w-72 flex-shrink-0 transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer text-left overflow-hidden flex flex-col justify-between min-h-48"
              >
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div
                    className="w-32 h-32 bg-contain bg-no-repeat bg-center opacity-25"
                    style={{ backgroundImage: `url('/imgs/logo-idplay.png')` }}
                  />
                </div>
                <p className="text-gray-700 italic mb-4 break-words whitespace-normal flex-grow z-10 relative">
                  "{testimoni.quote}"
                </p>
                <div className="mt-auto z-10 relative">
                  <p className="text-gray-900 font-semibold">{testimoni.name}</p>
                  <p className="text-gray-600 text-sm">{testimoni.city}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimoniPelanggan;