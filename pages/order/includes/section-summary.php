<?php
/**
 * pages/order/includes/section-summary.php
 *
 * Right column: sticky order summary card.
 * Populated and updated by order.js based on form selections.
 */
?>
<div class="of-col of-col-summary">
  <div class="of-summary-card" id="summaryCard">

    <div class="of-sum-head">
      <i data-lucide="receipt" style="width:16px;height:16px;color:var(--teal-dk);"></i>
      Order Summary
    </div>

    <!-- Product row -->
    <div class="of-sum-row" id="sumProduct">
      <div class="of-sum-row-icon" style="background:var(--teal-bg);">
        <i data-lucide="package" style="width:16px;height:16px;color:var(--teal-dk);"></i>
      </div>
      <div class="of-sum-row-info">
        <div class="of-sum-row-label" id="sumProductName">No product selected</div>
        <div class="of-sum-row-sub" id="sumProductCat">Choose a product type above</div>
      </div>
    </div>

    <hr class="of-sum-divider"/>

    <!-- Details rows -->
    <div class="of-sum-details">
      <div class="of-sum-detail">
        <span class="of-sum-detail-lbl">Quantity</span>
        <span class="of-sum-detail-val" id="sumQty">1</span>
      </div>
      <div class="of-sum-detail">
        <span class="of-sum-detail-lbl">Pickup</span>
        <span class="of-sum-detail-val" id="sumPickup">Store Pickup</span>
      </div>
      <div class="of-sum-detail" id="sumDateRow" style="display:none;">
        <span class="of-sum-detail-lbl">Preferred date</span>
        <span class="of-sum-detail-val" id="sumDate">—</span>
      </div>
    </div>

    <hr class="of-sum-divider"/>

    <!-- Price estimate -->
    <div class="of-sum-price-row">
      <div class="of-sum-price-lbl">Estimated Price</div>
      <div class="of-sum-price-val" id="sumPrice">—</div>
    </div>
    <div class="of-sum-price-note">
      Final price confirmed after design review
    </div>

    <!-- Design thumbnail (if from builder) -->
    <div class="of-sum-design" id="sumDesignWrap" style="display:none;">
      <hr class="of-sum-divider"/>
      <div class="of-sum-design-lbl">
        <i data-lucide="palette" style="width:12px;height:12px;color:var(--teal-dk);"></i>
        Custom design attached
      </div>
      <canvas id="sumCanvas" class="of-sum-canvas"></canvas>
    </div>

    <!-- What happens next -->
    <div class="of-sum-next">
      <div class="of-sum-next-title">What happens next?</div>
      <div class="of-sum-next-step">
        <div class="of-sum-next-num">1</div>
        <div>We review your order & design</div>
      </div>
      <div class="of-sum-next-step">
        <div class="of-sum-next-num">2</div>
        <div>We message you to confirm price</div>
      </div>
      <div class="of-sum-next-step">
        <div class="of-sum-next-num">3</div>
        <div>Production starts after confirmation</div>
      </div>
      <div class="of-sum-next-step">
        <div class="of-sum-next-num">4</div>
        <div>Pick up or delivery to your door</div>
      </div>
    </div>

    <!-- Contact strip -->
    <div class="of-sum-contact">
      <div class="of-sum-contact-lbl">Questions? Message us</div>
      <div class="of-sum-contact-links">
        <a href="#" class="of-sum-contact-btn">
          <i data-lucide="instagram" style="width:14px;height:14px;"></i>
        </a>
        <a href="#" class="of-sum-contact-btn">
          <i data-lucide="facebook" style="width:14px;height:14px;"></i>
        </a>
        <a href="#" class="of-sum-contact-btn" id="waLink">
          <i data-lucide="message-circle" style="width:14px;height:14px;"></i>
        </a>
      </div>
    </div>

  </div>
</div>