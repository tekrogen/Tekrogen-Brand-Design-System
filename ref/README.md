# Reference Index

> **A pointer map, not a second copy.** This repo's reference material already lives in
> canonical, load-bearing places (the ADRs, `CLAUDE.md`, the gallery/study surfaces). To honor
> the single-source ethos (ADR-0002) and avoid drift, this index **points to** those sources
> rather than re-deriving them. Read the canonical doc; don't duplicate it here.

## What you need → where it lives

| Area | Canonical source(s) |
|------|---------------------|
| **Architecture / decisions** | `CLAUDE.md` → *Purpose* + *Architecture Decisions*; the **ADRs** in [`adr/`](../adr/) (read [`adr/README.md`](../adr/README.md) for the index). Each ADR is short and load-bearing. |
| **Directory structure** | `CLAUDE.md` → *Key Components* (the path/role table). |
| **Components (the registry)** | [`components/`](../components/) (one dir per component: `<name>.{css,html,hbs}`) + the [`tk-components.css`](../components/tk-components.css) barrel; [`Component Gallery.html`](../Component%20Gallery.html) (live catalog + HTML·CSS·Ghost copy); [`Component Gap Analysis.html`](../Component%20Gap%20Analysis.html) + [`Component Model Study.html`](../Component%20Model%20Study.html); **ADR-0011** (model) + **ADR-0012** (gallery/copy-code contract). |
| **Tokens / foundations** | [`colors_and_type.css`](../colors_and_type.css) (`--tk-*` vars); [`tokens/palette.js`](../tokens/palette.js) (canonical pillar/surface hexes) → [`tokens/sync.mjs`](../tokens/sync.mjs) mirror; **ADR-0002 / 0007 / 0008 / 0010**. |
| **Configuration / tooling** | `package.json`, `release-please-config.json`, `.release-please-manifest.json`, `commitlint.config.cjs`; CI scripts in [`scripts/`](../scripts/) (`version-stamp` / `font-guard` / `cpl-measure`); `CLAUDE.md` → *Dependencies*. No bundler/build (ADR-0002/0009). |
| **Patterns & gotchas** | `CLAUDE.md` → *Implementation Patterns*, *Gotchas and Non-obvious Behaviors*, *Common Operations*. |
| **Governance / release / git** | `CLAUDE.md` → *Rules* (#3 branch naming, #4 engine selection) + the release-please/ADR-0003 gotchas; **ADR-0009**; the cross-project library at `/Volumes/SERV01-DTMAC/_Code_Library/GIT-Workflows`. |
| **Trust states / membership** | [`trust-state-matrix.html`](../trust-state-matrix.html) + **ADR-0006** (anonymous / member / paid / entitled). |
| **Verification commands** | `CLAUDE.md` → *Quick verification* (`pnpm check` / `stamp:check` / `font:check` / `cpl:check`). |
| **Project status / handoff** | `admin/internal/workflows/02.publishing/stage-d-component-library-status-2026-06-14.md` (Confidential/internal) — what shipped + the full PR↔issue↔version ledger. |

## Notes

- The mark is always rotated **18°** (baked into the SVG — don't double-rotate); one cyan accent per surface; hairlines, not shadows; ink/paper are the only two surface modes. (Details in `CLAUDE.md` → *Implementation Patterns*.)
- The registry feeds a downstream repo, **`Tekrogen-Ghost-theme-mockup`** (vendored `components/`); see that repo's `admin/status/` handoff for the Ghost-theme bridge.
- If a fact here ever conflicts with a canonical source, **the canonical source wins** — fix this index, don't fork the truth.
