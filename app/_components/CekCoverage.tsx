'use client';
import React, { useCallback, useState } from 'react';
import CoverageMaps from './CoverageMaps';

type CoverageResult = {
  status?: string;
  message?: string;
  [key: string]: unknown;
};

type UserLocation = {
  lat: number;
  lng: number;
};

const CekCoverage: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showModal, setShowModal] = useState(false);

  const canUseGeolocation = typeof window !== 'undefined' && 'geolocation' in navigator;

  const handleCheck = useCallback(() => {
    setError(null);
    setResult(null);

    if (!canUseGeolocation) {
      setError('Geolocation tidak didukung di browser ini.');
      return;
    }

    setIsChecking(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          setUserLocation({ lat: latitude, lng: longitude });
          setShowModal(true);

          const resp = await fetch(
            `/api/check_coverage?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`,
            { cache: 'no-store' }
          );
          const data = await resp.json();
          console.log(data);
          if (!resp.ok) {
            setError(data?.error || 'Gagal memeriksa coverage.');
            setResult(data);
          } else {
            setResult(data);
          }
        } catch (e) {
          setError('Terjadi kesalahan jaringan.');
          setResult(null);
        } finally {
          setIsChecking(false);
        }
      },
      (geoError) => {
        const message =
          geoError.code === geoError.PERMISSION_DENIED
            ? 'Izin lokasi ditolak.'
            : geoError.code === geoError.POSITION_UNAVAILABLE
              ? 'Lokasi tidak tersedia.'
              : geoError.code === geoError.TIMEOUT
                ? 'Permintaan lokasi timeout.'
                : 'Gagal mendapatkan lokasi.';
        setError(message);
        setIsChecking(false);
        setShowModal(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [canUseGeolocation]);

  const handleLocationChange = useCallback(async (location: UserLocation, address: string) => {
    setError(null);
    setResult(null);
    setIsChecking(true);
    setUserLocation(location);

    try {
      const resp = await fetch(
        `/api/check_coverage?latitude=${encodeURIComponent(location.lat)}&longitude=${encodeURIComponent(location.lng)}`,
        { cache: 'no-store' }
      );
      const data = await resp.json();
      console.log(data);
      if (!resp.ok) {
        setError(data?.error || 'Gagal memeriksa coverage.');
        setResult(data);
      } else {
        setResult(data);
      }
    } catch (e) {
      setError('Terjadi kesalahan jaringan.');
      setResult(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleModalClose = useCallback((open: boolean) => {
    setShowModal(open);

    if (!open) {
      setError(null);
      setResult(null);
      setIsChecking(false);
    }
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 pt-10">
        <div className="border-2 border-orange-500 rounded-[30px] p-0 relative">
          <div className="flex flex-col md:flex-row items-center md:justify-between relative z-10 rounded-[30px] overflow-hidden">
            <div className="md:w-1/2 w-full p-4 sm:p-6 md:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold text-orange-600 mb-4">
                Cek area kamu sekarang untuk mulai langganan!
              </h2>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="px-5 py-2 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cek Coverage dengan Lokasi Saya
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:w-1/2 w-full mt-6 md:mt-0 justify-center md:justify-end">
              <img
                src="/imgs/location-decoration.png"
                alt="Dekorasi Lokasi"
                className="max-w-full w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Maps Modal */}
      <CoverageMaps
        open={showModal}
        onOpenChange={handleModalClose}
        userLocation={userLocation}
        result={result}
        isLoading={isChecking}
        onLocationChange={handleLocationChange}
      />
    </section>
  );
};

export default CekCoverage;
