#!/bin/bash

# Quick Start Script for Shopee Crawler
# Hướng dẫn nhanh để crawl data từ Shopee

echo "🛍️  Shopee Product Crawler - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt"
    echo "💡 Cài đặt Node.js tại: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Menu
echo "Chọn phương thức crawl:"
echo "1. API Crawler (Nhanh, đơn giản - Khuyến nghị)"
echo "2. Puppeteer Crawler (Đầy đủ, cần cài Puppeteer)"
echo "3. Merge data vào website"
echo "4. Restore từ backup"
echo "5. Thoát"
echo ""

read -p "Nhập lựa chọn (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Chạy API Crawler..."
        echo ""
        node shopee-api-crawler.js
        echo ""
        echo "✅ Hoàn tất! Kiểm tra file: data/shopee-products.json"
        echo ""
        read -p "Bạn có muốn merge data vào website không? (y/n): " merge
        if [ "$merge" = "y" ] || [ "$merge" = "Y" ]; then
            node merge-products.js
        fi
        ;;
    2)
        echo ""
        echo "🔍 Kiểm tra Puppeteer..."
        if ! npm list puppeteer &> /dev/null; then
            echo "⚠️  Puppeteer chưa được cài đặt"
            read -p "Cài đặt Puppeteer ngay? (y/n): " install
            if [ "$install" = "y" ] || [ "$install" = "Y" ]; then
                echo "📦 Đang cài đặt Puppeteer..."
                npm install puppeteer
            else
                echo "❌ Hủy bỏ"
                exit 1
            fi
        fi
        echo ""
        echo "🚀 Chạy Puppeteer Crawler..."
        echo ""
        node shopee-crawler.js
        echo ""
        echo "✅ Hoàn tất! Kiểm tra file: data/shopee-products.json"
        ;;
    3)
        echo ""
        echo "🔀 Merge data vào website..."
        echo ""
        node merge-products.js
        ;;
    4)
        echo ""
        echo "🔄 Restore từ backup..."
        echo ""
        node merge-products.js --restore
        ;;
    5)
        echo "👋 Tạm biệt!"
        exit 0
        ;;
    *)
        echo "❌ Lựa chọn không hợp lệ"
        exit 1
        ;;
esac

echo ""
echo "🏁 Xong!"
