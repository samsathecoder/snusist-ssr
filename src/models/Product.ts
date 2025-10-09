import mongoose, { Schema, Model, models, model, Document } from "mongoose";

export interface IProduct {
  _id?: string; 

  title: string;
  slug: string;
  description: string;
  category: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  price: number;
}

export interface IProductDocument extends Omit<IProduct, "_id">, Document {}

// 3️⃣ Schema
const ProductSchema = new Schema<IProductDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    coverImage: { type: String },
    price: { type: Number, required: true },
  },
);

const Product: Model<IProductDocument> =
  (models.Product as Model<IProductDocument>) ||
  model<IProductDocument>("Product", ProductSchema);

export default Product;
