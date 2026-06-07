# Fonts

Tekrogen uses three local-first font families. All brand weights —
Regular (400) through 800 — are self-hosted from this directory as
latin-subset woff2. No external font CDN is required.

| Family            | Use                                                   | Regular (local)                   | Heavier weights (local)                                    |
| ----------------- | ----------------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| **Poppins**       | Wordmark, headings, body sans (primary)               | `poppins-v24-latin-regular.woff2` | `poppins-v24-latin-{500,600,700,800}.woff2`                |
| **Manrope**       | **Sans fallback** for Poppins — committed, ships in every stack (closest x-height + aperture match) | `manrope-v20-latin-regular.woff2` | `manrope-v20-latin-{500,600,700}.woff2`                    |
| **JetBrains Mono**| Mono labels, code, CLI splash, eyebrows               | `JetBrainsMono-Regular.woff2`     | `JetBrainsMono-{Medium,SemiBold,Bold}.woff2` (500/600/700) |

> **Sans-only brand.** Tekrogen does not use a serif face. The editorial role (Ghost article hero, long-form headlines, italic deks) is handled by Poppins 600 + Poppins italic. Earlier drafts of this system used IBM Plex Serif for editorial — that was retired; do not reintroduce it.

The `@font-face` declarations live at the top of `../colors_and_type.css`
and cover every weight, so the local fonts are authoritative. No Google
Fonts `<link>` is needed; any that remain on older surfaces are redundant
and are being removed.

All three families are licensed under the SIL Open Font License 1.1 — see
`OFL.txt`. Subsetting and woff2 conversion are permitted under the OFL.

### Subsetting (how the heavier weights were built)

Subset to the latin range and converted to woff2 from the upstream Google
Fonts TTFs with `fontTools` (`pip install --user fonttools brotli`):

```
python3 -m fontTools.subset SRC.ttf \
  --unicodes="U+0-FF,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --flavor=woff2 --layout-features='*' --output-file=OUT.woff2
```

### Flagged for review

1. **Resolved — all weights now self-hosted.** Previously only Regular (400)
   was local, so the page fell back to Google Fonts mid-render for Poppins
   500/600/700/800, Manrope 500/600/700, and JetBrains Mono 500/600/700.
   Those latin-subset woff2 are now committed here, so the system makes zero
   external font requests.

2. **IBM Plex Sans is decommissioned** (per ADR-0001 v0.3.0 update).
   The woff2 file, the @font-face declaration, the preview card, and all
   references have been removed. Tekrogen is sans-only via Poppins; if a
   second sans is ever needed, write a new ADR — do not reintroduce Plex Sans.

3. **IBM Plex Serif is not used anywhere.** Tekrogen is sans-only.
   The editorial role (Ghost article hero, long-form headlines, italic deks)
   is filled by Poppins 600 + Poppins italic. Don't add a serif face.

4. **Italic is not self-hosted.** No italic woff2 ships; italic deks render
   as browser-synthesized obliques (the previous Google Fonts link only
   loaded upright weights, so this is unchanged — not a regression). For true
   Poppins italic, subset `Poppins-Italic.ttf` and add an `@font-face` with
   `font-style: italic`. Tracked as a follow-up.
