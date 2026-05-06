'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft, Tag, Truck, Shield, Gift, Percent } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const runtime = 'edge';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice >= 500000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Giỏ hàng trống
          </h2>
          <p className="text-gray-600 mb-8">
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm nhé!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#d70018] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#c00016] transition-all shadow-lg hover:shadow-xl"
          >
            Khám phá sản phẩm
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#d70018]">
              Trang chủ
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <span className="text-gray-900 font-medium">Giỏ hàng</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
            <p className="text-sm text-gray-600 mt-1">
              {totalItems} sản phẩm
            </p>
          </div>
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#d70018] font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Tiếp tục mua sắm
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            {/* Promotion Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-[#d70018]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    🎉 Ưu đãi đặc biệt!
                  </p>
                  <p className="text-xs text-gray-600">
                    {shippingFee > 0 
                      ? `Mua thêm ${formatPrice(500000 - totalPrice)}₫ để được miễn phí vận chuyển`
                      : 'Bạn được miễn phí vận chuyển cho đơn hàng này'}
                  </p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-lg overflow-hidden">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className={`p-4 ${index !== cart.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link 
                      href={`/product/${item.id}`}
                      className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <Link 
                            href={`/product/${item.id}`}
                            className="font-semibold text-gray-900 hover:text-[#d70018] line-clamp-2 mb-1"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">
                              {item.selectedColor}
                            </span>
                            {item.brand && (
                              <span className="text-gray-400">• {item.brand}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedColor)}
                          className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.selectedColor, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#d70018] hover:text-[#d70018] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-gray-900 w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.selectedColor, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#d70018] hover:text-[#d70018] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#d70018]">
                            {formatPrice(item.price * item.quantity)}₫
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              {formatPrice(item.price)}₫ / sp
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher Section */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-[#d70018]" />
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-[#d70018] focus:outline-none"
                />
                <button className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                  Áp dụng
                </button>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">
                Thông tin đơn hàng
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính ({totalItems} sản phẩm):</span>
                  <span className="font-semibold text-gray-900">{formatPrice(totalPrice)}₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  {shippingFee === 0 ? (
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  ) : (
                    <span className="font-semibold text-gray-900">{formatPrice(shippingFee)}₫</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giảm giá:</span>
                  <span className="font-semibold text-gray-900">0₫</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Tổng cộng:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#d70018] block">
                      {formatPrice(finalTotal)}₫
                    </span>
                    <span className="text-xs text-gray-500">(Đã bao gồm VAT)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#d70018] hover:bg-[#c00016] text-white font-bold py-4 rounded-lg text-base transition-all shadow-lg hover:shadow-xl mb-3"
              >
                Tiến hành thanh toán
              </button>

              <Link
                href="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Tiếp tục mua sắm
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Quyền lợi của bạn:</h3>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Giao hàng nhanh</p>
                    <p className="text-xs text-gray-600">Miễn phí từ 500K</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bảo hành chính hãng</p>
                    <p className="text-xs text-gray-600">12 tháng toàn quốc</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Percent className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Đổi trả dễ dàng</p>
                    <p className="text-xs text-gray-600">Trong vòng 30 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
