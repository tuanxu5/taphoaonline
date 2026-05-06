/**
 * Create Multi-Category Product Data
 * 
 * Tạo data cho nhiều danh mục: Điện thoại, Laptop, Mỹ phẩm, Giày dép, Quần áo
 */

const fs = require('fs');

const products = [
  // ========== ĐIỆN THOẠI ==========
  {
    id: "phone-1",
    name: "iPhone 15 Pro Max 256GB - Chính hãng VN/A",
    brand: "Apple",
    category: "phone",
    price: 29990000,
    originalPrice: 34990000,
    image: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/1.png",
    rating: 4.9,
    reviews: 2341,
    specs: {
      screen: "6.7\" Super Retina XDR",
      cpu: "Apple A17 Pro",
      ram: "8GB",
      storage: "256GB",
      battery: "4422mAh",
      camera: "48MP + 12MP + 12MP"
    },
    colors: ["Titan Tự Nhiên", "Titan Xanh", "Titan Trắng", "Titan Đen"],
    inStock: true,
    isHot: true,
    discount: 14
  },
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra 12GB 256GB",
    brand: "Samsung",
    category: "phone",
    price: 26990000,
    originalPrice: 31990000,
    image: "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S23/1.png",
    rating: 4.8,
    reviews: 1876,
    specs: {
      screen: "6.8\" Dynamic AMOLED 2X",
      cpu: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      battery: "5000mAh",
      camera: "200MP + 50MP + 12MP + 10MP"
    },
    colors: ["Titan Xám", "Titan Đen", "Titan Tím"],
    inStock: true,
    isHot: true,
    discount: 16
  },
  {
    id: "phone-3",
    name: "Xiaomi 14 Ultra 16GB 512GB",
    brand: "Xiaomi",
    category: "phone",
    price: 24990000,
    originalPrice: 29990000,
    image: "https://cdn.dummyjson.com/products/images/smartphones/Xiaomi%2012%20Pro/1.png",
    rating: 4.7,
    reviews: 1234,
    specs: {
      screen: "6.73\" AMOLED",
      cpu: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      battery: "5000mAh",
      camera: "50MP Quad Camera"
    },
    colors: ["Đen", "Trắng", "Xanh"],
    inStock: true,
    isHot: true,
    discount: 17
  },
  {
    id: "phone-4",
    name: "OPPO Find X7 Ultra 16GB 512GB",
    brand: "OPPO",
    category: "phone",
    price: 22990000,
    originalPrice: 26990000,
    image: "https://cdn.dummyjson.com/products/images/smartphones/OPPO%20F19%20Pro%20Plus/1.png",
    rating: 4.6,
    reviews: 987,
    specs: {
      screen: "6.82\" AMOLED",
      cpu: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      battery: "5000mAh",
      camera: "50MP Quad Camera"
    },
    colors: ["Đen", "Nâu"],
    inStock: true,
    discount: 15
  },

  // ========== LAPTOP ==========
  {
    id: "laptop-1",
    name: "MacBook Pro 14 M3 Pro 18GB 512GB",
    brand: "Apple",
    category: "laptop",
    price: 52990000,
    originalPrice: 59990000,
    image: "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png",
    rating: 4.9,
    reviews: 543,
    specs: {
      screen: "14.2\" Liquid Retina XDR",
      cpu: "Apple M3 Pro 11-core",
      ram: "18GB",
      storage: "512GB SSD",
      battery: "70Wh",
      camera: "1080p FaceTime HD"
    },
    colors: ["Space Grey", "Silver"],
    inStock: true,
    isHot: true,
    discount: 12
  },
  {
    id: "laptop-2",
    name: "Dell XPS 15 9530 i7-13700H 16GB 512GB RTX 4050",
    brand: "Dell",
    category: "laptop",
    price: 42990000,
    originalPrice: 49990000,
    image: "https://cdn.dummyjson.com/products/images/laptops/Dell%20Inspiron%2015/1.png",
    rating: 4.7,
    reviews: 432,
    specs: {
      screen: "15.6\" FHD+ OLED",
      cpu: "Intel Core i7-13700H",
      ram: "16GB",
      storage: "512GB SSD",
      battery: "86Wh",
      camera: "720p HD"
    },
    colors: ["Platinum Silver"],
    inStock: true,
    discount: 14
  },
  {
    id: "laptop-3",
    name: "ASUS ROG Strix G16 i7-13650HX RTX 4060 16GB 512GB",
    brand: "ASUS",
    category: "laptop",
    price: 35990000,
    originalPrice: 42990000,
    image: "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen/1.png",
    rating: 4.8,
    reviews: 654,
    specs: {
      screen: "16\" FHD+ 165Hz",
      cpu: "Intel Core i7-13650HX",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      battery: "90Wh",
      camera: "720p HD"
    },
    colors: ["Eclipse Gray"],
    inStock: true,
    isHot: true,
    discount: 16
  },
  {
    id: "laptop-4",
    name: "Lenovo ThinkPad X1 Carbon Gen 11 i7 16GB 512GB",
    brand: "Lenovo",
    category: "laptop",
    price: 38990000,
    originalPrice: 44990000,
    image: "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/1.png",
    rating: 4.6,
    reviews: 321,
    specs: {
      screen: "14\" WUXGA IPS",
      cpu: "Intel Core i7-1355U",
      ram: "16GB",
      storage: "512GB SSD",
      battery: "57Wh",
      camera: "1080p FHD"
    },
    colors: ["Black"],
    inStock: true,
    discount: 13
  },

  // ========== MỸ PHẨM ==========
  {
    id: "cosmetics-1",
    name: "Serum Vitamin C Some By Mi 30ml - Dưỡng Sáng Da",
    brand: "Some By Mi",
    category: "cosmetics",
    price: 389000,
    originalPrice: 489000,
    image: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    rating: 4.8,
    reviews: 2341,
    specs: {
      screen: "Dung tích: 30ml",
      cpu: "Xuất xứ: Hàn Quốc",
      ram: "HSD: 3 năm",
      storage: "Thành phần: Vitamin C",
      battery: "Công dụng: Dưỡng sáng",
      camera: "Phù hợp: Mọi loại da"
    },
    colors: ["Vàng"],
    inStock: true,
    isHot: true,
    discount: 20
  },
  {
    id: "cosmetics-2",
    name: "Kem Chống Nắng Anessa Perfect UV 60ml SPF50+",
    brand: "Anessa",
    category: "cosmetics",
    price: 549000,
    originalPrice: 649000,
    image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
    rating: 4.9,
    reviews: 3210,
    specs: {
      screen: "Dung tích: 60ml",
      cpu: "Xuất xứ: Nhật Bản",
      ram: "HSD: 3 năm",
      storage: "SPF: 50+ PA++++",
      battery: "Chống nước",
      camera: "Phù hợp: Mọi loại da"
    },
    colors: ["Vàng Gold"],
    inStock: true,
    isHot: true,
    discount: 15
  },
  {
    id: "cosmetics-3",
    name: "Son Kem Lì 3CE Velvet Lip Tint - Màu Đỏ Cam",
    brand: "3CE",
    category: "cosmetics",
    price: 299000,
    originalPrice: 399000,
    image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
    rating: 4.7,
    reviews: 1876,
    specs: {
      screen: "Dung tích: 4g",
      cpu: "Xuất xứ: Hàn Quốc",
      ram: "HSD: 3 năm",
      storage: "Màu: Đỏ Cam",
      battery: "Lì mịn",
      camera: "Lâu trôi 12h"
    },
    colors: ["Đỏ Cam", "Hồng Nude", "Đỏ Gạch"],
    inStock: true,
    discount: 25
  },
  {
    id: "cosmetics-4",
    name: "Sữa Rửa Mặt Cetaphil Gentle Skin Cleanser 500ml",
    brand: "Cetaphil",
    category: "cosmetics",
    price: 349000,
    originalPrice: 429000,
    image: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
    rating: 4.8,
    reviews: 2543,
    specs: {
      screen: "Dung tích: 500ml",
      cpu: "Xuất xứ: Canada",
      ram: "HSD: 3 năm",
      storage: "Dịu nhẹ",
      battery: "Không xà phòng",
      camera: "Da nhạy cảm"
    },
    colors: ["Trắng"],
    inStock: true,
    discount: 19
  },

  // ========== GIÀY DÉP ==========
  {
    id: "shoes-1",
    name: "Giày Nike Air Force 1 '07 - Trắng Full",
    brand: "Nike",
    category: "shoes",
    price: 2990000,
    originalPrice: 3490000,
    image: "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.png",
    rating: 4.9,
    reviews: 3421,
    specs: {
      screen: "Size: 36-44",
      cpu: "Chất liệu: Da tổng hợp",
      ram: "Đế: Cao su",
      storage: "Xuất xứ: Vietnam",
      battery: "Bảo hành: 6 tháng",
      camera: "Phong cách: Thể thao"
    },
    colors: ["Trắng", "Đen", "Trắng Đen"],
    inStock: true,
    isHot: true,
    discount: 14
  },
  {
    id: "shoes-2",
    name: "Giày Adidas Ultraboost 23 - Đen Trắng",
    brand: "Adidas",
    category: "shoes",
    price: 4290000,
    originalPrice: 4990000,
    image: "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/1.png",
    rating: 4.8,
    reviews: 2134,
    specs: {
      screen: "Size: 36-45",
      cpu: "Chất liệu: Primeknit",
      ram: "Đế: Boost",
      storage: "Xuất xứ: Vietnam",
      battery: "Bảo hành: 6 tháng",
      camera: "Phong cách: Chạy bộ"
    },
    colors: ["Đen Trắng", "Xám", "Xanh Navy"],
    inStock: true,
    isHot: true,
    discount: 14
  },
  {
    id: "shoes-3",
    name: "Dép Adidas Adilette Comfort - Đen Logo Trắng",
    brand: "Adidas",
    category: "shoes",
    price: 890000,
    originalPrice: 1090000,
    image: "https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/1.png",
    rating: 4.7,
    reviews: 4321,
    specs: {
      screen: "Size: 36-44",
      cpu: "Chất liệu: EVA",
      ram: "Đế: Cao su",
      storage: "Xuất xứ: Vietnam",
      battery: "Bảo hành: 3 tháng",
      camera: "Phong cách: Casual"
    },
    colors: ["Đen", "Xanh Navy", "Xám"],
    inStock: true,
    discount: 18
  },
  {
    id: "shoes-4",
    name: "Giày Converse Chuck Taylor All Star - Đen Classic",
    brand: "Converse",
    category: "shoes",
    price: 1490000,
    originalPrice: 1790000,
    image: "https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/1.png",
    rating: 4.8,
    reviews: 5432,
    specs: {
      screen: "Size: 35-44",
      cpu: "Chất liệu: Canvas",
      ram: "Đế: Cao su",
      storage: "Xuất xứ: Vietnam",
      battery: "Bảo hành: 6 tháng",
      camera: "Phong cách: Vintage"
    },
    colors: ["Đen", "Trắng", "Đỏ"],
    inStock: true,
    discount: 17
  },

  // ========== QUẦN ÁO ==========
  {
    id: "fashion-1",
    name: "Áo Thun Nam Uniqlo AIRism - Trắng Basic",
    brand: "Uniqlo",
    category: "fashion",
    price: 299000,
    originalPrice: 399000,
    image: "https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/1.png",
    rating: 4.7,
    reviews: 3210,
    specs: {
      screen: "Size: S, M, L, XL, XXL",
      cpu: "Chất liệu: AIRism",
      ram: "Xuất xứ: Vietnam",
      storage: "Co giãn: Tốt",
      battery: "Thoáng mát",
      camera: "Phong cách: Basic"
    },
    colors: ["Trắng", "Đen", "Xám", "Navy"],
    inStock: true,
    isHot: true,
    discount: 25
  },
  {
    id: "fashion-2",
    name: "Quần Jean Nam Levi's 511 Slim Fit - Xanh Đậm",
    brand: "Levi's",
    category: "fashion",
    price: 1490000,
    originalPrice: 1890000,
    image: "https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/1.png",
    rating: 4.8,
    reviews: 2134,
    specs: {
      screen: "Size: 28-36",
      cpu: "Chất liệu: Denim",
      ram: "Xuất xứ: Vietnam",
      storage: "Co giãn: Nhẹ",
      battery: "Form: Slim",
      camera: "Phong cách: Casual"
    },
    colors: ["Xanh Đậm", "Xanh Nhạt", "Đen"],
    inStock: true,
    isHot: true,
    discount: 21
  },
  {
    id: "fashion-3",
    name: "Áo Khoác Hoodie Adidas Essentials - Đen Logo Trắng",
    brand: "Adidas",
    category: "fashion",
    price: 1290000,
    originalPrice: 1590000,
    image: "https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/1.png",
    rating: 4.7,
    reviews: 1876,
    specs: {
      screen: "Size: S, M, L, XL, XXL",
      cpu: "Chất liệu: Cotton blend",
      ram: "Xuất xứ: Vietnam",
      storage: "Co giãn: Tốt",
      battery: "Có mũ",
      camera: "Phong cách: Sporty"
    },
    colors: ["Đen", "Xám", "Navy"],
    inStock: true,
    discount: 19
  },
  {
    id: "fashion-4",
    name: "Váy Nữ Zara Mini Dress - Đen Thanh Lịch",
    brand: "Zara",
    category: "fashion",
    price: 890000,
    originalPrice: 1190000,
    image: "https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/1.png",
    rating: 4.6,
    reviews: 1543,
    specs: {
      screen: "Size: S, M, L",
      cpu: "Chất liệu: Polyester",
      ram: "Xuất xứ: Vietnam",
      storage: "Co giãn: Nhẹ",
      battery: "Dáng: A",
      camera: "Phong cách: Thanh lịch"
    },
    colors: ["Đen", "Trắng", "Đỏ"],
    inStock: true,
    discount: 25
  },

  // ========== PHỤ KIỆN ==========
  {
    id: "accessories-1",
    name: "Tai Nghe Apple AirPods Pro 2 USB-C - Chính hãng VN/A",
    brand: "Apple",
    category: "accessories",
    price: 6490000,
    originalPrice: 7490000,
    image: "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png",
    rating: 4.9,
    reviews: 2341,
    specs: {
      screen: "Kết nối: Bluetooth 5.3",
      cpu: "Chip: H2",
      ram: "Pin: 30h",
      storage: "Chống ồn: ANC",
      battery: "Sạc: USB-C",
      camera: "Chống nước: IPX4"
    },
    colors: ["Trắng"],
    inStock: true,
    isHot: true,
    discount: 13
  },
  {
    id: "accessories-2",
    name: "Đồng Hồ Thông Minh Apple Watch Series 9 GPS 45mm",
    brand: "Apple",
    category: "accessories",
    price: 10990000,
    originalPrice: 12990000,
    image: "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Series%204%20Gold/1.png",
    rating: 4.8,
    reviews: 1876,
    specs: {
      screen: "Màn hình: 1.9\" OLED",
      cpu: "Chip: S9",
      ram: "Pin: 18h",
      storage: "Chống nước: 50m",
      battery: "GPS: Có",
      camera: "Cảm biến: ECG, SpO2"
    },
    colors: ["Midnight", "Starlight", "Pink"],
    inStock: true,
    isHot: true,
    discount: 15
  },
  {
    id: "accessories-3",
    name: "Balo Laptop The North Face Borealis 28L - Đen",
    brand: "The North Face",
    category: "accessories",
    price: 2490000,
    originalPrice: 2990000,
    image: "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/1.png",
    rating: 4.7,
    reviews: 1234,
    specs: {
      screen: "Dung tích: 28L",
      cpu: "Chất liệu: Polyester",
      ram: "Laptop: 15.6\"",
      storage: "Chống nước: Có",
      battery: "Ngăn: 5",
      camera: "Xuất xứ: Vietnam"
    },
    colors: ["Đen", "Xám", "Navy"],
    inStock: true,
    discount: 17
  },
  {
    id: "accessories-4",
    name: "Kính Mát Ray-Ban Aviator Classic - Vàng Đen",
    brand: "Ray-Ban",
    category: "accessories",
    price: 4290000,
    originalPrice: 4990000,
    image: "https://cdn.dummyjson.com/products/images/sunglasses/Classic%20Sun%20Glasses/1.png",
    rating: 4.8,
    reviews: 987,
    specs: {
      screen: "Chất liệu: Kim loại",
      cpu: "Tròng: Polarized",
      ram: "UV: 100%",
      storage: "Xuất xứ: Italy",
      battery: "Bảo hành: 12 tháng",
      camera: "Phong cách: Classic"
    },
    colors: ["Vàng Đen", "Bạc Xanh", "Đen"],
    inStock: true,
    discount: 14
  }
];

function createMultiCategoryData() {
  console.log('🎨 Creating multi-category product data...');

  // Create data directory if not exists
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }

  // Save products
  const outputPath = 'data/products.json';
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
  
  console.log(`✅ Created ${products.length} products`);
  console.log(`💾 Saved to ${outputPath}`);

  // Print summary by category
  console.log('\n📊 Summary by Category:');
  const categories = {};
  products.forEach(p => {
    if (!categories[p.category]) {
      categories[p.category] = [];
    }
    categories[p.category].push(p);
  });

  const categoryNames = {
    phone: 'Điện thoại',
    laptop: 'Laptop',
    cosmetics: 'Mỹ phẩm',
    shoes: 'Giày dép',
    fashion: 'Quần áo',
    accessories: 'Phụ kiện'
  };

  Object.entries(categories).forEach(([cat, items]) => {
    console.log(`   ${categoryNames[cat]}: ${items.length} sản phẩm`);
  });

  // Print price range
  const prices = products.map(p => p.price);
  console.log(`\n💰 Price range: ${Math.min(...prices).toLocaleString('vi-VN')}₫ - ${Math.max(...prices).toLocaleString('vi-VN')}₫`);

  // Print brands
  const brands = [...new Set(products.map(p => p.brand))];
  console.log(`\n🏷️  Brands (${brands.length}): ${brands.join(', ')}`);

  console.log('\n💡 Next steps:');
  console.log('1. Restart dev server: npm run dev');
  console.log('2. Open: http://localhost:3000');
}

if (require.main === module) {
  createMultiCategoryData();
}

module.exports = { createMultiCategoryData, products };
