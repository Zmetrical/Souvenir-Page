<?php
// $activePage must be set by the parent page before including this file
// Accepted values: 'bracelet' | 'necklace' | 'keychain'
$activePage = $activePage ?? 'bracelet';

$navLinks = [
  'bracelet' => ['href' => 'bracelet.php', 'icon' => '◯', 'label' => 'Bracelet'],
  'necklace' => ['href' => 'necklace.php', 'icon' => '⌒', 'label' => 'Necklace'],
  'keychain' => ['href' => 'keychain.php', 'icon' => '⊟', 'label' => 'Keychain'],
];
?>
<div class="topbar">
  <div class="topbar-l">
    <a href="bracelet.php" class="logo">Artsy<b>Crate</b></a>
    <nav class="builder-nav">
      <?php foreach ($navLinks as $key => $link): ?>
        <a class="bnav-link <?= $activePage === $key ? 'active' : '' ?>"
           href="<?= $link['href'] ?>">
          <span class="bnav-icon"><?= $link['icon'] ?></span>
          <?= $link['label'] ?>
        </a>
      <?php endforeach; ?>
    </nav>
  </div>
  <div class="topbar-r">
    <button class="btn-order" onclick="app.ui.openOrder()">Order This →</button>
  </div>
</div>