// app/categories/[slug]/page.tsx
import React from "react";
import CategoryClient from "../CategoryClient";
import { getProducts, getProductsByCategory } from "@/lib/products";
import type { Metadata, ResolvingMetadata } from 'next';
import StructuredData from "./StructedData";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categoryName = slug === "" ? "Tüm Snus Çeşitleri" : slug.charAt(0).toUpperCase() + slug.slice(1);
  const title = `${categoryName} Fiyatları (${products.length} Ürün) | Snus İstanbul`;
  const description =
    slug === "" 
      ? `Tüm snus çeşitleri. ${products.length} ürün, aynı gün teslimat ve en uygun fiyat garantisi.`
      : `${categoryName} snus çeşitleri. ${products.length} farklı ürün, aynı gün teslimat ve en uygun fiyat garantisi. Snus İstanbul'da ${categoryName} snus satın alın.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://snusist.com/categories/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `https://snusist.com/categories/${slug}`,
      siteName: "Snus İstanbul",
      images: [
        {
          url: `https://snusist.com/images/${slug === "" ? "snusist-logo.webp" : `${slug}-category-image.webp`}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://snusist.com/images/${slug === "" ? "snusist-logo.webp" : `${slug}-category-image.webp`}`],
    },
  };
}

// Static params (SSG) - Tüm kategorileri al ve lowercase yap
export async function generateStaticParams() {
  const products = await getProducts();
  const categories = [...new Set(products.map(p => p.category.toLowerCase()))];
  return categories.map((slug) => ({ slug }));
}

export const revalidate = 3600; // 1 saat ISR

// Page
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  // Slug'ı normalize et (URL lowercase, ama kategori normal case olabilir)
  const allProducts = await getProductsByCategory(slug);

  return (
    <>
      <CategoryClient products={allProducts} />
      <StructuredData products={allProducts} />
    </>
  );
}
