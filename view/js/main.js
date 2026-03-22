import { BEADS, CHARMS, FIGURES } from './data.js';
import { State } from './state.js';
import { CanvasEngine } from './canvasengine.js';
import { UIController } from './uicontroller.js';

class App {
  constructor() {
    this.state = new State(this);
    this.canvasEngine = new CanvasEngine();
    this.ui = new UIController(this);

    // Kick off async init — preload figure images first, then build UI
    this._init();
  }

  async _init() {
    // 1. Preload all real figure images into the engine's cache
    await this.canvasEngine.preloadImages(FIGURES);

    // 2. Set imgUrl for figures from their imgSrc (used by library cards & inspector)
    FIGURES.forEach(el => {
      // Generate a proper canvas thumbnail now that the image is in cache
      el.imgUrl = this.canvasEngine.generateFigureThumb(el);
    });

    // 3. Generate canvas thumbnails for beads & charms (drawn shapes, sync)
    this.canvasEngine.generateThumbnails([...BEADS, ...CHARMS]);

    // 4. Build library grids
    this.ui.buildGrid('grid-beads',    BEADS);
    this.ui.buildGrid('grid-charms',   CHARMS);
    this.ui.buildGrid('grid-figures',  FIGURES, true); // true = is figures tab
    this.ui.buildLetters();

    // 5. First render
    this.render();
  }

  render() {
    const mainCanvas = document.getElementById('main-canvas');
    this.canvasEngine.draw(mainCanvas, this.state, true);
    this.ui.updateAll();
  }
}

window.app = new App();