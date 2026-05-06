'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Home, Package, Phone, Mail, Clock, Truck, CreditCard, ArrowRight, Star, Gift } from 'lucide-react';

export const runtime = 'edge';

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Tạo mã đơn hàng
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
    setOrderNumber(`MM${dateStr}${timeStr}`);
    setCurrentTime(now.toLocaleString('vi-VN'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Success */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã tin tưởng mua sắm tại MegaMart
            </p>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Mã đơn hàng:</span>
              <span className="font-bold text-[#d70018]">{orderNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-4">
            {/* Timeline */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Trạng thái đơn hàng</h2>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-green-500"></div>
                
                <div className="space-y-6">
                  {/* Step 1 - Completed */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-gray-900">Đặt hàng thành công</h3>
                      <p className="text-sm text-gray-600 mb-1">Đơn hàng đã được ghi nhận vào hệ thống</p>
                      <p className="text-xs text-green-600 font-medium">{currentTime}</p>
                    </div>
                  </div>
                  
                  {/* Step 2 - Next */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-gray-900">Xác nhận đơn hàng</h3>
                      <p className="text-sm text-gray-600 mb-1">Nhân viên sẽ gọi điện xác nhận trong 30 phút</p>
                      <p className="text-xs text-blue-600 font-medium">Đang chờ xử lý</p>
                    </div>
                  </div>
                  
                  {/* Step 3 - Pending */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-gray-500">Chuẩn bị hàng</h3>
                      <p className="text-sm text-gray-500 mb-1">Đóng gói và chuẩn bị giao hàng</p>
                      <p className="text-xs text-gray-400">Dự kiến: 2-4 giờ</p>
                    </div>
                  </div>
                  
                  {/* Step 4 - Pending */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-gray-500">Giao hàng</h3>
                      <p className="text-sm text-gray-500 mb-1">Shipper sẽ liên hệ và giao hàng tận nơi</p>
                      <p className="text-xs text-gray-400">Dự kiến: 1-2 ngày</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Lưu ý quan trọng:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Nhân viên sẽ gọi điện xác nhận đơn hàng trong 30 phút</li>
                    <li>• Vui lòng giữ máy để nhận cuộc gọi xác nhận</li>
                    <li>• Bạn có thể kiểm tra hàng trước khi thanh toán</li>
                    <li>• Liên hệ hotline nếu cần thay đổi thông tin giao hàng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Contact */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4">Liên hệ hỗ trợ</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#d70018]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Hotline</p>
                    <a href="tel:1900xxxx" className="text-[#d70018] font-semibold">1900.xxxx</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#d70018]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:support@megamart.vn" className="text-[#d70018] font-semibold">support@megamart.vn</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#d70018]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Giờ làm việc</p>
                    <p className="text-sm text-gray-600">8:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4">Phương thức thanh toán</h3>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CreditCard className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">COD - Thanh toán khi nhận hàng</p>
                  <p className="text-sm text-gray-600">Tiền mặt hoặc chuyển khoản</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4">Quyền lợi của bạn</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Bảo hành chính hãng 12 tháng</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Miễn phí vận chuyển toàn quốc</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Gift className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-700">Đổi trả miễn phí trong 30 ngày</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg p-6 mt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#d70018] hover:bg-[#c00016] text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
            <Link
              href="/flash-sale"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              <Gift className="w-5 h-5" />
              Xem Flash Sale
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}