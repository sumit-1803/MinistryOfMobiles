'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton({ isEditing }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {pending ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
    </button>
  );
}

export default function ProductForm({ action, initialData }) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-8 divide-y divide-gray-200">
      {state?.message && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{state.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={initialData?.title}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  defaultValue={initialData?.category || 'phone'}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                >
                  <option value="phone">Phone</option>
                  <option value="ipad">iPad</option>
                  <option value="macbook">MacBook</option>
                  <option value="tablet">Tablet</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  defaultValue={initialData?.brand}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="model"
                  id="model"
                  defaultValue={initialData?.model}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={initialData?.price}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <div className="mt-1">
                <select
                  id="condition"
                  name="condition"
                  defaultValue={initialData?.condition || 'excellent'}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                >
                  <option value="like new">Like New</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={initialData?.description}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 placeholder-gray-500 text-gray-900"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Image URLs (comma separated)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="images"
                  id="images"
                  defaultValue={initialData?.images?.join(', ')}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border placeholder-gray-500 text-gray-900"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>
            </div>

            <div className="relative flex items-start sm:col-span-6">
              <div className="flex items-center h-5">
                <input
                  id="isAvailable"
                  name="isAvailable"
                  type="checkbox"
                  defaultChecked={initialData ? initialData.isAvailable : true}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isAvailable" className="font-medium text-gray-700">
                  Available for sale
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <SubmitButton isEditing={!!initialData} />
        </div>
      </div>
    </form>
  );
}
