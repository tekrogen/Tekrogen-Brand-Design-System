#!/usr/bin/env node
/* tokens/sync.mjs — keep colors_and_type.css in sync with tokens/palette.js.
 *
 * Reads the JSON block between TK-PALETTE-BEGIN/END in tokens/palette.js
 * and rewrites the matching block in colors_and_type.css. Idempotent.
 *
 *   node tokens/sync.mjs           # write CSS from JS
 *   node tokens/sync.mjs --check   # exit 1 if drift detected (CI hook)
 *
 * See ../adr/0002-palette-single-source.md.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const PALETTE_JS = join(here, "palette.js");
const COLORS_CSS = join(here, "..", "colors_and_type.css");

const BEGIN = "TK-PALETTE-BEGIN";
const END = "TK-PALETTE-END";

function extractJsonBlock(src) {
  const start = src.indexOf(BEGIN);
  const stop = src.indexOf(END);
  if (start < 0 || stop < 0) throw new Error("Sync markers not found.");
  /* Block is wrapped in `/* MARKER *\/{...}/* MARKER *\/`. Grab between them. */
  const afterStart = src.indexOf("*/", start) + 2;
  const beforeStop = src.lastIndexOf("/*", stop);
  return src.slice(afterStart, beforeStop).trim().replace(/;?\s*$/, "");
}

const jsSrc = readFileSync(PALETTE_JS, "utf8");
const json = extractJsonBlock(jsSrc);
const tokens = JSON.parse(json);

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

const cssLines = Object.entries(tokens).map(
  ([k, v]) => `  ${(CSS_MAP[k] + ":").padEnd(19)} ${v};`
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
