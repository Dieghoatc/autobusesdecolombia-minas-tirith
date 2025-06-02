import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log("✅ Middleware ejecutado en:", request.nextUrl.pathname);
  const token = request.cookies.get("access_token")?.value;
  console.log("🚀 Token:", token);

  // if (
  //   request.method === "GET" &&
  //   !token &&
  //   request.nextUrl.pathname.startsWith("/upload")
  // ) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/upload", "/upload/:path*"],
};

export const runtime = 'nodejs';  
