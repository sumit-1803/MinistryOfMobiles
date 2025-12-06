'use client';

import ProductForm from '@/components/ProductForm';
import { createProduct } from '@/app/actions/product';
import { useActionState } from 'react';

export default function NewProduct() {
  const [state, formAction] = useActionState(createProduct, null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Product</h1>
      {state?.message && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{state.message}</span>
        </div>
      )}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <ProductForm action={formAction} />
      </div>
    </div>
  );
}
