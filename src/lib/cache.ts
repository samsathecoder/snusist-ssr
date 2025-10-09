// lib/cache.ts
import { IProduct } from "@/models/Product";

let productsCache: IProduct[] | null = null;

export function getProductsCache(): IProduct[] {
  return productsCache || []; 
}

export function setProductsCache(products: IProduct[]) {
  productsCache = products;
}
