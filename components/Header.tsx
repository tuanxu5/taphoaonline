'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, Phone, User, X, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function Header() {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[#d70018] text-white text-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-5">
              <a href="tel:1900xxxx" className="flex items-center gap-1.5 hover:opacity-80">
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi mua hàng <strong>1900.xxxx</strong></span>
              </a>
              <a href="#" className="hidden md:flex items-center gap-1.5 hover:opacity-80">
                <MapPin className="w-3.5 h-3.5" />
                <span>Cửa hàng gần bạn</span>
              </a>
            </div>
            <div className="hidden md:block">
              <span>Tra cứu đơn hàng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-[#d70018] rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-gray-900 leading-none">PhoneStore</div>
                <div className="text-[10px] text-gray-500">Chính hãng, giá tốt</div>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-[500px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bạn tìm gì..."
                  className="w-full h-10 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:border-[#d70018] focus:outline-none"
                />
                <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-400 hover:text-[#d70018]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/account" className="hidden lg:flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#d70018] min-w-[60px]">
                <User className="w-5 h-5" />
                <span className="text-[11px]">Tài khoản</span>
              </Link>

              <Link href="/cart" className="relative flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#d70018] min-w-[60px]">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#d70018] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <span className="text-[11px]">Giỏ hàng</span>
              </Link>

              <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-8 h-11 text-[13px]">
            <Link href="/" className="text-gray-700 hover:text-[#d70018] font-medium">Trang chủ</Link>
            <Link href="/deals" className="text-[#d70018] font-medium">Flash Sale</Link>
            <Link href="/installment" className="text-gray-700 hover:text-[#d70018]">Trả góp 0%</Link>
            <Link href="/trade-in" className="text-gray-700 hover:text-[#d70018]">Thu cũ đổi mới</Link>
            <Link href="/stores" className="text-gray-700 hover:text-[#d70018]">Cửa hàng</Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 py-3 space-y-1">
            <Link href="/" className="block py-2.5 text-sm text-gray-700">Trang chủ</Link>
            <Link href="/deals" className="block py-2.5 text-sm text-[#d70018] font-medium">Flash Sale</Link>
            <Link href="/cart" className="block py-2.5 text-sm text-gray-700">Giỏ hàng ({getTotalItems()})</Link>
            <Link href="/account" className="block py-2.5 text-sm text-gray-700">Tài khoản</Link>
          </div>
        </div>
      )}
    </header>
  );
}
