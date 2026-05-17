# tokens/

Single source of truth for the Tekrogen palette.

> **Rule:** edit `palette.js`. Run `node tokens/sync.mjs` to mirror into CSS. Never edit the marked block in `colors_and_type.css` by hand.

## Files

- `palette.js` — canonical JS source. Exports `TK_TOKENS` to `window` and to Node `module.exports`. Block between `TK-PALETTE-BEGIN` / `TK-PALETTE-END` is plain JSON — parseable by the sync script and by humans.
- `sync.mjs` — Node script that reads the JSON block and rewrites the matching block in `../colors_and_type.css`. `--check` flag exits non-zero on drift (CI hook).
- *(future)* `palette.ts` — TS types alongside the JS, once `@tekrogen/tokens` ships as an npm package.

## Why two files instead of one?

CSS consumers (preview cards, asset-pack page, the publication theme) load `colors_and_type.css` directly and expect `--tk-org` etc. as CSS custom properties. JS consumers (the React mark components, the design canvas) need string hexes to pass into SVG `fill` attributes. We could resolve at runtime by reading `getComputedStyle(documentElement)`, but that breaks any consumer that wants to read the palette before the CSS has loaded (e.g. server-rendered OG card generators). Two synchronized files, one direction of authority, one script that enforces parity, is the pragmatic answer until a build step lands.

## Loading order in HTML

`tokens/palette.js` must be loaded as a plain `<script src>` **before** any consumer module that reads `window.TK_TOKENS`:

```html
<link rel="stylesheet" href="../../colors_and_type.css"/>
<script src="../../tokens/palette.js"></script>

<!-- only now: -->
<script type="text/babel" src="../_shared/marks.jsx"></script>
```

Loading it through `<script type="text/babel">` works too, but is unnecessary — the file is plain JS.

## ADR

See `../adr/0002-palette-single-source.md`.
