// A document's coordinate system is independent of editor panels and camera zoom.
export function canvasWidth(document) {
  const explicit = Number(document.canvasWidth);
  if (Number.isFinite(explicit) && explicit >= 640 && explicit <= 1440) return explicit;
  const fallback = Math.max(640, Math.min(1440, Number(document.maxWidth) || 1200));
  const blocks = document.blocks || [];
  // Older free-layout documents saved screen-sized coordinates but no canvas width.
  // Recover only populated, entirely free layouts; flow layouts retain their page width.
  if (blocks.length < 2 || document.nav || blocks.some(block => !block.free)) return fallback;
  const bounds = blocks.map(({ free }) => ({ left: Number(free.x), right: Number(free.x) + Number(free.w) }));
  if (bounds.some(({ left, right }) => !Number.isFinite(left) || !Number.isFinite(right) || left < 0 || right <= left)) return fallback;
  const right = Math.max(...bounds.map(bound => bound.right));
  if (right < 640 || right > fallback) return fallback;
  return Math.min(fallback, Math.max(640, Math.ceil(right + Math.min(...bounds.map(bound => bound.left)))));
}
