'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleWishlist } from '@/app/actions/wishlist';

export default function WishlistButton({ productId, initialIsWishlisted }) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [loading, setLoading] = useState(false);

  async function handleToggle(e) {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    
    setLoading(true);
    // Optimistic update
    setIsWishlisted(!isWishlisted);

    try {
      const result = await toggleWishlist(productId);
      if (!result.success) {
        // Revert if failed (e.g. not logged in)
        setIsWishlisted(isWishlisted);
        alert(result.message); // Simple alert for now, could be a toast
      } else {
        setIsWishlisted(result.isAdded);
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
      setIsWishlisted(isWishlisted);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full transition-all duration-300 focus:outline-none transform active:scale-75 ${
        isWishlisted
          ? 'bg-red-50 text-red-500 hover:bg-red-100 scale-110'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 hover:scale-110'
      }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={`h-5 w-5 transition-colors duration-300 ${
          isWishlisted ? 'fill-current animate-heart-beat' : ''
        }`} 
      />
    </button>
  );
}
