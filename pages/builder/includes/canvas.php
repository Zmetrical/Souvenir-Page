<div class="canvas-area" id="canvas-area">
  <div class="canvas-bg"></div>
  <div class="canvas-surface" id="canvas-surface"></div>

  <!-- Top-left: view toggle -->
  <div class="canvas-float top-left">
    <div class="view-grp">
      <button class="vtbtn active" id="vt-sil" onclick="app.ui.setView('silhouette')">Arc View</button>
      <button class="vtbtn"        id="vt-flat" onclick="app.ui.setView('flatlay')">Grid Lay</button>
    </div>
  </div>

  <!-- Top-right: preview -->
  <div class="canvas-float top-right">
    <button class="tbtn t-lime" onclick="app.ui.openPreview()">[ Preview ]</button>
  </div>

  <!-- Bottom-left: undo / redo -->
  <div class="canvas-float bottom-left">
    <button class="tbtn" id="btn-undo" onclick="app.state.undo()" disabled>← Undo</button>
    <button class="tbtn" id="btn-redo" onclick="app.state.redo()" disabled>Redo →</button>
  </div>

  <canvas id="main-canvas" width="680" height="480"
          style="position:relative;z-index:2;cursor:pointer;"></canvas>
</div>