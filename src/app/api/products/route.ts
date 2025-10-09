import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectMongo from "@/lib/mongoose"; // mongodb bağlantı fonksiyonun

export async function GET() {
  await connectMongo();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ürün eklenemedi", details: error }, { status: 500 });
  }
}
