<?php
// $productLabel is set by the parent page, e.g. 'Bracelet', 'Necklace', 'Keychain / Bag Charm'
$productLabel = $productLabel ?? 'Custom Order';
?>
<div class="overlay" id="order-modal">
  <div class="mbox">
    <div class="mhead pink">
      <div class="mtitle">( Place Your Order )</div>
      <button class="mclose" onclick="app.ui.closeModal('order-modal')">×</button>
    </div>
    <div class="mbody">
      <div class="form-col">
        <div class="frow2">
          <div class="frow">
            <label class="flbl">First Name</label>
            <input class="finput" placeholder="Maria"/>
          </div>
          <div class="frow">
            <label class="flbl">Last Name</label>
            <input class="finput" placeholder="Santos"/>
          </div>
        </div>
        <div class="frow">
          <label class="flbl">Contact No.</label>
          <input class="finput" placeholder="09xx-xxx-xxxx"/>
        </div>
        <div class="frow">
          <label class="flbl">Special Notes</label>
          <input class="finput" placeholder="Any message..."/>
        </div>
        <div class="osum">
          <div class="osum-t">Order Summary</div>
          <div class="osum-row">
            <span id="os-prod"><?= htmlspecialchars($productLabel) ?></span>
            <span id="os-base">₱0</span>
          </div>
          <div class="osum-row">
            <span id="os-elems">0 elements</span>
            <span id="os-ecost">₱0</span>
          </div>
          <div class="osum-total">
            <span>Total Estimate</span>
            <span id="os-total" style="color:var(--pink-dk);">₱0.00</span>
          </div>
        </div>
        <div id="order-design-thumb" style="display:none;margin-top:8px;">
          <div class="slbl">Design Reference</div>
          <canvas id="order-canvas" width="300" height="140"
                  style="width:100%;border-radius:10px;
                         background:var(--grey-50);
                         border:1.5px solid var(--grey-200);"></canvas>
        </div>
        <div class="mbtns" style="margin-top:10px;">
          <button class="mbtn secondary" onclick="app.ui.closeModal('order-modal')">← Back</button>
          <button class="mbtn primary"   onclick="app.ui.submitOrder()">Submit Order ✓</button>
        </div>
      </div>
    </div>
  </div>
</div>