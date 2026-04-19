import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const blogsPath = path.join(process.cwd(), "public/data/blog.json");
    const blogData = fs.readFileSync(blogsPath, "utf-8");
    const blogs = JSON.parse(blogData);
    
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("Blog yükleme hatası:", err);
    return NextResponse.json(
      { error: "Blog yazıları yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Blog API disabled - MongoDB removed
    return new Response(JSON.stringify({ error: "Blog API not available" }), { status: 503 });
  } catch (err) {
    console.error("Blog kayıt hatası:", err);
    return new Response("Bir hata oluştu", { status: 500 });
  }
}
