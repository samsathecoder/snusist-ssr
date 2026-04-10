import Link from 'next/link';

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
  // Blog data will be added in the future
  const blogs = [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold text-center mb-16">📝 Son Blog Yazıları</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <article key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
            {/* Cover Image */}
            <img
              src={post.coverImage || "https://snusist.com/images/snusist-logo.webp"}
              alt={post.title}
              className="w-full h-48 object-contain"
            />

            <div className="p-6">
              {/* Tarih */}
              <time className="text-sm text-gray-500">
                {post.createdAtTR || new Date(post.createdAt).toLocaleDateString("tr-TR")}
              </time>

              {/* Başlık */}
              <h2 className="text-xl font-bold mt-2 mb-3">{post.title}</h2>

              {/* Özet */}
              <p className="text-gray-600 mb-4">{ post.seoDescription.substring(0, 300) + "..."}</p>

              {/* Etiketler */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Devamını oku */}
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Yazıyı Oku →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
