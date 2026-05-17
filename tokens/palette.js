/* tokens/palette.js — Tekrogen palette · single JS source of truth.
 *
 * Canonical authority for pillar hexes, surfaces, and print-tuned variants.
 * CSS counterpart lives in ../colors_and_type.css between the matching
 * /* TK-PALETTE-BEGIN *\/ ... /* TK-PALETTE-END *\/ markers; if you change
 * a value here, run `node tokens/sync.mjs` to mirror it into the CSS file
 * (or hand-edit both — the script just enforces parity).
 *
 * See ../adr/0002-palette-single-source.md for the contract.
 *
 * Load this BEFORE any consumer (marks.jsx, Dragonfly.jsx, etc.) so
 * window.TK_TOKENS is populated. Plain <script src> — no module loader.
 */

const TK_TOKENS = /* TK-PALETTE-BEGIN */ {
  /* pillars · one per Tekrogen entity */
  "org":         "#446e88",
  "studio":      "#6491ac",
  "com":         "#0db4b9",
  "net":         "#7edba5",

  /* body / spine + accent */
  "body":        "#385166",
  "head":        "#3f617b",
  "cyan":        "#1fd5da",

  /* inverse body/head — lifted for dark surfaces */
  "bodyInv":     "#cad6e0",
  "headInv":     "#9eb1c0",

  /* print-tuned pillars (CMYK-stable nudges) */
  "orgPrint":    "#3a6079",
  "studioPrint": "#5d89a5",
  "comPrint":    "#0aa3a8",
  "netPrint":    "#6dc491",
  "bodyPrint":   "#2e4356",

  /* surfaces · ink (primary) and paper */
  "ink":         "#0e1116",
  "inkSoft":     "#171c24",
  "inkBorder":   "#1f2731",
  "paper":       "#fbfcfd",
  "paperWarm":   "#f4ede2"
} /* TK-PALETTE-END */;

/* ── Browser publication ─────────────────────────────────────────
 * Expose under two names: TK_TOKENS (canonical) and TK_PALETTE
 * (legacy alias kept for backwards compatibility with older
 * consumers that still expect a `paper` / `ink` shorthand).
 */
if (typeof window !== "undefined") {
  window.TK_TOKENS = TK_TOKENS;
  if (!window.TK_PALETTE) {
    window.TK_PALETTE = {
      ...TK_TOKENS,
      /* legacy aliases — DO NOT add new ones here. Update consumers
       * to read from window.TK_TOKENS by canonical key. */
      paper: TK_TOKENS.paperWarm,
      inkDeep: TK_TOKENS.ink,
      cyanBright: TK_TOKENS.cyan,
      paperWhite: TK_TOKENS.paper
    };
  }
}

/* ── Node export (for sync.mjs and future bundlers) ───────────── */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TK_TOKENS };
}
