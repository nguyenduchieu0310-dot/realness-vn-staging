export function mountCarousel(element, { autoplay = true, seconds = 4, interactive = true } = {}) {
  const track = element.querySelector('[data-carousel-track]');
  if (!track) return () => {};
  const count = track.children.length;
  let index = 0, timer, hovered = false, focused = false, visible = true, paused = !autoplay, swipe = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function schedule() {
    clearInterval(timer);
    if (!interactive || paused || hovered || focused || !visible || document.hidden || reduced.matches || count < 2) return;
    timer = setInterval(() => go(index + 1), Math.max(2, Math.min(15, Number(seconds) || 4)) * 1000);
  }
  function go(next) {
    index = (next + count) % Math.max(count, 1);
    track.style.transform = `translateX(-${index * 100}%)`;
    element.querySelectorAll('[data-carousel-index]').forEach(dot => dot.setAttribute('aria-pressed', String(Number(dot.dataset.carouselIndex) === index)));
    const counter = element.querySelector('[data-carousel-count]');
    if (counter) counter.textContent = `${count ? index + 1 : 0} / ${count}`;
  }
  const click = event => {
    if (!interactive) return;
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.carouselStep) go(index + Number(button.dataset.carouselStep));
    if (button.dataset.carouselIndex !== undefined) go(Number(button.dataset.carouselIndex));
    if (button.hasAttribute('data-carousel-pause')) { paused = !paused; button.setAttribute('aria-pressed', String(paused)); button.setAttribute('aria-label', paused ? 'Tiếp tục trình chiếu' : 'Tạm dừng trình chiếu'); }
    schedule();
  };
  const down = event => { if (interactive && event.button === 0 && !event.target.closest('button')) swipe = { x: event.clientX, y: event.clientY }; };
  const up = event => { if (swipe) { const dx = event.clientX - swipe.x, dy = event.clientY - swipe.y; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(index + (dx < 0 ? 1 : -1)); schedule(); } swipe = null; } };
  const enter = () => { hovered = true; schedule(); }, leave = () => { hovered = false; schedule(); };
  const focus = () => { focused = true; schedule(); }, blur = event => { focused = element.contains(event.relatedTarget); schedule(); };
  element.addEventListener('click', click); element.addEventListener('pointerdown', down); element.addEventListener('pointerup', up);
  element.addEventListener('mouseenter', enter); element.addEventListener('mouseleave', leave);
  element.addEventListener('focusin', focus); element.addEventListener('focusout', blur);
  document.addEventListener('visibilitychange', schedule); reduced.addEventListener('change', schedule);
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }); observer.observe(element);
  go(0); schedule();
  return () => {
    clearInterval(timer); observer.disconnect(); document.removeEventListener('visibilitychange', schedule); reduced.removeEventListener('change', schedule);
    element.removeEventListener('click', click); element.removeEventListener('pointerdown', down); element.removeEventListener('pointerup', up);
    element.removeEventListener('mouseenter', enter); element.removeEventListener('mouseleave', leave); element.removeEventListener('focusin', focus); element.removeEventListener('focusout', blur);
  };
}
