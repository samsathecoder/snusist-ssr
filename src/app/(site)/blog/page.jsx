import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: "Snus Blog | Snusist İstanbul",
  description: "Snus hakkında en güncel bilgileri ve snus hakkında merak edilenleri Snusist blog sayfamızda keşfedin.",
  keywords: "snus, snusist, blog, snus istanbul",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Snus Blog | Snusist İstanbul",
  description: "Snus hakkında en güncel bilgileri ve snus hakkında merak edilenleri Snusist blog sayfamızda keşfedin.",
    type: "website",
    siteName: "Snusist",
    url: "https://snusist.com/blog",
    images: [
      {
        url: "https://snusist.com/images/snusist-logo.webp",
        width: 800,
        height: 600,
        alt: "Snusist Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snus Blog | Snusist İstanbul",
  description: "Snus hakkında en güncel bilgileri ve snus hakkında merak edilenleri Snusist blog sayfamızda keşfedin.",
    images: ["https://snusist.com/images/snusist-logo.webp"],
    site: "@snusist",
    creator: "@snusist",
  },
  alternates: {
    canonical: "https://snusist.com/blog",
  },
};


export default async function BlogPage() {
  // Blog verilerini doğrudan dosyadan oku
  let blogs = [];
  try {
    const blogPath = path.join(process.cwd(), 'public/data/blog.json');
    const blogData = fs.readFileSync(blogPath, 'utf-8');
    blogs = JSON.parse(blogData);
  } catch (error) {
    console.error("Blog yükleme hatası:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-16">📝 Snus Blog - Bilgi ve İpuçları</h1>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Henüz blog yazısı bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
              {/* Cover Image */}
              <img
                src={post.coverImage || "https://snusist.com/images/snusist-logo.webp"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                {/* Kategori ve Okuma Süresi */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-indigo-600">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime} dk okuma</span>
                </div>

                {/* Tarih */}
                <time className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </time>

                {/* Başlık */}
                <h2 className="text-xl font-bold mt-2 mb-3 line-clamp-2">{post.title}</h2>

                {/* Özet */}
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Devamını oku */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Yazıyı Oku →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
