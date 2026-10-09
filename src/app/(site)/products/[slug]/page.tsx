// src/app/(site)/products/[slug]/page.tsx
import { getProductBySlug, getAllProductSlugs, getProducts } from '@/lib/products';
import ProductClient from './ProductClient';
import ProductStructuredData from './StructedData';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// SSG için static paths oluştur - build time'da tüm sayfalar generate edilecek
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Dynamic metadata generation - SEO için
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
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
  const image = product.coverImage || `${baseUrl}/images/${encodeURIComponent(product.title)}-image.webp`;

  return {
    title: product.seoTitle || `${product.title} - Snus Istanbul`,
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
      title: product.seoTitle || `${product.title}`,
      description: product.seoDescription || `${product.title} orijinal ürün, hızlı teslimat ve en iyi fiyatla snusist.com'da.`,
      images: [image],
    },
  };
}

// ISR - 24 saate bir revalidate et
export const revalidate = 86400;

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products için diğer ürünleri al
  const allProducts = await getProducts();
  const otherProducts = allProducts.filter((p) => p.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://snusist.com/" },
      { "@type": "ListItem", position: 2, name: "Kategoriler", item: "https://snusist.com/categories" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://snusist.com/categories/${product.category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.title,
        item: `https://snusist.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <ProductClient
        product={product}
        allProducts={otherProducts}
      />
      <ProductStructuredData product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
