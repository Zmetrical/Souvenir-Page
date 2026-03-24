<?php
$activePage   = 'bracelet';
$maxBeads     = 20;
$productLabel = 'Bracelet';
$productConfig = ['product' => 'bracelet', 'basePrice' => 80, 'maxBeads' => $maxBeads];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>ArtsyCrate — Bracelet Builder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="./css/style.css"/>
</head>
<body>

<?php include 'includes/topbar.php'; ?>

<div class="builder">

  <!-- ══ SETUP PANEL — bracelet-specific ════════════════════════════════════ -->
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
        Bracelet Setup
      </div>

      <div class="psec open" id="sec-string">
        <div class="psec-toggle" onclick="app.ui.toggleSec('sec-string')">
          <span class="psec-toggle-lbl">String &amp; Clasp</span>
          <svg class="psec-arr" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4"/></svg>
        </div>
        <div class="psec-body">

          <div class="slbl" style="margin-bottom:8px;">String Color</div>
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

          <div class="slbl" style="margin-bottom:8px;">String Type</div>
          <select class="sel" id="str-type" style="margin-bottom:14px;"
                  onchange="app.ui.setStrType(this.value)">
            <option value="Elastic">Elastic</option>
            <option value="Cord">Cord</option>
            <option value="Wire">Wire</option>
            <option value="Chain">Chain</option>
          </select>

          <div class="slbl" style="margin-bottom:8px;">Length</div>
          <select class="sel" id="length-sel" style="margin-bottom:14px;">
            <option value="small">Small — 16 cm</option>
            <option value="medium" selected>Medium — 18 cm</option>
            <option value="large">Large — 20 cm</option>
            <option value="custom">Custom</option>
          </select>

          <div class="slbl" style="margin-bottom:8px;">Clasp</div>
          <div class="cpills">
            <div class="cpill active" onclick="app.ui.setClasp('none',this)">None</div>
            <div class="cpill"        onclick="app.ui.setClasp('lobster',this)">Lobster</div>
            <div class="cpill"        onclick="app.ui.setClasp('toggle',this)">Toggle</div>
          </div>

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