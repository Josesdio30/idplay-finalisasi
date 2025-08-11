import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackNavigation: React.FC = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Link
          href="/article"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft />
          Kembali ke Artikel
        </Link>
      </div>
    </div>
  );
};

export default BackNavigation;
