// src/app/(site)/blog/[slug]/page.tsx
import React from "react";

import type { Metadata } from "next";

// ✅ Sayfanın param tipi
interface PageProps {
  params: { slug: string };
}

// ✅ generateMetadata - Blog system disabled (MongoDB removed)
export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: "Blog - Snusist",
    description: "Blog sistemi şu anda devre dışıdır.",
    robots: { index: false, follow: false },
  };
}

// ✅ generateStaticParams - Returns empty
export async function generateStaticParams() {
  return [];
}

// ✅ Default page - Blog system disabled
export default async function BlogDetailPage({ params }: PageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Blog Sistemi Bakımda</h1>
      <p className="text-gray-600">Blog sistemi şu anda güncellenmektedir.</p>
    </div>
  );
}
