# 📜 Thông Tin Các Scripts

## 📁 Danh Sách Files

```
scripts/
├── shopee-api-crawler.js      # Crawler sử dụng API (Khuyến nghị)
├── shopee-crawler.js           # Crawler sử dụng Puppeteer
├── merge-products.js           # Merge data vào website
├── quick-start.sh              # Script tự động (menu)
├── package.json                # Dependencies
└── README.md                   # Hướng dẫn chi tiết
```

---

## 🚀 Scripts Chính

### 1. shopee-api-crawler.js ⭐ (Khuyến nghị)

**Mô tả**: Crawl data từ Shopee sử dụng API không chính thức

**Ưu điểm**:
- ✅ Không cần cài Puppeteer
- ✅ Chạy nhanh (< 5 giây)
- ✅ Không cần browser
- ✅ Dễ sử dụng

**Cách dùng**:
```bash
node scripts/shopee-api-crawler.js
```

**Output**:
- `data/shopee-products.json` - Data đã format
- `data/shopee-api-raw.json` - Data thô từ API

**Tùy chỉnh**:
```javascript
const CONFIG = {
  keyword: 'điện thoại',  // Từ khóa
  limit: 50,              // Số sản phẩm (max 60)
  newest: 0,              // 0 = liên quan, 1 = mới nhất
  page: 0,                // Trang (0, 1, 2, ...)
};
```

---

### 2. shopee-crawler.js

**Mô tả**: Crawl data sử dụng Puppeteer (headless browser)

**Ưu điểm**:
- ✅ Crawl được nhiều thông tin hơn
- ✅ Giống người dùng thật
- ✅ Xử lý được JavaScript

**Nhược điểm**:
- ❌ Cần cài Puppeteer (~300MB)
- ❌ Chạy chậm hơn (30-60 giây)
- ❌ Tốn tài nguyên

**Cài đặt**:
```bash
npm install puppeteer
```

**Cách dùng**:
```bash
node scripts/shopee-crawler.js
```

**Output**:
- `data/shopee-products.json` - Data đã format
- `data/shopee-products-raw.json` - Data thô

**Tùy chỉnh**:
```javascript
const CONFIG = {
  headless: false,           // true = không hiện browser
  delay: 2000,               // Delay (ms)
  maxProducts: 20,           // Số sản phẩm
  searchKeyword: 'điện thoại',
};
```

---

### 3. merge-products.js

**Mô tả**: Merge data từ Shopee vào website

**Chức năng**:
- Đọc `data/shopee-products.json`
- Merge với `data/products.json`
- Loại bỏ duplicate (tên + giá tương tự)
- Backup file cũ
- Lưu file mới

**Cách dùng**:
```bash
# Merge
node scripts/merge-products.js

# Restore từ backup
node scripts/merge-products.js --restore

# Help
node scripts/merge-products.js --help
```

**Output**:
- `data/products.json` - File mới (merged)
- `data/products.backup.json` - Backup file cũ

---

### 4. quick-start.sh

**Mô tả**: Script tự động với menu tương tác

**Cách dùng**:
```bash
cd scripts
./quick-start.sh
```

**Menu**:
1. API Crawler (Nhanh)
2. Puppeteer Crawler (Đầy đủ)
3. Merge data
4. Restore backup
5. Thoát

---

## 📊 Workflow Khuyến Nghị

### Lần đầu tiên

```bash
# 1. Crawl data
node scripts/shopee-api-crawler.js

# 2. Kiểm tra
cat data/shopee-products.json | head -50

# 3. Merge vào website
node scripts/merge-products.js

# 4. Test website
cd ..
npm run dev
```

### Cập nhật định kỳ

```bash
# 1. Crawl data mới
node scripts/shopee-api-crawler.js

# 2. Merge (tự động backup)
node scripts/merge-products.js

# 3. Nếu có vấn đề
node scripts/merge-products.js --restore
```

---

## 🎯 Use Cases

### Crawl theo từ khóa cụ thể

```javascript
// Sửa trong shopee-api-crawler.js
const CONFIG = {
  keyword: 'iphone 15 pro max',
  limit: 60,
};
```

### Crawl nhiều trang

```javascript
// Thêm vào cuối file
for (let page = 0; page < 5; page++) {
  CONFIG.page = page;
  await crawlShopeeAPI();
  await new Promise(r => setTimeout(r, 5000)); // Delay 5s
}
```

### Crawl nhiều từ khóa

```javascript
const keywords = ['iphone', 'samsung', 'xiaomi'];

for (const keyword of keywords) {
  CONFIG.keyword = keyword;
  await crawlShopeeAPI();
  await new Promise(r => setTimeout(r, 10000)); // Delay 10s
}
```

### Lọc theo giá

```javascript
// Sau khi crawl
const filtered = products.filter(p => 
  p.price >= 5000000 && p.price <= 15000000
);
```

### Lọc theo rating

```javascript
const highRated = products.filter(p => p.rating >= 4.5);
```

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find module"

```bash
cd scripts
npm install
```

### Lỗi: "No products found"

- Kiểm tra từ khóa
- Shopee có thể đã thay đổi API
- Thử với từ khóa khác

### Lỗi: Timeout

- Tăng delay
- Kiểm tra internet
- Shopee có thể đang chặn

### Lỗi: "Failed to launch browser"

```bash
# Linux
sudo apt-get install -y libnss3 libatk-bridge2.0-0

# macOS
brew install chromium
```

---

## 💡 Tips

### Tránh bị block

1. **Tăng delay**: `delay: 5000` (5 giây)
2. **Giảm số lượng**: `maxProducts: 10`
3. **Crawl giờ thấp điểm**: 1-5 giờ sáng
4. **Không crawl quá nhiều**: Max 2-3 lần/ngày

### Tối ưu performance

1. **Dùng API crawler** thay vì Puppeteer
2. **Crawl ít sản phẩm** mỗi lần
3. **Cache data** để không phải crawl lại

### Debug

```bash
# Xem log chi tiết
node scripts/shopee-crawler.js 2>&1 | tee crawler.log

# Kiểm tra JSON
cat data/shopee-products.json | jq .

# Đếm số sản phẩm
cat data/shopee-products.json | jq '. | length'
```

---

## 📈 Thống Kê

### Thời gian chạy

- **API Crawler**: 3-5 giây
- **Puppeteer Crawler**: 30-60 giây
- **Merge**: 1-2 giây

### Dung lượng

- **Puppeteer**: ~300MB
- **Data output**: ~50-200KB/50 sản phẩm

### Rate Limits

- **Shopee API**: ~60 sản phẩm/request
- **Khuyến nghị**: Max 5 requests/phút

---

## 🚨 Lưu Ý Quan Trọng

1. ⚠️ **Chỉ dùng cho học tập/nghiên cứu**
2. ⚠️ **Có thể vi phạm ToS của Shopee**
3. ⚠️ **Tôn trọng rate limits**
4. ⚠️ **Không sử dụng thương mại trái phép**
5. ⚠️ **API có thể thay đổi bất cứ lúc nào**

---

## 📚 Tài Liệu Liên Quan

- [HUONG_DAN_CRAWL_SHOPEE.md](../HUONG_DAN_CRAWL_SHOPEE.md) - Hướng dẫn chi tiết
- [README.md](./README.md) - Hướng dẫn kỹ thuật
- [Puppeteer Docs](https://pptr.dev/)
- [Shopee Open Platform](https://open.shopee.com/)

---

## 🆘 Hỗ Trợ

Nếu gặp vấn đề:

1. Đọc [HUONG_DAN_CRAWL_SHOPEE.md](../HUONG_DAN_CRAWL_SHOPEE.md)
2. Kiểm tra phiên bản Node.js: `node -v` (cần >= 16)
3. Xem log lỗi chi tiết
4. Kiểm tra kết nối internet
5. Thử với số lượng nhỏ hơn

---

**Happy Crawling! 🕷️**
