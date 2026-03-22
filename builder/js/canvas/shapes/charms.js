// ─── IMAGE-BASED CHARM DRAWING ───────────────────────────────────────────────
// Handles useImg elements — the ring at the top + the figure image below it.
// Called by canvasengine.js drawElement() when el.useImg === true.

export function drawImageElement(ctx, el, R, isSelected, imageCache, scaledCache) {
  const source = scaledCache.get(el.imgSrc) || imageCache.get(el.imgSrc);
  const D = 100;

  if (!source) {
    ctx.fillStyle = '#F7A8C8';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('✿', -10, 0);
    return;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Un-rotate so the image stays upright regardless of strand angle
  const tf = ctx.getTransform();
  ctx.rotate(-Math.atan2(tf.b, tf.a));

  const ringR = 8;

  ctx.save();

  if (isSelected) {
    ctx.strokeStyle = '#F7A8C8';
    ctx.lineWidth   = 2;
    ctx.setLineDash([3, 2]);
    ctx.beginPath();
    ctx.arc(0, 0, ringR + 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Top ring
  ctx.strokeStyle = '#F7A8C8';
  ctx.lineWidth   = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, ringR, 0, Math.PI * 2);
  ctx.stroke();

  // Figure image hanging below ring
  ctx.drawImage(source, -D / 2, ringR, D, D);

  ctx.restore();
}