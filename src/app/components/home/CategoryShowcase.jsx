'use client';

import Link from 'next/link'; 
import { categories } from '../../data/products';

export default function CategoryShowcase() {
    return (
      <div className="max-w-7xl mx-auto md:px-2 px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">Zengin Snus Çeşitleri</h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          En popüler markalar ve en yeni ürünler 🌟
        </p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[4px] px-2 md:px-1">
  {categories.map((category) => (
    <Link
      key={category}
      href={`/categories/${category}`}
      className="group relative h-64 overflow-hidden rounded-xl"
    >
<picture>
  <source 
    srcset={`images/${category}-category-image.webp`} 
    type="image/webp"
  />
  <source 
    srcset={`images/${category}-category-image.png`} 
    type="image/png"
  />
  <img
    loading="lazy"
    src={`images/${category}-category-image.png`} 
    alt={category}
    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
  />
</picture>
    </Link>
  ))}
</div>
      </div>
    );
  }