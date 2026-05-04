"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Product } from "@/types";
import Image from "next/image";

type Props = { products: Product[] };

export default function VeloProducts({ products }: Props) {
  const veloProducts = products.filter((p) => p.category === "Velo").slice(0, 15);

  if (veloProducts.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-2 py-10">
      {/* Başlık */}
   <div className="w-full overflow-hidden rounded-xl mb-8"> <picture> <source srcSet="/images/velo-banner-320.webp 320w, /images/velo-banner-480.webp 480w, /images/velo-banner-800.webp 800w, /images/velo-banner-1024.webp 1024w" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px" type="image/webp" /> <img src="/images/velo-banner-800.webp" alt="Velo Banner" className="w-full h-auto sm:h-64 md:h-[400px] object-cover sm:object-center rounded-xl" width="1024" height="400" loading="eager" decoding="async" fetchPriority="high" /> </picture> </div>
      
      {/* Satış Metni */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 shadow-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">🚀 Velo Snus - Hemen Sipariş Verin!</h2>
        <p className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">✅ Aynı Gün Kargo | 💳 Kapıda Ödeme | 🏍️ Moto kurye Kargo</p>
        <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed">
          Velo Snus İstanbul. Hızlı kargo, aynı gün teslimat. Premium kalite, uygun fiyat!
        </p>
      </div>

      {/* Ürünler */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {veloProducts.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
          >
            <Image
                  width={150}
                  height={220}
              loading="lazy"
              src={product.coverImage || `/images/${encodeURIComponent(product.title)}-image.webp`}
              alt={product.title}
              className="w-full h-48 object-contain p-2 bg-white"
            />
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-800">{product.title}</h2>
                <p className="text-sm text-zinc-500">{product.price}₺</p>
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
