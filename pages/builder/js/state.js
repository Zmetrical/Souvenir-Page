export class State {
  constructor(appInstance) {
    this.app = appInstance;

    // ── Per-page product config injected by each HTML before main.js loads ──
    const cfg = window.BUILDER_PRODUCT || {};
    this.product    = cfg.product   || 'bracelet';
    this.basePrice  = cfg.basePrice || 80;
    this.maxBeads   = cfg.maxBeads  || 20;

    // ── Keychain-specific ───────────────────────────────────────────────────
    this.keychainStrands = 1;   // 1 | 2 | 3
    this.activeStrand    = 0;   // which strand new elements are added to
    this.ringType        = 'ring'; // 'ring' | 'heart' | 'carabiner' | 'ballchain'
    this.ringColor       = '#F7A8C8'; // connector colour (keychain only)

    this.strColor    = '#F9B8CF';
    this.strType     = 'Elastic';
    this.view        = 'silhouette';
    this.clasp       = 'none';
    this.elems       = [];
    this.selectedId  = null;
    this.ltrColor    = { bg: '#ffffff', text: '#333344' };
    this.letterShape = 'square';
    this.addDirection = 'right';
    this.history     = [];
    this.future      = [];
    this.uidCounter  = 0;
  }

  generateId() { return 'u' + (++this.uidCounter); }

  pushHistory() {
    this.history.push(JSON.stringify(this.elems));
    this.future = [];
    this.app.ui.updateHistoryButtons();
  }

  undo() {
    if (!this.history.length) return;
    this.future.push(JSON.stringify(this.elems));
    this.elems = JSON.parse(this.history.pop());
    this.selectedId = null;
    this.app.ui.updateInspector(null);
    this.app.render();
    this.app.ui.updateHistoryButtons();
  }

  redo() {
    if (!this.future.length) return;
    this.history.push(JSON.stringify(this.elems));
    this.elems = JSON.parse(this.future.pop());
    this.app.render();
    this.app.ui.updateHistoryButtons();
  }

  clearAll() {
    if (!this.elems.length) return;
    this.pushHistory();
    this.elems = [];
    this.selectedId = null;
    this.app.ui.updateInspector(null);
    this.app.render();
    this.app.ui.showToast('Canvas cleared');
  }
}