# 📱 HƯỚNG DẪN SỬ DỤNG WEBSITE PHONESTORE

## 🚀 CHẠY WEBSITE

### Bước 1: Cài đặt
```bash
npm install
```

### Bước 2: Chạy development
```bash
npm run dev
```

### Bước 3: Mở trình duyệt
Truy cập: **http://localhost:3000**

---

## 🎯 CÁC CHỨC NĂNG CHÍNH

### 1️⃣ TRANG CHỦ (/)
- **Xem sản phẩm**: Hiển thị tất cả điện thoại với hình ảnh đẹp
- **Lọc theo hãng**: Click vào nút Apple, Samsung, Xiaomi, etc.
- **Xem chi tiết**: Click vào card sản phẩm bất kỳ
- **Thêm giỏ hàng nhanh**: Click nút "Thêm vào giỏ" trên card

### 2️⃣ CHI TIẾT SẢN PHẨM (/product/[id])
- **Xem ảnh lớn**: Hình ảnh sản phẩm to rõ nét
- **Chọn màu**: Click vào các nút màu sắc
- **Xem thông số**: CPU, RAM, Camera, Pin, etc.
- **Mua ngay**: Thêm vào giỏ và chuyển luôn sang thanh toán
- **Thêm giỏ hàng**: Thêm vào giỏ và tiếp tục mua

### 3️⃣ GIỎ HÀNG (/cart)
- **Xem sản phẩm**: Tất cả sản phẩm đã thêm
- **Tăng/giảm số lượng**: Nút + và -
- **Xóa sản phẩm**: Click icon thùng rác
- **Xem tổng tiền**: Tự động tính toán
- **Thanh toán**: Click "Tiến Hành Thanh Toán"

### 4️⃣ THANH TOÁN (/checkout)
**Điền form:**
- Họ tên (bắt buộc)
- Số điện thoại (bắt buộc, 10 số)
- Email (tùy chọn)
- Địa chỉ đầy đủ (bắt buộc)
- Ghi chú (tùy chọn)

**Click "Đặt Hàng"** → Chuyển sang trang thành công

### 5️⃣ ĐẶT HÀNG THÀNH CÔNG (/order-success)
- Xác nhận đơn hàng
- Thông tin liên hệ
- Quy trình xử lý
- Về trang chủ

---

## 🛒 LUỒNG MUA HÀNG HOÀN CHỈNH

```
1. Trang chủ
   ↓ (Click sản phẩm)
2. Chi tiết sản phẩm
   ↓ (Chọn màu + Click "Mua ngay" hoặc "Thêm giỏ")
3. Giỏ hàng
   ↓ (Điều chỉnh số lượng + Click "Thanh toán")
4. Thanh toán
   ↓ (Điền form + Click "Đặt hàng")
5. Thành công ✅
```

---

## 💾 LƯU TRỮ DỮ LIỆU

### LocalStorage (Tự động)
- Giỏ hàng được lưu tự động
- Không mất khi refresh trang
- Xóa khi clear browser data

### Google Sheets (Cần setup)
Xem file: **GOOGLE_SHEETS_SETUP.md**

---

## 🎨 TÍNH NĂNG UI/UX

### ✨ Animations
- Hover effects trên cards
- Smooth transitions
- Loading states
- Bounce notifications

### 📱 Responsive
- **Mobile**: < 640px - Menu hamburger, 1 cột
- **Tablet**: 640-1024px - 2 cột sản phẩm
- **Desktop**: > 1024px - 4 cột sản phẩm

### 🎯 Thông báo
- "Đã thêm vào giỏ!" khi thêm sản phẩm
- Badge số lượng trên icon giỏ hàng
- Empty states khi giỏ trống

---

## 🔧 CHỈNH SỬA NỘI DUNG

### Thêm/Sửa Sản Phẩm
File: `lib/products.ts`

```typescript
{
  id: '9',
  name: 'iPhone 16 Pro',
  brand: 'Apple',
  price: 32990000,
  originalPrice: 36990000,
  image: 'URL_HÌNH_ẢNH',
  rating: 4.9,
  reviews: 500,
  specs: {
    screen: '6.7" Super Retina XDR',
    cpu: 'Apple A18 Pro',
    ram: '8GB',
    storage: '256GB',
    battery: '4500mAh',
    camera: '48MP + 12MP + 12MP'
  },
  colors: ['Titan Đen', 'Titan Trắng'],
  inStock: true,
  isHot: true,
  discount: 11
}
```

### Đổi Màu Sắc Theme
Tìm và thay đổi trong các component:
- `from-blue-500 to-purple-500` → Màu gradient chính
- `from-red-500 to-orange-500` → Nút mua hàng
- `text-blue-600` → Màu text accent

### Đổi Logo/Tên
- **Header**: `components/Header.tsx` - Dòng 28
- **Footer**: `components/Footer.tsx` - Dòng 11
- **Title**: `app/layout.tsx` - Dòng 18

### Đổi Thông Tin Liên Hệ
File: `components/Footer.tsx`
- Hotline: Dòng 73
- Email: Dòng 79
- Địa chỉ: Dòng 85

---

## 📊 QUẢN LÝ ĐỚN HÀNG

### Cách 1: Console Log (Mặc định)
Mở Developer Tools (F12) → Console → Xem dữ liệu đơn hàng

### Cách 2: Google Sheets (Khuyến nghị)
1. Làm theo **GOOGLE_SHEETS_SETUP.md**
2. Mở file `app/checkout/page.tsx`
3. Tìm dòng 48: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
4. Thay bằng URL của bạn
5. Uncomment dòng 54-61 (bỏ /* */)
6. Comment dòng 65 (thêm // phía trước)

---

## 🐛 TROUBLESHOOTING

### Giỏ hàng bị mất
- Check LocalStorage có bật không
- Không dùng chế độ Incognito

### Không gửi được đơn hàng
- Check console log xem có lỗi không
- Kiểm tra Google Apps Script URL
- Đảm bảo form điền đầy đủ

### Hình ảnh không hiển thị
- Check URL hình ảnh trong `lib/products.ts`
- Đảm bảo URL hợp lệ và accessible

### Build lỗi
```bash
# Xóa cache và build lại
rm -rf .next
npm run build
```

---

## 📦 DEPLOY LÊN PRODUCTION

### Vercel (Khuyến nghị)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Upload folder .next và public
```

### VPS/Server
```bash
# Build
npm run build

# Start production
npm start
```

---

## 🎓 HỌC THÊM

### Next.js
- Docs: https://nextjs.org/docs
- Learn: https://nextjs.org/learn

### Tailwind CSS
- Docs: https://tailwindcss.com/docs
- Components: https://tailwindui.com

### React
- Docs: https://react.dev
- Tutorial: https://react.dev/learn

---

## 💡 MẸO VÀ TRICKS

### 1. Thêm sản phẩm nhanh
Copy một object sản phẩm có sẵn, đổi id và thông tin

### 2. Test responsive
- Chrome DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
- Chọn iPhone, iPad, etc.

### 3. Tối ưu hình ảnh
- Dùng WebP format
- Compress trước khi upload
- Dùng CDN như Cloudinary, Imgix

### 4. SEO
- Đổi title trong `app/layout.tsx`
- Thêm meta description
- Thêm Open Graph tags

---

## 📞 HỖ TRỢ

Nếu cần hỗ trợ:
1. Check file README_WEBSITE.md
2. Check file GOOGLE_SHEETS_SETUP.md
3. Xem console log (F12)
4. Google error message

---

**Chúc bạn thành công! 🎉**
