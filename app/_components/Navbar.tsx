'use client';

import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-8 text-white text-sm font-medium drop-shadow-md">
          <a href="#" className="hover:text-orange-500 transition-colors">Produk</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Promo</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Berita & Acara</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Lokasi</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Dukungan</a>
          <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Pusat Kontak</a>
        </div>

        {/* Desktop Language Selector */}
        <div className="hidden md:flex items-center space-x-2">
          <select className="border-none outline-none bg-transparent text-white text-sm drop-shadow-md">
            <option>ID</option>
            <option>EN</option>
          </select>
        </div>

        {/* Mobile Burger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="relative w-6 h-6 text-white focus:outline-none">
            {/* FaBars */}
            <FaBars
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen ? "opacity-0 scale-75 rotate-45" : "opacity-100 scale-100 rotate-0"
              }`}
            />

            {/* FaTimes */}
            <FaTimes
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Smooth Transition) */}
      <div
        className={clsx(
          "md:hidden fixed top-[60px] left-0 w-full bg-black/90 backdrop-blur-sm z-40 transform transition-all duration-300 origin-top",
          isMenuOpen ? "scale-y-100 opacity-100 max-h-screen" : "scale-y-0 opacity-0 max-h-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col items-center space-y-4 py-4 text-white text-sm font-medium drop-shadow-md">
          {["Produk", "Promo", "Berita & Acara", "Lokasi", "Dukungan", "FAQ", "Pusat Kontak"].map((item) => (
            <a key={item} href="#" className="hover:text-orange-500 transition-colors" onClick={toggleMenu}>
              {item}
            </a>
          ))}
          <div className="flex items-center space-x-2">
            <select className="border-none outline-none bg-transparent text-white text-sm drop-shadow-md" onChange={toggleMenu}>
              <option>ID</option>
              <option>EN</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
