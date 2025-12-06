'use server';

import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function toggleWishlist(productId) {
  const session = await getSession();
  if (!session || !session.user) {
    return { success: false, message: 'Please login to add to wishlist' };
  }

  await dbConnect();
  const customer = await Customer.findOne({ email: session.user.email });

  if (!customer) {
    return { success: false, message: 'Customer not found' };
  }

  const index = customer.wishlist.indexOf(productId);
  let isAdded = false;

  if (index === -1) {
    // Add to wishlist
    customer.wishlist.push(productId);
    isAdded = true;
  } else {
    // Remove from wishlist
    customer.wishlist.splice(index, 1);
    isAdded = false;
  }

  await customer.save();
  revalidatePath('/profile');
  revalidatePath('/catalog');
  revalidatePath('/');
  
  return { success: true, isAdded };
}
