import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Ministry of Mobiles" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Center: Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/catalog?category=phone" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Mobiles
            </Link>
            <Link href="/catalog?category=macbook" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Mac
            </Link>
            <Link href="/catalog?category=audio" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              AirPods
            </Link>
            <Link href="/catalog?category=watch" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Watches
            </Link>
            <Link href="/catalog?category=accessories" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Accessories
            </Link>
          </div>

          {/* Right: Search & Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            <Link href="/cart" className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none">
              <span className="sr-only">View cart</span>
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
