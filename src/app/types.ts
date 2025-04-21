export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: Array<string>;
  date: string;
}