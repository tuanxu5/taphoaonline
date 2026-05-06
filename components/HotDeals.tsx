'use client';

import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

export default function HotDeals() {
  const hotProducts = products.filter(p => p.isHot).slice(0, 6);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <section className="bg-white py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">⚡ FLASH SALE ONLINE</h2>
          <span className="text-sm text-gray-500">Kết thúc trong 23:59:45</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {hotProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex-shrink-0 w-[180px] bg-white border border-gray-200 rounded-lg p-3 hover:border-[#d70018] hover:shadow-md transition-all"
            >
              <div className="relative aspect-square mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
                {product.discount && (
                  <div className="absolute top-0 right-0 bg-[#d70018] text-white text-xs font-bold px-2 py-0.5 rounded-bl">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2 h-10">
                {product.name}
              </h3>
              <div className="space-y-1">
                <p className="text-[#d70018] font-bold text-base">
                  {formatPrice(product.price)}₫
                </p>
                {product.originalPrice && (
                  <p className="text-gray-400 text-xs line-through">
                    {formatPrice(product.originalPrice)}₫
                  </p>
                )}
              </div>
              <div className="mt-2 bg-gray-50 rounded p-1.5">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Đã bán 234</span>
                </div>
                <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
                  <div className="bg-[#d70018] h-full w-3/4"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
