# Hướng Dẫn Kết Nối Google Sheets

## Bước 1: Tạo Google Spreadsheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một spreadsheet mới
3. Đặt tên cho sheet (ví dụ: "PhoneStore Orders")
4. Tạo các cột header ở hàng đầu tiên:
   - A1: Timestamp
   - B1: Customer Name
   - C1: Phone
   - D1: Email
   - E1: Address
   - F1: Note
   - G1: Items
   - H1: Total Amount

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheets, vào **Extensions** > **Apps Script**
2. Xóa code mặc định và paste code sau:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Format items as string
    const itemsString = data.items.map(item => 
      `${item.name} (${item.color}) x${item.quantity} = ${item.total.toLocaleString('vi-VN')}đ`
    ).join('\n');
    
    // Append row to sheet
    sheet.appendRow([
      data.timestamp,
      data.customerName,
      data.phone,
      data.email,
      data.address,
      data.note,
      itemsString,
      data.totalAmount
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Order saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (icon đĩa mềm)
4. Đặt tên cho project (ví dụ: "PhoneStore Order Handler")

## Bước 3: Deploy Web App

1. Click **Deploy** > **New deployment**
2. Click icon ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: PhoneStore Order API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Authorize app (cho phép quyền truy cập)
7. **Copy URL** được tạo ra (dạng: `https://script.google.com/macros/s/...../exec`)

## Bước 4: Cập Nhật Code Website

1. Mở file `app/checkout/page.tsx`
2. Tìm dòng:
```typescript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```
3. Thay thế bằng URL vừa copy
4. Uncomment đoạn code fetch:
```typescript
const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData),
});
```
5. Comment hoặc xóa dòng simulate:
```typescript
// await new Promise(resolve => setTimeout(resolve, 2000));
```

## Bước 5: Test

1. Chạy website và thử đặt hàng
2. Kiểm tra Google Sheets xem dữ liệu có được ghi vào không

## Lưu Ý

- **Mode 'no-cors'**: Do CORS policy của Google Apps Script, chúng ta dùng no-cors mode
- **Bảo mật**: URL này là public, nên không nên lưu thông tin nhạy cảm
- **Rate Limiting**: Google Apps Script có giới hạn số lượng request
- **Alternative**: Có thể dùng Google Sheets API với authentication tốt hơn cho production

## Troubleshooting

### Lỗi "Authorization required"
- Chạy lại script trong Apps Script editor một lần để authorize
- Đảm bảo "Who has access" được set là "Anyone"

### Dữ liệu không ghi vào sheet
- Kiểm tra URL có đúng không
- Kiểm tra console log trong Apps Script (View > Logs)
- Đảm bảo sheet đang active là sheet muốn ghi dữ liệu

### CORS errors
- Sử dụng mode: 'no-cors' trong fetch request
- Hoặc deploy qua Vercel/Netlify và dùng serverless function làm proxy
