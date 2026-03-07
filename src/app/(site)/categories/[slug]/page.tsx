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
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;

  await connectDB();

  const products = await Product.find({ category: slug }).lean();

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const title = `${categoryName} Snus Fiyatları (${products.length} Ürün) | Snus İstanbul`;

  const description =
    `${categoryName} snus çeşitleri. ${products.length} farklı ürün, aynı gün teslimat ve en uygun fiyat garantisi. Snus İstanbul'da ${categoryName} snus satın alın.`;

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
          url: `https://snusist.com/images/${slug}-category-image.webp`,
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
      images: [`https://snusist.com/images/${slug}-category-image.webp`],
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
