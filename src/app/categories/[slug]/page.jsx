import { products } from '../../data/products';
import CategoryClient from './CategoryClient';
import StructuredData from './StructedData';

export async function generateStaticParams() {
  const categories = [...new Set(products.map((p) => p.category))];
  return categories.map((slug) => ({ slug }));
}

// ✅ metadata artık burada tanımlanıyor!
export async function generateMetadata({ params }) {
  const category = params.slug;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  const imageUrl = `https://snusist.com/images/${category}-category-image.webp`;

  return {
    title: `${capitalized} Snus Ürünleri - Snus İstanbul`,
    description: `${capitalized} kategorisindeki en kaliteli snus ürünleri Snusist'te! İstanbul içi aynı gün teslimat ile şimdi sipariş verin.`,
    openGraph: {
      type: "website",
      title: `${capitalized} Snus Ürünleri - Snus İstanbul`,
      description: `Snusist'te ${capitalized} kategorisindeki ürünleri keşfedin. İstanbul içi hızlı teslimat ve uygun fiyat avantajları.`,
      url: `https://snusist.com/categories/${category}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${capitalized} Snus Ürünleri`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${capitalized} Snus Ürünleri - Snus İstanbul`,
      description: `${capitalized} snus ürünlerini şimdi keşfedin!`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://snusist.com/categories/${category}`,
    },
  };
}

export default function CategoryPage({ params }) {
  const slug = params.slug;
  return (
    <>
      <StructuredData category={slug} />
      <CategoryClient slug={slug} />
    </>
  );
}
