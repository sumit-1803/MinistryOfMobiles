import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => ({ name: c.name, value: c.value.substring(0, 10) + '...' }));
  const sessionCookie = cookieStore.get('session');
  const session = await getSession();
  
  return NextResponse.json({
    hasSessionCookie: !!sessionCookie,
    sessionCookieValue: sessionCookie ? sessionCookie.value.substring(0, 20) + '...' : null,
    decodedSession: session,
    allCookies
  });
}
