// src/lib/metadata.ts
import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import type { Metadata } from 'next';

export async function generateProductMetadata(slug: string): Promise<Metadata> {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return {
      title: 'Ürün bulunamadı - snusist.com',
      description: 'Aradığınız ürün mevcut değil.',
      robots: { index: false, follow: false },
    };
  }

  const siteName = '| snus';
  const baseUrl = 'https://snusist.com';
  const canonical = `${baseUrl}/products/${product.slug}`;
  const image = product.coverImage || `${baseUrl}/images/snusist-logo.webp`;

  return {
    title: `${product.title} - ${siteName}`,
    description: `${product.title} orijinal ürün, hızlı teslimat ve en iyi fiyatla snusist.com'da.`,
    alternates: { canonical },
    openGraph: {
      title: `${product.title} - ${siteName}`,
      description: `${product.title} ürününü keşfedin.`,
      url: canonical,
      siteName,
      locale: 'tr_TR',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - ${siteName}`,
      description: `${product.title} ürününü keşfedin.`,
      images: [image],
    },
  };
}
