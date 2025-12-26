import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // Corrected import
import InventoryItem from '@/models/InventoryItem';
import Product from '@/models/Product';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Populate product details
    const inventory = await InventoryItem.find({})
      .populate('product', 'title brand model')
      .sort({ createdAt: -1 });

    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
