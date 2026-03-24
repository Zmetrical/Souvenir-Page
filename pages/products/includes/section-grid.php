<?php
/**
 * pages/products/includes/section-grid.php
 *
 * Renders the full product grid.
 * All cards are output — JS handles show/hide via data attributes.
 * Reads: $products, $categories (from data.php)
 */

/* Badge color map */
$badgeClass = [
  'Popular' => 'pb-pink',
  'New'     => 'pb-teal',
  'Sale'    => 'pb-lime',
];
?>
<div class="prod-grid-wrap" id="prod-grid">
  <div class="container">

    <!-- Grid -->
    <div class="prod-grid" id="prodGrid">
      <?php foreach ($products as $p): ?>
      <div
        class="pcard<?= !$p['inStock'] ? ' pcard-out' : '' ?>"
        data-cat="<?= htmlspecialchars($p['category']) ?>"
        data-name="<?= htmlspecialchars(strtolower($p['name'] . ' ' . implode(' ', $p['tags']))) ?>"
        data-price-raw="<?= (int) filter_var($p['price'], FILTER_SANITIZE_NUMBER_INT) ?>"
      >
        <!-- Card visual -->
        <div class="pcard-vis" style="background:<?= $p['iconColor'] ?>;">
          <i data-lucide="<?= $p['icon'] ?>"
             class="pcard-icon"
             style="color:<?= $p['iconStroke'] ?>;"></i>

          <?php if (!empty($p['badge'])): ?>
          <span class="pcard-badge <?= $badgeClass[$p['badge']] ?? 'pb-teal' ?>">
            <?= $p['badge'] ?>
          </span>
          <?php endif; ?>

          <?php if (!$p['inStock']): ?>
          <div class="pcard-out-overlay">
            <span>Out of Stock</span>
          </div>
          <?php endif; ?>
        </div>

        <!-- Card body -->
        <div class="pcard-body">
          <div class="pcard-cat">
            <?= $categories[$p['category']]['label'] ?? $p['category'] ?>
          </div>
          <h3 class="pcard-name"><?= htmlspecialchars($p['name']) ?></h3>
          <p class="pcard-desc"><?= htmlspecialchars($p['desc']) ?></p>

          <!-- Tags -->
          <div class="pcard-tags">
            <?php foreach (array_slice($p['tags'], 0, 3) as $tag): ?>
            <span class="pcard-tag"><?= htmlspecialchars($tag) ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <!-- Card footer -->
        <div class="pcard-foot">
          <div class="pcard-price"><?= htmlspecialchars($p['price']) ?></div>
          <?php if ($p['inStock']): ?>
          <a href="<?= htmlspecialchars($p['ctaHref']) ?>"
             class="pcard-btn"
             data-product-id="<?= htmlspecialchars($p['id']) ?>">
            <?= htmlspecialchars($p['cta']) ?>
            <i data-lucide="arrow-right" style="width:13px;height:13px;"></i>
          </a>
          <?php else: ?>
          <button class="pcard-btn pcard-btn-disabled" disabled>
            Unavailable
          </button>
          <?php endif; ?>
        </div>

      </div><!-- /.pcard -->
      <?php endforeach; ?>
    </div><!-- /#prodGrid -->

    <!-- Empty state (hidden unless JS shows it) -->
    <div class="prod-empty" id="prodEmpty" style="display:none;">
      <div class="pe-icon">
        <i data-lucide="search-x" style="width:40px;height:40px;"></i>
      </div>
      <div class="pe-title">No products found</div>
      <div class="pe-sub">Try a different category or search term</div>
      <button class="pe-reset" onclick="resetFilters()">
        <i data-lucide="rotate-ccw" style="width:14px;height:14px;"></i>
        Show all products
      </button>
    </div>

  </div>
</div>