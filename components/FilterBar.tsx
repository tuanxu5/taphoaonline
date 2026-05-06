'use client';

import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  priceRange: string;
  setPriceRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function FilterBar({ priceRange, setPriceRange, sortBy, setSortBy }: FilterBarProps) {
  return (
    <div className="flex-1 bg-white rounded-lg p-3 flex flex-wrap gap-3 items-center border border-gray-200">
      {/* Price Filter */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Giá:</span>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#d70018] focus:border-transparent bg-white"
        >
          <option value="all">Tất cả</option>
          <option value="under10">Dưới 10 triệu</option>
          <option value="10to20">10 - 20 triệu</option>
          <option value="20to30">20 - 30 triệu</option>
          <option value="over30">Trên 30 triệu</option>
        </select>
      </div>

      <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Sắp xếp:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#d70018] focus:border-transparent bg-white"
        >
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
          <option value="name">Tên A-Z</option>
          <option value="rating">Đánh giá cao</option>
        </select>
      </div>

      {/* Clear Filters */}
      {(priceRange !== 'all' || sortBy !== 'default') && (
        <button
          onClick={() => {
            setPriceRange('all');
            setSortBy('default');
          }}
          className="ml-auto text-sm text-[#d70018] hover:text-[#c00016] font-medium"
        >
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
}
