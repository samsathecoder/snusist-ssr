'use client';

import { useEffect, useState } from 'react';
import { products, categories } from '../../data/products';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { createProductSlug } from '@/lib/slugify';

// URL encode fonksiyonu
const encodeCategory = (category) => {
  return encodeURIComponent(category); // & gibi özel karakterleri encode eder
};

export default function CategoryClient({ category }) {
  const [selectedCategory, setSelectedCategory] = useState(category || '');

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryClick = (cat) => setSelectedCategory(cat);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-64 w-full">
            <h2 className="text-xl font-semibold mt-12 mb-4">Kategoriler</h2>
            <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
              <button
                onClick={() => handleCategoryClick('')}
                className={cn(
                  'px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap',
                  'md:border md:border-zinc-300',
                  selectedCategory === ''
                    ? 'text-zinc-900 font-bold md:bg-transparent md:border-zinc-400 md:translate-x-0 translate-x-2 duration-300'
                    : 'text-zinc-500 md:hover:bg-zinc-100 md:border-zinc-200'
                )}
                style={{ border: 'none' }}
              >
                hepsi
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={cn(
                    'px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap',
                    'md:border md:border-zinc-300',
                    selectedCategory === cat
                      ? 'text-zinc-900 font-bold md:bg-transparent md:border-zinc-400 md:translate-x-0 translate-x-2 duration-300'
                      : 'text-zinc-500 md:hover:bg-zinc-100 md:border-zinc-200'
                  )}
                  style={{
                    border: 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Product Content */}
          <section className="flex-1">
            <h1 className="text-3xl font-bold mb-6 text-center text-zinc-800">
              {selectedCategory || ''} snus
            </h1>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">Bu kategoriye ait ürün bulunamadı.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-white/90 backdrop-blur-md shadow-md rounded-xl overflow-hidden flex flex-col transition hover:shadow-lg animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 80}ms`,
                      animationDuration: '700ms',
                      animationFillMode: 'both',
                    }}
                  >
                    <img
                      loading="lazy"
                      src={`/images/${product.name}-image.webp`}
                      alt={product.name}
                      className="w-full h-48 object-contain p-2 bg-white"
                    />
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-zinc-800">{product.name}</h3>
                        <p className="text-sm text-zinc-500">{product.price}₺</p>
                      </div>
                      <Link
                        href={`/products/${createProductSlug(product)}`}
                        className="mt-3 inline-block text-center text-sm font-medium py-2 px-4 rounded-lg border border-zinc-300 text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition"
                      >
                        İncele
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
