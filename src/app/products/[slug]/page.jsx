import { createProductSlug } from '@/lib/slugify';
import { products } from '../../data/products';
import ProductClient from './ProductClient';
import slugify from 'slugify';
// Static parametreler oluşturuluyor
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: createProductSlug(product),
  }));
}
// Metadata fonksiyonu, SEO ve sosyal medya bilgilerini ayarlamak için
export async function generateMetadata({ params  }) {
  const slug = params.slug; 
   const product = products.find(
    (p) => createProductSlug(p) === slug
  );

  if (!product) {
    return {
      title: 'Ürün bulunamadı - Snus İstanbul',
      description: 'Aradığınız ürün bulunamadı.',
    };
  }
  const safeProductName = slugify(product.name);

  return {
    title: `${product.name} - Snus İstanbul`,
    description: `${product.name} hakkında detaylı bilgi ve en iyi fiyat Snusist.com'da. İstanbul içi aynı gün teslimat ve güvenli ödeme seçenekleriyle.`,
    openGraph: {
      title: `${product.name} - Snus İstanbul`,
      description: `${product.name} ürününü şimdi keşfedin. İstanbul'da aynı gün teslimat avantajıyla sipariş verin.`,
    images: [`/images/${safeProductName}-image.webp`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Snus İstanbul`,
      description: `Snus İstanbul'da ${product.name} için en iyi fiyat ve hızlı teslimat.`,
    images: [`/images/${safeProductName}-image.webp`],
    },
    alternates: {
      canonical: `https://snusist.com/products/${createProductSlug(product)}`, // 👈 Burada canonical doğru ayarlanıyor
    },

  };
}

// Sayfa fonksiyonu, ürün bilgilerini göstermek için
export default async function Page({ params }) {
  const product = products.find(
    (p) => createProductSlug(p) === params.slug
  );

  if (!product) {
    return <div>Ürün bulunamadı.</div>; // Eğer ürün bulunmazsa bir mesaj gösteriyoruz
  }

  // generateMetadata tarafından dönen SEO bilgilerini al
  const metadata = {
    slug: `${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
  };

  return <ProductClient product={product} metadata={metadata} />;
}
