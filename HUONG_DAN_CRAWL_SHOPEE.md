# Hướng Dẫn Crawl Data Từ Shopee

## ⚠️ Cảnh báo quan trọng

- Script này chỉ dành cho mục đích **học tập và nghiên cứu**
- Việc crawl dữ liệu có thể **vi phạm Terms of Service** của Shopee
- Sử dụng với **trách nhiệm** và tôn trọng rate limits
- Nên sử dụng **API chính thức** nếu có thể

---

## 🚀 Cách 1: Sử dụng API Crawler (Đơn giản - Khuyến nghị)

### Bước 1: Chạy crawler

```bash
cd scripts
node shopee-api-crawler.js
```

### Bước 2: Kiểm tra kết quả

File sẽ được lưu tại:
- `data/shopee-products.json` - Dữ liệu đã format
- `data/shopee-api-raw.json` - Dữ liệu thô từ API

### Bước 3: Merge vào website (tùy chọn)

```bash
node scripts/merge-products.js
```

### Tùy chỉnh

Mở file `scripts/shopee-api-crawler.js` và sửa:

```javascript
const CONFIG = {
  keyword: 'điện thoại',  // Từ khóa tìm kiếm
  limit: 50,              // Số sản phẩm (max 60)
  newest: 0,              // 0 = liên quan, 1 = mới nhất
  page: 0,                // Trang số (0, 1, 2, ...)
};
```

**Ưu điểm:**
- ✅ Không cần cài Puppeteer
- ✅ Chạy nhanh
- ✅ Không cần browser
- ✅ Dễ sử dụng

**Nhược điểm:**
- ❌ API không chính thức, có thể thay đổi
- ❌ Ít thông tin chi tiết hơn

---

## 🌐 Cách 2: Sử dụng Puppeteer (Đầy đủ)

### Bước 1: Cài đặt Puppeteer

```bash
cd scripts
npm install
```

Hoặc:

```bash
npm install puppeteer
```

### Bước 2: Chạy crawler

```bash
node scripts/shopee-crawler.js
```

Browser sẽ tự động mở và crawl data.

### Bước 3: Kiểm tra kết quả

File sẽ được lưu tại:
- `data/shopee-products.json` - Dữ liệu đã format
- `data/shopee-products-raw.json` - Dữ liệu thô

### Tùy chỉnh

Mở file `scripts/shopee-crawler.js` và sửa:

```javascript
const CONFIG = {
  headless: false,           // true = không hiện browser
  delay: 2000,               // Delay giữa requests (ms)
  maxProducts: 20,           // Số sản phẩm tối đa
  searchKeyword: 'điện thoại', // Từ khóa
};
```

**Ưu điểm:**
- ✅ Crawl được nhiều thông tin hơn
- ✅ Giống người dùng thật
- ✅ Có thể xử lý JavaScript

**Nhược điểm:**
- ❌ Cần cài Puppeteer (tốn dung lượng)
- ❌ Chạy chậm hơn
- ❌ Tốn tài nguyên

---

## 🔀 Merge Data Vào Website

### Merge tự động

```bash
node scripts/merge-products.js
```

Script sẽ:
1. Đọc data từ `data/shopee-products.json`
2. Merge với `data/products.json` hiện tại
3. Loại bỏ duplicate
4. Backup file cũ
5. Lưu file mới

### Restore từ backup

Nếu merge bị lỗi:

```bash
node scripts/merge-products.js --restore
```

### Merge thủ công

Mở `data/shopee-products.json` và copy sản phẩm vào `data/products.json`:

```json
[
  // Sản phẩm cũ
  { "id": "1", "name": "iPhone 15", ... },
  
  // Thêm sản phẩm từ Shopee
  { "id": "shopee-1", "name": "Samsung S24", ... }
]
```

---

## 📊 Cấu Trúc Dữ Liệu

```json
{
  "id": "shopee-123456-789",
  "name": "iPhone 15 Pro Max 256GB",
  "brand": "Apple",
  "price": 29990000,
  "originalPrice": 34990000,
  "image": "https://cf.shopee.vn/file/...",
  "rating": 4.9,
  "reviews": 1234,
  "specs": {
    "screen": "N/A",
    "cpu": "N/A",
    "ram": "8GB",
    "storage": "256GB",
    "battery": "N/A",
    "camera": "N/A"
  },
  "colors": ["Đen", "Trắng"],
  "inStock": true,
  "isHot": true,
  "discount": 14,
  "shopeeLink": "https://shopee.vn/product/..."
}
```

---

## 🛠️ Xử Lý Lỗi

### Lỗi: "Cannot find module 'puppeteer'"

```bash
cd scripts
npm install puppeteer
```

### Lỗi: "No products found"

- Kiểm tra từ khóa tìm kiếm
- Shopee có thể đã thay đổi API
- Thử với từ khóa khác

### Lỗi: Timeout

- Tăng delay trong CONFIG
- Kiểm tra kết nối internet
- Shopee có thể đang chặn

### Lỗi: "Failed to launch browser" (Linux)

```bash
sudo apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libdrm2 \
  libxkbcommon0 \
  libgbm1 \
  libasound2
```

---

## 💡 Tips Để Tránh Bị Block

### 1. Tăng delay giữa requests

```javascript
delay: 5000  // 5 giây
```

### 2. Giảm số lượng sản phẩm

```javascript
maxProducts: 10
```

### 3. Crawl vào giờ thấp điểm

- Đêm khuya (1-5 giờ sáng)
- Sáng sớm (6-8 giờ)

### 4. Không crawl quá nhiều lần

- Tối đa 2-3 lần/ngày
- Chờ ít nhất 1 giờ giữa các lần

### 5. Sử dụng VPN (nếu cần)

Nếu bị block IP, dùng VPN để đổi IP.

---

## 📝 Workflow Khuyến Nghị

### Lần đầu tiên

```bash
# 1. Crawl data từ Shopee
node scripts/shopee-api-crawler.js

# 2. Kiểm tra data
cat data/shopee-products.json

# 3. Merge vào website
node scripts/merge-products.js

# 4. Kiểm tra website
npm run dev
```

### Cập nhật định kỳ

```bash
# 1. Backup data hiện tại
cp data/products.json data/products.backup.json

# 2. Crawl data mới
node scripts/shopee-api-crawler.js

# 3. Merge
node scripts/merge-products.js

# 4. Nếu có vấn đề, restore
node scripts/merge-products.js --restore
```

---

## 🎯 Các Từ Khóa Hay Dùng

```javascript
// Điện thoại
'điện thoại'
'iphone'
'samsung galaxy'
'xiaomi'
'oppo'
'vivo'

// Theo giá
'điện thoại dưới 5 triệu'
'điện thoại giá rẻ'
'điện thoại cao cấp'

// Theo tính năng
'điện thoại chụp ảnh đẹp'
'điện thoại pin khủng'
'điện thoại gaming'
```

---

## 🔧 Nâng Cao

### Crawl nhiều trang

```javascript
// Trong shopee-api-crawler.js
for (let page = 0; page < 5; page++) {
  CONFIG.page = page;
  await crawlShopeeAPI();
  await delay(5000); // Chờ 5 giây giữa các trang
}
```

### Crawl nhiều từ khóa

```javascript
const keywords = ['iphone', 'samsung', 'xiaomi'];

for (const keyword of keywords) {
  CONFIG.keyword = keyword;
  await crawlShopeeAPI();
  await delay(10000); // Chờ 10 giây
}
```

### Lọc theo giá

```javascript
// Sau khi crawl, lọc sản phẩm
const filtered = products.filter(p => 
  p.price >= 5000000 && p.price <= 15000000
);
```

### Lọc theo rating

```javascript
const highRated = products.filter(p => p.rating >= 4.5);
```

---

## 🚨 Lưu Ý Pháp Lý

1. **Đọc Terms of Service** của Shopee
2. **Không sử dụng cho mục đích thương mại** trái phép
3. **Tôn trọng robots.txt**
4. **Không crawl quá nhiều, quá nhanh**
5. **Cân nhắc sử dụng API chính thức**: https://open.shopee.com/

---

## 🆘 Hỗ Trợ

### Debug mode

```javascript
// Bật để xem browser hoạt động
const CONFIG = {
  headless: false,
};
```

### Xem log chi tiết

```bash
node scripts/shopee-crawler.js 2>&1 | tee crawler.log
```

### Kiểm tra API response

```bash
cat data/shopee-api-raw.json | jq .
```

---

## 📚 Tài Liệu Tham Khảo

- [Puppeteer Documentation](https://pptr.dev/)
- [Shopee Open Platform](https://open.shopee.com/)
- [Web Scraping Best Practices](https://www.scrapehero.com/web-scraping-best-practices/)

---

## ✅ Checklist

- [ ] Đã cài Node.js (>= 16)
- [ ] Đã cài Puppeteer (nếu dùng cách 2)
- [ ] Đã đọc và hiểu lưu ý pháp lý
- [ ] Đã test với số lượng nhỏ trước
- [ ] Đã backup data hiện tại
- [ ] Đã kiểm tra kết quả sau khi crawl
- [ ] Đã test website sau khi merge

---

**Chúc bạn crawl data thành công! 🎉**
