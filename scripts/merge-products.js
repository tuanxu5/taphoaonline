/**
 * Merge Shopee products with existing products
 * 
 * Script này sẽ:
 * 1. Đọc data từ shopee-products.json
 * 2. Đọc data hiện tại từ data/products.json
 * 3. Merge và loại bỏ duplicate
 * 4. Lưu vào data/products.json (backup file cũ)
 */

const fs = require('fs');
const path = require('path');

// Paths
const SHOPEE_PRODUCTS_PATH = path.join(__dirname, '../data/shopee-products.json');
const CURRENT_PRODUCTS_PATH = path.join(__dirname, '../data/products.json');
const BACKUP_PATH = path.join(__dirname, '../data/products.backup.json');

// Helper to check if two products are similar
function areSimilarProducts(p1, p2) {
  // Check by name similarity
  const name1 = p1.name.toLowerCase().trim();
  const name2 = p2.name.toLowerCase().trim();
  
  // Exact match
  if (name1 === name2) return true;
  
  // Check if one contains the other (for variants)
  if (name1.includes(name2) || name2.includes(name1)) {
    // Also check price similarity (within 10%)
    const priceDiff = Math.abs(p1.price - p2.price) / Math.max(p1.price, p2.price);
    if (priceDiff < 0.1) return true;
  }
  
  return false;
}

// Main merge function
function mergeProducts() {
  console.log('🔄 Starting product merge...');

  try {
    // Check if Shopee products file exists
    if (!fs.existsSync(SHOPEE_PRODUCTS_PATH)) {
      console.error(`❌ Shopee products file not found: ${SHOPEE_PRODUCTS_PATH}`);
      console.log('💡 Run the crawler first: node scripts/shopee-api-crawler.js');
      return;
    }

    // Read Shopee products
    console.log('📖 Reading Shopee products...');
    const shopeeProducts = JSON.parse(fs.readFileSync(SHOPEE_PRODUCTS_PATH, 'utf-8'));
    console.log(`   Found ${shopeeProducts.length} Shopee products`);

    // Read current products
    console.log('📖 Reading current products...');
    let currentProducts = [];
    if (fs.existsSync(CURRENT_PRODUCTS_PATH)) {
      currentProducts = JSON.parse(fs.readFileSync(CURRENT_PRODUCTS_PATH, 'utf-8'));
      console.log(`   Found ${currentProducts.length} current products`);
      
      // Backup current products
      fs.writeFileSync(BACKUP_PATH, JSON.stringify(currentProducts, null, 2), 'utf-8');
      console.log(`💾 Backup saved to ${BACKUP_PATH}`);
    } else {
      console.log('   No existing products file found');
    }

    // Merge products
    console.log('🔀 Merging products...');
    const mergedProducts = [...currentProducts];
    let addedCount = 0;
    let skippedCount = 0;

    for (const shopeeProduct of shopeeProducts) {
      // Check if similar product already exists
      const isDuplicate = mergedProducts.some(existing => 
        areSimilarProducts(existing, shopeeProduct)
      );

      if (isDuplicate) {
        skippedCount++;
        console.log(`   ⏭️  Skipped duplicate: ${shopeeProduct.name.substring(0, 50)}...`);
      } else {
        // Generate new ID to avoid conflicts
        const newId = `${Date.now()}-${addedCount + 1}`;
        mergedProducts.push({
          ...shopeeProduct,
          id: newId,
        });
        addedCount++;
        console.log(`   ✅ Added: ${shopeeProduct.name.substring(0, 50)}...`);
      }
    }

    // Sort by price (descending)
    mergedProducts.sort((a, b) => b.price - a.price);

    // Save merged products
    fs.writeFileSync(
      CURRENT_PRODUCTS_PATH,
      JSON.stringify(mergedProducts, null, 2),
      'utf-8'
    );

    console.log('\n📊 Merge Summary:');
    console.log(`   Original products: ${currentProducts.length}`);
    console.log(`   Shopee products: ${shopeeProducts.length}`);
    console.log(`   Added: ${addedCount}`);
    console.log(`   Skipped (duplicates): ${skippedCount}`);
    console.log(`   Total products: ${mergedProducts.length}`);
    console.log(`\n💾 Merged products saved to ${CURRENT_PRODUCTS_PATH}`);
    console.log(`📦 Backup available at ${BACKUP_PATH}`);

    // Print brand distribution
    const brandCounts = {};
    mergedProducts.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });

    console.log('\n📱 Brand Distribution:');
    Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([brand, count]) => {
        console.log(`   ${brand}: ${count} products`);
      });

  } catch (error) {
    console.error('❌ Error during merge:', error.message);
    console.error(error.stack);
  }

  console.log('\n🏁 Merge finished');
}

// Restore from backup
function restoreBackup() {
  console.log('🔄 Restoring from backup...');

  if (!fs.existsSync(BACKUP_PATH)) {
    console.error('❌ Backup file not found');
    return;
  }

  try {
    const backup = fs.readFileSync(BACKUP_PATH, 'utf-8');
    fs.writeFileSync(CURRENT_PRODUCTS_PATH, backup, 'utf-8');
    console.log('✅ Restored successfully');
  } catch (error) {
    console.error('❌ Error restoring backup:', error.message);
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--restore')) {
    restoreBackup();
  } else if (args.includes('--help')) {
    console.log(`
Usage:
  node merge-products.js           Merge Shopee products with current products
  node merge-products.js --restore Restore from backup
  node merge-products.js --help    Show this help
    `);
  } else {
    mergeProducts();
  }
}

module.exports = { mergeProducts, restoreBackup };
