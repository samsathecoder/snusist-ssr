import { blogPosts } from '../../data/blog';
import { createBlogSlug } from '@/lib/slugify';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: createBlogSlug(post),
  }));
}
// Metadata fonksiyonu, SEO ve sosyal medya bilgilerini ayarlamak için
// export async function generateMetadata({ params }) {
//   const post = blogPosts.find(
//     (p) => createBlogSlug(p) === params.slug
//   );
//   if (!post) return {};

//   return {
//     alternates: {
//       canonical: `https://snusist.com/blog/${createBlogSlug(post.title)}`, // 👈 Burada canonical doğru ayarlanıyor
//     },
//     title: `${post.title} | Snus Blog İstanbul`,
//     description: post.excerpt || "Snus hakkında detaylı bilgi içeren blog yazısı.",
//     openGraph: {
//       title: `${post.title} | Snus Blog İstanbul`,
//       description: post.excerpt || "Snus hakkında detaylı bilgi içeren blog yazısı.",
//       siteName: "Snusist",
//       type: "article",
//       images: [
//         {
//           url: "/images/logo.png", // istersen her post için özel resim de ekleyebiliriz
//           width: 800,
//           height: 600,
//           alt: post.title,
//         },
//       ],
//     },
//   };
// }
export default function BlogPost({ params }) {
  const slug = params.id;  const post = blogPosts.find((p) => createBlogSlug(p) === slug);
 
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{post.date}</p>
      <div className="text-lg text-gray-700 leading-relaxed space-y-4">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
