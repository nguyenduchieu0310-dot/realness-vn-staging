// Only a click/tap that starts and ends on the canvas background clears selection.
export function bindCanvasDeselection({ root, center, isEnabled, onClear }) {
  const blank = target => target instanceof Element && target.matches(
    '.st-center,#st-page-wrap,#st-canvas-space,#st-page,#st-blocks,.st-flow-placeholder,.st-blank'
  );
  let press = null;
  root.ownerDocument.addEventListener('pointerdown', event => {
    press = null;
    if (event.button !== 0 || !event.isPrimary || !isEnabled() || !root.contains(event.target) || !blank(event.target)) return;
    // Ignore scrollbar presses, including clicks in the viewport's scrollbar gutter.
    const rect = center.getBoundingClientRect();
    if (event.clientX >= rect.left + center.clientWidth || event.clientY >= rect.top + center.clientHeight) return;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  }, true);
  root.ownerDocument.addEventListener('pointermove', event => {
    if (press && (event.pointerId !== press.id || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 5)) press.moved = true;
  }, true);
  root.ownerDocument.addEventListener('pointercancel', () => { press = null; }, true);
  root.ownerDocument.addEventListener('pointerup', event => {
    if (press && (event.pointerId !== press.id || !blank(event.target))) press = null;
  }, true);
  center.addEventListener('scroll', () => { if (press) press.moved = true; }, { passive: true });
  center.addEventListener('wheel', () => { press = null; }, { passive: true });
  window.addEventListener('blur', () => { press = null; });
  root.addEventListener('click', event => {
    const start = press;
    press = null;
    if (!start || start.moved || event.defaultPrevented || !isEnabled() || !blank(event.target)) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
    onClear();
  });
}
