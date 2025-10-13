// app/categories/[slug]/page.tsx
import React from "react";
import connectDB from "@/lib/mongoose";
import Product, { IProduct } from "@/models/Product"; 
import CategoryClient from "../CategoryClient";
import { getProductsCache, setProductsCache } from "@/lib/cache";
import type { Metadata, ResolvingMetadata } from 'next';
import StructuredData from "./StructedData";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Dinamik parametreyi al
  const { slug } = await params;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    
    title: `${slug} Snus - Snus İstanbul`,
    description: `${slug} kategorisindeki snus ürünlerini keşfedin. Hızlı teslimat ve en uygun fiyat garantisi.`,
      robots: { index: true, follow: true },

    openGraph: {
      title: `${slug} Snus - Snus İstanbul`,
      description: `Snus İstanbul - ${slug} snus ürünleri`,
      images: [`/images/${slug}-category-image.webp`, ...previousImages],
      url: `https://snusist.com/categories/${slug}`,
    },
  };
}
// Static params (SSG)
export async function generateStaticParams() {
  await connectDB();
  const categories = (await Product.distinct("category")) as string[];
  return categories.map((slug) => ({ slug }));
}

// Page
export default async function CategoryPage() {
  await connectDB();

  let allProducts: IProduct[] = getProductsCache() || [];

  if (!allProducts.length) {
    const productsFromDB = await Product.find({}).lean().exec();
    allProducts = productsFromDB.map((p) => ({
      _id: p._id?.toString() || "",
      title: p.title,
      slug: p.slug,
      description: p.description,
      category: p.category,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      coverImage: p.coverImage,
      price: p.price,
    }));
    setProductsCache(allProducts);
  }

  return (
    <>
      <CategoryClient products={allProducts} />
      <StructuredData products={allProducts} />
    </>
  );
}
