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
    if (slides.length > 0 && dotsContainer) {
        let currentSlide = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            goToSlide(nextSlide);
        }, 4000);
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

            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('address', address);
            formData.append('orderSummary', orderSummary);
            formData.append('total', total);
            formData.append('timestamp', new Date().toLocaleString());

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvFnqlsJoYrxMXagFfN2JH3ZJlaacqX320HDkijPQFHn7A_5xGMrTpfKGkOb5ePpVA/exec";

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

                // Build LINE message
                let message = `🛒 *คำสั่งซื้อใหม่ (Raydee Solar)*\n`;
                message += `------------------------\n`;

                cart.forEach(item => {
                    message += `- ${item.name} (x${item.quantity}) : ฿${(item.price * item.quantity).toLocaleString()}\n`;
                });

                message += `------------------------\n`;
                message += `*ยอดรวมทั้งสิ้น:* ฿${total.toLocaleString()}\n\n`;

                message += `👤 *ข้อมูลลูกค้า*\n`;
                message += `ชื่อ: ${name}\n`;
                message += `เบอร์โทร: ${phone}\n`;
                if (email) message += `อีเมล: ${email}\n`;
                message += `ที่อยู่: ${address}\n`;

                // Encode for URL
                const encodedMessage = encodeURIComponent(message);

                // Your LINE Official Account ID (replace with actual ID)
                const lineId = "123456789";

                // Redirect to LINE
                const lineUrl = `https://line.me/R/ti/p/~${lineId}?text=${encodedMessage}`;
                window.open(lineUrl, '_blank');

                // Clear cart and redirect
                localStorage.removeItem('solarCart');
                showToast('ส่งข้อมูลและกำลังไปที่ LINE เพื่อยืนยันคำสั่งซื้อ!');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

            } catch (error) {
                console.error('Error!', error.message);
                showToast('เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }
});
