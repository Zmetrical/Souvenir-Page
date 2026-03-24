<?php
$pageTitle       = 'ArtsyCrate — Prints, Customs & Creative Fun';
$pageDescription = 'Your one-stop creative shop for personalized gifts, custom prints, bag charms, keychains, and 3D printed wonders in Parañaque City.';
$activePage      = 'home';
$baseUrl         = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include __DIR__ . '/pages/includes/head.php'; ?>
</head>
<body>

<?php include __DIR__ . '/pages/includes/navbar.php'; ?>
<?php include __DIR__ . '/pages/includes/slider.php'; ?>
<?php include __DIR__ . '/pages/includes/svc-strip.php'; ?>
<?php include __DIR__ . '/pages/includes/section-personalized.php'; ?>
<?php include __DIR__ . '/pages/includes/cta-band.php'; ?>
<?php include __DIR__ . '/pages/includes/footer.php'; ?>

<!-- ── Page-level JS (scroll reveal) ────────────────────────────── -->
<script>
(function(){
  /* Navbar shadow on scroll */
  const nav = document.getElementById('mainNav');
  if(nav){
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* Scroll-reveal for .fade-up / .fade-left / .fade-right */
  const revEls = document.querySelectorAll('.fade-up,.fade-left,.fade-right');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    revEls.forEach(el => io.observe(el));
  } else {
    /* Fallback: just show everything */
    revEls.forEach(el => el.classList.add('vis'));
  }
})();
</script>

</body>
</html>