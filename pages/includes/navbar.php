<?php
/**
 * includes/navbar.php
 *
 * Usage:
 *   <?php
 *     $activePage = 'home';   // 'home' | 'shop' | 'customize' | 'gifts' | 'business' | 'about'
 *     include 'includes/navbar.php';
 *   ?>
 *
 * Variables read:
 *   $activePage   string   Highlights the matching nav link (optional, defaults to '')
 *   $baseUrl      string   Root path for hrefs, e.g. '/' or '../' (optional, defaults to '')
 */

$activePage = $activePage ?? '';
$baseUrl    = $baseUrl    ?? '';

$navLinks = [
  'shop'      => ['href' => $baseUrl . '#shop',      'label' => 'Shop'],
  'customize' => ['href' => $baseUrl . '#customize',  'label' => 'Customize'],
  'gifts'     => ['href' => $baseUrl . '#gifts',      'label' => 'Gifts'],
  'business'  => ['href' => $baseUrl . '#business',   'label' => 'Business'],
  'about'     => ['href' => $baseUrl . '#about',      'label' => 'About'],
];
?>
<nav class="ac-nav navbar navbar-expand-lg py-2" id="mainNav">
  <div class="container">

    <!-- Logo -->
    <a class="logo-wrap navbar-brand" href="<?= $baseUrl ?>index.php">
      <div class="logo-badge">
        <i data-lucide="package" style="width:20px;height:20px;"></i>
      </div>
      <span class="logo-letters ms-2">
        <span class="lc1">a</span><span class="lc2">r</span><span class="lc3">t</span><span class="lc4">s</span><span class="lc5">y</span><span class="lsp"></span><span class="lc3">c</span><span class="lc2">r</span><span class="lc1">a</span><span class="lc4">t</span><span class="lc5">e</span>
      </span>
    </a>

    <!-- Mobile toggle -->
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Links -->
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto align-items-center gap-1 my-2 my-lg-0">
        <?php foreach ($navLinks as $key => $link): ?>
        <li>
          <a class="nav-link nav-a<?= $activePage === $key ? ' active' : '' ?>"
             href="<?= htmlspecialchars($link['href']) ?>">
            <?= $link['label'] ?>
          </a>
        </li>
        <?php endforeach; ?>
        <li class="ms-2">
          <a class="nav-link btn-nav" href="<?= $baseUrl ?>builder/keychain.php">
            Order Now 🛍
          </a>
        </li>
      </ul>
    </div>

  </div>
</nav>