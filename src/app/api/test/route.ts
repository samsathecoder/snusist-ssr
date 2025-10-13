// app/api/products/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product, { IProduct } from "@/models/Product";
import { getProductsCache, setProductsCache } from "@/lib/cache";

export async function GET() {
  try {
    // 1️⃣ DB bağlantısı
    const mongooseInstance = await connectDB();
    if (!mongooseInstance.connection.readyState) {
      console.error("MongoDB bağlantısı başarısız!");
      return NextResponse.json({ error: "MongoDB bağlantısı başarısız" }, { status: 500 });
    }

    // 2️⃣ Cache kontrol
    let products: IProduct[] | null = getProductsCache();
    if (products && products.length > 0) {
      console.log("Cache kullanıldı, ürün sayısı:", products.length);
      return NextResponse.json({ products });
    }

    // 3️⃣ DB’den ürünleri çek
    const allProductsFromDB = await Product.find({}).lean();
    if (!allProductsFromDB || allProductsFromDB.length === 0) {
      console.warn("DB’den hiç ürün gelmedi!");
      return NextResponse.json({ products: [] });
    }

    // 4️⃣ Mongo objelerini plain JS objelerine dönüştür
    products = allProductsFromDB.map((p) => ({
      _id: p._id?.toString() || "",
      title: p.title || "",
      slug: p.slug || "",
      description: p.description || "",
      category: p.category || "",
      seoTitle: p.seoTitle || "",
      seoDescription: p.seoDescription || "",
      coverImage: p.coverImage || "",
      price: p.price || 0,
    }));

    // 5️⃣ Cache’e kaydet
    setProductsCache(products);
    console.log("DB’den çekildi ve cache’e kaydedildi. Ürün sayısı:", products.length);

    // 6️⃣ JSON olarak döndür
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Hata oluştu:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
