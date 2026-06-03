import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 1. Eğer URL'de büyük harf varsa küçük harfe yönlendir (301)
  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Sadece ürün, kategori ve blog sayfalarında çalışsın (resimleri etkilemesin)
  matcher: ['/products/:path*', '/categories/:path*', '/blog/:path*'],
};