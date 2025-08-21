import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-0">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Logo and Company Info */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image
                // src="/imgs/logo-idplay.png"
                src="/idplay-logo.svg"
                alt="IdPlay Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Home</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Berita & Informasi</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Office & Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Akun</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm">Facebook</li>
              <li className="flex items-center gap-2 text-sm">Instagram</li>
              <li className="flex items-center gap-2 text-sm">Twitter</li>
            </ul>

            {/* Social Media */}
            <div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
