# Tekrogen Design System

> **Real solutions. Built, proven, ready to use.**
>
> The Visual Design System and SOP for creating visual products across the
> four Tekrogen entities — .org, .studio, .com, .net. Four wings, one
> pursuit: build it, prove it, publish what we learned.

---

## What is Tekrogen?

Tekrogen is a small, founder-led practice (Martinique Dolce) operating across **four
sibling entities**, each owning a different surface of the same work:

| Entity            | Wing color | Role                                                  |
| ----------------- | ---------- | ----------------------------------------------------- |
| **tekrogen.org**   | `#446e88`  | Research, academic groups, open work                  |
| **tekrogen.studio**| `#6491ac`  | Proof of concept and demos                            |
| **tekrogen.com**   | `#0db4b9`  | Commercial product, paid offerings                    |
| **tekrogen.net**   | `#7edba5`  | Infrastructure, platform, developer tools             |

The four entities share **one mark** (the dragonfly), **one wordmark system**
(Poppins + JetBrains Mono), and **one palette** — but each gets to lead with its
own wing color when the surface is entity-specific.

Tekrogen is an **organization-level brand**. This system is not tied to any one
distribution — it defines the visual language and SOP for **every** product
that ships under any of the four entities (publications, apps, asset packs,
slide decks, signage, member emails, OG cards, conference badges, and so on).

The Ghost-Pro-hosted publication at `tekrogen.org` is **one** such distribution
among many, not the headquarters of the brand. The hybrid plan is to spin up
`.studio`, `.com`, and `.net` as sibling sub-publications later, each
re-rendering the same tokens with its own wing-color lead.

### What this design system covers

- The **mark** (v2 dragonfly, tilted 18°) and six alternate concept directions
- The **dual wordmark system** — Poppins (public) + JetBrains Mono (technical)
- The **palette** — both screen and print-tuned values
- The **type scale**, spacing scale, radius scale, motion tokens
- **Content & tone** rules — how Tekrogen writes
- **UI kits** — production-quality recreations of the publication header,
  social cards, the mark-exploration canvas, and the Ghost Pro asset pack
- **Slide templates** — for talks, field notes presentations, and onboarding

### Sources this system was built from

All under `tekrogen-brand/` (locally mounted, read-only):

- `tekrogen-style-guide.md` — top-line spec (type, palette, mark rules)
- `ghost-assets/STYLE-GUIDE.md` — Ghost Pro slot mapping
- `ghost-assets/*.svg` — production logo, icons, favicon (copied into `assets/`)
- `ghost-assets/og-*.png` — OG / Twitter cards (copied into `assets/`)
- `Tekrogen Master Lockups.html` — long-form lockup specimen with rules
- `Tekrogen Ghost Pro Asset Pack.html` — production asset pack with downloads
- `Tekrogen Mark Explorations.html` — design canvas with 7 mark concepts
- `components/marks.jsx` — all seven mark React components
- `components/lockups-app.jsx` — master lockup sheet React app
- `components/concept-cards.jsx` — concept artboard render
- `archives/Logos.zip` — older logo archive (not unpacked)

---

## INDEX — files in this design system

```
.
├── README.md                       ← you are here
├── SKILL.md                        ← agent-skill metadata for Claude Code
├── colors_and_type.css             ← CSS vars: --tk-* tokens + semantic styles
├── assets/
│   ├── tekrogen-mark.svg                 ← raw dragonfly, light-bg
│   ├── tekrogen-mark-inverse.svg         ← raw dragonfly, dark-bg
│   ├── tekrogen-logo-light.svg           ← full lockup, light theme
│   ├── tekrogen-logo-dark.svg            ← full lockup, dark theme
│   ├── tekrogen-icon-256.svg / 512.svg   ← rounded-square icon, dark
│   ├── favicon.svg                       ← 32px favicon
│   ├── og-default.png                    ← 1200×630, homepage OG
│   ├── og-author*.png|svg                ← author OG cards
│   └── og-series.png                     ← series OG card
├── fonts/
│   └── README.md                   ← Google Fonts links (see Caveats)
├── preview/                        ← Design-System-tab card files
│   ├── card-palette-pillars.html
│   ├── card-palette-neutrals.html
│   ├── …
└── ui_kits/
    ├── _shared/                    ← shared React components (marks, lockups)
    ├── tekrogen-org/               ← Ghost publication (tekrogen.org)
    │   ├── README.md
    │   ├── index.html              ← interactive site mock
    │   └── *.jsx                   ← Header, Hero, FieldNote, Footer, …
    ├── ghost-pro-pack/             ← Ghost Pro asset pack page
    │   ├── README.md
    │   └── index.html
    └── mark-explorations/          ← design-canvas of 7 concept marks
        ├── README.md
        └── index.html
```

---

## CONTENT FUNDAMENTALS

How Tekrogen writes — voice, tone, casing, vocabulary, examples.

### Voice in one line

> A backend engineer who also grades dissertations. Honest, specific,
> understated — never breathless. Writes like the work has already shipped.

### Tone dial

| Axis                      | Position                                           |
| ------------------------- | -------------------------------------------------- |
| Formal ↔ Casual           | **Middle-formal.** Plainspoken, never slangy.      |
| Hyped ↔ Understated       | **Far understated.** "Ready to use," not "🚀 launching." |
| Person                    | **First-person plural for the practice ("we ship"); second-person for the reader ("you'll find"). Avoid "I."** |
| Tense                     | **Declarative present** — the work exists already.  |
| Promise                   | **Earned, not aspirational.** "Built, proven" beats "world-class." |

### Casing rules

| Surface                                     | Casing                              |
| ------------------------------------------- | ----------------------------------- |
| Wordmark `TEKROGEN`                         | **UPPERCASE**, locked, 0.18em tracking |
| Article headlines, section H1/H2           | **Sentence case.** Periods allowed.  |
| Eyebrows, mono labels, navigation pills   | **UPPERCASE**, 0.14–0.18em tracking, mono |
| Code, terminal, CLI splash, file paths    | **lowercase**                       |
| Entity names                                 | **lowercase with the dot.** `tekrogen.org`, `.com`, `.net`, `.studio` — never "Tekrogen Org." |

### Vocabulary — words Tekrogen uses

- **Field notes** (not "blog posts"). The publishing surface is `/notes/`.
- **Pillar** (not "vertical" or "product line") — referring to .org/.studio/.com/.net.
- **Lockup**, **mark**, **wordmark**, **wing**, **spine**, **facet** — the brand's
  visual vocabulary, lifted from the dragonfly anatomy.
- **Hybrid plan**, **sub-publication** — the rollout strategy for the four entities.
- **Built, proven, ready to use** — the tagline, used verbatim. Don't paraphrase.

### Vocabulary — words Tekrogen does NOT use

Avoid: *world-class, cutting-edge, revolutionize, unlock, supercharge,
seamlessly, leverage, synergy, journey, ecosystem (unless literally biological),
🚀 / 🔥 / ✨* — none of these.

### Tagline & taglines-by-pillar

- **House:** "Real solutions. Built, proven, ready to use."
- **.org:** "Research, academic groups, open work."
- **.studio:** "Proof of concept and demos."
- **.com:** "Commercial product, paid offerings."
- **.net:** "Infrastructure, platform, developer tools."

### Punctuation & cadence

- Periods are encouraged inside headlines. Short fragments. Tekrogen is comma-and-period, not exclamation-mark.
- Em-dash — used freely to set off a clarification or specifier.
- "Strong" lists: dense, comma-separated nouns ("Research, instruction, infrastructure — from a team that does all three.") beat bulleted marketing speak.
- Numbers as numerals (`4 entities`, `18°`, `1200×630`) — Tekrogen is technical.

### Emoji + symbol policy

- **No emoji** in body copy, headlines, or marketing.
- **Symbol glyphs** are fine in technical UI affordances: `↓` for downloads,
  `↗` for external links, `✓` / `✗` for status, `⧉` for copy, `·` (middot)
  as a separator. These are part of the mono-label vocabulary.
- The Ghost Pro asset pack uses them; the marketing pages do not.

### Concrete examples — straight from the codebase

> **Hero:** "Real solutions. Built, proven, ready to use."
>
> **Field-note title:** "Four wings, one pursuit: how one mark carries .org, .studio, .com, and .net."
>
> **Dek (subtitle):** "Field notes on running a four-entity practice from a single mark — we build it, prove it, and publish what we learned, same pursuit across all four wings."
>
> **Author micro-bio:** "Builds it, proves it, publishes what we learned — across all four wings."
>
> **Section eyebrow:** `01 · MASTER` &nbsp;&nbsp; `04 · DOMAIN SPLIT`
>
> **Meta row:** `FIELD NOTE · 04` &nbsp; · &nbsp; `MAY 2026` &nbsp; · &nbsp; `8 MIN READ`

---

## VISUAL FOUNDATIONS

### The mark — four wings, one pursuit

> **Four wings, one pursuit.**
> Each wing is one entity — .org, .studio, .com, .net. The pursuit is the same across all four: build it, prove it, publish what we learned.

This is the canonical mark statement. Use it verbatim on About pages, conference badges, member-email mastheads, and anywhere the mark needs to introduce itself. The internal SVG anatomy still uses *spine* and *facet* as drawing labels — that's fine, those are mechanical names. The customer-facing word for the body is **pursuit**.

### The signature move — tilt

Every dragonfly mark is **rotated 18° clockwise** at every size and context.
This is the single most-recognizable element of Tekrogen. It is **never** shown
upright. CSS var: `--tk-tilt-mark: 18deg`. The mark is rotated via a `<g transform="rotate(18 100 110)">` *inside* the SVG, so consumers don't need to wrap it in a CSS rotate.

### Two reigning surfaces — Ink and Paper

Tekrogen runs on a tight two-mode system:

- **Ink** — `#0e1116`, the dark surface. Used for the marketing site, the Ghost Pro publication on dark themes, the mark exploration canvas, the asset pack page. **This is the brand's primary mode.** Most surfaces start here.
- **Paper** — `#fbfcfd`, the light surface. Used for printed lockups, the light-themed publication header, exported social cards, signage. A `#f4ede2` warm variant exists for printed collateral / archive contexts.

There is no in-between gradient backdrop. Pick a side.

### Color

- **Body / spine** `#385166` — the dragonfly body and primary dark text on paper.
- **Four pillars** — one wing color per entity. Use them as **accents**, not as page backgrounds. They appear on tags, hairline labels, OG card lead bars, the SVG mark itself.
- **Cyan accent** `#1fd5da` — the brightest color in the system. Reserved for *one* thing per surface: hero accent, primary CTA, primary link, "this is the action" affordance. Never used as a background fill on text.
- **Print column** — five pillar values are nudged for CMYK stability (see `colors_and_type.css` `--tk-*-print`). `.com` drops a touch of cyan to survive coated stock; `.net` deepens slightly.

### Backgrounds — what they look like

- **No photographic imagery** in the brand surfaces seen so far. No stock photos, no team photos beyond avatars.
- **No illustrations** beyond the dragonfly mark itself.
- **No repeating patterns, no textures, no grain.** The page is solid, the cards are solid.
- **One soft radial glow** is permitted on dark OG cards — a `radial-gradient(circle at center, rgba(13,180,185,0.18), transparent 60%)` in the upper-right corner. This is a 1-of-1 effect; don't introduce other glows.
- **Avatars are simple `linear-gradient(135deg, .org → .com)`** — initials in 600-weight Poppins on top.

### Type

- **Wordmark + headings** — Poppins 700, UPPERCASE for wordmarks, sentence-case for headings.
- **Body** — Poppins 400, 16/1.6.
- **Sans fallback** — Manrope. If Poppins fails to load (network, embed, GDPR), the system falls back to Manrope before system-ui. Manrope was chosen as the fallback because its x-height and aperture closest match Poppins, so layout shift on the swap is minimal. Self-hosted Regular at `fonts/manrope-v20-latin-regular.woff2`.
- **Technical surfaces** — JetBrains Mono 500, lowercase. CLI splash, repo headers, API docs, terminal-adjacent.
- **Editorial** — **also Poppins.** Long-form article hero titles use Poppins 600 with `-0.015em` tracking; italic deks use Poppins 400 italic. **No serif face is used in the brand.** This is a deliberate sans-only stance — the editorial weight comes from size, tracking, and the italic dek, not from a serif counterpoint.

### Animation & motion

- **Easings** — one curve does most of the work: `cubic-bezier(.2,.7,.2,1)` (snappy out, gentle settle). A bouncier `cubic-bezier(.2,.9,.3,1.2)` is reserved for the tilt-on-hover affordance.
- **Durations** — `120ms` for hover state, `220ms` default, `280ms` for tilt/transform, `420ms` for page-level fades.
- **No bouncing buttons, no parallax, no autoplay.** The interface is calm.
- **Fades and transforms only.** Slides come from `translateY(-4px)` or scale `0.98 → 1`. Never from `100vw`.
- **Tilt is the only signature animation** — the mark can subtly de-tilt or hover-tilt by ±2°. Otherwise it stays at 18°.

### Hover states

- **Buttons:** background fills to `--tk-cyan`, text inverts to `--tk-ink`. Same `120ms` ease.
- **Mono pill labels:** border lifts from `--tk-border` to `--tk-cyan`.
- **Cards:** no shadow change. Border lifts to `--tk-cyan` at `40%` opacity.
- **Links:** the `35%`-opacity underline saturates to 100%.

### Press / active states

- **Buttons:** scale `0.98`, no color shift. Released over `120ms`.
- **Cards do not depress.** They are objects, not buttons.

### Borders, shadows, elevation

- **Hairlines** carry everything. `1px solid var(--tk-border)` is the workhorse. No 2px borders.
- **Drop shadows are rare.** There is no diffuse "elevation" system. The Tekrogen surface is flat; depth comes from contrast (ink vs. paper) and hairline color, not blur.
- **Two shadow recipes exist** and only those:
    - `--tk-shadow-2: 0 14px 40px rgba(0,0,0,0.5)` — for the floating download dock and toasts on the dark surface.
    - `--tk-shadow-glow` — `0 0 0 1px var(--tk-cyan), 0 0 24px rgba(31,213,218,0.18)` — for the active state on the *one* primary CTA per surface.

### Corner radii — opinion

- **12px** is the default card radius (`--tk-radius-xl`). Most cards.
- **8px** for inputs (`--tk-radius-md`), **6px** for buttons (`--tk-radius-sm`), **4px** for inline mono badges.
- **Pill** (9999px) for status chips and mono pill labels.
- **No 24/32px "soft" cards.** Tekrogen's radii are crisp.

### Layout rules

- **Container max-width:** `1380px` for marketing / brand docs, `760px` for prose-only.
- **Gutters:** `48px` on desktop, `20px` on mobile.
- **Sticky toolbar pattern:** every long doc has a sticky top bar with `backdrop-filter: blur(8px)` over `rgba(14,17,22,0.92)`. Border-bottom hairline. This is a recurring layout primitive.
- **Section heads** use a `flex` row with eyebrow + h2 on the left, mono meta on the right, separated by a `border-bottom: 1px solid var(--tk-border)` underline that's `18px` from the row and followed by `24px` of breathing room.

### Transparency & blur

- **Used once:** the sticky toolbar (described above).
- **Never used for:** card surfaces, modal scrims (the brand has no modals yet), background plates.

### Imagery treatment

- **None so far.** No photography in the brand. OG cards are typographic, not photographic.
- If photography enters the system: cool-leaning, slightly desaturated (`saturate(0.85)`), no grain, no warm filter. Default to documentary, not editorial.
- The dragonfly is the only illustrative element. Don't draw new ones.

### Cards — anatomy

```
┌────────────────────────────────────┐  background:  var(--tk-bg-2) / .paper variant
│ ─tag────────────── dim─────────── │  border:      1px solid var(--tk-border)
├────────────────────────────────────┤  radius:      12px (--tk-radius-xl)
│                                    │  overflow:    hidden
│           card-body content        │
│                                    │  Three optional zones, in order:
├────────────────────────────────────┤    1. card-head    — mono labels left/right
│ ─dim───────────────────  [↓ btn] ─ │    2. card-body    — flex center, padding 32px
└────────────────────────────────────┘    3. card-foot    — filename · download button
```

The `card-head` and `card-foot` borders use the *same* `--tk-border` token — the
card paper variant overrides it to `#e6ebef`. Don't introduce a separate divider color.

---

## ICONOGRAPHY

Tekrogen does **not** use a general-purpose icon library. The surfaces seen so far
use **mono-label glyphs** instead of icons in most affordances — the brand expects
the type system, not pictograms, to communicate state.

### What you'll see in Tekrogen surfaces

| Glyph     | Use                                          |
| --------- | -------------------------------------------- |
| `↓`       | Download buttons (asset pack)                |
| `↗`       | External links                               |
| `↕` `↔`   | Clear-space / dimension callouts in spec docs |
| `✓`       | "Copied" / success toast                     |
| `✗`       | Error / failure                              |
| `⧉`       | "Copy SVG" / copy-to-clipboard               |
| `×`       | Dismiss / close                              |
| `·`       | Mid-dot separator in mono labels             |
| `…`       | "Building…" / in-progress                    |

All of these are **Unicode characters in mono type**, not SVG icons or icon fonts.
They sit alongside an uppercase mono label and inherit its color.

### Product / app icon system — Lucide

Brand surfaces (marketing site, asset pack, master lockups) stay icon-free. **Product / app surfaces** (member dashboard, docs, settings, search) use **Lucide**:

- **Library:** [lucide.dev](https://lucide.dev) — sibling fork of Feather Icons, actively maintained.
- **Weight:** Outline. Always.
- **Stroke:** `1.5` (not the default `2`). Matches the hairline-heavy Tekrogen surface.
- **Color:** `currentColor`. So links inherit `--tk-cyan`, body inherits `--tk-fg-2`, and the brand palette never has to be re-applied per icon.
- **Sizes:** `16` / `20` / `24` / `32`. No 18, no 21. The 4-step scale matches `--tk-space-*`.
- **CDN:** `https://unpkg.com/lucide@latest` (or pin a version). Use the `<i data-lucide="name">` web-component pattern + `lucide.createIcons()` on mount.

```html
<!-- inline pattern -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
</svg>
```

**Don't substitute** Tabler, Phosphor, Heroicons, Material — they have different stroke metrics and break the surface rhythm. If Lucide is missing a glyph you need, draw one in the Lucide style (1.5px stroke, 24×24 viewBox, rounded caps + joins) rather than reaching for another set.

### The mark — not an icon

The dragonfly is a **mark**, not an icon. It only appears at brand entry
points: site header, favicon, OG cards, splash, conference badge, member-email
masthead. **Don't use it inline mid-paragraph or as a list bullet.**

### Logos & icon files

All in `assets/` (copied from the source codebase):

- `tekrogen-mark.svg` — bare dragonfly, no wordmark, light-bg ready
- `tekrogen-mark-inverse.svg` — same, lifted body/head for dark bg
- `tekrogen-logo-light.svg` — full lockup, paper bg, 600×160
- `tekrogen-logo-dark.svg` — full lockup, ink bg, 600×160
- `tekrogen-icon-256.svg`, `tekrogen-icon-512.svg` — rounded-square icons, dark bg
- `favicon.svg` — favicon vector
- `og-default.png`, `og-series.png`, `og-author*` — production OG cards

### Emoji policy

**Not used.** Tekrogen does not show emoji in any brand surface. If you find
yourself reaching for one in marketing or product copy, find a Unicode glyph
above or write the word.

---

## How to use this system

1. **Tokens** — load `colors_and_type.css` first. All variables are namespaced
   `--tk-*`. Don't introduce new colors; if you need a color the system doesn't
   have, ask first.
2. **Logos** — link the SVG files in `assets/`, don't redraw the dragonfly.
3. **Type** — load Poppins + Manrope + JetBrains Mono from Google Fonts.
   Tekrogen is sans-only; editorial slots (article hero, italic deks) use
   Poppins 600 + Poppins italic. **Do not add a serif face.**
4. **Components** — `ui_kits/_shared/marks.jsx` exports all seven mark concepts
   plus the palette object. `ui_kits/tekrogen-org/` has the publication
   components ready to assemble a page.
5. **Tilt** — `transform: rotate(var(--tk-tilt-mark))` whenever you place the
   bare mark SVG. The pre-built lockup SVGs already include the rotation.

---

## Caveats — please review

- **Fonts are partially self-hosted.** Regular (400) weights of Poppins,
  Manrope, and JetBrains Mono live in `fonts/`. Heavier weights (500–800)
  load from Google Fonts as a progressive enhancement. The brand is
  **sans-only** — no serif face anywhere.
- **The icon system is unspecified.** I've defaulted product/app UIs to
  **Lucide outline** as the closest match to the brand DNA. The marketing
  surfaces stay icon-free as the source materials do. Flag if you want a
  different icon set.
- **`.studio`, `.com`, `.net` sub-publications don't exist yet.** The hybrid plan
  is documented but I've only built `tekrogen.org` (the Ghost publication). If
  you want me to mock the other three with their wing-color leads, point me at
  any reference material.
- **No photography guidelines** because the brand uses none. If photography
  ever enters the system, that's a follow-up question.
- **The `archives/Logos.zip`** in the source was not unpacked — it appears to
  contain older logo iterations. Tell me if you want them surfaced.
