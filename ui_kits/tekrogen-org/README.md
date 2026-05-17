# tekrogen.org — Ghost publication kit

One distribution of the Tekrogen organization brand, rendered as a public
field-notes publication on Ghost Pro.

This UI kit is **not** the brand. The brand lives one level up, in the root
design system: tokens, mark, type, voice, motion. Tekrogen is an
**organization-level brand** that gets distributed across many surfaces —
publications, apps, asset packs, slide decks, signage, member emails, OG
cards, conference badges. `tekrogen.org` is one of those distributions:
the public, long-form, editorial surface that today happens to be hosted
on Ghost Pro.

If you're looking for the brand definition itself, see:

- `../../README.md` — the design system, top-level
- `../../colors_and_type.css` — tokens
- `../../adr/` — the decisions that shaped it
- `../_shared/` — the mark and lockup components, shared across **every**
  distribution (not specific to .org)

---

## What this kit covers

A click-through recreation of the `tekrogen.org` publication, assembled from
the org-level tokens and shared components. Nothing in here is brand-defining
— it's brand-**applying**.

- **SiteHeader** — sticky top bar: tilted mark + locked Poppins 700 wordmark + nav + subscribe CTA
- **Hero** — editorial hero with eyebrow / title / dek / meta row
- **FieldNoteCard** — list item for `/notes/`
- **FieldNoteList** — list of notes with the section-head pattern
- **Article** — single field-note view (Poppins editorial: 600 headline, italic 400 dek)
- **SubscribeBlock** — member-subscribe CTA block (the cyan-bordered card)
- **Footer** — entity pillars + dragonfly mark + tagline
- **Dragonfly** — inline mark (tilted 18°), re-exported from `_shared/` for convenience

Three click-through views toggled by the in-page nav:

1. **Home** (`/`) — hero + recent field notes
2. **Field notes** (`/notes/`) — full list, mono kicker / Poppins editorial title pattern
3. **Single note** (`/notes/04`) — article body with byline and series footer

These components are intentionally cosmetic — no router, no real auth, no
real data. The subscribe form fakes a success state and shows the toast on
submit; the four real trust-states (anonymous / member / paid / entitled)
are mocked in `../../trust-state-matrix.html` per `adr/0006-trust-state-cta.md`.

---

## Where .org fits in the distribution map

Tekrogen produces and distributes work across many surfaces. The publication
this kit recreates is one of them — not the headquarters of the brand.

| Surface                       | Kit / file                              | Status   |
| ----------------------------- | --------------------------------------- | -------- |
| Public publication (.org)     | **this kit** (`ui_kits/tekrogen-org/`)  | built    |
| Ghost Pro asset pack          | `ui_kits/asset-pack/`                   | built    |
| Master lockup sheet           | `ui_kits/master-lockups/`               | built    |
| Mark concept canvas           | `ui_kits/mark-explorations/`            | built    |
| Trust-state matrix            | `../../trust-state-matrix.html`         | built    |
| Slide / talk template         | (planned)                               | —        |
| Member email masthead         | (planned)                               | —        |
| Conference badge / signage    | (planned)                               | —        |
| `.studio` / `.com` / `.net` sub-publications | (planned, hybrid roll-out) | —        |

Each surface re-renders the **same** org-level tokens, marks, and voice. The
only thing `.org` is allowed to "own" is the wing color lead — every
distribution gets to lead with the wing color of the entity that owns it
when the surface is entity-specific.

---

## What this kit deliberately doesn't define

- **Type stack** — comes from `../../colors_and_type.css`. Tekrogen is sans-only;
  see `../../adr/0001-typography-sans-only.md`.
- **Palette** — comes from the root tokens. `.org` leads with the `#446e88`
  wing on its OG card and section accents, but does not define new color.
- **Mark / lockups** — `../_shared/marks.jsx` and `../_shared/lockups.jsx`.
  Don't redraw the dragonfly here.
- **Voice & tone** — set in the root README under *Content fundamentals*.
  This kit just uses it.

If you find yourself reaching into this folder to change a brand-level
decision (a font, a wing color, the tilt angle, the tagline), you're in the
wrong folder. Push the change up to the design-system root so every other
distribution inherits it.
