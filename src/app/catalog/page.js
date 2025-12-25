import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import CatalogFilters from '@/components/CatalogFilters';

export const dynamic = 'force-dynamic';

export default async function Catalog({ searchParams }) {
  await dbConnect();

  const { category, minPrice, maxPrice, search, sort } = await searchParams;

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

  let sortOptions = { createdAt: -1 }; // Default: Newest
  if (sort === 'price_asc') {
    sortOptions = { price: 1 };
  } else if (sort === 'price_desc') {
    sortOptions = { price: -1 };
  }

  const productsRaw = await Product.find(query).sort(sortOptions).lean();

  const sanitizeProduct = (product) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  });

  const products = productsRaw.map(sanitizeProduct);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filters */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <CatalogFilters />
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
