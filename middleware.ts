import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('✅ Middleware ejecutado en:', request.nextUrl.pathname)

  console.log('Todas las cookies:', request.cookies.getAll());
  const token = request.cookies.get('access_token')?.value
  console.log('✅ Token de acceso:', token)

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'], // Aplica solo a /dashboard
}