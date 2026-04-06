/* ================================================================
   RaydeeSolar — Checkout Logic (checkout.js)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const cart = getData(LS_KEYS.cart) || [];
  
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const checkoutItemsList = document.getElementById('checkoutItemsList');
  const sumSubtotalEl = document.getElementById('sumSubtotal');
  const sumShippingEl = document.getElementById('sumShipping');
  const sumGrandTotalEl = document.getElementById('sumGrandTotal');

  let subtotal = 0;
  let shippingCost = 0;
  let isShippingCalculated = false;
  let distanceKm = 0;
  let shippingZone = '-';
  let panelCount = 0;

  // Render items
  cart.forEach(item => {
    const qty = item.qty || item.quantity || 1;
    const total = item.price * qty;
    subtotal += total;

    if (item.category === 'แผงโซล่า') {
      panelCount += qty;
    }

    const div = document.createElement('div');
    div.className = 'summary-item';
    div.innerHTML = `
      <div class="summary-item-name">${item.name} <strong style="color:var(--dark)">x${qty}</strong></div>
      <div>${formatPrice(total)}</div>
    `;
    checkoutItemsList.appendChild(div);
  });

  sumSubtotalEl.textContent = formatPrice(subtotal);
  sumGrandTotalEl.textContent = formatPrice(subtotal);

  const shipConfig = getData(LS_KEYS.shippingConfig) || DEFAULT_SHIPPING_CONFIG;

  // Shipping Calculation Function
  const calcShippingBtn = document.getElementById('calcShippingBtn');
  const shippingResult = document.getElementById('shippingResult');
  const submitOrderBtn = document.getElementById('submitOrderBtn');
  const submitWarning = document.getElementById('submitWarning');

  calcShippingBtn.addEventListener('click', async () => {
    const addr = document.getElementById('addrDetail').value.trim();
    const subDist = document.getElementById('addrSubDistrict').value.trim();
    const dist = document.getElementById('addrDistrict').value.trim();
    const prov = document.getElementById('addrProvince').value.trim();
    const zip = document.getElementById('addrZip').value.trim();

    if(!addr || !subDist || !dist || !prov || !zip) {
      showToast('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วนก่อนคำนวณค่าส่ง', 'error');
      return;
    }

    const fullDest = `${addr} ${subDist} ${dist} ${prov} ${zip} ประเทศไทย`;
    const origin = 'อำเภอเมือง จังหวัดสระบุรี ประเทศไทย';

    calcShippingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังคำนวณ...';
    calcShippingBtn.disabled = true;

    // Default to fallback calculation first
    distanceKm = PROVINCE_DISTANCES[prov.replace('จ.', '').trim()] || 150; // Fallback 150km if unknown

    try {
      // Try Google Maps if loaded
      if (typeof google === 'object' && typeof google.maps === 'object') {
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [origin],
          destinations: [fullDest],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
        }, (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const meters = response.rows[0].elements[0].distance.value;
            distanceKm = Math.round(meters / 1000);
          }
          applyShippingCalculation();
        });
      } else {
        // Just use fallback directly
        setTimeout(applyShippingCalculation, 600); // Simulate network delay
      }
    } catch (e) {
      console.error(e);
      setTimeout(applyShippingCalculation, 600);
    }
  });

  function applyShippingCalculation() {
    let method = '';
    
    // Apply rules
    if (panelCount === 0) {
      shippingCost = shipConfig.accessoryFlat || 150;
      method = 'เหมาจ่าย (ไม่มีแผงโซล่า)';
      shippingZone = 'ทั่วไป';
    } else if (panelCount >= 1 && panelCount <= 3) {
      shippingCost = panelCount * (shipConfig.perPanel || 450);
      method = `รายแผง (${panelCount} x ${shipConfig.perPanel || 450}฿)`;
      shippingZone = 'รายแผง';
    } else {
      // 4+ panels -> Zone based
      if (distanceKm <= 100) {
        shippingZone = 'A';
        shippingCost = shipConfig.zoneA || 1000;
      } else if (distanceKm <= 250) {
        shippingZone = 'B';
        shippingCost = shipConfig.zoneB || 1500;
      } else {
        shippingZone = 'C';
        shippingCost = shipConfig.zoneC || 2000;
      }
      method = 'เหมาจ่ายรถบรรทุกคอก';
    }

    // Update UI
    shippingResult.innerHTML = `
      <p><strong>แผงโซล่าเซลล์:</strong> ${panelCount} แผง</p>
      <p><strong>ระยะทางจัดส่ง:</strong> ประมาณ ${distanceKm} กิโลเมตร</p>
      <p><strong>โซนจัดส่ง / รูปแบบ:</strong> Zone ${shippingZone} - ${method}</p>
      <p><strong>ค่าจัดส่งที่คำนวณได้:</strong> <span style="color:var(--primary); font-size:1.2rem; font-weight:700;">${formatPrice(shippingCost)}</span></p>
    `;
    shippingResult.classList.add('active');

    sumShippingEl.textContent = formatPrice(shippingCost);
    sumShippingEl.style.color = 'var(--text)';
    
    sumGrandTotalEl.textContent = formatPrice(subtotal + shippingCost);

    calcShippingBtn.innerHTML = 'คำนวณใหม่';
    calcShippingBtn.disabled = false;
    
    isShippingCalculated = true;
    submitOrderBtn.disabled = false;
    submitWarning.style.display = 'none';

    showToast('คำนวณค่าส่งเรียบร้อยแล้ว');
  }

  // Submit Order
  submitOrderBtn.addEventListener('click', async () => {
    if(!isShippingCalculated) return;

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const addr = document.getElementById('addrDetail').value.trim();
    const subDist = document.getElementById('addrSubDistrict').value.trim();
    const dist = document.getElementById('addrDistrict').value.trim();
    const prov = document.getElementById('addrProvince').value.trim();
    const zip = document.getElementById('addrZip').value.trim();

    if(!name || !phone || !addr || !prov || !zip) {
      showToast('กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน', 'error');
      return;
    }

    const payRadio = document.querySelector('input[name="paymentOption"]:checked');
    const paymentMethod = payRadio ? payRadio.value : 'เก็บเงินปลายทาง';

    const orderId = generateId('ORD');
    const orderData = {
      id: orderId,
      timestamp: new Date().toISOString(),
      status: 'pending', // pending, processing, shipped, success, cancelled
      customer: { name, phone, email },
      deliveryAddress: `${addr} ต.${subDist} อ.${dist} จ.${prov} ${zip}`,
      items: cart,
      subtotal: subtotal,
      shippingCost: shippingCost,
      shippingZone: shippingZone,
      distanceKm: distanceKm,
      grandTotal: subtotal + shippingCost,
      paymentMethod: paymentMethod,
      panelCount: panelCount
    };

    let orders = getData(LS_KEYS.orders) || [];
    orders.unshift(orderData);
    saveData(LS_KEYS.orders, orders);

    // Provide feedback
    submitOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังสร้างคำสั่งซื้อ...';
    submitOrderBtn.disabled = true;

    // Send to Google Sheets Backend
    if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
      try {
        const orderSummaryList = cart.map(item => `${item.name} x${item.qty || item.quantity || 1}`).join(', ');
        
        const fd = new FormData();
        fd.append('formType', 'checkout');
        fd.append('trackingId', orderId);
        fd.append('timestamp', new Date().toLocaleString('th-TH'));
        fd.append('name', name);
        fd.append('phone', phone);
        fd.append('email', email);
        fd.append('address', `${addr} ต.${subDist} อ.${dist} จ.${prov} ${zip}`);
        fd.append('orderSummary', orderSummaryList);
        fd.append('total', (subtotal + shippingCost).toString());
        fd.append('province', prov);
        fd.append('shippingFee', shippingCost.toString());
        fd.append('cartData', JSON.stringify(cart));

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: fd
        });
      } catch (err) {
        console.error('Error syncing order to DB:', err);
      }
    }

    // Clear cart and redirect
    saveData(LS_KEYS.cart, []);
    window.location.href = `order-success.html?id=${orderId}`;
  });
});
