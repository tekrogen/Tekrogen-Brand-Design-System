# Changelog

All notable changes to the Tekrogen Design System. Format follows [Keep a Changelog](https://keepachangelog.com/), versioning follows [Semver](https://semver.org/) with the pre-1.0 tightening in [`adr/0003-token-versioning.md`](adr/0003-token-versioning.md).

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
