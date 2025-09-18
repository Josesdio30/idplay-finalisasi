'use client';

import FAQ from '@/app/_components/FAQ';
import HeroSection from './_components/Hero';

import TestimoniPelanggan from './_components/TestimoniPelanggan';
import CompareProduct from './_components/CompareProduct';
import CekCoverage from './_components/CekCoverage';
import ServicesSection from './_components/Services';
import ProductSection from './_components/Product';
import API from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Product, Metadata, StrapiApiResponse } from '@/app/type';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Metadata['pagination']>();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const getAllProducts = () => {
    if (!loading) {
      setFetching(true);
    }

    API.get(
      'https://inspiring-power-f8fa08a4a5.strapiapp.com/api/products?populate=*&sort=finalSpeedInMbps:asc'
    )
      .then((res) => res.data)
      .then((data: StrapiApiResponse) => {
        setProducts(data.data);
        setPagination(data.meta.pagination);
      })
      .catch((err) => {
        setProducts([]);
        setPagination(undefined);
        console.error('Error fetching products:', err);
      })
      .finally(() => {
        if (loading) setLoading(false);
        if (fetching) setFetching(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white">
      <HeroSection />
      <CekCoverage />
      <ServicesSection />
      <ProductSection
        products={products}
        loading={loading}
        fetching={fetching}
        pagination={pagination}
      />
      <TestimoniPelanggan />
      <FAQ />
      <CompareProduct />
    </div>
  );
}
