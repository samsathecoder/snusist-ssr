import { notFound } from 'next/navigation';
import { blogPosts } from '../../data/blog';

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
