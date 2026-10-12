"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CATEGORY_DETAILS } from "@/lib/categoryContent";

type Props = {
  products: Product[];
};

const CATEGORIES = ["Velo", "Pablo", "Cuba", "Garant", "Siberia", "Killa","Odens","Fox","D.L.T.A"];

const CATEGORY_INTROS: Record<string, string> = {
  velo: "Velo snus, hafif ve dengeli nikotin seviyeleri (6-14mg) ile tütünsüz beyaz porsiyon segmentinin en popüler markasıdır. Peppermint, meyve ve mentol aromalarıyla geniş bir seçenek sunar.",
  pablo: "Pablo snus, yüksek nikotin yoğunluğu (20-43mg) arayan deneyimli kullanıcılar için üretilen güçlü bir İsveç markasıdır. Keskin aroma profilleri ve yoğun etkisiyle tanınır.",
  cuba: "Cuba snus, egzotik meyve aromaları ve yüksek nikotin oranlarıyla bilinen bir markadır. Watermelon, Cherry, Grape gibi çeşitleriyle tat çeşitliliği arayanlara hitap eder.",
  garant: "Garant snus, uzun süreli nikotin salımı ve dengeli aroma yapısıyla bilinen, klasik tütün deneyimini modern porsiyon formatında sunan bir markadır.",
  siberia: "Siberia snus, piyasadaki en yüksek nikotin konsantrasyonuna (43mg/g, -80 serisi) sahip, deneyimli ve güçlü etki arayan kullanıcılar için tasarlanmış ekstrem bir markadır.",
  killa: "Killa snus, yoğun meyve aromaları ve ekstra güçlü nikotin seviyeleriyle (20mg) öne çıkan, keskin tat deneyimi sunan bir markadır.",
  odens: "Odens snus, İsveç'in geleneksel ve köklü markalarından biridir; sade, klasik tütün aroması ve kuru porsiyon yapısıyla tanınır.",
  fox: "White Fox snus, tütünsüz beyaz porsiyon formatında yüksek nikotin (16-20mg) ve nane ağırlıklı aromalarıyla bilinen, kompakt kullanım sunan bir markadır.",
  "d.l.t.a": "D.L.T.A snus, enerji içeceği ve meyve esintili özgün aroma kombinasyonlarıyla farklı bir tat deneyimi sunan niş bir markadır.",
};

export default function CategoryClient({ products }: Props) {
  // Slug'ı client-side useParams hook'u ile alıyoruz
  const params = useParams();
  const slug = (params?.slug as string) || "";

  // Ürünleri kategoriye göre filtrele
  const filteredProducts = slug === "" || slug === "hepsi"
    ? products
    : products.filter((p) => p.category.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase());

  const categories = CATEGORIES;

  const isAllCategories = slug === "" || slug === "hepsi";
  const categoryIntro = isAllCategories
    ? "Snusist'te Velo, Pablo, Cuba, Garant, Siberia, Killa, Odens, White Fox ve D.L.T.A gibi orijinal snus markalarını tek adreste bulabilirsiniz. Her markanın nikotin seviyesi ve aroma profili farklıdır; aşağıdaki kategorilerden size uygun markayı inceleyebilirsiniz."
    : CATEGORY_INTROS[slug.toLowerCase()];

  const categoryDetail = CATEGORY_DETAILS[slug.toLowerCase()];

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

            {categoryIntro && (
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                {categoryIntro}
              </p>
            )}

            {categoryDetail && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">🏍️</span>
                  <span className="text-sm font-medium text-zinc-700">
                    İstanbul içi aynı gün moto kurye
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">📦</span>
                  <span className="text-sm font-medium text-zinc-700">
                    %100 gizli ve discreet paketleme
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">💳</span>
                  <span className="text-sm font-medium text-zinc-700">
                    Moto kuryede kapıda ödeme
                  </span>
                </div>
              </div>
            )}

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

            {categoryDetail && (
              <div className="mt-12 max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-zinc-900">
                  {slug.charAt(0).toUpperCase() + slug.slice(1)} Snus Hakkında
                </h2>
                <div className="text-zinc-600 text-sm md:text-base leading-relaxed space-y-4">
                  {categoryDetail.longText.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4 text-zinc-900">
                  Sık Sorulan Sorular
                </h2>
                <div className="space-y-4">
                  {categoryDetail.faq.map((item) => (
                    <div key={item.question} className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-zinc-900 mb-1">
                        {item.question}
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
