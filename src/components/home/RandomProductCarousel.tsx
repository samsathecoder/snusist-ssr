'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '@/types';

type Props = {
  products: Product[];
};

export default function RandomProductCarousel({ products }: Props) {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Rastgele 15-20 ürün seç
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 20));
  }, [products]);

  if (randomProducts.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-2 py-10">
      {/* Başlık ve Reklam Banner Kapsayıcı */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Öne Çıkan Ürünler</h2>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg inline-block">
          <p className="text-base font-semibold">🚀 Sipariş için hemen ürününüzü seçip WhatsApp'dan bize atın! 📱✨</p>
        </div>
      </div>

      {/* Kaydırılabilir Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4">
          {randomProducts.map((product) => {
            const stars = Math.floor(Math.random() * 2) + 4;
            const imageSrc = product.coverImage || `/images/${encodeURIComponent(product.title)}-image.webp`;

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="min-w-[200px] flex-shrink-0 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <picture>
                  <source
                    srcSet={imageSrc}
                    sizes="(max-width: 320px) 320px"
                    type="image/webp"
                  />
                  <source
                    srcSet={imageSrc}
                    sizes="(max-width: 320px) 320px"
                    type="image/jpeg"
                  />
                  <img
                    loading="lazy"
                    src={imageSrc}
                    alt={product.title}
                    className="w-full h-auto rounded-lg shadow"
                  />
                </picture>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-zinc-800 truncate">{product.title}</h3>
                  <p className="text-xs text-zinc-500">{product.price}₺</p>
                  <div className="mt-1 flex text-yellow-400 text-sm">
                    {[...Array(stars)].map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
