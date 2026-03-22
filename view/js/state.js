export class State {
  constructor(appInstance) {
    this.app         = appInstance;
    this.product     = 'bracelet';
    this.basePrice   = 80;
    this.maxBeads    = 20;
    this.strColor    = '#F9B8CF';
    this.strType     = 'Elastic';
    this.view        = 'silhouette';
    this.clasp       = 'none';
    this.elems       = [];
    this.selectedId  = null;
    this.ltrColor    = { bg: '#ffffff', text: '#333344' };
    this.letterShape = 'square'; // 'square' | 'round' — square is default like reference
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