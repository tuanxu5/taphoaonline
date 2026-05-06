# Cập nhật Favicon - MegaMart

## ✅ Đã tạo các file icon:

1. **app/icon.svg** - SVG favicon (32x32) - Chữ M trắng trên nền đỏ
2. **app/icon.tsx** - Dynamic PNG icon (32x32)
3. **app/apple-icon.tsx** - Apple touch icon (180x180)
4. **app/manifest.ts** - PWA manifest với theme color #d70018

## 🔄 Để thấy favicon mới:

### Cách 1: Hard Refresh (Khuyến nghị)
1. Mở trình duyệt
2. Nhấn **Ctrl + Shift + R** (Windows/Linux) hoặc **Cmd + Shift + R** (Mac)
3. Hoặc mở DevTools (F12) → Right-click vào nút Refresh → chọn "Empty Cache and Hard Reload"

### Cách 2: Clear Browser Cache
1. Chrome: Settings → Privacy and security → Clear browsing data
2. Chọn "Cached images and files"
3. Click "Clear data"
4. Reload trang

### Cách 3: Restart Dev Server
```bash
# Stop server (Ctrl + C)
# Then restart
npm run dev
```

### Cách 4: Incognito/Private Mode
- Mở cửa sổ ẩn danh để thấy favicon mới ngay

## 📱 Icon sẽ hiển thị ở:

- ✅ Browser tab (favicon)
- ✅ Bookmarks
- ✅ History
- ✅ Mobile home screen (khi add to home)
- ✅ PWA app icon

## 🎨 Thiết kế Icon:

- **Màu nền**: #d70018 (đỏ MegaMart)
- **Chữ**: M (trắng, bold)
- **Border radius**: 6px (rounded)
- **Kích thước**: 32x32px (browser), 180x180px (Apple)

## 🔍 Kiểm tra:

Sau khi hard refresh, bạn sẽ thấy icon chữ **M** màu trắng trên nền đỏ ở tab trình duyệt!
