'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/lib/auth';

export async function createOrder(prevState, formData) {
  await dbConnect();
  const session = await getSession();

  const rawFormData = {
    productId: formData.get('productId'),
    customerName: formData.get('customerName'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    userId: session?.user?.id,
    email: session?.user?.email,
  };

  try {
    await Order.create(rawFormData);
    return { success: true, message: 'Inquiry sent successfully!' };
  } catch (e) {
    return { success: false, message: 'Failed to send inquiry: ' + e.message };
  }
}

export async function updateOrderStatus(id, status) {
  await dbConnect();
  await Order.findByIdAndUpdate(id, { status, viewed: true });
  revalidatePath('/admin/orders');
  revalidatePath('/profile');
}

export async function deleteOrder(id) {
  await dbConnect();
  await Order.findByIdAndDelete(id);
  revalidatePath('/profile');
}

export async function getUserOrders() {
  await dbConnect();
  const session = await getSession();
  if (!session?.user?.email) return [];
  
  const orders = await Order.find({ email: session.user.email })
    .sort({ createdAt: -1 })
    .lean();
    
  return orders.map(order => ({
    ...order,
    _id: order._id.toString(),
    productId: order.productId.toString(),
    createdAt: order.createdAt?.toISOString(),
  }));
}
