import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Catalog({ searchParams }) {
  await dbConnect();

  const { category, minPrice, maxPrice, search } = await searchParams;

  const query = { isAvailable: true };

  if (category) {
    query.category = category;
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } },
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  const categories = ['phone', 'ipad', 'macbook', 'tablet', 'accessories'];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Catalog</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <form className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Search</h3>
                <div className="mt-2">
                  <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search products..."
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border placeholder-gray-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="all-categories"
                      name="category"
                      type="radio"
                      value=""
                      defaultChecked={!category}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="all-categories" className="ml-3 text-sm text-gray-600">
                      All Categories
                    </label>
                  </div>
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center">
                      <input
                        id={`category-${cat}`}
                        name="category"
                        type="radio"
                        value={cat}
                        defaultChecked={category === cat}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${cat}`} className="ml-3 text-sm text-gray-600 capitalize">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    defaultValue={minPrice}
                    placeholder="Min"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border placeholder-gray-500 text-gray-900"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    defaultValue={maxPrice}
                    placeholder="Max"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border placeholder-gray-500 text-gray-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>
              <Link href="/catalog" className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-2">
                Clear Filters
              </Link>
            </form>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
