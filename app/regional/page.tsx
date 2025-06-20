import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BranchMap from './_components/BranchMap';

export default function RegionalPage() {
  return (
    <main className="p-8 bg-white">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold text-gray-700">
            Peta Lokasi Cabang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BranchMap />
        </CardContent>
      </Card>
    </main>
  );
}