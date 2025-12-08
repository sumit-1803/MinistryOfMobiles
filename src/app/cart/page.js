'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900">No active inquiries</h2>
          <p className="mt-4 text-lg text-gray-500">You haven&apos;t inquired about any products yet.</p>
          <div className="mt-6">
            <Link href="/catalog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900">Your Inquiries</h1>
          <p className="mt-2 text-lg text-gray-600">
            You have successfully inquired about the following products.
          </p>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <div className="flex items-center justify-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Our team will contact you shortly regarding these items.</span>
            </div>
          </div>
        </motion.div>

        <ul className="space-y-4">
          <AnimatePresence>
            {cart.map((product, index) => (
              <motion.li
                key={product._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-4 sm:p-6 flex items-center">
                  <div className="flex-shrink-0 relative">
                    <Image
                      src={product.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-md object-center object-cover sm:w-24 sm:h-24"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Booked
                    </div>
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link href={`/product/${product._id}`} className="hover:text-blue-600 transition-colors">
                            {product.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.brand} {product.model}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>Inquiry received</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove from list"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link href="/catalog" className="text-blue-600 font-medium hover:text-blue-500 flex items-center justify-center">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Continue Browsing
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
