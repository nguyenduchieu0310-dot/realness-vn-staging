const text = value => typeof value === 'string' ? value.normalize('NFC').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/gu, ' ').trim() : '';
const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const placeholder = value => /^(?:nội dung mới của bạn\.?|bắt đầu viết bài tại đây\.?|nhập nội dung và định dạng như trong word\.?|văn bản mới|trang dự án mới\d*|bài viết mới\d*)$/iu.test(text(value));
const useful = value => text(value) && !placeholder(value);

export function shortenSeo(value, limit) {
  const chars = Array.from(text(value));
  if (chars.length <= limit) return chars.join('');
  const prefix = chars.slice(0, limit - 1).join('');
  const boundary = prefix.lastIndexOf(' ');
  return (boundary > limit / 2 ? prefix.slice(0, boundary) : prefix).replace(/[ ,;:.-]+$/u, '') + '…';
}

export function seoImages(doc) {
  const images = [];
  const add = id => { if (uuid(id) && !images.includes(id)) images.push(id); };
  for (const block of orderedBlocks(doc)) {
    if (['image', 'location'].includes(block.type)) add(block.media);
    if (block.type === 'gallery' && Array.isArray(block.images)) block.images.forEach(add);
    if (block.type === 'video') add(block.posterMedia);
  }
  return images;
}

function orderedBlocks(doc) {
  const blocks = (Array.isArray(doc?.blocks) ? doc.blocks : []).filter(Boolean);
  // A wholly free-positioned page is read visually, not in insertion order.
  return blocks.length && blocks.every(block => block.free) ? [...blocks].sort((a, b) => a.free.y - b.free.y || a.free.x - b.free.x) : blocks;
}

export function seoContent(doc) {
  const headings = [], paragraphs = [];
  const add = (target, value) => { const clean = text(value); if (useful(clean) && !target.includes(clean)) target.push(clean); };
  for (const block of orderedBlocks(doc)) {
    if (block.type === 'text') {
      let line = '';
      for (const op of Array.isArray(block.ops) ? block.ops : []) {
        if (typeof op?.insert !== 'string') continue;
        const parts = op.insert.split('\n');
        parts.forEach((part, index) => {
          line += part;
          if (index < parts.length - 1) { add(op.attributes?.header ? headings : paragraphs, line); line = ''; }
        });
      }
      add(paragraphs, line);
    } else if (block.type === 'overview') {
      add(headings, block.title); add(paragraphs, block.intro);
      for (const fact of Array.isArray(block.facts) ? block.facts : []) if (Array.isArray(fact)) add(paragraphs, [fact[0], fact[1]].filter(value => typeof value === 'string').join(': '));
    } else if (block.type === 'location') {
      add(headings, block.title); add(paragraphs, block.body);
    } else if (block.type === 'faq') {
      add(headings, block.question); add(paragraphs, block.answer);
    } else if (['gallery', 'video', 'table'].includes(block.type)) {
      add(headings, block.title);
      if (block.type === 'video') add(paragraphs, block.caption);
      if (block.type === 'table') for (const row of Array.isArray(block.rows) ? block.rows : []) if (Array.isArray(row)) add(paragraphs, row.filter(value => typeof value === 'string').join(' · '));
    } else if (block.type === 'image' && block.showCaption) add(paragraphs, block.caption);
  }
  return { headings, paragraphs };
}

export function generateSeo(doc) {
  const { headings, paragraphs } = seoContent(doc);
  const title = useful(doc.title) ? text(doc.title) : headings[0] || '';
  const base = title.replace(/\s*\|\s*REALNESS$/iu, '');
  return {
    title: base ? shortenSeo(base, 49) + ' | REALNESS' : '',
    description: shortenSeo(paragraphs.join(' ') || headings.slice(1).join(' '), 160),
  };
}

export function initializeSeo(doc, auto = false) {
  if (!doc.seo) doc.seo = { auto, title: text(doc.title), description: text(doc.description), manual: { title: false, description: Boolean(text(doc.description)) } };
  return doc.seo;
}

export function refreshSeo(doc) {
  const seo = initializeSeo(doc), generated = generateSeo(doc);
  for (const key of ['title', 'description']) if (!seo.manual?.[key]) seo[key] = generated[key];
  return seo;
}

export function resolvedSeo(doc) {
  const images = seoImages(doc);
  return {
    title: text(doc.seo?.title ?? doc.title),
    description: text(doc.seo?.description ?? doc.description),
    imageMedia: images.includes(doc.seo?.imageMedia) ? doc.seo.imageMedia : images[0] || '',
  };
}

export function seoWarnings(doc) {
  const meta = resolvedSeo(doc), warnings = [];
  if (!meta.title || placeholder(meta.title)) warnings.push('Chưa có tiêu đề tìm kiếm rõ ràng.');
  else if (Array.from(meta.title).length > 60) warnings.push('Tiêu đề dài hơn 60 ký tự, có thể bị rút gọn khi hiển thị.');
  if (!meta.description) warnings.push('Chưa có đoạn văn để tạo mô tả.');
  else if (Array.from(meta.description).length > 160) warnings.push('Mô tả dài hơn 160 ký tự, có thể bị rút gọn khi hiển thị.');
  if (!meta.imageMedia) warnings.push('Chưa có ảnh trong bài được lưu vào kho media.');
  return warnings;
}

export function validSeo(seo) {
  if (seo === undefined) return true;
  if (!seo || typeof seo !== 'object' || Array.isArray(seo)) return false;
  return typeof seo.auto === 'boolean' && typeof seo.title === 'string' && seo.title.length <= 180 &&
    typeof seo.description === 'string' && seo.description.length <= 800 &&
    (seo.imageMedia === undefined || seo.imageMedia === '' || uuid(seo.imageMedia)) &&
    (seo.manual === undefined || seo.manual && typeof seo.manual === 'object' && !Array.isArray(seo.manual) &&
      Object.entries(seo.manual).every(([key, value]) => ['title', 'description'].includes(key) && typeof value === 'boolean'));
}

export function publicationSeo(publication, { siteOrigin, mediaOrigin, indexable = false }) {
  const doc = publication.content, seo = resolvedSeo(doc);
  const origin = new URL(siteOrigin).origin;
  const url = `${origin}/${publication.kind === 'post' ? 'bai-viet' : 'du-an'}/?slug=${encodeURIComponent(publication.slug)}`;
  const title = doc.seo ? seo.title || text(publication.title) : text(publication.title).replace(/\s*\|\s*REALNESS$/iu, '') + ' | REALNESS';
  const image = seo.imageMedia ? new URL('/api/public/media/' + seo.imageMedia, mediaOrigin).href : '';
  const meta = {
    description: seo.description,
    robots: indexable ? 'index,follow,max-image-preview:large' : 'noindex,nofollow',
    'og:title': title, 'og:description': seo.description, 'og:type': publication.kind === 'post' ? 'article' : 'website',
    'og:url': url, 'og:site_name': 'REALNESS', 'og:locale': 'vi_VN',
    'twitter:card': image ? 'summary_large_image' : 'summary', 'twitter:title': title, 'twitter:description': seo.description,
  };
  if (image) { meta['og:image'] = image; meta['twitter:image'] = image; }
  const structuredData = {
    '@context': 'https://schema.org', '@type': publication.kind === 'post' ? 'Article' : 'WebPage',
    '@id': url, url, name: title, description: seo.description, inLanguage: 'vi-VN',
    ...(publication.kind === 'post' ? { headline: title, mainEntityOfPage: url } : {}),
    ...(image ? { image: [image] } : {}),
  };
  for (const [key, value] of [['datePublished', publication.publishedAt], ['dateModified', publication.updatedAt]]) {
    // SQLite timestamps are UTC, even though they omit a timezone suffix.
    const iso = typeof value === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) ? value.replace(' ', 'T') + 'Z' : value;
    if (iso && Number.isFinite(Date.parse(iso))) structuredData[key] = new Date(iso).toISOString();
  }
  return { title, canonical: url, meta, structuredData };
}

export function applySeoHead(headDocument, metadata) {
  const undo = [], previousTitle = headDocument.title;
  headDocument.title = metadata.title;
  const set = (selector, create, attribute, value) => {
    const matches = [...headDocument.head.querySelectorAll(selector)];
    const node = matches.shift() || create();
    const previous = node.getAttribute(attribute), existed = Boolean(node.parentNode);
    matches.forEach(extra => { const next = extra.nextSibling; extra.remove(); undo.push(() => headDocument.head.insertBefore(extra, next?.parentNode ? next : null)); });
    node.setAttribute(attribute, value);
    if (!existed) headDocument.head.append(node);
    undo.push(() => { if (!existed) node.remove(); else if (previous === null) node.removeAttribute(attribute); else node.setAttribute(attribute, previous); });
  };
  for (const [key, value] of Object.entries(metadata.meta)) {
    const attr = key.startsWith('og:') ? 'property' : 'name';
    set(`meta[${attr}="${key}"]`, () => { const node = headDocument.createElement('meta'); node.setAttribute(attr, key); return node; }, 'content', value);
  }
  for (const [attr, key] of [['property', 'og:image'], ['name', 'twitter:image']]) {
    if (metadata.meta[key]) continue;
    headDocument.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach(node => {
      const next = node.nextSibling; node.remove();
      undo.push(() => headDocument.head.insertBefore(node, next?.parentNode ? next : null));
    });
  }
  set('link[rel="canonical"]', () => { const node = headDocument.createElement('link'); node.rel = 'canonical'; return node; }, 'href', metadata.canonical);
  const schema = headDocument.createElement('script');
  schema.type = 'application/ld+json'; schema.dataset.studioSeo = 'true';
  schema.textContent = JSON.stringify(metadata.structuredData).replace(/</g, '\\u003c');
  headDocument.head.append(schema);
  return () => { schema.remove(); undo.reverse().forEach(restore => restore()); headDocument.title = previousTitle; };
}
