import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
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
  );
};

export default Footer; 