// app/categories/[slug]/page.tsx
import React from "react";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import CategoryClient from "./CategoryClient";
import StructuredData from "./StructedData";
import { IProduct } from "@/models/Product";
import type { Metadata } from "next";
import { getProductsCache, setProductsCache } from "@/lib/cache";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  await connectDB();
  const categories = (await Product.distinct("category")) as string[];
  return categories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params?.slug ?? "";
  const category = slug;

  const siteName = "Snus İstanbul";
  const baseUrl = "https://snusist.com";
  const categoryName = category || "all";
  const imageUrl = `${baseUrl}/images/${
    category ? `${category}-category-image.webp` : "snusist-logo.webp"
  }`;

  const title = category
    ? `${category} Snus - ${siteName}`
    : `Tüm Snus Markaları - ${siteName}`;

  const description = category
    ? `${category} snus  – ${siteName}. | Aynı gün teslimat ve en uygun fiyat garantisi snusist.com'da.`
    : `Tüm snus çeşitleri – ${siteName}. | Aynı gün teslimat ve en uygun fiyat garantisi snusist.com'da.`;

  return {
    title,
    description,
    keywords: [
      category ? `${category} snus` : "snus çeşitleri",
      "snus satın al",
      "snus Türkiye",
      "snus online",
      "snus istanbul",
    ],
    alternates: {
      canonical: `${baseUrl}/categories/${categoryName}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/categories/${categoryName}`,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${category || "Snus"} kategorisi`,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
      "og:site_name": siteName,
      "application-name": siteName,
      "theme-color": "#ffffff",
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  await connectDB();


let allProducts = getProductsCache();
if (!allProducts) {
  const allProductsFromDB = await Product.find({}).lean().exec();

  // Mongoose objelerini IProduct tipine dönüştür
allProducts = allProductsFromDB.map(product => ({
    _id: product._id?.toString() || "",    title: product.title,
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

  const slug = params?.slug ?? "";



  return (
    <>
    <CategoryClient slug={slug} products={allProducts} />

      <StructuredData
        category={slug}
        products={JSON.parse(JSON.stringify(allProducts))}
      />
    </>
  );
}
