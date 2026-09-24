export function normalizedCrop(value) {
  if (!value || !['x', 'y', 'w', 'h'].every(key => Number.isFinite(Number(value[key])))) return null;
  const x = Math.max(0, Math.min(.95, Number(value.x))), y = Math.max(0, Math.min(.95, Number(value.y)));
  return { x, y, w: Math.max(.05, Math.min(1 - x, Number(value.w))), h: Math.max(.05, Math.min(1 - y, Number(value.h))) };
}

export function imagePresentation(block) {
  const crop = normalizedCrop(block.imageCrop);
  if (crop) return { position: 'absolute', width: `${100 / crop.w}%`, height: `${100 / crop.h}%`, left: `${-100 * crop.x / crop.w}%`, top: `${-100 * crop.y / crop.h}%`, objectFit: 'fill', maxWidth: 'none' };
  return { objectFit: block.fit === 'fill' ? 'fill' : 'contain' };
}

export function mountCropEditor(container, source, initial, onChange) {
  let crop = normalizedCrop(initial) || { x: 0, y: 0, w: 1, h: 1 }, gesture = null;
  const image = document.createElement('img'); image.src = source; image.alt = 'Ảnh gốc'; image.draggable = false;
  const box = document.createElement('div'); box.className = 'st-crop-box';
  const labels = { nw: 'góc trên trái', n: 'cạnh trên', ne: 'góc trên phải', e: 'cạnh phải', se: 'góc dưới phải', s: 'cạnh dưới', sw: 'góc dưới trái', w: 'cạnh trái' };
  box.innerHTML = Object.entries(labels).map(([direction, label]) => `<button type="button" class="st-crop-handle" data-crop-dir="${direction}" aria-label="Cắt ${label}"></button>`).join('');
  container.replaceChildren(image, box);
  function draw() { Object.assign(box.style, { left: crop.x * 100 + '%', top: crop.y * 100 + '%', width: crop.w * 100 + '%', height: crop.h * 100 + '%' }); onChange({ ...crop }); }
  container.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.target.closest('.st-crop-box')) return;
    event.preventDefault(); event.stopPropagation();
    gesture = { x: event.clientX, y: event.clientY, start: { ...crop }, direction: event.target.dataset.cropDir || '' };
    container.setPointerCapture(event.pointerId);
  });
  container.addEventListener('pointermove', event => {
    if (!gesture) return;
    const rect = container.getBoundingClientRect(), dx = (event.clientX - gesture.x) / rect.width, dy = (event.clientY - gesture.y) / rect.height;
    const a = gesture.start, d = gesture.direction;
    crop = { ...a };
    if (!d) { crop.x = Math.max(0, Math.min(1 - a.w, a.x + dx)); crop.y = Math.max(0, Math.min(1 - a.h, a.y + dy)); }
    if (d.includes('e')) crop.w = Math.max(.05, Math.min(1 - a.x, a.w + dx));
    if (d.includes('s')) crop.h = Math.max(.05, Math.min(1 - a.y, a.h + dy));
    if (d.includes('w')) { crop.x = Math.max(0, Math.min(a.x + a.w - .05, a.x + dx)); crop.w = a.x + a.w - crop.x; }
    if (d.includes('n')) { crop.y = Math.max(0, Math.min(a.y + a.h - .05, a.y + dy)); crop.h = a.y + a.h - crop.y; }
    draw();
  });
  container.addEventListener('pointerup', () => { gesture = null; });
  container.addEventListener('pointercancel', () => { gesture = null; });
  container.addEventListener('keydown', event => {
    const d = event.target.dataset.cropDir;
    if (!d || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const dx = event.key === 'ArrowLeft' ? -.01 : event.key === 'ArrowRight' ? .01 : 0;
    const dy = event.key === 'ArrowUp' ? -.01 : event.key === 'ArrowDown' ? .01 : 0;
    if (d.includes('e')) crop.w += dx;
    if (d.includes('s')) crop.h += dy;
    if (d.includes('w')) { crop.x += dx; crop.w -= dx; }
    if (d.includes('n')) { crop.y += dy; crop.h -= dy; }
    crop = normalizedCrop(crop); draw();
  });
  draw();
  return { reset() { crop = { x: 0, y: 0, w: 1, h: 1 }; draw(); } };
}
