import { Phone, Mail, MapPin, Store, Clock, CreditCard, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#d70018] rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">MegaMart</h3>
                <p className="text-xs text-gray-500">Mua sắm thông minh</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Siêu thị trực tuyến đa dạng sản phẩm với hàng ngàn mặt hàng chính hãng, giá tốt nhất thị trường.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-[#d70018] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-[#d70018] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-[#d70018] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Danh mục sản phẩm */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/?category=phone" className="text-gray-600 hover:text-[#d70018] transition-colors">Điện thoại</Link></li>
              <li><Link href="/?category=laptop" className="text-gray-600 hover:text-[#d70018] transition-colors">Laptop</Link></li>
              <li><Link href="/?category=cosmetics" className="text-gray-600 hover:text-[#d70018] transition-colors">Mỹ phẩm</Link></li>
              <li><Link href="/?category=shoes" className="text-gray-600 hover:text-[#d70018] transition-colors">Giày dép</Link></li>
              <li><Link href="/?category=fashion" className="text-gray-600 hover:text-[#d70018] transition-colors">Quần áo</Link></li>
              <li><Link href="/?category=accessories" className="text-gray-600 hover:text-[#d70018] transition-colors">Phụ kiện</Link></li>
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[#d70018] transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#d70018] transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#d70018] transition-colors">Chính sách vận chuyển</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#d70018] transition-colors">Chính sách thanh toán</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#d70018] transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#d70018] transition-colors">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#d70018] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Hotline</p>
                  <a href="tel:1900xxxx" className="text-gray-600 hover:text-[#d70018]">1900.xxxx</a>
                  <p className="text-xs text-gray-500">(8:00 - 22:00)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#d70018] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:support@megamart.vn" className="text-gray-600 hover:text-[#d70018]">support@megamart.vn</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d70018] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ</p>
                  <p className="text-gray-600">Hà Nội & TP.HCM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>&copy; 2026 MegaMart. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#d70018]">Về chúng tôi</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#d70018]">Liên hệ</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#d70018]">Tuyển dụng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
