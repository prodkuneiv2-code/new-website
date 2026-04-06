/* ================================================================
   RaydeeSolar — Configuration & Constants
   ================================================================ */

// ── API Keys ──
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzghxato9j8nSYCILSNR3jM5wSAGGtqjw8KiaPje80ujDddL_lnSb2uyT57D4l6shg/exec';

// ── Admin Credentials ──
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'solar1234';

// ── localStorage Keys ──
const LS_KEYS = {
  products: 'solar_products',
  cart: 'solar_cart',
  orders: 'solar_orders',
  quotes: 'solar_quotes',
  messages: 'solar_messages',
  shippingConfig: 'solar_shipping_config',
  siteConfig: 'solar_site_config',
  adminSession: 'solar_admin_session'
};

// ── Default Shipping Config ──
const DEFAULT_SHIPPING_CONFIG = {
  perPanel: 450,
  accessoryFlat: 150,
  zoneA: 1000,   // 0-100 km
  zoneB: 1500,   // 101-250 km
  zoneC: 2000    // 251+ km
};

// ── Default Site Config ──
const DEFAULT_SITE_CONFIG = {
  shopName: 'RaydeeSolar โซล่าเซลล์สระบุรี',
  phone: '089-123-4567',
  email: 'contact@raydeesolar.com',
  lineId: '@raydeesolar',
  address: '123 ถนนพหลโยธิน ตำบลปากเพรียว อำเภอเมือง จังหวัดสระบุรี 18000',
  bankName: 'ธนาคารกสิกรไทย',
  bankAccountName: 'บริษัท เรย์ดีโซล่า จำกัด',
  bankAccountNumber: 'XXX-X-XXXXX-X',
  promptPayNumber: '0891234567',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61578644667892',
  lineUrl: 'https://line.me/R/ti/p/@312ntoyv'
};

// ── Default Products (10 items) ──
const DEFAULT_PRODUCTS = [
  {
    id: 'P001', name: 'แผงโซล่าเซลล์ 550W Mono PERC',
    category: 'แผงโซล่า', price: 5900, stock: 50, status: 'active',
    image: '', description: 'แผงโซล่าเซลล์โมโนคริสตัลไลน์ประสิทธิภาพสูง 550W เทคโนโลยี PERC เหมาะสำหรับบ้านและโรงงาน',
    specs: 'กำลังไฟ: 550W | ประเภท: Mono PERC | ขนาด: 2278×1134×35mm | น้ำหนัก: 28.6 kg | ประกัน: 25 ปี'
  },
  {
    id: 'P002', name: 'แผงโซล่าเซลล์ 400W Half-Cut',
    category: 'แผงโซล่า', price: 4500, stock: 80, status: 'active',
    image: '', description: 'แผงโซล่าเซลล์แบบ Half-Cut 400W ประสิทธิภาพสูง ทนทานต่อเงาบัง ลดการสูญเสียพลังงาน',
    specs: 'กำลังไฟ: 400W | ประเภท: Mono Half-Cut | ขนาด: 1722×1134×30mm | น้ำหนัก: 21.5 kg | ประกัน: 25 ปี'
  },
  {
    id: 'P003', name: 'แผงโซล่าเซลล์ 230W มือสอง (สภาพดี)',
    category: 'แผงโซล่า', price: 1800, stock: 120, status: 'active',
    image: '', description: 'แผงโซล่าเซลล์มือสอง 230W ผ่านการคัดและทดสอบแล้ว สภาพ 85-90% เหมาะกับระบบประหยัดงบ',
    specs: 'กำลังไฟ: 230W | ประเภท: Poly | สภาพ: 85-90% | ประกัน: 3 เดือน'
  },
  {
    id: 'P004', name: 'อินเวอร์เตอร์ Hybrid 5kW',
    category: 'อินเวอร์เตอร์', price: 25000, stock: 15, status: 'active',
    image: '', description: 'อินเวอร์เตอร์ไฮบริด 5kW รองรับแบตเตอรี่ มี MPPT 2 ช่อง Wi-Fi monitoring ในตัว',
    specs: 'กำลังไฟ: 5kW | ประเภท: Hybrid | MPPT: 2 ช่อง | Wi-Fi: มี | ประกัน: 5 ปี'
  },
  {
    id: 'P005', name: 'อินเวอร์เตอร์ On-Grid 3kW',
    category: 'อินเวอร์เตอร์', price: 12000, stock: 20, status: 'active',
    image: '', description: 'อินเวอร์เตอร์แบบ On-Grid 3kW สำหรับระบบเชื่อมต่อการไฟฟ้า ประสิทธิภาพสูง 97.8%',
    specs: 'กำลังไฟ: 3kW | ประเภท: On-Grid | ประสิทธิภาพ: 97.8% | ประกัน: 5 ปี'
  },
  {
    id: 'P006', name: 'แบตเตอรี่ LiFePO4 51.2V 100Ah (5.12kWh)',
    category: 'แบตเตอรี่', price: 45000, stock: 10, status: 'active',
    image: '', description: 'แบตเตอรี่ลิเธียมไอรอนฟอสเฟต 5.12kWh อายุการใช้งานยาวนาน 6000+ รอบ รองรับการต่อขนาน',
    specs: 'ความจุ: 5.12kWh | แรงดัน: 51.2V | รอบชาร์จ: 6000+ | ประกัน: 10 ปี'
  },
  {
    id: 'P007', name: 'แบตเตอรี่ LiFePO4 48V 200Ah (10kWh)',
    category: 'แบตเตอรี่', price: 85000, stock: 5, status: 'active',
    image: '', description: 'แบตเตอรี่ลิเธียม 10kWh ขนาดใหญ่ สำหรับระบบ Off-Grid หรือสำรองไฟ BMS ในตัว',
    specs: 'ความจุ: 10kWh | แรงดัน: 48V | BMS: ในตัว | รอบชาร์จ: 6000+ | ประกัน: 10 ปี'
  },
  {
    id: 'P008', name: 'สายไฟโซล่าเซลล์ PV1-F 6mm² (100 เมตร)',
    category: 'สายและอุปกรณ์', price: 2800, stock: 40, status: 'active',
    image: '', description: 'สายไฟสำหรับระบบโซล่าเซลล์ มาตรฐาน TUV ทนแดด UV ใช้งานกลางแจ้งได้ 25 ปี',
    specs: 'ขนาด: 6mm² | ความยาว: 100m | มาตรฐาน: TUV | ทนแรงดัน: 1000V DC'
  },
  {
    id: 'P009', name: 'ชุด MC4 Connector (10 คู่)',
    category: 'สายและอุปกรณ์', price: 450, stock: 100, status: 'active',
    image: '', description: 'ชุดคอนเนคเตอร์ MC4 สำหรับเชื่อมต่อแผงโซล่าเซลล์ กันน้ำ IP67 ทนทาน',
    specs: 'จำนวน: 10 คู่ (Male+Female) | พิกัดกระแส: 30A | กันน้ำ: IP67'
  },
  {
    id: 'P010', name: 'ชุดติดตั้งโซล่าเซลล์สำเร็จรูป 3kW',
    category: 'ชุดสำเร็จรูป', price: 89000, stock: 8, status: 'active',
    image: '', description: 'ชุดโซล่าเซลล์แบบ On-Grid 3kW พร้อมติดตั้ง ประกอบด้วย แผง 550W x 6, อินเวอร์เตอร์ 3kW, สาย, อุปกรณ์ครบ',
    specs: 'ขนาดระบบ: 3kW | แผง: 550W x 6 แผง | อินเวอร์เตอร์: 3kW On-Grid | อุปกรณ์ครบชุด'
  }
];

// ── Province Distance Map (fallback for Google Maps API) ──
const PROVINCE_DISTANCES = {
  'สระบุรี':0, 'ลพบุรี':50, 'นครนายก':60, 'ปทุมธานี':80,
  'พระนครศรีอยุธยา':65, 'นครปฐม':130, 'สิงห์บุรี':80,
  'อ่างทอง':75, 'ชัยนาท':120, 'กรุงเทพมหานคร':110,
  'นนทบุรี':100, 'สมุทรปราการ':120, 'สมุทรสาคร':140,
  'สมุทรสงคราม':160, 'ราชบุรี':170, 'กาญจนบุรี':220,
  'สุพรรณบุรี':150, 'นครราชสีมา':150,
  'ชลบุรี':140, 'ระยอง':180, 'จันทบุรี':250, 'ตราด':310,
  'ฉะเชิงเทรา':100, 'ปราจีนบุรี':80, 'สระแก้ว':160,
  'เพชรบุรี':210, 'ประจวบคีรีขันธ์':300,
  'นครสวรรค์':180, 'อุทัยธานี':200, 'พิจิตร':230,
  'เพชรบูรณ์':200, 'พิษณุโลก':280, 'สุโขทัย':320,
  'อุตรดิตถ์':350, 'ตาก':380, 'กำแพงเพชร':300,
  'ลำปาง':500, 'ลำพูน':530, 'เชียงใหม่':560,
  'เชียงราย':620, 'แม่ฮ่องสอน':700, 'พะเยา':580,
  'แพร่':420, 'น่าน':480,
  'ขอนแก่น':300, 'อุดรธานี':400, 'หนองคาย':450,
  'มหาสารคาม':320, 'กาฬสินธุ์':380, 'ร้อยเอ็ด':360,
  'บุรีรัมย์':250, 'สุรินทร์':300, 'ศรีสะเกษ':400,
  'อุบลราชธานี':450, 'ยโสธร':400, 'อำนาจเจริญ':430,
  'นครพนม':520, 'มุกดาหาร':480, 'สกลนคร':470,
  'หนองบัวลำภู':370, 'เลย':380, 'ชัยภูมิ':200,
  'สุราษฎร์ธานี':530, 'นครศรีธรรมราช':620, 'สงขลา':750,
  'พัทลุง':680, 'ตรัง':660, 'กระบี่':640, 'ภูเก็ต':700,
  'พังงา':660, 'ระนอง':550, 'ชุมพร':420, 'ปัตตานี':800,
  'ยะลา':820, 'นราธิวาส':860, 'สตูล':780, 'บึงกาฬ':500
};
