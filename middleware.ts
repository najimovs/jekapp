import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth-user');
  const pathname = request.nextUrl.pathname;

  // Public routes
  if (pathname === '/login' || pathname === '/') {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const user = JSON.parse(authCookie.value);
    
    // Admin routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/create-user')) {
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/orders', request.url));
      }
    }
    
    // User routes
    if (pathname.startsWith('/orders')) {
      if (user.role !== 'user') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/create-user/:path*', '/orders/:path*']
};