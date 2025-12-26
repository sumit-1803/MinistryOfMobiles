import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    // Allow if admin, or maybe public if needed? For now restrict to admin as it's for invoice creation.
    if (session?.user?.role !== 'admin') {
       // Check if it's a public request? 
       // The user request didn't specify if this API should be public. 
       // But usually catalog is public. 
       // However, for invoice creation, we definitely need it.
       // Let's allow public for now as the main site probably needs it too or uses server components.
       // Actually, let's keep it safe. If I'm logged in as admin, it works.
       // If I'm not, 401.
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const products = await Product.find({ isActive: true }).sort({ title: 1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
