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
            "badge_best": "ขายดี", "badge_new": "ใหม่", "f_rights": "&copy; 2026 RaydeeSolar. All rights reserved."
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
            "badge_best": "Best Seller", "badge_new": "New", "f_rights": "&copy; 2026 RaydeeSolar. All rights reserved."
        }
    };

    const mapElements = {
        ".nav-links li:nth-child(1) a": "nav_home", ".nav-links li:nth-child(2) a": "nav_about",
        ".nav-links li.nav-dropdown a.dropbtn": "nav_products",
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
        ".footer-bottom p": "f_rights"
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

        // Translate specific selectors
        for (const [selector, key] of Object.entries(mapElements)) {
            const el = document.querySelector(selector);
            if (el && i18nDict[lang][key]) {
                el.innerHTML = i18nDict[lang][key];
            }
        }

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
    document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang && savedLang === 'en') {
            changeLang('en');
        }
    });

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
            cartItemsContainer.innerHTML = '<div class="empty-cart" style="text-align: center; padding: 50px; background: white; border-radius: var(--radius); box-shadow: var(--shadow-sm);"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 20px; display:block;"></i><h3 style="color: var(--dark-color)">ไม่มีสินค้าในตะกร้า</h3><p style="color: var(--text-color); margin-top: 10px; margin-bottom: 20px;">เลือกดูสินค้าที่คุณสนใจได้เลย</p><a href="index.html#products" class="btn btn-outline" style="color: var(--primary-color); border-color: var(--primary-color); display: inline-block;">กลับไปเลือกซื้อสินค้า</a></div>';
            const checkoutBtn = document.getElementById('checkoutBtn');
            if (checkoutBtn) checkoutBtn.style.display = 'none';
        } else {
            renderCart(cart);
        }
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
                            <div style="font-weight:600; color:var(--dark-color)">รวม: ฿${subtotal.toLocaleString()}</div>
                        </div>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${index})" title="ลบสินค้า"><i class="fas fa-trash"></i></button>
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
});
