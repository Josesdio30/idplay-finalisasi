'use client';
import FAQ from '@/app/_components/FAQ';
import { FaTachometerAlt, FaGamepad, FaUsers, FaHome, FaWrench } from 'react-icons/fa';
import { useState } from 'react';
import HeroSection from './_components/Hero';

import TestimoniPelanggan from './_components/TestimoniPelanggan';
import Image from 'next/image';
import CompareProduct from './_components/CompareProduct';
import { cn } from '@/lib/utils';
import CekCoverage from './_components/CekCoverage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'speed' | 'help' | 'quiz'>('speed');
  const [paketTab, setPaketTab] = useState<'bulan' | 'tahun'>('bulan');
  const navigate = useRouter();

  // Icons for the "What is Fiber" tab
  const fiberIcons = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <g
            stroke="#0099e5"
            strokeWidth="2"
            fill="none"
          >
            <path d="M10 30V15a10 10 0 0 1 20 0v15" />
            <circle
              cx="20"
              cy="10"
              r="2"
              fill="#0099e5"
            />
          </g>
        </svg>
      ),
      label: 'Fiber'
    },
    { icon: <FaTachometerAlt className="w-8 h-8 text-blue-500" />, label: 'Speed' },
    { icon: <FaGamepad className="w-8 h-8 text-blue-500" />, label: 'Gaming' },
    { icon: <FaUsers className="w-8 h-8 text-blue-500" />, label: 'Family' },
    { icon: <FaHome className="w-8 h-8 text-blue-500" />, label: 'Smart Home' },
    { icon: <FaWrench className="w-8 h-8 text-blue-500" />, label: 'Support' }
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Banner/Card Section */}
      <HeroSection />
      <CekCoverage />
      {/* <Review /> */}

      {/* Our Services Section */}
      <section className="w-full py-14 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-xl lg:text-4xl leading-[106%] tracking-[6%] font-bold text-center mb-[30px] text-orange-500">
            Layanan Kami?
          </h2>
          <p className="text-center text-gray-500 text-base lg:text-lg leading-[161%] tracking-[10%] font-base mb-10">
            Internet cepat dan andal dengan teknologi terbaru. <br /> Koneksi stabil untuk semua
            kebutuhan digital Anda.
          </p>
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* For Home */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-lg h-[280px] sm:h-[340px] md:h-[400px] flex items-end">
              <img
                src="/imgs/card1.jpg"
                alt="For Home"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FE5E00] to-[#FE5E00]/0" />
              <div className="relative z-10 p-4 sm:p-6 text-white">
                <div className="text-2xl font-bold mb-2">For Home</div>
                <div className="text-base font-light mb-2">
                  "As a home internet provider, fast and stable connectivity is key to your family's
                  comfort and productivity."
                </div>
              </div>
            </div>
            {/* For Business */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[280px] sm:h-[340px] md:h-[400px] flex items-end">
              <img
                src="/imgs/card2.jpg"
                alt="For Business"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 to-transparent" />
              <div className="relative z-10 p-4 sm:p-6 text-white">
                <div className="text-2xl font-bold mb-2">For Business</div>
                <div className="text-base font-light mb-2">
                  Add-ons are optional features that enhance your main service — offering more
                  control, speed, or coverage based on your needs.
                </div>
              </div>
            </div>
            {/* Add-Ons */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[280px] sm:h-[340px] md:h-[400px] flex items-end">
              <img
                src="/imgs/card3.jpg"
                alt="Add-Ons"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/60 to-transparent" />
              <div className="relative z-10 p-4 sm:p-6 text-white">
                <div className="text-2xl font-bold mb-2">Add-Ons</div>
                <div className="text-base font-light mb-2">
                  Add-ons are optional features that enhance your main service — offering more
                  control, speed, or coverage based on your needs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-12 mb-12">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-center bg-orange-500 text-white px-4 py-6 sm:py-7 lg:py-9 text-center">
                  <div className="text-[36px] sm:text-[40px] lg:text-[70px] tracking-[1%] leading-[45px] font-bold text-center">
                    700<span className="text-[16px] sm:text-[20px]">/Mbps</span>
                  </div>
                </div>
                <div className="relative flex flex-col justify-center items-center p-4 lg:p-6">
                  <div className="text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3 lg:mb-5">
                    Rp.1.700.000<span className="text-[16px] sm:text-[20px]">/Tahun</span>
                  </div>
                  <Image
                    src="/icons/arrow-pricing.svg"
                    alt=""
                    width={65}
                    height={65}
                    className="size-[45px] sm:size-[55px] lg:size-[65px] absolute z-10 left-10 sm:left-12 lg:left-9 top-10 lg:top-13"
                  />
                  <div className="text-base lg:text-[30px] tracking-[1%] leading-[26px] font-medium text-orange-700 mb-2">
                    Rp.350.000<span className="text-[16px] sm:text-[20px]">/Bulan</span>
                  </div>
                  <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">
                    Mau langganan setahun? Bisa dicicil, kok!
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Broadband Facts Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg p-6 text-black border border-orange-500"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-4 border-orange-500 pb-2">
                  Broadband Facts
                </h3>

                <div className="">
                  <div>
                    <h4 className="font-bold">IDPlay</h4>
                    <p className="text-sm font-semibold">12 Months 25 MBp/S</p>
                    <p className="text-sm mt-1">Lorem Ipsum Dolor Sit Amet</p>
                  </div>

                  <div>
                    <div className="flex w-full h-[2px] bg-orange-500 mt-4 mb-2"></div>
                    <h4 className="font-semibold text-gray-800">Monthly Charges</h4>
                    <div className="flex w-full h-[2px] bg-orange-500 mb-4 mt-2"></div>

                    <p>Lorem Ipsum Dolor Sit Amet:</p>
                    <div className="pl-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Lorem Ipsum</span>
                        <span>12 Months</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Lorem Ipsum</span>
                        <span>Rp 1.740.000</span>
                      </div>
                    </div>
                    <div className="flex w-full h-[2px] bg-orange-500 mb-4 mt-2"></div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Additional Charges & Terms</h4>
                    <div className="pl-2">
                      <p className="text-sm font-medium">Provider Monthly Fees</p>
                      <div className="pl-2">
                        <p className="text-sm text-gray-600">Lorem Ipsum</p>
                        <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      </div>
                      <p className="text-sm font-medium mt-3">One-time Purchase Fees</p>
                      <p className="text-sm font-medium mt-3">Early Termination Fees</p>
                      <p className="text-sm font-medium mt-3">Government Taxes</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex w-full h-[2px] bg-orange-500 mt-4 mb-2"></div>
                    <h4 className="font-semibold text-gray-800">Discounts & Bundles</h4>
                    <div className="flex w-full h-[2px] bg-orange-500 mb-4 mt-2"></div>

                    <div className="pl-2">
                      <p className="text-sm font-medium">Speeds Provided with Plans</p>
                      <div className="pl-2">
                        <p className="text-sm text-gray-600">Lorem Ipsum</p>
                        <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      </div>
                      <p className="text-sm font-medium mt-3">One-time Purchase Fees</p>
                      <p className="text-sm font-medium mt-3">Early Termination Fees</p>
                      <p className="text-sm font-medium mt-3">Government Taxes</p>
                    </div>
                    <div className="flex w-full h-[2px] bg-orange-500 my-4"></div>
                    <div className="pl-2">
                      <p className="text-sm font-medium">Customer Support</p>
                      <div className="pl-2">
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-sm text-gray-600">Website</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate.push('/payment');
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <TestimoniPelanggan />

      {/* <CountingAnimation /> */}
      {/* <Promosi />
        <KeunggulanLayanan />
        <PaketInternet /> 
        <CaraBerlangganan />
        <TestimoniPelanggan /> */}
      <FAQ />
      <CompareProduct />
    </div>
  );
}
