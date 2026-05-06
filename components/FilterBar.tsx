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
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-2 flex flex-wrap gap-2 items-center text-sm">
      {/* Price Filter */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Giá:</span>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#d70018] bg-white text-sm"
        >
          <option value="all">Tất cả</option>
          <option value="under10">Dưới 10 triệu</option>
          <option value="10to20">10 - 20 triệu</option>
          <option value="20to30">20 - 30 triệu</option>
          <option value="over30">Trên 30 triệu</option>
        </select>
      </div>

      <div className="h-4 w-px bg-gray-300 hidden md:block"></div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sắp xếp:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#d70018] bg-white text-sm"
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
          className="ml-auto text-[#d70018] hover:underline"
        >
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
}
