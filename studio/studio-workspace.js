// Workspace preferences are deliberately separate from drafts and their revision history.
export function createStudioWorkspace({ root, viewport, getContext }) {
  const $ = selector => root.querySelector(selector);
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const key = 'realness-studio-workspace-v1';
  let mode = 'compact', drawer = '', collapsed = false, expanded = false, selection = '';
  try { const saved = JSON.parse(localStorage.getItem(key) || 'null'); if (['compact', 'full', 'focus'].includes(saved?.mode)) mode = saved.mode; } catch {}
  const narrow = matchMedia('(max-width:850px)');
  const header = $('.st-header'), center = $('.st-center'), rich = $('#st-rich-toolbar');
  const trigger = $('#st-document');
  trigger.removeAttribute('data-act');
  trigger.dataset.workspaceMenu = '';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', 'st-document-menu');
  trigger.title = 'Menu trang đang soạn';
  const modes = document.createElement('div');
  modes.className = 'st-workspace-modes'; modes.setAttribute('role', 'group'); modes.setAttribute('aria-label', 'Không gian làm việc');
  modes.innerHTML = [['full', 'panels-top-left', 'Đầy đủ'], ['compact', 'panel-top-close', 'Gọn'], ['focus', 'maximize', 'Tập trung']].map(([value, symbol, label]) => `<button type="button" data-workspace-mode="${value}" aria-pressed="false" title="${label}">${icon(symbol)}<span>${label}</span></button>`).join('');
  header.insertBefore(modes, $('.st-publish-actions'));
  const menu = document.createElement('div');
  menu.id = 'st-document-menu'; menu.className = 'st-document-menu'; menu.hidden = true;
  menu.setAttribute('aria-label', 'Menu trang đang soạn');
  menu.innerHTML = `<div class="st-menu-title"><strong>Trang đang soạn</strong><button type="button" data-workspace-close-menu aria-label="Đóng menu">${icon('x')}</button></div><div data-menu-slot="create"></div><button type="button" data-act="documents">${icon('files')}Mở bản nháp khác</button><div data-menu-slot="tabs"></div><div data-menu-slot="devices"></div><div data-menu-slot="route"></div>`;
  header.append(menu);
  const relocations = [];
  function relocate(selector, slot) {
    const node = $(selector), marker = document.createComment('workspace home');
    node.before(marker); relocations.push({ node, marker, target: menu.querySelector(`[data-menu-slot="${slot}"]`) });
  }
  relocate('.st-manage-link', 'create'); relocate('.st-create-actions', 'create');
  relocate('.st-header > [data-act="media"]', 'create');
  const media = relocations.at(-1).node;
  media.classList.add('st-menu-media'); media.insertAdjacentHTML('beforeend', '<span>Kho media</span>');
  relocate('.st-devices', 'devices'); relocate('.st-subnav > .st-tabs', 'tabs'); relocate('.st-route', 'route');
  const edges = document.createElement('div'); edges.className = 'st-workspace-edges';
  edges.innerHTML = `<button type="button" data-workspace-drawer="left" aria-expanded="false" aria-controls="st-library-drawer">${icon('panel-left')}Thư viện</button><button type="button" data-workspace-drawer="right" aria-expanded="false" aria-controls="st-properties-drawer">${icon('sliders-horizontal')}Thuộc tính</button>`;
  $('#st-workspace').append(edges);
  const shade = document.createElement('button'); shade.type = 'button'; shade.className = 'st-drawer-shade'; shade.hidden = true;
  shade.setAttribute('aria-label', 'Đóng bảng công cụ'); $('#st-workspace').append(shade);
  for (const [side, id] of [['left', 'st-library-drawer'], ['right', 'st-properties-drawer']]) {
    const aside = $('.st-' + side); aside.id = id;
    const close = document.createElement('button'); close.type = 'button'; close.className = 'st-drawer-close';
    close.dataset.workspaceCloseDrawer = ''; close.setAttribute('aria-label', 'Đóng ' + (side === 'left' ? 'thư viện' : 'thuộc tính')); close.innerHTML = icon('x');
    aside.querySelector('.st-tabs').append(close);
  }
  const reopen = document.createElement('button'); reopen.type = 'button'; reopen.className = 'st-format-reopen'; reopen.dataset.workspaceFormat = 'open';
  reopen.innerHTML = icon('type') + 'Định dạng'; root.append(reopen);
  function closeMenu(restoreFocus = false) { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); if (restoreFocus) trigger.focus(); }
  function setDrawer(value, restoreFocus = false) {
    const previous = drawer; drawer = value; root.dataset.workspaceDrawer = drawer; shade.hidden = !drawer;
    edges.querySelectorAll('button').forEach(b => b.setAttribute('aria-expanded', String(b.dataset.workspaceDrawer === drawer)));
    if (drawer) $('.st-' + drawer).querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
    else if (restoreFocus && previous) edges.querySelector(`[data-workspace-drawer="${previous}"]`)?.focus({ preventScroll: true });
  }
  function position() {
    const rect = center.getBoundingClientRect(), bounds = root.getBoundingClientRect();
    root.style.setProperty('--st-canvas-left', rect.left + 'px');
    root.style.setProperty('--st-canvas-top', rect.top + 'px');
    root.style.setProperty('--st-canvas-width', center.clientWidth + 'px');
    root.style.setProperty('--st-canvas-bottom', rect.bottom + 'px');
    menu.style.top = header.getBoundingClientRect().bottom + 'px';
    menu.style.left = Math.max(bounds.left + 8, Math.min(trigger.getBoundingClientRect().left, bounds.right - Math.min(340, bounds.width - 16) - 8)) + 'px';
  }
  function format() {
    const ctx = getContext(), visible = ctx.text && !ctx.preview && ['design', 'content'].includes(ctx.tab);
    root.dataset.formatCollapsed = String(collapsed);
    root.dataset.formatExpanded = String(expanded);
    rich.hidden = !visible;
    reopen.hidden = !visible || !collapsed;
    if (!rich.querySelector('.st-format-scroll')) {
      const scroll = document.createElement('div'); scroll.className = 'st-format-scroll';
      while (rich.firstChild) scroll.append(rich.firstChild);
      rich.append(scroll);
      const controls = document.createElement('div'); controls.className = 'st-format-controls';
      controls.innerHTML = `<button type="button" data-workspace-format="more" aria-label="Định dạng mở rộng" title="Định dạng mở rộng" aria-expanded="false">${icon('ellipsis')}</button><button type="button" data-workspace-format="close" aria-label="Thu gọn định dạng" title="Thu gọn định dạng">${icon('chevron-up')}</button>`;
      rich.append(controls);
    }
    rich.querySelector('[data-workspace-format="more"]').setAttribute('aria-expanded', String(expanded));
  }
  function layout() {
    root.dataset.workspaceMode = mode;
    root.dataset.workspaceNarrow = String(narrow.matches);
    const condensed = mode !== 'full' || narrow.matches;
    root.dataset.workspaceCondensed = String(condensed);
    for (const { node, marker, target } of relocations) {
      if (condensed) target.append(node); else marker.after(node);
    }
    modes.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.workspaceMode === mode)));
    viewport.setDock(condensed ? 'bottom' : 'top');
    setDrawer(''); closeMenu(); format(); position();
  }
  function update() {
    const ctx = getContext();
    if (selection !== ctx.selected) { selection = ctx.selected; collapsed = false; expanded = false; }
    root.dataset.workspacePreview = String(ctx.preview);
    root.dataset.workspaceTab = ctx.tab;
    trigger.title = 'Menu trang: ' + trigger.textContent;
    format(); position();
  }
  root.addEventListener('pointerdown', event => {
    if (event.target.closest('[data-workspace-format]')) event.preventDefault();
    if (!menu.hidden && !menu.contains(event.target) && !trigger.contains(event.target)) closeMenu();
  });
  root.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (b?.dataset.workspaceMode) {
      viewport.relayout(() => { mode = b.dataset.workspaceMode; layout(); });
      try { localStorage.setItem(key, JSON.stringify({ mode })); } catch {}
    } else if (b?.hasAttribute('data-workspace-menu')) {
      menu.hidden = !menu.hidden; trigger.setAttribute('aria-expanded', String(!menu.hidden)); position();
      if (!menu.hidden) menu.querySelector('a,button[data-act]')?.focus({ preventScroll: true });
    } else if (b?.hasAttribute('data-workspace-close-menu')) closeMenu(true);
    else if (b?.dataset.workspaceDrawer) setDrawer(drawer === b.dataset.workspaceDrawer ? '' : b.dataset.workspaceDrawer, true);
    else if (b?.hasAttribute('data-workspace-close-drawer') || b === shade) setDrawer('', true);
    else if (b?.dataset.workspaceFormat) {
      viewport.relayout(() => {
        if (b.dataset.workspaceFormat === 'more') expanded = !expanded;
        else collapsed = b.dataset.workspaceFormat === 'close';
        format();
      });
    } else if (menu.contains(event.target) && event.target.closest('button,a')) closeMenu();
    if (drawer && event.target.closest('[data-add],[data-select]')) setDrawer('');
  }, true);
  document.addEventListener('keydown', event => {
    const surface = !menu.hidden ? menu : drawer ? $('.st-' + drawer) : null;
    if (event.key === 'Tab' && surface) {
      const items = [...surface.querySelectorAll('a,button,input,textarea,select')].filter(el => !el.disabled && el.getClientRects().length);
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { last?.focus(); event.preventDefault(); }
      else if (!event.shiftKey && document.activeElement === last) { first?.focus(); event.preventDefault(); }
    }
    if (event.key !== 'Escape' || event.defaultPrevented) return;
    if (!menu.hidden) { closeMenu(true); event.preventDefault(); }
    else if (drawer) { setDrawer('', true); event.preventDefault(); }
    // Existing dialogs and crop tools keep their own Escape handling.
    else if (mode === 'focus' && $('#st-panel').hidden && !event.target.closest('input,textarea,select,[contenteditable=true]')) {
      modes.querySelector('[data-workspace-mode="compact"]').click(); event.preventDefault();
    }
  });
  narrow.addEventListener('change', () => viewport.relayout(layout));
  new ResizeObserver(position).observe(center);
  new ResizeObserver(position).observe(header);
  layout();
  return { update };
}
