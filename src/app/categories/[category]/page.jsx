import CategoryClient from './CategoryClient';
import { products } from '../../data/products';

const categories = [...new Set(products.map(p => p.category))];

export async function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

export default async function Page({ params }) {
  const category = params.category; // bu artık async fonksiyon içinde olduğu için sorun yok
  return <CategoryClient category={category} />;
}