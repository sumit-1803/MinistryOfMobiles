'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

export default function AdminLayoutClient({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto print:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Ministry Admin</h1>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          <Link 
            href="/admin/dashboard" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          >
            <Package className="mr-3 h-5 w-5" />
            Products
          </Link>
          <Link 
            href="/admin/orders" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Orders
          </Link>
          <Link 
            href="/admin/inventory" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          >
            <Package className="mr-3 h-5 w-5" />
            Inventory
          </Link>
          <Link 
            href="/admin/invoices" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Invoices
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible print:h-auto print:w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm p-4 flex items-center border-b print:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-blue-600">Ministry Admin</h1>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 print:p-0 print:overflow-visible">
          {children}
        </main>
      </div>
    </div>
  );
}
