'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
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
  
  // Find order to get details before deleting
  const order = await Order.findById(id);
  if (order) {
    // If order has a user (customer) and product, remove it from their wishlist/cart
    if (order.userId && order.productId) {
      await Customer.findByIdAndUpdate(order.userId, {
        $pull: { wishlist: order.productId }
      });
    }
    
    await Order.findByIdAndDelete(id);
    revalidatePath('/profile');
    revalidatePath('/admin/orders');
  }
}

export async function getUserOrders() {
  await dbConnect();
  const session = await getSession();
  if (!session?.user?.email) return [];
  
  const orders = await Order.find({ email: session.user.email })
    .populate('productId')
    .sort({ createdAt: -1 })
    .lean();
    
  return orders.map(order => ({
    ...order,
    _id: order._id.toString(),
    productId: order.productId ? {
      ...order.productId,
      _id: order.productId._id.toString(),
      createdAt: order.productId.createdAt?.toISOString(),
      updatedAt: order.productId.updatedAt?.toISOString(),
    } : null,
    createdAt: order.createdAt?.toISOString(),
  }));
}

export async function debugSessionAction() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => ({ name: c.name, value: c.value.substring(0, 10) + '...' }));
  const session = await getSession();
  return { session, allCookies };
}
