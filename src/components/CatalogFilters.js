'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Search, Filter, ChevronDown } from 'lucide-react';

export default function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'phone', label: 'Mobiles' },
    { id: 'ipad', label: 'iPads' },
    { id: 'macbook', label: 'MacBooks' },
    { id: 'watch', label: 'Watches' },
    { id: 'audio', label: 'Audio' },
    { id: 'accessories', label: 'Accessories' },
  ];

  // Update state when URL params change
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSort(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  const applyFilters = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);
    
    router.push(`/catalog?${params.toString()}`);
    setIsExpanded(false);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    router.push('/catalog');
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sticky top-24">
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xl font-bold text-gray-900 w-full lg:w-auto lg:cursor-default focus:outline-none"
        >
          <Filter className="w-5 h-5" />
          Filters
          <ChevronDown className={`w-5 h-5 ml-auto lg:hidden transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        <button 
          onClick={clearFilters}
          className={`ml-4 text-xs font-medium text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors ${isExpanded ? 'block' : 'hidden lg:block'}`}
        >
          Clear all
        </button>
      </div>

      <form onSubmit={applyFilters} className={`space-y-8 ${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Sort By */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Sort By</h3>
          <div className="space-y-3">
            {[
              { id: 'newest', label: 'Newest Arrivals' },
              { id: 'price_asc', label: 'Price: Low to High' },
              { id: 'price_desc', label: 'Price: High to Low' },
            ].map((option) => (
              <label key={option.id} className="flex items-center group cursor-pointer">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${sort === option.id ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                  {sort === option.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                </div>
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  checked={sort === option.id}
                  onChange={() => setSort(option.id)}
                  className="hidden"
                />
                <span className={`ml-3 text-sm transition-colors ${sort === option.id ? 'text-blue-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="text-sm font-bold text-gray-900">Price Range</h3>
            <p className="text-xs text-gray-500">The average price is ₹25,000</p>
          </div>
          
          <div className="space-y-6">
            {/* Histogram & Slider Container */}
            <div className="relative pt-6 pb-2">
              <style jsx>{`
                .range-slider {
                  -webkit-appearance: none;
                  appearance: none;
                  pointer-events: none;
                  background: transparent;
                }
                .range-slider::-webkit-slider-thumb {
                  pointer-events: auto;
                  -webkit-appearance: none;
                  appearance: none;
                  height: 24px;
                  width: 24px;
                  border-radius: 50%;
                  background: white;
                  border: 1px solid #e5e7eb;
                  cursor: pointer;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  margin-top: -10px;
                  position: relative;
                  z-index: 50;
                }
                .range-slider::-moz-range-thumb {
                  pointer-events: auto;
                  height: 24px;
                  width: 24px;
                  border: 1px solid #e5e7eb;
                  border-radius: 50%;
                  background: white;
                  cursor: pointer;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  z-index: 50;
                }
                .range-slider::-webkit-slider-runnable-track {
                  width: 100%;
                  height: 4px;
                  cursor: pointer;
                  background: transparent;
                }
              `}</style>
              
              {/* Histogram */}
              <div className="flex items-end justify-between h-12 gap-[2px] mb-2 px-1">
                {[20, 45, 30, 60, 75, 50, 80, 95, 40, 30, 55, 70, 45, 25, 35, 50, 30, 20, 10, 5].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-gray-200 rounded-t-sm transition-colors"
                    style={{ 
                      height: `${height}%`,
                      backgroundColor: (i / 20 * 100000) >= (minPrice || 0) && (i / 20 * 100000) <= (maxPrice || 100000) ? '#9ca3af' : '#e5e7eb'
                    }}
                  ></div>
                ))}
              </div>

              {/* Slider Track Background */}
              <div className="relative h-1.5 bg-gray-200 rounded-full w-full">
                {/* Active Range Track */}
                <div 
                  className="absolute h-full bg-gray-900 rounded-full"
                  style={{
                    left: `${((minPrice || 0) / 100000) * 100}%`,
                    right: `${100 - ((maxPrice || 100000) / 100000) * 100}%`
                  }}
                ></div>
              </div>

              {/* Range Inputs */}
              <div className="relative w-full h-0">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={minPrice || 0}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), (maxPrice || 100000) - 1000);
                    setMinPrice(val);
                  }}
                  className="range-slider absolute -top-2 left-0 w-full h-1.5 z-30"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={maxPrice || 100000}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), (minPrice || 0) + 1000);
                    setMaxPrice(val);
                  }}
                  className="range-slider absolute -top-2 left-0 w-full h-1.5 z-40"
                />
              </div>
            </div>

            {/* Price Inputs */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 border border-gray-300 rounded-xl px-3 py-2">
                <span className="text-xs text-gray-500 block">Min price</span>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium mr-1">₹</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full outline-none text-gray-900 font-medium bg-transparent"
                  />
                </div>
              </div>
              <div className="relative flex-1 border border-gray-300 rounded-xl px-3 py-2">
                <span className="text-xs text-gray-500 block">Max price</span>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium mr-1">₹</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full outline-none text-gray-900 font-medium bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Category</h3>
          <div className="space-y-3">
            <label className="flex items-center group cursor-pointer">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${!category ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                {!category && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input
                type="radio"
                name="category"
                value=""
                checked={!category}
                onChange={() => setCategory('')}
                className="hidden"
              />
              <span className={`ml-3 text-sm transition-colors ${!category ? 'text-blue-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>All Categories</span>
            </label>
            
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center group cursor-pointer">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${category === cat.id ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                  {category === cat.id && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={category === cat.id}
                  onChange={() => setCategory(cat.id)}
                  className="hidden"
                />
                <span className={`ml-3 text-sm transition-colors ${category === cat.id ? 'text-blue-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-medium shadow-lg shadow-gray-900/20 hover:shadow-gray-900/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}
