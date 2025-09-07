import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProductLoadMoreButton from './ProductLoadMoreButton';

interface ProductFactsProps {
  customerType?: 'Retail' | 'NON_RETAIL' | '';
  productType?: 'PROMO' | 'NORMAL';
  region?: 'JABODETABEK' | 'JABAR' | 'JATENG' | 'JATIMBALINUSRA' | 'SULAWESI' | 'KALIMANTAN' | 'BANTEN';
  productQuery?: string;
  zipCode?: string;
}

const ProductFacts: React.FC<ProductFactsProps> = ({ 
  customerType = 'Retail',
  productType = 'NORMAL',
  region = 'JABODETABEK',
  productQuery,
  zipCode
}) => {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;

  useEffect(() => {
    fetchAllProducts(); // Fetch semua produk
  }, [customerType, productType, region, productQuery, zipCode]);

  const buildApiUrl = () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/common/products`;
    const params = new URLSearchParams();
    
    // Required parameters
    params.append('offset', '1');
    params.append('customer_type', customerType);
    params.append('product_type', productType);
    params.append('region', region);
    
    // Optional parameters
    if (productQuery) {
      params.append('product_query', productQuery);
    }
    if (zipCode) {
      params.append('zip_code', zipCode);
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      
      const apiUrl = buildApiUrl();
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log(`API Response - All Products:`, {
        apiUrl,
        dataLength: data.data?.length,
        meta: data.meta,
        filters: { customerType, productType, region, productQuery, zipCode }
      });
      
      if (data.data) {
        setAllProducts(data.data);
        setDisplayedProducts(data.data.slice(0, PRODUCTS_PER_PAGE));
      }
    } catch (error) {
      setAllProducts([]);
      setDisplayedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * PRODUCTS_PER_PAGE;
      
      setDisplayedProducts(allProducts.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 500);
  };

  const hasMoreProducts = displayedProducts.length < allProducts.length;

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProducts.map((product: any) => (
          <div key={product.ID} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent">
            {/* Product Card */}
            <div className="flex items-center justify-center bg-orange-500 text-white px-4 py-6 sm:py-7 lg:py-9 text-center">
              <div className="text-[36px] sm:text-[40px] lg:text-[70px] tracking-[1%] leading-[45px] font-bold text-center">
                {product.Product_Name.match(/Up To (\d+)/)?.[1] || 'N/A'}
                <span className="text-[16px] sm:text-[20px]">/Mbps</span>
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4 lg:p-6">
              <div className="text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3 lg:mb-5">
                Rp.{(product.Price * 12).toLocaleString('id-ID')}
                <span className="text-[16px] sm:text-[20px]">/Tahun</span>
              </div>
              <img src="/icons/arrow-pricing.svg" alt="" width={65} height={65} className="size-[45px] sm:size-[55px] lg:size-[65px] absolute z-10 left-10 sm:left-12 lg:left-9 top-10 lg:top-13" />
              <div className="text-base lg:text-[30px] tracking-[1%] leading-[26px] font-medium text-orange-700 mb-2">
                Rp.{product.Price.toLocaleString('id-ID')}
                <span className="text-[16px] sm:text-[20px]">/Bulan</span>
              </div>
              <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">Mau langganan setahun? Bisa dicicil, kok!</p>
            </div>
            {/* Feature block */}
            <div className="mx-4 mb-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
              <div className="space-y-3">
                {['Fast and reliable connection', 'No contract required', 'Easy setup Process'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">✓</span>
                    <span className="text-sm text-gray-800">{text}</span>
                  </div>
                ))}
              </div>
              <div className="my-4 h-0.5 w-full bg-orange-300" />
              <div className="flex items-center justify-around text-orange-600">
                <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">1080p FULLHD</span>
                <span className="text-xs font-semibold">🎮 Gaming</span>
                <span className="text-xs font-semibold">∞ Unlimited</span>
              </div>
            </div>
            {/* Bottom action buttons */}
            <div className="px-4 pb-6 flex flex-col gap-3">
              <button
                className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                onClick={() => router.push('/kategori/rumah')}
              >
                <span>Selengkapnya</span>
                <span className="transition-transform">▾</span>
              </button>
              <button
                onClick={() => router.push('/entri-prospek')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      <ProductLoadMoreButton
        onLoadMore={handleLoadMore}
        isLoading={loadingMore}
        hasMore={hasMoreProducts}
        totalProducts={allProducts.length}
        displayedProducts={displayedProducts.length}
      />
    </section>
  );
};

export default ProductFacts;
