export function BlogStructuredData({ blog }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://snusist.com/blog/${blog.slug}`
    },
    "headline": blog.seoTitle || blog.title,
    "description": blog.seoDescription || blog.content.substring(0, 160),
    "image": [blog.coverImage || "https://snusist.com/images/snusist-logo.webp"],
    "author": { "@type": "Organization", "name": "Snusist" },
    "publisher": {
      "@type": "Organization",
      "name": "Snusist",
      "logo": { "@type": "ImageObject", "url": "https://snusist.com/images/snusist-logo.webp" }
    },
    "datePublished": blog.createdAtTR,
    "dateModified": blog.updatedAt || new Date().toISOString(),
    "keywords": blog.seoKeywords?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
