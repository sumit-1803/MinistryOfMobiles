import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected
  const isProtectedPath = path.startsWith('/admin') && !path.startsWith('/admin/login');

  if (isProtectedPath) {
    const cookie = request.cookies.get('session')?.value;
    const session = await decrypt(cookie);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
