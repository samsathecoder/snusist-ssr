"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IProduct } from "@/models/Product";
import Image from "next/image";
import { useParams } from "next/navigation";

type Props = {
  products: IProduct[];
};

export default function CategoryClient({ products }: Props) {
  // Slug'ı client-side useParams hook'u ile alıyoruz
  const params = useParams();
  const slug = params?.slug || "";

  // Ürünleri kategoriye göre filtrele
  const filteredProducts = slug === ""
    ? products
    : products.filter((p) => p.category === slug);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const siteName = "Snus İstanbul";
  const pageTitle = slug === "" ? `Tüm Snus Markaları - ${siteName}` : `${slug} Snus - ${siteName}`;
  const pageDescription = slug === "all"
    ? `Tüm snus çeşitleri – ${siteName}. | Aynı gün teslimat ve en uygun fiyat garantisi snusist.com'da.`
    : `${slug} snus – ${siteName}. | Aynı gün teslimat ve en uygun fiyat garantisi snusist.com'da.`;
  const canonical = `https://snusist.com/categories/${slug}`;
  const ogImage = `https://snusist.com/images/${slug === "all" ? "snusist-logo.webp" : `${slug}-category-image.webp`}`;

  return (
    <>
    
      {/* Page İçeriği */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-64 w-full">
            <h2 className="text-xl font-semibold mt-12 mb-4">Kategoriler</h2>
            <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
              <Link
                href="/categories/"
                className={cn(
                  "px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap",
                  slug === "all" ? "text-zinc-900 font-bold" : "text-zinc-500 hover:bg-zinc-100"
                )}
              >
                Hepsi
              </Link>
              {categories.map((cat) => (
                <Link
                  key={categories.indexOf(cat)}
                  href={`/categories/${cat}`}
                  className={cn(
                    "px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap",
                    slug === cat ? "text-zinc-900 font-bold" : "text-zinc-500 hover:bg-zinc-100"
                  )}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </aside>

          {/* Ürünler */}
          <section className="flex-1 py-12">
            <h1 className="text-3xl font-bold mb-6 text-center text-zinc-800">
              {slug === "all" ? "Tüm Snus Çeşitleri" : `${slug} Snus Çeşitleri`}
            </h1>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">Bu kategoriye ait ürün bulunamadı.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white/90 backdrop-blur-md shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-lg"
                  >
                    <Image
                      width={150}
                      height={220}
                      loading="lazy"
                      src={product.coverImage || `/images/${product.slug}.webp`}
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
