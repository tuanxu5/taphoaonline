'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Banner from '@/components/Banner';
import CategoryFilter from '@/components/CategoryFilter';
import Features from '@/components/Features';
import HotDeals from '@/components/HotDeals';
import FilterBar from '@/components/FilterBar';
import { products, categories } from '@/lib/products';
import { LayoutGrid, List } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  let filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.brand.toLowerCase() === selectedCategory.toLowerCase());

  // Filter by price
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter(p => {
      if (priceRange === 'under10') return p.price < 10000000;
      if (priceRange === '10to20') return p.price >= 10000000 && p.price < 20000000;
      if (priceRange === '20to30') return p.price >= 20000000 && p.price < 30000000;
      if (priceRange === 'over30') return p.price >= 30000000;
      return true;
    });
  }

  // Sort products
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <HotDeals />

      <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-5">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4">
          <FilterBar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          {/* View Mode Toggle - Desktop only */}
          <div className="hidden lg:flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#d70018] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#d70018] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' 
                  ? 'Tất cả sản phẩm' 
                  : `Điện thoại ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} sản phẩm
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
              : 'flex flex-col gap-4'}
          `}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-600">
                Thử thay đổi bộ lọc hoặc tìm kiếm khác
              </p>
            </div>
          )}
        </div>
      </div>

      <Features />
    </div>
  );
}
