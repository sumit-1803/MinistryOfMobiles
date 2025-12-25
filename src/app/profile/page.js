import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import { LogOut, User, Package, Heart } from 'lucide-react';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';
import Order from '@/models/Order';
import ProductCard from '@/components/ProductCard';
import SignOutButton from '@/components/SignOutButton';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  await dbConnect();
  const customer = await Customer.findOne({ email: user.email }).populate('wishlist').lean();
  const orders = await Order.find({ email: user.email }).populate('productId').sort({ createdAt: -1 }).lean();
  
  const sanitizeProduct = (product) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  });

  // Filter out any null products (if product was deleted) and sanitize
  const wishlistItems = (customer?.wishlist?.filter(item => item !== null) || []).map(sanitizeProduct);
  // Create a list of IDs for the ProductCard check (all true since this is the wishlist page)
  const wishlistIds = wishlistItems.map(item => item._id);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="bg-blue-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="relative flex items-end -mt-12 mb-4">
              <div className="bg-white p-1 rounded-full">
                <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <User className="h-12 w-12" />
                </div>
              </div>
              <div className="ml-4 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name || 'Valued Customer'}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <SignOutButton 
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* My Orders */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-1 h-fit">
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">My Orders / Inquiries</h2>
            </div>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id.toString()} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{order.productId?.title || 'Product Unavailable'}</p>
                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        order.status === 'new' ? 'bg-green-100 text-green-800' : 
                        order.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    {order.message && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        &quot;{order.message}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-sm">
                  You haven&apos;t placed any orders yet.
                </p>
                <div className="mt-4">
                  <a href="/catalog" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Start shopping &rarr;
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Saved Items */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Saved Items</h2>
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium">
                {wishlistItems.length}
              </span>
            </div>
            
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {wishlistItems.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    isWishlisted={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No saved items</h3>
                <p className="mt-1 text-sm text-gray-500">Start saving items you love.</p>
                <div className="mt-6">
                  <a href="/catalog" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Browse Catalog
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
