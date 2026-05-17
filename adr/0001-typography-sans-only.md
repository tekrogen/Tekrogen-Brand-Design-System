# ADR-0001 — Typography: sans-only

- **Status:** Accepted
- **Date:** 2026-05-16
- **Supersedes:** an earlier informal stance (see `fonts/README.md` history) that listed IBM Plex Serif as the editorial face.

## Context

Three files were giving three different answers to "what is the editorial face on Tekrogen?":

1. `colors_and_type.css` declared `--tk-font-editorial: var(--tk-font-sans)` — sans-only.
2. `preview/_card.css` `@import`-ed IBM Plex Serif **and** Source Serif 4 from Google Fonts — neither was actually used, but the imports cost bytes and signalled "we use a serif."
3. `ui_kits/tekrogen-org/README.md`, `Article.jsx`, and `FieldNoteCard.jsx` had comments and prose that said "serif wordmark / serif body / serif title." The shipping pixels were all Poppins; the comments were stale.

A fourth file (`fonts/README.md`) explicitly retired IBM Plex Serif and committed to sans-only — but had no enforcement.

The Cursor analysis correctly flagged that an editor reading the README would expect a serif and an engineer reading the CSS would expect sans. The shipping pixels were sans; the documentation was not.

## Decision

**Tekrogen is sans-only.** No serif face anywhere — not in body, not in editorial, not in display, not in print. The editorial weight comes from size, tracking, and italic — not from a serif counterpoint.

- **Primary face:** Poppins, self-hosted at 400, Google-loaded 500–800.
- **Fallback:** Manrope, self-hosted at 400. Chosen because its x-height and aperture closely match Poppins so the font-swap doesn't reflow noticeably.
- **Technical face:** JetBrains Mono, self-hosted at 400, Google-loaded 500–700.
- **Editorial slot** (`.tk-editorial`, `.tk-editorial-italic`): Poppins 600 + Poppins 400 italic. *Same file as body.* The visual rhythm comes from weight contrast, not face contrast.

## Consequences

- Removed from `preview/_card.css`: `@import` of IBM Plex Serif and Source Serif 4.
- Updated to sans copy: `ui_kits/tekrogen-org/README.md` (3 lines), `Article.jsx` header comment, `FieldNoteCard.jsx` header comment.
- *(superseded by v0.3.0 update below)* The Plex Sans specimen card and self-hosted woff2 are gone.

## Update — v0.3.0 (2026-05-16)

The Open question is now closed: **IBM Plex Sans is retired.**

- Removed: `fonts/ibm-plex-sans-v23-latin-regular.woff2`, the `@font-face` declaration in `colors_and_type.css`, the `IBM+Plex+Sans` segment in Google Fonts URLs, the `preview/card-type-plex-sans.html` specimen, and all references in `fonts/README.md`.
- The brand is sans-only via **Poppins**. If a second sans is ever needed, write a new ADR — do not reintroduce Plex Sans without one.
- The three options previously listed (contingency body face, UI face, evaluation-table density slot) are rejected in favour of "one face, one job, simpler downstream."

## Verification

- `grep -ri "serif" colors_and_type.css preview/_card.css ui_kits/` should return only references to the `sans-serif` CSS keyword in fallback stacks and the `font-family` CSS keyword. No `"IBM Plex Serif"`, no `"Source Serif"`, no comments saying "serif body."
- The Google Fonts URL in any `_card.css` / `index.html` does not include `IBM+Plex+Serif`, `Source+Serif+4`, or `IBM+Plex+Sans`.
- `grep -ri "Plex Sans\|plex-sans" .` returns no hits in shipping code (matches in `CHANGELOG.md`, `adr/`, `review/`, and `fonts/README.md` are documenting the retirement).
