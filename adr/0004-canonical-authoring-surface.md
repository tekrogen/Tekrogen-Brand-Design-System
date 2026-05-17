# ADR-0004 — Canonical authoring surface: Ghost Pro (with BNR drift flagged)

- **Status:** Accepted (design-system side) · External BNR amendment pending
- **Date:** 2026-05-16

## Context

The Cursor analysis flagged a real inconsistency: the BNR (`admin/about/01.Tekrogen_BNR_Roadmap_v1.md`) describes the `.org` canonical authoring surface as Next.js + MDX, while `workflows/_planning/WF-001` and the working publication say Ghost Pro. Two different stacks claiming "canonical."

This matters because:

- SEO canonicalization picks one URL. Two stacks means two URLs claiming canonical.
- The renderer determines what design tokens get used end-to-end. Ghost Koenig blocks and MDX render slightly differently; layout parity requires picking one.
- The "publishing flywheel" pitch lives or dies on the author seeing the field note live within hours. Two authoring surfaces means the author has to pick — and the time-to-publish promise weakens.

The design system itself does not control which stack wins, but every kit and component in `ui_kits/tekrogen-org/` assumes one of them.

## Decision

**Within this repo, Ghost Pro is the canonical authoring and distribution surface for `.org`.** All `ui_kits/tekrogen-org/` components target Ghost Koenig-compatible output. The MDX path is **not** removed from consideration — it remains a future option — but it is not the current canonical surface, and the design system does not maintain parallel MDX renderers.

This ADR explicitly **does not** edit the BNR — that document lives outside the design-system repo. Instead, this ADR:

1. Pins the design system's assumption.
2. Names the BNR drift as a known external issue.
3. Recommends the BNR be amended to say "Ghost Pro (canonical distribution); Next.js + MDX (future option, not active)" — or vice versa — explicitly, with a date stamp.

## Consequences

- `ui_kits/tekrogen-org/` README updated to call out the Ghost Pro target explicitly.
- A future ADR may add an MDX renderer track if `.studio` or `.com` ship on Next.js; until then, layout primitives are designed once for Ghost.
- The BNR drift is tracked on the review dashboard as an external-flag, not a design-system fix.

## Out of scope

- The BNR itself.
- `workflows/_planning/WF-001` internal inconsistencies (the "End of WF-003" footer, the L7 enumeration under "five functional layers" header). Those are documentation issues for a workflow editor pass, not a design-system fix.
