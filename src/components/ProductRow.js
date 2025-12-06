import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductRow({ title, products, viewAllLink, wishlist = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        <Link 
          href={viewAllLink} 
          className="hidden sm:flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="relative">
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 scrollbar-hide snap-x snap-mandatory">
          {products.map((product) => (
            <div key={product._id} className="min-w-[280px] sm:min-w-[300px] snap-start">
              <ProductCard 
                product={product} 
                isWishlisted={wishlist.includes(product._id.toString())}
              />
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-4 sm:hidden">
          <Link 
            href={viewAllLink} 
            className="block w-full text-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-600 bg-white hover:bg-gray-50"
          >
            View all {title}
          </Link>
        </div>
      </div>
    </div>
  );
}
