<?php
/**
 * pages/order/review.php
 * ArtsyCrate — Review Your Order (Step 2)
 *
 * Reads order data from sessionStorage (written by order.js).
 * Two actions: Edit (back to index.php) or Confirm (writes orderCode, goes to confirmation.php).
 * Phase 2: "Confirm" button POSTs to a Laravel controller instead of using sessionStorage.
 */

$pageTitle       = 'Review Your Order — ArtsyCrate';
$pageDescription = 'Review your ArtsyCrate order details before confirming.';
$activePage      = 'shop';
$baseUrl         = '/';
$stylesPath      = '../../styles.css';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include '../includes/head.php'; ?>
  <link rel="stylesheet" href="/pages/order/order.css"/>
</head>
<body>

<?php include '../includes/navbar.php'; ?>

<!-- Page header -->
<div class="of-header">
  <div class="container">
    <div class="of-breadcrumb">
      <a href="/index.php"           class="of-bc-link">
        <i data-lucide="home" style="width:12px;height:12px;"></i> Home
      </a>
      <span class="of-bc-sep">/</span>
      <a href="/pages/products/"     class="of-bc-link">Shop</a>
      <span class="of-bc-sep">/</span>
      <a href="/pages/order/"        class="of-bc-link">Order</a>
      <span class="of-bc-sep">/</span>
      <span class="of-bc-cur">Review</span>
    </div>
    <h1 class="of-page-title">Review Your Order 🔍</h1>
    <p class="of-page-sub">Double-check everything before we receive it. You can still go back and edit.</p>
  </div>
</div>

<!-- Step indicator (step 2 active) -->
<div class="rv-steps-wrap">
  <div class="container">
    <div class="of-steps">
      <div class="of-step done">
        <div class="of-step-num">
          <i data-lucide="check" style="width:12px;height:12px;"></i>
        </div>
        <div class="of-step-lbl">Your Details</div>
      </div>
      <div class="of-step-line"></div>
      <div class="of-step active">
        <div class="of-step-num">2</div>
        <div class="of-step-lbl">Review</div>
      </div>
      <div class="of-step-line"></div>
      <div class="of-step">
        <div class="of-step-num">3</div>
        <div class="of-step-lbl">Confirm</div>
      </div>
    </div>
  </div>
</div>

<!-- No order data guard -->
<div id="rvNoData" style="display:none;">
  <div class="oc-wrap">
    <div class="oc-card">
      <div class="oc-icon" style="background:var(--pink-bg);">
        <i data-lucide="alert-circle" style="width:36px;height:36px;color:var(--pink-dk);"></i>
      </div>
      <h2 class="oc-title" style="font-size:1.5rem;">No order found</h2>
      <p class="oc-sub">It looks like you navigated here directly. Please fill in your order details first.</p>
      <div class="oc-btns">
        <a href="/pages/order/" class="oc-btn-primary">
          <i data-lucide="arrow-left" style="width:15px;height:15px;"></i>
          Go to Order Form
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Review body -->
<div id="rvBody" class="of-body" style="display:none;">
  <div class="container">
    <div class="rv-cols">

      <!-- LEFT: review cards -->
      <div class="rv-main">

        <!-- Contact info card -->
        <div class="rv-card">
          <div class="rv-card-head">
            <div class="rv-card-head-left">
              <div class="rv-card-icon" style="background:var(--teal-bg);">
                <i data-lucide="user" style="width:16px;height:16px;color:var(--teal-dk);"></i>
              </div>
              <span>Contact Information</span>
            </div>
            <button class="rv-edit-btn" onclick="goEdit()">
              <i data-lucide="pencil" style="width:12px;height:12px;"></i> Edit
            </button>
          </div>
          <div class="rv-card-body">
            <div class="rv-row">
              <span class="rv-lbl">Name</span>
              <span class="rv-val" id="rvName">—</span>
            </div>
            <div class="rv-row">
              <span class="rv-lbl">Contact No.</span>
              <span class="rv-val" id="rvContact">—</span>
            </div>
            <div class="rv-row" id="rvEmailRow">
              <span class="rv-lbl">Email</span>
              <span class="rv-val" id="rvEmail">—</span>
            </div>
          </div>
        </div>

        <!-- Order details card -->
        <div class="rv-card">
          <div class="rv-card-head">
            <div class="rv-card-head-left">
              <div class="rv-card-icon" style="background:var(--pink-bg);">
                <i data-lucide="package" style="width:16px;height:16px;color:var(--pink-dk);"></i>
              </div>
              <span>Order Details</span>
            </div>
            <button class="rv-edit-btn" onclick="goEdit()">
              <i data-lucide="pencil" style="width:12px;height:12px;"></i> Edit
            </button>
          </div>
          <div class="rv-card-body">
            <div class="rv-row">
              <span class="rv-lbl">Product</span>
              <span class="rv-val" id="rvProduct">—</span>
            </div>
            <div class="rv-row">
              <span class="rv-lbl">Quantity</span>
              <span class="rv-val" id="rvQty">—</span>
            </div>
            <div class="rv-row">
              <span class="rv-lbl">Pickup / Delivery</span>
              <span class="rv-val" id="rvPickup">—</span>
            </div>
            <div class="rv-row" id="rvDateRow" style="display:none;">
              <span class="rv-lbl">Preferred Date</span>
              <span class="rv-val" id="rvDate">—</span>
            </div>
            <div class="rv-row" id="rvNotesRow" style="display:none;">
              <span class="rv-lbl">Notes</span>
              <span class="rv-val rv-val-notes" id="rvNotes">—</span>
            </div>
          </div>
        </div>

        <!-- Design reference card -->
        <div class="rv-card" id="rvDesignCard">
          <div class="rv-card-head">
            <div class="rv-card-head-left">
              <div class="rv-card-icon" style="background:#F0EEFF;">
                <i data-lucide="palette" style="width:16px;height:16px;color:var(--purple);"></i>
              </div>
              <span>Design Reference</span>
            </div>
            <button class="rv-edit-btn" onclick="goEdit()">
              <i data-lucide="pencil" style="width:12px;height:12px;"></i> Edit
            </button>
          </div>
          <div class="rv-card-body">
            <!-- Builder design -->
            <div id="rvBuilderDesign" style="display:none;">
              <div class="rv-design-badge">
                <i data-lucide="check-circle" style="width:13px;height:13px;"></i>
                Custom design from builder
              </div>
              <canvas id="rvDesignCanvas" class="rv-design-canvas"></canvas>
            </div>
            <!-- No design -->
            <div id="rvNoDesign">
              <div class="rv-no-design">
                <i data-lucide="upload-cloud" style="width:20px;height:20px;color:var(--ink-md);"></i>
                <span>No design attached — you can share one via message after ordering</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Price notice -->
        <div class="rv-price-notice">
          <i data-lucide="info" style="width:15px;height:15px;color:var(--teal-dk);flex-shrink:0;"></i>
          <div>
            <strong>Pricing is confirmed after review.</strong>
            No payment is collected online. We'll message you to confirm the
            final price based on your design and specifications.
          </div>
        </div>

      </div><!-- /.rv-main -->

      <!-- RIGHT: confirm panel -->
      <div class="rv-aside">
        <div class="rv-confirm-card">

          <div class="rv-confirm-head">
            <i data-lucide="clipboard-check" style="width:18px;height:18px;color:var(--teal-dk);"></i>
            Ready to Place Order?
          </div>

          <!-- Mini summary -->
          <div class="rv-mini-sum" id="rvMiniSum">
            <div class="rv-mini-row">
              <span class="rv-mini-lbl">Customer</span>
              <span class="rv-mini-val" id="rvMiniName">—</span>
            </div>
            <div class="rv-mini-row">
              <span class="rv-mini-lbl">Product</span>
              <span class="rv-mini-val" id="rvMiniProduct">—</span>
            </div>
            <div class="rv-mini-row">
              <span class="rv-mini-lbl">Qty</span>
              <span class="rv-mini-val" id="rvMiniQty">—</span>
            </div>
            <div class="rv-mini-row">
              <span class="rv-mini-lbl">Pickup</span>
              <span class="rv-mini-val" id="rvMiniPickup">—</span>
            </div>
            <div class="rv-mini-row">
              <span class="rv-mini-lbl">Est. Price</span>
              <span class="rv-mini-val rv-mini-price" id="rvMiniPrice">—</span>
            </div>
          </div>

          <!-- Confirm button -->
          <button class="rv-confirm-btn" id="confirmBtn" onclick="confirmOrder()">
            <i data-lucide="send" style="width:16px;height:16px;"></i>
            Confirm & Place Order
          </button>

          <!-- Edit button -->
          <button class="rv-back-btn" onclick="goEdit()">
            <i data-lucide="arrow-left" style="width:14px;height:14px;"></i>
            Edit My Order
          </button>

          <p class="rv-confirm-note">
            By confirming you agree to be contacted on the number provided.
            We'll send payment details after reviewing your order.
          </p>

        </div>
      </div>

    </div>
  </div>
</div>

<?php include '../includes/footer.php'; ?>

<script>
(function(){
  /* ── Navbar scroll ── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── Price map (mirrors order.js) ── */
  const PRICE_MAP = {
    'sticker-sheet'       :'₱80 – ₱150',
    'poster-print'        :'₱120 – ₱380',
    'tarpaulin'           :'₱180 – ₱450',
    'id-lace'             :'₱55 – ₱90',
    'photo-print'         :'₱60 – ₱200',
    'diy-keychain'        :'₱65+',
    'diy-bracelet'        :'₱80+',
    'diy-necklace'        :'₱100+',
    'acrylic-keychain'    :'₱120 – ₱180',
    'tumbler-sublimation' :'₱350 – ₱550',
    'mug-custom'          :'₱180 – ₱280',
    'bottle-custom'       :'₱280 – ₱420',
    '3d-figurine'         :'₱280 – ₱680',
    '3d-name-stand'       :'₱180 – ₱350',
    '3d-logo-object'      :'₱350 – ₱800',
    '3d-mini-model'       :'₱220 – ₱580',
    'gift-birthday'       :'₱280 – ₱450',
    'gift-graduation'     :'₱350 – ₱550',
    'gift-pasalubong'     :'₱80 – ₱150/pc',
    'gift-event'          :'Request Quote',
  };

  /* ── Load order from sessionStorage ── */
  let order = null;
  try {
    const raw = sessionStorage.getItem('artsycrate_order');
    if (raw) order = JSON.parse(raw);
  } catch(e) {}

  if (!order || order.orderCode) {
    // No pending order OR already confirmed → show guard
    document.getElementById('rvNoData').style.display = 'block';
    return;
  }

  document.getElementById('rvBody').style.display = 'block';

  /* ── Helpers ── */
  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '—';
  }
  function fmtPickup(v) {
    return v === 'delivery' ? 'Delivery (fee applies)' : 'Store Pickup — Free';
  }
  function fmtDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString('en-PH',
      { month:'long', day:'numeric', year:'numeric' });
  }

  /* ── Populate contact card ── */
  setText('rvName',    `${order.firstName} ${order.lastName}`);
  setText('rvContact', `+63 ${order.contactNo}`);
  if (order.email) {
    setText('rvEmail', order.email);
  } else {
    const row = document.getElementById('rvEmailRow');
    if (row) row.style.display = 'none';
  }

  /* ── Populate order card ── */
  setText('rvProduct', order.product);
  setText('rvQty',     `${order.quantity} pc${order.quantity > 1 ? 's' : ''}`);
  setText('rvPickup',  fmtPickup(order.pickup));

  const dateStr = fmtDate(order.pickupDate);
  if (dateStr) {
    setText('rvDate', dateStr);
    document.getElementById('rvDateRow').style.display = '';
  }

  if (order.notes) {
    setText('rvNotes', order.notes);
    document.getElementById('rvNotesRow').style.display = '';
  }

  /* ── Design canvas ── */
  if (order.designImage) {
    document.getElementById('rvBuilderDesign').style.display = 'block';
    document.getElementById('rvNoDesign').style.display      = 'none';
    const canvas = document.getElementById('rvDesignCanvas');
    const img    = new Image();
    img.onload = () => {
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
    };
    img.src = order.designImage;
  }

  /* ── Confirm panel mini summary ── */
  setText('rvMiniName',    `${order.firstName} ${order.lastName}`);
  setText('rvMiniProduct', order.product);
  setText('rvMiniQty',     order.quantity);
  setText('rvMiniPickup',  order.pickup === 'delivery' ? 'Delivery' : 'Store Pickup');
  setText('rvMiniPrice',   PRICE_MAP[order.productId] || '—');

  /* ── Actions ── */
  window.goEdit = function() {
    window.location.href = 'index.php';
  };

  window.confirmOrder = function() {
    const btn = document.getElementById('confirmBtn');
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83
                 M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Confirming...`;

    // Generate order code NOW (customer has confirmed)
    const code = generateOrderCode();
    order.orderCode = code;
    sessionStorage.setItem('artsycrate_order', JSON.stringify(order));

    // Phase 2: POST to Laravel here instead
    setTimeout(() => {
      window.location.href = `confirmation.php?code=${code}`;
    }, 700);
  };

  function generateOrderCode() {
    const d    = new Date();
    const mmdd = String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0');
    const rand = Math.random().toString(36).substring(2,6).toUpperCase();
    return `AC-${mmdd}-${rand}`;
  }

})();
</script>

</body>
</html>