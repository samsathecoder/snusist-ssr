// app/categories/page.tsx
import React from "react";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import CategoryClient from "./[slug]/CategoryClient";
import StructuredData from "./[slug]/StructedData";
import { IProduct } from "@/models/Product";
import type { Metadata } from "next";
import { getProductsCache, setProductsCache } from "@/lib/cache";

export const metadata: Metadata = {
  title: "Tüm Snus Markaları - Velo, Pablo, Cuba ve Daha Fazlası | Snus İstanbul",
  description:
    "Snusist.com’da Velo, Pablo, Cuba ve diğer orijinal snus markalarını keşfedin. Tüm snus çeşitleri, uygun fiyat ve aynı gün teslimat avantajı ile.",
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
    title: "Tüm Snus Markaları - Snus İstanbul",
    description:
      "Snusist’teki tüm snus markalarını keşfedin. Orijinal ürün garantisi, uygun fiyatlar ve hızlı teslimat!",
    url: "https://snusist.com/categories",
    siteName: "Snus İstanbul",
    images: [
      {
        url: "https://snusist.com/images/snusist-logo.webp",
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
    title: "Tüm Snus Markaları - Snus İstanbul",
    description:
      "Velo, Pablo, Cuba ve diğer popüler snus markaları Snusist’te! Aynı gün teslimat avantajı ile orijinal ürünler.",
    images: ["https://snusist.com/images/snusist-logo.webp"],
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

export default async function AllCategoriesPage() {
 await connectDB();


let allProducts = getProductsCache();
if (!allProducts) {
  const allProductsFromDB = await Product.find({}).lean().exec();

  // Mongoose objelerini IProduct tipine dönüştür
allProducts = allProductsFromDB.map(product => ({
    _id: product._id?.toString(),    
  title: product.title,
  slug: product.slug,
  description: product.description,
  category: product.category,  
  seoTitle: product.seoTitle,
  seoDescription: product.seoDescription,
  coverImage: product.coverImage,
  price: product.price,
}));

  setProductsCache(allProducts); // tip uyumlu
}

  return (
    <>
      {/* ✅ Structured Data for SEO */}
      <StructuredData category="" products={allProducts} />

      {/* ✅ SSR rendered product list */}
      <CategoryClient slug="" products={allProducts} />
    </>
  );
}
