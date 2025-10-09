import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import ProductClient from './ProductClient';
import type { Metadata } from 'next';
import ProductStructuredData from './StructedData';
import { getProductsCache, setProductsCache } from '@/lib/cache';

export const dynamic = "force-dynamic";

export const revalidate = 60;
export const dynamicParams = true;
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return {
      title: 'Ürün bulunamadı - Snus İstanbul',
      description: 'Aradığınız ürün bulunamadı.',
      robots: { index: false, follow: false },
    };
  }

  const siteName = 'Snus İstanbul';
  const baseUrl = 'https://snusist.com';
  const canonical = `${baseUrl}/products/${product.slug}`;
  const image = product.coverImage || `${baseUrl}/images/snusist-logo.webp`;

  return {
    title: `${product.title} - ${siteName}`,
    description: `${product.title} snus, orijinal ürün ve en iyi fiyat garantisiyle ${siteName}'da.`,
    keywords: [
      `${product.title}`,
      'snus satın al',
      'snus istanbul',
    
    ],

    alternates: { canonical },
    openGraph: {
      title: `${product.title} - ${siteName}`,
      description: `${product.title} ürününü keşfedin. Hızlı teslimat, güvenli alışveriş.`,
      url: canonical,
      siteName,
  type: "website",      locale: 'tr_TR',
      images: [
        { url: image, width: 1200, height: 630, alt: `${product.title} - ${siteName}` },
      ],
    },
    twitter: { card: 'summary_large_image', title: `${product.title} - ${siteName}`, description: `${product.title} ürününü şimdi keşfedin.`, images: [image], creator: '@snusist' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  await connectDB();

  const product = await Product.findOne({ slug: params.slug }).lean();
  if (!product) return <div>Ürün bulunamadı.</div>;




let allProducts = getProductsCache();
if (!allProducts) {
  const allProductsFromDB = await Product.find({}).lean().exec();

  // Mongoose objelerini IProduct tipine dönüştür
  allProducts = allProductsFromDB.map(product => ({
     ...product,
    _id: product._id?.toString(),

  }));

  setProductsCache(allProducts); // tip uyumlu
}

  return<>
   <ProductClient product={JSON.parse(JSON.stringify(product))} allProducts={JSON.parse(JSON.stringify(allProducts))} />
         <ProductStructuredData product={JSON.parse(JSON.stringify(product))} />

  </>;
}
