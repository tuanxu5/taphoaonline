/**
 * Shopee API Crawler (Unofficial)
 * 
 * Sử dụng API không chính thức của Shopee
 * Đơn giản hơn Puppeteer, không cần browser
 * 
 * DISCLAIMER: API này không chính thức và có thể thay đổi bất cứ lúc nào
 */

const https = require('https');
const fs = require('fs');

// Configuration
const CONFIG = {
  keyword: 'điện thoại',
  limit: 50, // Số sản phẩm mỗi page (max 60)
  newest: 0, // 0 = relevance, 1 = newest
  page: 0, // Page number (0-indexed)
};

// Helper function to make HTTPS request
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://shopee.vn/',
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Format price
function formatPrice(price) {
  return Math.round(price / 100000); // Shopee price is in cents
}

// Extract brand from name
function extractBrand(name) {
  const brandKeywords = [
    'iPhone', 'Apple',
    'Samsung', 
    'Xiaomi', 'Redmi',
    'OPPO', 
    'Vivo', 
    'Realme',
    'Nokia',
    'Huawei',
    'Google', 'Pixel',
    'OnePlus',
    'Asus',
    'Sony',
  ];
  
  for (const keyword of brandKeywords) {
    if (name.toLowerCase().includes(keyword.toLowerCase())) {
      if (keyword === 'Redmi') return 'Xiaomi';
      if (keyword === 'Pixel') return 'Google';
      return keyword;
    }
  }
  
  return 'Unknown';
}

// Extract specs from name (simple heuristic)
function extractSpecs(name) {
  const specs = {
    screen: 'N/A',
    cpu: 'N/A',
    ram: 'N/A',
    storage: 'N/A',
    battery: 'N/A',
    camera: 'N/A',
  };

  // Extract RAM
  const ramMatch = name.match(/(\d+)\s*GB\s*RAM/i) || name.match(/(\d+)GB/i);
  if (ramMatch) {
    specs.ram = `${ramMatch[1]}GB`;
  }

  // Extract Storage
  const storageMatch = name.match(/(\d+)\s*GB(?!\s*RAM)/i) || name.match(/(\d+)GB/i);
  if (storageMatch) {
    specs.storage = `${storageMatch[1]}GB`;
  }

  // Extract Battery
  const batteryMatch = name.match(/(\d+)\s*mAh/i);
  if (batteryMatch) {
    specs.battery = `${batteryMatch[1]}mAh`;
  }

  return specs;
}

// Main crawler function
async function crawlShopeeAPI() {
  console.log('🚀 Starting Shopee API crawler...');
  console.log(`🔍 Searching for: ${CONFIG.keyword}`);

  try {
    // Build API URL
    const apiUrl = `https://shopee.vn/api/v4/search/search_items?` +
      `by=relevancy&` +
      `keyword=${encodeURIComponent(CONFIG.keyword)}&` +
      `limit=${CONFIG.limit}&` +
      `newest=${CONFIG.newest}&` +
      `order=desc&` +
      `page_type=search&` +
      `scenario=PAGE_GLOBAL_SEARCH&` +
      `version=2`;

    console.log('📡 Fetching data from Shopee API...');
    console.log('🔗 URL:', apiUrl);
    
    const response = await httpsGet(apiUrl);

    // Debug: Save raw response
    const fs = require('fs');
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }
    fs.writeFileSync('data/debug-response.json', JSON.stringify(response, null, 2));
    console.log('💾 Debug response saved to data/debug-response.json');

    if (!response.items || response.items.length === 0) {
      console.log('❌ No products found');
      console.log('💡 Response structure:', Object.keys(response));
      
      // Check if there's an error message
      if (response.error) {
        console.log('❌ API Error:', response.error);
      }
      
      // Try alternative path
      if (response.data && response.data.sections) {
        console.log('💡 Found alternative data structure, trying to parse...');
        return parseAlternativeStructure(response);
      }
      
      return;
    }

    console.log(`✅ Found ${response.items.length} products`);

    // Process products
    const products = response.items.map((item, index) => {
      const product = item.item_basic;
      
      // Calculate prices
      const price = formatPrice(product.price);
      const originalPrice = product.price_before_discount 
        ? formatPrice(product.price_before_discount)
        : price;
      
      // Calculate discount
      const discount = originalPrice > price 
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

      // Get image URL
      const image = product.image 
        ? `https://cf.shopee.vn/file/${product.image}`
        : '';

      // Extract brand and specs
      const brand = extractBrand(product.name);
      const specs = extractSpecs(product.name);

      // Generate ID
      const id = `shopee-${product.itemid}-${product.shopid}`;

      return {
        id,
        name: product.name,
        brand,
        price,
        originalPrice,
        image,
        rating: (product.item_rating.rating_star || 0) / 10, // Shopee uses 0-50 scale
        reviews: product.item_rating.rating_count?.[0] || 0,
        specs,
        colors: ['Đen', 'Trắng'], // Default colors
        inStock: product.stock > 0,
        isHot: discount > 20 || product.sold > 1000,
        discount,
        sold: product.historical_sold || product.sold || 0,
        shopeeLink: `https://shopee.vn/product/${product.shopid}/${product.itemid}`,
        shopeeData: {
          itemid: product.itemid,
          shopid: product.shopid,
          stock: product.stock,
          liked_count: product.liked_count,
        }
      };
    });

    // Filter out invalid products
    const validProducts = products.filter(p => p.price > 0 && p.name);

    console.log(`✅ Processed ${validProducts.length} valid products`);

    // Save to JSON file
    const outputPath = 'data/shopee-products.json';
    fs.writeFileSync(
      outputPath, 
      JSON.stringify(validProducts, null, 2), 
      'utf-8'
    );
    console.log(`💾 Data saved to ${outputPath}`);

    // Save raw response for debugging
    const rawOutputPath = 'data/shopee-api-raw.json';
    fs.writeFileSync(
      rawOutputPath,
      JSON.stringify(response, null, 2),
      'utf-8'
    );
    console.log(`💾 Raw API response saved to ${rawOutputPath}`);

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`Total products: ${validProducts.length}`);
    
    const prices = validProducts.map(p => p.price).filter(p => p > 0);
    if (prices.length > 0) {
      console.log(`Price range: ${Math.min(...prices).toLocaleString('vi-VN')}₫ - ${Math.max(...prices).toLocaleString('vi-VN')}₫`);
    }
    
    const brands = [...new Set(validProducts.map(p => p.brand))];
    console.log(`Brands found: ${brands.join(', ')}`);
    
    const avgRating = (validProducts.reduce((sum, p) => sum + p.rating, 0) / validProducts.length).toFixed(1);
    console.log(`Average rating: ${avgRating}/5.0`);

    // Top 5 products by sold
    console.log('\n🔥 Top 5 best sellers:');
    const topSellers = [...validProducts]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
    
    topSellers.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name.substring(0, 50)}... - Sold: ${p.sold.toLocaleString('vi-VN')}`);
    });

  } catch (error) {
    console.error('❌ Error during crawling:', error.message);
    
    if (error.message.includes('JSON')) {
      console.error('💡 Tip: Shopee API might have changed. Check the raw response.');
    }
  }

  console.log('\n🏁 Crawler finished');
}

// Run the crawler
if (require.main === module) {
  crawlShopeeAPI().catch(console.error);
}

module.exports = { crawlShopeeAPI };
