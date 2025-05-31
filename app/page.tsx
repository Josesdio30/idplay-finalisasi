import Image from "next/image";
import CountingAnimation from "@/app/_components/CountingAnimation";
import Promosi from "@/app/_components/Promosi";
import PaketInternet from "@/app/_components/PaketInternet";
import KeunggulanLayanan from "@/app/_components/KeunggulanLayanan";
import CaraBerlangganan from "@/app/_components/CaraBerlangganan";
import TestimoniPelanggan from "@/app/_components/TestimoniPelanggan";
import FAQ from "@/app/_components/FAQ";
import { FaSearch } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <section className="relative h-[320px] xs:h-[400px] md:h-[800px] mt-0 overflow-hidden">
        <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-sm shadow-md py-3 px-4 md:px-8 flex justify-between items-center z-50">
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
          <div className="hidden md:flex space-x-4 lg:space-x-8 text-white text-sm font-medium drop-shadow-md">
            <a href="#" className="hover:text-orange-500 transition-colors">Produk</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Promo</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Berita & Acara</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Lokasi</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Dukungan</a>
            <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Pusat Kontak</a>
          </div>
          <div className="flex items-center space-x-2">
            <select className="border-none outline-none bg-transparent text-white text-sm drop-shadow-md">
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
        <div className="relative z-30 flex flex-col items-start justify-center h-full pt-6 md:pt-0 px-4 md:px-20 text-white max-w-full md:max-w-3xl">
          <h1 className="text-xl xs:text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Internet Cepat & Stabil,<br />Tanpa Drama
          </h1>
          <button className="mt-4 md:mt-6 bg-orange-400 hover:bg-green-500 text-white font-semibold px-2 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-lg transition-colors">
            Langganan Sekarang
          </button>
        </div>
        <section className="md:block absolute bottom-20 left-10 w-full bg-transparent py-6 px-8 z-30 hidden md:flex">
          <div className="flex flex-row items-center w-full max-w-5xl gap-x-4">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 bg-clip-text text-transparent whitespace-nowrap text-left animate-gradient-x">
              Temukan Harga Terbaik di Kota Kamu
            </h2>
            <div className="flex flex-row items-center gap-x-2">
              <select className="border border-orange-500 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none w-60">
                <option>Pilih Provinsi</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none w-60">
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
      <footer className="bg-gradient-to-br from-white via-orange-500 to-orange-600 relative text-white mt-0">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1">
            <div className="mb-6">
              <Image
                src="/imgs/logo-idplay.png"
                alt="IdPlay Logo"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </div>
            <div className="mb-4">
              <span className="text-xl font-bold block mb-2">HEAD OFFICE</span>
              <span className="block mb-2">
                Rukan Artha Gading, Jl. Boulevard Artha Gading No.12 Blok E 11-13, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240
              </span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 inline-block" />
              <span>0822 8998 6477</span>
            </div>
            <div className="mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 inline-block" />
              <span>cx.ays@supercorridor.co.id</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col md:items-end">
            <span className="text-xl font-bold mb-4">REGIONAL OFFICE</span>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10" />
                </svg>
                JABODEBEK
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10" />
                </svg>
                Jawa Barat
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10" />
                </svg>
                Jawa Timur
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10" />
                </svg>
                Banten
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10" />
                </svg>
                Jawa Tengah
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10" />
                </svg>
                Sulawesi
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-4">
          Copyright © {new Date().getFullYear()} IdPlay
        </div>
      </footer>
    </div>
  );
}