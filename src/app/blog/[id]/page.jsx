import { notFound } from 'next/navigation';
import { blogPosts } from '../../data/blog';
export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => String(p.id) === params.id);

  if (!post) return {};

  return {
    title: `${post.title} | Snus Blog İstanbul`,
    description: post.excerpt || "Snus hakkında detaylı bilgi içeren blog yazısı.",
    openGraph: {
      title: `${post.title} | Snus Blog İstanbul`,
      description: post.excerpt || "Snus hakkında detaylı bilgi içeren blog yazısı.",
      url: `https://snusist.com/blog/${post.id}`,
      siteName: "Snusist",
      type: "article",
      images: [
        {
          url: "/images/logo.png", // istersen her post için özel resim de ekleyebiliriz
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
  };
}
export default function BlogPost({ params }) {
  const { id } = params;

  const post = blogPosts.find((p) => String(p.id) === id); // id sayı olduğu için string'e çeviriyoruz

  if (!post) {
    notFound();
  }

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
