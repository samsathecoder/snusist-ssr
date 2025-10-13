// src/app/(site)/blog/[slug]/page.tsx
import React from "react";
import connectDB from "@/lib/mongoose";
import Blog, { IBlog } from "@/models/Blog";
import { BlogStructuredData } from "@/StructedData/BlogStructedData";
import type { Metadata } from "next";

// ✅ Sayfanın param tipi
interface PageProps {
  params: { slug: string };
}

// ✅ generateMetadata artık aynı tip ile uyumlu
export async function generateMetadata(
  { params }: PageProps,
 
): Promise<Metadata> {
  // Dinamik parametreyi al
  const { slug } = await params;

 
  const blog = (await Blog.findOne({ slug }).lean()) as IBlog | null;

  if (!blog) {
    return { title: "Blog bulunamadı - Snusist" };
  }

  return {
    title: blog.title,
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
          url: "https://snusist.com/public/images/snusist-logo.webp",
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription,
      images: ["https://snusist.com/public/images/snusist-logo.webp"],
      site: "@snusist",
      creator: "@snusist",
    },
    alternates: {
      canonical: `https://snusist.com/blog/${blog.slug}`,
    },
  };
}
// Statik sayfaları üretmek için parametreler
export async function generateStaticParams() {
  await connectDB();

  // Tüm blogların sluglarını al
  const blogs = await Blog.find().select("slug").lean();

  // Her blog için { params: { slug } } döndür
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}
// ✅ default export, tip olarak PageProps kullanıyor
export default async function BlogDetailPage({ params }: PageProps) {
  await connectDB();
  const blog = (await Blog.findOne({ slug: params.slug }).lean()) as IBlog | null;

  if (!blog) {
    return <div>Blog bulunamadı.</div>;
  }

  const publishedDate = blog.createdAtTR ? new Date(blog.createdAtTR) : new Date();

  return (
    <>
      <BlogStructuredData blog={blog} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="mt-6 text-gray-600 flex flex-wrap items-center gap-2">
          <span className="font-semibold">Yayın Tarihi:</span>
          <time dateTime={publishedDate.toISOString()}>
            {publishedDate.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {!!blog.tags?.length && (
            <>
              <span className="mx-1">|</span>
              <span className="font-semibold">Etiketler:</span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
