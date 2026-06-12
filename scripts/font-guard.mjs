/* scripts/font-guard.mjs — CI font guard for Tekrogen surfaces (BNR §9.3 stage b, issue #14).
 *
 * Enforces two of the stage's three contracts (cpl lives in scripts/cpl-measure.mjs):
 *
 *   1. REMOTE-FONT BAN — every font byte ships from /fonts/ (self-hosted woff2).
 *      Any occurrence of a known font-host string (link, preconnect, @import,
 *      JS, even comments — reword prose rather than weaken the scan) or any
 *      absolute URL to a font file (.woff/.woff2/.ttf/.otf/.eot) is a failure.
 *
 *   2. TOKEN VALIDITY — every var(--tk-*) consumed in a document resolves to a
 *      definition reachable from that document: its own content, locally linked
 *      .css/.jsx (href/src), and local CSS @import chains (followed recursively).
 *      Undefined custom properties fail silently in CSS; here they fail loudly.
 *      Orphan .css/.jsx (referenced by no scanned HTML) are checked against
 *      their own defs + the foundation (colors_and_type.css).
 *
 * Zero dependencies; async-IIFE/dynamic-import shape mirrors version-stamp.mjs
 * so the in-browser design-system bundler can parse this Node-only CLI.
 * Run from the repo root:  node scripts/font-guard.mjs   (exit 1 on violation)
 */

const EXEMPT = [
  'UI Kit Dashboard (standalone).html', // generated export — fixed by re-export, not edits
];
const SCAN_EXT = ['.html', '.css', '.jsx'];
const FONT_HOSTS = [
  'fonts.googleapis.com', 'fonts.gstatic.com', 'use.typekit.net',
  'fonts.bunny.net', 'cdn.fontshare.com', 'fonts.cdnfonts.com', 'use.fontawesome.com',
];
const REMOTE_FONT_FILE = /https?:\/\/[^\s"'()]+\.(?:woff2?|ttf|otf|eot)\b/gi;
const TOKEN_DEF  = /--tk-[a-z0-9-]+(?=\s*:)/g;
const TOKEN_USE  = /var\(\s*(--tk-[a-z0-9-]+)/g;
const LOCAL_REF  = /(?:href|src)\s*=\s*"([^"]+\.(?:css|jsx))"/g;
const CSS_IMPORT = /@import\s+url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
const FOUNDATION = 'colors_and_type.css';

(async () => {
  const { readFileSync, readdirSync, statSync, existsSync } = await import('node:fs');
  const { join, extname, dirname, resolve, relative, sep } = await import('node:path');

  const ROOT = process.cwd();
  const rel = (p) => relative(ROOT, p).split(sep).join('/');
  const files = [];
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      if (name.startsWith('.') || name === 'node_modules' || name === 'admin' || name === 'fonts') continue;
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (SCAN_EXT.includes(extname(name)) && !EXEMPT.includes(rel(p))) files.push(rel(p));
    }
  })(ROOT);

  const read = (p) => readFileSync(join(ROOT, p), 'utf8');
  const cache = new Map();
  const src = (p) => { if (!cache.has(p)) cache.set(p, read(p)); return cache.get(p); };
  let violations = 0;
  const fail = (msg) => { console.error('\u2717 ' + msg); violations++; };

  /* ── 1. remote-font ban ─────────────────────────────────── */
  for (const f of files) {
    const s = src(f);
    const hits = new Set();
    for (const host of FONT_HOSTS) if (s.includes(host)) hits.add(host);
    for (const m of s.matchAll(REMOTE_FONT_FILE)) hits.add(m[0]);
    for (const h of hits) fail(`remote font \u2014 ${f}: ${h}`);
  }

  /* ── 2. token validity ──────────────────────────────────── */
  const defsIn = (s) => s.match(TOKEN_DEF) || [];
  const usesIn = (s) => [...s.matchAll(TOKEN_USE)].map((m) => m[1]);

  // resolve a local reference from `fromFile`; returns repo-relative path or null
  const resolveLocal = (fromFile, href) => {
    if (/^(https?:)?\/\//.test(href) || href.startsWith('data:')) return null;
    const clean = href.split('?')[0].split('#')[0];
    // root-absolute ("/x.css") means repo root — the server root when surfaces are served
    const target = clean.startsWith('/')
      ? resolve(ROOT, clean.slice(1))
      : resolve(join(ROOT, dirname(fromFile)), clean);
    const r = rel(target);
    return existsSync(target) && !r.startsWith('..') ? r : null;
  };

  // collect a css file plus its local @import chain (cycle-guarded)
  const cssChain = (start) => {
    const out = [], seen = new Set(), stack = [start];
    while (stack.length) {
      const f = stack.pop();
      if (seen.has(f)) continue;
      seen.add(f); out.push(f);
      for (const m of src(f).matchAll(CSS_IMPORT)) {
        const t = resolveLocal(f, m[1]);
        if (t && t.endsWith('.css')) stack.push(t);
      }
    }
    return out;
  };

  const includedSomewhere = new Set();
  for (const html of files.filter((f) => f.endsWith('.html'))) {
    const docFiles = [html];
    for (const m of src(html).matchAll(LOCAL_REF)) {
      const t = resolveLocal(html, m[1]);
      if (!t) continue;
      if (t.endsWith('.css')) docFiles.push(...cssChain(t));
      else docFiles.push(t);
    }
    const defs = new Set(), uses = new Set();
    for (const f of docFiles) {
      if (f !== html) includedSomewhere.add(f);
      for (const d of defsIn(src(f))) defs.add(d);
      for (const u of usesIn(src(f))) uses.add(u);
    }
    for (const u of uses) if (!defs.has(u)) fail(`undefined token \u2014 ${html}: var(${u}) has no reachable definition`);
  }

  // orphans: scanned css/jsx no HTML includes — check vs own defs + foundation
  const foundationDefs = new Set(defsIn(src(FOUNDATION)));
  for (const f of files.filter((f) => !f.endsWith('.html') && f !== FOUNDATION)) {
    if (includedSomewhere.has(f)) continue;
    const defs = new Set([...foundationDefs, ...defsIn(src(f))]);
    for (const u of new Set(usesIn(src(f))))
      if (!defs.has(u)) fail(`undefined token \u2014 ${f} (orphan, checked vs foundation): var(${u})`);
  }

  /* ── summary ────────────────────────────────────────────── */
  if (violations) {
    console.error(`\n${violations} violation(s) across ${files.length} scanned files.`);
    process.exit(1);
  }
  console.log(`\u2713 font guard clean \u2014 ${files.length} files: no remote fonts, all var(--tk-*) resolve.`);
})();
