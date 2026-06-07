# ADR-0007 — Fluid, rem-based type scale

- **Status:** Accepted
- **Date:** 2026-06-07
- **Relates to:** ADR-0001 (sans-only typography) and ADR-0002 (palette single source). This is the type-side counterpart to ADR-0002 — `colors_and_type.css` owns the scale, everything else consumes it.

## Context

The v2 UI/UX audit kept surfacing one defect from two angles:

1. **Sub-minimum text.** Specimen labels, eyebrows, and mock captions were landing at 9–11px — below the 12px floor set in v0.7.0 — because they were authored as literal `px` (and inline `fontSize: N`) inside kit pages and JSX, not drawn from the `--tk-fs-*` tokens.
2. **Type that did not respond.** The `--tk-fs-*` scale was a fixed-`px` ladder. Fixed px honors browser zoom but does not adapt to viewport — and, more to the point, the kit pages were *bypassing the scale entirely* with inline `px`, so the single source of truth was not actually sourcing anything. A token defined correctly upstream fixes nothing if the consuming surface hardcodes a value and never references it. This is the same consumption-layer failure ADR-0002 names for color.

The brand owner's standing rule is explicit: every surface must resize and auto-adjust to the screen, every type size must be a consistent token call, and there are no hardcoded sizes. WCAG 1.4.4 (resize text to 200%) and 1.4.10 (reflow) are the external anchors; the internal one is "the scale is the contract."

## Decision

**The `--tk-fs-*` scale is fluid and rem-based, and it is the only place a type size may be defined.**

- **Headings scale with the viewport** via `clamp(min, rem + vw, max)` — they grow between a floor and a ceiling, so a 1200px and a 360px screen each get an appropriate size with no media query:
  - `--tk-fs-display` `clamp(2.5rem, 1.8rem + 3.5vw, 4rem)`
  - `--tk-fs-h1` `clamp(2rem, 1.5rem + 2.2vw, 3rem)`
  - `--tk-fs-h2` `clamp(1.5rem, 1.25rem + 1.1vw, 1.75rem)`  (24→28px)
  - `--tk-fs-h3` `clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)`  (18→20px)
  - `--tk-fs-og-title` `clamp(1.75rem, 1.4rem + 1.6vw, 2.125rem)`  (28→34px; shared OG / social artifact spec)
- **Body, labels, and code are `rem`** (not px) so they track the root font-size and the user's zoom / default-size preference:
  - `--tk-fs-h4` / `--tk-fs-body` `1rem`, `--tk-fs-body-sm` `0.875rem` (14px), `--tk-fs-code` `0.8125rem` (13px)
- **The floor is 12px, by design.** `--tk-fs-eyebrow` and `--tk-fs-meta` are `0.75rem` (12px). There is deliberately no token below 12px; a surface that "needs" 11px is wrong, not under-served.
- **No literal sizes in consuming surfaces.** Every `font-size` / `fontSize` references `var(--tk-fs-*)`. If a needed step does not exist, add it to the scale in `colors_and_type.css` — one place — never inline a literal.

## Scope note — synced vs. hand-maintained

`tokens/sync.mjs` syncs only the **color** palette (between the `TK-PALETTE` markers) into `tokens/palette.js`. The `--tk-fs-*` scale is **not** synced — it is hand-maintained in `colors_and_type.css` with no `palette.js` mirror. Changing a size is a one-line edit there; it propagates to every consumer through the cascade.

## Consequences

- Specimens are exempt in *content*, not in *mechanism*. A specimen reproducing a fixed artifact size (e.g. an OG card rasterized at exact px for export) may pin its own value, but chrome — headings, prose, labels, tables, toolbars — always consumes the tokens.
- Converted so far: `colors_and_type.css` (the scale), `ui_kits/master-lockups/` (`index.html` + `lockups-app.jsx`), and `ui_kits/asset-pack/` (chrome rules + the JS download-dock / link helpers) — every literal size → token. Only the `.og` card specimens, inline OG markup, and logo wordmarks stay fixed (rasterized at exact px for export).
- Still to convert (tracked in audit remediation): `ui_kits/mark-explorations/` and `ui_kits/tekrogen-org/` (P2); `preview/` (P4).
- A CI guard (audit phase P4) will fail on any raw `font-size:` / `fontSize:` in `ui_kits/**` that is not `var(--tk-fs-*)`, making this ADR enforceable rather than aspirational.
- Headings that previously sat on off-scale fixed values shifted to the nearest scale step (e.g. master-lockups `h1` 56→≤48px, `h2` 32→≤28px). This is intended — the scale is the contract.

## Verification

- Chrome on converted surfaces is literal-free: `grep -nE "font-size: ?[0-9]" ui_kits/master-lockups/index.html` and `grep -nE "fontSize: ?[0-9]" ui_kits/_shared/lockups-app.jsx` return nothing; on `asset-pack` the only remaining `font-size:Npx` hits are the exempt `.og` specimens, inline OG markup, and logo wordmarks (rasterized artifacts). The P4 CI guard extends this assertion to each surface as it lands.
- Every `--tk-fs-*` value in `colors_and_type.css` is a `rem`, or a `clamp()` expressed in `rem` + `vw` — no bare `px` in the scale.
- No `--tk-fs-*` token resolves below `0.75rem` (12px).
- At 200% browser zoom, body / labels / code double (rem); headings stay within their clamp ceilings; no text falls below 12px at default zoom.
