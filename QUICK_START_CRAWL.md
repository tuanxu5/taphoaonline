# 🚀 Quick Start: Thêm Sản Phẩm Vào Website

## Vấn Đề

API Shopee đã thay đổi và không thể crawl trực tiếp nữa.

## Giải Pháp Nhanh Nhất (30 giây)

### Bước 1: Tạo Sample Data

```bash
node scripts/create-sample-data.js
```

Kết quả: 12 sản phẩm chất lượng cao đã được tạo!

### Bước 2: Merge Vào Website

```bash
node scripts/merge-products.js
```

### Bước 3: Xem Kết Quả

```bash
npm run dev
```

Mở http://localhost:3000 và xem sản phẩm mới!

---

## Bạn Có Gì?

✅ **12 sản phẩm mới** từ các thương hiệu:
- Apple (iPhone 15 Pro Max, iPhone 14 Pro)
- Samsung (Galaxy S24 Ultra, Galaxy Z Fold5)
- Xiaomi (Xiaomi 14 Ultra, Redmi Note 13 Pro)
- OPPO (Find X7 Ultra, Reno11 5G)
- Vivo (X100 Pro)
- Google (Pixel 8 Pro)
- Realme (GT 5 Pro)
- OnePlus (OnePlus 12)

✅ **Giá đa dạng**: 7.9 triệu → 35.9 triệu

✅ **Đầy đủ thông tin**:
- Hình ảnh chất lượng cao
- Thông số kỹ thuật
- Rating & reviews
- Giá gốc & giảm giá
- Màu sắc

---

## Muốn Thêm Sản Phẩm Riêng?

### Cách 1: Sửa File JSON

Mở `data/products.json` và thêm:

```json
{
  "id": "custom-1",
  "name": "Tên sản phẩm của bạn",
  "brand": "Apple",
  "price": 10000000,
  "originalPrice": 12000000,
  "image": "URL_hình_ảnh",
  "rating": 4.5,
  "reviews": 100,
  "specs": {
    "screen": "6.1\"",
    "cpu": "A16",
    "ram": "6GB",
    "storage": "128GB",
    "battery": "3200mAh",
    "camera": "48MP"
  },
  "colors": ["Đen", "Trắng"],
  "inStock": true,
  "isHot": false,
  "discount": 20
}
```

### Cách 2: Sửa Sample Data Script

Mở `scripts/create-sample-data.js` và thêm sản phẩm vào mảng `sampleProducts`.

---

## Muốn Crawl Data Thật Từ Shopee?

### Dùng Puppeteer (Cần cài đặt)

```bash
# Bước 1: Cài Puppeteer
npm install puppeteer

# Bước 2: Chạy crawler
node scripts/shopee-simple-crawler.js

# Bước 3: Merge
node scripts/merge-products.js
```

**Lưu ý:**
- Cần ~300MB để cài Puppeteer
- Chạy chậm hơn (30-60 giây)
- Có thể bị CAPTCHA

---

## Tóm Tắt

| Phương Pháp | Thời Gian | Độ Khó | Khuyến Nghị |
|-------------|-----------|--------|-------------|
| **Sample Data** | 30 giây | ⭐ Dễ | ⭐⭐⭐⭐⭐ |
| **Puppeteer** | 5 phút | ⭐⭐ TB | ⭐⭐⭐⭐ |
| **Thủ công** | 10 phút | ⭐ Dễ | ⭐⭐⭐ |

---

## Cần Giúp Đỡ?

Đọc hướng dẫn chi tiết:
- **[GIAI_PHAP_CRAWL_DATA.md](./GIAI_PHAP_CRAWL_DATA.md)** - Tất cả giải pháp
- **[HUONG_DAN_CRAWL_SHOPEE.md](./HUONG_DAN_CRAWL_SHOPEE.md)** - Crawl nâng cao

---

**Chúc bạn thành công! 🎉**
