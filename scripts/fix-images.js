/**
 * Fix Product Images
 * 
 * Thay đổi nguồn hình ảnh sang nguồn ổn định hơn
 */

const fs = require('fs');

// Alternative image sources
const imagesByBrand = {
  'Apple': [
    'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2014%20Pro/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/1.png',
  ],
  'Samsung': [
    'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S21/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S23/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20Z%20Fold%205/1.png',
  ],
  'Xiaomi': [
    'https://cdn.dummyjson.com/products/images/smartphones/Xiaomi%20Redmi%20Note%2013%20Pro/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/Xiaomi%2012%20Pro/1.png',
  ],
  'OPPO': [
    'https://cdn.dummyjson.com/products/images/smartphones/OPPO%20F19%20Pro%20Plus/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/OPPO%20Reno%208%20Pro/1.png',
  ],
  'Vivo': [
    'https://cdn.dummyjson.com/products/images/smartphones/Vivo%20V29/1.png',
  ],
  'Google': [
    'https://cdn.dummyjson.com/products/images/smartphones/Google%20Pixel%207%20Pro/1.png',
  ],
  'Realme': [
    'https://cdn.dummyjson.com/products/images/smartphones/Realme%20C35/1.png',
  ],
  'OnePlus': [
    'https://cdn.dummyjson.com/products/images/smartphones/OnePlus%2011/1.png',
  ],
};

function fixImages() {
  console.log('🖼️  Fixing product images...');

  const productsPath = 'data/products.json';
  
  if (!fs.existsSync(productsPath)) {
    console.error('❌ products.json not found');
    return;
  }

  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  
  let fixedCount = 0;
  const brandCounters = {};

  products.forEach(product => {
    const brand = product.brand;
    
    if (imagesByBrand[brand]) {
      // Get counter for this brand
      if (!brandCounters[brand]) {
        brandCounters[brand] = 0;
      }
      
      // Get image from array (cycle through if needed)
      const images = imagesByBrand[brand];
      const imageIndex = brandCounters[brand] % images.length;
      const newImage = images[imageIndex];
      
      if (product.image !== newImage) {
        console.log(`   ✅ Fixed: ${product.name.substring(0, 40)}...`);
        product.image = newImage;
        fixedCount++;
      }
      
      brandCounters[brand]++;
    }
  });

  // Save
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');
  
  console.log(`\n✅ Fixed ${fixedCount} images`);
  console.log('💾 Saved to data/products.json');
  console.log('\n💡 Restart dev server: npm run dev');
}

if (require.main === module) {
  fixImages();
}

module.exports = { fixImages };
