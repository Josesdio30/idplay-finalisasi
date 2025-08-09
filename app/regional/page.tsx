import Link from 'next/link';

export default function RegionalPage() {
  const regions = [
    { name: 'Jabodetabek', href: '/regional/jabodetabek' },
    { name: 'Sulawesi & Kalimantan', href: '/regional/sulawesi-kalimantan' }
  ];

  return (
    <main className="p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">Pilih Daerahmu</h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {regions.map((r) => (
            <Link key={r.href} href={r.href} className="border rounded-xl p-6 hover:shadow-md transition">
              <div className="text-lg font-semibold text-gray-900">{r.name}</div>
              <div className="text-sm text-gray-600">Lihat produk dan promo khusus wilayah {r.name}.</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}