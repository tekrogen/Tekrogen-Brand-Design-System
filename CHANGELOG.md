# Changelog

All notable changes to the Tekrogen Design System. Format follows [Keep a Changelog](https://keepachangelog.com/), versioning follows [Semver](https://semver.org/) with the pre-1.0 tightening in [`adr/0003-token-versioning.md`](adr/0003-token-versioning.md).

---

## [0.10.0](https://github.com/tekrogen/Tekrogen-Brand-Design-System/compare/v0.9.0...v0.10.0) (2026-06-13)


### Features

* **components:** C1 structural composites — header / footer / section-head / label (stage d) ([#30](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/30)) ([0d05b79](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/0d05b799d2276942184fbe581a2815d62e1abc12))
* **components:** C2 data & forms — table, field, callout, cta-block, stat (stage d) ([#34](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/34)) ([34ece1e](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/34ece1e300eea2202852532d49b18a005970fd0a))
* **components:** C3 cards — content/listing/pillar-button/category/team/manifesto (stage d) ([#36](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/36)) ([2b62b30](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/2b62b302bda8ec0a0677c92ac5b2f4057c973357))
* **components:** C4 flywheel — tk-flywheel (SVG) + tk-flywheel-stepper (stage d) ([#38](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/38)) ([c9cdd18](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/c9cdd18e86d922b6787793284784777c8712ef70))
* **components:** C5 commerce composites (license tier, product hero, feature grid, demo, artifacts) ([#40](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/40)) ([968aed1](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/968aed19ecc470f40d34540adf27c3c0fa0e783c))
* **components:** C6 distribution composites (docs hero, pipeline, version timeline) ([#42](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/42)) ([ae0accf](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/ae0accfadf41ed6ab7553f97267fc0e4c3a9e353))
* **components:** C7 membership composites + --tk-fg-on-accent token (closes [#19](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/19), [#43](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/43)) ([#44](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/44)) ([0208909](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/0208909ad07657c25be260abf98446d334f31203))
* **components:** pillar-aware button/badge/card variants (stage d, PR 1) ([#24](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/24)) ([288d6b7](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/288d6b7e5070e3f7bbbd5c48c648acff728972eb))
* **components:** registry + gallery with HTML·CSS·Ghost copy (stage d, PR 1) ([#18](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/18)) ([c012caa](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/c012caa451804f18d4595d87c4a9f10e7f2b94aa))
* **components:** site-header util slot + footer nav variant (stage d, C1) ([#32](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/32)) ([0c2c511](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/0c2c511fdbd2ffa17af8ad5a4e4c4b039e7ee416))
* **components:** tk-button editorial CTA variant — data-style=cta (stage d) ([#28](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/28)) ([e124550](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/e124550c88df220b09e3a99f55c93aecdf27bfd2))
* **components:** tk-button inline-flex + gap + hint slot (stage d) ([#26](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/26)) ([23cd1a4](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/23cd1a4a88b283ea18cbe577243e65c64c9262f3))

## [Unreleased]

> **Versioning intent — minor.** First implementation of the component model (ADR-0011): the five already-shipped primitives are lifted out of the `index.html` dashboard `<style>` into a token-only `components/` registry and presented in a new `Component Gallery.html` with per-component `HTML · CSS · Ghost` copy. Off-scale padding on the extracted primitives is snapped to the `--tk-space-*` scale — an intended, sub-pixel-to-2px visual change on the **preview specimens only** (the dashboard itself is untouched this PR). New surfaces + an intended pixel-diff ⇒ minor per ADR-0003. Gallery & copy-code contract recorded in ADR-0012; Header / Footer / Navigation and the token completions (`--tk-overlay`, `--tk-danger-text`, `--tk-fg-on-accent`) follow in later PRs.

### Pixel diff

- **Visible — `preview/card-{button,input,mono-pill,card-anatomy}.html` (Ink + Paper).** These specimens now consume the new `.tk-*` classes instead of inline literals; component padding is snapped to the spacing scale, so chrome shifts ≤2px per edge (button `9×14 → 8×16`, input `10×14 → 12×16`, badge `5×11 → 4×12`, card head/body/foot to `--tk-space-*`). Colors, type, and radius are unchanged (mapped to render-identical tokens). `card-avatar.html` is value-identical (size stays inline geometry).
- **Not visible — `index.html` (Dashboard).** The source `.btn` / `.card` / `.input` / `.mono-pill` / `.avatar` blocks are unchanged; the registry is a parallel extraction, not a refactor of the dashboard. The dashboard adopting `.tk-*` is a later follow-up.

### Migration

- None required. New consumers should link `components/tk-components.css` (the barrel) **after** `colors_and_type.css` and use the `.tk-*` classes with `data-variant` / `data-tk-slot`; the bare class renders the default variant.
- The barrel and every component import must use the `@import url('./…')` form — `scripts/font-guard.mjs` only follows `url()` imports (ADR-0012).

### Assets to regenerate

None.

### Added

- `components/` — token-only component registry: `button/`, `card/`, `input/`, `badge/` (from the mono pill), `avatar/`, each shipping `<name>.{css,html,hbs}`, plus the `tk-components.css` `@import url()` barrel. CSS consumes `var(--tk-*)` exclusively; the sole literal exception is `.tk-avatar`'s white-on-pillar `color: #fff` (documented; `--tk-fg-on-accent` deferred per ADR-0011 §7).
- `Component Gallery.html` (repo root) — single-page gallery: live theme-following specimens + per-component tabbed `HTML · CSS · Ghost` copy (`⧉` glyph, `navigator.clipboard`). Reuses the study-page chrome, the `_shared/tk-theme.*` toggle, and the asset-pack clipboard idiom. Static `jun 2026` label, intentionally outside `version-stamp` `FILES`.
- `adr/0012-gallery-and-copy-code-contract.md` — "Component gallery & copy-code contract" decision (Accepted): per-component registry, the `@import url()` requirement, the three renderings, and the `.hbs` Ghost helper-mapping table. Index row added.
- **C1 structural composites** (`components/{section-head,label,site-header,footer}/`) — the first composites batch group, each `{css,html,hbs}` + barrel + gallery demo. Extracted **canonical** from `tekrogen-org` JSX (SiteHeader / Footer / SectionHead): `tk-section-head` (slots eyebrow/title/meta, `data-size="sm"`), `tk-label` (mono pill / `data-variant=chip|tag` / `data-pillar` — consolidates `.pill-mono`/`.chip`/`.tag`), `tk-site-header` (sticky+blur default + `data-style="framed"` for in-frame contexts), `tk-footer` (brand + four pillar cards + colophon). Token-only; the only literals are component geometry (blur radius, hairline widths, 2px pillar accent — matching canonical). Unblocks the mockup's header/footer/nav/section-head migration (separate mockup PR).
- **C1 enhancements** — `tk-site-header` gains a `data-tk-slot="util"` group (search / sign-in / cart / portal; brand takes `margin-right:auto`), and `tk-footer` gains a `data-style="nav"` column-links variant (brand + four pillar link columns) for richer footers; the canonical pillar-cards stays the default. Additive; specimens + gallery updated. Closes the two structural gaps the mockup's header/footer need.
- **C2 data & forms composites** (`components/{table,field,callout,cta-block,stat}/`) — each `{css,html,hbs}` + barrel + gallery demo. `tk-table` (hairline rows, mono-caps header, no zebra, `[data-num]` right-align — gap-analysis P1), `tk-field`/`tk-form`/`tk-field-row` (label + .tk-input wrapper — P1), `tk-callout` (left-accent note, `data-pillar`), `tk-cta-block` (centered eyebrow+title+actions, `data-pillar`; relates to SubscribeBlock), `tk-stat`/`tk-stats` (big number + mono label). Token-only; the only literals are the 3px left-accents + a responsive breakpoint. Unblocks the C2 mockup migration (s3/s4/s9 tables/forms/callouts + home stats).
- **C3 card composites** (`components/{content-card,listing-card,pillar-button,category-card,team-card,manifesto-card}/`) — each `{css,html,hbs}` + barrel + gallery demo. `tk-content-card` (study/post card: head+title+desc+rel chips, `data-pillar` hover), `tk-listing-card` (case-study row + related-links), `tk-pillar-button` (browse tile), `tk-category-card` (icon + links), `tk-team-card` (+ a new `tk-avatar[data-style="mono"]` variant for mono initials), `tk-manifesto-card` (pillar card). Token-only (geometry literals only). Gallery now showcases **20 components**. Unblocks the C3 mockup migration (s1/s2/s6/s7/s8 cards). `--tk-fg-on-accent` / avatar `#fff` (#19) still deferred.
- **C4 flywheel composites** (`components/{flywheel,flywheel-stepper}/`) — the signature viz. `tk-flywheel` (8-node circular SVG; pillar arcs via `data-arc`, nodes via `data-node`+`data-pillar`, center label `data-tk-slot="core"` — colors in CSS, not inline, so the token chain resolves), `tk-flywheel-stepper` (linear 8-step bar; `data-pillar` + `data-state=done|here`; sub-12px mockup sizes raised to the floor). Token-only (SVG coordinate-space geometry excepted). Gallery now showcases **22 components**. Unblocks the C4 mockup migration (s1 flywheel; s6/s7 steppers).
- **`--tk-fg-on-accent` token** (`colors_and_type.css`) — white-on-pillar/cyan foreground for avatars, ribbons, and any text on a colored fill; one `:root` definition holds in both ink and paper (the fill is colored in both). The deferred ADR-0011 §7 completion. `avatar.css` now uses it instead of the literal `#fff` — **closes #19**. (fg tokens live in the stylesheet, not `tokens/palette.js`, so `pnpm check` palette parity is unaffected.)
- **C7 membership composites** (`components/{member-ladder,auth-card,dashboard,confirm}/`) — each `{css,html,hbs}` + barrel + gallery demo. `tk-member-ladder` (anonymous→free→paid access ladder; pillar-keyed steps with top accent, included/`data-state="excluded"` items — the ADR-0006 trust map as a component), `tk-auth-card` (sign-in/register: head label+state-pill + tk-form slot + notes), `tk-dashboard` (paid-member shell: head with `tk-avatar`+identity+role + side nav w/ counts + main orders `tk-table`), `tk-confirm` (post-checkout: status + detail grid + license keyline + actions; com-keyed). Token-only. Gallery now showcases **34 components** — the composites batch (C1–C7) is complete. Unblocks the C7 mockup migration (s9 account: ladder / auth / dashboard / confirmation).
- **C6 distribution composites** (`components/{docs-hero,pipeline,version-timeline}/`) — each `{css,html,hbs}` + barrel + gallery demo. `tk-docs-hero` (two-col docs header: badge/title/lead + search-bar slot + version labels + a pipeline aside; net-keyed), `tk-pipeline` (distribution-architecture flow: head + node row joined by → arrows, `data-state="active"`, num/name/sub; `data-pillar`, default net), `tk-version-timeline` (release history: title + version rows — version+date / body+chips / download; `data-pillar`, default net). Token-only (literals: 1px hairlines/active ring, node min-width, search max-width, version-column track). Gallery now showcases **30 components**. Unblocks the C6 mockup migration (s7 docs hero / pipeline / version history).
- **C5 commerce composites** (`components/{license-tier,product-hero,feature-grid,demo-preview,artifact-list}/`) — each `{css,html,hbs}` + barrel + gallery demo. `tk-license-tier` (pricing card: `data-variant="featured"` ribbon + com ring, `data-state="excluded"` ✗ list items; slots name/price/desc/features/cta), `tk-product-hero` (two-col: price-block amt/from/term/lic + ✓ summary + striped visual; com-keyed), `tk-feature-grid` (what-you-get cards), `tk-demo-preview` (striped iframe placeholder + shots grid + mono key/val meta strip), `tk-artifact-list` (membership-gated download panel — the ADR-0006 trust-state partial: gate header + name/size/dl rows, `data-pillar`-keyed lock; the `.hbs` swaps gate + CTA on `@member`). Token-only (literals: 1px hairlines/featured ring, hatch geometry, breakpoints). Gallery now showcases **27 components**. Unblocks the C5 mockup migration (s5 demo/artifacts; s6 product hero/license matrix/features).

### Changed

- `preview/card-{button,avatar,input,mono-pill,card-anatomy}.html` — upgraded from inline-literal demo cards to ADR-0011 reference renders that link the component CSS and use the `.tk-*` classes; `@dsCard` annotations preserved.
- `components/{button,badge,card}` — **pillar-aware** `data-pillar="org|studio|com|net"` axis (ADR-0011 §4, the brand's pillar-keyed color access): the button fill/accent, the badge (now a tinted pill + leading status dot), and the card hover hairline key off the pillar instead of cyan; the button also gains `data-block` (full-width CTA). Specimens, `.hbs` partials, and the gallery demos/copy updated in lockstep. **Additive — bare classes and existing `data-variant` defaults are unchanged (no pixel-diff to current usages).** Unblocks the Tekrogen Ghost-theme-mockup migration (its pillar-colored CTAs / badges / cards can now consume the registry). The lone literal remains `.tk-avatar`'s `#fff` (`--tk-fg-on-accent` still deferred, issue #19).
- `components/button` — base is now `inline-flex` + `gap` (composes icon / label / sub-label) and gains a `[data-tk-slot="hint"]` mono-dimmed sub-label (e.g. `Run the demo ↗ studio`). **Additive — single-label buttons render unchanged.** Unblocks the mockup's sub-label CTAs ahead of the primitive migration (#25).
- `components/button` — `[data-style="cta"]` editorial variant: **sans, mixed-case, weight 600, roomier** (`--tk-fs-body-sm`, `--tk-space-3 × -5`), overriding only the default's technical mono/UPPERCASE face. Color still comes from `data-variant` / `data-pillar`, so it composes (`data-style="cta" data-pillar="com"`). Records that the registry now encodes **both** brand button languages — technical (dashboard) and editorial (publication) — so publication surfaces migrate without a restyle. **Additive.** (#27)

## [0.9.0](https://github.com/tekrogen/Tekrogen-Brand-Design-System/compare/v0.8.0...v0.9.0) (2026-06-12)


### Features

* **asset-pack:** inline-editable OG card content with live preview + export ([#11](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/11)) ([f63b0f9](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/f63b0f9c114c7a5595cd79ac6e6245bf67eaa0a1))
* **asset-pack:** redesign OG cards — legibility floor via --tk-og-* tokens ([#10](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/10)) ([eda2264](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/eda226407db3c4762cb1718dd4d2ce2209137270))


### Bug Fixes

* **asset-pack:** mid/narrow-width overflow — toolbar bleed at 980px breakpoint + slot-table scroll wrapper ([7ca9776](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/7ca9776b8c5676ce3ed88ed079fb1caa6b9e957f))
* **theme:** paper pill contrast + background separation ([#12](https://github.com/tekrogen/Tekrogen-Brand-Design-System/issues/12)) ([0c7eaad](https://github.com/tekrogen/Tekrogen-Brand-Design-System/commit/0c7eaad147ac71652c35656f7a748b97e339586d))

## [0.8.0] — 2026-06-11

> **Versioning intent — minor.** Accessibility remediation batched across audit phases; the version bump + `pnpm stamp` happen at the release cut, not on each phase branch. **P0** — Paper-theme color-contrast fixes (no Ink change). **P1** — shared framework-agnostic Ink/Paper theme toggle (`_shared/tk-theme.*`) with correct `role="group"` / `aria-pressed` semantics (the dashboard's `role="tablist"` bug is fixed when it adopts the component in P3). **P2** — kit pages adopt the shared toggle and wire chrome to `--tk-*` tokens so they theme; specimens (OG cards, paper demos, mark-on-dark, code blocks) stay fixed. **Type scale** — the `--tk-fs-*` scale is now fluid (`clamp()` + `rem`) so token-driven type auto-resizes with viewport and honors user zoom (WCAG 1.4.4); 12px floors held. Kit pages reference the tokens (no literal sizes); decision recorded in ADR-0007. **P3 (layout)** — a fluid `--tk-shell-max` (`min(1760px, 94vw)`) replaces the hardcoded shell / page maxes, and the dashboard's fixed inner card grids become `auto-fit` so they wrap instead of clipping on narrow screens. **Fonts (P4)** — all brand weights (Poppins 400–800, Manrope 400–700, JetBrains Mono 400–700, plus Poppins italic 400/500/600) are now self-hosted as latin-subset woff2; the Google Fonts CDN `<link>` / `@import` is removed from every converted surface; and the asset-pack OG cards are rebuilt as fluid pure-SVG that embed the local fonts (fixing both narrow-width clipping and the broken zip export). Recorded in ADR-0008.

### Pixel diff

- **Visible — Paper theme only (`colors_and_type.css`).** Links (`a` / `.tk-a`), eyebrows (`.tk-eyebrow`), and inline `code` / `.tk-code` now resolve to `--tk-link` / `--tk-accent` = `#0a7e83` (4.73:1, WCAG AA) instead of `--tk-cyan` `#1fd5da` (1.76:1, fail). `--tk-border` raised `#e6ebef` → `#d4dce3` (1.17:1 → 1.35:1; decorative hairline, more visible).
- **Not visible — Ink theme.** `--tk-link` / `--tk-accent` resolve to `--tk-cyan` on Ink (10.44:1), unchanged. Decorative cyan (`--tk-border-accent`, `--tk-shadow-glow`) unchanged on both themes.
- **Not visible — token contract.** `--tk-fg-4` / `--tk-fg-5` annotated decorative/disabled-only (no value change); readable muted text uses `--tk-fg-3`.
- **Visible — all themes, all token consumers (`colors_and_type.css`).** The `--tk-fs-*` type scale moved from fixed `px` to fluid `clamp()` / `rem`: display, h1, h2, h3 scale with viewport between floor and ceiling; body, labels, and code are `rem` (zoom-responsive). Headings that sat off the old fixed values shift slightly (e.g. master-lockups `h1` 56→≤48, `h2` 32→≤28; in-tile wordmark and mock label sizes snap to the nearest step). Floors unchanged (eyebrow / meta = 12px).
- **Visible — app-shell width.** `.shell` (dashboard) and `.page` (asset-pack, master-lockups) now cap at `--tk-shell-max` = `min(1760px, 94vw)` (was: dashboard 1480, asset-pack 1380, master-lockups 1480) — wider on large screens, a symmetric 94vw gutter on mid screens.
- **Visible — dashboard, narrow screens.** Inner card grids (palette swatches, neutrals / foreground scale, radii, Lucide glyph + icon grids, favicon scale, shadows) moved from fixed `repeat(N,1fr)` to `repeat(auto-fit, minmax(…,1fr))`, so they wrap to fewer columns instead of being clipped by the card's `overflow:hidden`. Desktop column counts now flex with width. The outer 12-col `.grid` is unchanged (already handled by media queries).
- **Mostly not visible — fonts now local.** The self-hosted woff2 are the same Poppins / Manrope / JetBrains Mono faces previously fetched from Google, so rendered type is unchanged on screen. Two intended differences: the asset-pack OG card previews and PNG exports now render in real Poppins (were a fallback face during canvas rasterization), and surfaces with italic deks (master-lockups, trust-state-matrix, review) keep true Poppins italic now that italic 400/500/600 ship locally.
- **Visible — Ink theme only (dragonfly mark).** The `tekrogen-org` mark's head, body and central spine now resolve to new `--tk-mark-head` / `--tk-mark-body` / `--tk-mark-facet` tokens instead of fixed palette hex, so they flip with `data-tk-theme`. On **Ink** the spine/head lift to the inverse set (`--tk-head-inv` `#9eb1c0`, `--tk-body-inv` `#cad6e0`, facet `#1b2530`) — a brighter, crisper needle than the previous mid-tone. On **Paper** they resolve to the existing darker set (`--tk-head` `#3f617b` / `--tk-body` `#385166`) — unchanged from before. The four wings (org / studio / com / net) and the teal/green facet overlays are fixed on both themes.
- **Visible — `index.html` (Dashboard).** Topbar version pill `v0.7.0` → `v0.8.0`; footer colophon `ui kit · v0.6.0 · jun 2026` → `ui kit · v0.8.0 · jun 2026`. The footer had silently drifted (stuck at `v0.6.0` since the v0.7.0 cut) because the stamp rule anchored on a literal month; the rule is now month-agnostic and re-stamps both spots. Date pills already read `jun 2026` (current).

### Migration

- Ink consumers: none.
- Consumers hardcoding `var(--tk-cyan)` for *text* (links, eyebrows, inline code) should migrate to `var(--tk-link)` / `var(--tk-accent)` so Paper renders accessibly. All such uses in `colors_and_type.css` are corrected here; per-surface kit pages convert in audit P2.
- Do not use `--tk-fg-4` / `--tk-fg-5` for text; use `--tk-fg-3` (AA on both themes).
- Fonts: surfaces must not add a Google Fonts (or any remote) `<link>` / `@import`; link `colors_and_type.css`, which now carries every weight plus Poppins italic. A new weight means adding the woff2 + `@font-face` to the foundation, never a CDN link.

### Assets to regenerate

None.

### Added

- `ui_kits/_shared/tk-theme.js` — framework-agnostic Ink/Paper theme toggle. Sets `data-tk-theme` on `<html>`, persists to `localStorage('tk-theme')`, syncs `aria-pressed`, exposes `window.TkTheme` (`get`/`set`/`toggle`) and a `tk-theme-change` event. Default Ink; `prefers-color-scheme` not auto-followed.
- `ui_kits/_shared/tk-theme.css` — `.tk-theme-toggle` segmented control, themed via `--tk-*`; active segment uses an inverted fill so the selection is visible on both Ink and Paper.
- `ui_kits/_shared/tk-theme-demo.html` — self-contained test / usage harness.
- `colors_and_type.css` — `--tk-fs-og-title` (fluid `clamp` 28→34px) for OG / social card titles (shared artifact spec, reused across kit pages).
- `ui_kits/_shared/tk-theme.css` — `.tk-seg` shared segmented-control class (plus `.tk-seg__sub` descriptor line and `.tk-seg--compact` modifier) generalizing the toggle for any picker.
- `colors_and_type.css` — `--tk-shell-max: min(1760px, 94vw)` — fluid app-shell width token (single source for the dashboard shell + kit page widths).
- `fonts/` — heavier brand weights self-hosted as latin-subset woff2: Poppins 500/600/700/800, Manrope 500/600/700, JetBrains Mono 500/600/700, plus Poppins italic 400/500/600 (~8–21KB each). `fonts/OFL.txt` (SIL OFL 1.1, all three families) added for license compliance.
- `colors_and_type.css` — `@font-face` for all 13 added faces (upright 500–800 + Poppins italic 400/500/600), so the foundation now covers every brand weight locally.
- `adr/0008-self-hosted-fonts.md` — "Fully self-hosted fonts (no remote CDN)" decision (Accepted); index row added.

### Changed

- `colors_and_type.css` — Paper `--tk-link` / `--tk-accent` = `#0a7e83`; Paper `--tk-border` `#e6ebef` → `#d4dce3`; `.tk-eyebrow`, `code` / `.tk-code`, and `a` / `.tk-a` wired to `--tk-accent` / `--tk-link`; `--tk-fg-4` / `--tk-fg-5` documented decorative-only.
- `ui_kits/asset-pack/index.html` — adopts the shared theme toggle; chrome wired to `--tk-*` (body, sticky toolbar, cards, buttons, slot table, eyebrow / links / inline-code); OG cards, `.card.paper` demos, icon-on-dark previews and the SVG source block frozen as specimens; chrome mono labels raised to the 12px floor.
- `colors_and_type.css` — `--tk-fs-*` type scale converted to fluid `clamp()` + `rem` (display / h1 / h2 / h3 fluid; body / labels / code `rem`; 12px floors held).
- `ui_kits/_shared/tk-theme.css` — generalized into the shared `.tk-seg` control; `.tk-theme-toggle` retained as a working alias.
- `ui_kits/master-lockups/index.html` + `ui_kits/_shared/lockups-app.jsx` — adopt the shared toggle and wire chrome to `--tk-*` (specimens — marks, deep/paper boards, ghost/social mocks, the type-stack callout — frozen); A/C wordmark picker rebuilt on `.tk-seg` ("Sans" / "Mono", `aria-pressed`, descriptors via `.tk-seg__sub`); every literal font-size replaced with a `--tk-fs-*` token.
- `index.html` (dashboard) — `.shell` max-width → `--tk-shell-max`; fixed inner card grids (`.swatch-row`, `.radius-row`, `.glyph-grid`, `.icon-grid`, `.shadow-row`, and the inline foreground-scale / radii / Lucide grids) → `repeat(auto-fit, minmax(…,1fr))` so they wrap responsively; search-field placeholder copy → "Search".
- `ui_kits/asset-pack/index.html`, `ui_kits/master-lockups/index.html`, `ui_kits/_shared/lockups-app.jsx` — `.page` (and the master-lockups sticky-toolbar inner) max-width → `--tk-shell-max`.
- `ui_kits/asset-pack/index.html` — chrome font-sizes (eyebrow, h1, h2, lead, section labels, `.btn`, `.dim`, slot table, `pre.svg` code block, toolbar, note) and the JS download-dock / link helpers converted to `--tk-fs-*` tokens, completing ADR-0007 for asset-pack. The `.og` card specimens, inline OG markup, and logo wordmarks stay literal (rasterized artifacts).
- `colors_and_type.css` — header comment rewritten: all weights self-hosted, the Google Fonts `<link>` no longer required.
- Google Fonts CDN removed from six converted surfaces — the `<link>` tags in `index.html`, `ui_kits/asset-pack/index.html`, `ui_kits/master-lockups/index.html`, `trust-state-matrix.html`, `review/index.html`, and the `@import` in `preview/_card.css`; each already links `colors_and_type.css`, now the sole font source. (`ui_kits/tekrogen-org/` and `ui_kits/mark-explorations/` clear during their P2 conversions — mark-explorations also drops non-brand Inter there.)
- `ui_kits/asset-pack/index.html`, `ui_kits/master-lockups/index.html` — redundant inline 400 `@font-face` blocks and the stale "weights from Google" comment removed; fonts now sourced solely from `colors_and_type.css`.
- `fonts/README.md` — rewritten to the self-hosted reality (table, OFL note, the `fontTools` subset command, flag #1 resolved, flag #4 added re: italic).
- `ui_kits/tekrogen-org/` — converted to the shared type scale (P2): removed the Google Fonts `<link>` (fonts now via `colors_and_type.css`); tokenized all 28 literal sizes to `--tk-fs-*`, snapped to the nearest step (hero→`display`, article title→`h1`, card/section titles→`h2`, deks→`h3`, body→`body`); and narrowed the article + studio/about prose columns 760→600px so the 16px body sits at ~72 characters/line (Bringhurst measure). Verified via headless-Chrome render: 0 CDN font requests, 9 local woff2 fetched incl. real Poppins italic.
- `ui_kits/mark-explorations/` — replaced the non-brand **Inter** UI font with `var(--tk-font-sans)` (`index.html` body + two `_shared/concept-cards.jsx` chrome styles) and stripped the Google Fonts `<link>` (Poppins + JetBrains Mono already local; Inter was the only CDN-unique face). This surface is an authoring *canvas*, not a tokenized brand page, so its tool chrome (system stack), `ui-monospace` micro-labels, the Comic Sans canvas annotation, the brand mark/wordmark **specimens** (Poppins/Manrope/JBM), and the tweaks-panel theme system (closed by default, host-driven) are intentionally left as-is. Verified via headless-Chrome render: app mounts in Poppins, 0 CDN / 0 Inter requests, local woff2 only.
- `index.html` (dashboard) — retired the inline `role="tablist"` Ink/Paper toggle (bespoke cyan-active fill + 12px literal) for the shared `_shared/tk-theme.{css,js}` control: container `role="group"`, `data-tk-theme-set` buttons with `aria-pressed`, active = inverted `--tk-fg-1` fill (legible on both themes — no longer cyan), choice persisted to `localStorage('tk-theme')` (the inline handler never persisted), `window.TkTheme` API exposed. Removed the inline `.theme-toggle` CSS, its `[data-tk-theme="paper"]` override, and the inline theme JS. Verified headless: click flips `data-tk-theme` + `aria-pressed`, active fill non-cyan, persists across the pair, 0 JS exceptions.
- `ui_kits/tekrogen-org/` — **wired into the Ink/Paper system** (correcting the earlier note that called it single-theme by design — it was simply unwired). Added `<html data-tk-theme="ink">`, the shared `/ui_kits/_shared/tk-theme.{css,js}` includes, and the `.tk-theme-toggle` in the header (its `aria-pressed` seeded from the live `data-tk-theme` so a stored Paper choice renders correctly on mount). Every ink-locked surface converted to flipping tokens: page/footer/input backgrounds (`var(--tk-ink*)` / `#0a0d12`) → `--tk-bg-1/2/3`, borders (`--tk-ink-2`) → `--tk-border`, the sticky header → `color-mix(in srgb, var(--tk-bg-1) 92%, transparent)`, and the 6 cyan **eyebrow texts** → `--tk-accent` (cyan on Ink, AA `#0a7e83` on Paper); cyan *fills/borders* and the dark-on-cyan button text (`--tk-ink`) unchanged. Verified headless in both themes: page bg flips `#0e1116`↔`#fbfcfd`, accent `#1fd5da`↔`#0a7e83`, surfaces/borders flip, toggle persists, 0 CDN requests, 0 JS exceptions. (Dragonfly mark facet-on-Paper noted as a small follow-up.)
- `ui_kits/tekrogen-org/Dragonfly.jsx` + `colors_and_type.css` — dragonfly mark made **theme-aware**, resolving the facet-on-Paper follow-up noted above. Added semantic `--tk-mark-head` / `--tk-mark-body` / `--tk-mark-facet` to both the Ink `:root` (lifted: `--tk-head-inv` / `--tk-body-inv`, facet `#1b2530`) and the `.tk-paper` block (darker: `--tk-head` / `--tk-body`), placed outside the generated `TK-PALETTE` block so `tokens/sync.mjs` won't wipe them. In `Dragonfly.jsx` the head/body/facet consts now default to these vars and the five mark polygons (head, body-segment, spine, spine-highlight, org facet) set fill via `style={{ fill }}` — an SVG `fill="var(…)"` presentation attribute does not resolve, only the CSS property does. The `inverse` prop is retained as a manual override forcing the lifted hex set regardless of page theme. Reviewed in-browser across all four placements (header / hero / article / footer) in both themes; the deepen-Paper-wings option (B) was judged unnecessary and dropped. Verified headless: Ink spine computes `#cad6e0`, Paper `#385166`, flips live via `data-tk-theme`, 0 JS exceptions.
- `package.json` — version `0.7.0` → `0.8.0` (minor; batched audit remediation P0–P4 + the theme-aware mark).

### Fixed

- `ui_kits/asset-pack/index.html` — asset export hardened: `svgToPng` now fails safe (`onerror` + 6s timeout) so the zip can no longer hang on an OG card that won't rasterize in-browser; "Download all" skips null assets (with a skipped count) and the button always resets via `finally`; per-asset download guards against a null blob. `styleGuideMd()` now generates the Colors block and font families live from `--tk-*` tokens (fixes the stale "cyan = link" line — now the semantic `--tk-link` / `--tk-accent`, Ink cyan / Paper `#0a7e83` AA — and notes the fluid scale).
- `ui_kits/asset-pack/index.html` — OG / Twitter cards rebuilt as fluid pure-SVG (`viewBox 0 0 1200 630`), replacing the foreignObject + remote `@import` path: previews scale proportionally with no content clipping on narrow widths, and the zip export embeds the local woff2 as base64 so all four cards rasterize in real Poppins — closing the "4 skipped" gap (zip now reports 0 skipped). Dead `domToPng` removed.
- `scripts/version-stamp.mjs` + `index.html` — fixed a silent version-drift bug: the footer-colophon stamp rule anchored on a literal `· may`, so once the dashboard date moved to `jun 2026` the rule matched nothing and the footer version froze at `v0.6.0` while the topbar advanced — and `stamp:check` *false-passed* (a no-match is indistinguishable from in-sync). The rule is now month-agnostic (`· <mon> <year>`, month preserved), so `pnpm stamp` re-stamps both the pill and the footer and `stamp:check` actually detects future colophon drift. Footer re-stamped `v0.6.0` → `v0.8.0`.

---

## [0.7.0] — 2026-06-06

> **Versioning intent — minor.** System-wide type-size accessibility remediation. `--tk-fs-eyebrow` raised 11px → 12px; `--tk-fs-meta` raised 10.5px → 12px. All JSX components that previously hardcoded these sizes now reference the token vars. Email input raised to 16px (iOS auto-zoom prevention). Preview specimen card labels corrected (9.5–10.5px → 11–12px). `pre.tk-pre` code block raised 11.5px → 13px. 25 type-size fixes across 9 files.

### Pixel diff

- **Visible — `colors_and_type.css`.** `--tk-fs-eyebrow`: 11px → 12px. `--tk-fs-meta`: 10.5px → 12px. `pre.tk-pre` inline font-size: 11.5px → 13px. All surfaces consuming these tokens are affected automatically.
- **Visible — `ui_kits/tekrogen-org/Hero.jsx`.** Eyebrow `fontSize` → `var(--tk-fs-eyebrow)` (12px). Meta row `fontSize` → `var(--tk-fs-meta)` (12px).
- **Visible — `ui_kits/tekrogen-org/SectionHead.jsx`.** Eyebrow `fontSize` → `var(--tk-fs-eyebrow)`. Meta `fontSize` → `var(--tk-fs-meta)`.
- **Visible — `ui_kits/tekrogen-org/FieldNoteCard.jsx`.** Kicker → `var(--tk-fs-eyebrow)`. Meta row → `var(--tk-fs-meta)`.
- **Visible — `ui_kits/tekrogen-org/Article.jsx`.** Back button, author byline, series colophon → `var(--tk-fs-meta)`. Article eyebrow → `var(--tk-fs-eyebrow)`.
- **Visible — `ui_kits/tekrogen-org/SubscribeBlock.jsx`.** Eyebrow and button label → `var(--tk-fs-eyebrow)`. Email input: 14px → 16px (iOS zoom prevention). Success message: 12px → 13px.
- **Visible — `ui_kits/tekrogen-org/SiteHeader.jsx`.** Subscribe button label: 12px → 13px.
- **Visible — `ui_kits/tekrogen-org/Footer.jsx`.** Pillar domain names and copyright bar: 13px → 14px (`var(--tk-fs-body-sm)`).
- **Visible — `preview/_card.css`.** `.label` / `.swatch`: 9.5px → 11px. `.hex` / `.token`: 10–10.5px → 12px. `.name`: 13px → 14px.
- **Not visible.** No palette values, spacing tokens, radii, shadows, or layout rules change.

### Migration

- Surfaces consuming `--tk-fs-eyebrow` or `--tk-fs-meta` via CSS class inherit the new values automatically.
- JSX components using inline `fontSize: N` for eyebrow/meta roles must be updated to `fontSize: 'var(--tk-fs-eyebrow)'` or `fontSize: 'var(--tk-fs-meta)'`. All components in this repo are corrected in this release.
- The email `<input>` change (14px → 16px) may shift subscribe-form height slightly on mobile. Test narrow viewports if the form has been customised downstream.

### Assets to regenerate

None.

### Added

- `review/type-size-audit.html` — governance artifact tabulating all 25 before/after changes, the standards applied (pimpmytype.com, WCAG 2.1 SC 1.4.4, iOS 16px threshold), and the rationale for the 12px eyebrow/meta floor.

### Changed

- `colors_and_type.css` — `--tk-fs-eyebrow` 11px → 12px; `--tk-fs-meta` 10.5px → 12px; `pre.tk-pre` 11.5px → 13px.
- `preview/_card.css` — all label / swatch / hex / token / name sizes raised (see pixel diff).
- `ui_kits/tekrogen-org/Hero.jsx` — `fontSize` hardcodes replaced with `var(--tk-fs-eyebrow)` / `var(--tk-fs-meta)`.
- `ui_kits/tekrogen-org/SectionHead.jsx` — same.
- `ui_kits/tekrogen-org/FieldNoteCard.jsx` — same.
- `ui_kits/tekrogen-org/Article.jsx` — four instances replaced with token vars.
- `ui_kits/tekrogen-org/SubscribeBlock.jsx` — eyebrow and button → token vars; email input → 16px; success message → 13px.
- `ui_kits/tekrogen-org/SiteHeader.jsx` — Subscribe button label 12px → 13px.
- `ui_kits/tekrogen-org/Footer.jsx` — pillar domain names and copyright bar 13px → 14px.
- `package.json` — version `0.6.0` → `0.7.0`.

### Notes

- The 12px floor for `--tk-fs-eyebrow` / `--tk-fs-meta` is practical, not arbitrary. WCAG 2.1 sets no hard pixel floor; the 14px minimum from pimpmytype.com and learnui.design applies to mixed-case body prose. All-caps mono with 0.12–0.16em letter-spacing at 12px delivers equivalent legibility to ~14px mixed-case. Previous 10–11px values fell below any defensible threshold.
- The iOS auto-zoom threshold (inputs below 16px trigger page-scale zoom on focus in Safari) is a hard UX constraint. The 16px email input fix eliminates a known mobile breakage.
- `--tk-fs-code` (13px) is unchanged — code blocks are a distinct reading context; 13px is standard practice for monospaced code.

---

## [0.6.0] — 2026-06-06

> **Versioning intent — minor.** Accessibility correction to `Footer.jsx` font sizes (colophon 10.5 px → 13 px; pillar domain names 12 px → 13 px; pillar labels 13 px → 14 px) constitutes a visual change per ADR-0003. Bundled with: design-system compiler metadata fixes (token `@kind` annotations), Node tooling compatibility pass (no `import.meta` / static `node:` in the browser bundle), and a layout fix ensuring the footer always anchors to the page bottom on short-content views. Ships `Component Gap Analysis.html` as a governance artifact and refreshes the Dashboard to `v0.6.0` / June 2026.

### Pixel diff

- **Visible — `ui_kits/tekrogen-org/Footer.jsx`.** Copyright / colophon strip: `font-size: 10.5` → `13`px. Pillar entity domain names (mono): `12` → `13`px. Pillar card description labels (sans): `13` → `14`px. Wordmark (16 px) and tagline (14 px italic) unchanged. Affects the tekrogen-org publication footer only.
- **Visible — `ui_kits/tekrogen-org/Footer.jsx` (layout).** Footer now anchors to the page bottom on short-content views (Studio, About). `App.jsx` root container gains `display:flex; flex-direction:column; min-height:100vh`; all `<main>` branches gain `flex:1`. No change on full-length pages.
- **Visible — `index.html` (Dashboard).** Version pill and footer colophon read `v0.6.0 / jun 2026` (was `v0.5.0 / may 2026`). Sidebar nav counts filled in (were `·` on 10 entries). Hero meta corrected: tokens 54 → 103, components 22 → 14, brand assets 13 → 14. Component roadmap section added to section 02 (links to `Component Gap Analysis.html`). All four UI Kit cards gain `target="_blank"`.
- **Not visible.** No token values, type sizes, spacing scales, radii, shadows, or palette entries change. All other surfaces (`preview/`, `review/`, `trust-state-matrix.html`, `asset-pack`, `master-lockups`, `mark-explorations`) are unaffected.

### Migration

- No consumer-facing token changes. Surfaces that load `colors_and_type.css` are unaffected.
- If you mirror the `Footer.jsx` font sizes in a downstream project, update those overrides to the new base values (13 / 13 / 14 px).
- `tokens/sync.mjs` and `scripts/version-stamp.mjs` now require invocation from the **repo root** (paths resolve via `process.cwd()`). The `package.json` `sync` / `check` / `stamp` / `stamp:check` scripts already invoke from root — no CI change needed. Direct invocation from inside `tokens/` or `scripts/` subdirectories will break; use `node tokens/sync.mjs` from root instead.

### Assets to regenerate

None.

### Added

- `Component Gap Analysis.html` — shadcn default component parity matrix. 57 shadcn defaults audited against the current kit; 50 gaps identified across 5 families (Overlays & menus, Forms & controls, Data & feedback, Navigation & disclosure, Layout & utility), each with status (missing / partial), priority (P1 / P2 / P3), and a Tekrogen-specific build note. Includes 6 kit-native extension components beyond the shadcn set. Linked from Dashboard section 02.

### Changed

- `ui_kits/tekrogen-org/Footer.jsx` — font-size corrections (see pixel diff). Colophon letter-spacing tightened from `0.14em` → `0.12em` to match the base mono-meta scale at 13 px.
- `ui_kits/tekrogen-org/App.jsx` — flex-column layout wrapper (`min-height:100vh`) + `flex:1` on all `<main>` branches for push-to-bottom footer behaviour.
- `colors_and_type.css` — added `/* @kind … */` annotations to 13 previously unclassified tokens: `--tk-fs-display` and `--tk-fs-h1` → `font`; `--tk-lh-tight/snug/body/loose` → `font`; `--tk-ease`, `--tk-ease-bounce`, `--tk-dur-1..4`, `--tk-tilt-mark` → `other`. No value changes.
- `tokens/sync.mjs` — removed shebang line (`#!/usr/bin/env node`); converted to an async IIFE with `await import('node:fs')` for file I/O; replaced `import.meta.url`-based path resolution with `process.cwd()`-relative paths. Behaviour is identical when invoked from repo root. Eliminates `import.meta` parse errors and static `node:` import drops in the in-browser DS bundle.
- `scripts/version-stamp.mjs` — same async IIFE conversion as `tokens/sync.mjs`. Behaviour is identical when invoked from repo root.
- `index.html` — version `v0.5.0` → `v0.6.0`, date `may` → `jun 2026`. Sidebar nav counts filled for all `·` entries. Hero meta corrected (tokens, components, brand assets). Component roadmap section added. UI Kit card links gain `target="_blank"`.
- `package.json` — version `0.5.0` → `0.6.0`.

### Notes

- Font-size corrections address legibility at typical reading distances; 10.5 px mono-caps is below the 16 px floor for body content and below the 13–14 px floor for secondary/footer content referenced in WCAG guidance.
- The `@kind` annotations are compiler metadata only — they classify tokens for the Design System tab in Claude Design and have no effect on rendered output or consuming projects.
- The Node tooling changes are safe to commit and push without local testing: the only behaviour change is path-root dependency (already satisfied by `package.json` scripts). The shebang removal has no effect since both scripts are invoked via `node …`, not as executables.
- `Component Gap Analysis.html` is a governance artifact (planning / roadmap), not a UI kit surface — it is not counted in the `ui kits: 04` hero-meta figure and does not ship as a brand surface.

---

## [0.5.0] — 2026-06-03

> **Versioning intent — minor.** Adds a system-wide keyboard focus indicator — a new `--tk-focus` token plus one `:focus-visible` rule in the foundation stylesheet. Implements the focus state the Dashboard button state-table described but the CSS never drew (WCAG 2.4.7 / 2.4.11), and syncs the canonical Dashboard (`index.html`) to `v0.5.0`, guarded by a new version-stamp script. Visible on keyboard focus only; pointer use is unchanged.

### Pixel diff

- **Visible (keyboard / AT only).** `a`, `button`, `input`, `select`, `textarea`, `summary`, `[tabindex]` render a 2px `--tk-focus` outline at 2px offset on `:focus-visible`. Pointer focus is unaffected.
- **Token added.** `--tk-focus` = `var(--tk-cyan)` on Ink (10.44:1 vs `--tk-ink`); `#0a7e83` on Paper (≈4.4–4.9:1 across paper backgrounds — clears the 3:1 non-text bar that `--tk-cyan` fails at 1.76:1 on paper).
- **Visible (version label).** The Dashboard surfaces' version pill and footer now read `v0.5.0` (were `V 1.2` / `v 4.0` / `v 1.0`), matching `package.json` and the git tag.
- **Not visible elsewhere.** No token values, type sizes, spacing, radii, or component fills change. Other surfaces render identically under mouse use.

### Migration

- Surfaces that load `colors_and_type.css` inherit the styling automatically — no per-surface change required (Dashboard, asset pack, master-lockups, mark-explorations, review dashboard, trust-state matrix).
- Any consumer that previously suppressed focus (`*:focus { outline: none }` or similar) must remove that suppression or it defeats the indicator.
- Components may override per-element via their own `:focus-visible` (the rule uses `:where()`, specificity 0).
- CI should run `node scripts/version-stamp.mjs --check` (or `pnpm run stamp:check`) alongside the palette check, so the rendered version label can't drift from `package.json`.

### Assets to regenerate

None.

### Added

- `--tk-focus` semantic token (Ink default + Paper override) in `colors_and_type.css`.
- Global `:focus-visible` rule in the SEMANTIC ELEMENTS block of `colors_and_type.css`.
- `scripts/version-stamp.mjs` — stamps the `package.json` version into the Dashboard surfaces (topbar pill + footer); `--check` for CI, mirroring `tokens/sync.mjs`.
- `package.json` `stamp` / `stamp:check` scripts.

### Changed

- `package.json` — version `0.4.0` → `0.5.0`.
- `index.html` — version label synced to `v0.5.0` (the canonical Dashboard).
- `index.html` — ported the host-driven Tweaks-panel wiring (`tweaks-root` + React/ReactDOM/Babel + `tweaks-panel.jsx` / `tweaks-app.jsx`) so the canonical public entry point reflects all v0.4.0–v0.5.0 work.

### Removed

- `UI Kit Dashboard.html` — removed as a duplicate of the canonical `index.html`, which now carries the full Dashboard (Tweaks panel included) with its version kept in sync by the stamp guard.

### Notes

- The ring is an accessibility affordance and is exempt from the "one cyan per surface" rule — it is not decorative cyan.
- `#0a7e83` is introduced here for the Paper ring and is a strong basis for a future `--tk-cyan-text` token if cyan-on-light is unified in a later MINOR.
- Addresses focus visibility (WCAG 2.4.7 / 2.4.11). Further text-contrast and non-text-contrast (1.4.11) improvements are planned for a later release.
- `index.html` is the single canonical Dashboard; `package.json` is the single version source, enforced by the stamp guard (`pnpm run stamp:check`).
- The standalone Dashboard is a generated Claude Design export and is intentionally not stamped — re-export it from the canonical to carry a new version.

---

## [0.4.0] — 2026-05-30

> **Versioning intent — minor.** Adds a host-driven "Tweaks" UI for the UI Kit Dashboard and ships a higher-contrast muted-label ramp as the Dashboard default. The canonical `--tk-fg-3` / `--tk-fg-4` tokens in `colors_and_type.css` are unchanged; the lift is a per-surface runtime override.

### Pixel diff

- **Visible (Dashboard only).** `--tk-fg-4` lifts from `#6b7785` → `#94a1b1` on Ink and `#8a96a1` → `#646f7a` on Paper. The "clearer" ramp ships as the default; the original token value is still selectable as "default" inside the panel. `--tk-fg-3` (captions) defaults to "default" — no shift unless the user opts in.
- **Visible (Dashboard only).** Topbar version pill bumps from "v 1.0" → "V 1.2".
- **Not visible elsewhere.** `index.html`, every `ui_kits/*` surface, every `preview/` specimen, `review/index.html`, and `trust-state-matrix.html` are untouched.

### Migration

- New surfaces that want to host the Tweaks panel must load React 18.3.1 + ReactDOM + Babel-standalone 7.29.0 before `tweaks-panel.jsx`, then their own `tweaks-*.jsx`, then provide a `<div id="tweaks-root">` mount node. See the Dashboard's script block for the canonical wiring.
- The panel listens for `__activate_edit_mode` / `__deactivate_edit_mode` postMessages from the parent frame; opening the HTML standalone shows no panel until a host activates it. This is intentional — Tweaks is host-driven editor chrome, not always-on UI.
- The `EDITMODE-BEGIN` / `EDITMODE-END` markers inside each app's `TWEAK_DEFAULTS` literal are the persistence contract for `__edit_mode_set_keys` (the host rewrites that block on disk). Don't reformat the literal.
- `package.json` bumps to `0.4.0` in lockstep with this entry.

### Assets to regenerate

None.

### Added

- `tweaks-panel.jsx` — reusable Tweaks shell plus form-control library. Publishes `useTweaks`, `TweaksPanel`, `TweakSection`, `TweakRow`, `TweakSlider`, `TweakToggle`, `TweakRadio`, `TweakSelect`, `TweakText`, `TweakNumber`, `TweakColor`, `TweakButton` to `window`. Owns the host postMessage protocol so individual prototypes don't re-roll it.
- `tweaks-app.jsx` — Dashboard-specific tweaks. Two controls: `Muted labels` (default / clearer / high) and `Captions` (default / clearer). Writes per-theme `--tk-fg-3` / `--tk-fg-4` overrides into a `<style id="tweak-overrides">` so contrast is correct in both Ink and Paper.

### Changed

- `UI Kit Dashboard.html` — loads React 18.3.1, ReactDOM, Babel-standalone 7.29.0, `tweaks-panel.jsx`, and `tweaks-app.jsx`; adds a `<div id="tweaks-root">` mount node; bumps the topbar version pill from "v 1.0" → "V 1.2".
- `package.json` — version `0.3.1` → `0.4.0`.

### Notes

- The Tweaks panel doesn't yet conform to the Ink/Paper brand chrome — it uses a warm-glass aesthetic (`rgba(250,249,247,.78)` with backdrop-blur, `#29261b` ink) that pre-dates this design system. Intentional for now: the panel is a transient editing affordance, not a brand surface. If Tweaks is ever promoted to always-on, restyle it against `--tk-bg`, `--tk-fg-1`, and `--tk-border`.
- The version pill's "V" capitalisation is inconsistent with `index.html`'s "v 1.0" and the Dashboard's own footer brand-line (still reads "v 1.0"). Worth a follow-up patch to settle on one casing.
- Lifting `--tk-fg-4` to the "clearer" ramp surfaces a real legibility win and is a candidate for promotion to the canonical token in a future MINOR. The promotion is intentionally deferred here — it would touch every surface that consumes `--tk-fg-4` and warrants its own pixel-diff pass against `colors_and_type.css`.
- The Tweaks files live at the repo root, not under `ui_kits/_shared/`. They're shared infrastructure but they ride along with surface-specific apps (`tweaks-app.jsx` is paired 1:1 with `UI Kit Dashboard.html`). Re-evaluate the location if a second surface adopts the panel.

---

## [0.3.1] — 2026-05-17

> **Versioning intent — patch.** No rendered pixels change. Three sync-script bugfixes, one stale-comment cleanup, two new tooling/onboarding files. All items match the ADR-0003 PATCH bucket (sync-script bugfixes, comments, file additions).

### Pixel diff

None. No token values, type sizes, spacing, or component styles changed.

### Migration

- Consumers running `node tokens/sync.mjs --check` in CI: the script now actually works (see below). If you previously suppressed its failure or skipped the hook, you can re-enable it. Add `"check": "node tokens/sync.mjs --check"` to your own package.json or call the script directly.
- pnpm users: `pnpm@10.33.2` is now pinned via `packageManager`. Other package managers still work (the scripts shell out to `node`), but `corepack` will pull pnpm for this repo.

### Assets to regenerate

None.

### Added

- `package.json` — minimal manifest pinning `pnpm@10.33.2` via `packageManager`, exposing `pnpm run sync` and `pnpm run check`. No dependencies; `tokens/sync.mjs` is stdlib-only.
- `CLAUDE.md` — Claude Code orientation doc covering purpose, key components, ADR summaries, implementation patterns, common operations, and the gotchas/non-obvious behaviors list.

### Fixed

- `tokens/sync.mjs` was non-functional and would fail every run with `SyntaxError: Unexpected end of JSON input`. Three bugs, fixed together:
  1. **Marker detection.** `indexOf("TK-PALETTE-BEGIN")` matched the file's own header comment first (which references the markers via `*\/` to avoid breaking out of the outer block). Now searches for the full delimited form `/* TK-PALETTE-BEGIN */`, which the header comment doesn't contain.
  2. **Comment stripping.** The extracted block contains human-readable inline `/* pillars */` annotations that `JSON.parse` can't handle. The script now strips `/* … */` before parsing.
  3. **Padding alignment.** `padEnd(19)` produced one space more than the original CSS file's alignment; restored to `padEnd(18)` so `pnpm run sync` is a no-op against the existing `colors_and_type.css`.
- `ui_kits/tekrogen-org/Hero.jsx` — header comment said "title (serif large) · dek (serif italic muted)", the same stale-serif copy ADR-0001 retired in v0.2.0 / v0.3.0. The shipping pixels were already Poppins; only the comment was wrong. Now reads "title (Poppins 600, sans large) · dek (Poppins italic muted)" with a pointer to ADR-0001.

### Verification

- `pnpm run check` returns `✓ tokens in sync.` and exits 0 against the unmodified `colors_and_type.css`.
- `grep -ri "serif" colors_and_type.css preview/_card.css ui_kits/` returns only the two ADR-0001 declarations and `sans-serif` / `monospace` fallback-stack matches. No stale "serif title" / "serif body" comments.

### Notes

The sync-script bugs were surfaced while wiring up a `package.json` to make ADR-0002's "drift is detectable" claim actually usable in CI. The script had never been runnable as-shipped — every invocation would have thrown immediately. v0.2.0 / v0.3.0 CHANGELOG entries describe the script as if it had been exercised; in practice the parity it enforces was held by hand. From v0.3.1 forward, `pnpm run check` is the enforcement mechanism the earlier ADR text assumed.

---

## [0.3.0] — 2026-05-16

> **Versioning intent — minor.** Resolves the three open questions left by v0.2.0. One visible copy change (the `.studio` verb-space) lands on every surface that mentioned it; one font is removed from the system; one decision is documented as on-hold.

### Pixel diff

- **Visible:** the `.studio` description changes from "Design, instructional systems, learning" to "Proof of concept and demos." on the publication footer, the master-lockup sheet's domain card, the app-shell heading, and the README.
- **Not visible:** Plex Sans was never used in shipping pixels; its removal changes no rendered output.

### Migration

- Any consumer that imported IBM Plex Sans (none in this repo) must drop the `@font-face`, the Google Fonts segment, and any `font-family: 'IBM Plex Sans'` references. Tekrogen is sans-only via Poppins.
- Any consumer that hardcoded the old `.studio` verb-space copy ("learning," "instructional systems") must update to "Proof of concept and demos."

### Assets to regenerate

None. SVG assets and OG cards did not reference Plex Sans or the .studio verb-space copy.

### Resolved open questions (from v0.2.0)

- **OQ-01 · .studio verb-space — Resolved.** New canonical copy: "Proof of concept and demos." Propagated.
- **OQ-02 · IBM Plex Sans fate — Resolved.** Retired. Self-hosted woff2 deleted; `@font-face` removed from `colors_and_type.css`; specimen card deleted; Google Fonts URL example updated; `fonts/README.md` updated.
- **OQ-03 · @tekrogen/tokens package — On hold.** The two-file / one-script contract in `tokens/` is sufficient until `.com` or `.net` consumes tokens.

### Changed

- `ui_kits/tekrogen-org/Footer.jsx` — .studio pillar label.
- `ui_kits/_shared/lockups-app.jsx` — .studio domain card.
- `ui_kits/tekrogen-org/App.jsx` — .studio path h1.
- `README.md` — entity table row and the taglines-by-pillar section.
- `colors_and_type.css` — removed `@font-face` for `IBM Plex Sans`; header comment updated; Google Fonts URL example no longer includes `IBM+Plex+Sans`.
- `fonts/README.md` — Plex Sans row removed from the families table; flagged-for-review #1 replaced with the retirement note; one-line link example updated.
- `adr/0001-typography-sans-only.md` — §Open replaced with the v0.3.0 retirement update.
- `review/index.html` — v0.3.0 header, Finding 05 promoted to Fixed, Open Questions section rewritten as Resolved.

### Removed

- `fonts/ibm-plex-sans-v23-latin-regular.woff2`
- `preview/card-type-plex-sans.html`

### Notes

The Cursor analysis raised five real issues and one strategic one. v0.2.0 fixed three in code, wrote down two as external flags, and deferred three open questions. v0.3.0 closes the deferred three. The two external flags (WF-001 internal inconsistencies and BNR ↔ live-stack drift) remain outside this repo's gift to fix.

---

## [0.2.0] — 2026-05-16

> **Versioning intent — minor.** No rendered pixels change. Surface contract changes: palette is now single-sourced, six load-bearing decisions are written down, the paid flow has a place to live.

### Pixel diff

None. All hex values, all type sizes, all spacing tokens are unchanged. Existing surfaces render identically.

### Migration

- JS consumers (`marks.jsx`, `Dragonfly.jsx`, future React mark components) **must** load `tokens/palette.js` as a plain `<script src>` before any Babel/React script that reads `window.TK_TOKENS`. Already done for the four index.html files in this repo; do the same for any new surface.
- Inline-styled gradients in JSX that hardcoded pillar hexes (e.g. `linear-gradient(135deg, #446e88, #0db4b9)`) should use CSS custom properties (`var(--tk-org)`, `var(--tk-com)`).
- The `IBM+Plex+Serif` and `Source+Serif+4` Google-font imports were removed from `preview/_card.css`. Any preview card that depended on them now falls back to Poppins, which is the intended sans-only behaviour per ADR-0001.

### Assets to regenerate

None. SVG assets in `assets/` already use the same pillar hexes as `tokens/palette.js`; no change required.

### Added

- `tokens/palette.js` — canonical JS source for the palette (`TK_TOKENS`).
- `tokens/sync.mjs` — Node script that mirrors the JS into `colors_and_type.css`; `--check` mode for CI.
- `tokens/README.md` — load order, sync workflow, the two-files / one-script rationale.
- `adr/` — six accepted ADRs and an index:
  - `0001-typography-sans-only.md`
  - `0002-palette-single-source.md`
  - `0003-token-versioning.md`
  - `0004-canonical-authoring-surface.md`
  - `0005-icon-system.md`
  - `0006-trust-state-cta.md`
- `trust-state-matrix.html` — mocks for the four trust states (anonymous / member / paid / entitled) per ADR-0006.
- `review/index.html` — design-system review dashboard for v0.2.0 with the maturity radar and the findings table. Ink/paper toggle.

### Changed

- `colors_and_type.css` — palette block wrapped in `TK-PALETTE-BEGIN` / `TK-PALETTE-END` sync markers. No value changes.
- `ui_kits/_shared/marks.jsx` — reads palette from `window.TK_TOKENS`; throws if missing.
- `ui_kits/tekrogen-org/Dragonfly.jsx` — same pattern.
- `ui_kits/tekrogen-org/Article.jsx` — inline gradient now uses `var(--tk-org)` / `var(--tk-com)`. Header comment updated to "sans-only" per ADR-0001.
- `ui_kits/tekrogen-org/FieldNoteCard.jsx` — header comment updated.
- `ui_kits/tekrogen-org/README.md` — three references to "serif" replaced with the actual Poppins editorial pattern.
- `ui_kits/tekrogen-org/index.html` — loads `tokens/palette.js` before Babel scripts.
- `ui_kits/master-lockups/index.html` — local `--org`/`--studio`/etc. now alias to `var(--tk-*)`. Imports `colors_and_type.css`.
- `ui_kits/asset-pack/index.html` — same alias pattern.
- `ui_kits/mark-explorations/index.html` — loads `tokens/palette.js`; dropped `Source+Serif+4` import.
- `preview/_card.css` — dropped `IBM+Plex+Serif` and `Source+Serif+4` font imports.
- `preview/card-type-plex-sans.html` — reframed from "role tbd" to "provisional · do not ship" per ADR-0001 §Open.

### Removed

- Duplicate pillar hex definitions in `marks.jsx`, `Dragonfly.jsx`, `master-lockups/index.html`, `asset-pack/index.html`. The values still appear in `tokens/palette.js` and (synced) `colors_and_type.css`; nowhere else.
- Stale "serif" copy in the tekrogen-org kit's README and component header comments.

### Notes

The Cursor analysis at `uploads/cursor-design-system-analysis.md` motivated this pass. Three of its six findings were fixed in code; one was softened (the typography drift was real in docs, not in shipping pixels); two are flagged as external (WF-001 and BNR drift live outside this repo). See `review/index.html` for the full read.

---

## [0.1.0] — 2026-04 (pre-review baseline)

Initial design-system bootstrap: `colors_and_type.css` token layer, the dragonfly mark (v2 + six concept directions), the Ghost Pro asset pack, the master lockups sheet, the `tekrogen.org` UI kit, the preview card files.
