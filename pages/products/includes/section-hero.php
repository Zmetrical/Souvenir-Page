<?php
/**
 * pages/products/includes/section-hero.php
 *
 * Compact hero banner for the products page.
 * Reads: $categories (from data.php), $products (from data.php)
 */

$totalProducts  = count($products);
$totalCategories = count($categories) - 1; // exclude 'all'
?>
<div class="prod-hero">
  <div class="container">
    <div class="row align-items-center g-4">

      <!-- Left: breadcrumb + headline -->
      <div class="col-lg-7">
        <div class="ph-breadcrumb">
          <a href="../../index.php" class="ph-bc-link">
            <i data-lucide="home" style="width:12px;height:12px;"></i> Home
          </a>
          <span class="ph-bc-sep">/</span>
          <span class="ph-bc-cur">Shop</span>
        </div>
        <h1 class="ph-headline">
          Everything You Can<br/>
          <span class="ph-hl-accent">Create</span> With Us ✨
        </h1>
        <p class="ph-sub">
          Browse our full collection — from custom prints to handmade charms.
          Order online or walk in and make it yourself.
        </p>
        <div class="ph-ctas">
          <a href="../../builder/keychain.php" class="ph-btn-primary">
            <i data-lucide="scissors" style="width:15px;height:15px;"></i>
            Start Designing
          </a>
          <a href="#prod-grid" class="ph-btn-ghost">
            <i data-lucide="arrow-down" style="width:15px;height:15px;"></i>
            Browse All
          </a>
        </div>
      </div>

      <!-- Right: stat pills -->
      <div class="col-lg-5">
        <div class="ph-stats">
          <div class="ph-stat">
            <div class="ph-stat-num"><?= $totalProducts ?>+</div>
            <div class="ph-stat-lbl">Products</div>
          </div>
          <div class="ph-stat">
            <div class="ph-stat-num"><?= $totalCategories ?></div>
            <div class="ph-stat-lbl">Categories</div>
          </div>
          <div class="ph-stat">
            <div class="ph-stat-num">1 day</div>
            <div class="ph-stat-lbl">Turnaround</div>
          </div>
          <div class="ph-stat">
            <div class="ph-stat-num">₱55+</div>
            <div class="ph-stat-lbl">Starting price</div>
          </div>
        </div>

        <!-- Feature tags -->
        <div class="ph-tags">
          <span class="ph-tag">
            <i data-lucide="map-pin" style="width:11px;height:11px;"></i>
            Walk-in welcome
          </span>
          <span class="ph-tag">
            <i data-lucide="package" style="width:11px;height:11px;"></i>
            Bulk orders OK
          </span>
          <span class="ph-tag">
            <i data-lucide="zap" style="width:11px;height:11px;"></i>
            Same-day rush
          </span>
        </div>
      </div>

    </div>
  </div>
</div>