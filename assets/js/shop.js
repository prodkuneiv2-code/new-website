/* ================================================================
   RaydeeSolar — Shop Logic (shop.js)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  
  let allProducts = getData(LS_KEYS.products) || [];
  // Only show active products to customers
  allProducts = allProducts.filter(p => p.status !== 'hidden');
  
  if (productsGrid) {
  
  let currentFilter = 'all';
  let currentSort = 'newest';
  let currentSearch = '';

  // Current selected product for modal
  let selectedProduct = null;

  function renderProducts() {
    let filtered = allProducts;

    // Filter by category
    if (currentFilter !== 'all') {
      filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Filter by search
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }

    // Sort
    filtered.sort((a, b) => {
      if (currentSort === 'price-asc') return a.price - b.price;
      if (currentSort === 'price-desc') return b.price - a.price;
      // Default newest - sorting visually by ID or keeping as is usually fine for 'newest' mock
      return a.id < b.id ? 1 : -1; 
    });

    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
      productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">ไม่พบสินค้าที่ค้นหา</div>';
      return;
    }

    filtered.forEach(p => {
      let stockHtml = '';
      if (p.stock <= 0) {
        stockHtml = '<div class="product-stock stock-out">สินค้าหมด</div>';
      } else if (p.stock <= 5) {
        stockHtml = `<div class="product-stock stock-low">เหลือน้อย (${p.stock})</div>`;
      } else {
        stockHtml = `<div class="product-stock stock-in">มีสินค้า</div>`;
      }

      const card = document.createElement('div');
      card.className = 'product-card';
      card.onclick = () => openModal(p);
      card.innerHTML = `
        <div class="product-img">
          ${p.image ? `<img src="${p.image}" alt="${p.name}">` : '<i class="fas fa-image"></i>'}
        </div>
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="product-price">${formatPrice(p.price)}</div>
          ${stockHtml}
        </div>
      `;
      productsGrid.appendChild(card);
    });
  }

  // Ensure products exist before render
  if (allProducts.length === 0) {
    if (typeof initAppData === 'function') initAppData();
    allProducts = getData(LS_KEYS.products).filter(p => p.status !== 'hidden');
  }

  renderProducts();

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderProducts();
    });
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
  }

  /* ── Modal Logic ── */
  const modal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const addToCartBtn = document.getElementById('addToCartBtn');

  function openModal(product) {
    selectedProduct = product;
    
    document.getElementById('modalCat').textContent = product.category;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
    document.getElementById('modalDesc').textContent = product.description;
    
    const imgContainer = document.getElementById('modalImg');
    imgContainer.innerHTML = product.image ? `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit">` : '<i class="fas fa-image"></i>';

    const stockEl = document.getElementById('modalStock');
    const stockText = document.getElementById('modalStockText');
    if (product.stock <= 0) {
      stockEl.className = 'product-stock stock-out';
      stockEl.textContent = 'สินค้าหมด';
      stockText.textContent = '';
      addToCartBtn.disabled = true;
      qtyInput.disabled = true;
    } else {
      stockEl.className = 'product-stock stock-in';
      stockEl.textContent = 'พร้อมส่ง';
      stockText.textContent = `มีสินค้า ${product.stock} ชิ้น`;
      addToCartBtn.disabled = false;
      qtyInput.disabled = false;
    }

    const specsList = document.getElementById('modalSpecsList');
    specsList.innerHTML = '';
    if (product.specs) {
      const parts = product.specs.split('|');
      parts.forEach(part => {
        if(part.trim()) {
          const li = document.createElement('li');
          li.textContent = part.trim();
          specsList.appendChild(li);
        }
      });
    } else {
      specsList.innerHTML = '<li>ไม่มีข้อมูลจำเพาะ</li>';
    }

    qtyInput.value = 1;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling
  }

  function closeProductModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedProduct = null;
  }

  if (modal) {
    closeModal.addEventListener('click', closeProductModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });

    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (selectedProduct && val < selectedProduct.stock) {
        qtyInput.value = val + 1;
      } else {
        showToast('เกินจำนวนสินค้าที่มีอยู่', 'error');
      }
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val < 1) val = 1;
      if (selectedProduct && val > selectedProduct.stock) val = selectedProduct.stock;
      qtyInput.value = val;
    });

    addToCartBtn.addEventListener('click', () => {
      if (!selectedProduct) return;
      
      const qty = parseInt(qtyInput.value) || 1;
      if (qty > selectedProduct.stock) {
        showToast('จำนวนสินค้าไม่พอ', 'error');
        return;
      }

      let cart = getData(LS_KEYS.cart) || [];
      const existingIndex = cart.findIndex(item => item.id === selectedProduct.id);

      if (existingIndex > -1) {
        if (cart[existingIndex].qty + qty > selectedProduct.stock) {
           showToast('จำนวนในตะกร้ารวมแล้วเกินสต็อก', 'error');
           return;
        }
        cart[existingIndex].qty += qty;
      } else {
        cart.push({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          category: selectedProduct.category,
          qty: qty
        });
      }

      saveData(LS_KEYS.cart, cart);
      updateCartBadge();
      showToast(`เพิ่ม ${selectedProduct.name} ลงตะกร้าแล้ว`);
      closeProductModal();
    });
  }

  /* ── Cart Page Logic ── */
  const cartContainer = document.getElementById('cartContainer');
  if (cartContainer) {
    function renderCartPage() {
      let cart = getData(LS_KEYS.cart) || [];
      if (cart.length === 0) {
        cartContainer.innerHTML = `
          <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <h3>ไม่มีสินค้าในตะกร้า</h3>
            <p>เลือกดูสินค้าที่คุณสนใจได้เลย</p>
            <a href="shop.html" class="btn btn-primary">กลับไปเลือกซื้อสินค้า</a>
          </div>
        `;
        return;
      }

      let subtotal = 0;
      let itemsHtml = '<div class="cart-items">';

      cart.forEach((item, index) => {
        const itemTotal = item.price * (item.qty || item.quantity || 1);
        subtotal += itemTotal;
        const currentQty = item.qty || item.quantity || 1;

        itemsHtml += `
          <div class="cart-item">
            <div class="cart-item-img">
              ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-image"></i>'}
            </div>
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${formatPrice(item.price)}</div>
              <div class="qty-controls">
                <button class="qty-btn" onclick="window.updateCartItem(${index}, -1)">-</button>
                <div class="qty-display">${currentQty}</div>
                <button class="qty-btn" onclick="window.updateCartItem(${index}, 1)">+</button>
              </div>
            </div>
            <div class="cart-item-total">รวม: ${formatPrice(itemTotal)}</div>
            <button class="remove-btn" onclick="window.removeCartItem(${index})" title="ลบสินค้า"><i class="fas fa-trash"></i></button>
          </div>
        `;
      });
      itemsHtml += '</div>';

      const summaryHtml = `
        <div class="cart-summary">
          <h3>สรุปคำสั่งซื้อ</h3>
          <div class="summary-row">
            <span>มูลค่าสินค้า:</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          <div class="summary-row">
            <span>ค่าจัดส่ง:</span>
            <span>คำนวณในขั้นตอนถัดไป</span>
          </div>
          <div class="summary-total">
            <span>ยอดรวมทั้งสิ้น:</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          <a href="checkout.html" class="btn btn-accent checkout-btn">ดำเนินการสั่งซื้อ <i class="fas fa-arrow-right"></i></a>
        </div>
      `;

      cartContainer.innerHTML = itemsHtml + summaryHtml;
    }

    // Attach cart functions to window so they can be called from inline onclick
    window.updateCartItem = (index, delta) => {
      let cart = getData(LS_KEYS.cart) || [];
      const item = cart[index];
      if (!item) return;

      const currentQty = item.qty || item.quantity || 1;
      let newQty = currentQty + delta;
      
      if (newQty < 1) newQty = 1;

      // Check stock limit
      const allProds = getData(LS_KEYS.products) || [];
      const prod = allProds.find(p => p.id === item.id);
      if (prod && newQty > prod.stock) {
        showToast('เกินจำนวนสินค้าที่มีอยู่', 'error');
        return;
      }

      cart[index].qty = newQty;
      saveData(LS_KEYS.cart, cart);
      renderCartPage();
      updateCartBadge();
    };

    window.removeCartItem = (index) => {
      let cart = getData(LS_KEYS.cart) || [];
      cart.splice(index, 1);
      saveData(LS_KEYS.cart, cart);
      renderCartPage();
      updateCartBadge();
      showToast('ลบสินค้าแล้ว');
    };

    renderCartPage();
  }

});
