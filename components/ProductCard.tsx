'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const discountAmount = product.originalPrice 
    ? product.originalPrice - product.price 
    : 0;

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#d70018] hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount && (
              <span className="bg-[#d70018] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
                -{product.discount}%
              </span>
            )}
            {product.isHot && (
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
                HOT
              </span>
            )}
          </div>

          {/* Quick View on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10 group-hover:text-[#d70018] transition-colors">
            {product.name}
          </h3>

          {/* Specs Highlight */}
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{product.specs.ram}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded">{product.specs.storage}</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-bold text-[#d70018]">
                {formatPrice(product.price)}₫
              </span>
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}₫
                </span>
                <span className="text-green-600 font-medium">
                  Tiết kiệm {formatPrice(discountAmount)}₫
                </span>
              </div>
            )}
          </div>

          {/* Promo */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-3 py-2 mb-3">
            <p className="text-xs text-gray-700 font-medium line-clamp-1">
              🎁 Giảm thêm 500K khi thu cũ
            </p>
          </div>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews})</span>
            </div>
            {product.inStock && (
              <span className="text-xs font-medium text-green-600">Còn hàng</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
