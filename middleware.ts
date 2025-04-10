import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('✅ Middleware ejecutado en:', request.nextUrl.pathname)
  const token = request.cookies.get('access_token')?.value

  if (
    request.method === "GET" &&
    !token &&
    request.nextUrl.pathname.startsWith('/upload')
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/upload/:path*'], 
}