'use client';

import Link from 'next/link';
import { products } from '../data/products';
import { createProductSlug } from '../../../lib/slugify';

export default function CategoryProductsCarousel({ category }) {
  // Belirli kategoriye ait ürünleri filtrele
  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <div className="max-w-6xl mx-auto px-2 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        {category} Kategorisindeki Ürünler
      </h2>

      {/* Kaydırılabilir Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4">
          {categoryProducts.map((product) => {
            const stars = Math.floor(Math.random() * 2) + 4;

            return (
              <Link
                key={product.id}
                href={`/products/${createProductSlug(product)}`}
                className="min-w-[200px] flex-shrink-0 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <picture>
                  <source
                    srcSet={`/images/${product.name}-image-320w.webp 320w`}
                    sizes="(max-width: 320px) 320px"
                    type="image/webp"
                  />
                  <source
                    srcSet={`/images/${product.name}-image-320w.webp 320w`}
                    sizes="(max-width: 320px) 320px"
                    type="image/jpeg"
                  />
                  <img
                    loading="lazy"
                    src={`/images/${product.name}-image.webp`}
                    alt={product.name}
                    className="w-full h-auto rounded-lg shadow"
                  />
                </picture>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-zinc-800 truncate">{product.name}</h3>
                  <p className="text-xs text-zinc-500">{product.price}₺</p>

                  <div className="mt-1 flex text-yellow-400 text-sm">
              
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
