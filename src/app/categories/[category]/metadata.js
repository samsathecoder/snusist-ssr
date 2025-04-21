// app/categories/[category]/metadata.js
import { products } from '../../data/products';
export async function generateMetadata({ params }) {
  const category = params.category;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  const imageUrl = `https://snusist.com/images/${category}-image.png`;

  return {
    title: `${capitalized} Snus Ürünleri - Snus İstanbul`,
    description: `${capitalized} kategorisindeki en kaliteli snus ürünleri Snusist'te! İstanbul içi aynı gün teslimat ile şimdi sipariş verin.`,
    openGraph: {
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
      description: `${capitalized} snus ürünlerini şimdi keşfedin! İstanbul içi teslimat ve güvenli ödeme imkanlarıyla.`,
      images: [imageUrl],
    },
  };
}
