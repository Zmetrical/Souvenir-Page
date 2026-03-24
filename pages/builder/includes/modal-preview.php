<div class="overlay" id="prev-modal">
  <div class="mbox">
    <div class="mhead teal">
      <div class="mtitle">( Design Preview )</div>
      <button class="mclose" onclick="app.ui.closeModal('prev-modal')">×</button>
    </div>
    <div class="mbody">
      <div class="prev-stage" id="prev-stage">
        <div class="design-export-wrap">
          <canvas id="preview-canvas" width="460" height="320"></canvas>
        </div>
      </div>
      <div class="minfo" id="prev-info"></div>
      <div class="mbtns">
        <button class="mbtn secondary" onclick="app.ui.closeModal('prev-modal')">← Edit</button>
        <button class="mbtn primary"   onclick="app.ui.downloadDesign()">⬇ Download PNG</button>
      </div>
    </div>
  </div>
</div>