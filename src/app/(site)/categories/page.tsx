// app/categories/page.tsx
import React from "react";
import CategoryClient from "./CategoryClient";
import StructuredData from "./[slug]/StructedData";
import { getProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velo, Pablo, Cuba ve Daha Fazlası | Snus İstanbul",
  description:
    "Velo, Pablo, Cuba ve diğer orijinal snus markalarını keşfedin. Tüm snus çeşitleri, uygun fiyat ve aynı gün teslimat avantajı ile.",
  keywords: [
    "snus",
    "velo snus",
    "pablo snus",
    "cuba snus",
    "snus satın al",
    "snus türkiye",
    "snus istanbul",
  ],
  alternates: {
    canonical: "https://snusist.com/categories",
  },
  openGraph: {
  title: "Velo, Pablo, Cuba ve Daha Fazlası | Snus İstanbul",
    description:
 "Velo, Pablo, Cuba ve diğer orijinal snus markalarını keşfedin. Tüm snus çeşitleri, uygun fiyat ve aynı gün teslimat avantajı ile.",    url: "https://snusist.com/categories",
    siteName: "Snus İstanbul",
    images: [
      {
        url: "https://snusist.com/images/snusist-logo-cat.webp",
        width: 1200,
        height: 630,
        alt: "Snus İstanbul - Tüm Snus Markaları",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  title: "Velo, Pablo, Cuba ve Daha Fazlası | Snus İstanbul",
    description:
 "Velo, Pablo, Cuba ve diğer orijinal snus markalarını keşfedin. Tüm snus çeşitleri, uygun fiyat ve aynı gün teslimat avantajı ile.",    images: ["https://snusist.com/images/snusist-logo.webp"],
    creator: "@snusist",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "og:type": "website",
    "og:locale": "tr_TR",
    "og:site_name": "Snus İstanbul",
    "application-name": "Snus İstanbul",
    "theme-color": "#ffffff",
  },
};

export const revalidate = 3600; // 1 saat ISR

export default async function AllCategoriesPage() {
  // JSON'dan tüm ürünleri al
  const allProducts = await getProducts();

  return (
    <>
      {/* ✅ Structured Data for SEO */}
      <StructuredData category="" products={allProducts} />

      {/* ✅ SSR rendered product list */}
      <CategoryClient products={allProducts} />
    </>
  );
}
