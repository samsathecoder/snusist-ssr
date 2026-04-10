// src/lib/metadata.ts
import { getProductBySlug } from '@/lib/products';
import type { Metadata } from 'next';

export async function generateProductMetadata(slug: string): Promise<Metadata> {
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Ürün bulunamadı - snusist.com',
      description: 'Aradığınız ürün mevcut değil.',
      robots: { index: false, follow: false },
    };
  }

  const siteName = 'snusist';
  const baseUrl = 'https://snusist.com';
  const canonical = `${baseUrl}/products/${product.slug}`;
  const image = product.coverImage || `${baseUrl}/images/snusist-logo.webp`;

  return {
    title: product.seoTitle || `${product.title} - ${siteName}`,
    description: product.seoDescription || `${product.title} orijinal ürün, hızlı teslimat ve en iyi fiyatla snusist.com'da.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: product.seoTitle || `${product.title}`,
      description: product.seoDescription || `${product.title} orijinal ürün, hızlı teslimat ve en iyi fiyatla snusist.com'da.`,
      url: canonical,
      siteName,
      locale: 'tr_TR',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle || `${product.title} - ${siteName}`,
      description: product.seoDescription || `${product.title} orijinal ürün, hızlı teslimat ve en iyi fiyatla snusist.com'da.`,
      images: [image],
    },
  };
}

