// src/app/(site)/products/[slug]/page.tsx
import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import ProductClient from './ProductClient';
import ProductStructuredData from './StructedData';
import { getProductsCache, setProductsCache } from '@/lib/cache';
import type { Metadata, ResolvingMetadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateStaticParams() {
  await connectDB();

  const products = await Product.find().select('slug').lean();

  return products.map((product) => ({
    slug: product.slug.toLowerCase(), 
  }));
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Dinamik parametreyi al
  const { slug } = await params;

  const previousImages = (await parent).openGraph?.images || [];
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
      robots: { index: true, follow: true },

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

export default async function Page(   { params, searchParams }: Props,) {
  await connectDB();
  const product = await Product.findOne({ slug: (await params).slug }).lean();
  if (!product) return <div>Ürün bulunamadı.</div>;

  let allProducts = getProductsCache();
  if (!allProducts) {
    const allProductsFromDB = await Product.find({}).lean().exec();
    allProducts = allProductsFromDB.map(p => ({
      ...p,
      _id: p._id?.toString(),
    }));
    setProductsCache(allProducts);
  }

  return (
    <>
      <ProductClient
        product={JSON.parse(JSON.stringify(product))}
        allProducts={JSON.parse(JSON.stringify(allProducts))}
      />
      <ProductStructuredData product={JSON.parse(JSON.stringify(product))} />
    </>
  );
}
