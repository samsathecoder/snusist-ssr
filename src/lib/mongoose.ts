import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI tanımlı değil (.env.local dosyasını kontrol et)");
}

// global tip deklarasyonu — Next.js / node global'inde güvenli cache için
declare global {
  var _mongooseCache: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<Mongoose> {
  if (global._mongooseCache!.conn) {
    return global._mongooseCache!.conn!;
  }

  if (!global._mongooseCache!.promise) {
    global._mongooseCache!.promise = mongoose
      .connect(MONGODB_URI)
      .then((m) => m);
  }

  global._mongooseCache!.conn = await global._mongooseCache!.promise;
  return global._mongooseCache!.conn!;
}

export default connectDB;