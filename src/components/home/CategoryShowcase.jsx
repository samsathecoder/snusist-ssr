'use client';

import Link from 'next/link'; 
const categories = ["Velo", "Pablo", "Cuba", "Garant", "Siberia", "Killa", "Odens","Fox","D.L.T.A" ];

export default function CategoryShowcase() {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-2 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">🎯 Snus Markalarını Keşfedin</h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 mb-2">
            En popüler markalar - En geniş seçim
          </p>
          <p className="text-xs sm:text-sm md:text-lg text-blue-600 font-medium">
            Velo, Pablo, Cuba, Garant, Siberia, Killa...
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
  {categories.map((category) => (
    <Link
      key={category}
      href={`/categories/${category.toLowerCase()}`}
      className="group relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
<picture>
  <source 
    srcSet={`/images/${category}-category-image.webp`} 
    type="image/webp"
  />

  <img
    loading="lazy"
    src={`/images/${category}-category-image.webp`} 
    alt={category}
    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
  />
</picture>
<div className="absolute inset-0 group-hover:bg-black/40 transition-colors duration-200"></div>
<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 md:p-4">
  <h3 className="text-white text-sm sm:text-base md:text-lg font-bold">{category}</h3>
  <p className="text-gray-200 text-xs sm:text-sm">İncele →</p>
</div>
    </Link>
  ))}
</div>
      </div>
    );
  }