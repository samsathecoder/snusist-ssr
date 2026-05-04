"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";

type Props = {
  products: Product[];
};

const CATEGORIES = ["Velo", "Pablo", "Cuba", "Garant", "Siberia", "Killa","Odens","Fox","D.L.T.A"];

export default function CategoryClient({ products }: Props) {
  // Slug'ı client-side useParams hook'u ile alıyoruz
  const params = useParams();
  const slug = (params?.slug as string) || "";

  // Ürünleri kategoriye göre filtrele
  const filteredProducts = slug === "" || slug === "hepsi"
    ? products
    : products.filter((p) => p.category.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase());

  const categories = CATEGORIES;

  const siteName = "Snusist";
  const pageTitle = slug === "" ? `Tüm Snus Markaları - ${siteName}` : `${slug} Snus - ${siteName}`;
  const pageDescription = slug === "all"
    ? `Tüm snus çeşitleri – ${siteName}. | Aynı gün teslimat ve en uygun fiyat garantisi snusist.com'da.`
    : `${slug} snus – ${siteName}. | Aynı gün teslimat ve en uygun fiyat garantisi snusist.com'da.`;
  const canonical = `https://snusist.com/categories/${slug}`;
  const ogImage = `https://snusist.com/images/${slug === "all" ? "snusist-logo-cat.webp" : `${slug}-category-image.webp`}`;

  return (
    <>
    
      {/* Page İçeriği */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row ">
          {/* Sidebar */}
          <aside className="md:w-64 w-full">
            <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
            <div className="flex md:flex-col flex-row gap-2 mb-4 overflow-x-auto md:overflow-visible no-scrollbar">
              <Link
                href="/categories/"
                className={cn(
                  "px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap",
                  slug === "" || slug === "hepsi" ? "text-zinc-900 font-bold bg-blue-100" : "text-zinc-500 hover:bg-zinc-100"
                )}
              >
                Hepsi
              </Link>
              {categories.map((cat) => {
                const lowerCat = cat.toLowerCase();
                const slugCat = lowerCat.replace(/\s+/g, '-');
                return (
                  <Link
                    key={lowerCat}
                    href={`/categories/${slugCat}`}
                    className={cn(
                      "px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap",
                      slug === slugCat ? "text-zinc-900 font-bold bg-blue-100" : "text-zinc-500 hover:bg-zinc-100"
                    )}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Ürünler */}
          <section className="flex-1 md:pl-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-lg">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                {slug === "" || slug === "hepsi" ? "🌟 Snus Markalarını Keşfedin" : ` ${slug.charAt(0).toUpperCase() + slug.slice(1)} Snus`}
              </h1>
              <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 font-semibold">
                {filteredProducts.length} ürün | Aynı gün teslimat | ⭐ Premium kalite
              </p>
              <p className="text-blue-50 text-xs sm:text-sm md:text-base leading-relaxed">
                🏆 Snus İstanbul - Türkiye'nin snus adresi! Orijinal markalar, moto kuryeyle aynı gün teslimat.
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">Bu kategoriye ait ürün bulunamadı.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="bg-white/90 backdrop-blur-md shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-lg"
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
                        <h3 className="text-base font-semibold text-zinc-800">{product.title}</h3>
                        <p className="text-sm text-zinc-500">{product.price}₺</p>
                      </div>
                      <Link
                        href={`/products/${product.slug}`}
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
    </>
  );
}
