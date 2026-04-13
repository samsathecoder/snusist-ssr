// app/categories/[slug]/StructuredData.tsx
import React from "react";
import { Product } from "@/types";
export default function StructuredData({
  category,
  products,
}: {
  category?: string;
  products: Product[];
}) {
  const isAll =
    !category ||
    category.toLowerCase() === "all" ||
    category.toLowerCase() === "hepsi";

  const filteredProducts = isAll
    ? products
    : products.filter((p) => p.category === category);

  const title = isAll
    ? "Tüm Snus çeşitleri"
    : `${category} Snus çeşitleri`;

  const description = isAll
    ? "Tüm snus markalarını ve çeşitlerini Snusist.com’da keşfedin. Orijinal ürünler, uygun fiyat ve aynı gün teslimat avantajı ile."
    : `${category} kategorisindeki en popüler snus ürünleri Snusist.com'da! Orijinal ürün garantisi ve hızlı teslimat avantajı ile.`;

  const imageUrl = isAll
    ? "https://snusist.com/images/snusist-logo.cat.webp"
    : `https://snusist.com/images/${category}-category-image.webp`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    image: imageUrl,
    mainEntity: filteredProducts.map((product) => ({
      "@type": "Product",
      name: product.title,
      image: [`https://snusist.com/images/${product.title}-image.webp`],
      description:
        typeof product.description === "string"
          ? product.description.replace(/<[^>]+>/g, "")
          : "",
      brand: { "@type": "Brand", name: "Snusist" },
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `https://snusist.com/products/${product.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
