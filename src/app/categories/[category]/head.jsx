// app/categories/[category]/head.jsx
import React from 'react';
import { products, categories } from '../../data/products';

// Kategori adını URL'ye uygun hale getirme
const encodeCategory = (category) => {
  return encodeURIComponent(category); // & gibi özel karakterleri encode eder
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

export default function Head({ params }) {
  const category = params.category;
  const encodedCategory = encodeCategory(category); // encode edilen kategori adı
  const filteredProducts = products.filter((p) => p.category === category);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} Snus Ürünleri`,
    description: `${category} kategorisindeki snus ürünleri Snusist.com'da!`,
    url: `https://snusist.com/categories/${encodedCategory}`, // URL'yi encode edilmiş kategori adıyla oluşturuyoruz
    image: `https://snusist.com/images/${encodedCategory}-image.png`, // Kategoriyi encode ediyoruz
    mainEntity: filteredProducts.map((product) => ({
      "@type": "Product",
      name: product.name,
      image: [`https://snusist.com/images/${product.name}-image.jpg`],
      description: product.description?.replace(/<[^>]+>/g, ''),
      sku: product.id,
      brand: { "@type": "Brand", name: "Snusist" },
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `https://snusist.com/products/${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
