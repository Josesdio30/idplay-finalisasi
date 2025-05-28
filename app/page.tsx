import Image from "next/image";
import CountingAnimation from "@/app/_components/CountingAnimation";
import Promosi from "@/app/_components/Promosi";
import PaketInternet from "@/app/_components/PaketInternet";
import KeunggulanLayanan from "@/app/_components/KeunggulanLayanan";
import CaraBerlangganan from "@/app/_components/CaraBerlangganan";
import TestimoniPelanggan from "@/app/_components/TestimoniPelanggan";
import FAQ from "@/app/_components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-3 px-8 flex justify-between items-center z-50">
        <div className="flex items-center">
          <Image
            src="/imgs/logo-idplay.png"
            alt="IdPlay Logo"
            width={120}
            height={40}
            priority
          />
        </div>
        <div className="flex space-x-8 text-gray-800 text-sm font-medium">
          <a href="#" className="hover:text-orange-500 transition-colors">Produk</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Promo</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Berita & Acara</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Lokasi</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Dukungan</a>
          <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Pusat Kontak</a>
          <a href="#" className="hover:text-orange-500 transition-colors">MyBiznet</a>
        </div>
        <div className="flex items-center space-x-2">
          <select className="border-none outline-none bg-transparent text-gray-800 text-sm">
            <option>ID</option>
            <option>EN</option>
          </select>
        </div>
      </nav>
      <section className="relative h-[600px] bg-cover bg-center mt-16" style={{ backgroundImage: "url('/banner-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-20 text-white max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Internet Cepat & Stabil,<br />Tanpa Drama
          </h1>
          <p className="text-3xl mt-6 font-semibold text-orange-400 tracking-wide">#PAKEBIZNET</p>
        </div>
      </section>
      <section className="bg-gray-50 py-8 px-20 flex justify-center items-center">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-semibold text-orange-500 whitespace-nowrap">
            Temukan Harga Terbaik di Kota Kamu
          </h2>
          <select className="border border-orange-500 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none">
            <option>Pilih Provinsi</option>
            <option>Jawa Barat</option>
            <option>Jawa Tengah</option>
            <option>Jawa Timur</option>
          </select>
          <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none -ml-2">
            <option>Pilih Kota</option>
            <option>Bandung</option>
            <option>Semarang</option>
            <option>Surabaya</option>
          </select>
          <button className="bg-orange-500 text-white rounded-full px-6 py-2 hover:bg-orange-600 transition-colors font-medium">
            Cari
          </button>
          <button className="border border-gray-300 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium">
            Lokasi Saya
          </button>
        </div>
      </section>
      <CountingAnimation />
      <KeunggulanLayanan />
      <Promosi />
      <PaketInternet /> 
      <CaraBerlangganan />
      <TestimoniPelanggan />
      <FAQ />
    </div>
  );
}