# Changelog

All notable changes to the Tekrogen Design System. Format follows [Keep a Changelog](https://keepachangelog.com/), versioning follows [Semver](https://semver.org/) with the pre-1.0 tightening in [`adr/0003-token-versioning.md`](adr/0003-token-versioning.md).

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
