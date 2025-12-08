import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default async function sitemap() {
  await dbConnect();
  const products = await Product.find({ isAvailable: true }).lean();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ministryofmobiles.vercel.app';

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: product.updatedAt || product.createdAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
