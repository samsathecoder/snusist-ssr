'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
  title: string;
  price: number;
  category: string;
  slug: string;
  coverImage?: string;
}

interface CategoryProductsCarouselProps {
  allProducts: Product[];
  currentCategory: string;
  currentSlug?: string;
}

export default function CategoryProductsCarousel({
  allProducts,
  currentCategory,
  currentSlug,
}: CategoryProductsCarouselProps) {
  const categoryProducts = allProducts.filter(
    (p) => p.category === currentCategory && p.slug !== currentSlug
  );

  if (!categoryProducts.length)
    return <div className="text-center py-10">Bu kategoride ürün bulunamadı.</div>;

  return (
    <div className="max-w-6xl mx-auto px-2 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        {currentCategory} Kategorisindeki Ürünler
      </h2>

      <div className="overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4">
          {categoryProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="min-w-[200px] flex-shrink-0 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <Image
                src={product.coverImage || `/images/${encodeURIComponent(product.title)}-image.webp`}
                alt={product.title}
                width={220}
                height={220}
                className="rounded-lg shadow"
                loading="lazy"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-zinc-800 truncate">{product.title}</h3>
                <p className="text-xs text-zinc-500">{product.price}₺</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
