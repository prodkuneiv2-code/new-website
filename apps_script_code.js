/*
วิธีใช้งาน:
1. ขอ "Channel Access Token" จากระบบ LINE Webhook (LINE Developers) นำมาใส่ในบรรทัด LINE_ACCESS_TOKEN
2. ใน Google Sheets ให้เพิ่มคอลัมน์ I (คอลัมน์ที่ 9) ตั้งชื่อว่า "สถานะการจัดส่ง" เพื่อให้คุณคอยอัปเดตสถานะ (เช่น กำลังแพ็ค, จัดส่งแล้ว)
3. เอาโค้ดใหม่นี้ไปวางทับใน Apps Script แล้วกด Deploy -> New Deployment อีกครั้ง
4. นำ Web App URL รอบใหม่นี้ ไปใส่ใน Webhook URL ใน LINE Developers และกด Verify
*/

const SHEET_NAME = 'database'; // ชื่อ Sheet ใน Google Sheets หากเปลี่ยนชื่อต้องแก้ตรงนี้ด้วย
const CONTACT_SHEET_NAME = 'contacts'; // ชื่อ Sheet สำหรับหน้าติดต่อเรา
const INVENTORY_SHEET_NAME = 'inventory'; // ชื่อ Sheet สำหรับคลังสินค้า (สต็อก)
const LINE_ACCESS_TOKEN = 'XJepK/GlXhQ81kq2Fbbd21Uol3BI2ZDuxBKVfP4Xxyqrcm0NoqfhyiNolyWwsnlGIcUtxwpPcwJrSSMbK4B03GPiejFv7n+30HUNbSstKSYzwOG5vUWi03H76nuEsiUzsbNTpo4JuV4aIw5NwzWlKQdB04t89/1O/w1cDnyilFU='; // เอามาจาก LINE Developers
const LINE_NOTIFY_TOKEN = 'YOUR_LINE_NOTIFY_TOKEN_HERE'; // ใส่ Token จาก LINE Notify สำหรับแจ้งเตือนแอดมิน

function doPost(e) {
  try {
    // -----------------------------------------------------
    // 1. ตรวจสอบว่าข้อมูลส่งมาจาก LINE หรือจากหน้าเว็บ
    // -----------------------------------------------------
    let isFromLine = false;
    let lineData = null;

    if (e.postData && e.postData.contents) {
      try {
        lineData = JSON.parse(e.postData.contents);
        if (lineData.events) {
          isFromLine = true; // ยืนยันว่ามาจาก LINE แน่นอน
        }
      } catch (err) {
        // หากแปลง JSON ไม่ได้ แสดงว่าเป็นข้อมูล Form จากหน้าเว็บ (ปล่อยผ่านไปทำ Part 2)
      }
    }

    if (isFromLine) {
      // -----------------------------------------------------
      // ส่วนของบอท LINE
      // -----------------------------------------------------
      try {
        if (lineData.events.length > 0) {
          lineData.events.forEach(event => {
            if (event.type === 'message' && event.message.type === 'text') {
              const userMessage = event.message.text.trim().toUpperCase();
              const replyToken = event.replyToken;

              if (userMessage.startsWith('R') || userMessage.startsWith('RS')) {
                replyOrderStatus(replyToken, userMessage);
              }
            }
          });
        }
      } catch (botErr) {
        // ดักจับ Error ในบอท เพื่อไม่ให้โปรแกรมพังแล้วเผลอหลุดลงไปบันทึก Sheet ว่างๆ ปลอมๆ
      }
      // จบการทำงานของฝั่ง LINE ทันทีตรงนี้ ไม่ให้ข้ามไปบันทึก Database
      return HtmlService.createHtmlOutput("OK");
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
        'สถานะการจัดส่ง', // คอลัมน์ที่ 9 สำหรับให้บอทอ่านไปตอบลูกค้า
        'จังหวัด',
        'ค่าจัดส่ง'
      ]);
      sheet.getRange('A1:K1').setFontWeight('bold').setBackground('#efefef');
      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(6, 300);
      sheet.setColumnWidth(7, 300);
      sheet.setColumnWidth(9, 200);
    }

    // ดึงข้อมูลที่ส่งมาจากหน้าฟอร์มที่ฝั่งเว็บ
    const formType = e.parameter.formType || 'checkout';

    if (formType === 'updateStatus') {
      const trackingIdToUpdate = e.parameter.trackingId;
      const newStatus = e.parameter.status;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === trackingIdToUpdate) {
          sheet.getRange(i + 1, 9).setValue(newStatus);
          return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'message': 'Not found' })).setMimeType(ContentService.MimeType.JSON);
    }

    if (formType === 'contact') {
      // -----------------------------------------------------
      // ระบบรับข้อความจากหน้า "ติดต่อเรา"
      // -----------------------------------------------------
      const contactSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONTACT_SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().insertSheet(CONTACT_SHEET_NAME);

      if (contactSheet.getLastRow() === 0) {
        contactSheet.appendRow(['วันที่และเวลา', 'ชื่อ-นามสกุล', 'เบอร์โทรศัพท์', 'หัวข้อที่ติดต่อ', 'รายละเอียด']);
        contactSheet.getRange('A1:E1').setFontWeight('bold').setBackground('#efefef');
      }

      const timestamp = e.parameter.timestamp || new Date().toLocaleString();
      const name = e.parameter.name || '-';
      const phone = e.parameter.phone || '-';
      const topic = e.parameter.topic || '-';
      const detail = e.parameter.detail || '-';

      contactSheet.appendRow([timestamp, name, phone, topic, detail]);

      // ส่งแจ้งเตือน LINE Notify
      if (LINE_NOTIFY_TOKEN !== 'YOUR_LINE_NOTIFY_TOKEN_HERE' && LINE_NOTIFY_TOKEN !== '') {
        const message = `\n🔔 มีข้อความติดต่อใหม่!\n\nผู้ติดต่อ: ${name}\nเบอร์โทร: ${phone}\nหัวข้อ: ${topic}\nรายละเอียด: ${detail}`;
        const options = {
          "method": "post",
          "payload": { "message": message },
          "headers": { "Authorization": "Bearer " + LINE_NOTIFY_TOKEN }
        };
        UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
      }

      return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
    }

    // -----------------------------------------------------
    // ระบบรับข้อความจากตระกร้าสินค้า (Checkout)
    // -----------------------------------------------------
    const trackingId = e.parameter.trackingId || '-';
    const timestamp_co = e.parameter.timestamp || new Date().toLocaleString();
    const name_co = e.parameter.name || '-';
    const phone_co = e.parameter.phone || '-';
    const email_co = e.parameter.email || '-';
    const address_co = e.parameter.address || '-';
    const orderSummary_co = e.parameter.orderSummary || '-';
    const total_co = e.parameter.total || '0';
    const province_co = e.parameter.province || '-';
    const shippingFee_co = e.parameter.shippingFee || '0';
    const defaultStatus = 'ได้รับคำสั่งซื้อแล้ว (รอดำเนินการ)';

    // เพิ่มข้อมูลลงในแถวใหม่
    sheet.appendRow([
      trackingId,
      timestamp_co,
      name_co,
      phone_co,
      email_co,
      address_co,
      orderSummary_co,
      total_co,
      defaultStatus,
      province_co,      // คอลัมน์ 10 
      shippingFee_co    // คอลัมน์ 11
    ]);

    // -----------------------------------------------------
    // ลดสต็อกสินค้าใน Sheet: inventory
    // -----------------------------------------------------
    try {
      if (e.parameter.cartData) {
        let cartItems = JSON.parse(e.parameter.cartData);
        let invSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(INVENTORY_SHEET_NAME);

        // หากไม่มี Sheet inventory ให้สร้างใหม่และใส่ค่าเริ่มต้น
        if (!invSheet) {
          invSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(INVENTORY_SHEET_NAME);
          invSheet.appendRow(['รหัสสินค้า', 'ชื่อสินค้า', 'จำนวนคงเหลือ']);
          invSheet.getRange('A1:C1').setFontWeight('bold').setBackground('#efefef');
          // Mock data สินค้าหลัก
          invSheet.appendRow(['1', 'แผงโซล่าเซลล์ 230W (มือสอง)', 50]);
        }

        let invData = invSheet.getDataRange().getValues();
        // ลูปหาและลดสต็อก
        for (let k = 0; k < cartItems.length; k++) {
          let orderItem = cartItems[k];
          for (let i = 1; i < invData.length; i++) {
            if (invData[i][0] && invData[i][0].toString() === orderItem.id.toString()) {
              let currentStock = parseInt(invData[i][2]) || 0;
              let newStock = Math.max(0, currentStock - orderItem.quantity);
              invSheet.getRange(i + 1, 3).setValue(newStock);
              break;
            }
          }
        }
      }
    } catch (err) {
      console.error("Inventory update error:", err.message);
    }

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

      statusMessage = `ตรวจสอบพบข้อมูลของคุณ ${name} เรียบร้อยค่ะ\n\n📦 หมายเลขพัสดุ: ${trackingId}\n\n=================\n📌 สถานะปัจจุบัน:\n👉 ${status}\n=================\nหากมีข้อสงสัยเพิ่มเติม สามารถพิมพ์สอบถามแอดมินทิ้งไว้ได้เลยค่ะ`;
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
    'muteHttpExceptions': true, // ป้องกันการ Crash เวลากดปุ่ม Verify ในหน้าตั้งค่า LINE
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

// -----------------------------------------------------
// ฟังก์ชันสำหรับดึงข้อมูลผ่าน GET Request (ใช้อ่านให้ระบบหลังบ้าน Admin)
// -----------------------------------------------------
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getOrders') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
      }

      const data = sheet.getDataRange().getValues();
      const orders = [];
      // ข้ามหัวตารางที่แถวแรก (i=1)
      for (let i = 1; i < data.length; i++) {
        orders.push({
          trackingId: data[i][0] || '',
          date: data[i][1] || '',
          name: data[i][2] || '',
          phone: data[i][3] || '',
          email: data[i][4] || '',
          address: data[i][5] || '',
          items: data[i][6] || '',
          total: data[i][7] || 0,
          status: data[i][8] || ''
        });
      }
      // รีเทิร์นข้อมูลกลับโดยเรียงรายการใหม่สุดขึ้นก่อน
      return ContentService.createTextOutput(JSON.stringify(orders.reverse())).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'getContacts') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONTACT_SHEET_NAME);
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet contacts not found' })).setMimeType(ContentService.MimeType.JSON);
      }

      const data = sheet.getDataRange().getValues();
      const contacts = [];
      // ข้ามหัวตารางที่แถวแรก (i=1)
      for (let i = 1; i < data.length; i++) {
        contacts.push({
          date: data[i][0] || '',
          name: data[i][1] || '',
          phone: data[i][2] || '',
          topic: data[i][3] || '',
          detail: data[i][4] || ''
        });
      }
      // รีเทิร์นข้อมูลกลับโดยเรียงรายการใหม่สุดขึ้นก่อน
      return ContentService.createTextOutput(JSON.stringify(contacts.reverse())).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'getInventory') {
      let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(INVENTORY_SHEET_NAME);
      if (!sheet) {
        // ลองสร้างจำลองตอน GET เผื่อยังไม่มี
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(INVENTORY_SHEET_NAME);
        sheet.appendRow(['รหัสสินค้า', 'ชื่อสินค้า', 'จำนวนคงเหลือ']);
        sheet.getRange('A1:C1').setFontWeight('bold').setBackground('#efefef');
        sheet.appendRow(['1', 'แผงโซล่าเซลล์ 230W (มือสอง)', 50]);
      }

      const data = sheet.getDataRange().getValues();
      const inventory = [];
      for (let i = 1; i < data.length; i++) {
        inventory.push({
          id: data[i][0] ? data[i][0].toString() : '',
          name: data[i][1] || '',
          stock: parseInt(data[i][2]) || 0
        });
      }
      return ContentService.createTextOutput(JSON.stringify(inventory)).setMimeType(ContentService.MimeType.JSON);
    }

    // Default GET response
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', name: 'RaydeeSolar API is running' })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
