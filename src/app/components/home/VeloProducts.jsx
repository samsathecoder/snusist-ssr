'use client';

import Link from 'next/link';
import { products } from '../../data/products';
import { FaArrowRight } from 'react-icons/fa';
import { useMemo } from 'react';
import { createProductSlug } from '../../../../lib/slugify'

export default function VeloProducts() {
  const veloProducts = products
    .filter((product) => product.category === 'Velo')
    .slice(0, 15); // 15 ürün göster
    const stars = useMemo(() => {
      return Math.floor(Math.random() * 2) + 4;
    }, []);
  return (
    <div className="max-w-6xl  mx-auto px-2 py-10">
      {/* Başlık Alanı */}
<div className="w-full overflow-hidden rounded-xl mb-8">
<img 
  loading="lazy"
  src="/images/velo-banner.webp" 
  alt="Velo Banner"
  className="w-full h-auto sm:h-64 md:h-[400px] object-cover sm:object-center rounded-xl"
  srcset="/images/velo-banner.webp 1x, /images/velo-banner.webp 2x"
/>
</div>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 gap-4">
  {veloProducts.map((product) => (
  <Link
  key={product.id}
  href={`/products/${createProductSlug(product)}`} 
  className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
>
  <img
    src={`/images/${product.name}-image.jpg`}
    alt={product.name}
    className="w-full h-48 object-contain p-2 bg-white"
  />

  <div className="p-4 flex flex-col flex-grow justify-between">
    <div>
      <h2 className="text-base font-bold text-zinc-800">{product.name}</h2>
      <p className="text-sm text-zinc-500">{product.price}₺</p>

      {/* ⭐ Rastgele yıldızlar */}
      <div className="mt-2 flex text-yellow-400 text-sm">
  {[...Array(stars)].map((_, index) => (
    <span key={index}>★</span>
  ))}
</div>
    </div>

    <span className="mt-3 inline-block text-center text-sm font-medium py-2 px-4 rounded-lg border border-zinc-300 text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition">
      İncele
    </span>
  </div>
</Link>

  ))}
</div>


      {/* Buton */}
      <div className="text-center mt-12">
        <Link
          href="/categories/Velo"
          className="inline-flex items-center gap-2 text-lg font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          Tüm Velo Ürünlerini Gör <FaArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
}
