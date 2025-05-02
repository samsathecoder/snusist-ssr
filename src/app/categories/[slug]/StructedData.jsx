import React from 'react';
import { products } from '../../data/products';

export default function StructuredData({ category }) {
  const filteredProducts = products.filter(p => p.category === category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} Snus Ürünleri`,
    description: `${category} kategorisindeki snus ürünleri Snusist.com'da!`,
    image: `https://snusist.com/images/${category}-image.webp`,
    mainEntity: filteredProducts.map(product => ({
      "@type": "Product",
      name: product.name,
      image: [`https://snusist.com/images/${product.name}-image.webp`],
      description: product.description?.replace(/<[^>]+>/g, ''),
      sku: product.id,
      brand: { "@type": "Brand", name: "Snusist" },
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `https://snusist.com/products/${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
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
