import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isPublicPath = pathname === '/login' || pathname === '/signup';

  // If the user is on a public path but has a token, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is on a protected path and doesn't have a token, redirect to login
  if (!isPublicPath && !token && pathname !== '/favicon.ico') {
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }
    
    if (pathname.startsWith('/api')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/api/notes/:path*',
  ],
};
