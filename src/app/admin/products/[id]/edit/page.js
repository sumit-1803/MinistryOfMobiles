import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductForm from '@/components/ProductForm';
import { updateProduct } from '@/app/actions/product';
import { notFound } from 'next/navigation';

export default async function EditProduct({ params }) {
  await dbConnect();
  const { id } = await params;
  const product = await Product.findById(id);

  if (!product) {
    notFound();
  }

  // Convert mongoose doc to plain object for initialData
  const initialData = {
    title: product.title,
    category: product.category,
    brand: product.brand,
    model: product.model,
    price: product.price,
    condition: product.condition,
    description: product.description,
    images: product.images,
    isAvailable: product.isAvailable,
  };

  const updateAction = updateProduct.bind(null, product._id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Product</h1>
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <ProductForm action={updateAction} initialData={initialData} />
      </div>
    </div>
  );
}
