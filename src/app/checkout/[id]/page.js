import CheckoutForm from '@/components/CheckoutForm';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';

export default async function Checkout({ params }) {
  await dbConnect();
  const { id } = await params;
  
  let product;
  try {
    product = await Product.findById(id);
  } catch (e) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inquire about this product
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We will contact you shortly to confirm your order.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <CheckoutForm product={JSON.parse(JSON.stringify(product))} />
      </div>
    </div>
  );
}
