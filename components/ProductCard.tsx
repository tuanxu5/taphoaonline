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
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2">
              <span className="bg-[#d70018] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Name */}
          <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#d70018]">
                {formatPrice(product.price)}₫
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}₫
                </span>
              )}
            </div>
          </div>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400">| Đã bán {product.reviews}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
