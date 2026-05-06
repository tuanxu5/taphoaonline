# 🕷️ Giải Pháp Crawl Data Sản Phẩm

## ⚠️ Vấn Đề: API Shopee Đã Thay Đổi

API không chính thức của Shopee đã thay đổi và yêu cầu authentication. Dưới đây là các giải pháp thay thế:

---

## 🎯 Giải Pháp 1: Sử Dụng Sample Data (Nhanh Nhất)

### Tạo data mẫu ngay lập tức

```bash
node scripts/create-sample-data.js
```

**Kết quả:**
- ✅ 12 sản phẩm mẫu chất lượng cao
- ✅ Đầy đủ thông tin (giá, specs, hình ảnh)
- ✅ Nhiều thương hiệu: Apple, Samsung, Xiaomi, OPPO, Vivo, Google, Realme, OnePlus
- ✅ Giá từ 7.9 triệu đến 35.9 triệu
- ✅ Sẵn sàng sử dụng ngay

**Sau đó merge vào website:**

```bash
node scripts/merge-products.js
```

---

## 🌐 Giải Pháp 2: Puppeteer Crawler (Khuyến Nghị)

### Bước 1: Cài Puppeteer

```bash
npm install puppeteer
```

### Bước 2: Chạy crawler

```bash
node scripts/shopee-simple-crawler.js
```

**Ưu điểm:**
- ✅ Crawl được data thật từ Shopee
- ✅ Không cần API key
- ✅ Tự động xử lý JavaScript
- ✅ Có screenshot để debug

**Lưu ý:**
- Cần cài Puppeteer (~300MB)
- Chạy chậm hơn (30-60 giây)
- Có thể bị CAPTCHA nếu crawl quá nhiều

---

## 🔧 Giải Pháp 3: Crawl Thủ Công

### Cách làm:

1. **Mở Shopee.vn** và tìm sản phẩm
2. **Copy thông tin** vào file JSON
3. **Sử dụng template** dưới đây:

```json
{
  "id": "custom-1",
  "name": "iPhone 15 Pro Max 256GB",
  "brand": "Apple",
  "price": 29990000,
  "originalPrice": 34990000,
  "image": "URL_HÌNH_ẢNH",
  "rating": 4.9,
  "reviews": 1234,
  "specs": {
    "screen": "6.7\" Super Retina XDR",
    "cpu": "Apple A17 Pro",
    "ram": "8GB",
    "storage": "256GB",
    "battery": "4422mAh",
    "camera": "48MP + 12MP + 12MP"
  },
  "colors": ["Đen", "Trắng", "Xanh"],
  "inStock": true,
  "isHot": true,
  "discount": 14
}
```

4. **Lưu vào** `data/shopee-products.json`
5. **Merge:** `node scripts/merge-products.js`

---

## 📊 So Sánh Các Giải Pháp

| Giải Pháp | Thời Gian | Độ Khó | Data Thật | Khuyến Nghị |
|-----------|-----------|--------|-----------|-------------|
| **Sample Data** | 1 giây | ⭐ Dễ | ❌ Không | ⭐⭐⭐⭐⭐ Tốt nhất để bắt đầu |
| **Puppeteer** | 30-60s | ⭐⭐ Trung bình | ✅ Có | ⭐⭐⭐⭐ Tốt cho production |
| **Thủ công** | 5-10 phút | ⭐ Dễ | ✅ Có | ⭐⭐⭐ Tốt cho ít sản phẩm |
| **API (cũ)** | 3-5s | ⭐ Dễ | ✅ Có | ❌ Không hoạt động |

---

## 🚀 Workflow Khuyến Nghị

### Cho Development (Phát triển)

```bash
# 1. Tạo sample data
node scripts/create-sample-data.js

# 2. Merge vào website
node scripts/merge-products.js

# 3. Test
npm run dev
```

### Cho Production (Thực tế)

```bash
# 1. Cài Puppeteer
npm install puppeteer

# 2. Crawl data thật
node scripts/shopee-simple-crawler.js

# 3. Kiểm tra data
cat data/shopee-products.json

# 4. Merge
node scripts/merge-products.js

# 5. Deploy
npm run build
```

---

## 💡 Tips & Tricks

### 1. Kết hợp nhiều nguồn

```bash
# Tạo base data từ sample
node scripts/create-sample-data.js

# Thêm data thật từ Puppeteer
node scripts/shopee-simple-crawler.js

# Merge tất cả
node scripts/merge-products.js
```

### 2. Tùy chỉnh sample data

Mở `scripts/create-sample-data.js` và sửa:

```javascript
const sampleProducts = [
  {
    id: "custom-1",
    name: "Sản phẩm của bạn",
    price: 10000000,
    // ... thông tin khác
  }
];
```

### 3. Crawl từ nhiều từ khóa

```bash
# Sửa CONFIG trong shopee-simple-crawler.js
searchKeyword: 'iphone 15'
# Chạy
node scripts/shopee-simple-crawler.js

# Đổi keyword
searchKeyword: 'samsung s24'
# Chạy lại
node scripts/shopee-simple-crawler.js
```

### 4. Lấy hình ảnh từ Unsplash

Thay vì crawl, dùng hình ảnh chất lượng cao từ Unsplash:

```
https://images.unsplash.com/photo-[ID]?w=500&q=80
```

Tìm hình điện thoại tại: https://unsplash.com/s/photos/smartphone

---

## 🔍 Debug & Troubleshooting

### Puppeteer không crawl được

```bash
# Chạy với headless: false để xem browser
# Sửa trong shopee-simple-crawler.js:
headless: false

# Chạy lại
node scripts/shopee-simple-crawler.js
```

### Kiểm tra screenshot

Nếu crawler không tìm thấy sản phẩm, nó sẽ tự động chụp màn hình:

```bash
open data/shopee-debug.png
```

### Xem cấu trúc HTML

```javascript
// Thêm vào shopee-simple-crawler.js
const html = await page.content();
fs.writeFileSync('data/page.html', html);
```

---

## 📝 Checklist

### Trước khi bắt đầu

- [ ] Đã cài Node.js (>= 16)
- [ ] Đã chạy `npm install` trong thư mục chính
- [ ] Đã đọc hướng dẫn này

### Chọn giải pháp

- [ ] **Sample Data**: Nhanh, dễ, cho development
- [ ] **Puppeteer**: Chậm hơn, data thật, cho production
- [ ] **Thủ công**: Ít sản phẩm, cần data chính xác

### Sau khi crawl

- [ ] Kiểm tra file `data/shopee-products.json`
- [ ] Backup data hiện tại: `cp data/products.json data/products.backup.json`
- [ ] Merge data: `node scripts/merge-products.js`
- [ ] Test website: `npm run dev`
- [ ] Kiểm tra sản phẩm hiển thị đúng

---

## 🎓 Học Thêm

### Tại sao API không hoạt động?

Shopee đã thêm các biện pháp bảo mật:
- Rate limiting
- Authentication tokens
- CAPTCHA
- IP blocking

### Giải pháp chính thức

Sử dụng **Shopee Open Platform API**:
- Đăng ký tại: https://open.shopee.com/
- Cần business account
- Có rate limits rõ ràng
- Hợp pháp và ổn định

### Các nguồn data khác

1. **Tự tạo**: Tốt nhất cho control
2. **Kaggle**: Dataset có sẵn
3. **API công khai**: Fake Store API, DummyJSON
4. **Web scraping services**: ScraperAPI, Bright Data

---

## 🆘 Cần Hỗ Trợ?

### Lỗi thường gặp

**"Cannot find module 'puppeteer'"**
```bash
npm install puppeteer
```

**"No products found"**
- Shopee đã thay đổi HTML
- Dùng sample data thay thế
- Hoặc crawl thủ công

**"Failed to launch browser"**
```bash
# macOS
brew install chromium

# Linux
sudo apt-get install chromium-browser
```

### Debug steps

1. Chạy với `headless: false`
2. Xem screenshot: `data/shopee-debug.png`
3. Kiểm tra console logs
4. Thử với sample data trước

---

## ✅ Kết Luận

**Khuyến nghị:**

1. **Bắt đầu với Sample Data** - Nhanh nhất, dễ nhất
2. **Sau đó dùng Puppeteer** - Khi cần data thật
3. **Hoặc nhập thủ công** - Cho data chính xác nhất

**Lưu ý:**
- Crawling có thể vi phạm ToS
- Chỉ dùng cho học tập/nghiên cứu
- Tôn trọng rate limits
- Cân nhắc API chính thức cho production

---

**Chúc bạn thành công! 🎉**
