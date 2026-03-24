// ─── CUBE SHAPES ─────────────────────────────────────────────────────────────
// All functions draw centered at (0,0), already un-rotated by canvasengine.js.
// roundRect helper is passed in from CanvasEngine to avoid duplication.

// ── Internal helpers (not exported) ─────────────────────────────────────────

function drawBase(ctx, R, color, roundRect) {
  const s = R * 1.8;
  ctx.fillStyle = color;
  ctx.beginPath();
  roundRect(ctx, -s / 2, -s / 2, s, s, s * 0.18);
  ctx.fill();
}

function dot(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ── Exported shape map ───────────────────────────────────────────────────────

export const CubeShapes = {

  // Plain
  'cube'(ctx, R, color, _detail, roundRect) {
    drawBase(ctx, R, color, roundRect);
  },

  // Dice
  'cube-dice1'(ctx, R, color, detail, roundRect) {
    const dr = R * 0.18;
    drawBase(ctx, R, color, roundRect);
    dot(ctx, 0, 0, dr, detail);
  },

  'cube-dice2'(ctx, R, color, detail, roundRect) {
    const dr = R * 0.18, h = (R * 1.8) / 2;
    drawBase(ctx, R, color, roundRect);
    dot(ctx, -h * 0.42,  h * 0.42, dr, detail);
    dot(ctx,  h * 0.42, -h * 0.42, dr, detail);
  },

  'cube-dice3'(ctx, R, color, detail, roundRect) {
    const dr = R * 0.18, h = (R * 1.8) / 2;
    drawBase(ctx, R, color, roundRect);
    dot(ctx, -h * 0.42,  h * 0.42, dr, detail);
    dot(ctx,  0,         0,         dr, detail);
    dot(ctx,  h * 0.42, -h * 0.42, dr, detail);
  },

  'cube-dice4'(ctx, R, color, detail, roundRect) {
    const dr = R * 0.18, h = (R * 1.8) / 2;
    drawBase(ctx, R, color, roundRect);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) =>
      dot(ctx, dx * h * 0.38, dy * h * 0.38, dr, detail));
  },

  'cube-dice5'(ctx, R, color, detail, roundRect) {
    const dr = R * 0.18, h = (R * 1.8) / 2;
    drawBase(ctx, R, color, roundRect);
    [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, 0]].forEach(([dx, dy]) =>
      dot(ctx, dx * h * 0.38, dy * h * 0.38, dr, detail));
  },

  'cube-dice6'(ctx, R, color, detail, roundRect) {
    const dr = R * 0.18, h = (R * 1.8) / 2;
    drawBase(ctx, R, color, roundRect);
    [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]].forEach(([dx, dy]) =>
      dot(ctx, dx * h * 0.38, dy * h * 0.38, dr, detail));
  },

  // Heart print
  'cube-heart'(ctx, R, color, detail, roundRect) {
    drawBase(ctx, R, color, roundRect);
    const hr = R * 0.55;
    ctx.fillStyle = detail;
    ctx.beginPath();
    ctx.moveTo(0, hr * 0.3);
    ctx.bezierCurveTo( hr, -hr * 1.2,  hr * 2.2, hr * 0.4, 0,  hr);
    ctx.bezierCurveTo(-hr * 2.2, hr * 0.4, -hr, -hr * 1.2, 0, hr * 0.3);
    ctx.fill();
  },

  // Star print
  'cube-star'(ctx, R, color, detail, roundRect) {
    drawBase(ctx, R, color, roundRect);
    const sr = R * 0.6;
    ctx.fillStyle = detail;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? sr : sr * 0.44;
      ctx.lineTo(
        Math.cos(i * Math.PI / 5 - Math.PI / 2) * rad,
        Math.sin(i * Math.PI / 5 - Math.PI / 2) * rad
      );
    }
    ctx.closePath();
    ctx.fill();
  },

  // Checkered
  'cube-checker'(ctx, R, color, detail, roundRect) {
    const s = R * 1.8, cs = s / 4;
    drawBase(ctx, R, color, roundRect);
    ctx.fillStyle = detail;
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, -s / 2, -s / 2, s, s, s * 0.18);
    ctx.clip();
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if ((row + col) % 2 === 0) {
          ctx.fillRect(-s / 2 + col * cs, -s / 2 + row * cs, cs, cs);
        }
      }
    }
    ctx.restore();
  },

  // Smiley
  'cube-smile'(ctx, R, color, detail, roundRect) {
    drawBase(ctx, R, color, roundRect);
    ctx.strokeStyle = detail;
    ctx.lineWidth   = R * 0.14;
    ctx.lineCap     = 'round';
    dot(ctx, -R * 0.35, -R * 0.2, R * 0.13, detail);
    dot(ctx,  R * 0.35, -R * 0.2, R * 0.13, detail);
    ctx.beginPath();
    ctx.arc(0, R * 0.1, R * 0.38, 0.2, Math.PI - 0.2);
    ctx.stroke();
  },
};