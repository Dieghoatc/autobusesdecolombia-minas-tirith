import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🛡️ Middleware ejecutado:', request.nextUrl.pathname)

  const token = request.cookies.get('token')?.value

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}