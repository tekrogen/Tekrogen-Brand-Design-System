# Fonts

Tekrogen uses three local-first font families. Regular (400) weights are
self-hosted from this directory; heavier weights (500/600/700/800) are
pulled from Google Fonts for now.

| Family            | Use                                                   | Regular (local)                            | Heavier weights      |
| ----------------- | ----------------------------------------------------- | ------------------------------------------ | -------------------- |
| **Poppins**       | Wordmark, headings, body sans (primary)                | `poppins-v24-latin-regular.woff2`          | Google Fonts (500–800) |
| **Manrope**       | **Sans fallback** for Poppins — committed, ships in every stack (closest x-height + aperture match) | `manrope-v20-latin-regular.woff2`          | Google Fonts (500–700) |
| **JetBrains Mono**| Mono labels, code, CLI splash, eyebrows               | `JetBrainsMono-Regular.woff2`              | Google Fonts (500–700) |

> **Sans-only brand.** Tekrogen does not use a serif face. The editorial role (Ghost article hero, long-form headlines, italic deks) is handled by Poppins 600 + Poppins italic. Earlier drafts of this system used IBM Plex Serif for editorial — that was retired; do not reintroduce it.

The `@font-face` declarations live at the top of `../colors_and_type.css`.
Google Fonts is loaded in each HTML file's `<head>` for the heavier weights.

### One-line link (for the additional weights, in `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Manrope:wght@500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
```

### Flagged for review

1. **Only Regular (400) weights are self-hosted.** The brand uses Poppins 700
   (wordmark, headings), Poppins 600 (lockup cap text), Poppins 500 (nav
   subscribe pill), JetBrains Mono 500 (every mono label), JetBrains Mono 600
   (button copy), JetBrains Mono 700 (the "✓ previewing" chip). Without
   those weights self-hosted, the page falls back to Google Fonts mid-render
   — fine for now, but worth uploading the full set if you want zero
   external requests.

2. **IBM Plex Sans is decommissioned** (per ADR-0001 v0.3.0 update).
   The woff2 file, the @font-face declaration, the preview card, and all
   references have been removed. Tekrogen is sans-only via Poppins; if a
   second sans is ever needed, write a new ADR — do not reintroduce Plex Sans.

3. **IBM Plex Serif is not used anywhere.** Tekrogen is sans-only.
   The editorial role (Ghost article hero, long-form headlines, italic deks)
   is filled by Poppins 600 + Poppins italic. Don't add a serif face.
