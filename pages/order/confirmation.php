<?php
/**
 * pages/order/confirmation.php
 * ArtsyCrate — Order Confirmed
 *
 * Reads order data from sessionStorage (written by order.js).
 * Phase 2: read from DB via order code in $_GET['code'].
 */

$pageTitle       = 'Order Confirmed — ArtsyCrate';
$pageDescription = 'Your ArtsyCrate order has been received. We will contact you shortly to confirm your design and pricing.';
$activePage      = '';
$baseUrl         = '../';
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

<div class="oc-wrap">
  <div class="oc-card">

    <!-- Success icon -->
    <div class="oc-icon">
      <i data-lucide="check-circle-2"
         style="width:36px;height:36px;color:var(--teal-dk);"></i>
    </div>

    <h1 class="oc-title">Order Received! 🎉</h1>
    <p class="oc-sub">
      Thanks for ordering with ArtsyCrate! We'll review your design and
      message you to confirm pricing and your ready date.
    </p>

    <!-- Order code -->
    <div class="oc-code-wrap">
      <div class="oc-code-lbl">Your Order Code</div>
      <div class="oc-code" id="ocCode">—</div>
      <div class="oc-code-hint">
        Screenshot or save this code to track your order
      </div>
    </div>

    <!-- Order summary (populated by JS) -->
    <div id="ocSummary" style="display:none;margin-bottom:24px;">
      <div style="background:var(--offwhite);border:1.5px solid var(--ink-lt);border-radius:12px;padding:16px 18px;text-align:left;">
        <div style="font-size:.64rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-md);margin-bottom:10px;">
          Order Details
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;">
          <div style="display:flex;justify-content:space-between;font-size:.8rem;">
            <span style="font-weight:700;color:var(--ink-md);">Name</span>
            <span style="font-weight:800;color:var(--ink);" id="ocName">—</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.8rem;">
            <span style="font-weight:700;color:var(--ink-md);">Product</span>
            <span style="font-weight:800;color:var(--ink);" id="ocProduct">—</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.8rem;">
            <span style="font-weight:700;color:var(--ink-md);">Quantity</span>
            <span style="font-weight:800;color:var(--ink);" id="ocQty">—</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.8rem;">
            <span style="font-weight:700;color:var(--ink-md);">Pickup</span>
            <span style="font-weight:800;color:var(--ink);" id="ocPickup">—</span>
          </div>
        </div>
      </div>
    </div>

    <!-- What happens next -->
    <div class="oc-steps">
      <div class="oc-steps-title">What happens next?</div>
      <div class="oc-step">
        <div class="oc-step-num">1</div>
        <div>We'll review your order and design within a few hours</div>
      </div>
      <div class="oc-step">
        <div class="oc-step-num">2</div>
        <div>We'll message you on the number you provided to confirm price</div>
      </div>
      <div class="oc-step">
        <div class="oc-step-num">3</div>
        <div>Production starts once you confirm and send payment</div>
      </div>
      <div class="oc-step">
        <div class="oc-step-num">4</div>
        <div>Pick up in-store or we arrange delivery for you</div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="oc-btns">
      <a href="/pages/products/" class="oc-btn-primary">
        <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i>
        Continue Shopping
      </a>
      <a href="/builder/keychain.php" class="oc-btn-ghost">
        <i data-lucide="scissors" style="width:15px;height:15px;"></i>
        Design Another Charm
      </a>
      <a href="/index.php" class="oc-btn-ghost">
        <i data-lucide="home" style="width:15px;height:15px;"></i>
        Back to Home
      </a>
    </div>

  </div>
</div>

<?php include '../includes/footer.php'; ?>

<script>
// Read order data from sessionStorage and populate the page
(function(){
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // Get order code from URL first, sessionStorage second
  const urlCode = new URLSearchParams(window.location.search).get('code');
  let order = null;

  try {
    const raw = sessionStorage.getItem('artsycrate_order');
    if (raw) order = JSON.parse(raw);
  } catch(e) {}

  // Show order code
  const codeEl = document.getElementById('ocCode');
  if (codeEl) {
    codeEl.textContent = urlCode || order?.orderCode || '—';
  }

  // Populate summary if we have order data
  if (order) {
    document.getElementById('ocSummary').style.display = 'block';
    document.getElementById('ocName').textContent    =
      `${order.firstName} ${order.lastName}`;
    document.getElementById('ocProduct').textContent = order.product || '—';
    document.getElementById('ocQty').textContent     = order.quantity || '1';
    document.getElementById('ocPickup').textContent  =
      order.pickup === 'delivery' ? 'Delivery' : 'Store Pickup';

    // Clear sessionStorage so refresh doesn't re-show stale data
    // (keep it for a few seconds so back-navigation still works)
    setTimeout(() => sessionStorage.removeItem('artsycrate_order'), 5000);
  }
})();
</script>

</body>
</html>