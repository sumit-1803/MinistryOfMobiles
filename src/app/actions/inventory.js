'use server';

import dbConnect from '@/lib/db';
import InventoryItem from '@/models/InventoryItem';
import Product from '@/models/Product';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

async function checkAdmin() {
  const session = await getSession();
  if (session?.user?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}

export async function updateInventoryItem(id, data) {
  await checkAdmin();
  await dbConnect();

  try {
    const item = await InventoryItem.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error('Item not found');
    revalidatePath('/admin/inventory');
    return { success: true, item: item.toObject() };
  } catch (error) {
    console.error('Update Inventory Error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteInventoryItem(id) {
  await checkAdmin();
  await dbConnect();

  try {
    const item = await InventoryItem.findByIdAndDelete(id);
    if (!item) throw new Error('Item not found');
    revalidatePath('/admin/inventory');
    return { success: true };
  } catch (error) {
    console.error('Delete Inventory Error:', error);
    return { success: false, error: error.message };
  }
}

export async function markAsSold(id) {
  await checkAdmin();
  await dbConnect();

  try {
    const item = await InventoryItem.findById(id);
    if (!item) throw new Error('Item not found');
    
    item.status = item.status === 'Sold' ? 'Available' : 'Sold';
    await item.save();
    
    revalidatePath('/admin/inventory');
    return { success: true, status: item.status };
  } catch (error) {
    console.error('Mark Sold Error:', error);
    return { success: false, error: error.message };
  }
}

export async function pushToProduct(id) {
  await checkAdmin();
  await dbConnect();

  try {
    const item = await InventoryItem.findById(id);
    if (!item) throw new Error('Item not found');

    // Create a new Product based on Inventory Item
    const productData = {
      title: item.productName || 'Untitled Product',
      brand: item.brand || 'Generic',
      model: item.productName || 'Generic Model', // Added model field
      category: item.category || 'accessories',
      price: item.expectedSellingPrice || item.purchasePrice || 0,
      description: `
        Storage: ${item.storage || 'N/A'}
        RAM: ${item.ram || 'N/A'}
        Color: ${item.color || 'N/A'}
        Condition: ${item.condition || 'Good'}
        Warranty: ${item.warrantyType || 'No Warranty'}
      `.trim(),
      isActive: true,
      images: [], // Placeholder, user can add images later
    };

    const newProduct = await Product.create(productData);
    
    // Optionally link the inventory item to this new product if it wasn't linked
    if (!item.product) {
        item.product = newProduct._id;
        await item.save();
    }

    revalidatePath('/admin/products');
    revalidatePath('/catalog');
    return { success: true, productId: newProduct._id.toString() };
  } catch (error) {
    console.error('Push to Product Error:', error);
    return { success: false, error: error.message };
  }
}
