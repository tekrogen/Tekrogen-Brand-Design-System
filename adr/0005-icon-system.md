# ADR-0005 — Icon system: Lucide outline on product, glyphs on brand

- **Status:** Accepted
- **Date:** 2026-05-16

## Context

The brand surfaces seen so far (marketing site, asset pack, master lockups, OG cards) use Unicode mono glyphs (`↓ ↗ ✓ ✗ ⧉ × · …`) and avoid pictogram icons entirely. The product surfaces (member dashboard, docs, settings, search) need a proper icon set — there's no Unicode glyph for "search," "settings," or "user."

Two failure modes to avoid:

1. **Mixed-set drift** — Lucide on the dashboard, Tabler on the docs, Heroicons on the settings page. Each set has different stroke weight metrics, optical sizing, and corner radii. Side-by-side they read as three different products.
2. **Brand-surface contamination** — adding pictogram icons to the marketing site or asset pack. The brand surfaces deliberately use type-and-glyph as a credibility cue; reaching for a pictogram is the easy first step that breaks the visual contract.

## Decision

**Brand surfaces:** stay icon-free. Unicode glyphs in mono only. The full glyph table is documented in `README.md` (Iconography section). If a glyph is missing for a real affordance, the answer is "find a Unicode character or write the word," **not** "introduce a pictogram."

**Product surfaces:** [Lucide](https://lucide.dev) is the only icon set.

- **Style:** Outline. Always. No filled variants.
- **Stroke:** `1.5` — not the default `2`. Matches the hairline-heavy Tekrogen surface.
- **Color:** `currentColor`. Links inherit `--tk-cyan`, body inherits `--tk-fg-2`, the brand palette never gets re-applied per icon.
- **Sizes:** `16` / `20` / `24` / `32` only. No 18, no 21. The four-step scale aligns with the spacing scale.
- **Source:** `https://unpkg.com/lucide@latest` pinned to a version. Web-component pattern: `<i data-lucide="search"></i>` + `lucide.createIcons()` on mount.

If Lucide is missing a glyph: draw it in the Lucide style (`24×24` viewBox, 1.5 stroke, rounded caps and joins) and check it in to a hypothetical `assets/icons-extra/`. **Do not** reach for another set.

## Consequences

- No code change in this pass — no product surface has shipped yet. ADR exists to lock the decision before the first product page is built.
- `README.md` Iconography section already documents this. The ADR is the authority; the README is the surface that consumers read.

## Rejected alternatives

- **Tabler / Phosphor / Heroicons** — all credible, all different metrics. Picking any one is fine; mixing two is not.
- **Material Symbols** — heavier metrics, Material design language. Off-brand for an engineering-credibility surface.
- **Custom icon set** — the work of drawing 200+ glyphs at brand quality is far larger than the value of "perfectly bespoke icons." Lucide gets us 95% of the way there for zero ongoing maintenance.
