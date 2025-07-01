import Link from 'next/link';
import { blogPosts } from '../data/blog';
import { createBlogSlug } from '@/lib/slugify';




export const metadata = {
  title: "Snus Blog | Snusist İstanbul",
  description: "Snus hakkında en güncel bilgileri ve kullanıcı deneyimlerini Snusist blog sayfamızda keşfedin.",
  openGraph: {
    title: "Snus Blog | Snusist İstanbul",
    description: "Snus hakkında en güncel bilgileri ve kullanıcı deneyimlerini Snusist blog sayfamızda keşfedin.",
    siteName: "Snusist",
    type: "website",
    images: [
      {
        url: "/images/snusist-logo.webp", // public klasöründen
        width: 800,
        height: 600,
        alt: "Snusist Blog",
      },
    
    ],
  },
  alternates: {
    canonical: `https://snusist.com/blog`, 
  },
};

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">📝 Son Blog Yazıları</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
       
            <div className="p-6">
              <time className="text-sm text-gray-500">{post.date}</time>
              <h2 className="text-xl font-bold mt-2 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <Link href={`/blog/${createBlogSlug(post)}`} className="text-blue-600 font-semibold hover:underline">
                Yazıyı Oku →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
