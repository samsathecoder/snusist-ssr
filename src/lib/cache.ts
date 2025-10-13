// lib/cache.ts
import { IProduct } from "@/models/Product";

let productsCache: IProduct[] | null = null;

export function getProductsCache(): IProduct[] {
  return Array.isArray(productsCache) ? productsCache : [];
}

export function setProductsCache(products: IProduct[]) {
  productsCache = products;
}
export function isProductsCacheFilled(): boolean {
  return Array.isArray(productsCache) && productsCache.length > 0;
}