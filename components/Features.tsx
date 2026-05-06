import { Truck, Shield, RefreshCw, CreditCard } from 'lucide-react';

export default function Features() {
  return (
    <section className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">Giao hàng nhanh</div>
              <div className="text-xs text-gray-500">Trong 2 giờ</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">Bảo hành</div>
              <div className="text-xs text-gray-500">12 tháng</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">Đổi trả</div>
              <div className="text-xs text-gray-500">30 ngày</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">Trả góp 0%</div>
              <div className="text-xs text-gray-500">Duyệt nhanh</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
