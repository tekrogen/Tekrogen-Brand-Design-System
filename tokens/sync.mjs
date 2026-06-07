/* tokens/sync.mjs — keep colors_and_type.css in sync with tokens/palette.js.
 *
 * Reads the JSON block between TK-PALETTE-BEGIN/END in tokens/palette.js
 * and rewrites the matching block in colors_and_type.css. Idempotent.
 *
 *   node tokens/sync.mjs           # write CSS from JS
 *   node tokens/sync.mjs --check   # exit 1 if drift detected (CI hook)
 *
 * Run from the repository root (the package.json `sync` / `check` scripts do).
 * Paths below resolve relative to process.cwd(); the Node `fs` built-in loads
 * via dynamic import inside an async IIFE so this Node-only CLI carries no
 * top-level `import` / `import.meta` — the in-browser design-system bundler can
 * parse the file cleanly even though it never runs there.
 *
 * See ../adr/0002-palette-single-source.md.
 */

const PALETTE_JS = "tokens/palette.js";
const COLORS_CSS = "colors_and_type.css";

const BEGIN = "TK-PALETTE-BEGIN";
const END = "TK-PALETTE-END";
// Match the delimited form so the file's own header comment (which writes
// the markers with `*\/` to avoid breaking out) doesn't false-match.
const BEGIN_MARKER = `/* ${BEGIN} */`;
const END_MARKER = `/* ${END} */`;

function extractJsonBlock(src) {
  const start = src.indexOf(BEGIN_MARKER);
  const stop = src.indexOf(END_MARKER);
  if (start < 0 || stop < 0) throw new Error("Sync markers not found.");
  const afterStart = start + BEGIN_MARKER.length;
  // Strip inline /* ... */ comments so JSON.parse can read the block —
  // palette.js annotates groups inline for humans.
  return src.slice(afterStart, stop)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim()
    .replace(/;?\s*$/, "");
}

/* Map JS keys → CSS var names. */
const CSS_MAP = {
  org: "--tk-org",
  studio: "--tk-studio",
  com: "--tk-com",
  net: "--tk-net",
  body: "--tk-body",
  head: "--tk-head",
  cyan: "--tk-cyan",
  bodyInv: "--tk-body-inv",
  headInv: "--tk-head-inv",
  orgPrint: "--tk-org-print",
  studioPrint: "--tk-studio-print",
  comPrint: "--tk-com-print",
  netPrint: "--tk-net-print",
  bodyPrint: "--tk-body-print",
  ink: "--tk-ink",
  inkSoft: "--tk-ink-soft",
  inkBorder: "--tk-ink-2",
  paper: "--tk-paper",
  paperWarm: "--tk-paper-warm"
};

(async () => {
  const { readFileSync, writeFileSync } = await import("node:fs");

  const jsSrc = readFileSync(PALETTE_JS, "utf8");
  const json = extractJsonBlock(jsSrc);
  const tokens = JSON.parse(json);

  const cssLines = Object.entries(tokens).map(
    ([k, v]) => `  ${(CSS_MAP[k] + ":").padEnd(18)} ${v};`
  );

  const cssBlock = `/* ${BEGIN} — generated from tokens/palette.js. Edit JS, run \`node tokens/sync.mjs\`. */\n${cssLines.join("\n")}\n  /* ${END} */`;

  const cssSrc = readFileSync(COLORS_CSS, "utf8");
  const reBlock = new RegExp(
    `\\/\\* ${BEGIN}[\\s\\S]*?${END} \\*\\/`,
    "m"
  );

  if (!reBlock.test(cssSrc)) {
    console.error(`! ${BEGIN}/${END} markers missing in colors_and_type.css.`);
    console.error("  Add them around the pillar/surface palette section, then re-run.");
    process.exit(2);
  }

  const next = cssSrc.replace(reBlock, cssBlock);

  if (process.argv.includes("--check")) {
    if (next !== cssSrc) {
      console.error("! Drift detected. Run `node tokens/sync.mjs` to fix.");
      process.exit(1);
    }
    console.log("✓ tokens in sync.");
    process.exit(0);
  }

  writeFileSync(COLORS_CSS, next);
  console.log("✓ wrote palette block to colors_and_type.css.");
})();
