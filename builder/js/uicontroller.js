import { BEADS, FIGURES, CHARMS, ELEM_MAP } from './data/index.js';

export class UIController {
  constructor(appInstance) {
    this.app = appInstance;
    this.toastTimer = null;

    this.isDragging = false;
    this.draggedUid = null;
    this.dragStartIndex = -1;
    this.dragInitialState = null;

    // design-list panel drag-and-drop
    this.listDragSrcIdx = -1;

    this.setupListeners();
  }

  setupListeners() {
    const mainCanvas = document.getElementById('main-canvas');
    mainCanvas.addEventListener('mousedown', (e) => this.handleDragStart(e, mainCanvas));
    mainCanvas.addEventListener('mousemove', (e) => this.handleDragMove(e, mainCanvas));
    window.addEventListener('mouseup', (e) => this.handleDragEnd(e));

    document.querySelectorAll('.overlay').forEach(m => {
      m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
    });
  }

  handleDragStart(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const state = this.app.state;
    if (!state.elems.length) return;

    const positions = this.app.canvasEngine.getPositions(state);
    let hit = null;

    for (let i = state.elems.length - 1; i >= 0; i--) {
      const pos = positions[i];
      const el  = state.elems[i];
      let hx, hy, R;
      if (el.useImg) {
        hx = pos.x; hy = pos.y; R = 14;
      } else {
        hx = pos.x; hy = pos.y; R = (el.small ? 14 : el.large ? 28 : 22) + 6;
      }
      if ((mx - hx) ** 2 + (my - hy) ** 2 <= R ** 2) { hit = el.uid; break; }
    }

    if (hit) {
      this.dragInitialState = JSON.stringify(state.elems);
      this.isDragging = true;
      this.draggedUid = hit;
      this.dragStartIndex = state.elems.findIndex(el => el.uid === hit);
      state.selectedId = hit;
      // Auto-switch active strand when tapping an element on keychain
      const hitEl = state.elems[this.dragStartIndex];
      if (state.product === 'keychain' && hitEl?.strand != null) {
        state.activeStrand = hitEl.strand;
      }
      canvas.style.cursor = 'grabbing';
      this.updateInspector(state.elems[this.dragStartIndex]);
      this.app.render();
    } else {
      state.selectedId = null;
      this.updateInspector(null);
      this.app.render();
    }
  }

  handleDragMove(e, canvas) {
    if (!this.isDragging || !this.draggedUid) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const state = this.app.state;
    const positions = this.app.canvasEngine.getPositions(state);
    let closestIdx = -1, minDist = Infinity;

    for (let i = 0; i < positions.length; i++) {
      const dist = (mx - positions[i].x) ** 2 + (my - positions[i].y) ** 2;
      if (dist < minDist) { minDist = dist; closestIdx = i; }
    }

    const currIdx = state.elems.findIndex(el => el.uid === this.draggedUid);
    if (closestIdx !== -1 && closestIdx !== currIdx) {
      const [movedItem] = state.elems.splice(currIdx, 1);
      state.elems.splice(closestIdx, 0, movedItem);
      this.app.render();
    }
  }

  handleDragEnd(e) {
    if (this.isDragging) {
      document.getElementById('main-canvas').style.cursor = 'pointer';
      const state = this.app.state;
      const finalIdx = state.elems.findIndex(el => el.uid === this.draggedUid);
      if (finalIdx !== this.dragStartIndex && finalIdx !== -1) {
        state.history.push(this.dragInitialState);
        state.future = [];
        this.updateHistoryButtons();
      }
      this.isDragging = false;
      this.draggedUid = null;
    }
  }

  _getStrandBeadCount(strandIdx) {
    return this.app.state.elems.filter(e => (e.strand ?? 0) === strandIdx).length;
  }

  updateAll() {
    this.updateCounters();
    this.renderDesignList();
    this.updateHistoryButtons();
  }

  updateCounters() {
    const state = this.app.state;
    const beadCt  = document.getElementById('bead-ct');
    const beadMax = document.getElementById('bead-max');

    if (state.product === 'keychain' && state.keychainStrands > 1) {
      // Show count for the active strand
      const cnt = this._getStrandBeadCount(state.activeStrand);
      if (beadCt)  beadCt.textContent  = `S${state.activeStrand + 1}: ${cnt}`;
      if (beadMax) beadMax.textContent = state.maxBeads;
    } else {
      if (beadCt)  beadCt.textContent  = state.elems.length;
      if (beadMax) beadMax.textContent = state.maxBeads;
    }

    const emptyOver = document.getElementById('empty-over');
    if (emptyOver) emptyOver.style.display = state.elems.length ? 'none' : 'flex';
  }

  updateHistoryButtons() {
    const state = this.app.state;
    document.getElementById('btn-undo').disabled = !state.history.length;
    document.getElementById('btn-redo').disabled = !state.future.length;
  }

  addElement(id) {
    const item = ELEM_MAP[id];
    if (!item) return;
    const state = this.app.state;

    // Per-strand max for keychain, global max for others
    if (state.product === 'keychain') {
      const strandCount = this._getStrandBeadCount(state.activeStrand);
      if (strandCount >= state.maxBeads) { this.showToast(`Strand ${state.activeStrand + 1} is full!`); return; }
    } else {
      if (state.elems.length >= state.maxBeads) { this.showToast('Max elements reached!'); return; }
    }

    state.pushHistory();

    const newEl = { uid: state.generateId(), ...item };
    if (state.product === 'keychain') {
      newEl.strand = state.activeStrand;
    }

    const selectedIdx = state.elems.findIndex(e => e.uid === state.selectedId);
    const selEl = state.elems[selectedIdx];
    if (selectedIdx !== -1 && state.product === 'keychain' && (selEl?.strand ?? 0) === newEl.strand) {
      state.elems.splice(selectedIdx + 1, 0, newEl);
    } else if (selectedIdx !== -1 && state.product !== 'keychain') {
      state.elems.splice(selectedIdx + 1, 0, newEl);
    } else {
      state.elems.push(newEl);
    }

    state.selectedId = newEl.uid;
    this.updateInspector(newEl);
    this.app.render();
    this.showToast(`Added ${item.name}`);
  }

  addLetter(ch) {
    const state = this.app.state;

    if (state.product === 'keychain') {
      if (this._getStrandBeadCount(state.activeStrand) >= state.maxBeads) {
        this.showToast(`Strand ${state.activeStrand + 1} is full!`); return;
      }
    } else {
      if (state.elems.length >= state.maxBeads) { this.showToast('Max elements reached!'); return; }
    }

    state.pushHistory();

    const letterEl = {
      uid: state.generateId(),
      id: 'letter_' + ch,
      name: 'Letter ' + ch,
      isLetter: true,
      letterShape: state.letterShape || 'round',
      ltrBg:   state.ltrColor.bg,
      ltrText: state.ltrColor.text,
      label: ch,
      price: 8, stock: 'in', category: 'letters',
      strand: state.product === 'keychain' ? state.activeStrand : undefined,
    };

    letterEl.imgUrl = this.app.canvasEngine.createSingleThumb(letterEl);
    const selectedIdx = state.elems.findIndex(e => e.uid === state.selectedId);
    const selEl = state.elems[selectedIdx];
    if (selectedIdx !== -1 && state.product === 'keychain' && (selEl?.strand ?? 0) === letterEl.strand) {
      state.elems.splice(selectedIdx + 1, 0, letterEl);
    } else if (selectedIdx !== -1 && state.product !== 'keychain') {
      state.elems.splice(selectedIdx + 1, 0, letterEl);
    } else {
      state.elems.push(letterEl);
    }

    state.selectedId = letterEl.uid;
    this.updateInspector(letterEl);
    this.app.render();
  }

  setAddDir(dir, btnEl) {
    this.app.state.addDirection = dir;
    document.querySelectorAll('.dir-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  removeBead(uid) {
    this.app.state.pushHistory();
    this.app.state.elems = this.app.state.elems.filter(e => e.uid !== uid);
    if (this.app.state.selectedId === uid) { this.app.state.selectedId = null; this.updateInspector(null); }
    this.app.render();
  }

  dupeBead(uid) {
    if (this.app.state.elems.length >= this.app.state.maxBeads) { this.showToast('Max elements reached!'); return; }
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
    const el = this.app.state.elems.find(e => e.uid === uid);
    if (el && this.app.state.product === 'keychain' && el.strand != null) {
      this.app.state.activeStrand = el.strand;
    }
    this.updateInspector(el || null);
    this.app.render();
  }

  renderDesignList() {
    const state = this.app.state;
    const list  = document.getElementById('design-list');

    // ── Strand selector (keychain only, 2+ strands) ───────────────────────
    const selectorWrap = document.getElementById('strand-selector-panel');
    if (selectorWrap) {
      if (state.product === 'keychain' && state.keychainStrands > 1) {
        selectorWrap.style.display = 'block';
        const btns = document.getElementById('strand-selector-btns');
        if (btns) {
          btns.innerHTML = Array.from({ length: state.keychainStrands }, (_, i) => {
            const cnt = this._getStrandBeadCount(i);
            return `<button class="cpill active-strand-btn${state.activeStrand === i ? ' active' : ''}"
                            onclick="app.ui.setActiveStrand(${i}, this)">
                      Strand ${i + 1}
                      <span style="opacity:.6;font-weight:600;margin-left:3px;">${cnt}/${state.maxBeads}</span>
                    </button>`;
          }).join('');
        }
      } else {
        selectorWrap.style.display = 'none';
      }
    }

    // ── Filter elements by active strand for keychain ─────────────────────
    const visibleElems = (state.product === 'keychain')
      ? state.elems.filter(el => (el.strand ?? 0) === state.activeStrand)
      : state.elems;

    document.getElementById('elem-count-badge').textContent =
      state.product === 'keychain'
        ? `${visibleElems.length}/${state.maxBeads}`
        : state.elems.length;

    if (!visibleElems.length) {
      list.innerHTML = `<div class="dempty">
        <div class="dempty-icon">✽</div>
        ${state.product === 'keychain' && state.keychainStrands > 1
          ? `No elements on Strand ${state.activeStrand + 1} yet.`
          : 'No elements yet.'
        }<br>Pick from the library ←
      </div>`;
      return;
    }

    list.innerHTML = visibleElems.map((el, i) => `
      <div class="ditem${state.selectedId === el.uid ? ' selected' : ''}"
           data-uid="${el.uid}"
           data-globalidx="${state.elems.indexOf(el)}"
           draggable="true"
           onclick="app.ui.selectBead('${el.uid}')">
        <span class="di-num">${i + 1}</span>
        <div class="di-thumb${el.useImg ? ' figure' : ''}"><img src="${el.imgUrl}"/></div>
        <span class="di-name" title="${el.name}">${el.name}</span>
        <span class="di-price">₱${el.price || 8}</span>
        <div class="di-actions">
          <button class="di-btn" onclick="app.ui.moveElem('${el.uid}', -1, event)">↑</button>
          <button class="di-btn" onclick="app.ui.moveElem('${el.uid}', 1, event)">↓</button>
          <button class="di-btn del" onclick="event.stopPropagation(); app.ui.removeBead('${el.uid}')">×</button>
        </div>
      </div>`).join('');

    // ── Drag-and-drop (uses uid so it works on filtered lists) ────────────
    list.querySelectorAll('.ditem').forEach(row => {
      row.addEventListener('dragstart', e => {
        this.listDragSrcUid = row.dataset.uid;
        this.app.state.pushHistory();
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      row.addEventListener('dragend', () => {
        list.querySelectorAll('.ditem').forEach(r => r.classList.remove('dragging', 'drag-over'));
      });
      row.addEventListener('dragover', e => {
        e.preventDefault();
        list.querySelectorAll('.ditem').forEach(r => r.classList.remove('drag-over'));
        row.classList.add('drag-over');
      });
      row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
      row.addEventListener('drop', e => {
        e.preventDefault(); e.stopPropagation();
        if (row.dataset.uid === this.listDragSrcUid) return;
        const elems   = this.app.state.elems;
        const srcIdx  = elems.findIndex(el => el.uid === this.listDragSrcUid);
        const destIdx = elems.findIndex(el => el.uid === row.dataset.uid);
        if (srcIdx === -1 || destIdx === -1) return;
        const [moved] = elems.splice(srcIdx, 1);
        elems.splice(destIdx, 0, moved);
        this.app.render();
        this.showToast('Reordered ✓');
      });
    });
  }

  // Figures tab — compact: scrollable type pills + color swatches for active type
  // ── Figure sections state ────────────────────────────────────────────────
  // Each section key: { open: bool, activeGroup: string }
  // Sections are defined here — add more objects to grow the Figures tab.
  // ── Figures tab ─────────────────────────────────────────────────────────
  // Sections are defined in _getFigureSections().
  // Each section reuses the existing .bgroup accordion classes from the Beads/Charms tabs.
  // To add a new section (e.g. Pendants): push one object into the array below.

  _getFigureSections(items) {
    if (this._figureSections) return this._figureSections;

    const cubeItems = items.filter(i => i.category === 'figures');
    const cubeGroups = {};
    cubeItems.forEach(item => {
      const g = item.group || 'Other';
      if (!cubeGroups[g]) cubeGroups[g] = [];
      cubeGroups[g].push(item);
    });

    this._figureSections = [
      {
        key:         'cubes',
        label:       'Cube',
        open:        true,
        groups:      cubeGroups,
        activeGroup: Object.keys(cubeGroups)[0] || '',
      },
      // Add future sections here, e.g.:
      // { key: 'pendants', label: 'Pendant', open: false, groups: {}, activeGroup: '' },
    ];
    return this._figureSections;
  }

  buildFiguresGrid(items) {
    const container = document.getElementById('grid-figures');
    if (!container) return;

    container.style.cssText = 'overflow-y:auto;overflow-x:hidden;flex:1;min-height:0;padding:7px 8px;display:flex;flex-direction:column;gap:5px;';

    const sections = this._getFigureSections(items);

    container.innerHTML = sections.map((sec, idx) => {
      const groupNames  = Object.keys(sec.groups);
      const firstItem   = (sec.groups[groupNames[0]] || [])[0];
      const swatchesHtml = this._buildFigureSwatches(sec);

      return `
        <div class="bgroup${sec.open ? ' open' : ''}" data-fig-key="${sec.key}">
          <div class="bgroup-head" onclick="app.ui.toggleFigureSection('${sec.key}')">
            <div class="bgroup-head-l">
              ${firstItem ? `<img class="bgroup-preview" src="${firstItem.imgUrl}" alt="${sec.label}"/>` : ''}
              <span class="bgroup-lbl">${sec.label}</span>
            </div>
            <div class="bgroup-head-r">
              <svg class="bgroup-arr" viewBox="0 0 10 10"><polyline points="2,3 5,7 8,3"/></svg>
            </div>
          </div>
          <div class="bgroup-body">
            <!-- Type pills -->
            <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
              ${groupNames.map(name => {
                const short  = name.replace(' Cubes','').replace(' Cube','');
                const active = name === sec.activeGroup;
                return `<button
                  class="cpill fig-type-pill${active ? ' active' : ''}"
                  data-section="${sec.key}"
                  data-group="${name}"
                  onclick="app.ui.setFigureType('${sec.key}','${name}')">
                  ${short}
                </button>`;
              }).join('')}
            </div>
            <!-- Color swatches -->
            <div class="bgroup-swatches fig-swatches" data-section="${sec.key}">
              ${swatchesHtml}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  _buildFigureSwatches(sec) {
    return (sec.groups[sec.activeGroup] || []).map(item => `
      <div class="bswatch${item.stock === 'out' ? ' out' : ''}"
           onclick="${item.stock !== 'out' ? `app.ui.addElement('${item.id}')` : ''}"
           title="${item.name}"
           style="width:34px;height:34px;border-radius:6px;">
        <img src="${item.imgUrl}" alt="${item.name}" style="border-radius:4px;"/>
        ${item.stock === 'low' ? '<span class="bswatch-low">!</span>' : ''}
      </div>`).join('');
  }

  toggleFigureSection(key) {
    const sec = (this._figureSections || []).find(s => s.key === key);
    if (!sec) return;
    sec.open = !sec.open;
    const el = document.querySelector(`.bgroup[data-fig-key="${key}"]`);
    if (el) el.classList.toggle('open', sec.open);
  }

  setFigureType(sectionKey, groupName) {
    const sec = (this._figureSections || []).find(s => s.key === sectionKey);
    if (!sec) return;
    sec.activeGroup = groupName;

    // Update pill active state using existing .cpill.active class
    document.querySelectorAll(`.fig-type-pill[data-section="${sectionKey}"]`).forEach(b => {
      b.classList.toggle('active', b.dataset.group === groupName);
    });

    // Re-render swatches
    const swatchEl = document.querySelector(`.fig-swatches[data-section="${sectionKey}"]`);
    if (swatchEl) swatchEl.innerHTML = this._buildFigureSwatches(sec);
  }

  // Charms tab — image-based series grouped in accordions
  buildCharmsGrid(items) {
    const container = document.getElementById('grid-charms');
    if (!container) return;

    const groups = {};
    items.forEach(item => {
      const g = item.series || 'Other';
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });

    container.style.cssText = 'overflow-y:auto;flex:1;padding:8px;display:flex;flex-direction:column;gap:5px;';
    container.innerHTML = Object.entries(groups).map(([seriesName, figs], idx) => `
      <div class="bgroup${idx === 0 ? ' open' : ''}">
        <div class="bgroup-head" onclick="this.closest('.bgroup').classList.toggle('open')">
          <div class="bgroup-head-l">
            <img class="bgroup-preview" src="${figs[0].imgUrl}" alt="${seriesName}" style="border-radius:6px;"/>
            <span class="bgroup-lbl">${seriesName}</span>
          </div>
          <div class="bgroup-head-r">
            <span class="bgroup-price">₱${figs[0].price}</span>
            <svg class="bgroup-arr" viewBox="0 0 10 10"><polyline points="2,3 5,7 8,3"/></svg>
          </div>
        </div>
        <div class="bgroup-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            ${figs.map(item => `
              <div class="ecard figure${item.stock === 'out' ? ' out' : ''}"
                   onclick="${item.stock !== 'out' ? `app.ui.addElement('${item.id}')` : ''}"
                   title="${item.name}">
                <div class="eprev-img" style="width:64px;height:64px;">
                  <img src="${item.imgUrl}" alt="${item.name}"/>
                </div>
                <div class="ename">${item.name}</div>
                <span class="sbd s-${item.stock}">${item.stock === 'in' ? '✓ In' : item.stock === 'low' ? 'Low' : 'Out'}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>`).join('');
  }

  buildBeadsPanel(items) {
    const groups = {};
    items.forEach(item => {
      const g = item.group || 'Other';
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });

    const html = Object.entries(groups).map(([groupName, beads], idx) => `
      <div class="bgroup${idx === 0 ? ' open' : ''}" id="bgroup-${groupName.toLowerCase()}">
        <div class="bgroup-head" onclick="this.closest('.bgroup').classList.toggle('open')">
          <div class="bgroup-head-l">
            <img class="bgroup-preview" src="${beads[0].imgUrl}" alt="${groupName}"/>
            <span class="bgroup-lbl">${groupName}</span>
          </div>
          <div class="bgroup-head-r">
            <span class="bgroup-price">₱${beads[0].price}</span>
            <svg class="bgroup-arr" viewBox="0 0 10 10"><polyline points="2,3 5,7 8,3"/></svg>
          </div>
        </div>
        <div class="bgroup-body">
          <div class="bgroup-swatches">
            ${beads.map(item => `
              <div class="bswatch${item.stock === 'out' ? ' out' : ''}"
                   onclick="${item.stock !== 'out' ? `app.ui.addElement('${item.id}')` : ''}"
                   title="${item.name}">
                <img src="${item.imgUrl}" alt="${item.name}"/>
                ${item.stock === 'low' ? '<span class="bswatch-low">!</span>' : ''}
              </div>`).join('')}
          </div>
        </div>
      </div>`).join('');

    document.getElementById('bead-groups').innerHTML = html;
  }

  buildLetters() {
    const state = this.app.state;
    const isSquare = state.letterShape === 'square';
    document.getElementById('grid-ltrs').innerHTML = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'].map(ch => `
      <div class="lbtn" onclick="app.ui.addLetter('${ch}')"
           style="background:${state.ltrColor.bg};color:${state.ltrColor.text};
                  border-radius:${isSquare ? '8px' : '50%'};">${ch}</div>`).join('');
  }

  setLetterShape(shape, btnEl) {
    this.app.state.letterShape = shape;
    document.querySelectorAll('.lshape-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    this.buildLetters();
  }

  updateInspector(el) {
    const b = document.getElementById('insp-body');
    if (!el) { b.innerHTML = '<div class="insp-empty">Click any element on the canvas to edit</div>'; return; }
    b.innerHTML = `
      <div class="insp-content">
        <div class="insp-top">
          <div class="insp-thumb${el.useImg ? ' figure' : ''}"><img src="${el.imgUrl}"/></div>
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

  setProduct(el) {
    this.app.state.product = el.dataset.prod;
    this.app.state.basePrice = +el.dataset.price;
    this.app.state.maxBeads = +el.dataset.max;
    document.querySelectorAll('.tpill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    this.updateCounters();
    this.app.render();
  }
  setStrCol(col, el) {
    this.app.state.strColor = col;
    document.querySelectorAll('#str-sw .sw').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    this.app.render();
  }
  setRingCol(col, el) {
    this.app.state.ringColor = col;
    document.querySelectorAll('#ring-sw .sw').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    this.app.render();
  }
  setStrType(type) { this.app.state.strType = type; this.app.render(); }
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

  toggleSec(id) { document.getElementById(id).classList.toggle('open'); }

  setStrandCount(n, btnEl) {
    this.app.state.keychainStrands = n;
    if (this.app.state.activeStrand >= n) this.app.state.activeStrand = 0;
    document.querySelectorAll('.strand-count-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    this.app.render();
  }

  setActiveStrand(n, btnEl) {
    this.app.state.activeStrand = n;
    this.app.render();
  }

  setRingType(type, btnEl) {
    this.app.state.ringType = type;
    document.querySelectorAll('.ring-type-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    this.app.render();
  }

  switchTab(el) {
    const tab = el.dataset.tab;
    ['beads', 'figures', 'charms', 'letters'].forEach(t => {
      const el2 = document.getElementById('tab-' + t);
      if (el2) el2.style.display = t === tab ? 'flex' : 'none';
    });
    document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  filterCharms(input, gridId) {
    const q = input.value.toLowerCase().trim();
    const container = document.getElementById(gridId);
    if (!container) return;
    if (!q) {
      container.querySelectorAll('.ecard, .bgroup').forEach(el => el.style.display = '');
      return;
    }
    container.querySelectorAll('.ecard').forEach(card => {
      const name = card.querySelector('.ename')?.textContent.toLowerCase() || '';
      card.style.display = name.includes(q) ? '' : 'none';
    });
    container.querySelectorAll('.bgroup').forEach(group => {
      const visible = [...group.querySelectorAll('.ecard')].some(c => c.style.display !== 'none');
      group.style.display = visible ? '' : 'none';
    });
  }

  renderToCanvas(targetCanvas, W, H) {
    targetCanvas.width = W; targetCanvas.height = H;
    const ctx = targetCanvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);
    const previousSelection = this.app.state.selectedId;
    this.app.state.selectedId = null;
    this.app.canvasEngine.draw(targetCanvas, this.app.state, false);
    this.app.state.selectedId = previousSelection;
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

  closeModal(id) { document.getElementById(id).classList.remove('open'); }

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