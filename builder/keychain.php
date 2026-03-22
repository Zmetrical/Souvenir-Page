<?php
$activePage   = 'keychain';
$maxBeads     = 12;
$productLabel = 'Keychain / Bag Charm';
$productConfig = ['product' => 'keychain', 'basePrice' => 65, 'maxBeads' => $maxBeads];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>ArtsyCrate — Keychain Builder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="./css/style.css"/>
</head>
<body>

<?php include 'includes/topbar.php'; ?>

<div class="builder">

  <!-- ══ SETUP PANEL ════════════════════════════════════════════════════════ -->
  <div class="setup-panel" id="setup-panel">
    <div class="setup-inner">

      <div class="phead teal">
        <div class="phead-ico">
          <svg viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="4"/>
            <line x1="6" y1="1" x2="6" y2="3"/>
            <line x1="6" y1="9" x2="6" y2="11"/>
            <line x1="1" y1="6" x2="3" y2="6"/>
            <line x1="9" y1="6" x2="11" y2="6"/>
          </svg>
        </div>
        Keychain Setup
      </div>

      <!-- Strands -->
      <div class="psec open" id="sec-strands">
        <div class="psec-toggle" onclick="app.ui.toggleSec('sec-strands')">
          <span class="psec-toggle-lbl">Strands</span>
          <svg class="psec-arr" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4"/></svg>
        </div>
        <div class="psec-body">
          <div class="slbl" style="margin-bottom:8px;">Number of Strands</div>
          <div class="cpills">
            <div class="cpill strand-count-btn active" onclick="app.ui.setStrandCount(1,this)">1</div>
            <div class="cpill strand-count-btn"        onclick="app.ui.setStrandCount(2,this)">2</div>
            <div class="cpill strand-count-btn"        onclick="app.ui.setStrandCount(3,this)">3</div>
          </div>
        </div>
      </div>

      <!-- Ring / Connector -->
      <div class="psec open" id="sec-ring">
        <div class="psec-toggle" onclick="app.ui.toggleSec('sec-ring')">
          <span class="psec-toggle-lbl">Ring</span>
          <svg class="psec-arr" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4"/></svg>
        </div>
        <div class="psec-body">
          <div class="cpills" style="flex-wrap:wrap;gap:6px;margin-bottom:14px;">
            <div class="cpill ring-type-btn active" onclick="app.ui.setRingType('ring',this)">Ring</div>
            <div class="cpill ring-type-btn"        onclick="app.ui.setRingType('heart',this)">Heart</div>
            <div class="cpill ring-type-btn"        onclick="app.ui.setRingType('carabiner',this)">Oval</div>
            <div class="cpill ring-type-btn"        onclick="app.ui.setRingType('ballchain',this)">Ball Chain</div>
          </div>
          <div class="slbl" style="margin-bottom:8px;">Ring Color</div>
          <div class="swatches" id="ring-sw">
            <div class="sw active" style="background:#F7A8C8;" onclick="app.ui.setRingCol('#F7A8C8',this)"></div>
            <div class="sw"        style="background:#1AC8C4;" onclick="app.ui.setRingCol('#1AC8C4',this)"></div>
            <div class="sw"        style="background:#A855F7;" onclick="app.ui.setRingCol('#A855F7',this)"></div>
            <div class="sw"        style="background:#111118;" onclick="app.ui.setRingCol('#111118',this)"></div>
            <div class="sw"        style="background:#C0C0C0;" onclick="app.ui.setRingCol('#C0C0C0',this)"></div>
            <div class="sw"        style="background:#FFD700;" onclick="app.ui.setRingCol('#FFD700',this)"></div>
            <div class="sw"        style="background:#3B82F6;" onclick="app.ui.setRingCol('#3B82F6',this)"></div>
            <div class="sw"        style="background:#EF4444;" onclick="app.ui.setRingCol('#EF4444',this)"></div>
          </div>
        </div>
      </div>

      <!-- Cord -->
      <div class="psec open" id="sec-cord">
        <div class="psec-toggle" onclick="app.ui.toggleSec('sec-cord')">
          <span class="psec-toggle-lbl">Cord</span>
          <svg class="psec-arr" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4"/></svg>
        </div>
        <div class="psec-body">
          <div class="slbl" style="margin-bottom:8px;">Cord Color</div>
          <div class="swatches" id="str-sw" style="margin-bottom:14px;">
            <div class="sw active" style="background:#FF5FA0;" onclick="app.ui.setStrCol('#FF5FA0',this)"></div>
            <div class="sw"        style="background:#1AC8C4;" onclick="app.ui.setStrCol('#1AC8C4',this)"></div>
            <div class="sw"        style="background:#A855F7;" onclick="app.ui.setStrCol('#A855F7',this)"></div>
            <div class="sw"        style="background:#111118;" onclick="app.ui.setStrCol('#111118',this)"></div>
            <div class="sw"        style="background:#fff;"    onclick="app.ui.setStrCol('#ffffff',this)"></div>
            <div class="sw"        style="background:#FFD700;" onclick="app.ui.setStrCol('#FFD700',this)"></div>
            <div class="sw"        style="background:#3B82F6;" onclick="app.ui.setStrCol('#3B82F6',this)"></div>
            <div class="sw"        style="background:#EF4444;" onclick="app.ui.setStrCol('#EF4444',this)"></div>
          </div>
          <div class="slbl" style="margin-bottom:8px;">Cord Type</div>
          <select class="sel" id="str-type" style="margin-bottom:14px;"
                  onchange="app.ui.setStrType(this.value)">
            <option value="Cord">Cord</option>
            <option value="Chain">Chain</option>
            <option value="Wire">Wire</option>
            <option value="Elastic">Elastic</option>
          </select>
          <div class="slbl" style="margin-bottom:8px;">Length</div>
          <select class="sel" id="length-sel">
            <option value="small">Short — 8 cm</option>
            <option value="medium" selected>Medium — 12 cm</option>
            <option value="large">Long — 16 cm</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

    </div>
  </div><!-- /setup-panel -->

  <?php include 'includes/library-panel.php'; ?>
  <?php include 'includes/canvas.php'; ?>
  <?php include 'includes/design-panel.php'; ?>

</div><!-- /builder -->

<?php include 'includes/modal-preview.php'; ?>
<?php include 'includes/modal-order.php'; ?>

<div class="toast" id="toast"></div>

<script>
  window.BUILDER_PRODUCT = <?= json_encode($productConfig) ?>;
</script>
<script type="module" src="./js/main.js"></script>
</body>
</html>