import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Customer from '@/models/Customer';

export async function GET() {
  await dbConnect();
  
  // Try to find the user from the screenshot username 'sumit182003'
  // Assuming username is part of email or name. 
  // Let's search for a customer that looks like the user.
  const customer = await Customer.findOne({ email: { $regex: 'sumit', $options: 'i' } });
  
  if (!customer) {
    return NextResponse.json({ message: 'Customer not found' });
  }

  const ordersRaw = await Order.find({ email: customer.email })
    .populate('productId')
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ 
    customerEmail: customer.email, 
    ordersCount: ordersRaw.length,
    firstOrder: ordersRaw[0],
    rawOrders: ordersRaw.map(o => ({
      _id: o._id,
      productIdRaw: o.productId,
      productIdType: typeof o.productId,
      status: o.status
    }))
  });
}
