import { NextRequest } from "next/server";
import connectDB from "@/lib/mongoose";
import Blog from "@/models/Blog";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const istTime = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
      hour12: false,
    });

    const blog = new Blog({
      ...data,
      
      createdAtTR: istTime,
    });

    await blog.save();

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (err) {
    console.error("Blog kayıt hatası:", err);
    return new Response("Bir hata oluştu", { status: 500 });
  }
}
