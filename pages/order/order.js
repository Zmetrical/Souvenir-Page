/**
 * pages/order/order.js
 *
 * Handles:
 *  1. Builder design pickup from localStorage (written by builder's "Order Now")
 *  2. Live summary panel updates as form changes
 *  3. File upload UI
 *  4. Form validation before submit
 *  5. Fake submit → redirect to confirmation.php
 *
 * Phase 2: replace the fake submit with fetch() POST to a Laravel route.
 */

(function () {
  'use strict';

  /* ── Product price map (matches data.php ids) ────────
     Phase 2: remove this and read price from the API.   */
  const PRICE_MAP = {
    'sticker-sheet'        : '₱80 – ₱150',
    'poster-print'         : '₱120 – ₱380',
    'tarpaulin'            : '₱180 – ₱450',
    'id-lace'              : '₱55 – ₱90',
    'photo-print'          : '₱60 – ₱200',
    'diy-keychain'         : '₱65+',
    'diy-bracelet'         : '₱80+',
    'diy-necklace'         : '₱100+',
    'acrylic-keychain'     : '₱120 – ₱180',
    'tumbler-sublimation'  : '₱350 – ₱550',
    'mug-custom'           : '₱180 – ₱280',
    'bottle-custom'        : '₱280 – ₱420',
    '3d-figurine'          : '₱280 – ₱680',
    '3d-name-stand'        : '₱180 – ₱350',
    '3d-logo-object'       : '₱350 – ₱800',
    '3d-mini-model'        : '₱220 – ₱580',
    'gift-birthday'        : '₱280 – ₱450',
    'gift-graduation'      : '₱350 – ₱550',
    'gift-pasalubong'      : '₱80 – ₱150/pc',
    'gift-event'           : 'Request Quote',
  };

  /* ── Element refs ────────────────────────────────── */
  const form          = document.getElementById('orderForm');
  const productSel    = document.getElementById('productType');
  const qtyInput      = document.getElementById('quantity');
  const qtyMinus      = document.getElementById('qtyMinus');
  const qtyPlus       = document.getElementById('qtyPlus');
  const pickupDate    = document.getElementById('pickupDate');
  const fileInput     = document.getElementById('designFile');
  const uploadLabel   = document.getElementById('uploadLabel');
  const fileList      = document.getElementById('fileList');
  const uploadWrap    = document.getElementById('uploadWrap');
  const designPreview = document.getElementById('designPreview');
  const designCanvas  = document.getElementById('designCanvas');
  const removeDesign  = document.getElementById('removeDesign');
  const submitBtn     = document.getElementById('submitBtn');

  /* summary refs */
  const sumProductName = document.getElementById('sumProductName');
  const sumProductCat  = document.getElementById('sumProductCat');
  const sumQty         = document.getElementById('sumQty');
  const sumPickup      = document.getElementById('sumPickup');
  const sumPrice       = document.getElementById('sumPrice');
  const sumDateRow     = document.getElementById('sumDateRow');
  const sumDate        = document.getElementById('sumDate');
  const sumDesignWrap  = document.getElementById('sumDesignWrap');
  const sumCanvas      = document.getElementById('sumCanvas');

  /* ── 1. URL param pre-selection ──────────────────────
     products/index.php links here as:
     order/index.php?product=diy-keychain               */
  const urlParams = new URLSearchParams(window.location.search);
  const preselect = urlParams.get('product');
  if (preselect && productSel) {
    const opt = productSel.querySelector(`option[value="${preselect}"]`);
    if (opt) {
      opt.selected = true;
      productSel.dispatchEvent(new Event('change'));
    }
  }

  /* ── 2. Builder design pickup ────────────────────────
     The builder stores design data here when "Order Now"
     is clicked. Key: 'artsycrate_design'               */
  let builderDesignData = null;

  function loadBuilderDesign() {
    try {
      const raw = localStorage.getItem('artsycrate_design');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data.imageUrl) return;

      builderDesignData = data;

      // Draw onto the form preview canvas
      const img = new Image();
      img.onload = () => {
        designCanvas.width  = img.naturalWidth;
        designCanvas.height = img.naturalHeight;
        const ctx = designCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Also draw onto summary canvas
        sumCanvas.width  = img.naturalWidth;
        sumCanvas.height = img.naturalHeight;
        const sCtx = sumCanvas.getContext('2d');
        sCtx.drawImage(img, 0, 0);

        designPreview.style.display = 'block';
        uploadWrap.style.display    = 'none';
        sumDesignWrap.style.display = 'block';
      };
      img.src = data.imageUrl;

      // Pre-select product if builder passed one
      if (data.product && productSel) {
        const builderProductMap = {
          'keychain' : 'diy-keychain',
          'bracelet' : 'diy-bracelet',
          'necklace' : 'diy-necklace',
        };
        const mapped = builderProductMap[data.product];
        if (mapped) {
          const opt = productSel.querySelector(`option[value="${mapped}"]`);
          if (opt) { opt.selected = true; productSel.dispatchEvent(new Event('change')); }
        }
      }
    } catch (e) {
      // localStorage not available or data malformed — silently skip
    }
  }

  if (removeDesign) {
    removeDesign.addEventListener('click', () => {
      builderDesignData = null;
      localStorage.removeItem('artsycrate_design');
      designPreview.style.display = 'none';
      uploadWrap.style.display    = 'block';
      sumDesignWrap.style.display = 'none';
    });
  }

  /* ── 3. Live summary updates ─────────────────────── */
  function updateSummary() {
    // Product name + price
    const sel = productSel?.options[productSel?.selectedIndex];
    if (sel && sel.value) {
      sumProductName.textContent = sel.text;
      sumProductCat.textContent  = sel.parentElement?.label || '';
      sumPrice.textContent       = PRICE_MAP[sel.value] || '—';
    } else {
      sumProductName.textContent = 'No product selected';
      sumProductCat.textContent  = 'Choose a product type above';
      sumPrice.textContent       = '—';
    }

    // Quantity
    if (sumQty) sumQty.textContent = qtyInput?.value || '1';

    // Pickup method
    const pickMethod = document.querySelector('input[name="pickupMethod"]:checked');
    if (sumPickup) {
      sumPickup.textContent = pickMethod?.value === 'delivery'
        ? 'Delivery (fee applies)'
        : 'Store Pickup — Free';
    }

    // Preferred date
    if (pickupDate?.value) {
      const d = new Date(pickupDate.value);
      sumDateRow.style.display = '';
      sumDate.textContent = d.toLocaleDateString('en-PH', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
    } else {
      sumDateRow.style.display = 'none';
    }
  }

  productSel?.addEventListener('change', updateSummary);
  qtyInput?.addEventListener('input', updateSummary);
  pickupDate?.addEventListener('change', updateSummary);
  document.querySelectorAll('input[name="pickupMethod"]').forEach(r => {
    r.addEventListener('change', updateSummary);
  });

  /* ── 4. Quantity stepper ─────────────────────────── */
  qtyMinus?.addEventListener('click', () => {
    const v = parseInt(qtyInput.value) || 1;
    if (v > 1) { qtyInput.value = v - 1; updateSummary(); }
  });
  qtyPlus?.addEventListener('click', () => {
    const v = parseInt(qtyInput.value) || 1;
    if (v < 999) { qtyInput.value = v + 1; updateSummary(); }
  });

  /* ── 5. Set min date to tomorrow ─────────────────── */
  if (pickupDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    pickupDate.min = tomorrow.toISOString().split('T')[0];
  }

  /* ── 6. File upload UI ───────────────────────────── */
  let uploadedFiles = [];

  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = uploadedFiles.map((f, i) => `
      <div class="of-file-item">
        <i data-lucide="file" style="width:13px;height:13px;"></i>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f.name}</span>
        <span style="opacity:.55;font-size:.65rem;">${(f.size/1024).toFixed(0)}KB</span>
        <button type="button" class="of-file-remove"
                onclick="removeFile(${i})" aria-label="Remove file">×</button>
      </div>`).join('');
    lucide.createIcons();
  }

  window.removeFile = function (idx) {
    uploadedFiles.splice(idx, 1);
    renderFileList();
  };

  fileInput?.addEventListener('change', () => {
    const newFiles = Array.from(fileInput.files);
    const valid    = newFiles.filter(f => f.size <= 10 * 1024 * 1024); // 10MB
    uploadedFiles  = [...uploadedFiles, ...valid].slice(0, 5); // max 5 files
    renderFileList();
    fileInput.value = '';
  });

  // Drag-and-drop on upload area
  uploadLabel?.addEventListener('dragover', e => {
    e.preventDefault();
    uploadLabel.style.borderColor = 'var(--teal)';
    uploadLabel.style.background  = 'var(--teal-bg)';
  });
  uploadLabel?.addEventListener('dragleave', () => {
    uploadLabel.style.borderColor = '';
    uploadLabel.style.background  = '';
  });
  uploadLabel?.addEventListener('drop', e => {
    e.preventDefault();
    uploadLabel.style.borderColor = '';
    uploadLabel.style.background  = '';
    const dropped = Array.from(e.dataTransfer.files)
      .filter(f => f.size <= 10 * 1024 * 1024);
    uploadedFiles = [...uploadedFiles, ...dropped].slice(0, 5);
    renderFileList();
  });

  /* ── 7. Validation ───────────────────────────────── */
  function showErr(id, msg) {
    const el = document.getElementById('err-' + id);
    const input = document.getElementById(id);
    if (el)    { el.textContent = msg; el.classList.add('show'); }
    if (input) { input.classList.add('error'); }
  }
  function clearErr(id) {
    const el = document.getElementById('err-' + id);
    const input = document.getElementById(id);
    if (el)    { el.textContent = ''; el.classList.remove('show'); }
    if (input) { input.classList.remove('error'); }
  }

  // Clear error on input
  ['firstName','lastName','contactNo','productType'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearErr(id));
    document.getElementById(id)?.addEventListener('change', () => clearErr(id));
  });

  function validate() {
    let valid = true;
    const fn = document.getElementById('firstName')?.value.trim();
    const ln = document.getElementById('lastName')?.value.trim();
    const ph = document.getElementById('contactNo')?.value.trim();
    const pt = productSel?.value;

    if (!fn) { showErr('firstName', 'First name is required'); valid = false; }
    else clearErr('firstName');

    if (!ln) { showErr('lastName', 'Last name is required'); valid = false; }
    else clearErr('lastName');

    if (!ph) {
      showErr('contactNo', 'Contact number is required'); valid = false;
    } else if (!/^[0-9\s\-]{7,13}$/.test(ph)) {
      showErr('contactNo', 'Enter a valid Philippine number'); valid = false;
    } else clearErr('contactNo');

    if (!pt) { showErr('productType', 'Please select a product'); valid = false; }
    else clearErr('productType');

    return valid;
  }

  /* ── 8. Submit → review ─────────────────────────── */
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) {
      const firstErr = form.querySelector('.error');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83
                 M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Reviewing order...`;

    // Collect form data — orderCode is NOT set yet, that happens on review confirm
    const orderPayload = {
      firstName  : document.getElementById('firstName').value.trim(),
      lastName   : document.getElementById('lastName').value.trim(),
      contactNo  : document.getElementById('contactNo').value.trim(),
      email      : document.getElementById('email')?.value.trim() || '',
      product    : productSel.options[productSel.selectedIndex].text,
      productId  : productSel.value,
      quantity   : qtyInput.value,
      pickup     : document.querySelector('input[name="pickupMethod"]:checked')?.value || 'store',
      pickupDate : document.getElementById('pickupDate')?.value || '',
      notes      : document.getElementById('notes')?.value.trim() || '',
      hasDesign  : !!builderDesignData,
      designImage: builderDesignData?.imageUrl || null,
      timestamp  : new Date().toISOString(),
    };

    sessionStorage.setItem('artsycrate_order', JSON.stringify(orderPayload));

    setTimeout(() => {
      window.location.href = 'review.php';
    }, 600);
  });

  /* ── 9. Order code generator ─────────────────────── */
  function generateOrderCode() {
    const prefix = 'AC';
    const date   = new Date();
    const mmdd   = String(date.getMonth() + 1).padStart(2,'0')
                 + String(date.getDate()).padStart(2,'0');
    const rand   = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${mmdd}-${rand}`;
  }

  /* ── 10. Re-fill form if returning from review (Edit flow) ── */
  function refillFromSession() {
    try {
      const raw = sessionStorage.getItem('artsycrate_order');
      if (!raw) return;
      const o = JSON.parse(raw);
      if (o.orderCode) return; // already confirmed, don't re-fill

      const set = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.value = val; };
      set('firstName',  o.firstName);
      set('lastName',   o.lastName);
      set('contactNo',  o.contactNo);
      set('email',      o.email);
      set('notes',      o.notes);
      set('pickupDate', o.pickupDate);
      set('quantity',   o.quantity);

      if (o.productId && productSel) {
        const opt = productSel.querySelector(`option[value="${o.productId}"]`);
        if (opt) opt.selected = true;
      }

      const pickupRadio = document.querySelector(
        `input[name="pickupMethod"][value="${o.pickup || 'store'}"]`
      );
      if (pickupRadio) pickupRadio.checked = true;

      // Restore builder design image if stored in payload
      if (o.designImage && !builderDesignData) {
        builderDesignData = { imageUrl: o.designImage };
        const img = new Image();
        img.onload = () => {
          designCanvas.width  = img.naturalWidth;
          designCanvas.height = img.naturalHeight;
          designCanvas.getContext('2d').drawImage(img, 0, 0);
          designPreview.style.display = 'block';
          uploadWrap.style.display    = 'none';
        };
        img.src = o.designImage;
      }
    } catch(e) {}
  }

  /* ── Init ────────────────────────────────────────── */
  loadBuilderDesign();
  refillFromSession();
  updateSummary();

})();