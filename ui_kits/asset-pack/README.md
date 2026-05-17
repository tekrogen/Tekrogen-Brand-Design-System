# Ghost Pro asset pack

A working asset-pack page recreating the production downloads UI for
**tekrogen.org** on Ghost Pro.

Self-contained, single HTML file. All asset rendering happens client-side
(JSZip + Canvas + SVG-to-PNG) — no build step.

Sections:

1. **Publication brand** — light/dark logos + icon scale + favicon
2. **Social cards** — OG default, article, author, series (1200×630)
3. **Slot map** — table mapping each file to Ghost's Settings → Design slot
4. **Inline SVG** — copy-pasteable source for the dragonfly mark

The page renders the dragonfly inline via the `dragonflySVG()` factory
(same geometry as `assets/tekrogen-mark.svg`), then converts each composed
asset to a PNG (or zip-bundles them all) when the user hits a download
button.

> Lifted verbatim from the source brand project. Treat this as the canonical
> reference for the asset-pack page chrome and the download-dock pattern.
