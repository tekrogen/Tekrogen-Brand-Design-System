---
name: tekrogen-design
description: Use this skill to generate well-branded interfaces and assets for Tekrogen — the four-entity stack behind tekrogen.org / .studio / .com / .net — for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, mark SVGs, and UI kit components for Ghost publications, asset packs, brand specimens, and field-notes editorial surfaces.
user-invocable: true
---

Read the `README.md` file within this skill first, and explore the other available files:

- `colors_and_type.css` — token system (`--tk-*` CSS vars + semantic styles). Load this first in any artifact.
- `assets/` — production logos (`tekrogen-logo-light.svg`, `tekrogen-logo-dark.svg`), the bare mark (`tekrogen-mark.svg` / `-inverse.svg`), icons, favicon, OG cards. Copy out, don't redraw.
- `ui_kits/tekrogen-org/` — JSX components for the Ghost publication (SiteHeader, Hero, FieldNoteCard, Article, SubscribeBlock, Footer, Dragonfly). The canonical brand surface.
- `ui_kits/asset-pack/`, `ui_kits/master-lockups/`, `ui_kits/mark-explorations/` — production reference pages for brand foundations.
- `preview/` — small specimen cards for individual tokens / components — useful as visual references when picking a color, radius, button style, etc.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. Fonts are **fully self-hosted** in `fonts/` (ADR-0008): Poppins (sans + wordmark + editorial), Manrope (sans fallback), JetBrains Mono (technical) — loading `colors_and_type.css` loads the `@font-face` set; never add a Google Fonts `<link>`/`@import` (CI font-guard fails on any remote font reference). For artifacts that live outside the repo, copy the needed `.woff2` files out alongside the stylesheet. Tekrogen is **sans-only** — do not load a serif face. If working on production code, you can copy the SVG marks and read `README.md` + `colors_and_type.css` to become an expert in designing with the Tekrogen brand.

Key brand invariants — never break these:

- **The mark statement** — *"Four wings, one pursuit. Each wing is one entity — .org, .studio, .com, .net. The pursuit is the same across all four: build it, prove it, publish what we learned."* Use verbatim wherever the mark introduces itself. Do not substitute "spine" / "throughline" / "current" / "signal" — those were considered and retired in favor of "pursuit."
- **The dragonfly mark is tilted 18° clockwise.** Always. CSS var `--tk-tilt-mark`.
- **Wordmark `TEKROGEN`** is UPPERCASE, Poppins 700, `letter-spacing: 0.18em`. Always.
- **Entity names** are lowercase with the dot: `tekrogen.org`, `.com`, `.net`, `.studio`. Never "Tekrogen Org."
- **Tagline:** "Real solutions. Built, proven, ready to use." — verbatim, don't paraphrase.
- **No emoji**, no gradient backdrops, no stock photography, no AI-slop tropes. Hairline borders carry depth, not drop shadows.
- **Cyan accent `#1FD5DA`** is used once per surface — primary CTA or hero accent only.
- **Icons** — brand surfaces are icon-free (Unicode glyphs in mono only: `↓ ↗ ✓ ✗ ⧉ × · …`). Product / app surfaces use **Lucide outline, 1.5 stroke, currentColor**. Don't mix sets.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (which entity / which surface / which type system / dark or paper / what tone of field note), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
