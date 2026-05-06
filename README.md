# 🛒 PhoneStore - Website Bán Điện Thoại

> Website bán hàng điện thoại hiện đại, đẹp mắt với đầy đủ chức năng được xây dựng bằng **Next.js 16**, **React 19**, **TypeScript**, và **Tailwind CSS 4**.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## ⚡ Quick Start

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Mở trình duyệt
# http://localhost:3000
```

---

## ✨ Tính Năng

### 🎨 Giao Diện
- ✅ Thiết kế hiện đại với gradient đẹp mắt
- ✅ Responsive hoàn toàn (mobile, tablet, desktop)
- ✅ Animations mượt mà
- ✅ Icons từ Lucide React
- ✅ Màu sắc gradient xanh-tím-hồng chuyên nghiệp

### 🛍️ Chức Năng Mua Hàng
- ✅ **Trang chủ**: Hiển thị sản phẩm với filter theo hãng
- ✅ **Chi tiết sản phẩm**: Xem thông tin đầy đủ, chọn màu sắc
- ✅ **Giỏ hàng**: Thêm/xóa/cập nhật số lượng sản phẩm
- ✅ **Thanh toán**: Form đặt hàng đầy đủ thông tin
- ✅ **Trang thành công**: Xác nhận đơn hàng

### 💾 Quản Lý Dữ Liệu
- ✅ Context API để quản lý giỏ hàng
- ✅ LocalStorage lưu giỏ hàng
- ✅ Tích hợp Google Sheets để lưu đơn hàng

---

## 📁 Cấu Trúc Dự Án

```
taphoaonline/
├── app/
│   ├── page.tsx                    # Trang chủ
│   ├── layout.tsx                  # Layout chính
│   ├── product/[id]/page.tsx       # Chi tiết sản phẩm
│   ├── cart/page.tsx               # Giỏ hàng
│   ├── checkout/page.tsx           # Thanh toán
│   └── order-success/page.tsx      # Thành công
├── components/
│   ├── Header.tsx                  # Header với giỏ hàng
│   ├── Footer.tsx                  # Footer
│   ├── ProductCard.tsx             # Card sản phẩm
│   ├── Banner.tsx                  # Banner trang chủ
│   ├── CategoryFilter.tsx          # Bộ lọc danh mục
│   └── Features.tsx                # Tính năng nổi bật
├── contexts/
│   └── CartContext.tsx             # Context quản lý giỏ hàng
├── lib/
│   ├── types.ts                    # TypeScript types
│   └── products.ts                 # Dữ liệu sản phẩm (8 sản phẩm)
└── public/                         # Static files
```

---

## 📚 Tài Liệu

| File | Mô Tả |
|------|-------|
| **[START_HERE.md](./START_HERE.md)** | 🎯 Bắt đầu nhanh (3 bước) |
| **[HUONG_DAN_SU_DUNG.md](./HUONG_DAN_SU_DUNG.md)** | 📖 Hướng dẫn sử dụng chi tiết |
| **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** | 📊 Kết nối Google Sheets |
| **[README_WEBSITE.md](./README_WEBSITE.md)** | 🏗️ Tài liệu kỹ thuật |
| **[TONG_KET.md](./TONG_KET.md)** | ✅ Tổng kết dự án |
| **[SUMMARY.md](./SUMMARY.md)** | 📋 Tóm tắt chi tiết |

---

## 🎯 Các Trang

### 1. Trang Chủ (`/`)
- Banner với slogan
- Filter theo hãng (Apple, Samsung, Xiaomi, OPPO, Vivo, Google)
- Grid 8 sản phẩm với badge HOT và giảm giá
- Features section

### 2. Chi Tiết Sản Phẩm (`/product/[id]`)
- Hình ảnh lớn với badge giảm giá
- Chọn màu sắc
- Thông số kỹ thuật đầy đủ
- Nút "Mua ngay" và "Thêm giỏ hàng"

### 3. Giỏ Hàng (`/cart`)
- Danh sách sản phẩm với hình ảnh
- Tăng/giảm số lượng
- Xóa sản phẩm
- Tổng tiền tự động
- Empty state khi giỏ trống

### 4. Thanh Toán (`/checkout`)
- Form thông tin khách hàng (họ tên, SĐT, email, địa chỉ)
- Validation đầy vào
- Tóm tắt đơn hàng
- Gửi về Google Sheets

### 5. Thành Công (`/order-success`)
- Thông báo đặt hàng thành công
- Timeline xử lý đơn
- Nút về trang chủ

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **React**: 19.2.4
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React 1.14.0
- **State Management**: React Context API
- **Storage**: LocalStorage + Google Sheets

---

## 🎨 Màu Sắc Chính

- **Primary**: Blue (#3B82F6) → Purple (#8B5CF6)
- **Secondary**: Pink (#EC4899)
- **Accent**: Orange (#F97316), Red (#EF4444)
- **Success**: Green (#10B981)
- **Background**: Gray (#F9FAFB) → Blue (#EFF6FF)

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🔗 Tích Hợp Google Sheets

Để lưu đơn hàng vào Google Sheets:

1. Đọc hướng dẫn trong **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**
2. Tạo Google Apps Script
3. Deploy as Web App
4. Copy URL vào `app/checkout/page.tsx`

---

## 🚀 Deploy

### Vercel (Khuyến nghị)
```bash
npm i -g vercel
vercel
```

### Build Production
```bash
npm run build
npm start
```

---

## 🔧 Customization

### Thêm Sản Phẩm
Chỉnh sửa `lib/products.ts`:
```typescript
{
  id: '9',
  name: 'iPhone 16 Pro',
  brand: 'Apple',
  price: 32990000,
  // ... các field khác
}
```

### Đổi Màu Sắc
Tìm và thay các class Tailwind:
- `from-blue-500 to-purple-500` → Gradient chính
- `from-red-500 to-orange-500` → Nút CTA

### Đổi Logo/Tên
- `components/Header.tsx`
- `components/Footer.tsx`
- `app/layout.tsx`

---

## 📞 Liên Hệ & Hỗ Trợ

- **Hotline**: 1900.xxxx
- **Email**: support@phonestore.vn

---

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

**Made with ❤️ by Kiro AI**  
**Date: May 6, 2026**
