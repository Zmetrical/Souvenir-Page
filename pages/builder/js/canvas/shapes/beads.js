// ─── BEAD SHAPES ─────────────────────────────────────────────────────────────
// Each function receives (ctx, R, color, detail) and draws centered at (0,0).
// canvasengine.js dispatches here after translate/rotate.

export const BeadShapes = {

  round(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();
  },

  ellipse(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, R * 1.55, R * 0.78, 0, 0, Math.PI * 2);
    ctx.fill();
  },

  tube(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, R * 0.7, R * 1.58, 0, 0, Math.PI * 2);
    ctx.fill();
  },

  pearl(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();
  },

  faceted(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(Math.cos(i * Math.PI / 3) * R, Math.sin(i * Math.PI / 3) * R);
    }
    ctx.closePath();
    ctx.fill();
  },

  heart(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, R * 0.3);
    ctx.bezierCurveTo( R, -R * 1.2,  R * 2.2, R * 0.4, 0,  R);
    ctx.bezierCurveTo(-R * 2.2, R * 0.4, -R, -R * 1.2, 0, R * 0.3);
    ctx.fill();
  },

  star(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? R : R * 0.44;
      ctx.lineTo(
        Math.cos(i * Math.PI / 5 - Math.PI / 2) * rad,
        Math.sin(i * Math.PI / 5 - Math.PI / 2) * rad
      );
    }
    ctx.closePath();
    ctx.fill();
  },

  moon(ctx, R, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, R, Math.PI * 0.15, Math.PI * 1.85, true);
    ctx.quadraticCurveTo(
      -R * 0.4, 0,
      Math.cos(Math.PI * 0.15) * R,
      Math.sin(Math.PI * 0.15) * R
    );
    ctx.fill();
  },

  flower(ctx, R, color, detail) {
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5;
      ctx.save();
      ctx.translate(Math.cos(a) * R * 0.56, Math.sin(a) * R * 0.56);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.48, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = detail;
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.34, 0, Math.PI * 2);
    ctx.fill();
  },

  rainbow(ctx, R) {
    const stripes = ['#FFB3C6', '#FFCF8B', '#FFF4A3', '#B5EDCA', '#B3D9FF', '#D9C0F5'];
    stripes.forEach((col, idx) => {
      const oR = R * (1 - idx * 0.12);
      const iR = oR - R * 0.10;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(0, R * 0.15, oR, Math.PI, 0);
      ctx.arc(0, R * 0.15, iR, 0, Math.PI, true);
      ctx.closePath();
      ctx.fill();
    });
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, R * 0.15, R * 0.20, Math.PI, 0);
    ctx.arc(0, R * 0.35, R * 0.32, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
  },

  bow(ctx, R, color, detail) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-R * 1.4, -R * 0.9, -R * 1.6, R * 0.4, -R * 0.2, R * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo( R * 1.4, -R * 0.9,  R * 1.6, R * 0.4,  R * 0.2, R * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = detail;
    ctx.beginPath();
    ctx.arc(0, R * 0.06, R * 0.3, 0, Math.PI * 2);
    ctx.fill();
  },

  butterfly(ctx, R, color, detail, lightenFn) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.ellipse(-R * .7, -R * .32, R * .7, R * .52, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( R * .7, -R * .32, R * .7, R * .52,  0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = lightenFn(color, 0.18);
    ctx.beginPath(); ctx.ellipse(-R * .52, R * .3, R * .48, R * .36,  0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( R * .52, R * .3, R * .48, R * .36, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = detail;
    ctx.beginPath(); ctx.ellipse(0, 0, R * 0.17, R * 0.78, 0, 0, Math.PI * 2); ctx.fill();
  },
};