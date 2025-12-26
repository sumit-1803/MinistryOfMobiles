import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();
  try {
    const result = await Product.updateOne(
      { title: { $regex: 'Bose', $options: 'i' } },
      { $set: { category: 'audio' } }
    );
    return NextResponse.json({ success: true, message: 'Updated Bose category to audio' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
