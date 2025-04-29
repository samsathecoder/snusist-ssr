import { createProductSlug } from '@/lib/slugify';
import { products } from '../../data/products';
import ProductClient from './ProductClient';

// Static parametreler oluşturuluyor
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: `${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
  }));
}

// Metadata fonksiyonu, SEO ve sosyal medya bilgilerini ayarlamak için
export async function generateMetadata({ params }) {
  const productId = params.slug?.split('-')[0]; // slug'dan ID'yi alıyoruz
  const product = products.find((p) => p.id.toString() === productId);
  const slug = `${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`;

  if (!product) {
    return {
      title: 'Ürün bulunamadı - Snus İstanbul',
      description: 'Aradığınız ürün bulunamadı.',
    };
  }

  return {
    title: `${product.name} - Snus İstanbul`,
    description: `${product.name} hakkında detaylı bilgi ve en iyi fiyat Snusist.com'da. İstanbul içi aynı gün teslimat ve güvenli ödeme seçenekleriyle.`,
    openGraph: {
      title: `${product.name} - Snus İstanbul`,
      description: `${product.name} ürününü şimdi keşfedin. İstanbul'da aynı gün teslimat avantajıyla sipariş verin.`,
      images: [`/images/${product.name}-image.webp`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Snus İstanbul`,
      description: `Snus İstanbul'da ${product.name} için en iyi fiyat ve hızlı teslimat.`,
      images: [`/images/${product.name}-image.webp`],
    },
    alternates: {
      canonical: `https://snusist.com/products/${createProductSlug(product)}`, // 👈 Burada canonical doğru ayarlanıyor
    },

  };
}

// Sayfa fonksiyonu, ürün bilgilerini göstermek için
export default async function Page({ params }) {
  const productId = params.slug?.split('-')[0]; // slug'dan ürün ID'sini alıyoruz
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return <div>Ürün bulunamadı.</div>; // Eğer ürün bulunmazsa bir mesaj gösteriyoruz
  }

  // generateMetadata tarafından dönen SEO bilgilerini al
  const metadata = {
    slug: `${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
  };

  return <ProductClient product={product} metadata={metadata} />;
}
