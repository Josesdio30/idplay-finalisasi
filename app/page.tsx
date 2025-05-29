import Image from "next/image";
import CountingAnimation from "@/app/_components/CountingAnimation";
import Promosi from "@/app/_components/Promosi";
import PaketInternet from "@/app/_components/PaketInternet";
import KeunggulanLayanan from "@/app/_components/KeunggulanLayanan";
import CaraBerlangganan from "@/app/_components/CaraBerlangganan";
import TestimoniPelanggan from "@/app/_components/TestimoniPelanggan";
import FAQ from "@/app/_components/FAQ";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <section className="relative h-[320px] xs:h-[400px] md:h-[800px] mt-0 overflow-hidden">
        <nav className="fixed top-0 left-0 w-full bg-transparent shadow-md py-3 px-4 md:px-8 flex justify-between items-center z-50">
          <div className="flex items-center">
            <Image
              src="/imgs/logo-idplay.png"
              alt="IdPlay Logo"
              width={120}
              height={40}
              priority
              className="w-[100px] md:w-[120px] h-auto"
            />
          </div>
          <div className="hidden md:flex space-x-4 lg:space-x-8 text-white text-sm font-medium">
            <a href="#" className="hover:text-orange-500 transition-colors">Produk</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Promo</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Berita & Acara</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Lokasi</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Dukungan</a>
            <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Pusat Kontak</a>
          </div>
          <div className="flex items-center space-x-2">
            <select className="border-none outline-none bg-transparent text-white text-sm">
              <option>ID</option>
              <option>EN</option>
            </select>
          </div>
        </nav>
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
        <div className="relative z-30 flex flex-col items-start justify-center h-full px-4 md:px-20 text-white max-w-full md:max-w-3xl">
          <h1 className="text-2xl xs:text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Internet Cepat & Stabil,<br />Tanpa Drama
          </h1>
          <button className="mt-4 md:mt-6 bg-orange-400 hover:bg-green-500 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-lg transition-colors">
            Langganan Sekarang
          </button>
        </div>
        <section className="absolute bottom-16 md:bottom-20 left-10 w-full bg-transparent py-4 md:py-6 px-2 md:px-8 z-30">
          <div className="flex flex-col md:flex-row items-center w-full gap-y-4 md:gap-y-0 md:gap-x-4">
            <h2 className="text-lg md:text-3xl font-semibold bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 bg-clip-text text-transparent whitespace-nowrap text-center md:text-left animate-gradient-x">
              Temukan Harga Terbaik di Kota Kamu
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-x-2 w-full md:w-auto">
              <select className="border border-orange-500 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-60">
                <option>Pilih Provinsi</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-60">
                <option>Pilih Kota</option>
                <option>Bandung</option>
                <option>Semarang</option>
                <option>Surabaya</option>
              </select>
              <button className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors font-medium flex items-center justify-center">
                <FaSearch className="text-lg" />
              </button>
              <button className="rounded-full px-6 py-2 text-white bg-orange-500 hover:bg-orange-600 transition-colors w-60 font-medium">
                Lokasi Saya
              </button>
            </div>
          </div>
        </section>
      </section>
      <div className="px-2 md:px-0">
        <CountingAnimation />
        <KeunggulanLayanan />
        <Promosi />
        <PaketInternet /> 
        <CaraBerlangganan />
        <TestimoniPelanggan />
        <FAQ />
      </div>
    </div>
  );
}