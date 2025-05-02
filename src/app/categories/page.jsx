import { products } from '../data/products'; 
import CategoryClient from './[slug]/CategoryClient';
import StructuredData from './[slug]/StructedData';
export const metadata = {
  title: 'Tüm Snus Ürünleri - Snus İstanbul',
  description: 'Snusist’teki tüm snus ürünlerini hemen keşfedin. İstanbul içi aynı gün teslimat!',
  alternates: {
    canonical: 'https://snusist.com/categories',
  },
  openGraph: {
    type: "website",

    title: 'Tüm Snus Ürünleri - Snus İstanbul',
    description: 'Snusist’teki tüm snus ürünlerini görüntüleyin. Kaliteli markalar, hızlı teslimat.',
    url: 'https://snusist.com/categories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tüm Snus Ürünleri - Snus İstanbul',
    description: 'Snus ürünlerinin tamamını tek sayfada görün!',
  },
};

export default function AllCategoriesPage() {
  return (
    <>
      <StructuredData category="hepsi" />
      <CategoryClient slug="" />
    </>
  );
}
