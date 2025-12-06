import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product, isWishlisted = false }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96 relative h-64 w-full">
        {/* Placeholder image if no images */}
        {product.images && product.images.length > 0 ? (
           <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
        {!product.isAvailable && (
             <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase">
                Sold Out
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
          <p className="text-sm italic text-gray-500">{product.condition}</p>
          <p className="text-base font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Wishlist Button - Placed here to ensure it sits on top of the Link overlay */}
      <div className="absolute top-2 right-2 z-30">
        <WishlistButton productId={product._id.toString()} initialIsWishlisted={isWishlisted} />
      </div>
    </div>
  );
}
