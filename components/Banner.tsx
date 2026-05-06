'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Smartphone, Laptop, Sparkles, ShoppingBag, Shirt, Watch, Gift, Truck, Shield, RotateCcw } from 'lucide-react';
import { categories } from '@/lib/products';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
    title: 'iPhone 15 Series',
    subtitle: 'Giảm đến 5 triệu',
    link: '/?category=phone'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=400&fit=crop',
    title: 'Laptop Gaming',
    subtitle: 'Trả góp 0%',
    link: '/?category=laptop'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=400&fit=crop',
    title: 'Mỹ Phẩm Chính Hãng',
    subtitle: 'Sale đến 50%',
    link: '/?category=cosmetics'
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  const categoryIcons: Record<string, any> = {
    phone: Smartphone,
    laptop: Laptop,
    cosmetics: Sparkles,
    shoes: ShoppingBag,
    fashion: Shirt,
    accessories: Watch
  };

  return (
    <section className="bg-[#f5f5f5] py-4">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left: Categories */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-3 hidden lg:block">
            <h3 className="font-bold text-gray-900 mb-2 text-sm">Danh mục</h3>
            <div className="space-y-0.5">
              {categories.filter(c => c.id !== 'all').map((category) => {
                const Icon = categoryIcons[category.id] || Smartphone;
                return (
                  <Link
                    key={category.id}
                    href={`/?category=${category.id}`}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#d70018] rounded transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Center: Banner Slider */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 group">
              {/* Slides */}
              <div className="relative aspect-[2/1]">
                {banners.map((banner, index) => (
                  <Link
                    key={banner.id}
                    href={banner.link}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
                      <div className="absolute bottom-6 left-6">
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {banner.title}
                        </h2>
                        <p className="text-lg text-white/90">
                          {banner.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-white w-4' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Promotions */}
          <div className="lg:col-span-3 space-y-2">
            {/* Promotion 1 */}
            <Link
              href="/?category=phone"
              className="block bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#fff3f3] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-[#d70018]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Thu cũ đổi mới</h4>
                  <p className="text-gray-600 text-xs">Giảm đến 5 triệu</p>
                </div>
              </div>
            </Link>

            {/* Promotion 2 */}
            <Link
              href="/?category=laptop"
              className="block bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#f0f7ff] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-[#0066cc]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Trả góp 0%</h4>
                  <p className="text-gray-600 text-xs">Duyệt nhanh 5 phút</p>
                </div>
              </div>
            </Link>

            {/* Promotion 3 */}
            <Link
              href="/?category=cosmetics"
              className="block bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#f0fdf4] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#16a34a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Bảo hành chính hãng</h4>
                  <p className="text-gray-600 text-xs">Đổi trả trong 30 ngày</p>
                </div>
              </div>
            </Link>

            {/* Promotion 4 */}
            <Link
              href="/?category=accessories"
              className="block bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#fef3f2] rounded-lg flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-6 h-6 text-[#dc2626]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Miễn phí vận chuyển</h4>
                  <p className="text-gray-600 text-xs">Đơn hàng từ 500K</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
