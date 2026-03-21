/*
วิธีใช้งาน:
1. ขอ "Channel Access Token" จากระบบ LINE Webhook (LINE Developers) นำมาใส่ในบรรทัด LINE_ACCESS_TOKEN
2. ใน Google Sheets ให้เพิ่มคอลัมน์ I (คอลัมน์ที่ 9) ตั้งชื่อว่า "สถานะการจัดส่ง" เพื่อให้คุณคอยอัปเดตสถานะ (เช่น กำลังแพ็ค, จัดส่งแล้ว)
3. เอาโค้ดใหม่นี้ไปวางทับใน Apps Script แล้วกด Deploy -> New Deployment อีกครั้ง
4. นำ Web App URL รอบใหม่นี้ ไปใส่ใน Webhook URL ใน LINE Developers และกด Verify
*/

const SHEET_NAME = 'database'; // ชื่อ Sheet ใน Google Sheets หากเปลี่ยนชื่อต้องแก้ตรงนี้ด้วย
const LINE_ACCESS_TOKEN = 'XJepK/GlXhQ81kq2Fbbd21Uol3BI2ZDuxBKVfP4Xxyqrcm0NoqfhyiNolyWwsnlGIcUtxwpPcwJrSSMbK4B03GPiejFv7n+30HUNbSstKSYzwOG5vUWi03H76nuEsiUzsbNTpo4JuV4aIw5NwzWlKQdB04t89/1O/w1cDnyilFU='; // เอามาจาก LINE Developers

function doPost(e) {
  try {
    // -----------------------------------------------------
    // -----------------------------------------------------
    // 1. ระบบจัดการข้อความจาก LINE OA (Webhook)
    // -----------------------------------------------------
    if (e.postData && e.postData.contents) {
      try {
        const lineData = JSON.parse(e.postData.contents);

        // วนลูปเช็ค Event ว่ามีใครทักมาหรือไม่ (ต้องเป็นข้อมูลตระกูล LINE เท่านั้นถึงจะมี events)
        if (lineData.events) {
          if (lineData.events.length > 0) {
            lineData.events.forEach(event => {
              if (event.type === 'message' && event.message.type === 'text') {
                const userMessage = event.message.text.trim();
                const replyToken = event.replyToken;

                // เช็คว่าข้อความที่ลูกค้าพิมพ์มา เป็นรหัสพัสดุ (ขึ้นต้นด้วย RS) หรือไม่
                if (userMessage.startsWith('RS')) { // ตัวอย่างรหัส RS260321-ABCD
                  replyOrderStatus(replyToken, userMessage);
                }
              }
            });
          }
          return HtmlService.createHtmlOutput("OK");
        }
      } catch (err) {
        // หากแปลง JSON ไม่ได้ (เพราะเป็นข้อมูลรหัสออเดอร์จากหน้าเว็บเพจ) ให้ข้ามการทำงานบอทไปทำส่วนที่ 2 แทน
      }
    }

    // -----------------------------------------------------
    // 2. ระบบดึงข้อมูลจากหน้าเว็บ (บันทึกลง Database)
    // -----------------------------------------------------
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // ตั้งค่าหัวตาราง (Headers) หากหน้าชีทยังว่างเปล่า
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'เลขพัสดุ (Tracking ID)',
        'วันที่และเวลา',
        'ชื่อ-นามสกุล',
        'เบอร์โทร',
        'อีเมล',
        'ที่อยู่',
        'รายละเอียดสินค้า',
        'ยอดรวม (บาท)',
        'สถานะการจัดส่ง' // คอลัมน์ที่ 9 สำหรับให้บอทอ่านไปตอบลูกค้า
      ]);
      sheet.getRange('A1:I1').setFontWeight('bold').setBackground('#efefef');
      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(6, 300);
      sheet.setColumnWidth(7, 300);
      sheet.setColumnWidth(9, 200);
    }

    // ดึงข้อมูลที่ส่งมาจากหน้าฟอร์มที่ฝั่งเว็บ
    const trackingId = e.parameter.trackingId || '-';
    const timestamp = e.parameter.timestamp || new Date().toLocaleString();
    const name = e.parameter.name || '-';
    const phone = e.parameter.phone || '-';
    const email = e.parameter.email || '-';
    const address = e.parameter.address || '-';
    const orderSummary = e.parameter.orderSummary || '-';
    const total = e.parameter.total || '0';
    const defaultStatus = 'ได้รับคำสั่งซื้อแล้ว (รอดำเนินการ)';

    // เพิ่มข้อมูลลงในแถวใหม่
    sheet.appendRow([
      trackingId,
      timestamp,
      name,
      phone,
      email,
      address,
      orderSummary,
      total,
      defaultStatus
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

// -----------------------------------------------------
// ฟังก์ชันสำหรับดึงสถานะจาก Google Sheets ไปตอบกลับใน LINE
// -----------------------------------------------------
function replyOrderStatus(replyToken, trackingId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  let statusMessage = `ไม่พบข้อมูลหมายเลขคำสั่งซื้อ: ${trackingId}\n\nกรุณาตรวจสอบอักษรและตัวเลขให้ถูกต้องอีกครั้งครับ (ตัวพิมพ์เล็ก/พิมพ์ใหญ่อาจมีผล)`;

  // ค้นหารหัสพัสดุจากแถวที่ 2 เป็นต้นไป (ข้ามหัวตาราง)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === trackingId) { // คอลัมน์ที่ 1 (A) คือ Tracking ID
      const name = data[i][2]; // คอลัมน์ที่ 3 (C) คือ ชื่อลูกค้า
      const status = data[i][8] || "กำลังตรวจสอบข้อมูล"; // คอลัมน์ที่ 9 (I) คือ สถานะการจัดส่ง

      statusMessage = `ตรวจสอบพบข้อมูลของคุณ ${name} เรียบร้อยครับ\n\n📦 หมายเลขพัสดุ: ${trackingId}\n\n=================\n📌 สถานะปัจจุบัน:\n👉 ${status}\n=================\nหากมีข้อสงสัยเพิ่มเติม สามารถพิมพ์สอบถามแอดมินทิ้งไว้ได้เลยครับ`;
      break;
    }
  }

  // ส่งข้อความตอบกลับไปยัง LINE API
  const url = 'https://api.line.me/v2/bot/message/reply';
  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
    },
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': statusMessage
      }]
    })
  };

  UrlFetchApp.fetch(url, options);
}
