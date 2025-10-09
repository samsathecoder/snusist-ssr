// components/StructuredData.tsx
'use client';
import React from 'react';
import { IProduct } from '@/models/Product';

interface Props {
  product: IProduct;
}

export default function ProductStructuredData({ product }: Props) {
  const imageUrl = product.coverImage || 'https://snusist.com/images/snusist-logo.webp';
  const description = product.description ? product.description.replace(/<[^>]+>/g, '') : '';
  const productUrl = `https://snusist.com/products/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org/",
"@type": "Product",
    name: product.title,
    image: imageUrl,
    description,
    brand: {
      "@type": "Brand",
      name: "Snusist",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "TRY",
      price: Number(product.price),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
