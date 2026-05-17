# Tekrogen — Architecture Decision Records

Lightweight ADRs. Each file captures one decision: the context that forced it, the options considered, the choice made, and what changes downstream. Naming: `NNNN-kebab-case-title.md`. Status: `Proposed` → `Accepted` → `Superseded` (link the superseder).

## Why ADRs at all

The system is small enough that the README and code carry most decisions. ADRs exist because a few decisions are load-bearing across multiple files and were previously stored as tribal knowledge — the kind of thing that drifts the moment two collaborators disagree about the original intent. The ADRs aren't governance theater; they're the load-bearing decisions written down once, so the codebase can be re-derived from them.

## Index

| #    | Title                                             | Status   | Files affected                                            |
|------|---------------------------------------------------|----------|-----------------------------------------------------------|
| 0001 | [Typography — sans-only](0001-typography-sans-only.md)             | Accepted | `colors_and_type.css`, `fonts/`, all kit JSX               |
| 0002 | [Palette — single source](0002-palette-single-source.md)           | Accepted | `tokens/palette.js`, `colors_and_type.css`, mark JSX       |
| 0003 | [Token versioning — semver](0003-token-versioning.md)              | Accepted | `CHANGELOG.md`, future `@tekrogen/tokens` npm package      |
| 0004 | [Canonical authoring surface — Ghost Pro](0004-canonical-authoring-surface.md) | Accepted | `ui_kits/tekrogen-org/`, BNR (flagged externally)          |
| 0005 | [Icon system — Lucide on product, glyphs on brand](0005-icon-system.md) | Accepted | All product surfaces; brand surfaces remain icon-free      |
| 0006 | [Trust-state CTAs — paired-content primitive](0006-trust-state-cta.md) | Accepted | `trust-state-matrix.html`, future commerce surfaces        |

## Out of scope here

The Cursor analysis flagged drift in `workflows/_planning/WF-001` and the BNR roadmap (`admin/about/01.Tekrogen_BNR_Roadmap_v1.md`). Those live outside this design-system repo. ADR-0004 flags the BNR ↔ live-stack mismatch but does not fix it — the fix belongs in the BNR amendment process, not here.
