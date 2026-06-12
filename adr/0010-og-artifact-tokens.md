# ADR-0010 — OG/social artifact tokens: the stylesheet is the source of truth for generated brand assets

- **Status:** Accepted
- **Date:** 2026-06-11
- **Relates to:** ADR-0007 (fluid type scale — governs on-PAGE text; this ADR governs generated ARTIFACTS). ADR-0008 (self-hosted fonts — the embed pipeline this generator uses). Issue #3 carries the audit + acceptance criteria. This is also the architecture rehearsal for the component-library phase (tokens-as-contract, shadcn model).

## Context

The asset-pack OG/Twitter card generator (`ui_kits/asset-pack` → `ogSVG`) hardcoded every design value: an `OG_C` hex object and literal font sizes from 11 to 34 in the 1200×630 artifact space. Two problems:

1. **Legibility.** Feeds render a 1200px card at roughly 500px (~÷2.4). The literal sizes put most supporting text at ~5–8px rendered — below the brand's own 12px floor and far below expert guidance (≥30px primary text, ≥48px headlines at source resolution; center-80% safe zone; no critical text in the bottom 60px where platforms overlay the domain).
2. **Architecture.** A design system whose flagship "brand artifact" generator bypasses the token foundation contradicts the system's premise. The pill outline also overflowed its text because canvas `measureText()` ignores SVG `letter-spacing` — a defect class that token-aware width math eliminates.

## Decision

**All OG-card design values live in a hand-authored `--tk-og-*` block in `colors_and_type.css`; the generator is a pure consumer.**

- **The block** (in `:root`, after Layout, outside the generated `TK-PALETTE` region): six font sizes (`title 58 · name 34 · body 34 · wordmark 32 · meta 30 · chip-num 36`), two spacings (`pad 80 · chip-pad 24`), five colors (`bg · fg · accent · muted · chip`), plus the avatar/glow gradient drawn from base palette tokens.
- **Unitless numbers, not CSS lengths.** Values are coordinates in the fixed 1200×630 artifact space. Exports must be deterministic — `clamp()`/`rem` have no meaning in a PNG.
- **Theme-invariant by construction.** Color tokens alias base palette tokens (`--tk-ink`, `--tk-cyan`) and are defined in `:root` only — never in the `.tk-paper` block. The artifact is always Ink; toggling the page theme must not change exports.
- **The floor is a token.** `--tk-og-fs-meta: 30` (≈12px at feed scale) is the minimum; titles auto-shrink toward it for long input but never pass it.
- **Token/geometry boundary.** Tokens carry the design decisions (type scale, palette, core spacing). Per-card geometry — baselines, gaps, avatar radii, line-height factors — is component layout, computed in the generator from the tokens. (Same boundary shadcn draws between tokens and component CSS.)
- **Chips, not outlined pills.** Card badges render as filled chips (`--tk-og-chip`, no stroke — 1px hairlines vanish at feed scale) with width = measured text + letter-spacing × (chars − 1) + 2 × `--tk-og-chip-pad`.

## Consequences

- **Exports bake resolved values.** A PNG cannot reference CSS, so changing any `--tk-og-*` value changes every future render and export — and the already-shipped `og-*.png` set (Ghost `og_image` / `feature_image` / `cover_image` slots) must be **re-exported** after any change to this block. This release: regenerate all four.
- The card copy now lives in one `OG_CONTENT` object — the seam the inline editor (issue #4) binds to.
- `tokens/sync.mjs` is unaffected (the block is hand-authored, outside `TK-PALETTE-BEGIN/END`).
- The existing `--tk-fs-og-title` (fluid clamp) is unrelated: it sizes on-page text *styled like* an OG title. Both exist, documented as different layers.

## Verification

- `grep` of the generator shows no hex colors and no literal font sizes; all values route through the `OG` token reader.
- Headless (CDP): every rendered `<text>` in all four cards has `font-size ≥ 30`; chip rect width ≥ its text extent including letter-spacing; no critical text below y = 570 or outside the 80px margins; preview and `embed:true` export paths both render self-hosted Poppins/JBM with zero remote requests.
