import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';

// Blog verilerini oku
function getBlogPost(slug: string) {
  try {
    const blogsPath = path.join(process.cwd(), 'public/data/blog.json');
    const blogData = fs.readFileSync(blogsPath, 'utf-8');
    const blogs = JSON.parse(blogData);
    return blogs.find((blog: any) => blog.slug === slug);
  } catch (error) {
    console.error('Blog yükleme hatası:', error);
    return null;
  }
}

// Dinamik segmentler için slug'ları döndür
export async function generateStaticParams() {
  try {
    const blogsPath = path.join(process.cwd(), 'public/data/blog.json');
    const blogData = fs.readFileSync(blogsPath, 'utf-8');
    const blogs = JSON.parse(blogData);
    return blogs.map((blog: any) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Slug üretme hatası:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
      description: 'İstediğiniz blog yazısı bulunamadı.',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    robots: { index: true, follow: true },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage || 'https://snusist.com/images/snusist-logo.webp',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Snusist',
      url: `https://snusist.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.coverImage || 'https://snusist.com/images/snusist-logo.webp'],
    },
    alternates: {
      canonical: `https://snusist.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Geri Dön Linki */}
      <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 font-semibold mb-6 inline-block">
        ← Tüm Yazılara Dön
      </Link>

      {/* Cover Image */}
      <div className="w-full h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={post.coverImage || 'https://snusist.com/images/snusist-logo.webp'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Meta Bilgiler */}
      <div className="mb-8 pb-8 border-b">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <span className="font-semibold text-indigo-600">{post.category}</span>
          <span>•</span>
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readTime} dakika okuma</span>
          <span>•</span>
          <span className="font-semibold text-gray-700">{post.author}</span>
        </div>
      </div>

      {/* İçerik */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.replace(
              /<h2>/g,
              '<h2 class="text-3xl font-bold mt-8 mb-4 text-gray-900">'
            ).replace(
              /<h3>/g,
              '<h3 class="text-2xl font-bold mt-6 mb-3 text-gray-900">'
            ).replace(
              /<p>/g,
              '<p class="mb-4 text-gray-700 leading-relaxed">'
            ).replace(
              /<ul>/g,
              '<ul class="list-disc list-inside space-y-2 my-4 text-gray-700">'
            ).replace(
              /<li>/g,
              '<li class="ml-4">'
            ).replace(
              /<strong>/g,
              '<strong class="font-bold text-gray-900">'
            ),
          }}
        />
      </div>

      {/* Ayrılan Çizgi */}
      <div className="border-t my-12"></div>

      {/* Yazı Meta */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Kategorisi:</strong> {post.category}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Anahtar Kelimeler:</strong> {post.keywords}
        </p>
      </div>

      {/* Başka Yazılar Linki */}
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Diğer Blog Yazılarını Oku
        </Link>
      </div>
    </article>
  );
}
