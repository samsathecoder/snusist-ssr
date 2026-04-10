import { Product } from '@/types';
import fs from 'fs';
import path from 'path';

// Local JSON dosyasından ürünleri yükle
export async function getProducts(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    if (!fs.existsSync(filePath)) {
      console.warn('products.json dosyası bulunamadı');
      return [];
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    return products;
  } catch (error) {
    console.error('Ürünler yüklenemedi:', error);
    return [];
  }
}

// Slug ile belirli bir ürün bul
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) || null;
}

// Tüm ürün sluglarını döndür (SSG için)
export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}

// Kategori ile ürün bul
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
}

// Arama yapısı
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.title?.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery) ||
      product.category?.toLowerCase().includes(lowerQuery)
  );
}

// Dummy export (eski kod uyumluluğu için)
export const products: Product[] = [];
