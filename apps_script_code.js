/*
วิธีใช้งาน:
1. สร้าง Google Sheets ใหม่ขึ้นมา 1 ไฟล์
2. ไปที่เมนู ส่วนขยาย (Extensions) -> Apps Script (หรือ สคริปต์ของแอป)
3. ลบโค้ดที่มีอยู่ทั้งหมดออก และนำโค้ดด้านล่างนี้ไปวางแทน
4. กดบันทึก (หรือกด Ctrl + S)
5. กดปุ่มด้านบนขวา "การทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้รายการใหม่" (New deployment)
6. เลือกประเภทการทำให้ใช้งานได้ เป็น "เว็บแอป" (Web app) โดยกดรููปเฟือง
7. ช่องการเข้าถึง (Who has access) ให้เลือกเป็น "ทุกคน" (Anyone)
8. กด "ทำให้ใช้งานได้" (Deploy)
9. ระบบอาจจะให้การอนุมัติสิทธิ์ (Authorize access) ให้ใช้อีเมลตัวเองกดยอมรับให้เรียบร้อย
10. เมื่อเสร็จสิ้น คุณจะได้ "URL ของเว็บแอป" ให้ก๊อปปี้ URL นั้น
11. นำ URL นั้นไปใส่ในไฟล์ script.js บรรทัดที่เขียนว่า "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
*/

const SHEET_NAME = 'Sheet1'; // ชื่อ Sheet ใน Google Sheets หากเปลี่ยนชื่อต้องแก้ตรงนี้ด้วย

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // ตั้งค่าหัวตาราง (Headers) หากหน้าชีทยังว่างเปล่า
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'วันที่และเวลา', 
        'ชื่อ-นามสกุล', 
        'เบอร์โทร', 
        'อีเมล', 
        'ที่อยู่', 
        'รายละเอียดสินค้า', 
        'ยอดรวม (บาท)'
      ]);
      // ปรับแต่งหน้าตาตารางเล็กน้อย
      sheet.getRange('A1:G1').setFontWeight('bold').setBackground('#efefef');
      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(2, 150);
      sheet.setColumnWidth(3, 120);
      sheet.setColumnWidth(4, 180);
      sheet.setColumnWidth(5, 300);
      sheet.setColumnWidth(6, 300);
      sheet.setColumnWidth(7, 100);
    }

    // ดึงข้อมูลที่ส่งมาจากหน้าฟอร์มที่ฝั่งเว็บ
    const timestamp = e.parameter.timestamp || new Date().toLocaleString();
    const name = e.parameter.name || '-';
    const phone = e.parameter.phone || '-';
    const email = e.parameter.email || '-';
    const address = e.parameter.address || '-';
    const orderSummary = e.parameter.orderSummary || '-';
    const total = e.parameter.total || '0';

    // เพิ่มข้อมูลลงในแถวใหม่
    sheet.appendRow([
      timestamp,
      name,
      phone,
      email,
      address,
      orderSummary,
      total
    ]);

    // ตอบกลับว่าทำงานสำเร็จ (ตอบกลับเป็น JSON)
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
