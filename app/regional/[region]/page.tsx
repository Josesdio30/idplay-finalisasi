import Promosi from '@/app/_components/Promosi';
import PaketInternet from '@/app/_components/PaketInternet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BranchMap, { Branch } from '../_components/BranchMap';
import { notFound } from 'next/navigation';
import HeroSection from '@/app/_components/Hero';
import FAQ from '@/app/_components/FAQ';

type RegionKey = 'jawa' | 'sulawesi';

type RegionConfig = {
  slug: string;
  name: string;
  key: RegionKey;
  rating?: number;
  reviews?: number;
  address?: string;
  hours?: string;
  phone?: string;
  center: [number, number];
  branches: Branch[];
};

const regions: RegionConfig[] = [
  {
    slug: 'jabodetabek',
    name: 'Jabodetabek',
    key: 'jawa',
    rating: 4.2,
    reviews: 420,
    address: 'Rukan Artha Gading Niagra, Jkt Utara, DKI Jakarta',
    hours: '8 am – 10:45 pm',
    phone: '+62 811-4768-5301',
    center: [-6.1582, 106.9006],
    branches: [
      { id: 1, name: 'Cabang Jakarta Utara', lat: -6.1509, lng: 106.8915 },
      { id: 2, name: 'Cabang Jakarta Selatan', lat: -6.2607, lng: 106.7816 },
      { id: 3, name: 'Cabang Bekasi', lat: -6.2349, lng: 106.9896 }
    ]
  },
  {
    slug: 'sulawesi-kalimantan',
    name: 'Sulawesi & Kalimantan',
    key: 'sulawesi',
    rating: 4.3,
    reviews: 300,
    address: 'Kantor Operasional Regional Sulawesi',
    hours: '8 am – 9 pm',
    phone: '+62 811-1234-5678',
    center: [-5.1477, 119.4327],
    branches: [
      { id: 1, name: 'Cabang Makassar', lat: -5.1477, lng: 119.4327 },
      { id: 2, name: 'Cabang Manado', lat: 1.4748, lng: 124.8428 },
      { id: 3, name: 'Cabang Balikpapan', lat: -1.2692, lng: 116.8259 }
    ]
  }
];

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export default async function RegionalLanding({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const config = regions.find((r) => r.slug === region);
  if (!config) return notFound();

  return (
    <main className="bg-white">
      <HeroSection />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{config.name}</h1>
        <p className="text-gray-600 mt-2">Produk dan promo khusus untuk wilayah {config.name}.</p>
      </section>

      <Promosi region={config.key} />

      <PaketInternet region={config.key} lockRegion defaultDuration="bulanan" />

      <section className="container mx-auto px-4 pb-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Kantor Representatif</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-gray-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Rating</span>
                  <span className="text-sm text-gray-600">{config.rating} ({config.reviews} reviews)</span>
                </div>
                <div className="mt-2">
                  <div className="font-semibold">Address:</div>
                  <div className="text-sm text-gray-700">{config.address}</div>
                </div>
                <div className="mt-2">
                  <div className="font-semibold">Hours:</div>
                  <div className="text-sm text-gray-700">{config.hours}</div>
                </div>
                <div className="mt-2">
                  <div className="font-semibold">Phone:</div>
                  <div className="text-sm text-gray-700">{config.phone}</div>
                </div>
              </div>
            </div>
            <div>
              <BranchMap branches={config.branches} center={config.center} />
            </div>
          </CardContent>
        </Card>
      </section>

      <FAQ />
    </main>
  );
}