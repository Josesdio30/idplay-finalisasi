import React from 'react';
import { type Article } from '@/data/dummyData';

export function GeneratedContent({ article }: { article: Article }): React.ReactElement {
  return (
    <div className="space-y-6">
      <p>
        Dalam era digital seperti saat ini, {article.title.toLowerCase()} menjadi topik yang sangat
        relevan untuk dibahas. Teknologi internet yang semakin berkembang pesat memberikan dampak
        signifikan terhadap berbagai aspek kehidupan kita.
      </p>

      <p>
        IdPlay sebagai penyedia layanan internet terdepan di Indonesia terus berkomitmen untuk
        memberikan pengalaman internet terbaik bagi seluruh pelanggan. Dengan infrastruktur fiber
        optik yang handal, kami memastikan koneksi internet yang stabil dan berkualitas tinggi.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mengapa Hal Ini Penting?</h2>

      <p>
        Topik ini sangat penting karena berkaitan langsung dengan kebutuhan digital masyarakat
        modern. Dengan pemahaman yang baik tentang {article.title.toLowerCase()}, kita dapat
        memanfaatkan teknologi internet secara optimal untuk mendukung aktivitas sehari-hari.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Solusi dari IdPlay</h2>

      <p>
        IdPlay menawarkan berbagai paket internet yang disesuaikan dengan kebutuhan Anda. Mulai dari
        paket untuk penggunaan rumah tangga hingga kebutuhan bisnis, semua tersedia dengan harga
        yang kompetitif dan layanan pelanggan terbaik.
      </p>

      <ul className="list-disc list-inside space-y-2 bg-blue-50 p-6 rounded-lg">
        <li>Koneksi internet fiber optik berkecepatan tinggi</li>
        <li>Layanan pelanggan 24/7 yang responsif</li>
        <li>Harga paket yang terjangkau dan kompetitif</li>
        <li>Jangkauan luas di seluruh Indonesia</li>
        <li>Teknologi terdepan untuk pengalaman internet optimal</li>
      </ul>

      <p>
        Untuk informasi lebih lanjut tentang paket internet IdPlay yang sesuai dengan kebutuhan
        Anda, jangan ragu untuk menghubungi tim customer service kami atau kunjungi website resmi
        IdPlay.
      </p>
    </div>
  );
}
