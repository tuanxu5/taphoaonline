# Shopee Product Crawler

Script để crawl dữ liệu sản phẩm từ Shopee.

## ⚠️ Lưu ý quan trọng

- Script này chỉ dành cho mục đích học tập và nghiên cứu
- Việc crawl dữ liệu có thể vi phạm Terms of Service của Shopee
- Shopee có các biện pháp chống crawl (rate limiting, CAPTCHA, IP blocking)
- Sử dụng với trách nhiệm và tôn trọng rate limits
- Nên sử dụng API chính thức nếu có thể

## Cài đặt

### 1. Cài đặt Puppeteer

```bash
npm install puppeteer
```

Hoặc nếu muốn dùng Chrome đã cài sẵn:

```bash
npm install puppeteer-core
```

### 2. Kiểm tra cài đặt

```bash
node -v  # Cần Node.js >= 16
```

## Sử dụng

### Chạy crawler cơ bản

```bash
node scripts/shopee-crawler.js
```

### Tùy chỉnh trong file

Mở file `shopee-crawler.js` và chỉnh sửa phần CONFIG:

```javascript
const CONFIG = {
  headless: false,           // true = không hiện browser
  delay: 2000,               // Delay giữa các request (ms)
  maxProducts: 20,           // Số sản phẩm tối đa
  searchKeyword: 'điện thoại', // Từ khóa tìm kiếm
};
```

## Output

Script sẽ tạo 2 file trong thư mục `data/`:

1. **shopee-products.json** - Dữ liệu đã format theo cấu trúc của website
2. **shopee-products-raw.json** - Dữ liệu thô từ Shopee

## Cấu trúc dữ liệu output

```json
{
  "id": "shopee-1234567890-1",
  "name": "iPhone 15 Pro Max 256GB",
  "brand": "Apple",
  "price": 29990000,
  "originalPrice": 34990000,
  "image": "https://...",
  "rating": 4.9,
  "reviews": 1234,
  "specs": {
    "screen": "N/A",
    "cpu": "N/A",
    "ram": "N/A",
    "storage": "N/A",
    "battery": "N/A",
    "camera": "N/A"
  },
  "colors": ["Đen", "Trắng"],
  "inStock": true,
  "isHot": true,
  "discount": 14,
  "shopeeLink": "https://shopee.vn/..."
}
```

## Xử lý lỗi thường gặp

### 1. Lỗi "Cannot find module 'puppeteer'"

```bash
npm install puppeteer
```

### 2. Lỗi timeout

- Tăng timeout trong code
- Kiểm tra kết nối internet
- Shopee có thể đang chặn request

### 3. Không crawl được data

- Shopee có thể đã thay đổi cấu trúc HTML
- Cần update CSS selectors trong code
- Có thể bị CAPTCHA hoặc IP block

### 4. Lỗi "Failed to launch browser"

Trên Linux, cài thêm dependencies:

```bash
sudo apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libdrm2 \
  libxkbcommon0 \
  libgbm1 \
  libasound2
```

## Tips để tránh bị block

1. **Tăng delay giữa các request**
   ```javascript
   delay: 5000  // 5 giây
   ```

2. **Giảm số lượng sản phẩm crawl**
   ```javascript
   maxProducts: 10
   ```

3. **Sử dụng proxy** (nâng cao)
   ```javascript
   await page.authenticate({
     username: 'proxy-user',
     password: 'proxy-pass'
   });
   ```

4. **Random user agent**
   ```javascript
   const userAgents = [
     'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
   ];
   await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
   ```

5. **Crawl vào giờ thấp điểm** (đêm khuya, sáng sớm)

## Sử dụng data đã crawl

### Import vào website

```javascript
// lib/products.ts
import shopeeProducts from '@/data/shopee-products.json';

export function getShopeeProducts() {
  return shopeeProducts;
}
```

### Merge với data hiện tại

```javascript
import currentProducts from '@/data/products.json';
import shopeeProducts from '@/data/shopee-products.json';

const allProducts = [...currentProducts, ...shopeeProducts];
```

## Phát triển thêm

### Crawl chi tiết sản phẩm

Để lấy thông số kỹ thuật chi tiết, cần crawl từng trang sản phẩm:

```javascript
async function crawlProductDetail(url) {
  const page = await browser.newPage();
  await page.goto(url);
  
  const specs = await page.evaluate(() => {
    // Extract detailed specs from product page
    return {
      screen: '...',
      cpu: '...',
      ram: '...',
      // ...
    };
  });
  
  return specs;
}
```

### Crawl nhiều trang

```javascript
for (let pageNum = 1; pageNum <= 5; pageNum++) {
  const url = `https://shopee.vn/search?keyword=điện+thoại&page=${pageNum}`;
  // Crawl each page
}
```

### Lưu vào database

```javascript
// Thay vì lưu JSON, lưu vào MongoDB/PostgreSQL
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.db('ecommerce').collection('products').insertMany(products);
```

## Giải pháp thay thế

### 1. Sử dụng Shopee Open Platform API (Khuyến nghị)

- Đăng ký tại: https://open.shopee.com/
- API chính thức, hợp pháp
- Có rate limit rõ ràng
- Dữ liệu chính xác và đầy đủ

### 2. Sử dụng dịch vụ crawl có sẵn

- ScraperAPI
- Bright Data
- Apify

### 3. Mua dataset có sẵn

- Kaggle
- Data marketplaces

## Troubleshooting

### Debug mode

Bật headless: false để xem browser hoạt động:

```javascript
const CONFIG = {
  headless: false,  // Sẽ hiện browser
};
```

### Screenshot khi lỗi

```javascript
await page.screenshot({ path: 'error.png' });
```

### Log HTML

```javascript
const html = await page.content();
console.log(html);
```

## Legal & Ethics

- Đọc và tuân thủ Terms of Service của Shopee
- Không crawl quá nhiều, quá nhanh
- Không sử dụng data cho mục đích thương mại trái phép
- Tôn trọng robots.txt
- Cân nhắc sử dụng API chính thức

## Liên hệ & Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Phiên bản Node.js và Puppeteer
2. Cấu trúc HTML của Shopee có thay đổi không
3. Có bị CAPTCHA hoặc IP block không
4. Log lỗi chi tiết để debug
