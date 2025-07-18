'use client';

import Link from 'next/link';
import { products } from '../../data/products';
import { FaArrowRight } from 'react-icons/fa';
import { useMemo } from 'react';
import { createProductSlug } from '../../../../lib/slugify'
import { FaWhatsapp } from 'react-icons/fa';

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
<picture>
  <source 
    srcSet="/images/velo-banner-320.webp 320w,
            /images/velo-banner-480.webp 480w,
            /images/velo-banner-800.webp 800w,
            /images/velo-banner-1024.webp 1024w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
    type="image/webp"
  />
  <img 
    src="/images/velo-banner-800.webp" 
    alt="Velo Banner" 
    className="w-full h-auto sm:h-64 md:h-[400px] object-cover sm:object-center rounded-xl"
    width="1024"
    height="400"
    loading="eager"
    decoding="async"
    fetchPriority="high"
  />
</picture>

</div>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 gap-4">
  {veloProducts.map((product) => (
  <Link
  key={product.id}
  href={`/products/${createProductSlug(product)}`} 
  className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
><picture>
  <source 
    srcSet={`/images/optimized/${product.name}-image-320w.webp 320w,
             /images/optimized/${product.name}-image-480w.webp 480w,
             /images/optimized/${product.name}-image-800w.webp 800w`}
    sizes="(max-width: 320px) 320px,
           (max-width: 480px) 480px,
           800px"
    type="image/webp"
  />
  <source 
    srcSet={`/images/optimized/${product.name}-image-320w.webp 320w,
             /images/optimized/${product.name}-image-480w.webp 480w,
             /images/optimized/${product.name}-image-800w.webp 800w`}
    sizes="(max-width: 320px) 320px,
           (max-width: 480px) 480px,
           800px"
    type="image/jpeg"
  />
  <img 
    loading="lazy" 
    src={`/images/optimized/${product.name}-image-320w.webp`} 
    alt={`${product.name} - Snus Ürünleri`} 
    className="w-full h-48 object-contain p-2 bg-white"
    width="500" 
    height="300" 
  />
</picture>
  <div className="p-4 flex flex-col flex-grow justify-between">
    <div>
      <h2 className="text-base font-bold text-zinc-800">{product.name}</h2>
      <p className="text-sm text-zinc-500">{product.price}₺</p>

                       
      <div className="mt-2 flex text-yellow-400 text-sm">
 
</div>
   <div className="flex justify-center mt-3">
              <Link
                href={`https://wa.me/905464205366?text=Merhaba, ${product.name} ürününü sipariş vermek istiyorum.`}
                target="_blank"
                className="flex items-center gap-2 bg-green-600 min-w-50 hover:bg-green-700 text-white text-base px-4 py-2 rounded-md transition shadow-md"
              >
                <FaWhatsapp size={24} />
                <span>Hemen Sipariş ver</span>
              </Link>
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
