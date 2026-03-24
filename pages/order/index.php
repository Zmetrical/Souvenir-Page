<?php
/**
 * pages/order/index.php
 * ArtsyCrate — Place Your Order
 */

$pageTitle       = 'Place Your Order — ArtsyCrate';
$pageDescription = 'Order custom prints, keychains, tumblers, and more from ArtsyCrate. Upload your design or carry over your builder creation.';
$activePage      = 'shop';
$baseUrl = '/';
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
      <a href="/index.php" class="of-bc-link">
        <i data-lucide="home" style="width:12px;height:12px;"></i> Home
      </a>
      <span class="of-bc-sep">/</span>
      <a href="/pages/products/" class="of-bc-link">Shop</a>
      <span class="of-bc-sep">/</span>
      <span class="of-bc-cur">Order</span>
    </div>
    <h1 class="of-page-title">Place Your Order 🛍️</h1>
    <p class="of-page-sub">Fill in your details and we'll get back to you to confirm pricing and timeline.</p>
  </div>
</div>

<!-- Two-column form body -->
<div class="of-body">
  <div class="container">
    <div class="of-cols">
      <?php include 'includes/section-form.php'; ?>
      <?php include 'includes/section-summary.php'; ?>
    </div>
  </div>
</div>

<?php include '../includes/footer.php'; ?>

<script src="/pages/order/order.js"></script>
<script>
(function(){
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
})();
</script>

</body>
</html>