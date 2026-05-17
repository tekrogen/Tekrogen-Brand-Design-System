# tekrogen.org — Ghost publication

The primary brand surface. A field-notes publication deployed on Ghost Pro.

This UI kit recreates the public-facing publication:

- **SiteHeader** — sticky top bar with tilted mark + locked Poppins 700 wordmark + nav + subscribe CTA
- **Hero** — editorial hero with eyebrow / title / dek / meta row
- **FieldNoteCard** — list item for `/notes/`
- **FieldNoteList** — list of notes with the section-head pattern
- **Article** — single field-note view (Poppins editorial: 600 headline, italic 400 dek)
- **SubscribeBlock** — member-subscribe CTA block (the cyan-bordered card)
- **Footer** — entity pillars + dragonfly mark + tagline
- **Dragonfly** — inline mark (tilted 18°), self-contained, no external imports

Tekrogen is **sans-only** — Poppins everywhere, no serif face. See `../../adr/0001-typography-sans-only.md`.

Three click-through views toggled by the in-page nav:

1. **Home** (`/`) — hero + recent field notes
2. **Field notes** (`/notes/`) — full list, mono kicker / Poppins editorial title pattern
3. **Single note** (`/notes/04`) — article body with byline and series footer

The components are intentionally cosmetic — no router, no real auth, no real
data. The subscribe form fakes a success state and shows the toast on submit;
the four real trust-states (anonymous / member / paid / entitled) are mocked
in `../../trust-state-matrix.html` per `adr/0006-trust-state-cta.md`.
