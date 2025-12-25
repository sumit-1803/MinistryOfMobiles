export default function Loading() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery skeleton */}
          <div className="flex flex-col-reverse">
            <div className="w-full relative aspect-square bg-gray-200 rounded-lg overflow-hidden animate-pulse"></div>
          </div>

          {/* Product info skeleton */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse mb-8"></div>

            <div className="space-y-4 mb-8">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-12 bg-gray-200 rounded w-full sm:max-w-xs animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
