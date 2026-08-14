#!/usr/bin/env node
/**
 * Static site builder for Gopher the Gold Productions.
 *
 * Reads content from /data/*.json and writes plain static HTML into the
 * repo root (index.html, funding.html, scripts/*.html) so GitHub Pages can
 * serve it directly with no server-side build step.
 *
 * Usage: node build.js
 * Re-run after editing data/scripts.json or data/funded-projects.json,
 * then commit the regenerated HTML.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = {
  name: 'Gopher the Gold Productions',
  email: 'contact@gopherthegold.com',
  year: 2026,
  write7in7Url: 'https://write7in7.com',
};

// Toggle the "completed projects" section on the funding page. Flip back to
// true once there's a first finished project to show — content stays in
// data/funded-projects.json (funded.completed) either way.
const SHOW_COMPLETED = false;

// Toggle the homepage's "From the archive" section — flip back to true once
// the first script is complete. Content stays in data/scripts.json either way.
const SHOW_ARCHIVE = false;

const scripts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/scripts.json'), 'utf8'));
const funded = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/funded-projects.json'), 'utf8'));

const writersRoom = scripts.filter((s) => s.section === 'writers-room');
const archive = scripts.filter((s) => s.section === 'archive');

// ---------- helpers ----------

const esc = (str) =>
  String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

function thumb(imgSrc, label) {
  if (imgSrc) return `<div class="thumb"><img src="${esc(imgSrc)}" alt=""></div>`;
  return `<div class="thumb"><span class="thumb-label">${esc(label)}</span></div>`;
}

function externalLinkAttrs(url) {
  return url ? ` href="${esc(url)}" target="_blank" rel="noopener"` : ' href="#" aria-disabled="true"';
}

function linkLabel(url, label) {
  return url ? `${label} →` : `${label} — coming soon`;
}

// ---------- shared chrome ----------

function head(title, description, depth) {
  const prefix = depth ? '../' : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="icon" href="${prefix}assets/logo.png">
<link rel="stylesheet" href="${prefix}css/style.css">
</head>
<body>`;
}

function header(depth) {
  const prefix = depth ? '../' : '';
  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${prefix}index.html" aria-label="${esc(SITE.name)} home">
      <img src="${prefix}assets/logo-white.svg" alt="${esc(SITE.name)}">
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>
    <nav aria-label="Primary">
      <ul class="main-nav" id="main-nav">
        <li><a${externalLinkAttrs(SITE.write7in7Url)}>Compete</a></li>
        <li><a href="${prefix}index.html#writers-room">Watch</a></li>
        <li><a href="${prefix}funding.html">Fund</a></li>
        <li><a href="${prefix}about.html">About</a></li>
        <li><a href="${prefix}contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function footer(depth) {
  const prefix = depth ? '../' : '';
  return `<footer class="site-footer">
  <div class="wrap">
    <span><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></span>
    <span>© ${SITE.year} ${esc(SITE.name)}. All rights reserved.</span>
  </div>
</footer>
<script src="${prefix}js/main.js"></script>
</body>
</html>`;
}

// ---------- homepage ----------

function scriptCard(s) {
  return `<a class="card" href="scripts/${esc(s.slug)}.html">
  ${thumb(s.poster, 'media placeholder')}
  <div class="card-title">&ldquo;${esc(s.title)}&rdquo;</div>
  <div class="eyebrow card-status">status: ${esc(s.status)}</div>
  <div class="card-link">learn more →</div>
</a>`;
}

function archiveItem(s) {
  return `<a class="archive-item" href="scripts/${esc(s.slug)}.html">
  ${thumb(s.poster, 'media placeholder')}
  <div class="card-title">&ldquo;${esc(s.title)}&rdquo;${s.year ? ` · ${s.year}` : ''}</div>
  <div class="card-link">learn more →</div>
</a>`;
}

function buildHomepage() {
  const html = `${head(
    `${SITE.name} — Gopher creativity.`,
    'Gopher the Gold Productions gives people more chances to create: a writing competition, original scripts in development, and funding for other creative projects.',
    false
  )}
${header(false)}

<section class="hero">
  <div class="hero-art">
    <img src="assets/logo.png" alt="${esc(SITE.name)} logo">
  </div>
  <div class="hero-copy">
    <h1>Gopher creativity.</h1>
    <p class="tagline">Whatever form, we dig it.</p>
  </div>
</section>

<section class="section" id="writers-room">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">tunneling through</div>
      <h2>In the Writers&rsquo; Room</h2>
    </div>
    <div class="grid grid--writers-room">
      ${writersRoom.map(scriptCard).join('\n      ')}
    </div>
  </div>
</section>

${SHOW_ARCHIVE ? `<section class="section section--archive">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">gold</div>
      <h2>From the archive</h2>
    </div>
    <div class="grid grid--archive">
      ${archive.map(archiveItem).join('\n      ')}
    </div>
  </div>
</section>` : ''}

<section class="promo">
  <div class="wrap">
    <a class="promo-item"${externalLinkAttrs(SITE.write7in7Url)}>
      <div class="eyebrow">write 7 in 7</div>
      <div class="promo-headline">${SITE.write7in7Url ? 'start writing already ↗' : 'start writing already — coming soon'}</div>
    </a>
    <a class="promo-item" href="funding.html">
      <div class="eyebrow">projects we&rsquo;re funding</div>
      <div class="promo-headline">cool stuff we dig ↗</div>
    </a>
  </div>
</section>

${footer(false)}`;
  fs.writeFileSync(path.join(ROOT, 'index.html'), html);
}

// ---------- script detail pages ----------

function creditRow(label, value) {
  if (!value) return '';
  return `<div class="credit-row"><span class="eyebrow">${esc(label)}</span><span class="value">${esc(value)}</span></div>`;
}

function buildScriptPage(s) {
  const mediaBlock = s.embedUrl
    ? `<div class="media-placeholder"><iframe src="${esc(s.embedUrl)}" allowfullscreen title="${esc(s.title)}"></iframe></div>`
    : s.scriptUrl
      ? `<div class="media-placeholder"><a class="card-link" href="${esc(s.scriptUrl)}" target="_blank" rel="noopener">read the script →</a></div>`
      : `<div class="media-placeholder"><span class="eyebrow">coming soon</span></div>`;

  const html = `${head(`${s.title} — ${SITE.name}`, s.logline || SITE.name, true)}
${header(true)}

<div class="wrap">
  <a class="back-link" href="../index.html#writers-room">&larr; back to scripts</a>

  <div class="detail-head">
    <div class="eyebrow status">status: ${esc(s.status)}</div>
    <h1>&ldquo;${esc(s.title)}&rdquo;</h1>
    ${s.logline ? `<p class="logline">${esc(s.logline)}</p>` : ''}
  </div>

  <div class="poster">
    ${s.poster ? `<img src="../${esc(s.poster)}" alt="${esc(s.title)} poster">` : '<span class="eyebrow">poster / key art</span>'}
  </div>

  <div class="detail-body">
    <div class="synopsis">
      <div class="eyebrow" style="margin-bottom:10px">synopsis</div>
      ${s.synopsis.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
    </div>
    <div class="credits">
      ${creditRow('writer', s.writer)}
      ${creditRow('director', s.director)}
      ${creditRow('stage', s.stage)}
    </div>
  </div>

  <div class="media-block">
    <div class="eyebrow">script / film</div>
    ${mediaBlock}
  </div>
</div>

${footer(true)}`;
  fs.mkdirSync(path.join(ROOT, 'scripts'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'scripts', `${s.slug}.html`), html);
}

// ---------- funding page ----------

function campaignRow(p) {
  const inner = `${thumb(p.thumbnail, 'media placeholder')}
      <div class="row-body">
        <div class="card-title">${esc(p.name)}</div>
        <div class="eyebrow">${esc(p.type)}</div>
        ${p.logline ? `<p class="status-pill">${esc(p.logline)}</p>` : ''}
        <div class="card-link">${linkLabel(p.url, 'view campaign')}</div>
      </div>`;
  return p.url
    ? `<a class="card-row" href="${esc(p.url)}" target="_blank" rel="noopener">\n      ${inner}\n    </a>`
    : `<div class="card-row">\n      ${inner}\n    </div>`;
}

function completedCard(p) {
  const inner = `${thumb(p.thumbnail, 'media placeholder')}
  <div class="card-title">${esc(p.name)}</div>
  <div class="card-link" style="color:var(--green)">${linkLabel(p.url, 'view project')}</div>`;
  return p.url
    ? `<a class="archive-item" href="${esc(p.url)}" target="_blank" rel="noopener">\n  ${inner}\n</a>`
    : `<div class="archive-item">\n  ${inner}\n</div>`;
}

function buildFundingPage() {
  const html = `${head(
    `Projects we're funding — ${SITE.name}`,
    "Cool stuff by cool people — crowdfunding campaigns and finished work Gopher the Gold Productions has backed.",
    false
  )}
${header(false)}

<div class="funding-intro">
  <div class="wrap">
    <h1>Projects we&rsquo;re funding</h1>
    <p>Cool stuff by people we dig.</p>
  </div>
</div>

<section class="section">
  <div class="wrap">
    <span class="eyebrow section-label seed">active campaigns</span>
    <div class="campaign-list">
      ${funded.active.length ? funded.active.map(campaignRow).join('\n      ') : '<p class="empty-note">No active campaigns right now — check back soon.</p>'}
    </div>
  </div>
</section>

${SHOW_COMPLETED ? `<section class="section section--archive">
  <div class="wrap">
    <span class="eyebrow section-label completed">completed projects</span>
    <div class="grid grid--funded-completed">
      ${funded.completed.length ? funded.completed.map(completedCard).join('\n      ') : '<p class="empty-note">Nothing here yet.</p>'}
    </div>
  </div>
</section>` : ''}

${footer(false)}`;
  fs.writeFileSync(path.join(ROOT, 'funding.html'), html);
}

// ---------- run ----------

buildHomepage();
buildFundingPage();
scripts.forEach(buildScriptPage);

console.log(`Built index.html, funding.html, and ${scripts.length} script page(s).`);
