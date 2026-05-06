'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { Star, ShoppingCart, ChevronRight, Check, Truck, Shield, RefreshCw, Phone, Store, CreditCard, Gift, Heart, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const runtime = 'edge';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
    router.push('/cart');
  };

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice 
    ? Math.round((discountAmount / product.originalPrice) * 100) 
    : 0;

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#d70018]">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/danh-muc/${product.category}`} className="text-gray-600 hover:text-[#d70018]">
              {product.category === 'phone' ? 'Điện thoại' : 
               product.category === 'laptop' ? 'Laptop' :
               product.category === 'cosmetics' ? 'Mỹ phẩm' :
               product.category === 'shoes' ? 'Giày dép' :
               product.category === 'fashion' ? 'Quần áo' : 'Phụ kiện'}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          Đã thêm {quantity} sản phẩm vào giỏ hàng!
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left - Image */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-[#d70018] text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">
                    -{product.discount}%
                  </div>
                )}
                {product.isHot && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    HOT
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Yêu thích</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="lg:col-span-7 space-y-4">
            {/* Title & Brand */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-[#d70018] bg-red-50 px-2 py-1 rounded">
                  {product.brand}
                </span>
                {product.inStock ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    Còn hàng
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    Hết hàng
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
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
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">{product.reviews}</strong> đánh giá
                </span>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-600">
                  Đã bán <strong className="text-gray-900">{Math.floor(product.reviews * 0.8)}</strong>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-100">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#d70018]">
                  {formatPrice(product.price)}₫
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}₫
                    </span>
                    <span className="bg-[#d70018] text-white text-sm font-bold px-2 py-1 rounded">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>
              {discountAmount > 0 && (
                <p className="text-sm text-gray-700">
                  🎉 Tiết kiệm được: <strong className="text-[#d70018]">{formatPrice(discountAmount)}₫</strong>
                </p>
              )}
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Chọn màu sắc:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedColor === color
                        ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Số lượng:</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  (Tối đa 10 sản phẩm)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-[#d70018] hover:bg-[#c00016] text-white font-bold py-4 rounded-lg transition-colors"
                >
                  Mua ngay
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-[#d70018] text-[#d70018] font-semibold rounded-lg hover:bg-red-50 transition-colors">
                  <CreditCard className="w-4 h-4" />
                  Trả góp 0%
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  Gọi đặt hàng
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#d70018]" />
                Ưu đãi & Dịch vụ
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Giao hàng nhanh 2h</p>
                    <p className="text-sm text-gray-600">Miễn phí vận chuyển toàn quốc</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Bảo hành chính hãng 12 tháng</p>
                    <p className="text-sm text-gray-600">Tại các trung tâm bảo hành toàn quốc</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Đổi trả miễn phí trong 30 ngày</p>
                    <p className="text-sm text-gray-600">Nếu có lỗi từ nhà sản xuất</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Store className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Mua tại cửa hàng</p>
                    <p className="text-sm text-gray-600">Nhận hàng ngay, không cần chờ đợi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-lg p-6 mt-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Thông số kỹ thuật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex py-4 border-b border-gray-200">
                <span className="w-40 text-gray-600 font-medium">
                  {key === 'screen' ? 'Màn hình' :
                   key === 'cpu' ? 'Bộ xử lý' :
                   key === 'ram' ? 'RAM' :
                   key === 'storage' ? 'Bộ nhớ' :
                   key === 'battery' ? 'Pin' :
                   key === 'camera' ? 'Camera' : key}:
                </span>
                <span className="flex-1 font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Sản phẩm tương tự</h2>
              <Link 
                href={`/danh-muc/${product.category}`}
                className="text-[#d70018] text-sm font-medium hover:underline"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                    {relatedProduct.discount && (
                      <div className="absolute top-2 left-2 bg-[#d70018] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        -{relatedProduct.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm text-gray-900 line-clamp-2 mb-2 min-h-[40px]">
                      {relatedProduct.name}
                    </h3>
                    <div className="text-base font-bold text-[#d70018]">
                      {formatPrice(relatedProduct.price)}₫
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
