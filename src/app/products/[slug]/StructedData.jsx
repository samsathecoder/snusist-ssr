// components/StructuredData.js
import React from 'react';
import { createProductSlug } from '@/lib/slugify';

export default function ProductStructuredData({ product }) {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [`https://snusist.com/images/${product.name}-image.webp`],
    "description": product.description.replace(/<[^>]+>/g, ''),
    "brand": {
      "@type": "Brand",
      "name": "Snusist",
    },
    "offers": {
      "@type": "Offer",
      "url": `https://snusist.com/products/${createProductSlug(product)}`,
      "priceCurrency": "TRY",
      "price": Number(product.price),
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
