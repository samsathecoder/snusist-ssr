import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Blog API disabled - MongoDB removed
    return new Response(JSON.stringify({ error: "Blog API not available" }), { status: 503 });
  } catch (err) {
    console.error("Blog kayıt hatası:", err);
    return new Response("Bir hata oluştu", { status: 500 });
  }
}
