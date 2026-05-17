# Cursor: Tekrogen Design System — Strategic & Operational Analysis

**Document type:** Task 01 deliverable — design system evaluation  
**Scope:** Repository `tekrogen-design-system` plus cross-referenced `admin/about/01.Tekrogen_BNR_Roadmap_v1.md` and `workflows/_planning/README.md` (WF-001)  
**Analyst framing:** Senior brand systems / UX governance (analysis produced in **Cursor** for traceability)

---

## Executive Summary

Tekrogen’s design system is **strong at the foundations layer** and **thin at the productization and governance layers**. The codebase encodes a credible visual–semantic pairing (four-wing dragonfly → four domains), a thoughtfully scoped CSS token layer (`stylesheets/colors_and_type.css`), and working reference implementations (`ui_kits/`, `preview/`). Strategic narrative in the BNR is unusually clear for an early-stage org: build → document → demo → monetize, with explicit audience segmentation by *relationship to the problem* rather than vanity personas.

Overall **maturity: Emerging**, trending **Structured** in visual foundations only. **Operational coherence across the flywheel is not yet enforced by the repo**: sibling domains (.studio / .com / .net) are largely aspirational in live terms, workflow docs contain internal inconsistencies, and typography guidance diverges across files (sans-only foundations vs serif imports in previews vs stale “serif body” wording in kit README). None of these break the brand idea; they signal **architecture drift risk** exactly when the ecosystem scales from Ghost-first publishing to multi-app Turborepo delivery.

Without correction, the risk is familiar: tokens and metaphors proliferate faster than naming, versioning, and “single source of truth” contracts—undermining the **trust-through-documentation** promise Tekrogen stakes.

---

## Foundational Brand Understanding

**What Tekrogen is.** A technology R&D shop that monetizes disciplined technical work through a publishing flywheel: real builds, transparent write-ups, demos, then licensable artifacts (modular components and templates)—as codified in the BNR mission and modular product strategy.

**Differentiation.** The offer is not “more content” or “another template store.” It is **evidence-linked product**: narrative and artifacts stay coupled so evaluation cost drops for Builders, Technical Decision-Makers, and Operators & Buyers (segments align across BNR and WF-001).

**Signals communicated by the current system.**

- **Intellectual:** Systems thinking—pillar colors, constrained motion tokens, avoidance of gratuitous elevation (`--tk-shadow-*` commentary).
- **Emotional‑operational:** Calm seriousness (dark-first ink surfaces, monospace meta rhythm, restrained glow accents).
- **Trust model:** Earned credibility through procedural honesty (BNR §5.x study structure emphasizing trade-offs and retrospectives)—the design tokens should eventually *enforce* those content patterns visually (callouts, code blocks, CTA staging), not merely decorate them.

---

## Strengths

1. **Pillar semantics are wired into the geometry and the UI.** The dragonfly implementation (`ui_kits/_shared/marks.jsx`) maps wings to `--tk-org`, `--tk-studio`, `--tk-com`, `--tk-net`, matching `:root` in `colors_and_type.css`. Footer copy (`Footer.jsx`) reinforces domain purpose in plain language. *Why it works:* visitors can infer “where they are” in the business model without a slide deck—this directly supports editorial trust.

2. **CSS custom properties show real systems discipline.** Naming (`--tk-fg-*`, `--tk-*-print`, paper theme overrides, motion, radii, container widths) reflects **token thinking**, not random SCSS spaghetti. Explicit documentation that surfaces “hairline borders over diffuse shadows” is a **credibility cue** aligned with engineering taste.

3. **Dual reading plane (public sans / mono technical) is product-realistic.** The master lockups kit documents Poppins vs JetBrains Mono as co-equal commitments; monospace kickers and meta labels mirror how developer brands signal “spec” vs “story.”

4. **Operational artifacts anticipate publishing reality.** Ghost Pro asset pack + field-notes kit describe a plausible **near-term canonical surface** (.org), while WF-001 maps Ghost templates to BNR lifecycle stages—even where implementation is unfinished, the **information architecture intent** is directional for teams.

5. **Strategic prose (BNR) matches product behavior in intent.** Modular components “each running the flywheel” is coherent with Tekrogen’s anti-template-marketplace stance and explains how design debt will compound unless component boundaries mirror business boundaries (`@tekrogen/*` trajectory in BNR).

---

## Inconsistencies & Risks

Each item: problem → risk → corrective action.

| Issue                                    | Problem                                                                                                                                                                                                                              | Risk                                                                                                                                                | Corrective action                                                                                                                                                                                                                                            |
|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Typography source-of-truth split**     | `colors_and_type.css` declares a **sans-only** editorial model; `preview/_card.css` pulls **IBM Plex Serif** / **Source Serif 4**; `ui_kits/tekrogen-org/README.md` still says “serif body” while `Article.jsx` renders **Poppins**. | Editors and engineers ship **conflicting reading experiences**; accessibility baselines (line length, rhythm, substitution fonts) drift by surface. | Lock one **Editorial Typography ADR**: either restore serif for longform *only on .org* with explicit roles, or delete serif imports and update all kits/README previews. Encode choice in tokens (`--tk-font-editorial` already hints—finish the contract). |
| **Duplicate color authority**            | Pillar hex values live in **`marks.jsx`** (`TK_PALETTE`) and **`colors_and_type.css`**—must stay manually synchronized.                                                                                                              | Visual regression when one file updates—especially print-tuned pillars vs screen.                                                                   | Generate palette JSON once; compile into CSS + JS—or import shared module at build time.                                                                                                                                                                     |
| **Workflow document integrity (WF-001)** | Opening paragraph repeats aggressively; §5 labels “five functional layers” then enumerates through **L7**; footer reads **“End of WF-003.”** Tag naming drifts (`#feature-product-detail` vs text “details”).                        | Contributors treat governance docs as unreliable—**authority leaks** away from Markdown into tribal knowledge.                                      | Editorial pass + version stamp; enforce doc lint or CODEOWNERS on `workflows/`; reconcile tag naming with Ghost `routes.yaml`.                                                                                                                               |
| **BNR ↔ live stack drift**               | BNR `.org` row still references **Next.js MDX** canonical; WF‑001 asserts **Ghost Pro live** theme. Workflow paths point outside this repo (`/Volumes/.../2604060957-tekrogen-brand`).                                               | Teams misplace **canonical URL and rendering**—SEO, MDX vs Ghost Koenig, and design parity diverge silently.                                        | Mark “canonical authoring” vs “distribution renders” explicitly; synchronize BNR table with Ghost reality or schedule BNR amendment.                                                                                                                         |
| **Pillar rhetoric nuance**               | `Footer.jsx`: `.studio` = “Design, instructional systems, learning”; BNR emphasizes **demos / proof**. Not wrong, but **verb space** differs from “Demonstration & Showcase.”                                                        | Mild **positioning fuzz** between “education brand” vs “proof-of-capability showroom.”                                                              | Align pillar one-liners everywhere (footer, OG series cards, onboarding) with BNR wording—difference should be deliberate, not accidental.                                                                                                                   |
| **Trust-stage UX not modeled in-repo**   | UI kit notes “Subscribe form fakes success.” WF describes member/paid gates, license tiers—**not mirrored** in Storybook‑like states here.                                                                                           | When commerce lights up, **first real payment flow** collides with placeholder optimism—credibility shock.                                          | Add explicit **trust-state matrix** mocks: anonymous / member / paid / download‑entitled—especially for cyan CTA lineage.                                                                                                                                    |

---

## UX & Brand Alignment Analysis

**Does UX reinforce brand?** For `.org`-style editorial surfaces—**mostly yes.** Mono eyebrows, cyanaccent discipline, restrained motion, and pillar‑left accents read as technical without cosplay‑cyberpunk.

**Does visual identity support trust?** The locked tilt (`--tk-tilt-mark`), dual wordmarks, and non‑shadow elevation philosophy support **engineering rigor**. The symbolic story (living specimen vs pinned) is evocative; ensure it’s **actually taught** once per visitor journey—not buried only in dragonfly internals.

**Does editorial support authority?** Structurally yes in BNR (problem → acceptance → stack → trade‑offs → build → retrospective → outcome → CTA). The repo does not yet expose **canonical layout primitives** for those sections (aside from narrative field notes)—gap between **strategy** and **layout system**.

**Commerce alignment.** Until `.studio`/`.com` ship, Tekrogen risks over‑certifying Ghost polish while downstream conversion paths are vapour. WF‑001 correctly flags blockers—the design system needs **paired-content CTA tokens** reused identically across static previews and eventual Next apps.

---

## Governance Maturity Assessment

| Dimension | Assessment |
|-----------|--------------|
| **Readiness for scaling** | Foundations exportable (`:root`, preview cards)—**no semver, no changelog discipline for tokens**, CHANGELOG barely bootstrapped. |
| **Documentation quality** | High concept (BNR, WF) versus **executable contracts** moderate; internal doc typos/redundant paragraphs reduce trust-inside-org. |
| **Enforceability** | Minimal; no linter for token misuse, no contribution guide, no semantic component API baseline. |
| **Long‑term maintainability** | Depends on consolidating JS/CSS palettes and choosing monorepo package boundary (@tekrogen/ui-tokens)—**not yet instantiated**. |

**Maturity verdict**

- Brand narrative clarity: **Structured → Mature** (BNR-grade).
- Visual token layer: **Emerging → Structured**.
- Cross‑repo governance & lifecycle: **Early → Emerging**.
- Combined **operational ecosystem**: **Emerging**.

---

## Strategic Recommendations

Prioritized while **preserving** Tekrogen philosophy (credibility-first, modular flywheel).

### 1. Critical fixes

- Normalize **typographic contract** across CSS, previews, README, and JSX (sans-only vs editorial serif)—pick one directional story.
- Eliminate **palette duplication** (single generated source).
- Repair **WF‑001 credibility** (layer numbering, ID footer, prose duplication, tag naming symmetry).

### 2. Structural improvements

- Publish a **`@tekrogen/tokens`** (or npm‑scoped equiv.) package—even if tarball-only internally—exported as CSS + TS/JSON consumers.
- Add **paired-content / flywheel CTA** as a documented primitive (tokenized border + pillar color inheritance per WF‑001 rule).

### 3. UX refinements

- Build **explicit trust-state UI** placeholders (anonymous vs entitled download) aligned with cyan accent lineage—avoid only happy-path demos.
- Add **study template layout partials** (Problem, Acceptance Criteria…) as reusable MDX/HTML sections matching BNR—forces visual parity with rhetoric.

### 4. Governance improvements

- ADR-lite folder: Typography, Canonical Authoring Surface, Palette Generation, Ghost vs MDX layering.
- Version tokens when pillars shift; semver **minor** for visual breaking changes—even pre‑1.0.0 communicates discipline.

### 5. Long-term opportunities

- Map **evaluation / rating article types** to distinct—but related—density scales (tabular data, scoring UI) once SaaS-eval volume grows.
- When Turborepo consolidates repos, elevate **DDD boundary badges** directly into header chrome (supplier/customer metaphors subtly, not jargon-first).

---

## Closing Note (systems, not vibes)

Tekrogen already reads as **a brand that earns attention through procedure**. The codebase supports that posture in tokens and symbolism; it will **earn enterprise-grade cohesion** once documentation authority matches code authority—especially on typography, canonical publishing surface, and single-source palette truths. Fixing those is inexpensive relative to reputational downside when .com and payment flows go live.

**Cursor session role:** This file captures a snapshot analysis for human review—iterate with diffs referencing specific ADRs once the team selects the serif/sans reconciliation path.
