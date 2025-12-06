'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(prevState, formData) {
  await dbConnect();

  const rawFormData = {
    title: formData.get('title'),
    category: formData.get('category'),
    brand: formData.get('brand'),
    model: formData.get('model'),
    price: Number(formData.get('price')),
    condition: formData.get('condition'),
    description: formData.get('description'),
    images: formData.get('images')?.split(',').map(s => s.trim()).filter(Boolean) || [],
    isAvailable: formData.get('isAvailable') === 'on',
  };

  try {
    await Product.create(rawFormData);
  } catch (e) {
    return { message: 'Failed to create product: ' + e.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  redirect('/admin/products');
}

export async function updateProduct(id, prevState, formData) {
  await dbConnect();

  const rawFormData = {
    title: formData.get('title'),
    category: formData.get('category'),
    brand: formData.get('brand'),
    model: formData.get('model'),
    price: Number(formData.get('price')),
    condition: formData.get('condition'),
    description: formData.get('description'),
    images: formData.get('images')?.split(',').map(s => s.trim()).filter(Boolean) || [],
    isAvailable: formData.get('isAvailable') === 'on',
  };

  try {
    await Product.findByIdAndUpdate(id, rawFormData);
  } catch (e) {
    return { message: 'Failed to update product: ' + e.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  revalidatePath(`/product/${id}`);
  redirect('/admin/products');
}

export async function deleteProduct(id) {
  await dbConnect();
  await Product.findByIdAndDelete(id);
  revalidatePath('/admin/products');
  revalidatePath('/catalog');
}

export async function markAsSold(id) {
  await dbConnect();
  await Product.findByIdAndUpdate(id, { isAvailable: false });
  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  revalidatePath(`/product/${id}`);
}
