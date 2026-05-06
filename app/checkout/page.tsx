'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingBag, CheckCircle, Loader2, User, MapPin, CreditCard, FileText, Truck, Shield, RotateCcw } from 'lucide-react';

export const runtime = 'edge';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data for Google Sheets
      const orderData = {
        timestamp: new Date().toISOString(),
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`,
        note: formData.note,
        items: cart.map(item => ({
          name: item.name,
          color: item.selectedColor,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        totalAmount: getTotalPrice(),
      };

      // Send to Google Sheets via Apps Script Web App
      // Replace this URL with your Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
      
      // For demo purposes, we'll just log the data
      console.log('Order Data:', orderData);
      
      // Uncomment this when you have your Google Apps Script URL
      /*
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      */

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      router.push('/order-success');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">Giỏ hàng</span>
            </div>
            <div className="w-16 h-0.5 bg-[#d70018]" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#d70018] flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="text-sm font-bold text-[#d70018]">Thanh toán</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                3
              </div>
              <span className="text-sm font-medium text-gray-500">Hoàn tất</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Info Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-[#d70018] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Thông tin khách hàng</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-[#d70018]">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại <span className="text-[#d70018]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                        placeholder="0912345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-[#d70018] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Địa chỉ giao hàng</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ <span className="text-[#d70018]">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                      placeholder="Số nhà, tên đường"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phường/Xã <span className="text-[#d70018]">*</span>
                      </label>
                      <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                        placeholder="Phường 1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quận/Huyện <span className="text-[#d70018]">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                        placeholder="Quận 1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tỉnh/Thành phố <span className="text-[#d70018]">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none"
                        placeholder="TP. Hồ Chí Minh"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-[#d70018] flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Phương thức thanh toán</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#d70018] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'bank')}
                      className="mt-1 w-4 h-4 text-[#d70018] focus:ring-[#d70018]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#d70018] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'bank')}
                      className="mt-1 w-4 h-4 text-[#d70018] focus:ring-[#d70018]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Chuyển khoản ngân hàng</div>
                      <div className="text-sm text-gray-600">Chuyển khoản qua Internet Banking hoặc ATM</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-[#d70018] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Ghi chú đơn hàng</h2>
                </div>

                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70018] focus:border-[#d70018] outline-none resize-none"
                  placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d70018] hover:bg-[#b8001a] disabled:bg-gray-400 text-white font-bold py-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Đặt Hàng
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b">
                Đơn hàng ({cart.length} sản phẩm)
              </h2>

              <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}`}
                    className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#d70018] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.selectedColor}
                      </p>
                      <p className="font-bold text-sm text-[#d70018]">
                        {formatPrice(item.price * item.quantity)}₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-b">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tạm tính:</span>
                  <span className="font-semibold text-gray-900">{formatPrice(getTotalPrice())}₫</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
              </div>

              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-bold text-gray-900">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-[#d70018]">
                    {formatPrice(getTotalPrice())}₫
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Truck className="w-4 h-4 text-[#d70018]" />
                  <span>Miễn phí vận chuyển toàn quốc</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="w-4 h-4 text-[#d70018]" />
                  <span>Bảo hành chính hãng 12 tháng</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <RotateCcw className="w-4 h-4 text-[#d70018]" />
                  <span>Đổi trả trong 30 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
