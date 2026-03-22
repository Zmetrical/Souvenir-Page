import { BEADS, FIGURES, CHARMS } from './data/index.js';
import { State } from './state.js';
import { CanvasEngine } from './canvas/canvasengine.js';
import { UIController } from './uicontroller.js';

class App {
  constructor() {
    this.state = new State(this);
    this.canvasEngine = new CanvasEngine();
    this.ui = new UIController(this);
    this._init();
  }

  async _init() {
    // 1. Preload real images (CHARMS are image-based)
    await this.canvasEngine.preloadImages(CHARMS);

    // 2. Generate thumbnails for image-based charms
    CHARMS.forEach(el => {
      if (el.useImg) el.imgUrl = this.canvasEngine.generateFigureThumb(el);
    });

    // 3. Generate canvas thumbnails for beads + shaped figures
    this.canvasEngine.generateThumbnails([...BEADS, ...FIGURES]);

    // 4. Build library panels
    this.ui.buildBeadsPanel(BEADS);
    this.ui.buildFiguresGrid(FIGURES);   // Figures tab — shaped decorative charms
    this.ui.buildCharmsGrid(CHARMS);     // Charms tab — image-based series
    this.ui.buildLetters();

    // 5. First render
    this.render();
  }

  render() {
    const mainCanvas = document.getElementById('main-canvas');
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const W = 680, H = 480;
    if (mainCanvas.width !== W * dpr || mainCanvas.height !== H * dpr) {
      mainCanvas.width  = W * dpr;
      mainCanvas.height = H * dpr;
      mainCanvas.style.width  = W + 'px';
      mainCanvas.style.height = H + 'px';
      const ctx = mainCanvas.getContext('2d');
      ctx.scale(dpr, dpr);
    }
    this.canvasEngine.draw(mainCanvas, this.state, true);
    this.ui.updateAll();
  }
}

window.app = new App();