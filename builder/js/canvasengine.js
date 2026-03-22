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
        img.onerror = () => { resolve(); };
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
      // Start from LEFT of center, move right → index 0 = left, last = right
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

      // X centre for each strand
      const spacing = 90;
      const totalW  = (strandCount - 1) * spacing;
      const strandX = Array.from({ length: strandCount }, (_, i) => 340 - totalW / 2 + i * spacing);

      // Group element indices by their strand property
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
        const scaledH = scaledR.reduce((sum, r) => sum + r * 2, 0);

        // Always start from top of zone, never center
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

    // Pre-compute keychain strand X positions so guide lines are current
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
        const baseR = el.useImg ? 8 : el.shape === 'ellipse' ? 28 : el.shape === 'tube' ? 14 : el.small ? 14 : el.large ? 28 : 22;
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

    // Keychain connector ring + strand cords
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
      // Keychain: one vertical line per strand
      const strandX = state._strandX || [340];
      strandX.forEach(x => {
        ctx.beginPath(); ctx.moveTo(x, 155); ctx.lineTo(x, 460);
        ctx.stroke();
      });
    }
  }

  // ─── KEYCHAIN CONNECTOR (ring + cords) ─────────────────────────────────────
  drawKeychainConnector(ctx, state) {
    const strandX   = state._strandX || [340];
    const ringType  = state.ringType  || 'ring';
    const ringColor = state.ringColor || '#F7A8C8';   // connector colour
    const cordColor = state.strColor  || '#F7A8C8';   // cord colour
    const ringCY    = 110;

    ctx.save();
    ctx.strokeStyle = ringColor;
    ctx.fillStyle   = 'transparent';
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    // ── Draw the connector shape ──────────────────────────────────────────
    switch (ringType) {

      case 'heart': {
        ctx.lineWidth = 4;
        ctx.beginPath();
        const hx = 340, hy = ringCY, hs = 22;
        ctx.moveTo(hx, hy + hs * 0.5);
        ctx.bezierCurveTo(hx + hs * 2, hy - hs * 1.2, hx + hs * 2.5, hy + hs * 0.8, hx, hy + hs * 2);
        ctx.bezierCurveTo(hx - hs * 2.5, hy + hs * 0.8, hx - hs * 2, hy - hs * 1.2, hx, hy + hs * 0.5);
        ctx.stroke();
        ctx.strokeStyle = '#F8F7FA';
        ctx.lineWidth = 6;
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
        ctx.strokeStyle = '#F8F7FA';
        ctx.lineWidth   = 7;
        ctx.beginPath();
        ctx.moveTo(340, ringCY + 38 - 6);
        ctx.lineTo(340, ringCY + 38 + 4);
        ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = ringColor;
        ctx.lineWidth   = 3;
        ctx.beginPath();
        ctx.moveTo(332, ringCY + 38 - 2);
        ctx.lineTo(340, ringCY + 34);
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

      default: // 'ring'
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(340, ringCY + 8, 22, 0, Math.PI * 2);
        ctx.stroke();
        break;
    }

    // ── Cords — use cordColor ─────────────────────────────────────────────
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
      [[60,80],[620,80]].forEach(([x,y]) => { ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI*2); ctx.fill(); });
    } else {
      ctx.beginPath(); ctx.arc(340, 172, 8, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }

  outlineFill(ctx, pathFunc, color, R) {
    ctx.fillStyle = color;
    ctx.beginPath(); pathFunc(ctx, R); ctx.fill();
  }

  drawSelectionGlow(ctx, R) {
    ctx.save();
    ctx.strokeStyle = '#F7A8C8';
    ctx.lineWidth   = 3;
    ctx.beginPath(); ctx.arc(0, 0, R + 5, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  drawImageElement(ctx, el, R, isSelected) {
    const source = this.scaledCache.get(el.imgSrc) || this.imageCache.get(el.imgSrc);
    const D = 100;

    if (!source) {
      ctx.fillStyle = '#F7A8C8'; ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText('✿', -10, 0);
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const tf = ctx.getTransform();
    ctx.rotate(-Math.atan2(tf.b, tf.a));

    const ringR  = 8;
    const figTop = ringR;

    ctx.save();

    if (isSelected) {
      ctx.strokeStyle = '#F7A8C8';
      ctx.lineWidth   = 2;
      ctx.setLineDash([3, 2]);
      ctx.beginPath(); ctx.arc(0, 0, ringR + 4, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.strokeStyle = '#F7A8C8';
    ctx.lineWidth   = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, ringR, 0, Math.PI * 2); ctx.stroke();

    ctx.drawImage(source, -D/2, figTop, D, D);

    ctx.restore();
  }

  drawElement(ctx, el, R, isSelected, isThumb = false, posAngle = 0) {
    if (el.useImg) { this.drawImageElement(ctx, el, R, isSelected && !isThumb); return; }

    if (isSelected && !isThumb) this.drawSelectionGlow(ctx, R);

    const color  = el.color  || '#FFFFFF';
    const detail = el.detail || '#FFFFFF';

    // ── Cube family ───────────────────────────────────────────────────────────
    if (el.shape && el.shape.startsWith('cube')) {
      // Un-rotate so cube face is always upright
      ctx.save();
      ctx.rotate(-posAngle * Math.PI / 180);
      this.drawCubeShape(ctx, el, R);
      ctx.restore();
      return;
    }

    if (el.isLetter) {
      const bg = el.ltrBg   || '#FFFFFF';
      const fg = el.ltrText || '#333344';

      if (el.letterShape === 'square') {
        const s = R * 1.85;
        ctx.fillStyle = bg;
        ctx.beginPath(); this.roundRect(ctx, -s/2, -s/2, s, s, s * 0.22); ctx.fill();
      } else {
        this.outlineFill(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), bg, R);
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

    switch (el.shape) {

      case 'round':
        this.outlineFill(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R);
        break;

      case 'ellipse':
        this.outlineFill(ctx, (c, r) => c.ellipse(0, 0, r*1.55, r*0.78, 0, 0, Math.PI*2), color, R);
        break;

      case 'tube':
        this.outlineFill(ctx, (c, r) => c.ellipse(0, 0, r*0.7, r*1.58, 0, 0, Math.PI*2), color, R);
        break;

      case 'pearl':
        this.outlineFill(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R);
        break;

      case 'faceted':
        this.outlineFill(ctx, (c, r) => {
          c.beginPath();
          for (let i = 0; i < 6; i++) c.lineTo(Math.cos(i*Math.PI/3)*r, Math.sin(i*Math.PI/3)*r);
          c.closePath();
        }, color, R);
        break;

      case 'heart':
        this.outlineFill(ctx, (c, r) => {
          c.moveTo(0, r*0.3);
          c.bezierCurveTo( r, -r*1.2,  r*2.2, r*0.4, 0,  r);
          c.bezierCurveTo(-r*2.2, r*0.4, -r, -r*1.2, 0, r*0.3);
        }, color, R);
        break;

      case 'star':
        this.outlineFill(ctx, (c, r) => {
          c.beginPath();
          for (let i = 0; i < 10; i++) {
            const rad = i % 2 === 0 ? r : r * 0.44;
            c.lineTo(Math.cos(i*Math.PI/5 - Math.PI/2)*rad, Math.sin(i*Math.PI/5 - Math.PI/2)*rad);
          }
          c.closePath();
        }, color, R);
        break;

      case 'moon':
        this.outlineFill(ctx, (c, r) => {
          c.arc(0, 0, r, Math.PI*0.15, Math.PI*1.85, true);
          c.quadraticCurveTo(-r*0.4, 0, Math.cos(Math.PI*0.15)*r, Math.sin(Math.PI*0.15)*r);
        }, color, R);
        break;

      case 'flower':
        for (let i = 0; i < 5; i++) {
          const a = i * Math.PI * 2 / 5;
          ctx.save();
          ctx.translate(Math.cos(a)*R*0.56, Math.sin(a)*R*0.56);
          this.outlineFill(ctx, (c, r) => c.arc(0, 0, r*0.48, 0, Math.PI*2), color, R);
          ctx.restore();
        }
        this.outlineFill(ctx, (c, r) => c.arc(0, 0, r*0.34, 0, Math.PI*2), detail, R);
        break;

      case 'rainbow': {
        const stripes = ['#FFB3C6','#FFCF8B','#FFF4A3','#B5EDCA','#B3D9FF','#D9C0F5'];
        stripes.forEach((col, idx) => {
          const oR = R * (1 - idx * 0.12);
          const iR = oR - R * 0.10;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(0, R*0.15, oR, Math.PI, 0);
          ctx.arc(0, R*0.15, iR, 0, Math.PI, true);
          ctx.closePath(); ctx.fill();
        });
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, R*0.15, R*0.20, Math.PI, 0);
        ctx.arc(0, R*0.35, R*0.32, 0, Math.PI);
        ctx.closePath(); ctx.fill();
        break;
      }

      case 'bow': {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0,0); ctx.bezierCurveTo(-R*1.4,-R*0.9,-R*1.6,R*0.4,-R*0.2,R*0.15); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0,0); ctx.bezierCurveTo( R*1.4,-R*0.9, R*1.6,R*0.4, R*0.2,R*0.15); ctx.closePath(); ctx.fill();
        this.outlineFill(ctx, (c,r) => c.arc(0, R*0.06, r*0.3, 0, Math.PI*2), detail, R);
        break;
      }

      case 'butterfly': {
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.ellipse(-R*.7,-R*.32,R*.7,R*.52,-0.4,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse( R*.7,-R*.32,R*.7,R*.52, 0.4,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = this._lighten(color, 0.18);
        ctx.beginPath(); ctx.ellipse(-R*.52, R*.3,R*.48,R*.36,0.3,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse( R*.52, R*.3,R*.48,R*.36,-0.3,0,Math.PI*2); ctx.fill();
        this.outlineFill(ctx, (c,r) => c.ellipse(0, 0, r*0.17, r*0.78, 0, 0, Math.PI*2), detail, R);
        break;
      }

      default:
        this.outlineFill(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI*2), color, R);
    }
  }

  // ─── CUBE HELPER ────────────────────────────────────────────────────────────
  _drawCubeBase(ctx, R, color) {
    const s = R * 1.8;
    ctx.fillStyle = color;
    ctx.beginPath(); this.roundRect(ctx, -s/2, -s/2, s, s, s * 0.18); ctx.fill();
  }

  _drawCubeDot(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  drawCubeShape(ctx, el, R) {
    const color  = el.color  || '#F9B8CF';
    const detail = el.detail || '#FFFFFF';
    const s      = R * 1.8;
    const h      = s / 2;
    const dr     = R * 0.18; // dot radius

    switch (el.shape) {

      // ── Plain cube ─────────────────────────────────────────────────────────
      case 'cube':
        this._drawCubeBase(ctx, R, color);
        break;

      // ── Dice — classic pip layout ──────────────────────────────────────────
      case 'cube-dice1':
        this._drawCubeBase(ctx, R, color);
        this._drawCubeDot(ctx, 0, 0, dr, detail);
        break;

      case 'cube-dice2':
        this._drawCubeBase(ctx, R, color);
        this._drawCubeDot(ctx, -h*0.42,  h*0.42, dr, detail);
        this._drawCubeDot(ctx,  h*0.42, -h*0.42, dr, detail);
        break;

      case 'cube-dice3':
        this._drawCubeBase(ctx, R, color);
        this._drawCubeDot(ctx, -h*0.42,  h*0.42, dr, detail);
        this._drawCubeDot(ctx,  0,        0,      dr, detail);
        this._drawCubeDot(ctx,  h*0.42, -h*0.42, dr, detail);
        break;

      case 'cube-dice4':
        this._drawCubeBase(ctx, R, color);
        [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([dx,dy]) =>
          this._drawCubeDot(ctx, dx*h*0.38, dy*h*0.38, dr, detail));
        break;

      case 'cube-dice5':
        this._drawCubeBase(ctx, R, color);
        [[-1,-1],[1,-1],[-1,1],[1,1],[0,0]].forEach(([dx,dy]) =>
          this._drawCubeDot(ctx, dx*h*0.38, dy*h*0.38, dr, detail));
        break;

      case 'cube-dice6':
        this._drawCubeBase(ctx, R, color);
        [[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]].forEach(([dx,dy]) =>
          this._drawCubeDot(ctx, dx*h*0.38, dy*h*0.38, dr, detail));
        break;

      // ── Heart print cube ───────────────────────────────────────────────────
      case 'cube-heart': {
        this._drawCubeBase(ctx, R, color);
        const hr = R * 0.55;
        ctx.fillStyle = detail;
        ctx.beginPath();
        ctx.moveTo(0, hr*0.3);
        ctx.bezierCurveTo( hr, -hr*1.2,  hr*2.2, hr*0.4, 0,  hr);
        ctx.bezierCurveTo(-hr*2.2, hr*0.4, -hr, -hr*1.2, 0, hr*0.3);
        ctx.fill();
        break;
      }

      // ── Star print cube ────────────────────────────────────────────────────
      case 'cube-star': {
        this._drawCubeBase(ctx, R, color);
        const sr = R * 0.6;
        ctx.fillStyle = detail;
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const rad = i % 2 === 0 ? sr : sr * 0.44;
          ctx.lineTo(Math.cos(i*Math.PI/5 - Math.PI/2)*rad, Math.sin(i*Math.PI/5 - Math.PI/2)*rad);
        }
        ctx.closePath(); ctx.fill();
        break;
      }

      // ── Checkered cube ─────────────────────────────────────────────────────
      case 'cube-checker': {
        this._drawCubeBase(ctx, R, color);
        const cs = s / 4;
        ctx.fillStyle = detail;
        // clip to cube shape
        ctx.save();
        ctx.beginPath(); this.roundRect(ctx, -s/2, -s/2, s, s, s*0.18); ctx.clip();
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            if ((row + col) % 2 === 0) {
              ctx.fillRect(-s/2 + col*cs, -s/2 + row*cs, cs, cs);
            }
          }
        }
        ctx.restore();
        break;
      }

      // ── Polka dot cube ─────────────────────────────────────────────────────
      case 'cube-dots': {
        this._drawCubeBase(ctx, R, color);
        const positions = [
          [-0.38,-0.38],[0.38,-0.38],[0,-0.06],
          [-0.38, 0.38],[0.38, 0.38],
        ];
        positions.forEach(([dx,dy]) =>
          this._drawCubeDot(ctx, dx*s, dy*s, R*0.14, detail));
        break;
      }

      // ── Smiley cube ────────────────────────────────────────────────────────
      case 'cube-smile': {
        this._drawCubeBase(ctx, R, color);
        ctx.strokeStyle = detail; ctx.lineWidth = R * 0.14; ctx.lineCap = 'round';
        // Eyes
        ctx.fillStyle = detail;
        this._drawCubeDot(ctx, -R*0.35, -R*0.2, R*0.13, detail);
        this._drawCubeDot(ctx,  R*0.35, -R*0.2, R*0.13, detail);
        // Smile
        ctx.beginPath();
        ctx.arc(0, R*0.1, R*0.38, 0.2, Math.PI - 0.2);
        ctx.stroke();
        break;
      }

      default:
        this._drawCubeBase(ctx, R, color);
    }
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
  }

  _lighten(hex, a) { return this._adj(hex,  a); }
  _darken (hex, a) { return this._adj(hex, -a); }
  _adj(hex, a) {
    try {
      const n = parseInt(hex.replace('#',''), 16);
      const c = v => Math.min(255, Math.max(0, v + Math.round(255*a)));
      return `rgb(${c(n>>16)},${c((n>>8)&0xff)},${c(n&0xff)})`;
    } catch { return hex; }
  }

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