'use client';

import Image from "next/image";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Kategori", href: "/kategori", hasDropdown: true },
  { label: "Berita & Informasi", href: "/article", hasDropdown: true },
  { label: "Regional", href: "/regional", hasDropdown: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 w-full bg-white shadow-sm border-b border-gray-200 py-3 px-4 md:px-8 flex justify-between items-center z-50">
        <div className="flex items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-green-600">idPI</span>
            <span className="text-orange-500">Ay</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={clsx(
                  "text-gray-700 hover:text-orange-500 transition-colors flex items-center",
                  isActive && "text-orange-500"
                )}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </a>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
            <FaSearch className="h-5 w-5" />
          </button>
          <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="relative w-6 h-6 text-gray-700 focus:outline-none"
          >
            <FaBars
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen
                  ? "opacity-0 scale-75 rotate-45"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            />
            <FaTimes
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-45"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden fixed top-[60px] left-0 w-full bg-white shadow-lg z-40 transform transition-all duration-300 origin-top",
          isMenuOpen
            ? "scale-y-100 opacity-100 max-h-screen"
            : "scale-y-0 opacity-0 max-h-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col items-center space-y-4 py-4 text-gray-700 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={clsx(
                "transition-colors flex items-center",
                pathname === item.href
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              )}
              onClick={toggleMenu}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </a>
          ))}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 w-full justify-center">
            <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <FaSearch className="h-5 w-5" />
            </button>
            <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;