/* ================================================================
   RaydeeSolar — Global Scripts (main.js)
   ================================================================ */

// ── 1. LocalStorage Helpers ──
function getData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// ── 2. Utility Functions ──
function generateId(prefix = 'ID') {
  const timestamp = Date.now().toString().slice(-6);
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${randomStr}`;
}

function formatPrice(num) {
  return '฿' + Number(num).toLocaleString('th-TH');
}

function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── 3. Initialization & Default Data Bootstrapping ──
function initAppData() {
  saveData(LS_KEYS.siteConfig, DEFAULT_SITE_CONFIG);
  if (!getData(LS_KEYS.quotes)) saveData(LS_KEYS.quotes, []);
  if (!getData(LS_KEYS.messages)) saveData(LS_KEYS.messages, []);
}

// ── 4. Shared Components Injection ──
function loadComponents() {
  const siteConfig = getData(LS_KEYS.siteConfig) || DEFAULT_SITE_CONFIG;
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="container nav-content">
          <a href="index.html" class="logo">Raydee<span>Solar</span></a>
          <ul class="nav-links">
            <li><a href="index.html">หน้าหลัก</a></li>
            <li><a href="index.html#services">บริการของเรา</a></li>
            <li><a href="index.html#portfolio">ผลงานติดตั้ง</a></li>
            <li><a href="index.html#calculator">คำนวณความคุ้มค่า</a></li>
            <li><a href="about.html">เกี่ยวกับเรา</a></li>
            <li><a href="quote.html">ขอใบเสนอราคา</a></li>
          </ul>
          <div class="hamburger">
            <span class="bar"></span><span class="bar"></span><span class="bar"></span>
          </div>
        </div>
      </nav>
    `;
  }

  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h3>${siteConfig.shopName}</h3>
              <p>ผู้นำด้านเทคโนโลยีพลังงานแสงอาทิตย์ ให้บริการครบวงจรตั้งแต่ให้คำปรึกษา ออกแบบ ขออนุญาต จนถึงติดตั้งและบำรุงรักษา</p>
              <div class="social-links">
                <a href="${siteConfig.facebookUrl}" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="${siteConfig.lineUrl}" target="_blank"><i class="fab fa-line"></i></a>
              </div>
            </div>
            <div class="footer-col">
              <h4>ลิงก์ด่วน</h4>
              <ul>
                <li><a href="index.html">หน้าแรก</a></li>
                <li><a href="index.html#services">บริการของเรา</a></li>

                <li><a href="quote.html">ขอใบเสนอราคาฟรี</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>ติดต่อเรา</h4>
              <ul class="contact-info-list">
                <li><i class="fas fa-map-marker-alt"></i> <span>${siteConfig.address}</span></li>
                <li><i class="fas fa-phone-alt"></i> <span>${siteConfig.phone}</span></li>
                <li><i class="fab fa-line"></i> <span>${siteConfig.lineId}</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${siteConfig.shopName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }

  setupInteractions();
  highlightActiveNav();
}

// ── 5. UI Interactions ──
function setupInteractions() {
  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
    if (window.scrollY > 50) navbar.classList.add('scrolled');
  }
}


function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ── Run on DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  initAppData();
  loadComponents();
});
