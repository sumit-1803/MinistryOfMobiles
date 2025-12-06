import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

export const dynamic = 'force-dynamic';

export default async function ProductDetail({ params }) {
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
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}
            </div>
            {/* Additional images grid could go here */}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">₹{product.price.toLocaleString()}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }} />
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Brand</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.brand}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Model</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.model}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Condition</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{product.condition}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Availability</dt>
                  <dd className={`mt-1 text-sm font-medium ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {product.isAvailable ? 'In Stock' : 'Sold Out'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 flex sm:flex-col1">
              {product.isAvailable ? (
                <Link
                  href={`/checkout/${product._id}`}
                  className="max-w-xs flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 sm:w-full"
                >
                  Buy / Inquire Now
                </Link>
              ) : (
                <button
                  disabled
                  className="max-w-xs flex-1 bg-gray-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed sm:w-full"
                >
                  Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
