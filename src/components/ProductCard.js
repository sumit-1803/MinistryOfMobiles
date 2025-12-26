'use client';

import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from './WishlistButton';
import { motion } from 'framer-motion';

export default function ProductCard({ product, isWishlisted = false }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96 relative h-64 w-full">
        {/* Placeholder image if no images */}
        {product.images && product.images.length > 0 ? (
           <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
        {!product.isActive && (
             <div className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 text-xs font-bold uppercase">
                Inactive
             </div>
        )}
        
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/product/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.brand} {product.model}</p>
        <div className="flex-1 flex flex-col justify-end">

          <p className="text-base font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Wishlist Button - Placed here to ensure it sits on top of the Link overlay */}
      <div className="absolute top-2 right-2 z-30">
        <WishlistButton productId={product._id.toString()} initialIsWishlisted={isWishlisted} />
      </div>
    </motion.div>
  );
}
