import { BEADS, CHARMS, FIGURES, ELEM_MAP } from './Data.js';

export class UIController {
  constructor(appInstance) {
    this.app = appInstance;
    this.setupOpen = true;
    this.designOpen = true;
    this.toastTimer = null;
    this.setupListeners();
  }

  setupListeners() {
    const mainCanvas = document.getElementById('main-canvas');
    mainCanvas.addEventListener('click', (e) => this.handleCanvasClick(e, mainCanvas));

    // Close modals on overlay click
    document.querySelectorAll('.overlay').forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m) m.classList.remove('open');
      });
    });
  }

  handleCanvasClick(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);

    const state = this.app.state;
    if (!state.elems.length) return;
    
    const positions = this.app.canvasEngine.getPositions(state.product, state.elems.length);
    let hit = null;
    
    for (let i = state.elems.length - 1; i >= 0; i--) {
      const pos = positions[i];
      const R = (state.elems[i].small ? 14 : state.elems[i].large ? 28 : 22) + 6;
      if ((mx - pos.x) ** 2 + (my - pos.y) ** 2 <= R ** 2) { 
        hit = state.elems[i].uid; 
        break; 
      }
    }

    state.selectedId = (state.selectedId === hit) ? null : hit;
    this.updateInspector(state.elems.find(el => el.uid === state.selectedId) || null);
    this.app.render();
  }

  updateAll() {
    this.updateCounters();
    this.renderDesignList();
    this.updateHistoryButtons();
  }

  updateCounters() {
    const state = this.app.state;
    const ec = state.elems.reduce((s, e) => s + (e.price || 8), 0);
    document.getElementById('bead-ct').textContent = state.elems.length;
    document.getElementById('bead-max').textContent = state.maxBeads;
    document.getElementById('price-disp').textContent = `₱${state.basePrice + ec}`;
    
    const emptyOver = document.getElementById('empty-over');
    if (emptyOver) emptyOver.style.display = state.elems.length ? 'none' : 'flex';
  }

  updateHistoryButtons() {
    const state = this.app.state;
    document.getElementById('btn-undo').disabled = !state.history.length;
    document.getElementById('btn-redo').disabled = !state.future.length;
  }

  // --- COMPONENT ACTIONS ---
  addElement(id) {
    const item = ELEM_MAP[id];
    if (!item) return;
    if (this.app.state.elems.length >= this.app.state.maxBeads) { 
      this.showToast('Max elements reached!'); 
      return; 
    }
    this.app.state.pushHistory();
    this.app.state.elems.push({ uid: this.app.state.generateId(), ...item });
    this.app.render(); 
    this.showToast(`Added ${item.name}`);
  }

  addLetter(ch) {
    if (this.app.state.elems.length >= this.app.state.maxBeads) { 
      this.showToast('Max elements reached!'); 
      return; 
    }
    this.app.state.pushHistory();
    
    const letterEl = {
      uid: this.app.state.generateId(), 
      id: 'letter_' + ch, 
      name: 'Letter ' + ch, 
      isLetter: true,
      ltrBg: this.app.state.ltrColor.bg, 
      ltrText: this.app.state.ltrColor.text, 
      label: ch,
      price: 8, 
      stock: 'in', 
      category: 'letters'
    };
    
    // Generate thumb dynamically for this specific color/letter combo
    letterEl.imgUrl = this.app.canvasEngine.createSingleThumb(letterEl);
    
    this.app.state.elems.push(letterEl);
    this.app.render();
  }

  removeBead(uid) {
    this.app.state.pushHistory();
    this.app.state.elems = this.app.state.elems.filter(e => e.uid !== uid);
    if (this.app.state.selectedId === uid) { 
      this.app.state.selectedId = null; 
      this.updateInspector(null); 
    }
    this.app.render();
  }

  dupeBead(uid) {
    if (this.app.state.elems.length >= this.app.state.maxBeads) { 
      this.showToast('Max elements reached!'); 
      return; 
    }
    const idx = this.app.state.elems.findIndex(e => e.uid === uid);
    if (idx < 0) return;
    this.app.state.pushHistory();
    this.app.state.elems.splice(idx + 1, 0, { ...this.app.state.elems[idx], uid: this.app.state.generateId() });
    this.app.render(); 
    this.showToast('Duplicated!');
  }

  moveElem(uid, dir, ev) {
    if (ev) ev.stopPropagation();
    const state = this.app.state;
    const idx = state.elems.findIndex(e => e.uid === uid);
    const to = idx + dir;
    if (to < 0 || to >= state.elems.length) return;
    state.pushHistory();
    [state.elems[idx], state.elems[to]] = [state.elems[to], state.elems[idx]];
    this.app.render();
  }

  selectBead(uid) {
    this.app.state.selectedId = this.app.state.selectedId === uid ? null : uid;
    this.updateInspector(this.app.state.elems.find(e => e.uid === uid) || null);
    this.app.render();
  }

  // --- RENDER DOM LISTS ---
  renderDesignList() {
    const state = this.app.state;
    const list = document.getElementById('design-list');
    const foot = document.getElementById('design-foot');
    document.getElementById('elem-count-badge').textContent = state.elems.length;

    if (!state.elems.length) {
      list.innerHTML = `<div class="dempty"><div class="dempty-icon">✽</div>No elements yet.<br>Pick from the library →</div>`;
      foot.style.display = 'none'; 
      return;
    }

    list.innerHTML = state.elems.map((el, i) => `
      <div class="ditem${state.selectedId === el.uid ? ' selected' : ''}" onclick="app.ui.selectBead('${el.uid}')">
        <span class="di-num">${i + 1}</span>
        <div class="di-thumb"><img src="${el.imgUrl}"/></div>
        <span class="di-name" title="${el.name}">${el.name}</span>
        <span class="di-price">₱${el.price || 8}</span>
        <div class="di-actions">
          <button class="di-btn" onclick="app.ui.moveElem('${el.uid}', -1, event)">↑</button>
          <button class="di-btn" onclick="app.ui.moveElem('${el.uid}', 1, event)">↓</button>
          <button class="di-btn del" onclick="event.stopPropagation(); app.ui.removeBead('${el.uid}')">×</button>
        </div>
      </div>`).join('');

    const ec = state.elems.reduce((s, e) => s + (e.price || 8), 0);
    foot.style.display = 'block';
    foot.innerHTML = `
      <div class="dfoot-row"><span>${state.elems.length} elements</span><span>₱${ec}</span></div>
      <div class="dfoot-row"><span>Base (${state.product})</span><span>₱${state.basePrice}</span></div>
      <div class="dfoot-total"><span>Total Est.</span><span style="color:var(--ink)">₱${state.basePrice + ec}</span></div>`;
  }

  buildGrid(gridId, items) {
    document.getElementById(gridId).innerHTML = items.map(item => `
      <div class="ecard${item.stock === 'out' ? ' out' : ''}" onclick="${item.stock !== 'out' ? `app.ui.addElement('${item.id}')` : ''}" title="${item.name}">
        <div class="eprev-img"><img src="${item.imgUrl}" alt="${item.name}"/></div>
        <div class="ename">${item.name}</div>
        <span class="sbd s-${item.stock}">${item.stock === 'in' ? '✓ In' : item.stock === 'low' ? 'Low' : 'Out'}</span>
      </div>`).join('');
  }

  buildLetters() {
    const state = this.app.state;
    document.getElementById('grid-ltrs').innerHTML = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'].map(ch => `
      <div class="lbtn" onclick="app.ui.addLetter('${ch}')" style="background:${state.ltrColor.bg};color:${state.ltrColor.text};">${ch}</div>`).join('');
  }

  updateInspector(el) {
    const b = document.getElementById('insp-body');
    if (!el) { 
      b.innerHTML = '<div class="insp-empty">Click any element on the canvas to edit</div>'; 
      return; 
    }
    b.innerHTML = `
      <div class="insp-content">
        <div class="insp-top">
          <div class="insp-thumb"><img src="${el.imgUrl}"/></div>
          <div class="insp-name">${el.name}</div>
          <span class="insp-price-badge">₱${el.price || 8}</span>
        </div>
        <div class="insp-meta">
          <span class="insp-tag">${el.category || 'bead'}</span>
          <span class="insp-tag sbd s-${el.stock}">${el.stock === 'in' ? 'In Stock' : el.stock === 'low' ? 'Low' : 'Out'}</span>
        </div>
        <div class="ibtns">
          <div class="ibtn teal" onclick="app.ui.dupeBead('${el.uid}')">⊕ Dupe</div>
          <div class="ibtn danger" onclick="app.ui.removeBead('${el.uid}')">× Remove</div>
        </div>
      </div>`;
  }

  // --- CONFIG TOGGLERS ---
  setProduct(el) { 
    this.app.state.product = el.dataset.prod; 
    this.app.state.basePrice = +el.dataset.price; 
    this.app.state.maxBeads = +el.dataset.max; 
    document.querySelectorAll('.tpill').forEach(p => p.classList.remove('active')); 
    el.classList.add('active'); 
    this.app.render(); 
  }
  setStrCol(col, el) { 
    this.app.state.strColor = col; 
    document.querySelectorAll('#str-sw .sw').forEach(s => s.classList.remove('active')); 
    el.classList.add('active'); 
    this.app.render(); 
  }
  setStrType(type) { 
    this.app.state.strType = type; 
    this.app.render(); 
  }
  setLtrCol(bg, text, el) { 
    this.app.state.ltrColor = { bg, text }; 
    document.querySelectorAll('#ltr-sw .sw').forEach(s => s.classList.remove('active')); 
    el.classList.add('active'); 
    this.buildLetters(); 
  }
  setClasp(c, el) { 
    this.app.state.clasp = c; 
    document.querySelectorAll('.cpill').forEach(p => p.classList.remove('active')); 
    el.classList.add('active'); 
    this.app.render(); 
  }
  setView(v) { 
    this.app.state.view = v; 
    document.getElementById('vt-sil').classList.toggle('active', v === 'silhouette'); 
    document.getElementById('vt-flat').classList.toggle('active', v === 'flatlay'); 
    document.getElementById('canvas-surface').classList.toggle('show', v === 'flatlay');
    this.app.render(); 
  }

  toggleSetup() { 
    this.setupOpen = !this.setupOpen; 
    document.getElementById('setup-panel').classList.toggle('collapsed', !this.setupOpen); 
  }
  toggleDesign() { 
    this.designOpen = !this.designOpen; 
    document.getElementById('design-panel').classList.toggle('collapsed', !this.designOpen); 
  }
  toggleSec(id) { 
    document.getElementById(id).classList.toggle('open'); 
  }
  
  switchTab(el) { 
    const tab = el.dataset.tab; 
    ['beads','charms','figures','letters'].forEach(t => { 
      const el2 = document.getElementById('tab-' + t); 
      if(el2) el2.style.display = t === tab ? 'flex' : 'none'; 
    }); 
    document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active')); 
    el.classList.add('active'); 
  }

  filterLib(input) {
    const q = input.value.toLowerCase();
    input.closest('[id^="tab-"]').querySelectorAll('.ecard').forEach(c => {
      c.style.display = c.querySelector('.ename').textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  // --- EXPORT & MODALS ---
  renderToCanvas(targetCanvas, W, H) {
    targetCanvas.width = W; 
    targetCanvas.height = H;
    const ctx = targetCanvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillRect(0, 0, W, H);
    
    // Temporarily disable interactive hover states for clean export
    const previousSelection = this.app.state.selectedId;
    this.app.state.selectedId = null;
    this.app.canvasEngine.draw(targetCanvas, this.app.state, false);
    this.app.state.selectedId = previousSelection;
  }

  exportDesign() {
    if (!this.app.state.elems.length) { this.showToast('Add some elements first!'); return; }
    const ec = document.createElement('canvas'); 
    this.renderToCanvas(ec, 680, 480);
    const link = document.createElement('a'); 
    link.download = `artsycrate-design-${Date.now()}.png`; 
    link.href = ec.toDataURL('image/png'); 
    link.click(); 
    this.showToast('Design exported!');
  }

  downloadDesign() {
    const ec = document.createElement('canvas'); 
    this.renderToCanvas(ec, 680, 480);
    const link = document.createElement('a'); 
    link.download = `artsycrate-design-${Date.now()}.png`; 
    link.href = ec.toDataURL('image/png'); 
    link.click(); 
    this.showToast('Downloaded!');
  }

  openPreview() {
    const state = this.app.state;
    const ec = state.elems.reduce((s, e) => s + (e.price || 8), 0);
    const lenVal = document.getElementById('length-sel').value;
    const lenMap = { small: '16cm', medium: '18cm', large: '20cm', custom: 'Custom' };
    const prodMap = { bracelet: 'Bracelet', necklace: 'Necklace', keychain: 'Keychain' };

    document.getElementById('prev-info').innerHTML = `
      <div class="mic"><div class="mic-l">Product</div><div class="mic-v">${prodMap[state.product]}</div></div>
      <div class="mic"><div class="mic-l">Elements</div><div class="mic-v">${state.elems.length}</div></div>
      <div class="mic"><div class="mic-l">Length</div><div class="mic-v">${lenMap[lenVal]}</div></div>
      <div class="mic"><div class="mic-l">Est. Price</div><div class="mic-v" style="color:var(--pink-dk)">₱${state.basePrice + ec}</div></div>`;

    document.getElementById('prev-modal').classList.add('open');
    this.renderToCanvas(document.getElementById('preview-canvas'), 460, 320);
  }

  openOrder() {
    const state = this.app.state;
    const ec = state.elems.reduce((s, e) => s + (e.price || 8), 0);
    const lenVal = document.getElementById('length-sel').value;
    const lenMap = { small: '16cm', medium: '18cm', large: '20cm', custom: 'Custom' };
    const prodMap = { bracelet: 'Bracelet', necklace: 'Necklace', keychain: 'Keychain' };
    
    document.getElementById('os-prod').textContent = `${prodMap[state.product]} · ${lenMap[lenVal]}`;
    document.getElementById('os-base').textContent = `₱${state.basePrice}`;
    document.getElementById('os-elems').textContent = `${state.elems.length} elements`;
    document.getElementById('os-ecost').textContent = `₱${ec}`;
    document.getElementById('os-total').textContent = `₱${state.basePrice + ec}.00`;
    document.getElementById('order-modal').classList.add('open');

    if (state.elems.length) {
      document.getElementById('order-design-thumb').style.display = 'block';
      this.renderToCanvas(document.getElementById('order-canvas'), 300, 140);
    }
  }

  closeModal(id) { 
    document.getElementById(id).classList.remove('open'); 
  }
  
  submitOrder() { 
    this.showToast('Order submitted! We will message you soon.'); 
    this.closeModal('order-modal'); 
  }

  showToast(msg) { 
    const t = document.getElementById('toast'); 
    t.textContent = msg; 
    t.classList.add('show'); 
    clearTimeout(this.toastTimer); 
    this.toastTimer = setTimeout(() => t.classList.remove('show'), 2600); 
  }
}