import connectDB from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { BlogStructuredData } from "@/StructedData/BlogStructedData";

export async function generateMetadata({ params }) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug }).lean();
  if (!blog) return {};

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription,
    keywords: blog.seoKeywords?.join(", "),
    robots: { index: true, follow: true },
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription,
      url: `https://snusist.com/blog/${blog.slug}`,
      type: "article",
      siteName: "Snusist",
      images: [
        {
          url: blog.coverImage,
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
      article: {
        publishedTime: blog.createdAtTR,
        authors: ["Snusist"],
        tags: blog.tags,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle,
      description: blog.seoDescription,
      images: [blog.coverImage],
      site: "@snusist",
      creator: "@snusist",
    },
    alternates: {
      canonical: `https://snusist.com/blog/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug }).lean();

  if (!blog) return <p>Blog bulunamadı.</p>;

  return (
    <>
      {/* JSON-LD */}
      <BlogStructuredData blog={blog} />

      {/* Sayfa içeriği */}
      <div className="max-w-3xl mx-auto px-4 py-48">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <p className="text-gray-500 mt-6">
          Yayın Tarihi: {blog.createdAtTR} | Etiketler: {blog.tags?.join(", ")}
        </p>
      </div>
    </>
  );
}
