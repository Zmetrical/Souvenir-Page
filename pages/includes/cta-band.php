<?php
/**
 * includes/cta-band.php
 *
 * Full-width teal CTA band with hours card.
 *
 * Usage:
 *   <?php include 'includes/cta-band.php'; ?>
 *
 * Variables read:
 *   $storeHours   array   Override store hours (optional)
 *   $storeAddress string  Override address (optional)
 *   $ctaHref      string  "Find Our Store" button href (optional)
 *   $messageHref  string  "Message Us" button href (optional)
 */

$storeHours = $storeHours ?? [
  ['days' => 'Monday – Friday',   'hours' => '10AM – 8PM'],
  ['days' => 'Saturday – Sunday', 'hours' => '10AM – 9PM'],
];
$storeAddress = $storeAddress ?? 'Parañaque City, Metro Manila, Philippines';
$ctaHref      = $ctaHref      ?? '#';
$messageHref  = $messageHref  ?? '#';

$socials = [
  ['icon' => 'instagram',    'href' => '#'],
  ['icon' => 'facebook',     'href' => '#'],
  ['icon' => 'video',        'href' => '#'],
  ['icon' => 'shopping-cart','href' => '#'],
];
?>
<div class="cta-band" id="about">
  <div class="container position-relative" style="z-index:1;">
    <div class="row align-items-center g-5">

      <!-- Left: text + buttons -->
      <div class="col-lg-7 fade-up">
        <div class="cta-lbl">
          <i data-lucide="sparkles" style="width:13px;height:13px;"></i>
          Let's Create Together
        </div>
        <h2 class="cta-h">Ready to Make<br/>Something Fun? 🎨</h2>
        <p class="cta-p">
          Visit us in-store, message us online, or place your order —
          we'd love to bring your ideas to life.
        </p>
        <a href="<?= htmlspecialchars($ctaHref) ?>" class="btn-cta-w">
          <i data-lucide="map-pin" style="width:15px;height:15px;"></i>
          Find Our Store
        </a>
        <a href="<?= htmlspecialchars($messageHref) ?>" class="btn-cta-g">
          <i data-lucide="message-circle" style="width:15px;height:15px;"></i>
          Message Us
        </a>
        <div class="socials">
          <?php foreach ($socials as $sc): ?>
          <a href="<?= htmlspecialchars($sc['href']) ?>" class="sc">
            <i data-lucide="<?= $sc['icon'] ?>" style="width:17px;height:17px;"></i>
          </a>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Right: hours card -->
      <div class="col-lg-5 fade-up d2">
        <div class="hours-card">
          <div class="hc-t">
            <i data-lucide="clock" style="width:17px;height:17px;color:var(--teal-dk);"></i>
            Store Hours
          </div>
          <?php foreach ($storeHours as $row): ?>
          <div class="hc-r">
            <span class="hc-d"><?= htmlspecialchars($row['days']) ?></span>
            <span class="hc-tm"><?= htmlspecialchars($row['hours']) ?></span>
          </div>
          <?php endforeach; ?>
          <hr class="hc-sep"/>
          <div class="hc-loc">
            <i data-lucide="map-pin" style="width:13px;height:13px;color:var(--teal-dk);"></i>
            <?= htmlspecialchars($storeAddress) ?>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>