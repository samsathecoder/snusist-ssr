// src/models/Blog.ts
import mongoose, { Schema, models, model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  coverImage?: string;
  createdAtTR?: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    coverImage: { type: String },
    createdAtTR: { type: String },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;
