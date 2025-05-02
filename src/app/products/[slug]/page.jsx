import { products} from '../../data/products';
 import { createProductSlug } from '@/lib/slugify';
import ProductClient from './ProductClient';

// SEO Metadata
export async function generateMetadata({ params }) {
  const productId = params.slug.split('-')[0];
  const product = products.find(p => p.id.toString() === productId);

  if (!product) {
    return {
      title: 'Ürün bulunamadı - Snus İstanbul',
      description: 'Aradığınız ürün bulunamadı.',
    };
  }

  const name = product.name;
  const slug = createProductSlug(product);
  const image = `https://snusist.com/images/${name}-image.webp`;

  return {
    title: `${name} | Snus İstanbul`,
    description: `${name} - Snus İstanbul'da hemen sipariş verin!`,
    openGraph: {
      title: `${name} | Snus İstanbul`,
      description: `${name} hakkında detaylı bilgi ve sipariş imkanı.`,
      images: [image],
      url: `https://snusist.com/products/${slug}`,
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | Snus İstanbul`,
      description: `${name} hakkında detaylı bilgi ve sipariş imkanı.`,
      images: [image],
    },
    alternates: {
      canonical: `https://snusist.com/products/${slug}`,
    },
  };
}

// Sayfa bileşeni
export default async function ProductPage({ params }) {
  const productId = params.slug.split('-')[0];
  const product = products.find(p => p.id.toString() === productId);

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <>
      {/* Structured Data ayrı bileşen olarak */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: [`https://snusist.com/images/${product.name}-image.webp`],
            description: product.description.replace(/<[^>]+>/g, ''),
            brand: {
              "@type": "Brand",
              name: "Snusist",
            },
            offers: {
              "@type": "Offer",
              url: `https://snusist.com/products/${createProductSlug(product)}`,
              priceCurrency: "TRY",
              price: Number(product.price),
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      <ProductClient product={product} />
    </>
  );
}
