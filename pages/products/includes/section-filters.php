<?php
/**
 * pages/products/includes/section-filters.php
 *
 * Sticky filter strip: category pills + search input.
 * Reads: $categories (from data.php)
 * Filtering is handled in JS (products.js) — no page reload.
 */
?>
<div class="prod-filters" id="prod-filters">
  <div class="container">
    <div class="pf-inner">

      <!-- Category pills -->
      <div class="pf-cats" id="pfCats" role="tablist">
        <?php foreach ($categories as $key => $cat): ?>
        <button class="pf-cat<?= $key === 'all' ? ' active' : '' ?>"
                data-cat="<?= $key ?>"
                role="tab"
                aria-selected="<?= $key === 'all' ? 'true' : 'false' ?>">
          <i data-lucide="<?= $cat['icon'] ?>" style="width:13px;height:13px;"></i>
          <?= $cat['label'] ?>
        </button>
        <?php endforeach; ?>
      </div>

      <!-- Search + sort -->
      <div class="pf-right">
        <div class="pf-search-wrap">
          <i data-lucide="search" class="pf-search-icon" style="width:14px;height:14px;"></i>
          <input
            type="search"
            class="pf-search"
            id="pfSearch"
            placeholder="Search products..."
            autocomplete="off"
            aria-label="Search products"
          />
        </div>
        <select class="pf-sort" id="pfSort" aria-label="Sort by">
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </div>

    </div>

    <!-- Active filter + result count -->
    <div class="pf-status">
      <span id="pfCount" class="pf-count">Showing all products</span>
      <button class="pf-clear" id="pfClear" style="display:none;">
        <i data-lucide="x" style="width:11px;height:11px;"></i> Clear
      </button>
    </div>

  </div>
</div>