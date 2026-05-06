'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { Star, ShoppingCart, ChevronLeft, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [showNotification, setShowNotification] = useState(false);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
        <Link href="/" className="text-[#d70018] hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor);
    router.push('/cart');
  };

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#d70018]">
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </Link>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          Đã thêm vào giỏ hàng!
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Image */}
          <div className="bg-white rounded-lg p-6">
            <div className="relative aspect-square mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
              {product.discount && (
                <div className="absolute top-0 left-0 bg-[#d70018] text-white font-bold px-3 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-4">
            {/* Title */}
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-[#d70018]">
                    {formatPrice(product.price)}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}₫
                    </span>
                  )}
                </div>
                {discountAmount > 0 && (
                  <p className="text-sm text-gray-600">
                    Tiết kiệm: {formatPrice(discountAmount)}₫
                  </p>
                )}
              </div>

              {/* Color */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Chọn màu:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-[#d70018] bg-red-50 text-[#d70018]'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#d70018] hover:bg-[#c00016] text-white font-bold py-4 rounded-lg text-lg transition-colors"
                >
                  MUA NGAY
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  THÊM VÀO GIỎ
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Ưu đãi thêm:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Giao hàng nhanh 2h</p>
                    <p className="text-sm text-gray-600">Miễn phí vận chuyển</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Bảo hành chính hãng 12 tháng</p>
                    <p className="text-sm text-gray-600">Tại các trung tâm bảo hành</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Đổi trả trong 30 ngày</p>
                    <p className="text-sm text-gray-600">Nếu có lỗi từ nhà sản xuất</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex py-3 border-b border-gray-200">
              <span className="w-32 text-gray-600">Màn hình:</span>
              <span className="font-medium text-gray-900">{product.specs.screen}</span>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <span className="w-32 text-gray-600">CPU:</span>
              <span className="font-medium text-gray-900">{product.specs.cpu}</span>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <span className="w-32 text-gray-600">RAM:</span>
              <span className="font-medium text-gray-900">{product.specs.ram}</span>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <span className="w-32 text-gray-600">Bộ nhớ:</span>
              <span className="font-medium text-gray-900">{product.specs.storage}</span>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <span className="w-32 text-gray-600">Pin:</span>
              <span className="font-medium text-gray-900">{product.specs.battery}</span>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <span className="w-32 text-gray-600">Camera:</span>
              <span className="font-medium text-gray-900">{product.specs.camera}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
