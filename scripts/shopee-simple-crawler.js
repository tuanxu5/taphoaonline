/**
 * Simple Shopee Crawler using Puppeteer
 * 
 * Phương pháp đơn giản nhất để crawl Shopee
 * Chỉ cần cài Puppeteer và chạy
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const CONFIG = {
  searchKeyword: 'điện thoại',
  maxProducts: 20,
  headless: false, // Set true để chạy ẩn
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function crawlShopee() {
  console.log('🚀 Starting Simple Shopee Crawler...');
  console.log(`🔍 Keyword: ${CONFIG.searchKeyword}`);
  
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: CONFIG.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    );

    console.log('🌐 Opening Shopee...');
    const url = `https://shopee.vn/search?keyword=${encodeURIComponent(CONFIG.searchKeyword)}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('⏳ Waiting for products...');
    await delay(5000);

    // Scroll to load more
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await delay(2000);

    console.log('📦 Extracting products...');
    
    const products = await page.evaluate((maxProducts) => {
      const results = [];
      
      // Try multiple selectors
      const selectors = [
        '.shopee-search-item-result__item',
        '[data-sqe="item"]',
        '.col-xs-2-4',
      ];
      
      let items = [];
      for (const selector of selectors) {
        items = document.querySelectorAll(selector);
        if (items.length > 0) break;
      }

      console.log(`Found ${items.length} items`);

      for (let i = 0; i < Math.min(items.length, maxProducts); i++) {
        const item = items[i];
        
        try {
          // Get image
          const img = item.querySelector('img');
          const image = img ? (img.src || img.dataset.src || '') : '';

          // Get name
          const nameEl = item.querySelector('[data-sqe="name"], .line-clamp-2, ._10Wbs-, .ie3A\\+n');
          const name = nameEl ? nameEl.textContent.trim() : '';

          // Get price
          const priceEl = item.querySelector('[data-sqe="price"], .ZEgDH9, ._3c5u7X, .vHoLST');
          const priceText = priceEl ? priceEl.textContent.trim() : '';

          // Get link
          const linkEl = item.querySelector('a');
          const link = linkEl ? linkEl.href : '';

          if (name && priceText) {
            results.push({
              name,
              price: priceText,
              image,
              link,
            });
          }
        } catch (err) {
          console.error('Error parsing item:', err);
        }
      }

      return results;
    }, CONFIG.maxProducts);

    console.log(`✅ Found ${products.length} products`);

    if (products.length === 0) {
      console.log('❌ No products found. Shopee might have changed their HTML structure.');
      console.log('💡 Taking screenshot for debugging...');
      await page.screenshot({ path: 'data/shopee-debug.png', fullPage: true });
      console.log('📸 Screenshot saved to data/shopee-debug.png');
      return;
    }

    // Format products
    const formattedProducts = products.map((p, i) => {
      // Extract price number
      const priceMatch = p.price.match(/[\d.]+/g);
      const priceNum = priceMatch ? parseFloat(priceMatch.join('')) * 1000 : 0;

      // Detect brand
      let brand = 'Unknown';
      const brands = ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Google', 'OnePlus'];
      for (const b of brands) {
        if (p.name.toLowerCase().includes(b.toLowerCase())) {
          brand = b;
          break;
        }
      }

      // Extract specs from name
      const ramMatch = p.name.match(/(\d+)\s*GB/i);
      const ram = ramMatch ? `${ramMatch[1]}GB` : 'N/A';

      return {
        id: `shopee-${Date.now()}-${i}`,
        name: p.name,
        brand,
        price: priceNum,
        originalPrice: priceNum,
        image: p.image.replace('_tn', ''), // Get full size image
        rating: 4.5,
        reviews: 0,
        specs: {
          screen: 'N/A',
          cpu: 'N/A',
          ram,
          storage: 'N/A',
          battery: 'N/A',
          camera: 'N/A',
        },
        colors: ['Đen', 'Trắng'],
        inStock: true,
        isHot: false,
        discount: 0,
        shopeeLink: p.link,
      };
    });

    // Save data
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }

    fs.writeFileSync(
      'data/shopee-products.json',
      JSON.stringify(formattedProducts, null, 2),
      'utf-8'
    );
    console.log('💾 Saved to data/shopee-products.json');

    // Summary
    console.log('\n📊 Summary:');
    console.log(`Products: ${formattedProducts.length}`);
    const brands = [...new Set(formattedProducts.map(p => p.brand))];
    console.log(`Brands: ${brands.join(', ')}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  console.log('\n🏁 Done!');
}

if (require.main === module) {
  crawlShopee().catch(console.error);
}

module.exports = { crawlShopee };
