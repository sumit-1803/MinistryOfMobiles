import { NextResponse } from 'next/server';
import { getUserOrders } from '@/app/actions/order';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  const orders = await getUserOrders();
  return NextResponse.json({ session, orders });
}
