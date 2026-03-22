import { BeadShapes }      from './shapes/beads.js';
import { CubeShapes }      from './shapes/cubes.js';
import { drawImageElement } from './shapes/charms.js';

export class CanvasEngine {
  constructor() {
    this.PATHS = {
      bracelet: { cx: 340, cy: 240, rx: 190, ry: 110 },
      necklace: null,
      keychain: null,
    };
    this.imageCache  = new Map();
    this.scaledCache = new Map();
  }

  // ─── IMAGE PRELOADER ────────────────────────────────────────────────────────
  preloadImages(figuresArray) {
    const promises = figuresArray
      .filter(el => el.useImg && el.imgSrc)
      .map(el => new Promise(resolve => {
        if (this.imageCache.has(el.imgSrc)) { resolve(); return; }
        const img = new Image();
        img.onload  = () => { this.imageCache.set(el.imgSrc, img); this._bakeScaled(el.imgSrc, img); resolve(); };
        img.onerror = () => resolve();
        img.src = el.imgSrc;
      }));
    return Promise.all(promises);
  }

  _bakeScaled(key, img) {
    const dpr  = Math.min(window.devicePixelRatio || 1, 3);
    const size = Math.max(img.naturalWidth, img.naturalHeight, 300);
    const c    = document.createElement('canvas');
    c.width    = size * dpr;
    c.height   = size * dpr;
    const ctx  = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, 0, 0, size, size);
    this.scaledCache.set(key, c);
  }

  // ─── POSITIONS ──────────────────────────────────────────────────────────────
  getPositions(state) {
    const elems = state.elems;
    const count = elems.length;
    if (!count) return [];

    const radii = elems.map(el =>
      el.useImg ? 8 : el.shape === 'ellipse' ? 34 : el.shape === 'tube' ? 14 : el.small ? 14 : el.large ? 28 : 22
    );

    if (state.view === 'flatlay') {
      const totalWidth = radii.reduce((s, r) => s + r * 2, 0);
      let x = 340 - totalWidth / 2 + radii[0];
      return elems.map((el, i) => {
        const pos = { x, y: 240, angle: 90 };
        if (i < count - 1) x += radii[i] + radii[i + 1];
        return pos;
      });
    }

    if (state.product === 'bracelet') {
      const { cx, cy, rx, ry } = this.PATHS.bracelet;
      const angles     = radii.map(r => (r * 2) / rx);
      const totalAngle = angles.reduce((s, a) => s + a, 0);
      let t = Math.PI / 2 + totalAngle / 2 - angles[0] / 2;
      return elems.map((el, i) => {
        const pos = { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t), angle: t * 180 / Math.PI + 90 };
        if (i < count - 1) t -= angles[i] / 2 + angles[i + 1] / 2;
        return pos;
      });
    }

    if (state.product === 'necklace') {
      const approxLen  = 800;
      const totalWidth = radii.reduce((s, r) => s + r * 2, 0);
      let t = 0.5 - totalWidth / approxLen / 2;
      return elems.map((el, i) => {
        const { x, y, dx, dy } = this.bezierPoint(60, 80, 60, 420, 620, 420, 620, 80, t);
        const pos = { x, y, angle: Math.atan2(dy, dx) * 180 / Math.PI };
        if (i < count - 1) t += (radii[i] + radii[i + 1]) / approxLen;
        return pos;
      });
    }

    if (state.product === 'keychain') {
      const strandCount = state.keychainStrands || 1;
      const zoneTop = 195, zoneBot = 460, zoneH = zoneBot - zoneTop;
      const spacing = 90;
      const totalW  = (strandCount - 1) * spacing;
      const strandX = Array.from({ length: strandCount }, (_, i) => 340 - totalW / 2 + i * spacing);

      const groups = {};
      for (let i = 0; i < count; i++) {
        const s = elems[i].strand ?? 0;
        if (!groups[s]) groups[s] = [];
        groups[s].push(i);
      }

      const positions = new Array(count);
      const scaleMap  = new Array(count).fill(1);

      for (let s = 0; s < strandCount; s++) {
        const idxs = groups[s] || [];
        if (!idxs.length) continue;
        const sR      = idxs.map(i => radii[i]);
        const totalH  = sR.reduce((sum, r) => sum + r * 2, 0);
        const scale   = totalH > zoneH ? zoneH / totalH : 1;
        const scaledR = sR.map(r => r * scale);
        let y = zoneTop + scaledR[0];
        const x = strandX[s];
        idxs.forEach((elemIdx, j) => {
          positions[elemIdx] = { x, y, angle: 90 };
          scaleMap[elemIdx]  = scale;
          if (j < idxs.length - 1) y += scaledR[j] + scaledR[j + 1];
        });
      }

      state._keychainScales = scaleMap;
      state._strandX        = strandX;
      return positions;
    }

    return [];
  }

  bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const mt = 1 - t;
    const x  = mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3;
    const y  = mt*mt*mt*y0 + 3*mt*mt*t*y1 + 3*mt*t*t*y2 + t*t*t*y3;
    const dt = 0.001; const t2 = Math.min(t + dt, 1); const mt2 = 1 - t2;
    return {
      x, y,
      dx: (mt2*mt2*mt2*x0 + 3*mt2*mt2*t2*x1 + 3*mt2*t2*t2*x2 + t2*t2*t2*x3) - x,
      dy: (mt2*mt2*mt2*y0 + 3*mt2*mt2*t2*y1 + 3*mt2*t2*t2*y2 + t2*t2*t2*y3) - y
    };
  }

  // ─── CORE DRAW ──────────────────────────────────────────────────────────────
  draw(canvas, state, interactive = true) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const flat = state.view === 'flatlay';

    if (state.product === 'keychain') {
      const n       = state.keychainStrands || 1;
      const spacing = 90;
      const totalW  = (n - 1) * spacing;
      state._strandX = Array.from({ length: n }, (_, i) => 340 - totalW / 2 + i * spacing);
    }

    // Guide line
    ctx.save();
    ctx.strokeStyle = 'rgba(180,180,210,.3)';
    ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
    this.drawProductPath(ctx, state); ctx.stroke();
    ctx.setLineDash([]); ctx.restore();

    if (state.elems.length) {
      ctx.save();
      if (state.product !== 'keychain') this.drawString(ctx, state);
      ctx.restore();
    }

    if (!flat) this.drawClasp(ctx, state.product, state.clasp, state.strColor);

    if (state.elems.length) {
      const positions = this.getPositions(state);
      for (let i = 0; i < state.elems.length; i++) {
        const el  = state.elems[i];
        const pos = positions[i] || { x: W / 2, y: H / 2, angle: 0 };
        const baseR  = el.useImg ? 8 : el.shape === 'ellipse' ? 28 : el.shape === 'tube' ? 14 : el.small ? 14 : el.large ? 28 : 22;
        const kScale = (state._keychainScales && state._keychainScales[i] != null) ? state._keychainScales[i] : 1;
        const R   = baseR * kScale;
        const sel = interactive && state.selectedId === el.uid;

        ctx.save();
        ctx.translate(pos.x, pos.y);
        if (!el.useImg) ctx.rotate(pos.angle * Math.PI / 180);
        this.drawElement(ctx, el, R, sel, false, pos.angle);
        ctx.restore();
      }
    }

    if (state.product === 'keychain' && !flat) {
      this.drawKeychainConnector(ctx, state);
    }
  }

  // ─── STRING ─────────────────────────────────────────────────────────────────
  drawString(ctx, state) {
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const c = state.strColor;
    const drawPath = () => this.drawProductPath(ctx, state);

    if (state.strType === 'Chain') {
      ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.setLineDash([6, 6]);
      drawPath(); ctx.stroke(); ctx.setLineDash([]);
    } else if (state.strType === 'Wire') {
      ctx.strokeStyle = c; ctx.lineWidth = 2; drawPath(); ctx.stroke();
    } else {
      ctx.strokeStyle = c; ctx.lineWidth = 5; drawPath(); ctx.stroke();
    }
    ctx.restore();
  }

  drawProductPath(ctx, state) {
    if (state.view === 'flatlay') {
      ctx.beginPath(); ctx.moveTo(80, 240); ctx.lineTo(600, 240); return;
    }
    if (state.product === 'bracelet') {
      const { cx, cy, rx, ry } = this.PATHS.bracelet;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    } else if (state.product === 'necklace') {
      ctx.beginPath(); ctx.moveTo(60, 80); ctx.bezierCurveTo(60, 420, 620, 420, 620, 80);
    } else {
      const strandX = state._strandX || [340];
      strandX.forEach(x => {
        ctx.beginPath(); ctx.moveTo(x, 155); ctx.lineTo(x, 460);
        ctx.stroke();
      });
    }
  }

  // ─── KEYCHAIN CONNECTOR ──────────────────────────────────────────────────────
  drawKeychainConnector(ctx, state) {
    const strandX   = state._strandX || [340];
    const ringType  = state.ringType  || 'ring';
    const ringColor = state.ringColor || '#F7A8C8';
    const cordColor = state.strColor  || '#F7A8C8';
    const ringCY    = 110;

    ctx.save();
    ctx.strokeStyle = ringColor;
    ctx.fillStyle   = 'transparent';
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    switch (ringType) {
      case 'heart': {
        ctx.lineWidth = 4;
        ctx.beginPath();
        const hx = 340, hy = ringCY, hs = 22;
        ctx.moveTo(hx, hy + hs * 0.5);
        ctx.bezierCurveTo(hx + hs * 2, hy - hs * 1.2, hx + hs * 2.5, hy + hs * 0.8, hx, hy + hs * 2);
        ctx.bezierCurveTo(hx - hs * 2.5, hy + hs * 0.8, hx - hs * 2, hy - hs * 1.2, hx, hy + hs * 0.5);
        ctx.stroke();
        ctx.strokeStyle = '#F8F7FA'; ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(hx - 7, hy + hs * 2 - 4);
        ctx.lineTo(hx + 7, hy + hs * 2 - 4);
        ctx.stroke();
        break;
      }
      case 'carabiner': {
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.ellipse(340, ringCY + 10, 16, 28, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.save();
        ctx.strokeStyle = '#F8F7FA'; ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(340, ringCY + 38 - 6); ctx.lineTo(340, ringCY + 38 + 4);
        ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = ringColor; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(332, ringCY + 38 - 2); ctx.lineTo(340, ringCY + 34);
        ctx.stroke();
        break;
      }
      case 'ballchain': {
        ctx.fillStyle = ringColor;
        const balls = 10, ballR = 4, loopR = 20;
        for (let i = 0; i < balls; i++) {
          const a = (i / balls) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.arc(340 + Math.cos(a) * loopR, ringCY + 10 + Math.sin(a) * loopR, ballR, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      default: // ring
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(340, ringCY + 8, 22, 0, Math.PI * 2);
        ctx.stroke();
        break;
    }

    // Cords
    ctx.strokeStyle = cordColor;
    const cordStartY = ringType === 'heart'     ? ringCY + 44 :
                       ringType === 'carabiner' ? ringCY + 40 :
                       ringType === 'ballchain' ? ringCY + 32 :
                                                  ringCY + 30;
    ctx.lineWidth = state.strType === 'Wire' ? 2 : 4;
    if (state.strType === 'Chain') ctx.setLineDash([5, 5]);
    strandX.forEach(x => {
      ctx.beginPath();
      ctx.moveTo(340, cordStartY);
      ctx.quadraticCurveTo(340, 185, x, 195);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.restore();
  }

  drawClasp(ctx, product, clasp, color) {
    if (clasp === 'none') return;
    ctx.save();
    ctx.fillStyle = '#F7A8C8';
    if (product === 'bracelet') {
      ctx.translate(150, 170); ctx.rotate(-0.3);
      ctx.beginPath(); this.roundRect(ctx, -8, -8, 16, 16, 4); ctx.fill();
    } else if (product === 'necklace') {
      [[60, 80], [620, 80]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill(); });
    } else {
      ctx.beginPath(); ctx.arc(340, 172, 8, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  // ─── ELEMENT DISPATCH ────────────────────────────────────────────────────────
  drawElement(ctx, el, R, isSelected, isThumb = false, posAngle = 0) {
    // ── Image-based charms ────────────────────────────────────────────────────
    if (el.useImg) {
      drawImageElement(ctx, el, R, isSelected && !isThumb, this.imageCache, this.scaledCache);
      return;
    }

    // ── Selection glow ────────────────────────────────────────────────────────
    if (isSelected && !isThumb) {
      ctx.save();
      ctx.strokeStyle = '#F7A8C8';
      ctx.lineWidth   = 3;
      ctx.beginPath(); ctx.arc(0, 0, R + 5, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }

    const color  = el.color  || '#FFFFFF';
    const detail = el.detail || '#FFFFFF';

    // ── Cube family ───────────────────────────────────────────────────────────
    if (el.shape && el.shape.startsWith('cube')) {
      ctx.save();
      ctx.rotate(-posAngle * Math.PI / 180); // un-rotate so face stays upright
      const drawFn = CubeShapes[el.shape];
      if (drawFn) drawFn(ctx, R, color, detail, this.roundRect.bind(this));
      ctx.restore();
      return;
    }

    // ── Letter tiles ──────────────────────────────────────────────────────────
    if (el.isLetter) {
      const bg = el.ltrBg   || '#FFFFFF';
      const fg = el.ltrText || '#333344';
      if (el.letterShape === 'square') {
        const s = R * 1.85;
        ctx.fillStyle = bg;
        ctx.beginPath(); this.roundRect(ctx, -s / 2, -s / 2, s, s, s * 0.22); ctx.fill();
      } else {
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
      }
      ctx.save();
      ctx.rotate(-posAngle * Math.PI / 180);
      ctx.fillStyle = fg;
      ctx.font = `900 ${R * 1.1}px 'Nunito', sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(el.label, 0, R * 0.07);
      ctx.restore();
      return;
    }

    // ── Standard bead shapes ──────────────────────────────────────────────────
    const drawFn = BeadShapes[el.shape];
    if (drawFn) {
      drawFn(ctx, R, color, detail, this._lighten.bind(this));
    } else {
      // Fallback — plain circle
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
    }
  }

  // ─── UTILITIES ───────────────────────────────────────────────────────────────
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  _lighten(hex, a) { return this._adj(hex,  a); }
  _darken (hex, a) { return this._adj(hex, -a); }
  _adj(hex, a) {
    try {
      const n = parseInt(hex.replace('#', ''), 16);
      const c = v => Math.min(255, Math.max(0, v + Math.round(255 * a)));
      return `rgb(${c(n >> 16)},${c((n >> 8) & 0xff)},${c(n & 0xff)})`;
    } catch { return hex; }
  }

  // ─── THUMBNAIL GENERATORS ────────────────────────────────────────────────────
  generateThumbnails(arr) {
    const c = document.createElement('canvas');
    c.width = c.height = 100;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    arr.forEach(el => {
      if (el.useImg) return;
      ctx.clearRect(0, 0, 100, 100);
      ctx.save();
      const R = el.small ? 20 : (el.shape && el.shape.startsWith('cube')) ? 26 : el.shape === 'ellipse' ? 28 : 28;
      ctx.translate(50, 50);
      this.drawElement(ctx, el, R, false, true, 0);
      ctx.restore();
      el.imgUrl = c.toDataURL('image/png');
    });
  }

  generateFigureThumb(el) {
    const source = this.scaledCache.get(el.imgSrc) || this.imageCache.get(el.imgSrc);
    const c = document.createElement('canvas');
    c.width = c.height = 100;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    if (source) {
      ctx.filter = 'drop-shadow(2px 4px 6px rgba(0,0,0,0.20))';
      ctx.drawImage(source, 6, 6, 88, 88);
      ctx.filter = 'none';
    }
    return c.toDataURL('image/png');
  }

  createSingleThumb(el) {
    const c = document.createElement('canvas');
    c.width = c.height = 100;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.translate(50, 50);
    this.drawElement(ctx, el, el.small ? 20 : 28, false, true, 0);
    return c.toDataURL('image/png');
  }
}