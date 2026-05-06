'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Banner from '@/components/Banner';
import CategoryFilter from '@/components/CategoryFilter';
import Features from '@/components/Features';
import HotDeals from '@/components/HotDeals';
import FilterBar from '@/components/FilterBar';
import { products, categories } from '@/lib/products';
import { LayoutGrid, List } from 'lucide-react';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const flashsaleParam = searchParams.get('flashsale');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (!flashsaleParam) {
      setSelectedCategory('all');
    }
  }, [categoryParam, flashsaleParam]);

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      router.push('/');
    } else {
      router.push(`/?category=${categoryId}`);
    }
  };

  // Filter products based on flashsale or category
  let filteredProducts = flashsaleParam === 'true'
    ? products.filter(p => p.isHot)
    : selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

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

  // Get page title
  const getPageTitle = () => {
    if (flashsaleParam === 'true') return 'Flash Sale';
    if (selectedCategory === 'all') return 'Tất cả sản phẩm';
    return categories.find(c => c.id === selectedCategory)?.name || 'Sản phẩm';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!flashsaleParam && <Banner />}
      {!flashsaleParam && <HotDeals />}

      <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-3">
        {/* Category Filter - only show if not flashsale */}
        {!flashsaleParam && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

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
          <div className="flex items-center justify-between mb-3 bg-white rounded-lg border border-gray-200 p-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {getPageTitle()}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d70018] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
