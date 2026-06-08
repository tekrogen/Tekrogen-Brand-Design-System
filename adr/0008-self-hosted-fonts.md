# ADR-0008 — Fully self-hosted fonts (no remote font CDN)

- **Status:** Accepted
- **Date:** 2026-06-07
- **Relates to:** ADR-0001 (sans-only typography) and ADR-0007 (fluid rem type scale). ADR-0001 fixes *which* faces ship; this fixes *where they load from*.

## Context

Until now the system was half-hosted: only the Regular (400) weights of Poppins, Manrope, and JetBrains Mono were self-hosted woff2. Every heavier weight (Poppins 500/600/700/800, Manrope 500/600/700, JetBrains Mono 500/600/700) and all italics were pulled at runtime from the Google Fonts CDN via a `<link>` in each surface's `<head>` (and an `@import` in `preview/_card.css`). `fonts/README.md` flagged this as the open gap.

That split caused three problems:

1. **A third-party runtime dependency on every surface.** Rendering the heavier weights — i.e. the wordmark, every heading, every mono label — blocked on an external request, with the privacy and FOUC implications that carries.
2. **Rasterization failures.** Canvas/SVG export (the asset-pack OG cards) cannot reach a remote `@import` during rasterization, so the fonts silently dropped and the cards exported in a fallback face. Embedding a *local* woff2 is the only reliable path.
3. **Drift.** Each surface hand-rolled its own Google `<link>` with a slightly different weight/italic axis string, and several also duplicated the 400 `@font-face` inline — multiple sources of truth for "what loads."

## Decision

**Every brand weight — Regular through 800, upright and italic — is self-hosted from `/fonts/` as latin-subset woff2, declared once in `colors_and_type.css`. No surface loads a remote font CDN.**

- The full set is committed as latin-subset woff2 (~8–21KB each): Poppins 400/500/600/700/800 + italic 400/500/600; Manrope 400/500/600/700; JetBrains Mono 400/500/600/700. Subset/conversion via `fontTools` (command recorded in `fonts/README.md`).
- `@font-face` for all of the above lives **only** in `colors_and_type.css`. Consuming surfaces get every weight by linking that one file — they do not declare their own `@font-face` and do not link Google Fonts.
- The faces are SIL OFL 1.1; `fonts/OFL.txt` ships alongside them (subsetting + format conversion are permitted under the OFL).

## Scope note — what still references the CDN

Two kit pages — `ui_kits/mark-explorations/` and `ui_kits/tekrogen-org/` — still carry the Google `<link>` and are cleared during their P2 conversions, not here (mark-explorations additionally loads non-brand **Inter**, which is *replaced*, not merely dropped). Two untracked working artifacts (`Component Gap Analysis.html`, `review/type-size-audit.html`) are out of scope. The standalone dashboard export inlines its fonts and is a frozen snapshot.

## Consequences

- The asset-pack OG cards now embed the local woff2 as base64 at export time and rasterize in real Poppins — the export-fidelity fix and this ADR are the same migration.
- Surfaces that loaded Poppins italic (master-lockups, trust-state-matrix, review, and tekrogen-org once converted) keep *real* italic rather than a synthesized oblique, because italic 400/500/600 are now self-hosted. This closes `fonts/README.md` flag #4 — except true italic on tekrogen-org, which lands with its conversion.
- Redundant inline 400 `@font-face` blocks (asset-pack, master-lockups) were removed; those surfaces now source fonts solely from `colors_and_type.css`.
- A surface that needs a weight not in the set is wrong, not under-served — add the woff2 + `@font-face` to the foundation, never a remote `<link>`.

## Verification

- No tracked, in-use surface references the font CDN: `grep -rIn "fonts.googleapis\|fonts.gstatic" .` (excluding `.git`, `admin/internal`, `*.bak`, the `_ds_bundle.js` / `design-canvas.jsx` code comments, and the standalone export) returns only `mark-explorations` + `tekrogen-org` (deferred) and the two untracked artifacts.
- `colors_and_type.css` declares `@font-face` for all 16 faces (13 upright + 3 italic); every `src` is a local `fonts/*.woff2`.
- `fonts/OFL.txt` is present.
- With the network blocked, the six converted surfaces render in real Poppins / Manrope / JetBrains Mono at every weight — no system-font fallback.
