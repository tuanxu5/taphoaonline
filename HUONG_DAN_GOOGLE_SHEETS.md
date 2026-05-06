# Hướng dẫn kết nối đơn hàng với Google Sheets

## Bước 1: Tạo Google Apps Script

1. Mở Google Sheet của bạn: https://docs.google.com/spreadsheets/d/1fhfnpIFHbBiZAOKcdUEJOc9p06_i1QyQmvVjCTtC3UI/edit

2. Vào menu **Extensions** (Tiện ích mở rộng) → **Apps Script**

3. Xóa code mặc định và dán đoạn code sau:

```javascript
function doGet(e) {
  // Function để test và xem trạng thái + danh sách đơn hàng
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tự động setup header nếu chưa có
    setupSheetHeaders(sheet);
    
    const lastRow = sheet.getLastRow();
    const totalOrders = Math.max(0, lastRow - 1);
    
    // Lấy dữ liệu đơn hàng (tối đa 20 đơn gần nhất)
    let ordersHtml = '';
    if (totalOrders > 0) {
      const startRow = Math.max(2, lastRow - 19); // Lấy 20 đơn gần nhất
      const numRows = lastRow - startRow + 1;
      const data = sheet.getRange(startRow, 1, numRows, 19).getValues();
      
      // Tạo table HTML
      ordersHtml = `
        <div class="orders-section">
          <h3>📋 Danh sách đơn hàng gần nhất (${Math.min(20, totalOrders)} đơn)</h3>
          <div class="table-container">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Ngày</th>
                  <th>Khách hàng</th>
                  <th>SĐT</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
      `;
      
      // Đảo ngược để hiển thị đơn mới nhất trước
      data.reverse().forEach(row => {
        const [orderNumber, orderDate, orderTime, customerName, phone, email, address, paymentMethod, totalItems, products, productDetails, totalAmountNum, totalAmount, avgPrice, note, status] = row;
        
        const statusClass = getStatusClass(status);
        const shortProducts = products.length > 50 ? products.substring(0, 50) + '...' : products;
        
        ordersHtml += `
          <tr>
            <td class="order-number">${orderNumber}</td>
            <td class="order-date">${orderDate}<br><small>${orderTime}</small></td>
            <td class="customer-name">${customerName}</td>
            <td class="phone">${phone}</td>
            <td class="products" title="${products}">${shortProducts}</td>
            <td class="total-amount">${totalAmount}</td>
            <td class="status ${statusClass}">${status}</td>
          </tr>
        `;
      });
      
      ordersHtml += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      ordersHtml = `
        <div class="no-orders">
          <h3>📋 Danh sách đơn hàng</h3>
          <p style="text-align: center; color: #666; padding: 20px;">
            Chưa có đơn hàng nào. Hãy test bằng cách chạy function <code>testDoPost()</code>
          </p>
        </div>
      `;
    }
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>MegaMart Order System</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { color: #d70018; text-align: center; margin-bottom: 20px; }
        .status { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .orders-section { margin: 20px 0; }
        .no-orders { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
        
        /* Table Styles */
        .table-container { overflow-x: auto; margin: 10px 0; }
        .orders-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .orders-table th { background: #d70018; color: white; padding: 12px 8px; text-align: left; font-weight: bold; }
        .orders-table td { padding: 10px 8px; border-bottom: 1px solid #eee; vertical-align: top; }
        .orders-table tr:nth-child(even) { background: #f8f9fa; }
        .orders-table tr:hover { background: #e3f2fd; }
        
        /* Column Styles */
        .order-number { font-weight: bold; color: #d70018; min-width: 120px; }
        .order-date { min-width: 100px; font-size: 12px; }
        .customer-name { font-weight: bold; min-width: 150px; }
        .phone { min-width: 110px; font-family: monospace; }
        .products { max-width: 200px; font-size: 12px; line-height: 1.3; }
        .total-amount { font-weight: bold; color: #d70018; text-align: right; min-width: 100px; }
        
        /* Status Styles */
        .status { font-weight: bold; text-align: center; padding: 4px 8px; border-radius: 4px; min-width: 80px; }
        .status-new { background: #fff3cd; color: #856404; }
        .status-processing { background: #cce5ff; color: #004085; }
        .status-completed { background: #d4edda; color: #155724; }
        .status-cancelled { background: #f8d7da; color: #721c24; }
        
        .test-btn { background: #d70018; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 5px; }
        .test-btn:hover { background: #b8001a; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 5px; overflow-x: auto; font-size: 12px; }
        
        .stats { display: flex; gap: 20px; margin: 20px 0; }
        .stat-box { flex: 1; background: linear-gradient(135deg, #d70018, #ff4757); color: white; padding: 15px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 24px; font-weight: bold; }
        .stat-label { font-size: 12px; opacity: 0.9; }
        
        @media (max-width: 768px) {
          .container { margin: 10px; padding: 15px; }
          .orders-table { font-size: 12px; }
          .orders-table th, .orders-table td { padding: 6px 4px; }
          .stats { flex-direction: column; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 MegaMart Order Management System</h1>
          <p>Google Apps Script Web App Dashboard</p>
        </div>
        
        <div class="stats">
          <div class="stat-box">
            <div class="stat-number">${totalOrders}</div>
            <div class="stat-label">Tổng đơn hàng</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">${sheet.getName()}</div>
            <div class="stat-label">Sheet đang dùng</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">${new Date().toLocaleDateString('vi-VN')}</div>
            <div class="stat-label">Cập nhật lần cuối</div>
          </div>
        </div>
        
        ${ordersHtml}
        
        <div class="status">
          <h3>✅ Trạng thái hệ thống</h3>
          <p><strong>Spreadsheet ID:</strong> ${SpreadsheetApp.getActiveSpreadsheet().getId()}</p>
          <p><strong>Sheet Name:</strong> ${sheet.getName()}</p>
          <p><strong>Last Update:</strong> ${new Date().toLocaleString('vi-VN')}</p>
        </div>
        
        <div class="info">
          <h3>📋 Thông tin kết nối</h3>
          <p><strong>POST URL:</strong></p>
          <pre>${ScriptApp.getService().getUrl()}</pre>
          <p><strong>Method:</strong> POST | <strong>Content-Type:</strong> application/json</p>
        </div>
        
        <div class="info">
          <h3>🧪 Test Functions</h3>
          <p>Vào Apps Script Editor và chạy các function sau:</p>
          <ul>
            <li><code>testDoPost()</code> - Tạo đơn hàng mẫu để test</li>
            <li><code>resetSheet()</code> - Reset lại sheet và tạo header mới</li>
            <li><code>addValidationRules()</code> - Thêm validation cho các cột</li>
          </ul>
        </div>
        
        <div class="info">
          <h3>📊 Sample JSON Data</h3>
          <pre>{
  "timestamp": "2026-05-06T14:30:25.000Z",
  "customerName": "Nguyễn Văn A",
  "phone": "0912345678",
  "email": "test@example.com",
  "address": "123 ABC, Phường 1, Quận 1, TP.HCM",
  "paymentMethod": "Thanh toán khi nhận hàng",
  "note": "Giao giờ hành chính",
  "items": [
    {
      "name": "iPhone 15 Pro Max 256GB",
      "color": "Titan Tự Nhiên",
      "quantity": 1,
      "price": 29990000,
      "total": 29990000
    }
  ],
  "totalAmount": 29990000
}</pre>
        </div>
      </div>
    </body>
    </html>`;
    
    return HtmlService.createHtmlOutput(html);
    
  } catch (error) {
    return HtmlService.createHtmlOutput(`
      <div style="max-width: 600px; margin: 50px auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #d70018;">❌ Lỗi hệ thống</h1>
        <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Chi tiết lỗi:</strong><br>
          ${error.toString()}
        </div>
        <p>Vui lòng kiểm tra lại:</p>
        <ul>
          <li>Quyền truy cập Google Sheets</li>
          <li>Cấu hình Apps Script</li>
          <li>Deploy settings</li>
        </ul>
      </div>
    `);
  }
}

function getStatusClass(status) {
  switch(status) {
    case 'Mới': return 'status-new';
    case 'Đang xử lý': return 'status-processing';
    case 'Đã giao':
    case 'Hoàn thành': return 'status-completed';
    case 'Hủy': return 'status-cancelled';
    default: return 'status-new';
  }
}

function doPost(e) {
  try {
    // Lấy spreadsheet và sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // Tự động tạo header nếu chưa có
    setupSheetHeaders(sheet);
    
    // Parse dữ liệu từ request
    const data = JSON.parse(e.postData.contents);
    
    // Chuẩn bị dữ liệu để ghi vào sheet
    const timestamp = new Date(data.timestamp);
    const orderNumber = generateOrderNumber();
    
    // Format danh sách sản phẩm
    const itemsText = data.items.map(item => 
      `${item.name} (${item.color}) x${item.quantity}`
    ).join('\n');
    
    const itemsDetail = data.items.map(item => 
      `${item.name}\n- Màu: ${item.color}\n- SL: ${item.quantity}\n- Giá: ${formatPrice(item.price)}₫\n- Thành tiền: ${formatPrice(item.total)}₫`
    ).join('\n\n');
    
    // Tính toán thống kê
    const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);
    const avgPrice = data.totalAmount / totalItems;
    
    // Thêm dòng mới vào sheet
    const newRow = [
      orderNumber,                                                    // A: Mã đơn hàng
      Utilities.formatDate(timestamp, "GMT+7", "dd/MM/yyyy"),        // B: Ngày đặt
      Utilities.formatDate(timestamp, "GMT+7", "HH:mm:ss"),         // C: Giờ đặt
      data.customerName,                                             // D: Tên khách hàng
      data.phone,                                                    // E: Số điện thoại
      data.email || '',                                              // F: Email
      data.address,                                                  // G: Địa chỉ giao hàng
      data.paymentMethod || 'Thanh toán khi nhận hàng',            // H: Phương thức thanh toán
      totalItems,                                                    // I: Tổng số lượng
      itemsText,                                                     // J: Danh sách sản phẩm (ngắn)
      itemsDetail,                                                   // K: Chi tiết sản phẩm (đầy đủ)
      formatPrice(data.totalAmount),                                 // L: Tổng tiền (số)
      formatPrice(data.totalAmount) + '₫',                          // M: Tổng tiền (text)
      formatPrice(Math.round(avgPrice)),                            // N: Giá trung bình
      data.note || '',                                              // O: Ghi chú
      'Mới',                                                        // P: Trạng thái
      '',                                                           // Q: Người xử lý
      '',                                                           // R: Ngày xử lý
      ''                                                            // S: Ghi chú nội bộ
    ];
    
    sheet.appendRow(newRow);
    
    // Format dòng vừa thêm
    const lastRow = sheet.getLastRow();
    formatNewRow(sheet, lastRow);
    
    // Trả về response thành công
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Đơn hàng đã được ghi nhận',
      orderNumber: orderNumber
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log lỗi để debug
    console.error('Error in doPost:', error);
    
    // Trả về lỗi nếu có
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheetHeaders(sheet) {
  // Kiểm tra xem đã có header chưa
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== 'Mã đơn hàng') {
    // Tạo headers
    const headers = [
      'Mã đơn hàng',        // A
      'Ngày đặt',           // B  
      'Giờ đặt',            // C
      'Tên khách hàng',     // D
      'Số điện thoại',      // E
      'Email',              // F
      'Địa chỉ giao hàng',  // G
      'Phương thức TT',     // H
      'Tổng SL',            // I
      'Sản phẩm',           // J
      'Chi tiết SP',        // K
      'Tổng tiền (số)',     // L
      'Tổng tiền',          // M
      'Giá TB',             // N
      'Ghi chú KH',         // O
      'Trạng thái',         // P
      'Người xử lý',        // Q
      'Ngày xử lý',         // R
      'Ghi chú nội bộ'      // S
    ];
    
    // Xóa tất cả dữ liệu cũ và thêm header
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#d70018');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment('center');
    
    // Đặt độ rộng cột
    const columnWidths = [120, 100, 80, 150, 120, 180, 250, 150, 80, 200, 300, 120, 120, 100, 200, 100, 120, 100, 200];
    columnWidths.forEach((width, index) => {
      sheet.setColumnWidth(index + 1, width);
    });
    
    // Freeze header row
    sheet.setFrozenRows(1);
  }
}

function formatNewRow(sheet, rowNumber) {
  // Format dòng dữ liệu
  const dataRange = sheet.getRange(rowNumber, 1, 1, 19);
  
  // Màu nền xen kẽ
  if (rowNumber % 2 === 0) {
    dataRange.setBackground('#f8f9fa');
  } else {
    dataRange.setBackground('#ffffff');
  }
  
  // Format các cột cụ thể
  sheet.getRange(rowNumber, 1).setFontWeight('bold').setFontColor('#d70018'); // Mã đơn hàng
  sheet.getRange(rowNumber, 4).setFontWeight('bold'); // Tên khách hàng
  sheet.getRange(rowNumber, 13).setFontWeight('bold').setFontColor('#d70018'); // Tổng tiền
  sheet.getRange(rowNumber, 16).setFontWeight('bold').setBackground('#fff3cd'); // Trạng thái
  
  // Căn giữa một số cột
  sheet.getRange(rowNumber, 2, 1, 3).setHorizontalAlignment('center'); // Ngày, giờ
  sheet.getRange(rowNumber, 9).setHorizontalAlignment('center'); // Tổng SL
  sheet.getRange(rowNumber, 12, 1, 2).setHorizontalAlignment('right'); // Tổng tiền
  sheet.getRange(rowNumber, 16).setHorizontalAlignment('center'); // Trạng thái
  
  // Wrap text cho các cột dài
  sheet.getRange(rowNumber, 7).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // Địa chỉ
  sheet.getRange(rowNumber, 10, 1, 2).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // Sản phẩm
  sheet.getRange(rowNumber, 15).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // Ghi chú
  sheet.getRange(rowNumber, 19).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // Ghi chú nội bộ
  
  // Set row height
  sheet.setRowHeight(rowNumber, 60);
}

function generateOrderNumber() {
  const now = new Date();
  const dateStr = Utilities.formatDate(now, "GMT+7", "yyyyMMdd");
  const timeStr = Utilities.formatDate(now, "GMT+7", "HHmmss");
  return `MM${dateStr}${timeStr}`;
}

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price);
}

// Test function để kiểm tra
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        customerName: "Nguyễn Văn A",
        phone: "0912345678",
        email: "test@example.com",
        address: "123 Đường ABC, Phường 1, Quận 1, TP.HCM",
        paymentMethod: "Thanh toán khi nhận hàng",
        note: "Giao giờ hành chính",
        items: [
          {
            name: "iPhone 15 Pro Max 256GB",
            color: "Titan Tự Nhiên",
            quantity: 1,
            price: 29990000,
            total: 29990000
          },
          {
            name: "Tai Nghe AirPods Pro 2",
            color: "Trắng",
            quantity: 1,
            price: 6490000,
            total: 6490000
          }
        ],
        totalAmount: 36480000
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

// Function để setup lại sheet (chạy 1 lần nếu cần)
function resetSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  setupSheetHeaders(sheet);
}
```

4. Nhấn **Save** (Ctrl+S) và đặt tên project (ví dụ: "MegaMart Orders")

## Bước 2: Deploy Web App

1. Nhấn nút **Deploy** → **New deployment**

2. Chọn type: **Web app**

3. Cấu hình:
   - **Description**: MegaMart Order Handler
   - **Execute as**: Me (email của bạn)
   - **Who has access**: Anyone (Bất kỳ ai)

4. Nhấn **Deploy**

5. Cho phép quyền truy cập khi được yêu cầu:
   - Nhấn **Authorize access**
   - Chọn tài khoản Google của bạn
   - Nhấn **Advanced** → **Go to [Project name] (unsafe)**
   - Nhấn **Allow**

6. **Copy URL** của Web App (dạng: `https://script.google.com/macros/s/...../exec`)

7. **Test ngay**: Mở URL vừa copy trong trình duyệt để xem trang thông tin hệ thống

## Bước 3: Không cần chuẩn bị gì thêm!

Script sẽ tự động tạo header và format đẹp cho Google Sheet. Bao gồm:

**19 cột thông tin chi tiết:**
- **Mã đơn hàng**: Tự động tạo (MM + ngày + giờ)
- **Ngày đặt**: dd/MM/yyyy  
- **Giờ đặt**: HH:mm:ss
- **Tên khách hàng**: Họ tên đầy đủ
- **Số điện thoại**: Liên hệ
- **Email**: Địa chỉ email (nếu có)
- **Địa chỉ giao hàng**: Địa chỉ đầy đủ
- **Phương thức TT**: COD hoặc Chuyển khoản
- **Tổng SL**: Tổng số lượng sản phẩm
- **Sản phẩm**: Danh sách ngắn gọn
- **Chi tiết SP**: Thông tin chi tiết từng sản phẩm
- **Tổng tiền (số)**: Để tính toán
- **Tổng tiền**: Hiển thị có ₫
- **Giá TB**: Giá trung bình mỗi sản phẩm
- **Ghi chú KH**: Ghi chú từ khách hàng
- **Trạng thái**: Mới/Đang xử lý/Hoàn thành/Hủy
- **Người xử lý**: Nhân viên phụ trách
- **Ngày xử lý**: Thời gian xử lý
- **Ghi chú nội bộ**: Ghi chú của nhân viên

**Tự động format:**
- Header màu đỏ #d70018 với chữ trắng
- Dòng dữ liệu xen kẽ màu trắng/xám nhạt
- Mã đơn hàng và tổng tiền màu đỏ nổi bật
- Trạng thái có background màu vàng nhạt
- Tự động wrap text cho các cột dài
- Freeze header row để luôn nhìn thấy
- Độ rộng cột tối ưu cho từng loại dữ liệu

## Bước 4: Cập nhật code website

Sau khi có URL từ Bước 2, cập nhật file `app/checkout/page.tsx`:

Tìm dòng:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Thay bằng URL bạn vừa copy:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
```

Và bỏ comment phần code gửi request:
```javascript
const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData),
});
```

## Bước 5: Test

1. Vào website của bạn
2. Thêm sản phẩm vào giỏ hàng
3. Tiến hành checkout và điền form
4. Nhấn "Đặt Hàng"
5. Kiểm tra Google Sheet - đơn hàng sẽ xuất hiện trong sheet!

## Lưu ý

- Mode `no-cors` được sử dụng vì Google Apps Script không hỗ trợ CORS đầy đủ
- Đơn hàng vẫn được ghi nhận thành công dù không nhận được response
- Nếu muốn nhận response, cần setup proxy server hoặc sử dụng Google Sheets API

## Troubleshooting

**Lỗi: "Authorization required"**
- Kiểm tra lại quyền truy cập trong Deploy settings
- Đảm bảo chọn "Anyone" có thể truy cập

**Đơn hàng không xuất hiện trong sheet:**
- Kiểm tra URL có đúng không
- Mở Apps Script và xem Logs (View → Logs)
- Chạy function `testDoPost()` để test

**Muốn format đẹp hơn:**
- Có thể thêm màu sắc, border cho cells trong Apps Script
- Sử dụng conditional formatting trong Google Sheets

## Bonus: Các function hữu ích

Sau khi paste code vào Apps Script, bạn có thể chạy các function này:

### 1. Test function
```javascript
// Chạy function testDoPost() để test thử
// Sẽ tạo 1 đơn hàng mẫu trong sheet
```

### 2. Reset sheet
```javascript  
// Chạy function resetSheet() để tạo lại header
// Dùng khi muốn làm mới sheet
```

### 3. Thêm validation rules
Có thể thêm vào cuối script để tự động validate:

```javascript
function addValidationRules() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Validation cho cột Trạng thái (P)
  const statusRange = sheet.getRange('P:P');
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Mới', 'Đang xử lý', 'Đã giao', 'Hoàn thành', 'Hủy'])
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(statusRule);
  
  // Validation cho cột Ngày xử lý (R) - chỉ cho phép ngày
  const dateRange = sheet.getRange('R:R');
  const dateRule = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(false)
    .build();
  dateRange.setDataValidation(dateRule);
}
```

## Kết quả

Sau khi hoàn thành, bạn sẽ có:

✅ **Google Sheet tự động format đẹp**
✅ **19 cột thông tin chi tiết** 
✅ **Mã đơn hàng tự động tạo**
✅ **Màu sắc phân biệt rõ ràng**
✅ **Dễ dàng quản lý và theo dõi**
✅ **Có thể thêm validation rules**
✅ **Freeze header để luôn nhìn thấy**

Chỉ cần copy/paste code và deploy là xong! Không cần setup gì thêm.