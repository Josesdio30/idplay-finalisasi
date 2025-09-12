import React from 'react';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';

interface ProductLoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalProducts: number;
  displayedProducts: number;
}

const ProductLoadMoreButton: React.FC<ProductLoadMoreButtonProps> = ({
  onLoadMore,
  isLoading,
  hasMore,
  totalProducts,
  displayedProducts,
}) => {
  if (!hasMore) return null;

  return (
    <div className="flex flex-col items-center mt-16 space-y-4">
      {/* <div className="text-sm text-gray-500">
        Menampilkan {displayedProducts} dari {totalProducts > 0 ? totalProducts : 'banyak'} produk
      </div> */}
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        size="lg"
        className="px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg"
      >
        {isLoading ? (
          <>
            <Loading size="sm" className="mr-2" />
            <span>Memuat...</span>
          </>
        ) : (
          'Lihat Produk Lainnya'
        )}
      </Button>
    </div>
  );
};

export default ProductLoadMoreButton;
