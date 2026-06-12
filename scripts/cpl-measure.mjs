/* scripts/cpl-measure.mjs — rendered characters-per-line gate (BNR §9.3 stage b, issue #14).
 *
 * Bringhurst (The Elements of Typographic Style): a satisfactory body measure
 * runs 45–75 characters per line, ~66 ideal; the Tekrogen prose target is ~72.
 * cpl is a RENDERED property — actual font metrics at actual column widths —
 * so this measures in headless Chromium with the self-hosted woff2s loaded
 * (document.fonts.ready), deriving average char width from each element's own
 * text via canvas measureText. Also asserts ZERO font bytes from any external
 * origin at runtime (the static scan in font-guard.mjs can't see dynamic loads).
 *
 * Requires playwright (not a repo dependency — CI installs it ephemerally):
 *   npm i --no-save playwright && npx playwright install chromium
 *   node scripts/cpl-measure.mjs
 * Exit 1 on any gate failure. Run from the repo root.
 */

const SURFACES = [
  {
    name: 'tekrogen-org \u00b7 article prose (the Bringhurst column, ~600px)',
    page: '/ui_kits/tekrogen-org/index.html',
    prepareClick: 'main a',     // open the first field note (state-routed detail view)
    selector: 'article p',
  },
];
const GATE = { min: 45, max: 75, target: 72 };
const FONT_HOSTS = [
  'fonts.googleapis.com', 'fonts.gstatic.com', 'use.typekit.net',
  'fonts.bunny.net', 'cdn.fontshare.com', 'fonts.cdnfonts.com', 'use.fontawesome.com',
];
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript', '.mjs': 'text/javascript', '.jsx': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json',
};

const MEASURE = (selector) => `(async () => {
  await document.fonts.ready;
  const els = [...document.querySelectorAll(${JSON.stringify(selector)})]
    .filter((e) => (e.textContent || '').replace(/\\s+/g, ' ').trim().length >= 80);
  if (!els.length) return { error: 'no prose elements (>=80 chars) for selector' };
  const ctx = document.createElement('canvas').getContext('2d');
  const vals = els.slice(0, 8).map((el) => {
    const cs = getComputedStyle(el);
    const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    ctx.font = [cs.fontStyle, cs.fontWeight, cs.fontSize, cs.fontFamily].join(' ');
    const t = el.textContent.replace(/\\s+/g, ' ').trim().slice(0, 160);
    const avg = ctx.measureText(t).width / t.length;
    return w / avg;
  });
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  return { cpl: Math.round(mean), n: vals.length,
           min: Math.round(Math.min(...vals)), max: Math.round(Math.max(...vals)) };
})()`;

(async () => {
  const { readFileSync, statSync } = await import('node:fs');
  const { join, extname, resolve } = await import('node:path');
  const { createServer } = await import('node:http');

  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch {
    console.error('\u2717 playwright not installed. Run: npm i --no-save playwright && npx playwright install chromium');
    process.exit(1);
  }

  const ROOT = process.cwd();
  const server = createServer((req, res) => {
    try {
      const clean = decodeURIComponent(req.url.split('?')[0]);
      let p = resolve(ROOT, '.' + clean);
      if (!p.startsWith(ROOT)) throw new Error('traversal');
      if (statSync(p).isDirectory()) p = join(p, 'index.html');
      res.writeHead(200, { 'Content-Type': MIME[extname(p).toLowerCase()] || 'text/plain; charset=utf-8' });
      res.end(readFileSync(p));
    } catch { res.writeHead(404); res.end('not found'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const browser = await chromium.launch();
  let violations = 0;
  for (const s of SURFACES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const externalFonts = new Set();
    page.on('request', (rq) => {
      const u = rq.url();
      if (u.startsWith(origin) || u.startsWith('data:')) return;
      if (rq.resourceType() === 'font' || FONT_HOSTS.some((h) => u.includes(h)) ||
          /\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u)) externalFonts.add(u);
    });
    try {
      await page.goto(origin + s.page, { waitUntil: 'networkidle', timeout: 60000 });
      if (s.prepareClick) {
        await page.waitForSelector(s.prepareClick, { timeout: 30000 });
        await page.click(s.prepareClick);
      }
      await page.waitForSelector(s.selector, { timeout: 30000 });
      const r = await page.evaluate(MEASURE(s.selector));
      if (r.error) { console.error(`\u2717 ${s.name}: ${r.error}`); violations++; }
      else {
        const ok = r.cpl >= GATE.min && r.cpl <= GATE.max;
        const line = `${s.name}: ${r.cpl} cpl (n=${r.n}, range ${r.min}\u2013${r.max}, target ~${GATE.target}, gate ${GATE.min}\u2013${GATE.max})`;
        if (ok) console.log('\u2713 ' + line);
        else { console.error('\u2717 ' + line); violations++; }
      }
      for (const u of externalFonts) { console.error(`\u2717 runtime external font \u2014 ${s.name}: ${u}`); violations++; }
    } catch (e) {
      console.error(`\u2717 ${s.name}: ${String(e).split('\n')[0]}`); violations++;
    }
    await page.close();
  }
  await browser.close();
  server.close();
  process.exit(violations ? 1 : 0);
})();
