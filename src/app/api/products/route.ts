import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Ürünler getirilemedi:', error);
    return NextResponse.json({ error: "Ürünler getirilemedi", details: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Local data modification örneği - gerçek uygulamada dosya yazma işlemi gerekli
    // Şimdilik bu endpoint devre dışı veya sadece warning dönecek
    return NextResponse.json(
      { message: "Ürün ekleme local data modu'nda desteklenmiyor. JSON dosyasını düzenleyin." },
      { status: 405 }
    );
  } catch (error) {
    return NextResponse.json({ error: "İşlem başarısız", details: error }, { status: 500 });
  }
}

