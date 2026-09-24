// The camera belongs to the editor, never to the saved document.
export function createStudioViewport({ root, page, center, getDocument, getSelection, getKey, isPreview }) {
  const space = document.createElement('div');
  space.id = 'st-canvas-space';
  page.before(space);
  space.append(page);
  const toolbar = document.createElement('div');
  toolbar.className = 'st-view-tools';
  toolbar.setAttribute('role', 'toolbar');
  toolbar.setAttribute('aria-label', 'Góc nhìn thiết kế');
  toolbar.innerHTML = `<div class="st-view-modes"><button type="button" data-view-tool="select" aria-pressed="true"><i data-lucide="mouse-pointer-2"></i>Chọn</button><button type="button" data-view-tool="pan" aria-pressed="false" title="Bàn tay · Giữ Space để dùng tạm"><i data-lucide="hand"></i>Bàn tay</button></div><div class="st-view-zoom"><button type="button" data-view-action="out" aria-label="Thu nhỏ"><i data-lucide="minus"></i></button><label><input id="st-view-zoom" type="number" min="1" max="400" value="100" aria-label="Tỷ lệ thu phóng"><span>%</span></label><button type="button" data-view-action="in" aria-label="Phóng to"><i data-lucide="plus"></i></button></div><div class="st-view-fit"><button type="button" data-view-action="width"><i data-lucide="fold-horizontal"></i>Vừa ngang</button><button type="button" data-view-action="all"><i data-lucide="scan"></i>Toàn cảnh</button><button type="button" data-view-action="focus" aria-label="Về vùng đang soạn" title="Về vùng đang soạn"><i data-lucide="focus"></i></button></div>`;
  center.prepend(toolbar);
  let zoom = 1, tool = 'select', spaceDown = false, pan = null, key = '', padX = 0, padY = 0, initialized = false;
  let lastWidth = 0, lastHeight = 0, previewWas = false, resume = null, saveTimer;
  const editable = target => target?.closest('input,textarea,select,[contenteditable=true],.ql-editor');
  const cameraKey = () => 'realness-studio-view:' + getKey();
  const save = () => {
    if (isPreview()) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { sessionStorage.setItem(cameraKey(), JSON.stringify({ zoom, left: center.scrollLeft, top: center.scrollTop, padX, padY })); } catch {}
    }, 150);
  };
  function sync() {
    if (!center.clientWidth || page.closest('[hidden]')) return;
    const available = Math.max(220, center.clientWidth - 40);
    const width = Math.min(available, page.dataset.device === 'mobile' ? 375 : page.dataset.device === 'tablet' ? 620 : Number(getDocument().maxWidth) || 1200);
    page.style.width = width + 'px';
    page.style.maxWidth = 'none';
    page.style.margin = '0';
    const height = page.offsetHeight;
    const left = padX + Math.max(0, (available - width * zoom) / 2);
    space.style.width = Math.max(available, width * zoom) + padX * 2 + 'px';
    space.style.height = Math.ceil(height * zoom + padY + 60) + 'px';
    page.style.left = left + 'px';
    page.style.top = padY + 'px';
    page.style.transform = `scale(${zoom})`;
    root.style.setProperty('--st-inverse-zoom', String(1 / zoom));
    root.style.setProperty('--st-viewtools-height', toolbar.offsetHeight + 'px');
    root.dataset.viewTool = tool === 'pan' || spaceDown ? 'pan' : 'select';
    toolbar.querySelector('#st-view-zoom').value = String(Math.round(zoom * 100));
    toolbar.querySelectorAll('[data-view-tool]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.viewTool === root.dataset.viewTool)));
    toolbar.style.width = Math.max(220, center.clientWidth - 40) + 'px';
    lastWidth = width; lastHeight = height;
  }
  function anchor() {
    const rect = center.getBoundingClientRect();
    return { x: rect.left + center.clientWidth / 2, y: rect.top + toolbar.offsetHeight + (center.clientHeight - toolbar.offsetHeight) / 2 };
  }
  function setZoom(value, point = anchor()) {
    const rect = page.getBoundingClientRect();
    const local = { x: (point.x - rect.left) / zoom, y: (point.y - rect.top) / zoom };
    zoom = Math.max(.01, Math.min(4, Number(value) || 1));
    sync();
    const next = page.getBoundingClientRect();
    center.scrollLeft += next.left + local.x * zoom - point.x;
    center.scrollTop += next.top + local.y * zoom - point.y;
    save();
  }
  function fit(all = false) {
    const available = center.clientWidth - 40;
    const room = Math.max(100, center.clientHeight - toolbar.offsetHeight - 40);
    const value = all ? Math.min(available / lastWidth, room / Math.max(lastHeight, 1)) : available / lastWidth;
    setZoom(value);
    if (all) { center.scrollTop = 0; center.scrollLeft = 0; padX = 0; padY = 0; sync(); }
    save();
  }
  function focus() {
    const selected = getSelection();
    if (!selected) return;
    const rect = selected.getBoundingClientRect(), host = center.getBoundingClientRect();
    center.scrollLeft += rect.left + rect.width / 2 - host.left - center.clientWidth / 2;
    center.scrollTop += rect.top - host.top - toolbar.offsetHeight - 65;
    save();
  }
  toolbar.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.viewTool) { tool = button.dataset.viewTool; spaceDown = false; sync(); }
    const action = button.dataset.viewAction;
    if (action === 'in') setZoom(zoom + .1);
    if (action === 'out') setZoom(zoom - .1);
    if (action === 'width') fit();
    if (action === 'all') fit(true);
    if (action === 'focus') focus();
  });
  toolbar.querySelector('input').addEventListener('change', event => setZoom(Number(event.target.value) / 100));
  center.addEventListener('wheel', event => {
    if (!event.ctrlKey && !event.metaKey) return;
    if (event.target.closest('.st-view-tools,.st-rich-toolbar')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    setZoom(zoom * Math.exp(-event.deltaY * .002), { x: event.clientX, y: event.clientY });
  }, { passive: false, capture: true });
  root.addEventListener('pointerdown', event => {
    if (event.button !== 0 || isPreview() || !(tool === 'pan' || spaceDown) || !event.target.closest('#st-canvas-space')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    // Add camera-only breathing room before panning, preserving the exact screen position.
    padX += 400; padY += 400; sync(); center.scrollLeft += 400; center.scrollTop += 400;
    pan = { x: event.clientX, y: event.clientY, left: center.scrollLeft, top: center.scrollTop };
    center.setPointerCapture(event.pointerId); root.classList.add('st-panning');
  }, true);
  root.addEventListener('pointermove', event => {
    if (!pan) return;
    event.preventDefault(); event.stopImmediatePropagation();
    center.scrollLeft = pan.left + pan.x - event.clientX;
    center.scrollTop = pan.top + pan.y - event.clientY;
  }, true);
  const finish = () => { pan = null; root.classList.remove('st-panning'); save(); };
  root.addEventListener('pointerup', finish, true);
  root.addEventListener('pointercancel', finish, true);
  root.addEventListener('click', event => {
    if ((tool === 'pan' || spaceDown) && !isPreview() && event.target.closest('#st-canvas-space')) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  root.addEventListener('dragstart', event => {
    if ((tool === 'pan' || spaceDown) && event.target.closest('#st-canvas-space')) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('keydown', event => {
    if (event.code !== 'Space' || editable(event.target) || isPreview() || !root.contains(document.activeElement) && document.activeElement !== document.body) return;
    event.preventDefault(); spaceDown = true; sync();
  });
  document.addEventListener('keyup', event => { if (event.code === 'Space') { spaceDown = false; sync(); } });
  window.addEventListener('blur', () => { spaceDown = false; finish(); sync(); });
  center.addEventListener('scroll', save, { passive: true });
  new ResizeObserver(sync).observe(page);
  new ResizeObserver(sync).observe(center);
  function update() {
    const nextKey = getKey();
    if (key !== nextKey || !initialized) {
      key = nextKey; initialized = true; padX = 0; padY = 0; zoom = 1; center.scrollTop = 0; center.scrollLeft = 0;
      try { const old = JSON.parse(sessionStorage.getItem(cameraKey()) || 'null'); if (old) { zoom = Math.max(.01, Math.min(4, old.zoom || 1)); padX = old.padX || 0; padY = old.padY || 0; sync(); center.scrollTop = old.top || 0; center.scrollLeft = old.left || 0; } } catch {}
    }
    if (previewWas !== isPreview()) {
      if (isPreview()) { resume = { zoom, padX, padY, top: center.scrollTop, left: center.scrollLeft }; zoom = 1; padX = 0; padY = 0; }
      else if (resume) { ({ zoom, padX, padY } = resume); sync(); center.scrollTop = resume.top; center.scrollLeft = resume.left; }
      previewWas = isPreview();
    }
    toolbar.hidden = isPreview() || !!page.closest('[hidden]');
    sync();
  }
  return { scale: () => zoom, sync, update, focus, point(clientX, clientY, element = page) { const rect = element.getBoundingClientRect(); return { x: (clientX - rect.left) / zoom, y: (clientY - rect.top) / zoom }; }, anchor, isPanning: () => tool === 'pan' || spaceDown };
}
