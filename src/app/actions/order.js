'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { revalidatePath } from 'next/cache';

export async function createOrder(prevState, formData) {
  await dbConnect();

  const rawFormData = {
    productId: formData.get('productId'),
    customerName: formData.get('customerName'),
    phone: formData.get('phone'),
    message: formData.get('message'),
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
  await Order.findByIdAndUpdate(id, { status });
  revalidatePath('/admin/orders');
}
