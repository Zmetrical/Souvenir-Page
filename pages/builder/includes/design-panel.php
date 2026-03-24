<?php
// $maxBeads must be set by the parent page before including this file
$maxBeads = $maxBeads ?? 20;
?>
<div class="design-panel" id="design-panel">
  <div class="design-inner">

    <!-- Inspector: fixed height, never shifts -->
    <div class="insp-section">
      <div class="phead lime">
        <div class="phead-ico">
          <svg viewBox="0 0 12 12">
            <circle cx="6" cy="5" r="3"/>
            <line x1="6" y1="9" x2="6" y2="11"/>
          </svg>
        </div>
        Selected
      </div>
      <div id="insp-body">
        <div class="insp-empty">Click a bead on the canvas<br>to inspect it here</div>
      </div>
    </div>

    <!-- Design list -->
    <div class="placed-list-wrap">
      <div class="phead lime">
        <div class="phead-ico">
          <svg viewBox="0 0 12 12">
            <line x1="2" y1="3" x2="10" y2="3"/>
            <line x1="2" y1="6" x2="10" y2="6"/>
            <line x1="2" y1="9" x2="10" y2="9"/>
          </svg>
        </div>
        My Design
        <span id="elem-count-badge"
              style="margin-left:auto;background:var(--ink);color:white;
                     border-radius:4px;padding:1px 7px;font-size:.6rem;font-weight:900;">0</span>
      </div>

      <!-- Strand selector — only shown for keychain with 2+ strands (toggled by JS) -->
      <div id="strand-selector-panel"
           style="display:none;border-bottom:1px solid var(--grey-200);
                  padding:8px 12px;background:var(--white);">
        <div class="cpills" id="strand-selector-btns"></div>
      </div>

      <div class="dlist" id="design-list">
        <div class="dempty">
          <div class="dempty-icon">✽</div>
          No elements yet.<br>Pick from the library ←
        </div>
      </div>

      <div class="design-clear-foot">
        <div class="design-bead-ratio">
          <span class="bdg teal" style="width:100%;justify-content:center;display:flex;">
            Beads:
            <span class="val" id="bead-ct" style="margin:0 3px;">0</span>
            / <span id="bead-max" style="margin-left:3px;"><?= $maxBeads ?></span>
          </span>
        </div>
        <button class="tbtn t-pink" onclick="app.state.clearAll()">× Clear All</button>
      </div>
    </div>

  </div>
</div>