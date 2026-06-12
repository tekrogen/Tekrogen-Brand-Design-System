# ADR-0011 — Component model conventions: shadcn structure, translated into the no-build idiom

- **Status:** Accepted
- **Date:** 2026-06-12
- **Relates to:** ADR-0002 (palette single source — components consume tokens only). ADR-0005 (icon system — the glyph/Lucide boundary components inherit). ADR-0007 (fluid type scale — the only legal type values). ADR-0010 (OG artifact tokens — the architecture rehearsal: tokens carry decisions, components compute geometry). Issue #16 carries the study; `Component Model Study.html` (repo root) is the full convention-by-convention translation. The component library (stage d) builds against this record and `Component Gap Analysis.html`.

## Context

The component library will add ~50 components. Without a recorded model, each lands with improvised variant mechanics, ad-hoc state handling, and per-page styling — exactly the drift the token layer exists to prevent. shadcn/ui is the reference model (and is what the future website repos use), but it cannot be installed here: this system is no-build, browser-Babel, globals-only by design. The study extracted shadcn's four structural conventions — anatomy, variants, tokens-as-contract, composition — and translated each. shadcn is a distribution system that amplifies design decisions rather than creating them; the design decisions here already exist. This ADR records the translations so stage (d) builds fifty components against one model, not fifty.

## Decision

**Components are DOM conventions, not APIs.** Each component is a documented markup pattern any surface reproduces — plain HTML, browser-Babel JSX, or a future Ghost theme. The `preview/` specimen is the contract's reference render.

1. **Native-element-first behavior.** The behavior layer is the platform: `<dialog>` (modal, backdrop, focus trap, Esc), `<details>/<summary>` (disclosure), the `popover` attribute (light-dismiss overlays), native form controls. Minimal vanilla JS only where no platform primitive exists (e.g., combobox active-descendant wiring). No Radix, no behavior dependency, no React requirement.

2. **One style block per component, tokens only.** All visual decisions live in one `.tk-<component>` CSS block consuming `var(--tk-*)` exclusively — type from the ADR-0007 scale, color from the ADR-0002 palette, radius/spacing from the existing scales. Zero literal values in component CSS.

3. **Sub-parts are `data-tk-slot`.** Component sub-parts carry `data-tk-slot="trigger | content | header | footer | item | handle"` — the same attribute mechanism as `data-tk-theme`. CSS targets parts via the attribute; no class proliferation. Whatever element carries `data-tk-slot="trigger"` *is* the trigger (the asChild outcome without the machinery).

4. **Variants are attribute axes with one definition site.** `data-variant` and `data-size` on the base class — `.tk-button[data-variant="outline"]`, `.tk-button[data-size="sm"]` — enumerated per component in its stage-(d) spec. The bare class is the default variant; attributes express deviation only; a missing attribute must equal the default. Every value inside a variant block is a token.

5. **Cascade discipline is the override seam.** Component blocks declare at single-class/attribute specificity so later consumer rules win naturally; overrides target `data-tk-slot` hooks. Never `!important`; never inline styles for themable properties.

6. **Attributes are the state API.** `open`, `aria-expanded`, `data-state` — JS reads/writes attributes, CSS styles off them. No hidden state in closures; any script (or none) can drive a component.

7. **Token-contract completions** (each lands as its own change under ADR-0002/0003 — this ADR records intent, not values):
   - `--tk-overlay` — the Dialog/Sheet/Drawer backdrop scrim, defined per theme. The one new color token. No blur — README rules out blur for modal scrims; transparency-over-ink only.
   - `--tk-danger-text` — paper-AA destructive text, modeled on the existing `--tk-success-text`.
   - **Disabled convention** — reduced opacity + `--tk-fg-4` (the token `colors_and_type.css` annotates "DECORATIVE / DISABLED ONLY — dividers, disabled UI") + `cursor: not-allowed`; one rule, not a token per component. `--tk-fg-5` stays decorative-only — never disabled text.
   - **Muted pairing** — muted surface = `--tk-bg-2` + `--tk-fg-3/4`; recorded as the canonical pairing, no new token.

   **Already shipped — components inherit, never redefine:**
   - **Focus ring** — `colors_and_type.css` applies `outline: 2px solid var(--tk-focus); outline-offset: 2px` to every focusable via zero-specificity `:where(…):focus-visible` (WCAG 2.4.7/2.4.11). Flush-edge elements inside `overflow: hidden` containers use `outline-offset: -2px`, per the stylesheet's own note.
   - **Radius mapping** — README "Corner radii" fixes it: badges = `--tk-radius-xs`, buttons = `-sm`, inputs = `-md`, cards/panels = `-xl`, chips = `-pill`. Component CSS binds to that mapping.

8. **Layering holds.** `preview/` specimens (reference primitives) → `ui_kits/_shared/` (modified primitives) → `ui_kits/tekrogen-org/` (product blocks). Stage (d) builds at the first layer and must compose upward without redesign.

## Consequences

- Stage (d) component specs enumerate: part inventory (`data-tk-slot` values), variant axes and values, token consumption, and state attributes — then implement. No mechanism decisions remain per-component.
- The brand invariants bind variants: a component may *offer* a `primary` variant, but one-cyan-per-surface means the page decides which single instance gets it. Hairlines-not-shadows, mono-caps labels, and the icon boundary (ADR-0005) apply inside every variant.
- The token additions in (7) are *not* made by this ADR — each is a separate palette/stylesheet change with its own CHANGELOG entry (versioning intent, pixel-diff scope) per ADR-0003.
- Because components are DOM conventions, the future Ghost Pro theme (stage e) and the shadcn-based website repos consume the same contract — markup patterns and tokens port; implementation does not have to.

## Verification

- `Component Model Study.html` renders the full translation table token-clean (font-guard: zero remote fonts, every `var(--tk-*)` resolves).
- Stage (d) review checklist: grep a new component's CSS for literal hexes/px type values (must be none), assert `data-tk-slot`/`data-variant` naming, and confirm the bare class renders the default variant.
