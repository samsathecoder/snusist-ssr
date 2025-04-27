import CategoryClient from './CategoryClient';
import { products } from '../../data/products';

// Ürün kategorilerini alıyoruz
const categories = [...new Set(products.map(p => p.category))];

// generateStaticParams içinde kategorilerin parametrelerini oluşturuyoruz
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}

// params.category'yi kullanmadan önce `await` ile beklememiz gerekiyor
export default async function Page({ params }) {
  // params.category'yi direkt olarak alıyoruz, ancak await kullanmamıza gerek yok
  const { category } = params;

  // Eğer category değeri mevcut değilse, bir yükleme ekranı gösterebiliriz
  if (!category) {
    return <div>Loading...</div>;
  }

  return <CategoryClient category={category} />;
}
