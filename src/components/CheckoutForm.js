'use client';

import { createOrder } from '@/app/actions/order';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {pending ? 'Sending...' : 'Send Inquiry'}
    </button>
  );
}

export default function CheckoutForm({ product }) {
  const [result, setResult] = useState(null);
  const { addToCart } = useCart();

  async function clientAction(formData) {
    const res = await createOrder(null, formData);
    setResult(res);
    if (res?.success) {
      addToCart(product);
    }
  }

  if (result?.success) {
    return (
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Inquiry Sent!</h2>
        <p className="text-gray-600 mb-6">{result.message}</p>
        <p className="text-sm text-blue-600 mb-6">This item has also been added to your cart.</p>
        <div className="flex flex-col gap-3">
            <a href="/cart" className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 text-white hover:bg-blue-700 font-medium">
            Go to Cart
            </a>
            <a href="/catalog" className="text-blue-600 hover:text-blue-500 font-medium">
            Return to Catalog
            </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form action={clientAction} className="space-y-6">
        <input type="hidden" name="productId" value={product._id} />
        
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="customerName"
              name="customerName"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              placeholder="enter 10 digits"
              title="Please enter a valid 10-digit phone number"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message (Optional)
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows={3}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {result?.success === false && (
           <div className="text-red-600 text-sm">{result.message}</div>
        )}

        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
