import { BEADS, CHARMS, FIGURES } from './data.js';
import { State } from './state.js';
import { CanvasEngine } from './canvasengine.js';
import { UIController } from './uicontroller.js';

class App {
  constructor() {
    // 1. Initialize isolated modules
    this.state = new State(this);
    this.canvasEngine = new CanvasEngine();
    this.ui = new UIController(this);
    
    // 2. Start the application
    this.init();
  }

  init() {
    // Generate base64 thumbnail images for the library dynamically
    this.canvasEngine.generateThumbnails([...BEADS, ...CHARMS, ...FIGURES]);
    
    // Build the UI Library Grids using the data that now has thumbnails
    this.ui.buildGrid('grid-beads', BEADS);
    this.ui.buildGrid('grid-charms', CHARMS);
    this.ui.buildGrid('grid-figures', FIGURES);
    this.ui.buildLetters();
    
    // Perform initial draw
    this.render();
  }

  // The master render pipeline that syncs Canvas and UI based on State
  render() {
    const mainCanvas = document.getElementById('main-canvas');
    this.canvasEngine.draw(mainCanvas, this.state, true);
    this.ui.updateAll();
  }
}

// Expose the app to the window globally
// This is required so inline HTML onclicks like `onclick="app.ui.openOrder()"` work.
window.app = new App();