# ADR-0002 — Palette: single source of truth

- **Status:** Accepted
- **Date:** 2026-05-16

## Context

The pillar hexes (`org #446e88`, `studio #6491ac`, `com #0db4b9`, `net #7edba5`, plus `body`, `head`, `cyan`) were duplicated in at least seven places:

- `colors_and_type.css` — the CSS custom-property block (`--tk-org` etc.)
- `ui_kits/_shared/marks.jsx` — `TK_PALETTE` object (and published as `window.TK_PALETTE`)
- `ui_kits/tekrogen-org/Dragonfly.jsx` — `TK_PAL` object
- `ui_kits/tekrogen-org/Article.jsx` — hardcoded gradient `linear-gradient(135deg, #446e88, #0db4b9)`
- `ui_kits/master-lockups/index.html` — local `--org/--studio/--com/--net` CSS vars
- `ui_kits/asset-pack/index.html` — same pattern, inline
- The SVG asset files in `assets/` — hardcoded `fill="#446e88"` etc.

Each duplicate was an opportunity for drift. The print-tuned variants (`--tk-com-print: #0aa3a8`) made this worse — they're meant to be slightly different, so a casual "let's just match them" sync was unsafe.

## Decision

**`tokens/palette.js` is the single source of truth.** All other locations are derived.

- `tokens/palette.js` declares `TK_TOKENS` as a JSON-shaped object between `TK-PALETTE-BEGIN` / `TK-PALETTE-END` markers. The markers exist so a sync script can find and rewrite the block deterministically.
- `colors_and_type.css` contains a matching marker block. `tokens/sync.mjs` reads the JS and writes the CSS. Drift is detectable (`node tokens/sync.mjs --check` exits non-zero) and fixable in one command.
- JS consumers (`marks.jsx`, `Dragonfly.jsx`, any future React mark) read from `window.TK_TOKENS`. They no longer declare their own palette object. If `window.TK_TOKENS` is missing at load time, the module throws — better to fail loud than to silently fall back to a hardcoded duplicate.
- Inline-styled gradients in JSX use CSS custom properties: `linear-gradient(135deg, var(--tk-org), var(--tk-com))`.
- Per-page palette aliases (master-lockups, asset-pack) keep their local short names (`--org`, `--studio`) but bind them to `var(--tk-org)` etc. instead of duplicating hexes. The short names exist because the kit-internal CSS selectors are extensive and renaming them all would be a larger refactor than the value-of-this-ADR justifies.
- SVG assets in `assets/` are an **exception** — they're static files meant to be drag-droppable into Figma / Ghost / email. We do not rewrite them from JS. If the palette changes, the SVGs must be regenerated, and the CHANGELOG entry MUST call this out.

## Consequences

- New: `tokens/palette.js`, `tokens/sync.mjs`, `tokens/README.md`.
- Updated: `colors_and_type.css` (palette block now wrapped in sync markers), `marks.jsx`, `Dragonfly.jsx`, `Article.jsx`, `master-lockups/index.html`, `asset-pack/index.html`.
- Load order in HTML files matters: `tokens/palette.js` must precede any Babel script that consumes it. Documented in `tokens/README.md`.
- Future: when a build step lands (Vite / Turborepo), `tokens/palette.js` becomes the input to a generator that emits CSS, TS types, JSON, and Tailwind config from one source. Until then, two files + a sync script is the minimum viable contract.

## Verification

- `grep -rE "(#446e88|#6491ac|#0db4b9|#7edba5)" --include='*.{js,jsx,css,html}'` should return only:
  - `tokens/palette.js` (the source)
  - `colors_and_type.css` (the synced CSS block)
  - `assets/*.svg` (the static exception)
  - **and nothing else.** Any other hit is a regression.
- `node tokens/sync.mjs --check` exits 0.
