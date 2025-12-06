import dbConnect from '@/lib/db';
import AdminUser from '@/models/AdminUser';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const existingAdmin = await AdminUser.findOne({ username: 'admin' });
  if (!existingAdmin) {
    await AdminUser.create({
      username: 'admin',
      password: 'password123', // In a real app, hash this!
    });
  }

  // Dummy Products
  const products = [
    // Phones
    { title: 'iPhone 14 Pro', category: 'phone', brand: 'Apple', model: '256GB Deep Purple', price: 85000, condition: 'like new', description: 'Latest model, barely used.', images: ['https://images.unsplash.com/photo-1663499482523-1c0c1674025d?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Samsung Galaxy S22 Ultra', category: 'phone', brand: 'Samsung', model: '512GB Burgundy', price: 60000, condition: 'good', description: 'Powerful camera, minor wear.', images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Google Pixel 6 Pro', category: 'phone', brand: 'Google', model: '128GB Stormy Black', price: 30000, condition: 'excellent', description: 'Great value flagship.', images: ['https://images.unsplash.com/photo-1635870723802-e88d76ae324e?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'OnePlus 11', category: 'phone', brand: 'OnePlus', model: '16GB/256GB Green', price: 45000, condition: 'like new', description: 'Super fast charging.', images: ['https://images.unsplash.com/photo-1675763539989-14444585c575?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    
    // MacBooks
    { title: 'MacBook Pro 14 M1 Pro', category: 'macbook', brand: 'Apple', model: '16GB/512GB Space Grey', price: 120000, condition: 'excellent', description: 'Workhorse for creatives.', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'MacBook Air M2', category: 'macbook', brand: 'Apple', model: '8GB/256GB Midnight', price: 90000, condition: 'like new', description: 'Sleek and powerful.', images: ['https://images.unsplash.com/photo-1659247605929-3788734324f0?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'MacBook Pro 16 Intel', category: 'macbook', brand: 'Apple', model: 'i9/32GB/1TB', price: 80000, condition: 'good', description: 'Still a beast for x86 work.', images: ['https://images.unsplash.com/photo-1531297461136-82af022f0b79?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    
    // iPads
    { title: 'iPad Pro 12.9 M1', category: 'ipad', brand: 'Apple', model: '256GB WiFi Silver', price: 75000, condition: 'excellent', description: 'Mini-LED display is stunning.', images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'iPad Mini 6', category: 'ipad', brand: 'Apple', model: '64GB Purple', price: 35000, condition: 'like new', description: 'Perfect portable tablet.', images: ['https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=800'], isAvailable: true },

    // Watches
    { title: 'Apple Watch Ultra', category: 'watch', brand: 'Apple', model: 'Titanium Green Alpine Loop', price: 60000, condition: 'excellent', description: 'Rugged and ready for adventure.', images: ['https://images.unsplash.com/photo-1664478546384-d57ffe74a791?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Apple Watch Series 8', category: 'watch', brand: 'Apple', model: '45mm Midnight', price: 30000, condition: 'like new', description: 'Always-on display.', images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Samsung Galaxy Watch 5 Pro', category: 'watch', brand: 'Samsung', model: 'Black Titanium', price: 25000, condition: 'good', description: 'Great battery life.', images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Garmin Fenix 7', category: 'watch', brand: 'Garmin', model: 'Solar Sapphire', price: 55000, condition: 'excellent', description: 'Ultimate multisport watch.', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'], isAvailable: true },

    // Audio
    { title: 'AirPods Pro 2', category: 'audio', brand: 'Apple', model: 'USB-C Case', price: 18000, condition: 'like new', description: 'Best in class ANC.', images: ['https://images.unsplash.com/photo-1603351154351-5cfb3d04ef32?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'AirPods Max', category: 'audio', brand: 'Apple', model: 'Space Grey', price: 40000, condition: 'excellent', description: 'Immersive sound.', images: ['https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Sony WF-1000XM4', category: 'audio', brand: 'Sony', model: 'Black', price: 12000, condition: 'good', description: 'Great sound quality.', images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Bose QC45', category: 'audio', brand: 'Bose', model: 'Triple Black', price: 18000, condition: 'excellent', description: 'Comfortable for long flights.', images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'], isAvailable: true },

    // Accessories
    { title: 'Magic Keyboard', category: 'accessories', brand: 'Apple', model: 'with Touch ID', price: 10000, condition: 'like new', description: 'Great typing experience.', images: ['https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Apple Pencil 2', category: 'accessories', brand: 'Apple', model: '2nd Gen', price: 8000, condition: 'excellent', description: 'Must have for iPad.', images: ['https://images.unsplash.com/photo-1560769634-4fa6f6a7b743?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
    { title: 'Anker 737 Power Bank', category: 'accessories', brand: 'Anker', model: '24K 140W', price: 9000, condition: 'like new', description: 'Charge your laptop on the go.', images: ['https://images.unsplash.com/photo-1609592424335-c3359875f28a?auto=format&fit=crop&q=80&w=800'], isAvailable: true },
  ];

  // Always insert these products to ensure we have data
  await Product.insertMany(products);
  
  return NextResponse.json({ message: `Seeded ${products.length} new products successfully.` });
}
