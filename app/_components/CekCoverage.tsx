'use client';
import { cn } from '@/lib/utils';
import React, { useCallback, useMemo, useState } from 'react';

type CoverageResult = {
  // Adjust based on actual API response shape
  status?: string;
  message?: string;
  data?: any; // Replace with specific type if known
  [key: string]: unknown;
};

const CekCoverage: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CoverageResult | null>(null);

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
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [canUseGeolocation]);

  const content = useMemo(() => {
    if (isChecking) {
      return <p className="text-sm text-gray-600">Memeriksa coverage di lokasi Anda…</p>;
    }
    if (error && !result?.data?.errors?.message) {
      return <p className="text-sm text-red-600">{error}</p>;
    }
    if (result?.data?.errors?.message) {
      return (
        <div
          className={cn(
            'text-left text-sm rounded-lg p-4 overflow-auto max-h-60',
            result?.data?.errors?.message.includes('maaf') ||
              result?.data?.errors?.message.includes('tidak')
              ? 'bg-red-50 border border-red-200'
              : 'bg-green-50 border border-green-200'
          )}
        >
          {/* <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre> */}
          <p>{result?.data?.errors?.message}</p>
        </div>
      );
    }
    return (
      <p className="text-sm text-gray-600">
        Klik tombol di bawah untuk memeriksa ketersediaan layanan di lokasi Anda.
      </p>
    );
  }, [isChecking, error, result]);

  console.log(result?.data?.errors?.message);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="border-2 border-orange-500 rounded-[30px] p-0 relative">
          <div className="flex flex-col md:flex-row items-center md:justify-between relative z-10 rounded-[30px] overflow-hidden">
            <div className="md:w-1/2 w-full p-4 sm:p-6 md:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold text-orange-600 mb-4">
                Cek area kamu sekarang untuk mulai langganan!
              </h2>

              <div className="flex flex-col gap-4 w-full">
                {content}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="px-5 py-2 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isChecking ? 'Memeriksa…' : 'Cek Coverage dengan Lokasi Saya'}
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:w-1/2 w-full mt-6 md:mt-0 justify-center md:justify-end">
              <img
                src="/imgs/location-decoration.png"
                alt="Dekorasi Lokasi"
                className="max-w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CekCoverage;
