<?php
/**
 * pages/products/index.php
 * ArtsyCrate — Shop / Products page
 *
 * Folder: pages/products/
 * Shared includes are 2 levels up: ../../includes/
 * Page-specific includes are local: includes/
 */

/* ── Load product data first (used by multiple sections) ── */
require_once 'includes/data.php';

/* ── Page config ── */
$pageTitle       = 'Shop — ArtsyCrate | Custom Prints, Charms & More';
$pageDescription = 'Browse all ArtsyCrate products — custom prints, DIY keychains & bracelets, personalized tumblers, 3D printing, and gift sets. Order online or walk in.';
$activePage      = 'shop';
$baseUrl = '/';
$stylesPath      = '../../styles.css';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include '../includes/head.php'; ?>
<link rel="stylesheet" href="/pages/products/products.css"/>
</head>
<body>

<?php include '../includes/navbar.php'; ?>

<?php include 'includes/section-hero.php'; ?>

<?php include 'includes/section-filters.php'; ?>

<?php include 'includes/section-grid.php'; ?>

<?php include '../includes/cta-band.php'; ?>

<?php include '../includes/footer.php'; ?>

<!-- Products filter/search/sort JS -->
<script src="/pages/products/products.js"></script>

<!-- Page-level scroll reveal (reused pattern from index.php) -->
<script>
(function(){
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  const revEls = document.querySelectorAll('.fade-up,.fade-left,.fade-right');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    revEls.forEach(el => io.observe(el));
  } else {
    revEls.forEach(el => el.classList.add('vis'));
  }
})();
</script>

</body>
</html>