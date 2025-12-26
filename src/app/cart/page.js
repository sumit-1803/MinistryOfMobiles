'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getUserOrders, debugSessionAction } from '@/app/actions/order';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [debugSession, setDebugSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const userOrders = await getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchOrders() {
      try {
        const userOrders = await getUserOrders();
        setOrders(userOrders);
        const session = await debugSessionAction();
        setDebugSession(session);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getOrderStatus = (productId) => {
    const order = orders.find(o => o.productId && o.productId._id === productId);
    if (!order) return null;
    return {
      status: order.status,
      label: order.status === 'new' ? 'Inquiry Sent' : 
             order.status === 'contacted' ? 'Contacted' : 
             order.status === 'closed' ? 'Closed' : 'Unknown',
      color: order.status === 'new' ? 'text-blue-600' : 
             order.status === 'contacted' ? 'text-yellow-600' : 
             order.status === 'closed' ? 'text-gray-600' : 'text-gray-500',
      bg: order.status === 'new' ? 'bg-blue-50' : 
          order.status === 'contacted' ? 'bg-yellow-50' : 
          order.status === 'closed' ? 'bg-gray-50' : 'bg-gray-50'
    };
  };

  // Combine cart items and ordered items for display
  const displayItems = [...cart];
  
  orders.forEach(order => {
    if (order.productId && !displayItems.find(item => item._id === order.productId._id)) {
      displayItems.push({
        ...order.productId,
        // Add a flag or property if needed, but the getOrderStatus check uses ID which matches
      });
    }
  });

  if (displayItems.length === 0) {
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

  const cartItems = displayItems.filter(item => !getOrderStatus(item._id));
  const historyItems = displayItems.filter(item => getOrderStatus(item._id));

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
            Track the status of your product inquiries here.
          </p>
        </motion.div>

        {/* History Section */}
        {historyItems.length > 0 ? (
          <div>
            <ul className="space-y-4">
              <AnimatePresence>
                {historyItems.map((product, index) => {
                  const statusInfo = getOrderStatus(product._id);
                  return (
                    <motion.li
                      key={product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow ${statusInfo?.status !== 'new' ? 'opacity-75' : ''}`}
                    >
                      <div className="p-4 sm:p-6 flex items-center">
                        <div className="flex-shrink-0 relative">
                          <Image
                            src={product.images?.[0] || 'https://via.placeholder.com/150'}
                            alt={product.title}
                            width={100}
                            height={100}
                            className={`w-20 h-20 rounded-md object-center object-cover sm:w-24 sm:h-24 ${statusInfo?.status !== 'new' ? 'grayscale' : ''}`}
                          />
                          {statusInfo && (
                            <div className={`absolute -top-2 -right-2 ${statusInfo.bg} ${statusInfo.color} text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center border border-current`}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {statusInfo.label}
                            </div>
                          )}
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
                              
                              <div className="mt-2 flex items-center text-sm">
                                {statusInfo && (
                                  <div className={`flex items-center ${statusInfo.color}`}>
                                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                    <p className="font-medium">Status: {statusInfo.label}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        ) : (
          <div className="text-center py-12">
             <p className="text-gray-500 text-lg">You haven't made any inquiries yet.</p>
             <Link href="/catalog" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
               Browse Products
             </Link>
          </div>
        )}

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
