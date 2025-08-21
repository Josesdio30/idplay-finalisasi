'use client';

import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Kategori',
    href: '/kategori',
    hasDropdown: true,
    subItems: [
      { label: 'Rumah', href: '/kategori/rumah' },
      { label: 'Bisnis', href: '/kategori/bisnis' },
      { label: 'Add-ons', href: '/kategori/add-ons' },
    ],
  },
  { label: 'Berita & Informasi', href: '/article', hasDropdown: false }, // sementara false, menunggu subitem
  { label: 'Regional', href: '/regional', hasDropdown: false } // sementara false, menunggu subitem
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      setOpenMobileDropdown(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleDesktopDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 left-0 w-full bg-white h-14 md:h-16 px-4 md:px-8 flex justify-between items-center z-50 transition-all duration-300 ease-in-out',
          isScrolled ? 'shadow-md' : ''
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-26 h-10 flex items-center">
            <Image src="/idplay-logo.svg" alt="IdPlay Logo" width={120} height={40} priority />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDesktopDropdown(item.label)}
                    className={clsx(
                      'text-gray-700 hover:text-orange-500 transition-colors flex items-center',
                      isActive && 'text-orange-500'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {openDropdown === item.label && item.subItems && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  'text-gray-700 hover:text-orange-500 transition-colors flex items-center',
                  isActive && 'text-orange-500'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-x-6">
          <button className="flex items-center justify-center p-2 border border-slate-200 bg-transparent rounded-full shadow-sm transition-colors">
            <FaSearch className="h-4 w-4 text-orange-500" />
          </button>
          <div className="flex items-center gap-x-2">
            <Link href="/login" className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-4 py-1.5 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="relative w-6 h-6 text-gray-700 focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <FaBars
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <FaTimes
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={clsx(
          'md:hidden fixed top-14 md:top-16 left-0 w-full bg-white shadow-lg z-40 transform transition-all duration-300 origin-top',
          isMenuOpen
            ? 'scale-y-100 opacity-100 max-h-screen'
            : 'scale-y-0 opacity-0 max-h-0 overflow-hidden'
        )}
      >
        <div className="flex flex-col items-center space-y-4 py-4 text-gray-700 text-sm font-medium">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.hasDropdown) {
              return (
                <div key={item.label} className="w-full text-center">
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className={clsx(
                      'w-full flex items-center justify-center transition-colors',
                      isActive ? 'text-orange-500' : 'hover:text-orange-500'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {openMobileDropdown === item.label && item.subItems && (
                    <div className="flex flex-col items-center space-y-2 mt-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="text-gray-700 hover:text-orange-500 transition-colors"
                          onClick={toggleMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  'transition-colors flex items-center',
                  isActive ? 'text-orange-500' : 'hover:text-orange-500'
                )}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 w-full justify-center">
            <button className="flex items-center justify-center p-2 border border-slate-200 bg-transparent rounded-full shadow-sm transition-colors">
              <FaSearch className="h-4 w-4 text-orange-500" />
            </button>
            <Link href="/login" className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors" onClick={toggleMenu}>
              Sign In
            </Link>
            <Link href="/register" className="px-4 py-1.5 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors" onClick={toggleMenu}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
