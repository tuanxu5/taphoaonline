'use client';

import { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Features from '@/components/Features';
import FilterBar from '@/components/FilterBar';
import { products, categories } from '@/lib/products';
import { LayoutGrid, List, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const runtime = 'edge';

// Mapping slug to category ID
const slugToCategory: Record<string, string> = {
  'dien-thoai': 'phone',
  'laptop': 'laptop',
  'my-pham': 'cosmetics',
  'giay-dep': 'shoes',
  'quan-ao': 'fashion',
  'phu-kien': 'accessories',
};

function CategoryContent() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryId = slugToCategory[slug];
  
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get category info
  const category = categories.find(c => c.id === categoryId);
  
  // Filter products by category
  let filteredProducts = products.filter(p => p.category === categoryId);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy danh mục</h1>
          <Link href="/" className="text-[#d70018] hover:underline">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#d70018]">
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-3">
        {/* Back button - Mobile */}
        <Link 
          href="/"
          className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-[#d70018] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Quay lại</span>
        </Link>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4">
          <FilterBar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          {/* View Mode Toggle - Desktop only */}
          <div className="hidden lg:flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#d70018] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#d70018] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3 bg-white rounded-lg border border-gray-200 p-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {category.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} sản phẩm
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3' 
              : 'flex flex-col gap-3'}
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

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d70018] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}
