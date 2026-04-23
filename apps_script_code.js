/*
วิธีใช้งาน:
1. นำโค้ดใหม่นี้ไปวางทับใน Apps Script แล้วกด Deploy -> New Deployment อีกครั้ง
2. นำ Web App URL รอบใหม่นี้ ไปใส่ในไฟล์ assets/js/config.js ของเว็บไซต์
*/

const QUOTES_SHEET_NAME = 'quotes'; // ชื่อ Sheet สำหรับใบเสนอราคา
const LINE_NOTIFY_TOKEN = 'YOUR_LINE_NOTIFY_TOKEN_HERE'; // ใส่ Token จาก LINE Notify สำหรับแจ้งเตือนแอดมิน

function doPost(e) {
  try {
    // ดึงข้อมูลที่ส่งมาจากหน้าฟอร์มที่ฝั่งเว็บ
    const formType = e.parameter.formType || 'quote';

    if (formType === 'quote') {
      // -----------------------------------------------------
      // ระบบรับข้อความจากหน้า "ขอใบเสนอราคา"
      // -----------------------------------------------------
      const quoteSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(QUOTES_SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().insertSheet(QUOTES_SHEET_NAME);

      if (quoteSheet.getLastRow() === 0) {
        quoteSheet.appendRow(['วันที่และเวลา', 'ชื่อ-นามสกุล', 'เบอร์โทรศัพท์', 'อีเมล', 'เวลาสะดวกติดต่อ', 'จังหวัดที่ติดตั้ง', 'ค่าไฟเฉลี่ย/เดือน', 'แพ็คเกจที่สนใจ', 'พื้นที่หลังคา (ตร.ม.)', 'หมายเหตุ', 'สถานะ']);
        quoteSheet.getRange('A1:K1').setFontWeight('bold').setBackground('#efefef');
      }

      const timestamp = e.parameter.timestamp || new Date().toLocaleString();
      const name = e.parameter.name || '-';
      const phone = e.parameter.phone || '-';
      const email = e.parameter.email || '-';
      const contactTime = e.parameter.contactTime || '-';
      const province = e.parameter.province || '-';
      const bill = e.parameter.bill || '-';
      const pkg = e.parameter.package || '-';
      const area = e.parameter.area || '-';
      const notes = e.parameter.notes || '-';
      const status = 'รอติดต่อกลับ';

      quoteSheet.appendRow([timestamp, name, phone, email, contactTime, province, bill, pkg, area, notes, status]);

      // ส่งแจ้งเตือน LINE Notify
      if (LINE_NOTIFY_TOKEN !== 'YOUR_LINE_NOTIFY_TOKEN_HERE' && LINE_NOTIFY_TOKEN !== '') {
        const message = `\n📋 มีลูกค้าร้องขอใบเสนอราคา!\n\nผู้ติดต่อ: ${name}\nเบอร์โทร: ${phone}\nจังหวัด: ${province}\nค่าไฟเฉลี่ย: ${bill} บาท\nแพ็คเกจ: ${pkg}`;
        const options = {
          "method": "post",
          "payload": { "message": message },
          "headers": { "Authorization": "Bearer " + LINE_NOTIFY_TOKEN }
        };
        UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
      }

      return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
    }

    // ตอบกลับกรณีไม่พบ formType
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// -----------------------------------------------------
// ฟังก์ชันสำหรับดึงข้อมูลผ่าน GET Request (ใช้อ่านให้ระบบหลังบ้าน Admin)
// -----------------------------------------------------
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getQuotes') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(QUOTES_SHEET_NAME);
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet quotes not found' })).setMimeType(ContentService.MimeType.JSON);
      }

      const data = sheet.getDataRange().getValues();
      const quotes = [];
      for (let i = 1; i < data.length; i++) {
        quotes.push({
          date: data[i][0] || '',
          name: data[i][1] || '',
          phone: data[i][2] || '',
          email: data[i][3] || '',
          contactTime: data[i][4] || '',
          province: data[i][5] || '',
          bill: data[i][6] || '',
          pkg: data[i][7] || '',
          area: data[i][8] || '',
          notes: data[i][9] || '',
          status: data[i][10] || ''
        });
      }
      return ContentService.createTextOutput(JSON.stringify(quotes.reverse())).setMimeType(ContentService.MimeType.JSON);
    }

    // Default GET response
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', name: 'RaydeeSolar API is running' })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
