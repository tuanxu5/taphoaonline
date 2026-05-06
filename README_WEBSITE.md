# 🛒 PhoneStore - Website Bán Điện Thoại

Website bán hàng điện thoại hiện đại, đẹp mắt với đầy đủ chức năng được xây dựng bằng **Next.js 16**, **React 19**, **TypeScript**, và **Tailwind CSS 4**.

## ✨ Tính Năng

### 🎨 Giao Diện
- ✅ Thiết kế hiện đại, gradient đẹp mắt
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
- ✅ Tích hợp Google Sheets để lưu đơn hàng (xem hướng dẫn bên dưới)

### 🎯 UX/UI Features
- ✅ Badge HOT, giảm giá
- ✅ Đánh giá sao, số lượng reviews
- ✅ Thông báo thêm giỏ hàng
- ✅ Loading states
- ✅ Empty states
- ✅ Sticky header với số lượng giỏ hàng
- ✅ Footer đầy đủ thông tin

## 🚀 Cài Đặt & Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

### 3. Mở trình duyệt
Truy cập: [http://localhost:3000](http://localhost:3000)

## 📦 Cấu Trúc Thư Mục

```
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── product/[id]/         # Chi tiết sản phẩm
│   ├── cart/                 # Giỏ hàng
│   ├── checkout/             # Thanh toán
│   ├── order-success/        # Đặt hàng thành công
│   ├── layout.tsx            # Layout chính
│   └── globals.css           # CSS toàn cục
├── components/
│   ├── Header.tsx            # Header với giỏ hàng
│   ├── Footer.tsx            # Footer
│   ├── ProductCard.tsx       # Card sản phẩm
│   ├── Banner.tsx            # Banner trang chủ
│   ├── CategoryFilter.tsx    # Bộ lọc danh mục
│   └── Features.tsx          # Tính năng nổi bật
├── contexts/
│   └── CartContext.tsx       # Context quản lý giỏ hàng
├── lib/
│   ├── types.ts              # TypeScript types
│   └── products.ts           # Dữ liệu sản phẩm
└── public/                   # Static files
```

## 🔗 Tích Hợp Google Sheets

Để lưu đơn hàng vào Google Sheets, làm theo hướng dẫn trong file:
👉 **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**

### Tóm tắt:
1. Tạo Google Spreadsheet
2. Tạo Google Apps Script với code được cung cấp
3. Deploy as Web App
4. Copy URL và paste vào `app/checkout/page.tsx`

## 🎨 Màu Sắc Chính

- **Primary**: Blue (#3B82F6) → Purple (#8B5CF6)
- **Secondary**: Pink (#EC4899)
- **Accent**: Orange (#F97316), Red (#EF4444)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **React**: 19.2.4
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: LocalStorage

## 📝 Dữ Liệu Sản Phẩm

Hiện tại có **8 sản phẩm mẫu** từ các hãng:
- Apple (iPhone 15 Pro Max, iPhone 14 Pro)
- Samsung (Galaxy S24 Ultra, Galaxy Z Fold5)
- Xiaomi (Xiaomi 14 Ultra)
- OPPO (Find X7 Ultra)
- Vivo (X100 Pro)
- Google (Pixel 8 Pro)

Để thêm sản phẩm mới, chỉnh sửa file `lib/products.ts`

## 🎯 Các Trang

### 1. Trang Chủ (`/`)
- Banner với slogan
- Filter theo hãng
- Grid sản phẩm
- Features section

### 2. Chi Tiết Sản Phẩm (`/product/[id]`)
- Hình ảnh lớn
- Thông tin chi tiết
- Chọn màu sắc
- Thông số kỹ thuật
- Nút mua ngay / thêm giỏ hàng

### 3. Giỏ Hàng (`/cart`)
- Danh sách sản phẩm
- Tăng/giảm số lượng
- Xóa sản phẩm
- Tổng tiền
- Nút thanh toán

### 4. Thanh Toán (`/checkout`)
- Form thông tin khách hàng
- Tóm tắt đơn hàng
- Gửi đơn hàng

### 5. Thành Công (`/order-success`)
- Thông báo đặt hàng thành công
- Timeline xử lý đơn
- Nút về trang chủ

## 🔧 Customization

### Thay đổi màu sắc
Chỉnh sửa trong các file component, tìm các class Tailwind như:
- `from-blue-500 to-purple-500`
- `bg-gradient-to-r`

### Thêm sản phẩm
Chỉnh sửa `lib/products.ts`:
```typescript
{
  id: '9',
  name: 'Tên sản phẩm',
  brand: 'Hãng',
  price: 10000000,
  // ... các field khác
}
```

### Thay đổi logo/tên
Chỉnh sửa `components/Header.tsx` và `components/Footer.tsx`

## 📞 Liên Hệ & Hỗ Trợ

- **Hotline**: 1900.xxxx
- **Email**: support@phonestore.vn
- **Website**: phonestore.vn

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

**Được xây dựng với ❤️ bởi Kiro AI**
