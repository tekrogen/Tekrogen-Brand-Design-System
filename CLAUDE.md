
# Tekrogen Brand Design System — Architecture Overview

## Purpose

A **static, no-build design system** for the Tekrogen practice — four sibling entities (`tekrogen.org`, `.studio`, `.com`, `.net`) that share one mark (the dragonfly), one type system (Poppins + JetBrains Mono), and one palette. The repo bundles:

- **Foundations** — palette/type/spacing tokens (`colors_and_type.css`, `tokens/`).
- **Brand assets** — production SVG marks, lockups, OG cards (`assets/`).
- **UI kits** — Ghost Pro publication mock, asset-pack page, master-lockup sheet, mark-exploration canvas (`ui_kits/`).
- **Specimens** — small per-token preview cards for visual reference (`preview/`).
- **Governance** — ADRs (`adr/`), `CHANGELOG.md`, `review/index.html` dashboard.
- **Skill metadata** — `SKILL.md` exposes the system as the `tekrogen-design` Claude Code skill.

Everything is hand-authored HTML/JSX/CSS — **no bundler, no npm install**. JSX runs through Babel-standalone in the browser.

## Key Components

| Path | Role |
|------|------|
| `README.md` | Top-line brand spec — voice, palette, mark, type, layout rules. Read first. |
| `SKILL.md` | Claude Code skill metadata + invariants. User-invocable. |
| `CHANGELOG.md` | Keep-a-Changelog format; pre-1.0 semver per ADR-0003. Current `0.3.0`. |
| `colors_and_type.css` | The token layer — `--tk-*` CSS custom properties. Load first in any artifact. |
| `tokens/palette.js` | Single source of truth for pillar/surface hexes (`window.TK_TOKENS`). |
| `tokens/sync.mjs` | Node script mirroring `palette.js` → `colors_and_type.css`. `--check` flag for CI. |
| `assets/` | Production SVGs (dragonfly mark, lockups, icons, favicon) + PNG OG cards. **Static exception** to single-source palette rule. |
| `fonts/` | Self-hosted Regular (400) `.woff2` for Poppins, Manrope, JetBrains Mono. |
| `adr/` | Six accepted ADRs — the load-bearing decisions written down. |
| `ui_kits/_shared/` | React components shared across kits: `marks.jsx` (7 mark concepts), `lockups-app.jsx`, `design-canvas.jsx`, `tweaks-panel.jsx`, `concept-cards.jsx`. |
| `ui_kits/tekrogen-org/` | Ghost-Pro publication mock — SiteHeader, Hero, FieldNoteCard, Article, SubscribeBlock, Footer, Dragonfly. The canonical brand surface. |
| `ui_kits/asset-pack/` | Single-file Ghost Pro downloads UI (JSZip + Canvas + SVG→PNG). |
| `ui_kits/master-lockups/` | Long-scroll brand-foundations document, sans/mono toggle. |
| `ui_kits/mark-explorations/` | Design canvas of 7 mark concepts with live Tweaks panel. |
| `preview/` | One small HTML specimen card per token/component. Share `_card.css`. |
| `review/index.html` | Design-system review dashboard with maturity radar and findings table; ink/paper toggle. |
| `trust-state-matrix.html` | Mocks for the four trust states (anonymous / member / paid / entitled) per ADR-0006. |
| `uploads/cursor-design-system-analysis.md` | External analysis that motivated the v0.2.0 / v0.3.0 hardening passes. |

## Architecture Decisions

The repo is governed by six ADRs in `adr/` — each is short and load-bearing:

- **ADR-0001 · Typography: sans-only.** No serif face anywhere. Poppins (primary), Manrope (sans fallback), JetBrains Mono (technical). Editorial weight = Poppins 600 + italic, **not** a serif counterpoint. IBM Plex Sans was retired in v0.3.0.
- **ADR-0002 · Palette: single source.** `tokens/palette.js` is canonical; `colors_and_type.css` is generated via `tokens/sync.mjs`. JS consumers read `window.TK_TOKENS` and **throw** if it's missing — no hardcoded fallback. SVGs in `assets/` are an explicit static exception.
- **ADR-0003 · Token versioning.** Pre-1.0 semver is tightened — any visual change is MINOR. Every CHANGELOG entry must include versioning intent, pixel-diff scope, migration, and assets-to-regenerate.
- **ADR-0004 · Ghost Pro is the canonical authoring surface for `.org`.** MDX/Next.js stays a future option but is not built. BNR drift is flagged as an external issue.
- **ADR-0005 · Icon system.** Brand surfaces stay icon-free (Unicode mono glyphs only: `↓ ↗ ✓ ✗ ⧉ × · …`). Product surfaces use **Lucide outline, stroke 1.5, currentColor**, sizes 16/20/24/32. No mixing icon sets.
- **ADR-0006 · Trust-state CTAs.** Paired content (note + artifact) has four trust-state variants — anonymous / member / paid / entitled — with defined CTA treatments. The matrix at `trust-state-matrix.html` is the source of truth.

## Implementation Patterns

### Token loading order (matters!)

Every HTML entry point follows the same script order:

```html
<link rel="stylesheet" href="../../colors_and_type.css"/>   <!-- token vars -->
<script src="https://unpkg.com/react@18.3.1/.../react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/.../react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
<script src="../../tokens/palette.js"></script>             <!-- BEFORE any JSX -->
<script type="text/babel" src="Dragonfly.jsx"></script>     <!-- ...etc -->
```

`tokens/palette.js` **must** load before any JSX that reads `window.TK_TOKENS`. Both `marks.jsx` and `Dragonfly.jsx` throw on load if the global is missing — there is no fallback by design.

### Component publication pattern

Every JSX file is a `<script type="text/babel">` global, not a module. Each file ends with `window.ComponentName = ComponentName;` (or `Object.assign(window, { … })`) so siblings can read it from globals. `/* global React, Dragonfly */` comments at the top hint at the dependency.

### Two reigning surfaces — Ink and Paper

The whole system runs on a binary surface mode:
- **Ink** (`#0e1116`) — dark, primary mode. Default `:root` in `colors_and_type.css`.
- **Paper** (`#fbfcfd`) — light. Activated via `data-tk-theme="paper"` on `<html>` (see `review/index.html`) or `body.paper` (see `preview/_card.css`).

There is no in-between. No gradient backdrops. No photography.

### The 18° tilt

The dragonfly is **always** rotated 18° clockwise. In `Dragonfly.jsx` the rotation is baked into an inner `<g transform="rotate(18 100 110)">` so consumers don't need a CSS wrapper. CSS var: `--tk-tilt-mark: 18deg`. Hover affordances can shift by ±2°; otherwise it stays at 18°.

### Pillar-keyed color access

`note.pillar` is one of `org | studio | com | net`, and components compose styles as `color: var(--tk-${note.pillar})`. The full set of CSS vars matches the JS keys via the `CSS_MAP` in `tokens/sync.mjs`.

### Hairlines, not shadows

Depth comes from **1px borders** at `--tk-border` (`#1f2731` on ink, `#e6ebef` on paper) — not box-shadow. Only two shadow recipes exist: `--tk-shadow-2` (floating dock/toast) and `--tk-shadow-glow` (the one primary CTA per surface). Cards don't depress on press; they hover-lift their border to cyan at 40% opacity.

### One cyan accent per surface

`--tk-cyan` (`#1FD5DA`) is the brightest color in the system and is used **once** per surface — the primary CTA, the hero accent, or the active link. Never a background fill for text.

## Dependencies

### External (loaded by CDN, no install)

- **React 18.3.1** + **ReactDOM** (unpkg.com)
- **@babel/standalone 7.29.0** — runs JSX in the browser
- **JSZip / FileSaver** (asset-pack only) — client-side download bundling
- **Google Fonts** — Poppins / Manrope / JetBrains Mono in weights 500–800
- **Lucide** (`unpkg.com/lucide@latest`) — product-surface icon set per ADR-0005

### Internal

- Every HTML file depends on `colors_and_type.css` and `tokens/palette.js`.
- `ui_kits/tekrogen-org/*.jsx` cross-depends via globals (Dragonfly → SectionHead → SiteHeader → … → App).
- `ui_kits/_shared/marks.jsx` and `Dragonfly.jsx` both throw if `window.TK_TOKENS` isn't loaded.

### Tooling

- **Node** — only for `tokens/sync.mjs` (and the `--check` CI hook). Nothing else needs Node.
- **No package.json, no lockfile, no bundler.** This is intentional and noted across ADR-0002/0003.

## Common Operations

### Add or change a palette value

1. Edit `tokens/palette.js` (within `TK-PALETTE-BEGIN` / `TK-PALETTE-END`).
2. Run `node tokens/sync.mjs` to mirror into `colors_and_type.css`.
3. If the change is a pillar hex, regenerate any affected SVG in `assets/` by hand (the SVG exception in ADR-0002).
4. Add a CHANGELOG entry with versioning intent + pixel-diff scope + migration + assets-to-regenerate (ADR-0003).
5. Verify: `node tokens/sync.mjs --check` returns 0, and `grep -rE "(#446e88|#6491ac|#0db4b9|#7edba5)"` returns only `tokens/palette.js`, `colors_and_type.css`, and `assets/*.svg`.

### Add a new field-note card or publication view

1. Edit `ui_kits/tekrogen-org/App.jsx` — append to `NOTES` and add a view branch.
2. Reuse `FieldNoteCard` / `SectionHead` / `SubscribeBlock` — don't introduce new layout primitives.
3. New JSX files must end with `window.X = X;` and be loaded in `index.html` in dependency order.

### Add a preview specimen card

Drop a single-file HTML in `preview/` that imports `_card.css`. Stay under ~60 lines. The pattern is `<div class="col">` with `.label` / `.swatch` / `.hex` / `.token` / `.name`.

### Open or modify an ADR

ADRs are write-once: status flows `Proposed → Accepted → Superseded`. To revisit a decision, write a new ADR that supersedes the old one — don't edit the prior file beyond linking the superseder. Index goes in `adr/README.md`.

### Run the publication locally

Open `ui_kits/tekrogen-org/index.html` directly in a browser (or serve the repo root). No build step. Same for `asset-pack/`, `master-lockups/`, `mark-explorations/`, `review/index.html`, `trust-state-matrix.html`.

## Gotchas and Non-obvious Behaviors

- **JSX runs in the browser via Babel-standalone.** Slow on cold load, but no build step. Don't add ES modules or `import` statements — files use globals.
- **`window.TK_TOKENS` is required, not optional.** `marks.jsx` and `Dragonfly.jsx` throw on missing palette. If you copy these into a new page, load `tokens/palette.js` first.
- **The dragonfly is `--tk-tilt-mark: 18deg` — but the SVG bakes the rotation in.** Don't double-rotate. Pre-built lockup SVGs in `assets/` are already tilted; the bare-mark SVG (`assets/tekrogen-mark.svg`) is tilted too. Inline JSX components apply the rotation via `<g transform>` inside the SVG.
- **The publication header uses the SANS wordmark "Tekrogen" (Poppins 600, mixed-case)**, not the locked UPPERCASE `TEKROGEN` wordmark. The locked one is reserved for marketing surfaces (asset pack, lockup sheet).
- **No serif face — anywhere.** Don't `@import` Source Serif 4 or IBM Plex Serif into new preview cards. The brand had previous drafts with serif imports; they were retired in v0.2.0 / v0.3.0. If you see "serif" outside a CSS fallback stack like `sans-serif`, it's a regression.
- **`window.TK_PALETTE` is a legacy alias.** Use `window.TK_TOKENS` in new code. The alias keeps `marks.jsx`'s older keys working but is not the canonical surface.
- **Pre-1.0 MINOR = breaking.** Any visual change bumps MINOR per ADR-0003 — there is no "pre-1.0 we can break anything" license here.
- **Pillar copy is fixed.** `.studio = "Proof of concept and demos."`, not "learning" or "instructional systems" (resolved in v0.3.0). Tagline is "Real solutions. Built, proven, ready to use." — verbatim, don't paraphrase.
- **Cyan used once per surface.** If a page already has a cyan CTA, a second cyan element diffuses the affordance. Promote it to the brand cyan only if it's the page's primary action.
- **Trust-state matrix is the source of truth for paid flows.** `SubscribeBlock.jsx` only mocks the anonymous state. Don't ship a paid surface from the happy path alone — check `trust-state-matrix.html` first.
- **`archives/Logos.zip` lives in the upstream source brand project, not this repo.** README references it as part of the source materials this system was built from; the zip itself was never unpacked into `assets/`. If older logos are needed, ask before guessing — don't go looking under `assets/`.
- **Workflow drift (WF-001) and BNR mismatches are external.** ADR-0004 flags them; fixing them is out of scope for this repo.
- **The Cursor analysis at `uploads/cursor-design-system-analysis.md` is historical context** — it motivated v0.2.0 / v0.3.0 hardening. Don't re-litigate findings already addressed; check `review/index.html` for current status.

## Quick verification

```bash
node tokens/sync.mjs --check                                  # palette parity
grep -ri "serif" colors_and_type.css preview/_card.css ui_kits/  # only sans-serif fallbacks
grep -rE "(#446e88|#6491ac|#0db4b9|#7edba5)" --include='*.{js,jsx,css,html}'
# expect only: tokens/palette.js, colors_and_type.css, assets/*.svg
```

## Rules

These must be followed with no exceptions:

1. Do not ever include `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` in commits in this code base.