'use client'

import Image from "next/image";
import CountingAnimation from "@/app/_components/CountingAnimation";
import Promosi from "@/app/_components/Promosi";
import PaketInternet from "@/app/_components/PaketInternet";
import KeunggulanLayanan from "@/app/_components/KeunggulanLayanan";
import CaraBerlangganan from "@/app/_components/CaraBerlangganan";
import TestimoniPelanggan from "@/app/_components/TestimoniPelanggan";
import FAQ from "@/app/_components/FAQ";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
import { useState } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar/>
      <section className="relative h-[320px] xs:h-[400px] md:h-[800px] mt-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/idplay-home.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 md:h-60 bg-gradient-to-b from-transparent to-black z-20"></div>
        <div className="relative z-30 flex flex-col items-start justify-center h-full pt-6 md:pt-0 px-4 md:px-20 text-white max-w-full md:max-w-3xl">
          <h1 className="text-xl xs:text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Internet Cepat & Stabil,<br />Tanpa Drama
          </h1>
          <button className="mt-4 md:mt-6 bg-orange-400 hover:bg-green-500 text-white font-semibold px-2 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-lg transition-colors">
            Langganan Sekarang
          </button>
        </div>
        <section className="md:block absolute bottom-20 left-10 w-full bg-transparent py-6 px-8 z-30 hidden md:flex">
          <div className="flex flex-row items-center w-full max-w-5xl mx-auto gap-x-4">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 bg-clip-text text-transparent whitespace-nowrap text-left animate-gradient-x">
              Temukan Harga Terbaik di Kota Kamu
            </h2>
            <div className="flex flex-row items-center gap-x-2 flex-grow">
              <select className="border border-orange-500 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none min-w-[150px] max-w-[200px] flex-1">
                <option>Pilih Provinsi</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none min-w-[150px] max-w-[200px] flex-1">
                <option>Pilih Kota</option>
                <option>Bandung</option>
                <option>Semarang</option>
                <option>Surabaya</option>
              </select>
              <button className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors font-medium flex items-center justify-center min-w-[40px]">
                <FaSearch className="text-lg" />
              </button>
              <button className="rounded-full px-6 py-2 text-white bg-orange-500 hover:bg-orange-600 transition-colors min-w-[150px] max-w-[200px] flex-1">
                Lokasi Saya
              </button>
            </div>
          </div>
        </section>
      </section>
      <section className="md:hidden bg-black py-4 px-4">
        <div className="flex flex-col items-center w-full gap-y-4">
          <h2 className="text-lg xs:text-xl font-semibold bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 bg-clip-text text-transparent whitespace-nowrap text-center animate-gradient-x w-full mb-2">
            Temukan Harga Terbaik di Kota Kamu
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <select className="border border-orange-500 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none w-full xs:w-48">
              <option>Pilih Provinsi</option>
              <option>Jawa Barat</option>
              <option>Jawa Tengah</option>
              <option>Jawa Timur</option>
            </select>
            <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none w-full xs:w-48">
              <option>Pilih Kota</option>
              <option>Bandung</option>
              <option>Semarang</option>
              <option>Surabaya</option>
            </select>
            <button className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors font-medium flex items-center justify-center w-12 h-12">
              <FaSearch className="text-lg" />
            </button>
            <button className="rounded-full px-6 py-2 text-white bg-orange-500 hover:bg-orange-600 transition-colors w-full xs:w-48 font-medium">
              Lokasi Saya
            </button>
          </div>
        </div>
      </section>
      <div className="md:px-0">
        <CountingAnimation />
        <Promosi />
        <KeunggulanLayanan />
        <PaketInternet /> 
        <CaraBerlangganan />
        <TestimoniPelanggan />
        <FAQ />
      </div>
      <Footer/>
    </div>
  );
}