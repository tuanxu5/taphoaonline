'use client';

import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';

export default function HotDeals() {
  const hotProducts = products.filter(p => p.isHot).slice(0, 10);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const formatTime = (num: number) => String(num).padStart(2, '0');

  if (hotProducts.length === 0) return null;

  return (
    <section className="bg-white border-t border-b border-gray-200 py-4">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#d70018] rounded flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">FLASH SALE</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600 text-xs font-medium">Kết thúc trong</span>
              <div className="flex items-center gap-1">
                <span className="bg-gray-900 text-white font-bold text-xs px-1.5 py-0.5 rounded">
                  {formatTime(timeLeft.hours)}
                </span>
                <span className="text-gray-600 font-bold text-xs">:</span>
                <span className="bg-gray-900 text-white font-bold text-xs px-1.5 py-0.5 rounded">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span className="text-gray-600 font-bold text-xs">:</span>
                <span className="bg-gray-900 text-white font-bold text-xs px-1.5 py-0.5 rounded">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>
          <Link 
            href="/?category=all" 
            className="text-[#d70018] text-sm font-medium hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        {/* Products */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {hotProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex-shrink-0 w-[210px] bg-white rounded-lg p-3 hover:shadow-lg transition-all group border border-gray-200"
            >
              {/* Image */}
              <div className="relative aspect-square mb-2 bg-gray-50 rounded overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="180px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-1 left-1 bg-[#d70018] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                {/* Name */}
                <h3 className="font-medium text-xs text-gray-900 line-clamp-2 mb-2 min-h-[32px]">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="space-y-1">
                  <div className="text-[#d70018] font-bold text-base">
                    {formatPrice(product.price)}₫
                  </div>
                  {product.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs line-through">
                        {formatPrice(product.originalPrice)}₫
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
