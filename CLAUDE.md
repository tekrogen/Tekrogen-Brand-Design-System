# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

The repository for this project is: https://github.com/tekrogen/Tekrogen-Brand-Design-System

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
| `admin/` | **Business/governance layer, NOT part of the design system.** Two trust zones: `admin/internal/` (Confidential) and `admin/public/` (publication-safe). See "Internal vs Public Documents" below — read it before touching anything under `admin/`. |
| `README.md` | Top-line brand spec — voice, palette, mark, type, layout rules. Read first. |
| `SKILL.md` | Claude Code skill metadata + invariants. User-invocable. |
| `CHANGELOG.md` | Keep-a-Changelog format; pre-1.0 semver per ADR-0003. Current `0.9.0` (source of truth: `package.json`; `release-please` drives bumps). |
| `colors_and_type.css` | The token layer — `--tk-*` CSS custom properties. Load first in any artifact. |
| `tokens/palette.js` | Single source of truth for pillar/surface hexes (`window.TK_TOKENS`). |
| `tokens/sync.mjs` | Node script mirroring `palette.js` → `colors_and_type.css`. `--check` flag for CI. |
| `assets/` | Production SVGs (dragonfly mark, lockups, icons, favicon) + PNG OG cards. **Static exception** to single-source palette rule. `assets/og_ship/` holds the shipped OG card SVG+PNG pairs regenerated from the token-driven generator (ADR-0010). |
| `index.html` (root) | The **UI Kit Dashboard** — the top-level standalone surface (~108KB). Its version label is stamped by `scripts/version-stamp.mjs` and CI-guarded (`stamp-check.yml`). Not to be confused with `review/index.html`. |
| `scripts/` | Node CI/governance scripts: `version-stamp.mjs` (version-label parity), `font-guard.mjs` (remote-font ban + token-validity scan), `cpl-measure.mjs` (rendered characters-per-line gate, needs Playwright). |
| `fonts/` | Fully self-hosted latin-subset `.woff2` — Poppins 400–800 + italic 400/500/600, Manrope 400–700, JetBrains Mono 400–700 (ADR-0008). `@font-face` set lives at the top of `colors_and_type.css`. |
| `adr/` | Ten accepted ADRs — the load-bearing decisions written down. |
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

The repo is governed by ten ADRs in `adr/` — each is short and load-bearing:

- **ADR-0001 · Typography: sans-only.** No serif face anywhere. Poppins (primary), Manrope (sans fallback), JetBrains Mono (technical). Editorial weight = Poppins 600 + italic, **not** a serif counterpoint. IBM Plex Sans was retired in v0.3.0.
- **ADR-0002 · Palette: single source.** `tokens/palette.js` is canonical; `colors_and_type.css` is generated via `tokens/sync.mjs`. JS consumers read `window.TK_TOKENS` and **throw** if it's missing — no hardcoded fallback. SVGs in `assets/` are an explicit static exception.
- **ADR-0003 · Token versioning.** Pre-1.0 semver is tightened — any visual change is MINOR. Every CHANGELOG entry must include versioning intent, pixel-diff scope, migration, and assets-to-regenerate.
- **ADR-0004 · Ghost Pro is the canonical authoring surface for `.org`.** MDX/Next.js stays a future option but is not built. BNR drift is flagged as an external issue.
- **ADR-0005 · Icon system.** Brand surfaces stay icon-free (Unicode mono glyphs only: `↓ ↗ ✓ ✗ ⧉ × · …`). Product surfaces use **Lucide outline, stroke 1.5, currentColor**, sizes 16/20/24/32. No mixing icon sets.
- **ADR-0006 · Trust-state CTAs.** Paired content (note + artifact) has four trust-state variants — anonymous / member / paid / entitled — with defined CTA treatments. The matrix at `trust-state-matrix.html` is the source of truth.
- **ADR-0007 · Fluid, rem-based type scale.** The `--tk-fs-*` scale uses `clamp()` + `rem` so token-driven type auto-resizes with viewport and honors user zoom (WCAG 1.4.4); 12px floors hold. Kit pages reference the tokens — never literal sizes.
- **ADR-0008 · Fully self-hosted fonts.** All brand weights (Poppins 400–800 + italic, Manrope 400–700, JetBrains Mono 400–700) ship as latin-subset `.woff2` in `fonts/`; the Google Fonts CDN `<link>`/`@import` is removed from every surface. No remote font dependency.
- **ADR-0009 · Release automation.** Conventional commits enforced by commitlint (husky hooks); release-please drives versioning + CHANGELOG. Tooling only — still no build step.
- **ADR-0010 · OG/social artifact tokens.** The stylesheet (`--tk-og-*` tokens) is the source of truth for *generated* brand assets — OG cards are rebuilt from tokens, not hand-tweaked. Governs generated ARTIFACTS (ADR-0007 governs on-PAGE text). The shipped pairs live in `assets/og_ship/`. This is the rehearsal for the future component-library phase (tokens-as-contract, shadcn model).

## Internal vs Public Documents (`admin/`)

The `admin/` tree is the **business/governance layer** and is governed by a hard confidentiality boundary that is independent of the design-system rules above. Everything under `admin/` falls into one of two trust zones, and **the zone a file lives in determines whether it may ever be committed, published, or fed to tooling.** Get this wrong and you leak strategy or financials.

| Zone | Path | Classification | May be published / ingested? |
|------|------|----------------|------------------------------|
| **Internal** | `admin/internal/**` | **Confidential — Internal Strategy** | **No.** Never publish, never paste into external surfaces or LLM context. `.gitignore` excludes the whole tree (`/admin/internal/`). |
| **Public** | `admin/public/**` | **Public-safe derivative** | **Yes.** Explicitly sanitized for ingestion into tooling, publishing pipelines, and LLM context. |

### The source-of-truth relationship

- `admin/internal/business/01.Tekrogen_BNR_Roadmap_v1.md` — the **BNR (Business Needs & Requirements Roadmap)** — is the *Confidential* source of truth for all business strategy, domain architecture, content strategy, revenue model, and roadmap.
- `admin/public/Tekrogen_Public_Brief_v1.md` is a **derivative** of the BNR — the publication-safe subset with all competitive/financial/temporal strategy stripped (see its "What This Brief Omits" table). It must **re-sync** whenever the BNR is amended.
- **Direction of flow is one-way:** facts move BNR → Public Brief, sanitized at the boundary. Never copy operational, financial, pricing, phase-timing, or vendor-evaluation detail from `internal/` into `public/` or into any committed artifact. When in doubt, treat it as Confidential.
- `admin/internal/` also holds licensing templates (`licensing/` — MIT for free repos, EULA for paid, All-Rights-Reserved for the proprietary site codebase), MS Word originals (`msword/`), environment/publishing workflows (`workflows/`), domain-repo scaffolding (`templates/`), and Next.js metadata snippets (`tools/`). These describe *other* Tekrogen repos (website, paid-templates, brand-marketing) — they are reference material here, not buildable code in this repo.

### Two gitignore gotchas — both currently misclassified

1. **`admin/public/` is accidentally ignored.** The Gatsby build rule `public/` (in `.gitignore`) matches *any* directory named `public` at any depth, so it silently swallows `admin/public/` — the publication-safe docs that are *supposed* to be tracked. `git check-ignore -v admin/public/<file>` shows the offending rule. If you intend these briefs to be committed, add a negation (`!admin/public/`) **after** the `public/` line, or rename the directory.
2. **Some `admin/internal/` files are already tracked despite the ignore rule.** `admin/internal/licensing/**` and `admin/internal/tools/**` were `git add`-ed *before* `/admin/internal/` was appended to `.gitignore`, so they live in committed history (and are currently staged). The ignore rule only stops *future* untracked files; it does not retroactively remove tracked ones. Before pushing, decide deliberately whether those Confidential-zone files belong in the public repo — if not, `git rm --cached` them. Do not assume the ignore rule alone protects the internal zone.

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
- **Lucide** (`unpkg.com/lucide@latest`) — product-surface icon set per ADR-0005

> **No fonts over CDN.** Per ADR-0008 the Google Fonts `<link>`/`@import` was removed from every surface; all weights are self-hosted `.woff2` in `fonts/`. `scripts/font-guard.mjs` and `cpl-measure.mjs` fail CI on *any* remote-font reference (including in comments). Don't reintroduce a Google Fonts link.

### Internal

- Every HTML file depends on `colors_and_type.css` and `tokens/palette.js`.
- `ui_kits/tekrogen-org/*.jsx` cross-depends via globals (Dragonfly → SectionHead → SiteHeader → … → App).
- `ui_kits/_shared/marks.jsx` and `Dragonfly.jsx` both throw if `window.TK_TOKENS` isn't loaded.

### Tooling

- **Node ≥18 + pnpm 11** (`packageManager` pins `pnpm@11.5.3`) — for tooling only. The `package.json` scripts wrap the Node CLIs; CI runs the `--check` variants:
  - `pnpm sync` / `pnpm check` → `tokens/sync.mjs` (palette mirror / parity check)
  - `pnpm stamp` / `pnpm stamp:check` → `scripts/version-stamp.mjs` (version-label parity)
  - `pnpm font:check` → `scripts/font-guard.mjs` (remote-font ban + `var(--tk-*)` token-validity scan; zero deps)
  - `pnpm cpl:check` → `scripts/cpl-measure.mjs` (rendered characters-per-line gate, ~72 target per Bringhurst; runs headless Chromium, so CI installs Playwright ephemerally — not a repo dependency)
- **CI workflows** (`.github/workflows/`): `font-guard.yml` (font ban + cpl gate), `stamp-check.yml` (version-label parity), `release-please.yml` (release automation per ADR-0009), `claude.yml` + `claude-code-review.yml` (Claude Code integration).
- **`package.json` + `pnpm-lock.yaml` exist for that tooling; still no bundler.** The no-build stance is intentional (ADR-0002) — JSX renders in the browser, nothing compiles. Dev-time/CI tooling (husky, commitlint, release-please per ADR-0009) is not a build step. Versioning policy is ADR-0003.

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
- **`admin/internal/` is Confidential; `admin/public/` is publication-safe.** The `.gitignore` rules do NOT reliably enforce this — `admin/public/` is accidentally ignored by the Gatsby `public/` rule, and some `admin/internal/` files are already tracked from before the ignore was added. Verify a file's zone before committing, publishing, or quoting it. See "Internal vs Public Documents" above. The BNR (`admin/internal/business/01.Tekrogen_BNR_Roadmap_v1.md`) is Confidential — only its sanitized derivative (`admin/public/Tekrogen_Public_Brief_v1.md`) is safe to ingest.

## Quick verification

```bash
pnpm check                                                    # palette parity (tokens/sync.mjs --check)
pnpm stamp:check                                              # version label parity (source: package.json)
pnpm font:check                                               # remote-font ban + token-validity scan
pnpm cpl:check                                                # rendered chars-per-line gate (needs Playwright)
grep -ri "serif" colors_and_type.css preview/_card.css ui_kits/  # only sans-serif fallbacks
grep -rE "(#446e88|#6491ac|#0db4b9|#7edba5)" --include='*.{js,jsx,css,html}'
# expect only: tokens/palette.js, colors_and_type.css, assets/*.svg
```

## Rules

These must be followed with no exceptions:

1. Do not ever include `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` in commits in this code base.
2. **Check files first, assume nothing.** When there is any confusion, contradiction, or ambiguity — especially about what this project *is*, what it references, or how it relates to other projects — verify against the documents, the data, and the codebase (README, CLAUDE.md, `git remote -v`, `git log`, `grep`) *before* answering or acting. Treat the repository's own files as authoritative over anything stated in chat, including loosely-worded inputs and your own prior statements. Report what the files say, then reason. Never carry an unverified claim from conversation forward as fact.