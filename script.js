document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    // Initial check in case page is loaded not at top
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Scroll to top button
    const toTopBtn = document.getElementById('toTopBtn');

    // --- Dictionary System ---
    const i18nDict = {
        th: {
            "nav_home": "หน้าแรก", "nav_about": "เกี่ยวกับเรา", "nav_products": 'สินค้า <i class="fas fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i>', "nav_contact": "ติดต่อเรา",
            "nav_cart": '🛒 ตะกร้า <span id="cart-count">0</span>',
            "cat_1_short": "แผงโซล่าเซลล์", "cat_2_short": "อินเวอร์เตอร์", "cat_3_short": "ปั้มน้ำโซล่าเซลล์",
            "hero_title": "เปลี่ยนพลังงานแสงอาทิตย์<br>ให้เป็นพลังงานของคุณ",
            "hero_sub": "ลดค่าไฟและรักษาสิ่งแวดล้อมด้วยแผงโซล่าเซลล์ประสิทธิภาพสูงของเรา ที่ออกแบบมาเพื่อให้เข้ากับบ้านและธุรกิจยุคใหม่",
            "hero_btn1": "ดูสินค้าของเรา", "hero_btn2": "ปรึกษาฟรี",
            "why_title": "ทำไมต้องเลือกเรา?", "why_sub": "นวัตกรรมล่าสุดเพื่อประสิทธิภาพที่ดีที่สุดสำหรับคุณ",
            "f1_title": "ประสิทธิภาพสูง", "f1_desc": "รับพลังงานแสงอาทิตย์ได้สูงสุดแม้ในวันที่แดดอ่อน ด้วยเทคโนโลยีขั้นสูง",
            "f2_title": "ทนทานยาวนาน", "f2_desc": "วัสดุเกรดพรีเมียม ทนทานต่อทุกสภาพอากาศ รับประกันยาวนาน 25 ปี",
            "f3_title": "คุ้มค่าการลงทุน", "f3_desc": "จุดคุ้มทุนเร็ว ช่วยลดค่าไฟได้สูงสุดถึง 70% ต่อเดือนในระยะยาว",
            "port_title": "ผลงานของเรา", "port_sub": "ตัวอย่างการติดตั้งแผงโซล่าเซลล์จากลูกค้าที่ไว้วางใจเรา",
            "port_sl_1_h": "บ้านพักอาศัย 2 ชั้น", "port_sl_1_p": "ประหยัดค่าไฟ 3,000+ บาท/เดือน คืนทุนไวใน 4 ปี",
            "port_sl_2_h": "โฮมออฟฟิศ / ออฟฟิศ", "port_sl_2_p": "ลดต้นทุนธุรกิจระยะยาว ใช้งานไฟกลางวันคุ้มค่า",
            "port_sl_3_h": "อาคารพานิชย์ / โรงงาน", "port_sl_3_p": "ระบบมาตรฐานยอดเยี่ยม รับประกันแผงยาวนาน 25 ปี",
            "prod_title": "ผลิตภัณฑ์ของเรา", "prod_sub": "เลือกผลิตภัณฑ์ที่เหมาะกับความต้องการของคุณ",
            "cat_1": "แผงโซล่าเซลล์ (Solar Panels)", "cat_2": "อินเวอร์เตอร์ (Inverters)", "cat_3": "ปั้มน้ำโซล่าเซลล์ (Solar Pumps)",
            "desc_1": "แผงโมโนคริสตัลไลน์ประสิทธิภาพสูง เหมาะสำหรับหลังคามีพื้นที่จำกัด",
            "desc_2": "แผงโพลีคริสตัลไลน์คุ้มราคา ประสิทธิภาพเสถียร เหมาะกับทุกสภาพอากาศ",
            "desc_3": "อินเวอร์เตอร์ระบบไฮบริดอัจฉริยะ รองรับแบตเตอรี่และเชื่อมต่อแอพได้",
            "desc_4": "ปั๊มน้ำบาดาลโซล่าเซลล์ ประหยัดพลังงาน สูบน้ำได้ลึก ทนทานสูง",
            "overlay_cart": `<i class="fas fa-cart-plus"></i> หยิบใส่ตะกร้า`,
            "overlay_view": `<i class="fas fa-eye"></i> ดูรายละเอียด`,
            "btn_cart": "หยิบใส่ตะกร้า",
            "cta_title": "พร้อมที่จะเปลี่ยนมาใช้พลังงานสะอาดหรือยัง?",
            "cta_sub": "ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและประเมินพื้นที่ฟรี", "cta_btn": "ติดต่อประเมินหน้างานฟรี",
            "f_desc": "ผู้นำด้านเทคโนโลยีพลังงานแสงอาทิตย์ ให้บริการครบวงจรตั้งแต่ให้คำปรึกษาจนถึงติดตั้งและบำรุงรักษา",
            "f_link_title": "ลิงก์ด่วน", "f_contact_title": "ติดต่อเรา",
            "f_link1": "หน้าแรก", "f_link2": "เกี่ยวกับเรา", "f_link3": "สินค้าและการบริการ", "f_link4": "บทความให้ความรู้",
            "badge_best": "ขายดี", "badge_new": "ใหม่", "f_rights": "&copy; 2026 RaydeeSolar. All rights reserved.",
            "proc_h2": "ขั้นตอนการให้บริการ", "proc_p": "ดำเนินการอย่างมืออาชีพ ครบจบในที่เดียว",
            "p1_h": "1. ปรึกษาฟรี", "p1_p": "รับฟังความต้องการและประเมินราคาเบื้องต้นตามการใช้งานจริง",
            "p2_h": "2. สำรวจพื้นที่", "p2_p": "เข้าดูหน้างานจริงเพื่อออกแบบระบบและโครงสร้างให้เหมาะสม",
            "p3_h": "3. ดำเนินการติดตั้ง", "p3_p": "ติดตั้งโดยทีมช่างผู้เชี่ยวชาญ พร้อมดำเนินการเรื่องเอกสารขออนุญาต",
            "p4_h": "4. ส่งมอบงาน", "p4_p": "ทดสอบระบบ แนะนำการใช้งาน และรับประกันบริการหลังการขาย",
            "faq_h2": "คำถามที่พบบ่อย (FAQ)", "faq_p": "ข้อสงสัยเกี่ยวกับโซล่าเซลล์ เรามีคำตอบ",
            "f1_q": "ฝนตกหรือฟ้าครึ้ม โซล่าเซลล์ยังผลิตไฟได้ไหม? <i class=\"fas fa-chevron-down\"></i>",
            "f1_a": "ยังสามารถผลิตไฟได้ครับ แต่ประสิทธิภาพอาจจะลดลงเหลือประมาณ 10-30% ของช่วงแดดจัด ขึ้นอยู่กับความหนาแน่นของเมฆฝน มักจะเชื่อมต่อกับการไฟฟ้าร่วมด้วย ทำให้มีไฟฟ้าใช้สม่ำเสมอแน่นอนครับ",
            "f2_q": "ใช้เวลาติดตั้งและเดินเรื่องนานแค่ไหน? <i class=\"fas fa-chevron-down\"></i>",
            "f2_a": "การติดตั้งแผงและระบบไฟฟ้าที่บ้านลูกค้า ปกติใช้เวลาเพียง 1-3 วัน (ขึ้นอยู่กับขนาดของงาน) ส่วนระยะเวลาการขออนุญาตขนานไฟจากการไฟฟ้า จะใช้เวลาดำเนินการประมาณ 1-3 เดือน ซึ่งทางเรามีทีมงานจัดการเรื่องเอกสารให้ทั้งหมดครับ",
            "f3_q": "การรับประกันหลังการติดตั้งครอบคลุมอะไรบ้าง? <i class=\"fas fa-chevron-down\"></i>",
            "f3_a": "แผงโซล่าเซลล์แบบใหม่ รับประกันประสิทธิภาพการผลิตไฟนานถึง 25 ปี อินเวอร์เตอร์รับประกัน 5-10 ปี (เปลี่ยนเครื่องใหม่ถ้ามีปัญหา) และเรารับประกันงานติดตั้ง (น้ำรั่วซึม/ระบบไฟ) 1-2 ปี พร้อมบริการล้างแผงและตรวจเช็คระบบฟรีในปีแรกครับ",
            "f4_q": "บ้านแบบไหนที่เหมาะกับการติดโซล่าเซลล์? <i class=\"fas fa-chevron-down\"></i>",
            "f4_a": "คุ้มค่าที่สุดคือบ้านที่ <strong>มีการใช้ไฟฟ้าในช่วงกลางวันเยอะ</strong> (เช่น เปิดแอร์, มีผู้ใหญ่อยู่บ้าน, โฮมออฟฟิศ, หรือร้านค้า) และมีบิลค่าไฟตั้งแต่ 2,000-3,000 บาทขึ้นไปต่อเดือน การติดโซล่าเซลล์จะช่วยคืนทุนได้เร็วมากภายใน 4-5 ปีครับ",
            "cookie_msg": "เว็บไซต์นี้ใช้คุกกี้เพื่อนำเสนอประสบการณ์ที่ดีที่สุดให้คุณ หากใช้งานต่อถือว่าคุณยอมรับ",
            "cookie_link": "นโยบายความเป็นส่วนตัว (PDPA)",
            "btn_c_dec": "ปฏิเสธ", "btn_c_acc": "ยอมรับทั้งหมด",
            "contact_page_h1": "ติดต่อเรา", "contact_page_h2": "พร้อมให้คำปรึกษาและบริการคุณ", "contact_page_p": "ติดต่อประเมินหน้างานฟรี ไม่มีค่าใช้จ่ายแอบแฝง",
            "contact_info_h3": "ช่องทางการติดต่อ", "contact_form_h3": "ฝากข้อความถึงเรา", "btn_send_msg": "ส่งข้อความ", "btn_send_line": "ส่งข้อความผ่าน LINE",
            "about_h2": "เกี่ยวกับเรา RaydeeSolar",
            "about_h3": "\"ส่งมอบพลังงานสะอาด เพื่ออนาคตที่ยั่งยืนของคุณ\"",
            "about_p1": "เราคือผู้เชี่ยวชาญด้านระบบพลังงานแสงอาทิตย์แบบครบวงจร ด้วยประสบการณ์การติดตั้งและให้บริการมาอย่างยาวนาน เรามุ่งมั่นคัดสรรเฉพาะอุปกรณ์คุณภาพยอดเยี่ยม และได้มาตรฐานระดับสากลเท่านั้น",
            "about_p2": "ทีมวิศวกรและช่างผู้ชำนาญการของเรา พร้อมให้คำปรึกษา ออกแบบ และประเมินหน้างานฟรี เพื่อให้ระบบโซล่าเซลล์ตอบโจทย์การใช้งานของแต่ละครอบครัวและธุรกิจได้อย่างคุ้มค่าที่สุด การันตีผลงานคุณภาพด้วยฐานลูกค้าที่ไว้วางใจกว่าพันหลังคาเรือน",
            "about_li1": "<i class=\"fas fa-check-circle\"></i> ทีมช่างผู้เชี่ยวชาญ ผ่านการอบรมมาตรฐานสากล",
            "about_li2": "<i class=\"fas fa-check-circle\"></i> ดูแลครบวงจร ตั้งแต่ออกแบบ ขออนุญาต จนถึงติดตั้ง",
            "about_li3": "<i class=\"fas fa-check-circle\"></i> บริการหลังการขายและล้างแผง ฟรี 1 ปี",
            "calc_h2": "คำนวณความคุ้มค่า (Solar Calculator)",
            "calc_p": "ประเมินจุดคุ้มทุนเบื้องต้นสำหรับระบบติดตั้งบ้านปกติ (คืนทุน 4-5 ปี)",
            "calc_h3": "ค่าไฟเฉลี่ยต่อเดือนของคุณ?",
            "calc_unit_1": "บาท / เดือน",
            "calc_h4_1": "ขนาดระบบที่แนะนำ",
            "calc_h4_2": "ประหยัดไฟได้ประมาณ",
            "calc_unit_2": "บาท/เดือน",
            "calc_h4_3": "ระยะเวลาคืนทุนโดยประมาณ",
            "calc_unit_3": "ปี",
            "calc_ph_bill": "ตัวอย่าง: 1500",
            "contact_addr_2": "📍 123 ถนนสุขุมวิท, กรุงเทพฯ 10110",
            "contact_li1": "<strong>ที่ตั้งบริษัท:</strong><br>123 ถนนสุขุมวิท แขวงคลองเตยเหนือ <br>เขตวัฒนา กรุงเทพฯ 10110",
            "contact_li2": "<strong>เบอร์โทรศัพท์:</strong><br>089-123-4567<br>02-XXX-XXXX",
            "contact_li3": "<strong>LINE Official:</strong><br>@312ntoyv",
            "contact_li4": "<strong>อีเมล:</strong><br>contact@solartech.com",
            "prod_page_h1": "ผลิตภัณฑ์ของเรา",
            "prod_cat_used": "แผงโซล่าเซลล์มือสอง (สภาพดีเยี่ยม)",
            "prod_used_h3": "แผงโซล่าเซลล์ 230W (มือสอง)",
            "prod_used_desc": "แผงโซล่าเซลล์มือสอง สภาพดี ผ่านการตรวจสอบและทำความสะอาดแล้ว พร้อมใช้งาน เหมาะสำหรับระบบประหยัดงบหรือชุดนอนนา",
            "prod_used_s1": "✓ กำลังไฟ 230W",
            "prod_used_s2": "✓ สภาพ 85-90% ขึ้นไป เกรดคัดพิเศษ",
            "prod_used_s3": "✓ รับประกันการใช้งาน 3 เดือน",
            "badge_value": "คุ้มค่า",
            "cart_page_h1": "ตะกร้าสินค้าของคุณ",
            "checkout_page_h1": "รายละเอียดการชำระเงิน",
            "cart_empty_h": "ไม่มีสินค้าในตะกร้า", "cart_empty_p": "เลือกดูสินค้าที่คุณสนใจได้เลย", "cart_empty_btn": "กลับไปเลือกซื้อสินค้า",
            "order_summary": "สรุปคำสั่งซื้อ", "subtotal": "มูลค่าสินค้า:", "discount": "ส่วนลด:", "total_amount": "ยอดรวมทั้งสิ้น:", "proceed_checkout": "ดำเนินการชำระเงิน",
            "chk_form_h3": "ข้อมูลการจัดส่ง / ติดตั้ง",
            "chk_lbl_name": "ชื่อ-นามสกุล",
            "chk_lbl_phone": "เบอร์โทรศัพท์",
            "chk_lbl_email": "อีเมล (ถ้ามี)",
            "chk_lbl_addr": "ที่อยู่การจัดส่ง / ติดตั้ง",
            "chk_btn": "<i class=\"fab fa-line\" style=\"margin-right:8px;\"></i> สั่งซื้อผ่าน LINE",
            "chk_summary_h3": "สรุปคำสั่งซื้อ",
            "chk_total_lbl": "ยอดชำระสุทธิ:",
            "chk_secure_p": "<i class=\"fas fa-lock\" style=\"color:#00B900;\"></i> ข้อมูลการชำระเงินของคุณปลอดภัย",
            "chk_ph_name": "ระบุชื่อจริงและนามสกุล", "chk_ph_phone": "เช่น 0891234567", "chk_ph_email": "example@email.com", "chk_ph_addr": "ระบุที่อยู่ให้ละเอียด บ้านเลขที่ ซอย ถนน ตำบล อำเภอ จังหวัด และรหัสไปรษณีย์",
            "contact_form_lbl1": "ชื่อ - นามสกุล *",
            "contact_form_lbl2": "เบอร์โทรศัพท์ *",
            "contact_form_lbl3": "เรื่องที่ต้องการติดต่อ",
            "contact_topic1": "สนใจติดตั้งระบบโซล่าเซลล์ (ประเมินหน้างานฟรี)",
            "contact_topic2": "สอบถามข้อมูลผลิตภัณฑ์มือสอง",
            "contact_topic3": "แจ้งปัญหาเซลล์/บริการหลังการขาย",
            "contact_topic4": "อื่นๆ",
            "contact_form_lbl4": "รายละเอียดเพิ่มเติม",
            "contact_ph_name": "กรอกชื่อของคุณ", "contact_ph_phone": "กรอกเบอร์โทรที่สามารถติดต่อได้", "contact_ph_detail": "ระบุข้อความของคุณที่นี่...",
            "cart_item_total": "รวม:", "cart_rm_title": "ลบสินค้า"
        },
        en: {
            "nav_home": "Home", "nav_about": "About Us", "nav_products": 'Products <i class="fas fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i>', "nav_contact": "Contact Us",
            "nav_cart": '🛒 Cart <span id="cart-count">0</span>',
            "cat_1_short": "Solar Panels", "cat_2_short": "Power Inverters", "cat_3_short": "Solar Pumps",
            "hero_title": "Turn Solar Energy<br>Into Your Power",
            "hero_sub": "Reduce electricity bills and save the environment with our high-efficiency solar panels designed for modern homes and businesses.",
            "hero_btn1": "Our Products", "hero_btn2": "Free Consult",
            "why_title": "Why Choose Us?", "why_sub": "Latest innovation for your best performance",
            "f1_title": "High Efficiency", "f1_desc": "Maximum solar capture even on cloudy days with advanced tech",
            "f2_title": "Long-Lasting Durability", "f2_desc": "Premium materials, weather resistant, 25-year warranty",
            "f3_title": "Worth the Investment", "f3_desc": "Fast breakeven, reduces power bills up to 70% monthly",
            "port_title": "Our Portfolio", "port_sub": "Installation examples from our trusted clients",
            "port_sl_1_h": "2-Story Residential House", "port_sl_1_p": "Save 3,000+ THB/month. Fast ROI in 4 years.",
            "port_sl_2_h": "Home Office / Office", "port_sl_2_p": "Reduce long-term business costs, perfect for daytime energy usage.",
            "port_sl_3_h": "Commercial / Factory", "port_sl_3_p": "Excellent standard system with 25-year panel warranty.",
            "prod_title": "Our Products", "prod_sub": "Choose the right products for your needs",
            "cat_1": "Solar Panels", "cat_2": "Power Inverters", "cat_3": "Solar Water Pumps",
            "desc_1": "High efficiency monocrystalline panels, perfect for limited roof space.",
            "desc_2": "Cost-effective polycrystalline panels, stable performance in all weather.",
            "desc_3": "Smart hybrid inverter. Supports battery integration and app monitoring.",
            "desc_4": "Solar deep well pump. Energy-saving, deep suction, high durability.",
            "overlay_cart": `<i class="fas fa-cart-plus"></i> Add to Cart`,
            "overlay_view": `<i class="fas fa-eye"></i> View Details`,
            "btn_cart": "Add to Cart",
            "cta_title": "Ready to switch to clean energy?",
            "cta_sub": "Our expert team is ready to consult and evaluate your site for free.", "cta_btn": "Get Free Site Evaluation",
            "f_desc": "Leader in solar technology, providing end-to-end services from consultation to installation and maintenance.",
            "f_link_title": "Quick Links", "f_contact_title": "Contact Us",
            "f_link1": "Home", "f_link2": "About Us", "f_link3": "Products & Services", "f_link4": "Knowledge Base",
            "badge_best": "Best Seller", "badge_new": "New", "f_rights": "&copy; 2026 RaydeeSolar. All rights reserved.",
            "proc_h2": "Our Process", "proc_p": "Professional execution from start to finish.",
            "p1_h": "1. Free Consult", "p1_p": "Listen to your needs and estimate initial costs based on real usage.",
            "p2_h": "2. Site Survey", "p2_p": "On-site assessment to design an appropriate system and structure.",
            "p3_h": "3. Installation", "p3_p": "Installed by expert technicians, including all necessary permit processing.",
            "p4_h": "4. Handover", "p4_p": "System testing, usage guidelines, and comprehensive after-sales warranty.",
            "faq_h2": "Frequently Asked Questions", "faq_p": "Your solar questions, answered.",
            "f1_q": "Can solar panels generate power on rainy or cloudy days? <i class=\"fas fa-chevron-down\"></i>",
            "f1_a": "Yes, they still generate power, but efficiency may drop to 10-30% of peak sunshine depending on cloud density. We typically grid-tie your system to ensure continuous electricity supply.",
            "f2_q": "How long does installation and permitting take? <i class=\"fas fa-chevron-down\"></i>",
            "f2_a": "Physical installation usually takes 1-3 days depending on system size. Grid connection permits with the provincial authority may take 1-3 months, which our team handles completely.",
            "f3_q": "What does the post-installation warranty cover? <i class=\"fas fa-chevron-down\"></i>",
            "f3_a": "New solar panels have a 25-year performance warranty. Inverters carry 5-10 years (replacement for faults). Our installation work (leakage/electrical) spans 1-2 years, with free cleaning and system checks in the first year.",
            "f4_q": "What kind of houses benefit most from solar? <i class=\"fas fa-chevron-down\"></i>",
            "f4_a": "The highest value is for houses with <strong>high daytime electricity usage</strong> (e.g., A/C, remote work, home offices, shops) and monthly bills over 2,000-3,000 THB. Solar payback is extremely fast under these conditions (4-5 years).",
            "cookie_msg": "This website uses cookies to provide the best experience. By continuing, you agree to our ",
            "cookie_link": "Privacy Policy",
            "btn_c_dec": "Decline", "btn_c_acc": "Accept All",
            "contact_page_h1": "Contact Us", "contact_page_h2": "Ready to serve and consult", "contact_page_p": "Contact for a free site evaluation with no hidden costs",
            "contact_info_h3": "Contact Channels", "contact_form_h3": "Leave us a message", "btn_send_msg": "Send Message", "btn_send_line": "Send via LINE",
            "about_h2": "About RaydeeSolar",
            "about_h3": "\"Delivering clean energy for your sustainable future\"",
            "about_p1": "We are a comprehensive solar energy system expert with extensive installation and service experience. We carefully select only top-quality, internationally-certified equipment.",
            "about_p2": "Our engineers and specialized technicians offer free consultations, designs, and on-site estimates to ensure the system meets your family's or business's needs cost-effectively. Quality guaranteed by thousands of satisfied customers.",
            "about_li1": "<i class=\"fas fa-check-circle\"></i> Expert technicians with international standard training",
            "about_li2": "<i class=\"fas fa-check-circle\"></i> Comprehensive service: from design and permits to installation",
            "about_li3": "<i class=\"fas fa-check-circle\"></i> Free 1-year after-sales service and panel cleaning",
            "calc_h2": "Solar Savings Calculator",
            "calc_p": "Estimate initial breakeven point for standard house systems (4-5 years)",
            "calc_h3": "Your average monthly electricity bill?",
            "calc_unit_1": "THB / Month",
            "calc_h4_1": "Recommended System Size",
            "calc_h4_2": "Estimated Savings",
            "calc_unit_2": "THB / Month",
            "calc_h4_3": "Estimated Payback Period",
            "calc_unit_3": "Years",
            "calc_ph_bill": "e.g., 1500",
            "contact_addr_2": "📍 123 Sukhumvit Rd, Bangkok 10110",
            "contact_li1": "<strong>Location:</strong><br>123 Sukhumvit Rd, Khlong Toei Nuea, <br>Watthana, Bangkok 10110",
            "contact_li2": "<strong>Phone:</strong><br>089-123-4567<br>02-XXX-XXXX",
            "contact_li3": "<strong>LINE Official:</strong><br>@312ntoyv",
            "contact_li4": "<strong>Email:</strong><br>contact@solartech.com",
            "prod_page_h1": "Our Products",
            "prod_cat_used": "Used Solar Panels (Excellent Condition)",
            "prod_used_h3": "230W Solar Panel (Used)",
            "prod_used_desc": "Used solar panels in excellent condition, fully inspected and cleaned. Perfect for budget setups or off-grid cabins.",
            "prod_used_s1": "✓ 230W Power Output",
            "prod_used_s2": "✓ 85-90%+ Condition, premium selected",
            "prod_used_s3": "✓ 3 months warranty",
            "badge_value": "Best Value",
            "cart_page_h1": "Your Shopping Cart",
            "checkout_page_h1": "Payment Details",
            "cart_empty_h": "Your cart is empty", "cart_empty_p": "Browse our products and find what you need", "cart_empty_btn": "Go to Shop",
            "order_summary": "Order Summary", "subtotal": "Subtotal:", "discount": "Discount:", "total_amount": "Total Amount:", "proceed_checkout": "Proceed to Checkout",
            "chk_form_h3": "Shipping & Installation Info",
            "chk_lbl_name": "Full Name",
            "chk_lbl_phone": "Phone Number",
            "chk_lbl_email": "Email Address (Optional)",
            "chk_lbl_addr": "Shipping / Installation Address",
            "chk_btn": "<i class=\"fab fa-line\" style=\"margin-right:8px;\"></i> Order via LINE",
            "chk_summary_h3": "Order Summary",
            "chk_total_lbl": "Net Total:",
            "chk_secure_p": "<i class=\"fas fa-lock\" style=\"color:#00B900;\"></i> Your payment information is secure",
            "chk_ph_name": "Enter full name", "chk_ph_phone": "e.g. 0891234567", "chk_ph_email": "example@email.com", "chk_ph_addr": "Enter full address: house number, street, sub-district, district, province, routing code",
            "contact_form_lbl1": "Full Name *",
            "contact_form_lbl2": "Phone Number *",
            "contact_form_lbl3": "Subject",
            "contact_topic1": "Interested in Solar Installation (Free Estimate)",
            "contact_topic2": "Inquiry about used products",
            "contact_topic3": "Maintenance / After-sales Service",
            "contact_topic4": "Other",
            "contact_form_lbl4": "Additional Details",
            "contact_ph_name": "Enter your name", "contact_ph_phone": "Enter your contact number", "contact_ph_detail": "Enter your message here...",
            "cart_item_total": "Total:", "cart_rm_title": "Remove item"
        }
    };

    const mapElements = {
        ".nav-links li:nth-child(1) a": "nav_home", ".nav-links li:nth-child(2) a": "nav_about",
        ".nav-links li:nth-child(3) a": "nav_products",
        ".nav-links .dropdown-content a:nth-child(1)": "cat_1_short",
        ".nav-links .dropdown-content a:nth-child(2)": "cat_2_short",
        ".nav-links .dropdown-content a:nth-child(3)": "cat_3_short",
        ".nav-links li:nth-child(4) a": "nav_contact", ".cart-nav": "nav_cart",
        ".hero-content h1": "hero_title", ".hero-content p": "hero_sub",
        ".hero-buttons a.btn-primary": "hero_btn1", ".hero-buttons a.btn-outline": "hero_btn2",
        "#about .section-title h2": "why_title", "#about .section-title p": "why_sub",
        ".features-grid .feature-card:nth-child(1) h3": "f1_title", ".features-grid .feature-card:nth-child(1) p": "f1_desc",
        ".features-grid .feature-card:nth-child(2) h3": "f2_title", ".features-grid .feature-card:nth-child(2) p": "f2_desc",
        ".features-grid .feature-card:nth-child(3) h3": "f3_title", ".features-grid .feature-card:nth-child(3) p": "f3_desc",
        "#portfolio .section-title h2": "port_title", "#portfolio .section-title p": "port_sub",
        "#products .section-title h2": "prod_title", "#products .section-title p": "prod_sub",
        ".category-section:nth-child(2) .category-title": "cat_1", ".category-section:nth-child(3) .category-title": "cat_2", ".category-section:nth-child(4) .category-title": "cat_3",
        ".category-item[data-category='panel']:nth-child(1) .description": "desc_1", ".category-item[data-category='panel']:nth-child(2) .description": "desc_2",
        ".category-item[data-category='inverter'] .description": "desc_3", ".category-item[data-category='pump'] .description": "desc_4",
        ".badge:not(.badge-new)": "badge_best", ".badge.badge-new": "badge_new",
        ".cta h2": "cta_title", ".cta p": "cta_sub", ".cta .btn": "cta_btn",
        ".footer-text": "f_desc", ".footer-col:nth-child(2) h4": "f_link_title", ".footer-col:nth-child(3) h4": "f_contact_title",
        ".footer-col:nth-child(2) li:nth-child(1) a": "f_link1", ".footer-col:nth-child(2) li:nth-child(2) a": "f_link2",
        ".footer-col:nth-child(2) li:nth-child(3) a": "f_link3", ".footer-col:nth-child(2) li:nth-child(4) a": "f_link4",
        ".footer-bottom p": "f_rights",
        "#process .section-title h2": "proc_h2", "#process .section-title p": "proc_p",
        ".process-step:nth-child(1) h3": "p1_h", ".process-step:nth-child(1) p": "p1_p",
        ".process-step:nth-child(2) h3": "p2_h", ".process-step:nth-child(2) p": "p2_p",
        ".process-step:nth-child(3) h3": "p3_h", ".process-step:nth-child(3) p": "p3_p",
        ".process-step:nth-child(4) h3": "p4_h", ".process-step:nth-child(4) p": "p4_p",
        "#faq .section-title h2": "faq_h2", "#faq .section-title p": "faq_p",
        ".faq-item:nth-child(1) .faq-header": "f1_q", ".faq-item:nth-child(1) .faq-content": "f1_a",
        ".faq-item:nth-child(2) .faq-header": "f2_q", ".faq-item:nth-child(2) .faq-content": "f2_a",
        ".faq-item:nth-child(3) .faq-header": "f3_q", ".faq-item:nth-child(3) .faq-content": "f3_a",
        ".faq-item:nth-child(4) .faq-header": "f4_q", ".faq-item:nth-child(4) .faq-content": "f4_a",
        "#cookieMsg": "cookie_msg", "#cookiePolicyLink": "cookie_link",
        "#btnCookieDecline": "btn_c_dec", "#btnCookieAccept": "btn_c_acc",
        "#contact-header h1": "contact_page_h1", "#contact-page .section-title h2": "contact_page_h2", "#contact-page .section-title p": "contact_page_p",
        ".contact-info-box h3": "contact_info_h3", ".contact-form-box h3": "contact_form_h3", ".contact-form-box button[type='submit']": "btn_send_msg",
        "#about h2.section-title-sm": "about_h2", "#about h3": "about_h3",
        "#about .profile-content p:nth-of-type(1)": "about_p1", "#about .profile-content p:nth-of-type(2)": "about_p2",
        "#about .profile-features li:nth-child(1)": "about_li1", "#about .profile-features li:nth-child(2)": "about_li2", "#about .profile-features li:nth-child(3)": "about_li3",
        "#calculator .section-title h2": "calc_h2", "#calculator .section-title p": "calc_p",
        "#calculator h3": "calc_h3", "#calculator .unit": "calc_unit_1",
        "#calculator .result-card:nth-child(1) h4": "calc_h4_1", "#calculator .result-card:nth-child(2) h4": "calc_h4_2",
        "#calculator .result-card:nth-child(2) .res-unit": "calc_unit_2", "#calculator .result-card:nth-child(3) h4": "calc_h4_3",
        "#calculator .result-card:nth-child(3) .res-unit": "calc_unit_3",
        ".footer-col:nth-child(3) li:nth-child(1)": "contact_addr_2",
        ".contact-info-list li:nth-child(1) div": "contact_li1", ".contact-info-list li:nth-child(2) div": "contact_li2",
        ".contact-info-list li:nth-child(3) div": "contact_li3", ".contact-info-list li:nth-child(4) div": "contact_li4",
        "#products-header h1": "prod_page_h1",
        ".category-title": "prod_cat_used",
        ".product-info h3": "prod_used_h3", ".product-info p.description": "prod_used_desc",
        ".product-info ul.specs li:nth-child(1)": "prod_used_s1", ".product-info ul.specs li:nth-child(2)": "prod_used_s2", ".product-info ul.specs li:nth-child(3)": "prod_used_s3",
        ".badge-new": "badge_value",
        "#cart-header h1": "cart_page_h1",
        "#checkout-header h1": "checkout_page_h1",
        ".checkout-form-container h3": "chk_form_h3",
        "#checkoutForm .form-group:nth-child(1) label": "chk_lbl_name", "#checkoutForm .form-group:nth-child(2) label": "chk_lbl_phone",
        "#checkoutForm .form-group:nth-child(3) label": "chk_lbl_email", "#checkoutForm .form-group:nth-child(4) label": "chk_lbl_addr",
        "#submitBtn": "chk_btn",
        ".cart-summary-modern h3": "chk_summary_h3", ".summary-total span:nth-child(1)": "chk_total_lbl",
        ".cart-summary-modern p": "chk_secure_p",
        "#contactForm .form-group:nth-child(1) label": "contact_form_lbl1", "#contactForm .form-group:nth-child(2) label": "contact_form_lbl2",
        "#contactForm .form-group:nth-child(3) label": "contact_form_lbl3", "#contactForm .form-group:nth-child(4) label": "contact_form_lbl4",
        "#contactTopic option:nth-child(1)": "contact_topic1", "#contactTopic option:nth-child(2)": "contact_topic2",
        "#contactTopic option:nth-child(3)": "contact_topic3", "#contactTopic option:nth-child(4)": "contact_topic4"
    };

    window.changeLang = (lang) => {
        const btns = document.querySelectorAll('.lang-btn');
        btns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        for (const [selector, key] of Object.entries(mapElements)) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (i18nDict[lang][key]) {
                    el.innerHTML = i18nDict[lang][key];
                }
            });
        }

        // Translate using data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nDict[lang] && i18nDict[lang][key]) {
                el.innerHTML = i18nDict[lang][key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (i18nDict[lang] && i18nDict[lang][key]) {
                el.placeholder = i18nDict[lang][key];
            }
        });

        // Translate titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (i18nDict[lang] && i18nDict[lang][key]) {
                el.title = i18nDict[lang][key];
            }
        });

        // Translate repeating classes
        document.querySelectorAll('.overlay-add-cart').forEach(el => el.innerHTML = i18nDict[lang]["overlay_cart"]);
        document.querySelectorAll('.overlay-view-detail').forEach(el => el.innerHTML = i18nDict[lang]["overlay_view"]);
        document.querySelectorAll('.add-to-cart-btn:not(.overlay-add-cart)').forEach(el => el.innerHTML = i18nDict[lang]["btn_cart"]);

        // Restore dynamic cart count bindings
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }

        localStorage.setItem('lang', lang);
    };

    // Auto-load saved language as soon as DOM is ready
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        changeLang(savedLang);
    }

    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                toTopBtn.classList.add('show');
            } else {
                toTopBtn.classList.remove('show');
            }
        });

        toTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // Cart Count Global
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        let cart = JSON.parse(localStorage.getItem('solarCart')) || [];
        let count = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.innerText = count;
    }
    updateCartCount();

    // Toast Notification logic
    function showToast(message) {
        let toast = document.getElementById('toastNotification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastNotification';
            toast.className = 'toast-container';
            toast.innerHTML = `<div class="toast-icon">✓</div><span id="toastMessage"></span>`;
            document.body.appendChild(toast);
        }

        document.getElementById('toastMessage').innerText = message;
        toast.classList.remove('show');
        void toast.offsetWidth; // trigger reflow
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            const img = btn.dataset.img;

            let cart = JSON.parse(localStorage.getItem('solarCart')) || [];
            let existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, img, quantity: 1 });
            }

            localStorage.setItem('solarCart', JSON.stringify(cart));
            updateCartCount();
            showToast(`เพิ่ม ${name} ลงในตะกร้าเรียบร้อยแล้ว!`);
        });
    });

    // Hover Categories Filtering logic (for Panels, Inverters, Pumps)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryItems = document.querySelectorAll('.category-item');

    if (filterBtns.length > 0 && categoryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(f => f.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                categoryItems.forEach(item => {
                    if (filterValue === 'all' || item.dataset.category === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300); // Wait for transition to finish
                    }
                });
            });
        });
    }

    // Slider logic
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            if (dots.length > 0) dots[currentSlide].classList.remove('active');

            // Handle bounds for arrows to loop correctly
            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            if (dots.length > 0) dots[currentSlide].classList.add('active');
        }

        function startInterval() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 4000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
                resetInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
                resetInterval();
            });
        }

        startInterval();
    }

    // Render Cart logic
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        let cart = JSON.parse(localStorage.getItem('solarCart')) || [];
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart" style="text-align: center; padding: 50px; background: white; border-radius: var(--radius); box-shadow: var(--shadow-sm);"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 20px; display:block;"></i><h3 style="color: var(--dark-color)" data-i18n="cart_empty_h">ไม่มีสินค้าในตะกร้า</h3><p style="color: var(--text-color); margin-top: 10px; margin-bottom: 20px;" data-i18n="cart_empty_p">เลือกดูสินค้าที่คุณสนใจได้เลย</p><a href="products.html" class="btn btn-outline" style="color: var(--primary-color); border-color: var(--primary-color); display: inline-block;" data-i18n="cart_empty_btn">กลับไปเลือกซื้อสินค้า</a></div>';
            const checkoutBtn = document.getElementById('checkoutBtn');
            if (checkoutBtn) checkoutBtn.style.display = 'none';
        } else {
            renderCart(cart);
        }
        if (typeof window.changeLang === 'function') window.changeLang(localStorage.getItem('lang') || 'th');
    }

    function renderCart(cart) {
        let html = '';
        let total = 0;
        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            total += subtotal;
            html += `
                <div class="modern-cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="modern-cart-details">
                        <h4>${item.name}</h4>
                        <div class="modern-cart-price">฿${item.price.toLocaleString()}</div>
                        <div class="modern-cart-actions">
                            <div class="qty-control">
                                <button class="qty-btn" onclick="updateQty(${index}, Math.max(1, ${item.quantity - 1}))">-</button>
                                <span class="item-qty">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQty(${index}, ${item.quantity + 1})">+</button>
                            </div>
                            <div style="font-weight:600; color:var(--dark-color)"><span data-i18n="cart_item_total">รวม:</span> ฿${subtotal.toLocaleString()}</div>
                        </div>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${index})" title="ลบสินค้า" data-i18n-title="cart_rm_title"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
        if (cartItemsContainer) cartItemsContainer.innerHTML = html;
        const cartTotalEl = document.getElementById('cartTotal');
        const cartSubEl = document.getElementById('cartSubtotal');
        if (cartSubEl) cartSubEl.innerText = `฿${total.toLocaleString()}`;
        if (cartTotalEl) cartTotalEl.innerText = `฿${total.toLocaleString()}`;
    }

    window.updateQty = (index, qty) => {
        let cart = JSON.parse(localStorage.getItem('solarCart')) || [];
        cart[index].quantity = parseInt(qty);
        localStorage.setItem('solarCart', JSON.stringify(cart));
        renderCart(cart);
        updateCartCount();
    }

    window.removeItem = (index) => {
        let cart = JSON.parse(localStorage.getItem('solarCart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('solarCart', JSON.stringify(cart));
        renderCart(cart);
        updateCartCount();
        if (cart.length === 0) location.reload();
    }

    // Checkout logic
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        let cart = JSON.parse(localStorage.getItem('solarCart')) || [];
        if (cart.length === 0) {
            window.location.href = 'cart.html';
        }

        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('checkoutTotal').innerText = `฿${total.toLocaleString()}`;

        let itemsHtml = '';
        cart.forEach(item => {
            itemsHtml += `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name} x ${item.quantity}</span>
                <span>฿${(item.price * item.quantity).toLocaleString()}</span>
            </div>`;
        });
        document.getElementById('checkoutItems').innerHTML = itemsHtml;

        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> กำลังดำเนินการ...';

            const name = document.getElementById('custName').value.trim();
            const phone = document.getElementById('custPhone').value.trim();
            const email = document.getElementById('custEmail').value.trim();
            const address = document.getElementById('custAddress').value.trim();

            // Validation Checks
            const nameRegex = /^[a-zA-Zก-๙\s]{5,}$/;
            if (!nameRegex.test(name)) {
                showToast('กรุณากรอกชื่อ-นามสกุลให้ถูกต้อง (อย่างน้อย 5 ตัวอักษร ไม่รับอักขระพิเศษ)');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                return;
            }

            const phoneRegex = /^0[0-9]{8,9}$/;
            if (!phoneRegex.test(phone)) {
                showToast('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (ขึ้นต้นด้วย 0 และมี 9-10 หลัก)');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                return;
            }

            if (address.length < 20) {
                showToast('กรุณากรอกที่อยู่ให้ครบถ้วน (อย่างน้อย 20 ตัวอักษร)');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                return;
            }

            // Prepare order summary string
            let orderSummary = "";
            cart.forEach(item => {
                orderSummary += `${item.name} (x${item.quantity}) - ฿${(item.price * item.quantity).toLocaleString()}\n`;
            });

            // สร้างเลข Tracking ID
            const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
            const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
            const trackingId = `RS${datePart}-${randomPart}`;

            const formData = new URLSearchParams();
            formData.append('trackingId', trackingId); // ส่ง Tracking ID เข้าไปด้วย
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('address', address);
            formData.append('orderSummary', orderSummary);
            formData.append('total', total);
            formData.append('timestamp', new Date().toLocaleString());

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzghxato9j8nSYCILSNR3jM5wSAGGtqjw8KiaPje80ujDddL_lnSb2uyT57D4l6shg/exec";

            try {
                // ส่งข้อมูลไปยัง Google Apps Script
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // ใส่เพื่อป้องกันปัญหา CORS ตอนยิงตรงไปที่ Google
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });

                // สร้าง Modal Popup แสดงเลขติดตามสถานะ
                const modalHtml = `
                    <div id="successModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; opacity:0; transition:opacity 0.3s ease;">
                        <div style="position:relative; background:white; padding:40px; border-radius:12px; text-align:center; max-width:400px; width:90%; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transform:translateY(20px); transition:transform 0.3s ease;" id="successModalBody">
                            <span id="closeModalBtn" style="position:absolute; top:15px; right:15px; font-size:1.8rem; font-weight:bold; color:#999; cursor:pointer;" title="ปิดหน้าต่าง">&times;</span>
                            <i class="fas fa-check-circle" style="font-size:4rem; color:#00B900; margin-bottom:20px;"></i>
                            <h2 style="margin-bottom:15px; color:#333; font-family:'Prompt', sans-serif;">สั่งซื้อสินค้าสำเร็จ!</h2>
                            <p style="margin-bottom:20px; color:#666; font-size:1rem;">ระบบได้รับข้อมูลคำสั่งซื้อเรียบร้อยแล้ว<br>นี่คือเลขติดตามสถานะของคุณ:</p>
                            
                            <div style="background:#f8fafc; padding:15px; border-radius:8px; font-size:1.6rem; font-weight:bold; letter-spacing:2px; color:var(--primary-color); margin-bottom:20px; border: 2px dashed #cbd5e1;">
                                ${trackingId}
                            </div>
                            
                            <p style="font-size:0.9rem; color:#64748b; margin-bottom:25px;">
                                กดยืนยันเพื่อไปหน้า Line แชท ให้นำเลขติดตามสถานะแจ้งแอดมินหรือพิมพ์ถามบอทเพื่อติดตามสถานะได้เลย
                            </p>
                            
                            <div style="display:flex; flex-direction:column; gap:10px;">
                                <button id="copyTrackBtn" class="btn btn-outline" style="color:var(--primary-color); border-color:var(--primary-color); width:100%;">
                                    <i class="fas fa-copy"></i> คัดลอกเลขติดตามสถานะ
                                </button>
                                <button id="goToLineBtn" class="btn btn-primary" style="width:100%; background-color:#00B900; border-color:#00B900;">
                                    <i class="fab fa-line"></i> ติดต่อ LINE OA
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                document.body.insertAdjacentHTML('beforeend', modalHtml);

                // Animate entrance
                setTimeout(() => {
                    document.getElementById('successModal').style.opacity = '1';
                    document.getElementById('successModalBody').style.transform = 'translateY(0)';
                }, 10);

                // Add Event Listeners to Buttons
                document.getElementById('copyTrackBtn').addEventListener('click', () => {
                    navigator.clipboard.writeText(trackingId);
                    showToast('คัดลอกเลขติดตามสถานะเรียบร้อย!');
                });

                document.getElementById('closeModalBtn').addEventListener('click', () => {
                    document.getElementById('successModal').remove();
                    if (typeof renderCart === 'function') renderCart(); // อัปเดตตารางให้ว่างเปล่า
                });

                document.getElementById('goToLineBtn').addEventListener('click', () => {
                    // เปิดหน้า LINE OA 
                    const lineId = "@312ntoyv";
                    window.open(`https://line.me/R/ti/p/${lineId}`, '_blank');

                    // ลบตะกร้าสินค้า
                    localStorage.removeItem('solarCart');
                    // เปลี่ยนให้ค้างอยู่หน้านี้เหมือนเดิม โดยไม่เด้งกลับ index.html
                });

            } catch (error) {
                console.error('Error!', error.message);
                showToast('เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }
    // Solar Savings Calculator Logic
    const billInput = document.getElementById('monthly-bill');
    const resSize = document.getElementById('res-system-size');
    const resSavings = document.getElementById('res-monthly-savings');
    const resPayback = document.getElementById('res-payback');

    if (billInput) {
        billInput.addEventListener('input', (e) => {
            let val = parseInt(e.target.value) || 0;
            calculateSolar(val);
        });

        // Initial render
        calculateSolar(parseInt(billInput.value) || 0);

        function calculateSolar(bill) {
            if (bill < 500) bill = 0;

            // Standard Calculation Config (สำหรับบ้านปกติ คืนทุน 4-5 ปี)
            const SAVINGS_PER_KW = 600; // ประหยัดได้เดือนละ 600 บาท ต่อ 1 kW
            const SYSTEM_COST_PER_KW = 35000; // ราคาติดตั้ง 35,000 บาท ต่อ 1 kW
            const USAGE_RATIO = 0.7; // ตีเป็นใช้ไฟกลางวัน 70% ของค่าไฟทั้งหมด

            let targetSavings = bill * USAGE_RATIO;
            let recommendedSize = targetSavings / SAVINGS_PER_KW;

            // หา kW เป็นขั้นๆ (เลขสวยๆ ทีละครึ่ง kW) เล็กสุด 1.5 kW
            recommendedSize = Math.max(1.5, Math.round(recommendedSize * 2) / 2);

            if (bill === 0) recommendedSize = 0;

            let monthlySaved = Math.round(Math.min(bill, recommendedSize * SAVINGS_PER_KW));
            let totalCost = recommendedSize * SYSTEM_COST_PER_KW;
            let paybackYears = (monthlySaved > 0) ? (totalCost / (monthlySaved * 12)) : 0;

            // Animate number updates via UI
            animateValue(resSize, parseFloat(resSize.innerText) || 0, recommendedSize, 500, true);
            animateValue(resSavings, parseInt((resSavings.innerText).replace(/,/g, '')) || 0, monthlySaved, 500, false);
            animateValue(resPayback, parseFloat(resPayback.innerText) || 0, paybackYears, 500, true);
        }

        // Helper function for number rolling effect
        function animateValue(obj, start, end, duration, isFloat) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const current = start + easeProgress * (end - start);

                if (isFloat) {
                    obj.innerText = current.toFixed(1);
                } else {
                    obj.innerText = Math.round(current).toLocaleString();
                }
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    if (isFloat) obj.innerText = end.toFixed(1);
                    else obj.innerText = Math.round(end).toLocaleString();
                }
            };
            window.requestAnimationFrame(step);
        }
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-body').style.maxHeight = null;
                    }
                });
                item.classList.toggle('active');
                const body = item.querySelector('.faq-body');
                if (item.classList.contains('active')) {
                    body.style.maxHeight = body.scrollHeight + "px";
                } else {
                    body.style.maxHeight = null;
                }
            });
        }
    });

    // Cookie Consent Banner Logic
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-consent';
        const lang = localStorage.getItem('lang') || 'th';

        cookieBanner.innerHTML = `
            <div class="container cookie-content">
                <div class="cookie-text">
                    <p><span id="cookieMsg">${i18nDict[lang]["cookie_msg"]}</span> <a href="#" id="cookiePolicyLink" style="color:var(--primary-color);text-decoration:underline;">${i18nDict[lang]["cookie_link"]}</a></p>
                </div>
                <div class="cookie-buttons">
                    <button class="btn-cookie-decline" id="btnCookieDecline">${i18nDict[lang]["btn_c_dec"]}</button>
                    <button class="btn-cookie-accept" id="btnCookieAccept">${i18nDict[lang]["btn_c_acc"]}</button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBanner);

        // Show banner after reading content (1.5s delay)
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);

        document.getElementById('btnCookieAccept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            setTimeout(() => cookieBanner.remove(), 500); // fade out wait
        });

        document.getElementById('btnCookieDecline').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            setTimeout(() => cookieBanner.remove(), 500);
        });
    }    // Initialize Swiper.js for Portfolio if element exists
    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper('.mySwiper', {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
});
