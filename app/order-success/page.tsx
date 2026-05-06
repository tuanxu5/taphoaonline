'use client';

import Link from 'next/link';
import { CheckCircle, Home, Package } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 animate-bounce">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Đặt Hàng Thành Công!
            </h1>
            <p className="text-xl text-gray-600">
              Cảm ơn bạn đã mua hàng tại PhoneStore
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Đơn hàng của bạn
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Chúng tôi đã nhận được đơn hàng của bạn và sẽ liên hệ trong thời gian sớm nhất để xác nhận.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📞 Hotline hỗ trợ: <span className="font-semibold">1900.xxxx</span></p>
              <p>📧 Email: <span className="font-semibold">support@phonestore.vn</span></p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Quy trình xử lý đơn hàng:</h3>
            <div className="flex justify-center items-center gap-4 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-2">
                  1
                </div>
                <p className="text-gray-600 text-center">Đặt hàng<br/>thành công</p>
              </div>
              <div className="w-8 h-1 bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mb-2">
                  2
                </div>
                <p className="text-gray-600 text-center">Xác nhận<br/>đơn hàng</p>
              </div>
              <div className="w-8 h-1 bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mb-2">
                  3
                </div>
                <p className="text-gray-600 text-center">Giao hàng<br/>& nhận hàng</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              Về Trang Chủ
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
              <br />
              Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
