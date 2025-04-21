import { products } from '../../data/products';
import ProductClient from './ProductClient';
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: `${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
  }));
}

export async function generateMetadata({ params }) {
  const productId = params.slug?.split('-')[0];
  const product = products.find((p) => p.id.toString() === productId);

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
      images: [`/images/${product.name}-image.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Snus İstanbul`,
      description: `Snus İstanbul'da ${product.name} için en iyi fiyat ve hızlı teslimat.`,
      images: [`/images/${product.name}-image.jpg`],
    },
  };
}

export default function Page({ params }) {
  const productId = params.slug?.split('-')[0];
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) return null; // Alternatif olarak notFound() da çağrılabilir.

  return <ProductClient product={product} />;
}
