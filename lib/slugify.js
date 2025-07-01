import BlogPost from "@/src/app/blog/[id]/page";

    
export const createProductSlug = (product) =>
  product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export const createBlogSlug = (blogPosts) => {
  if (!blogPosts || typeof blogPosts.title !== "string") return "";

  return blogPosts.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');}