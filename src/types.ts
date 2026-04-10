export interface Product {
  id: number;
  title: string;
  slug: string;
  name?: string; // Backward compatibility
  price: number;
  description: string;
  category: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  stoktaVar?: boolean;
  _id?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: Array<string>;
  date: string;
}