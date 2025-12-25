'use client';

import { updateOrderStatus, deleteOrder } from '@/app/actions/order';
import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';

export default function OrderRow({ order }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (status) => {
    setIsLoading(true);
    try {
      await updateOrderStatus(order._id, status);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    setIsLoading(true);
    try {
      await deleteOrder(order._id);
    } catch (error) {
      console.error('Failed to delete order:', error);
      setIsLoading(false);
    }
  };

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
        {new Date(order.createdAt).toLocaleDateString()}
        {!order.viewed && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            NEW
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="font-medium text-gray-900">{order.customerName}</div>
        <div className="text-gray-500">{order.phone}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.productId ? order.productId.title : 'Deleted Product'}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
        {order.message}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          order.status === 'new' ? 'bg-green-100 text-green-800' : 
          order.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {order.status}
        </span>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2 flex justify-end items-center">
        {isLoading ? (
          <div className="inline-flex items-center text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
            Updating...
          </div>
        ) : (
          <>
            {order.status === 'new' && (
              <button 
                onClick={() => handleStatusUpdate('contacted')} 
                className="text-blue-600 hover:text-blue-900"
              >
                Mark Contacted
              </button>
            )}
            {order.status !== 'closed' && (
              <button 
                onClick={() => handleStatusUpdate('closed')} 
                className="text-gray-600 hover:text-gray-900 ml-2"
              >
                Close
              </button>
            )}
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-900 ml-4 p-1 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Order"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
