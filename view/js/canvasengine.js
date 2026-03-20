export class CanvasEngine {
  constructor() {
    this.PATHS = {
      bracelet: { cx: 340, cy: 240, rx: 190, ry: 110 },
      necklace: null, 
      keychain: null,
    };
  }

  // Calculate coordinates for beads along a path
  getPositions(product, count) {
    if (!count) return [];
    if (product === 'bracelet') {
      const { cx, cy, rx, ry } = this.PATHS.bracelet;
      return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        return { 
          x: cx + rx * Math.cos(angle), 
          y: cy + ry * Math.sin(angle), 
          angle: angle * 180 / Math.PI + 90 
        };
      });
    }
    if (product === 'necklace') {
      return Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const { x, y, dx, dy } = this.bezierPoint(60, 80, 60, 420, 620, 420, 620, 80, t);
        return { x, y, angle: Math.atan2(dy, dx) * 180 / Math.PI };
      });
    }
    if (product === 'keychain') {
      const startY = 190, endY = 430, x = 340;
      return Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        return { x, y: startY + (endY - startY) * t, angle: 90 };
      });
    }
    return [];
  }

  bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const mt = 1 - t;
    const x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    const y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    const dt = 0.001; const t2 = Math.min(t + dt, 1); const mt2 = 1 - t2;
    return {
      x, y,
      dx: (mt2 * mt2 * mt2 * x0 + 3 * mt2 * mt2 * t2 * x1 + 3 * mt2 * t2 * t2 * x2 + t2 * t2 * t2 * x3) - x,
      dy: (mt2 * mt2 * mt2 * y0 + 3 * mt2 * mt2 * t2 * y1 + 3 * mt2 * t2 * t2 * y2 + t2 * t2 * t2 * y3) - y
    };
  }

  // Core Drawing Loop
  draw(canvas, state, interactive = true) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const flat = state.view === 'flatlay';

    if (flat) {
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      this.roundRect(ctx, 20, 20, W - 40, H - 40, 18); 
      ctx.fill();
      ctx.strokeStyle = '#111118'; ctx.lineWidth = 4;
      this.roundRect(ctx, 20, 20, W - 40, H - 40, 18); 
      ctx.stroke();
      ctx.restore();
    }

    // String Guide
    ctx.save();
    ctx.strokeStyle = 'rgba(17,17,24,.15)'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]);
    this.drawProductPath(ctx, state.product); ctx.stroke();
    ctx.setLineDash([]); ctx.restore();

    // String Render
    if (state.elems.length) {
      ctx.save();
      if (flat) {
        ctx.translate(4, 4);
        this.drawString(ctx, state.product, state.strType, state.strColor, true);
        ctx.translate(-4, -4);
      }
      this.drawString(ctx, state.product, state.strType, state.strColor, false);
      ctx.restore();
    }

    this.drawClasp(ctx, state.product, state.clasp, state.strColor);

    // Beads Render
    if (state.elems.length) {
      const positions = this.getPositions(state.product, state.elems.length);
      for (let i = 0; i < state.elems.length; i++) {
        const el = state.elems[i];
        const pos = positions[i] || { x: W / 2, y: H / 2, angle: 0 };
        const R = el.small ? 14 : (el.large ? 28 : 22);
        const isSelected = interactive && state.selectedId === el.uid;

        ctx.save();
        ctx.translate(pos.x, pos.y);
        if (el.category === 'beads' || el.isLetter) {
          ctx.rotate(pos.angle * Math.PI / 180);
        }
        this.drawBrutalistElement(ctx, el, R, isSelected, false);
        ctx.restore();
      }
    }

    // Keychain ring overlay
    if (state.product === 'keychain') {
      ctx.save(); ctx.strokeStyle = '#111118'; ctx.lineWidth = 6;
      ctx.translate(3, 3); ctx.beginPath(); ctx.arc(340, 130, 42, 0, Math.PI * 2); ctx.stroke();
      ctx.translate(-3, -3); ctx.strokeStyle = '#E0E0E0'; ctx.stroke();
      ctx.strokeStyle = '#111118'; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }
  }

  drawString(ctx, product, type, color, isShadow) {
    ctx.save();
    ctx.lineJoin = 'round';
    const drawPath = () => { this.drawProductPath(ctx, product); };

    if (type === 'Elastic') {
      ctx.lineCap = 'round';
      if (isShadow) {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 6; drawPath(); ctx.stroke();
      } else {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 6; drawPath(); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 4; drawPath(); ctx.stroke();
      }
    } else if (type === 'Cord') {
      ctx.lineCap = 'butt';
      if (isShadow) {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 8; drawPath(); ctx.stroke();
      } else {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 8; drawPath(); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 6; drawPath(); ctx.stroke();
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 6; ctx.setLineDash([4, 8]); drawPath(); ctx.stroke();
      }
    } else if (type === 'Wire') {
      ctx.lineCap = 'round';
      if (isShadow) {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 4; drawPath(); ctx.stroke();
      } else {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 4; drawPath(); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 2; drawPath(); ctx.stroke();
      }
    } else if (type === 'Chain') {
      ctx.lineCap = 'round';
      if (isShadow) {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 12; ctx.setLineDash([0, 18]); drawPath(); ctx.stroke();
        ctx.lineWidth = 6; ctx.setLineDash([]); drawPath(); ctx.stroke();
      } else {
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 6; ctx.setLineDash([]); drawPath(); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 2; drawPath(); ctx.stroke();
        
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 12; ctx.setLineDash([0, 18]); drawPath(); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 8; drawPath(); ctx.stroke();
        
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 3; drawPath(); ctx.stroke();
      }
    }
    ctx.restore();
  }

  drawProductPath(ctx, product) {
    if (product === 'bracelet') {
      const { cx, cy, rx, ry } = this.PATHS.bracelet;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    } else if (product === 'necklace') {
      ctx.beginPath(); ctx.moveTo(60, 80); ctx.bezierCurveTo(60, 420, 620, 420, 620, 80);
    } else {
      ctx.beginPath(); ctx.moveTo(340, 190); ctx.lineTo(340, 430);
    }
  }

  drawClasp(ctx, product, clasp, color) {
    if (clasp === 'none') return;
    ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = '#111118'; ctx.lineWidth = 3;
    if (product === 'bracelet') {
      ctx.translate(150, 170); ctx.rotate(-0.3);
      ctx.fillRect(-10, -10, 20, 20); ctx.strokeRect(-10, -10, 20, 20);
    } else if (product === 'necklace') {
      [[60, 80], [620, 80]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
    } else if (product === 'keychain') {
      ctx.beginPath(); ctx.arc(340, 172, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  // --- BRUTALIST ELEMENT LOGIC ---
  fillStroke(ctx, pathFunc, color, R, isFlat) {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#111118';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    
    ctx.save();
    ctx.translate(isFlat ? 4 : 3, isFlat ? 4 : 3);
    ctx.fillStyle = '#111118';
    ctx.beginPath(); pathFunc(ctx, R); ctx.fill();
    ctx.restore();

    ctx.beginPath(); pathFunc(ctx, R); ctx.fill(); ctx.stroke();
  }

  drawBrutalistElement(ctx, el, R, isSelected, isThumb = false) {
    const color = el.color || el.ltrBg || '#FFF';
    const detail = el.detail || '#FFF';
    
    if (isSelected && !isThumb) {
      ctx.shadowColor = '#FF5FA0';
      ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.save();
      ctx.strokeStyle = '#FF5FA0';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(0, 0, R + 8, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    } else {
      ctx.shadowColor = 'transparent';
    }

    const isFlat = !isThumb; 

    if (el.isLetter) {
      this.fillStroke(ctx, (c, r) => c.rect(-r, -r, r * 2, r * 2), color, R, isFlat);
      ctx.fillStyle = el.ltrText || '#111118';
      ctx.font = `900 ${R * 1.3}px 'Syne', sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(el.label, 0, R * 0.1);
      return;
    }

    switch(el.shape) {
      case 'round':
        this.fillStroke(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R, isFlat);
        ctx.beginPath(); ctx.arc(0, 0, R * 0.65, Math.PI, Math.PI * 1.5);
        ctx.strokeStyle = detail; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
        break;
      case 'pearl':
        this.fillStroke(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R, isFlat);
        ctx.beginPath(); ctx.arc(-R * 0.3, -R * 0.3, R * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = detail; ctx.fill();
        break;
      case 'faceted':
        this.fillStroke(ctx, (c, r) => {
          for(let i = 0; i < 6; i++) c.lineTo(Math.cos(i * Math.PI / 3) * r, Math.sin(i * Math.PI / 3) * r);
          c.closePath();
        }, color, R, isFlat);
        ctx.beginPath();
        for(let i = 0; i < 6; i++) {
          ctx.moveTo(0, 0); ctx.lineTo(Math.cos(i * Math.PI / 3) * R, Math.sin(i * Math.PI / 3) * R);
        }
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 2; ctx.stroke();
        break;
      case 'heart':
        this.fillStroke(ctx, (c, r) => {
          c.moveTo(0, r * 0.3);
          c.bezierCurveTo(r, -r * 1.2, r * 2.2, r * 0.4, 0, r);
          c.bezierCurveTo(-r * 2.2, r * 0.4, -r, -r * 1.2, 0, r * 0.3);
        }, color, R, isFlat);
        break;
      case 'star':
        this.fillStroke(ctx, (c, r) => {
          for(let i = 0; i < 10; i++){
            const rad = i % 2 === 0 ? r : r * 0.45;
            c.lineTo(Math.cos(i * Math.PI / 5 - Math.PI / 2) * rad, Math.sin(i * Math.PI / 5 - Math.PI / 2) * rad);
          }
          c.closePath();
        }, color, R, isFlat);
        break;
      case 'moon':
        this.fillStroke(ctx, (c, r) => {
          c.arc(0, 0, r, Math.PI * 0.15, Math.PI * 1.85, true);
          c.quadraticCurveTo(-r * 0.4, 0, Math.cos(Math.PI * 0.15) * r, Math.sin(Math.PI * 0.15) * r);
        }, color, R, isFlat);
        break;
      case 'flower':
        this.fillStroke(ctx, (c, r) => {
          for(let i = 0; i < 5; i++) {
            const a = i * Math.PI * 2 / 5;
            c.moveTo(0, 0); c.arc(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, r * 0.4, 0, Math.PI * 2);
          }
        }, color, R, isFlat);
        ctx.beginPath(); ctx.arc(0, 0, R * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = detail; ctx.fill(); ctx.stroke();
        break;
      case 'rainbow':
        this.fillStroke(ctx, (c, r) => {
          c.arc(0, r * 0.3, r, Math.PI, 0); c.lineTo(r * 0.5, r * 0.3);
          c.arc(0, r * 0.3, r * 0.5, 0, Math.PI, true); c.closePath();
        }, color, R, isFlat);
        ctx.beginPath(); ctx.arc(0, R * 0.3, R * 0.75, Math.PI, 0);
        ctx.strokeStyle = detail; ctx.lineWidth = R * 0.25; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, R * 0.3, R * 0.75, Math.PI, 0);
        ctx.strokeStyle = '#111118'; ctx.lineWidth = 3; ctx.stroke();
        break;
      case 'bunny':
        this.fillStroke(ctx, (c, r) => {
          c.ellipse(-r * 0.4, -r * 0.8, r * 0.25, r * 0.7, -0.2, 0, Math.PI * 2);
          c.ellipse(r * 0.4, -r * 0.8, r * 0.25, r * 0.7, 0.2, 0, Math.PI * 2);
        }, color, R, isFlat);
        this.fillStroke(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R, isFlat);
        ctx.fillStyle = '#111118';
        ctx.beginPath(); ctx.arc(-R * 0.3, -R * 0.1, R * 0.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(R * 0.3, -R * 0.1, R * 0.1, 0, Math.PI * 2); ctx.fill();
        break;
      case 'bear':
        this.fillStroke(ctx, (c, r) => {
          c.arc(-r * 0.7, -r * 0.7, r * 0.4, 0, Math.PI * 2);
          c.arc(r * 0.7, -r * 0.7, r * 0.4, 0, Math.PI * 2);
        }, color, R, isFlat);
        this.fillStroke(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R, isFlat);
        ctx.fillStyle = '#111118';
        ctx.fillRect(-R * 0.4, -R * 0.2, R * 0.15, R * 0.15); ctx.fillRect(R * 0.25, -R * 0.2, R * 0.15, R * 0.15);
        break;
      case 'cat':
        this.fillStroke(ctx, (c, r) => {
          c.moveTo(-r, -r); c.lineTo(-r * 0.2, -r * 0.6); c.lineTo(-r * 0.8, 0);
          c.moveTo(r, -r); c.lineTo(r * 0.2, -r * 0.6); c.lineTo(r * 0.8, 0);
        }, color, R, isFlat);
        this.fillStroke(ctx, (c, r) => c.arc(0, 0, r, 0, Math.PI * 2), color, R, isFlat);
        ctx.fillStyle = '#111118';
        ctx.fillRect(-R * 0.4, -R * 0.1, R * 0.15, R * 0.15); ctx.fillRect(R * 0.25, -R * 0.1, R * 0.15, R * 0.15);
        break;
      case 'mushroom':
        this.fillStroke(ctx, (c, r) => { c.rect(-r * 0.3, 0, r * 0.6, r * 0.9); }, detail, R, isFlat);
        this.fillStroke(ctx, (c, r) => { c.arc(0, r * 0.2, r, Math.PI, 0); c.closePath(); }, color, R, isFlat);
        ctx.fillStyle = detail;
        ctx.beginPath(); ctx.arc(-R * 0.5, -R * 0.3, R * 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(R * 0.4, -R * 0.4, R * 0.15, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(0, -R * 0.6, R * 0.15, 0, Math.PI * 2); ctx.fill();
        break;
      case 'strawberry':
        this.fillStroke(ctx, (c, r) => {
          c.moveTo(0, r); c.quadraticCurveTo(r, r * 0.5, r * 0.8, -r * 0.5);
          c.quadraticCurveTo(0, -r, -r * 0.8, -r * 0.5); c.quadraticCurveTo(-r, r * 0.5, 0, r);
        }, color, R, isFlat);
        this.fillStroke(ctx, (c, r) => {
          c.moveTo(0, -r * 0.5); c.lineTo(-r * 0.6, -r * 0.9); c.lineTo(-r * 0.2, -r * 0.5);
          c.lineTo(0, -r); c.lineTo(r * 0.2, -r * 0.5); c.lineTo(r * 0.6, -r * 0.9); c.closePath();
        }, detail, R, false);
        ctx.fillStyle = '#111118';
        [[-0.4, -0.1], [0.4, 0], [0, 0.4], [-0.3, 0.5], [0.3, -0.3]].forEach(([dx, dy]) => {
          ctx.fillRect(dx * R, dy * R, 3, 3);
        });
        break;
    }
  }

  // Generate Base64 Images for Library
  generateThumbnails(elementsArray) {
    const c = document.createElement('canvas');
    c.width = 100; c.height = 100;
    const ctx = c.getContext('2d');
    
    elementsArray.forEach(el => {
      ctx.clearRect(0, 0, 100, 100);
      ctx.save();
      const R = el.small ? 20 : (el.large ? 38 : 30);
      ctx.translate(50, 50);
      this.drawBrutalistElement(ctx, el, R, false, true);
      ctx.restore();
      el.imgUrl = c.toDataURL('image/png');
    });
  }

  createSingleThumb(el) {
    const c = document.createElement('canvas');
    c.width = 100; c.height = 100;
    const ctx = c.getContext('2d');
    const R = el.small ? 20 : (el.large ? 38 : 30);
    ctx.translate(50, 50);
    this.drawBrutalistElement(ctx, el, R, false, true);
    return c.toDataURL('image/png');
  }
}