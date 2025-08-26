import { Button } from '@/components/ui/button';
import { MapPin, Network, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface IProps {
  setShowBanner: (show: boolean) => void;
}

const DefaultBanner = ({ setShowBanner }: IProps) => {
  const navigate = useRouter();
  return (
    <div className="bg-gradient-to-r from-orange-200 via-orange-50 to-white relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
      <div className="bg-gradient-to-r from-orange-200 via-orange-50 to-white relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 relative z-10 h-full">
          <div className="row-start-2 col-start-1 lg:row-start-1 lg:col-start-1 space-y-6 px-4 lg:px-8 py-6 lg:py-14">
            <h1 className="text-2xl lg:text-[50px] lg:leading-[59px] tracking-[-3%] font-bold text-gray-900">
              <span className="text-orange-500">Kecepatan Tinggi</span>
              <br />
              <span className="text-orange-500">Jangkauan Luas</span>
            </h1>

            <h2 className="text-base lg:text-[38px] lg:leading-[59px] tracking-[-3%] text-gray-800 font-base">
              Wi-Fi Cepat dan Handal yang
              <br />
              Bisa Kamu Andalkan
            </h2>

            {/* Feature badges */}
            <div className="flex flex-col lg:flex-row gap-2 my-6">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-green-700" />
                <span className="text-green-700 font-semibold text-base">Instalasi Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700" />
                <span className="text-green-700 font-semibold text-base">Layanan Nasional</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-700" />
                <span className="text-green-700 font-semibold text-base">100% Fiber Optic</span>
              </div>
            </div>

            <div>
              <p className="text-[12px] lg:leading-[59px] tracking-[-3%] text-gray-600">
                Pilih lokasi kamu sekarang!{' '}
                <span
                  className="font-semibold italic underline cursor-pointer hover:font-bold transition-all duration-100 ease-in-out"
                  onClick={() => setShowBanner(true)}
                >
                  Tentukan
                </span>
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                  onClick={() => {
                    navigate.push('/payment');
                  }}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 border border-orange-500 text-white px-8 py-3 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MdEmail className="w-4 h-4" />
                  Subscribe Now
                </Button>

                <Button className="rounded-full bg-white hover:bg-orange-100 text-orange-500 border border-orange-500 px-8 py-3 font-medium transition-colors flex items-center justify-center gap-2">
                  <FaPhone className="w-4 h-4" />
                  Call Center
                </Button>
              </div>
            </div>
          </div>

          {/* Add the right side for image/people */}
          <div
            className="hidden lg:flex row-start-1 col-start-1 lg:row-start-1 lg:col-start-2 relative z-10 h-full items-end justify-end hover:scale-105 hover:drop-shadow-xl transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => setShowBanner(true)}
          >
            <div className="flex justify-center lg:justify-end items-end">
              <Image
                src="/imgs/unsplash_J-hbGCsK204.png"
                width={1000}
                height={500}
                alt="Happy people using internet"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-full h-auto z-0">
        {/* Grid pattern */}
        <Image
          src="/imgs/line-background-hero.svg"
          width={1000}
          height={1000}
          alt=" "
          className="w-full h-auto opacity-55"
        />
      </div>
    </div>
  );
};

export default DefaultBanner;
