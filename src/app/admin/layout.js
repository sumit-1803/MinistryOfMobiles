import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-blue-600">Ministry Admin</h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
            <Package className="mr-3 h-5 w-5" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
            <ShoppingCart className="mr-3 h-5 w-5" />
            Orders
          </Link>
          <form action={logoutAction} className="mt-8 border-t pt-4">
            <button type="submit" className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </form>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
           <h1 className="text-lg font-bold text-blue-600">Ministry Admin</h1>
           {/* Mobile menu toggle could go here */}
        </div>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
