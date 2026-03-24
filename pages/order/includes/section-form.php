<?php
/**
 * pages/order/includes/section-form.php
 *
 * Left column: customer details form.
 * All fields post to confirmation.php via JS (no page reload).
 * Phase 2: change form action to a Laravel controller route.
 */
?>
<div class="of-col of-col-form">

  <!-- Step indicator -->
  <div class="of-steps">
    <div class="of-step active">
      <div class="of-step-num">1</div>
      <div class="of-step-lbl">Your Details</div>
    </div>
    <div class="of-step-line"></div>
    <div class="of-step">
      <div class="of-step-num">2</div>
      <div class="of-step-lbl">Review</div>
    </div>
    <div class="of-step-line"></div>
    <div class="of-step">
      <div class="of-step-num">3</div>
      <div class="of-step-lbl">Confirm</div>
    </div>
  </div>

  <form class="of-form" id="orderForm" novalidate>

    <!-- ── Contact info ── -->
    <div class="of-section-label">
      <i data-lucide="user" style="width:13px;height:13px;"></i>
      Contact Information
    </div>

    <div class="of-row-2">
      <div class="of-field">
        <label class="of-label" for="firstName">First Name <span class="of-req">*</span></label>
        <input class="of-input" id="firstName" name="firstName"
               type="text" placeholder="Maria" autocomplete="given-name" required/>
        <span class="of-err" id="err-firstName"></span>
      </div>
      <div class="of-field">
        <label class="of-label" for="lastName">Last Name <span class="of-req">*</span></label>
        <input class="of-input" id="lastName" name="lastName"
               type="text" placeholder="Santos" autocomplete="family-name" required/>
        <span class="of-err" id="err-lastName"></span>
      </div>
    </div>

    <div class="of-field">
      <label class="of-label" for="contactNo">Contact Number <span class="of-req">*</span></label>
      <div class="of-input-wrap">
        <span class="of-input-prefix">+63</span>
        <input class="of-input of-input-prefixed" id="contactNo" name="contactNo"
               type="tel" placeholder="9XX XXX XXXX" autocomplete="tel" required/>
      </div>
      <span class="of-err" id="err-contactNo"></span>
    </div>

    <div class="of-field">
      <label class="of-label" for="email">Email Address <span class="of-muted">(optional)</span></label>
      <input class="of-input" id="email" name="email"
             type="email" placeholder="maria@example.com" autocomplete="email"/>
      <span class="of-hint">We'll send your order confirmation here</span>
    </div>

    <!-- ── Order details ── -->
    <div class="of-section-label" style="margin-top:10px;">
      <i data-lucide="package" style="width:13px;height:13px;"></i>
      Order Details
    </div>

    <div class="of-field">
      <label class="of-label" for="productType">Product Type <span class="of-req">*</span></label>
      <select class="of-select" id="productType" name="productType" required>
        <option value="">— Select a product —</option>
        <optgroup label="Custom Prints">
          <option value="sticker-sheet">Custom Sticker Sheet</option>
          <option value="poster-print">Custom Poster</option>
          <option value="tarpaulin">Tarpaulin / Streamer</option>
          <option value="id-lace">ID Lace / Lanyard</option>
          <option value="photo-print">Photo Print</option>
        </optgroup>
        <optgroup label="Charms & Keychains">
          <option value="diy-keychain">DIY Keychain</option>
          <option value="diy-bracelet">DIY Bracelet</option>
          <option value="diy-necklace">DIY Necklace</option>
          <option value="acrylic-keychain">Acrylic Keychain</option>
        </optgroup>
        <optgroup label="Tumblers & Mugs">
          <option value="tumbler-sublimation">Sublimation Tumbler</option>
          <option value="mug-custom">Custom Mug</option>
          <option value="bottle-custom">Custom Water Bottle</option>
        </optgroup>
        <optgroup label="3D Printing">
          <option value="3d-figurine">3D Figurine</option>
          <option value="3d-name-stand">3D Name Stand</option>
          <option value="3d-logo-object">3D Logo Object</option>
          <option value="3d-mini-model">3D Mini Model</option>
        </optgroup>
        <optgroup label="Gift Sets">
          <option value="gift-birthday">Birthday Gift Set</option>
          <option value="gift-graduation">Graduation Set</option>
          <option value="gift-pasalubong">Pasalubong Bundle</option>
          <option value="gift-event">Event Giveaway Pack</option>
        </optgroup>
      </select>
      <span class="of-err" id="err-productType"></span>
    </div>

    <div class="of-row-2">
      <div class="of-field">
        <label class="of-label" for="quantity">Quantity <span class="of-req">*</span></label>
        <div class="of-qty-wrap">
          <button type="button" class="of-qty-btn" id="qtyMinus"
                  aria-label="Decrease quantity">−</button>
          <input class="of-input of-qty-input" id="quantity" name="quantity"
                 type="number" value="1" min="1" max="999" required/>
          <button type="button" class="of-qty-btn" id="qtyPlus"
                  aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="of-field">
        <label class="of-label" for="pickupDate">Preferred Pickup</label>
        <input class="of-input" id="pickupDate" name="pickupDate"
               type="date" min=""/>
        <span class="of-hint">Leave blank if flexible</span>
      </div>
    </div>

    <!-- ── Design / file upload ── -->
    <div class="of-section-label" style="margin-top:10px;">
      <i data-lucide="image" style="width:13px;height:13px;"></i>
      Design Reference
    </div>

    <!-- Builder design preview (shown only when coming from builder) -->
    <div class="of-design-preview" id="designPreview" style="display:none;">
      <div class="of-dp-label">
        <i data-lucide="check-circle" style="width:13px;height:13px;color:var(--teal-dk);"></i>
        Design from builder attached
      </div>
      <canvas id="designCanvas" class="of-dp-canvas"></canvas>
      <button type="button" class="of-dp-remove" id="removeDesign">
        <i data-lucide="x" style="width:11px;height:11px;"></i> Remove
      </button>
    </div>

    <!-- File upload (shown when no builder design) -->
    <div class="of-upload-wrap" id="uploadWrap">
      <label class="of-upload" for="designFile" id="uploadLabel">
        <div class="of-upload-icon">
          <i data-lucide="upload-cloud" style="width:28px;height:28px;"></i>
        </div>
        <div class="of-upload-title">Upload your design</div>
        <div class="of-upload-sub">PNG, JPG, PDF — max 10MB</div>
        <input type="file" id="designFile" name="designFile"
               accept=".png,.jpg,.jpeg,.pdf,.ai,.psd"
               style="display:none;" multiple/>
      </label>
      <div class="of-file-list" id="fileList"></div>
    </div>

    <!-- ── Special notes ── -->
    <div class="of-field" style="margin-top:16px;">
      <label class="of-label" for="notes">Special Instructions</label>
      <textarea class="of-input of-textarea" id="notes" name="notes"
                placeholder="Color preferences, size, font, any details we should know..."
                rows="3"></textarea>
      <span class="of-hint">Tell us anything that will help us get it right</span>
    </div>

    <!-- ── Pickup method ── -->
    <div class="of-section-label" style="margin-top:10px;">
      <i data-lucide="map-pin" style="width:13px;height:13px;"></i>
      Pickup / Delivery
    </div>

    <div class="of-pickup-opts" id="pickupOpts">
      <label class="of-pick">
        <input type="radio" name="pickupMethod" value="store" checked/>
        <div class="of-pick-card">
          <div class="of-pick-icon">
            <i data-lucide="store" style="width:18px;height:18px;"></i>
          </div>
          <div>
            <div class="of-pick-title">Store Pickup</div>
            <div class="of-pick-sub">Parañaque City — Free</div>
          </div>
        </div>
      </label>
      <label class="of-pick">
        <input type="radio" name="pickupMethod" value="delivery"/>
        <div class="of-pick-card">
          <div class="of-pick-icon">
            <i data-lucide="truck" style="width:18px;height:18px;"></i>
          </div>
          <div>
            <div class="of-pick-title">Delivery</div>
            <div class="of-pick-sub">Lalamove / J&T — Fee applies</div>
          </div>
        </div>
      </label>
    </div>

    <!-- ── Submit ── -->
    <button type="submit" class="of-submit" id="submitBtn">
      <i data-lucide="send" style="width:16px;height:16px;"></i>
      Place My Order
    </button>

    <p class="of-disclaimer">
      By placing an order you agree to be contacted via the number provided.
      No payment is collected online — we'll confirm pricing after reviewing your design.
    </p>

  </form>
</div>