# ADR-0012 — Component gallery & copy-code contract: the registry, the three renderings, and the Ghost bridge

- **Status:** Accepted
- **Date:** 2026-06-13
- **Relates to:** ADR-0011 (component model — this is its first implementation surface). ADR-0002 (palette single source — components consume `var(--tk-*)` only). ADR-0003 (versioning intent — padding normalization is logged as a MINOR pixel-diff). ADR-0005 (icon system — the `⧉` copy glyph is brand-sanctioned). ADR-0008 (self-hosted fonts — the `@import url()` barrel is validated by the same `scripts/font-guard.mjs` that bans remote fonts). ADR-0004 (Ghost Pro is the canonical `.org` authoring surface — the `.hbs` rendering is the bridge to the future theme). Builds against `Component Gap Analysis.html` (the roadmap) and BNR §9.3 stage (d).

## Context

ADR-0011 fixed the component *model* (DOM conventions, token-only CSS, `data-tk-slot`/`data-variant`) but left three delivery questions open, and stage (d) cannot start without answering them: **where do component files live**, **how are they shown and copied**, and **how does a component become a Ghost partial** for the future custom theme (stage e). The owner's brief is explicit: one page that shows every component with a per-component copy button (the shadcn/ui-docs model), and components authored so they translate cleanly into Ghost partials by an author who is new to Ghost theme development. This ADR records the delivery contract so the ~50-component build-out is uniform.

## Decision

1. **Per-component registry under `components/`.** Each component is one ownable directory —
   `components/<name>/<name>.{css,html,hbs}` — assembled by a barrel, `components/tk-components.css`,
   that does nothing but `@import url('./<name>/<name>.css')` per component. Chosen over a single
   monolithic stylesheet so a component is one reviewable unit that maps 1:1 to a future Ghost partial
   bundle. The **`url()` form is mandatory**: `scripts/font-guard.mjs` (`CSS_IMPORT` regex) only
   follows `@import url(...)`, so a bare `@import "…"` would make the chain invisible to CI and let an
   undefined `var(--tk-*)` ship silently. A surface links the barrel alongside `colors_and_type.css`;
   tokens resolve through the chain.

2. **Three renderings of one contract, surfaced as tabs.** Every component ships the same markup in
   three forms, and the gallery exposes them as a tabbed `HTML · CSS · Ghost` copy control:
   - **`.html`** — framework-free semantic markup (the ADR-0011 DOM contract; also the `preview/`
     reference render).
   - **`.css`** — the one token-only `.tk-<component>` block.
   - **`.hbs`** — the same markup as a Handlebars partial. This is a *sanctioned third rendering of the
     DOM contract*, not a new artifact: a `.hbs` differs from the `.html` only by substituting Ghost
     helpers for static content.

3. **`.hbs` is hand-authored against a recorded helper-mapping table — no generator.** The no-build
   stance (ADR-0002) holds: there is no compile step turning `.html` into `.hbs`. For primitives the
   `.hbs` is ≈ the `.html` (no Ghost data to bind). The mapping below is the authoring contract; drift
   between `.html` and `.hbs` is caught in review, not by tooling.

   | Slot / content | Ghost helper |
   |----------------|--------------|
   | Page / post title | `{{title}}` |
   | Body / post content | `{{content}}` |
   | Primary nav | `{{navigation}}` |
   | Post loop | `{{#foreach posts}} … {{/foreach}}` |
   | Author byline | `{{author}}` / `{{primary_author.name}}` |
   | Tag / category | `{{primary_tag.name}}` |
   | Member-gated block | `{{#unless @member}} … {{/unless}}` |

4. **The gallery (`Component Gallery.html`, repo root) is a sibling study page, not a kit surface.**
   It reuses the `Component Gap Analysis.html` / `Component Model Study.html` chrome, the canonical
   `ui_kits/_shared/tk-theme.*` Ink/Paper toggle, and the `asset-pack` clipboard idiom
   (`navigator.clipboard.writeText` + transient `✓ Copied`). Its live specimens are styled by the
   linked barrel, so they follow the theme for free. Its version label is **static** and deliberately
   **not** registered in `scripts/version-stamp.mjs` (`FILES`), matching the two study pages — so
   `stamp-check` does not guard it.

5. **A catalog may show many `primary` variants at once.** One-cyan-per-surface (README) is a
   *page-composition* rule; a component catalog is documentation of the variants a component *offers*
   (ADR-0011 Consequences). The gallery notes this so the multiplicity does not read as a brand
   violation.

## Consequences

- Stage (d) PRs add components by dropping a `components/<name>/` bundle, appending one barrel
  `@import url()`, registering the component in the gallery's `COMPONENTS` array, and adding/keeping a
  `preview/` specimen — no per-component mechanism decisions remain.
- The future Ghost theme (stage e) consumes the `.hbs` partials and a concatenated
  `assets/built/screen.css` (= `colors_and_type.css` + every `components/*/*.css`); the markup and
  tokens port unchanged, only the assembly differs.
- Because the registry is validated by the existing `font-guard` `@import url()` chain, the no-build,
  zero-dependency CI stance is preserved — the registry adds no tooling.

## Verification

- `pnpm font:check` clean — the gallery links `components/tk-components.css`, so every component's
  `var(--tk-*)` resolves through the barrel chain.
- `grep -nE '#[0-9a-fA-F]{3,6}|[0-9]+px' components/<name>/<name>.css` returns only the documented
  exceptions (hairlines/radii are tokenized away; `.tk-avatar`'s `#fff` and `50%` are annotated).
- Each component renders its default variant from the bare class, and `data-tk-slot`/`data-variant`
  are present (ADR-0011 §3–§4).
