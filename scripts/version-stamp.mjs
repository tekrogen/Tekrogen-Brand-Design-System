/* scripts/version-stamp.mjs — single-source version stamper for Tekrogen surfaces.
 *
 * Source of truth: package.json "version". Mirrors tokens/sync.mjs (palette).
 *   node scripts/version-stamp.mjs          → stamp the version into the surfaces
 *   node scripts/version-stamp.mjs --check  → CI mode: exit 1 if any surface drifts
 *
 * Run from the repository root (the package.json `stamp` / `stamp:check`
 * scripts do). Paths resolve relative to process.cwd(); the Node `fs` built-in
 * loads via dynamic import inside an async IIFE so this Node-only CLI carries
 * no top-level `import` / `import.meta` — the in-browser design-system bundler
 * can parse the file cleanly even though it never runs there.
 *
 * Each surface carries the version in two spots: the topbar pill and the footer
 * colophon. The standalone Dashboard is a generated Claude Design export and is
 * intentionally NOT listed here — re-export it to propagate a new version.
 */

const FILES = ['index.html'];  // sole canonical Dashboard (UI Kit Dashboard.html removed in v0.5.0)

// Two capture groups bracket the version token in each rule.
const RULES = [
  /(<span class="pill cyan">)v ?[0-9][0-9.]*(<\/span>)/gi,   // topbar pill
  /(ui kit · )v ?[0-9][0-9.]*( · may)/gi,                    // footer colophon
];

(async () => {
  const { readFileSync, writeFileSync } = await import('node:fs');

  const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
  const VER = `v${version}`;

  const check = process.argv.includes('--check');
  let problems = 0, written = 0;

  for (const rel of FILES) {
    let src;
    try { src = readFileSync(rel, 'utf8'); }
    catch { console.error(`✗ ${rel}: cannot read`); problems++; continue; }

    let matched = 0;
    let out = src;
    for (const re of RULES) {
      out = out.replace(re, (_m, g1, g2) => { matched++; return g1 + VER + g2; });
    }

    if (matched === 0) {
      console.error(`✗ ${rel}: no version label found — markup may have changed`);
      problems++;
    } else if (out === src) {
      console.log(`✓ ${rel} — ${VER}`);
    } else if (check) {
      console.error(`✗ ${rel} — out of sync (expected ${VER})`);
      problems++;
    } else {
      writeFileSync(rel, out);
      console.log(`✎ ${rel} — stamped ${VER}`);
      written++;
    }
  }

  if (check) {
    if (problems) {
      console.error(`\n${problems} surface(s) out of sync. Run: node scripts/version-stamp.mjs`);
      process.exit(1);
    }
    console.log(`\n✓ all surfaces at ${VER}.`);
  } else {
    console.log(`\nStamped ${VER}${written ? ` (${written} updated)` : ' (already in sync)'}.`);
  }
})();
