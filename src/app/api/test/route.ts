import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Test API working without MongoDB" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
