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
            cartItemsContainer.innerHTML = '<tr><td colspan="5" class="empty-cart">ไม่มีสินค้าในตะกร้า</td></tr>';
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
                <tr>
                    <td data-label="สินค้า"><img src="${item.img}" class="cart-item-img"> ${item.name}</td>
                    <td data-label="ราคา">฿${item.price.toLocaleString()}</td>
                    <td data-label="จำนวน">
                        <input type="number" class="form-control" style="width: 70px" value="${item.quantity}" min="1" onchange="updateQty(${index}, this.value)">
                    </td>
                    <td data-label="รวม">฿${subtotal.toLocaleString()}</td>
                    <td data-label=""><button class="remove-btn" onclick="removeItem(${index})" title="ลบสินค้า">✖</button></td>
                </tr>
            `;
        });
        if (cartItemsContainer) cartItemsContainer.innerHTML = html;
        const cartTotalEl = document.getElementById('cartTotal');
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

            const name = document.getElementById('custName').value;
            const phone = document.getElementById('custPhone').value;
            const email = document.getElementById('custEmail').value;
            const address = document.getElementById('custAddress').value;

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

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXM7VAjunXdPBFGOdIkBYijlsGFSyfHqFv0-3reV5PWEavNFvPaWtuEWuHpwo7WWJl/exec";

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
                        <div style="background:white; padding:40px; border-radius:12px; text-align:center; max-width:400px; width:90%; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transform:translateY(20px); transition:transform 0.3s ease;" id="successModalBody">
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

                document.getElementById('goToLineBtn').addEventListener('click', () => {
                    // เปิดหน้า LINE OA และกลับสู่หน้าแรก
                    const lineId = "123456789";
                    window.open(`https://line.me/R/ti/p/~${lineId}`, '_blank');

                    localStorage.removeItem('solarCart');
                    window.location.href = 'index.html';
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
