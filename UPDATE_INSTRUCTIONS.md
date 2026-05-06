# 🎨 Cập nhật Font & Icon - MegaMart

## ✅ Đã thực hiện:

### 1. **Font Plus Jakarta Sans - Dày hơn**
- ✅ Bỏ weight 300 (quá mỏng)
- ✅ Giữ weights: 400, 500, 600, 700, 800
- ✅ Font weight mặc định: **500** (medium)
- ✅ Headings (h1-h6): **700** (bold)
- ✅ Buttons: **600** (semibold)
- ✅ Text thường: **500** (medium)

### 2. **Favicon/Icon mới**
- ✅ Tạo `app/icon.svg` - Chữ M trắng trên nền đỏ #d70018
- ✅ Tạo `app/icon.tsx` - Dynamic PNG icon
- ✅ Tạo `app/apple-icon.tsx` - Apple touch icon
- ✅ Tạo `app/manifest.ts` - PWA manifest

---

## 🔄 Để thấy thay đổi:

### Bước 1: Restart Dev Server (BẮT BUỘC)
```bash
# Dừng server hiện tại (Ctrl + C)
# Sau đó chạy lại:
npm run dev
```

### Bước 2: Hard Refresh Browser
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- Hoặc mở **DevTools (F12)** → Right-click nút Refresh → "Empty Cache and Hard Reload"

### Bước 3: Xóa cache (nếu vẫn chưa thấy)
1. Chrome: `chrome://settings/clearBrowserData`
2. Chọn "Cached images and files"
3. Click "Clear data"

---

## 🎯 Kết quả mong đợi:

### Font:
- ✅ Text dày hơn, rõ ràng hơn
- ✅ Không còn mỏng như trước
- ✅ Headings đậm nét
- ✅ Buttons có trọng lượng vừa phải

### Icon:
- ✅ Tab browser: Chữ **M** trắng trên nền đỏ
- ✅ Không còn icon Next.js (hình tam giác)
- ✅ Border radius 6px (bo góc)

---

## 🐛 Nếu vẫn thấy icon Next.js:

### Cách 1: Xóa .next folder
```bash
rm -rf .next
npm run dev
```

### Cách 2: Mở Incognito/Private Window
- Mở cửa sổ ẩn danh để thấy ngay

### Cách 3: Kiểm tra file
```bash
ls -la app/ | grep icon
# Phải thấy:
# - icon.svg
# - icon.tsx
# - apple-icon.tsx
```

---

## 📝 Files đã thay đổi:

1. ✅ `app/layout.tsx` - Font config + metadata
2. ✅ `app/globals.css` - Font weights
3. ✅ `app/icon.svg` - SVG favicon
4. ✅ `app/icon.tsx` - Dynamic icon
5. ✅ `app/apple-icon.tsx` - Apple icon
6. ✅ `app/manifest.ts` - PWA manifest

---

## 🎨 Font Weight Reference:

- **300** - Light (đã bỏ - quá mỏng)
- **400** - Regular
- **500** - Medium (mặc định) ⭐
- **600** - Semibold (buttons)
- **700** - Bold (headings) ⭐
- **800** - Extrabold

---

**Sau khi restart server và hard refresh, bạn sẽ thấy:**
1. ✅ Font dày hơn, dễ đọc hơn
2. ✅ Icon chữ M màu đỏ thay vì icon Next.js
