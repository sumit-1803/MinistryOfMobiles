import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import { LogOut, User, Package, Heart } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* My Orders */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">My Orders</h2>
            </div>
            <p className="text-gray-500 text-sm">
              You haven't placed any orders yet.
            </p>
            <div className="mt-4">
              <a href="/catalog" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Start shopping &rarr;
              </a>
            </div>
          </div>

          {/* Wishlist / Saved Items (Placeholder) */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Saved Items</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Your wishlist is empty.
            </p>
            <div className="mt-4">
              <a href="/catalog" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Browse products &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
