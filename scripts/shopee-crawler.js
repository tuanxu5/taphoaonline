/**
 * Shopee Product Crawler
 * 
 * DISCLAIMER: This script is for educational purposes only.
 * Web scraping may violate Shopee's Terms of Service.
 * Use at your own risk and respect rate limits.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

// Configuration
const CONFIG = {
  headless: false, // Set to true to run without browser UI
  delay: 2000, // Delay between requests (ms)
  maxProducts: 20, // Maximum products to crawl
  searchKeyword: 'điện thoại', // Search keyword
};

// Helper function to delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to extract price from text
const extractPrice = (priceText) => {
  if (!priceText) return 0;
  // Remove all non-numeric characters except dots
  const cleaned = priceText.replace(/[^\d]/g, '');
  return parseInt(cleaned) || 0;
};

// Main crawler function
async function crawlShopee() {
  console.log('🚀 Starting Shopee crawler...');
  
  const browser = await puppeteer.launch({
    headless: CONFIG.headless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080',
    ],
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    console.log(`🔍 Searching for: ${CONFIG.searchKeyword}`);
    
    // Navigate to Shopee search page
    const searchUrl = `https://shopee.vn/search?keyword=${encodeURIComponent(CONFIG.searchKeyword)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('⏳ Waiting for products to load...');
    await delay(3000);

    // Scroll to load more products
    await autoScroll(page);
    await delay(2000);

    console.log('📦 Extracting product data...');

    // Extract product data
    const products = await page.evaluate((maxProducts) => {
      const productElements = document.querySelectorAll('.shopee-search-item-result__item');
      const results = [];

      for (let i = 0; i < Math.min(productElements.length, maxProducts); i++) {
        const element = productElements[i];
        
        try {
          // Extract image
          const imgElement = element.querySelector('img');
          const image = imgElement ? imgElement.src : '';

          // Extract name
          const nameElement = element.querySelector('.ie3A\\+n, [data-sqe="name"]');
          const name = nameElement ? nameElement.textContent.trim() : '';

          // Extract price
          const priceElement = element.querySelector('.ZEgDH9, .vHoLST');
          const priceText = priceElement ? priceElement.textContent.trim() : '';

          // Extract original price (if on sale)
          const originalPriceElement = element.querySelector('.P0\\+8jQ, .RP3V2c');
          const originalPriceText = originalPriceElement ? originalPriceElement.textContent.trim() : '';

          // Extract discount
          const discountElement = element.querySelector('.percent, .WNoq3N');
          const discount = discountElement ? discountElement.textContent.trim() : '';

          // Extract rating
          const ratingElement = element.querySelector('.shopee-rating-stars__rating-decimal, .ZGGrF-');
          const rating = ratingElement ? parseFloat(ratingElement.textContent.trim()) : 0;

          // Extract sold count
          const soldElement = element.querySelector('.r6HknA, .oa6ri1');
          const sold = soldElement ? soldElement.textContent.trim() : '';

          // Extract link
          const linkElement = element.querySelector('a');
          const link = linkElement ? linkElement.href : '';

          if (name && priceText) {
            results.push({
              name,
              price: priceText,
              originalPrice: originalPriceText,
              discount,
              rating,
              sold,
              image,
              link,
            });
          }
        } catch (error) {
          console.error('Error extracting product:', error);
        }
      }

      return results;
    }, CONFIG.maxProducts);

    console.log(`✅ Found ${products.length} products`);

    // Process and format data
    const formattedProducts = products.map((product, index) => {
      // Extract numeric price
      const price = extractPrice(product.price);
      const originalPrice = extractPrice(product.originalPrice);
      
      // Extract discount percentage
      const discountMatch = product.discount.match(/(\d+)/);
      const discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;

      // Generate ID
      const id = `shopee-${Date.now()}-${index + 1}`;

      // Determine brand from name (simple heuristic)
      let brand = 'Unknown';
      const brandKeywords = ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Nokia', 'Huawei', 'Google'];
      for (const keyword of brandKeywords) {
        if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
          brand = keyword;
          break;
        }
      }

      return {
        id,
        name: product.name,
        brand,
        price,
        originalPrice: originalPrice || price,
        image: product.image,
        rating: product.rating || 4.5,
        reviews: parseInt(product.sold.replace(/[^\d]/g, '')) || 0,
        specs: {
          screen: 'N/A',
          cpu: 'N/A',
          ram: 'N/A',
          storage: 'N/A',
          battery: 'N/A',
          camera: 'N/A',
        },
        colors: ['Đen', 'Trắng'],
        inStock: true,
        isHot: discountPercent > 20,
        discount: discountPercent,
        shopeeLink: product.link,
      };
    });

    // Save to JSON file
    const outputPath = 'data/shopee-products.json';
    fs.writeFileSync(outputPath, JSON.stringify(formattedProducts, null, 2), 'utf-8');
    console.log(`💾 Data saved to ${outputPath}`);

    // Also save raw data for reference
    const rawOutputPath = 'data/shopee-products-raw.json';
    fs.writeFileSync(rawOutputPath, JSON.stringify(products, null, 2), 'utf-8');
    console.log(`💾 Raw data saved to ${rawOutputPath}`);

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`Total products: ${formattedProducts.length}`);
    console.log(`Price range: ${Math.min(...formattedProducts.map(p => p.price)).toLocaleString('vi-VN')}₫ - ${Math.max(...formattedProducts.map(p => p.price)).toLocaleString('vi-VN')}₫`);
    console.log(`Brands found: ${[...new Set(formattedProducts.map(p => p.brand))].join(', ')}`);

  } catch (error) {
    console.error('❌ Error during crawling:', error);
  } finally {
    await browser.close();
    console.log('🏁 Crawler finished');
  }
}

// Auto scroll function to load more products
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Run the crawler
if (require.main === module) {
  crawlShopee().catch(console.error);
}

module.exports = { crawlShopee };
