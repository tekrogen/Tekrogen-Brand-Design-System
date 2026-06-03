# TEKROGEN — Public Brief v1

*Derivative of `Tekrogen_BNR_Roadmap_v1.md` (v1.0, March 2026, Amended April 2026).*
*Purpose: publication-safe reference for brand voice, positioning, and mission. Safe to ingest into tooling (Agentic OS, publishing pipelines, LLM context) without leaking operational, financial, or temporal strategy.*
*Status: Public-safe. BNR remains Confidential. This brief must re-sync whenever the BNR is amended.*

---

## 1. What Tekrogen Does

> Tekrogen is a technology research and development business focused on SaaS evaluation, AI-driven analysis, and rigorous tech ratings. Tekrogen builds and documents real technical solutions to real problems, then packages those solutions so others can adopt, adapt, or deploy them without starting from scratch.

*[Kept verbatim from BNR §1 + §2.1 mission statement.]*

---

## 2. Mission & Niche

### 2.1 Mission

> Tekrogen builds and documents real technical solutions to real problems, then packages those solutions so others can adopt, adapt, or deploy them without starting from scratch.

### 2.2 Niche

Tekrogen serves anyone who needs a real technical solution and wants to understand the thinking behind it — whether they're building it themselves, hiring someone to build it, or evaluating a build-vs-buy decision.

This includes developers who want production-ready starting points, technical founders evaluating architecture decisions, and business owners seeking honest guidance on solving a technology problem.

Every solution originates from a real use case, built and used in practice, then documented as a transparent case study — not designed to sell, but packaged because it works.

### 2.3 Differentiator

This is not another template marketplace, and it's not a consulting firm. The position Tekrogen defends is:

> *"We built this. Here is exactly why we made every decision. Here is the research if you want to learn from it. Here is the template if you want to start where we finished."*

The content is the proof of the template. The template is the deliverable of the research. The demos are how anyone — technical or not — can evaluate whether the solution fits their problem. They are all expressions of the same work, not separate products.

### 2.4 Audience Model

Tekrogen does not define its audience by role, but by **relationship to the problem being solved**.

Core audience segments:

- **Builders** — developers and engineers who will implement the solution directly
- **Technical Decision-Makers** — founders, CTOs, and leads evaluating architecture and trade-offs
- **Operators & Buyers** — individuals or teams seeking a working solution without building from scratch

All segments enter the flywheel at different points (research, demo, or product), but engage with the same underlying system: real solutions derived from real use cases.

Audience prioritization is not predefined — it is determined by market response to published research, demos, and product demand.

*[Kept verbatim from BNR §2.1–§2.4.]*

---

## 3. The Business Flywheel

The Tekrogen business model is a compounding loop in which every phase produces the inputs for the next. This is not a pipeline — it is a flywheel.

1. Build a real tool to solve a real problem.
2. Document the tooling decisions, stack trade-offs, and infrastructure choices as a use-case study on tekrogen.org.
3. Publish a free starter or demo that corresponds to the study on tekrogen.studio.
4. Sell the production-ready template on tekrogen.com.
5. Each completed cycle establishes credibility that lowers the barrier to the next cycle.

> *The flywheel accelerates because each published study is also an SEO asset, each free demo is a conversion tool, and each paid template is proof that the research produces real deliverables.*

**Modular product strategy.** Products are not sold exclusively as monolithic applications. Each application (e.g., EBIA) is composed of modular components — utilities, API wrappers, UI themes, domain-specific libraries — that are individually documented, demoed, and sold. Each component follows the full flywheel cycle independently. This creates multiple revenue touchpoints per application, lower purchase barriers, and a "drip" path from individual components to the full product.

*[Kept verbatim from BNR §3.]*

---

## 4. The Four Domains (Governing Pillars)

Each Tekrogen domain serves a distinct role in the business model. The four domains form a four-pillar business model with explicit dependency ordering: Pillars 1 (org) and 2 (studio) are the business — they establish credibility and demonstrate capability. Pillars 3 (com) and 4 (net) are infrastructure that only matters once Pillars 1 and 2 are working.

| Domain | Purpose | Content Type |
|---|---|---|
| **tekrogen.org** | **Knowledge Base & Research Hub** — Published use-case studies, SaaS evaluations, tech ratings, and architecture breakdowns. The credibility layer. | Use-case studies, SaaS evaluations, tech ratings, architecture breakdowns. |
| **tekrogen.studio** | **Demonstration & Showcase** — Project demonstration site, landing pages, free template showcases, interactive previews. The "proof" layer that makes .org research tangible. | Free demos, starter templates, live previews, brand showcase. |
| **tekrogen.com** | **Product Marketing & Commerce** — Product listings, buyer experience, license delivery. E-commerce platform for source code templates and modular components. | Paid template library, modular component catalog, buyer dashboard. |
| **tekrogen.net** | **Code Library & Distribution** — Versioned code library, product builds, GitHub repo organization, release pipeline. Source code packaging and delivery infrastructure. | Product builds, versioned packages, release artifacts. |

**Anti-corruption principle.** Cross-domain integration follows the anti-corruption pattern: domains communicate via published APIs or shared packages, never via direct database access or internal imports across site boundaries. Each domain translates external data into its own domain model at the boundary.

*[From BNR §4. Stripped: infrastructure cost reasoning, "zero-budget stage" posture, registrar choices, platform evaluation specifics, freeCodeCamp layer details — all operational and some revealing financial position.]*

---

## 5. Content Strategy — tekrogen.org

### 5.1 Content Philosophy

tekrogen.org is Tekrogen's credibility infrastructure. It is where the rigor of the work is demonstrated publicly. A developer evaluating whether to spend money on a template needs to believe Tekrogen actually understands what they're building. The research content is the proof.

tekrogen.org serves two audiences through a single governed system:

- **Internal:** Specifications, architecture decisions, roadmaps, planning documents, chat archives, vendor evaluations, process documentation. Never published externally but versioned with the same rigor as published content.
- **External:** Use-case studies, SaaS evaluations, tech ratings, architecture breakdowns. The subset of .org content selected for publication and adapted for distribution.

The internal documentation IS the credibility. The process of building Tekrogen — documented methodically — is itself demonstrable expertise that feeds the published content.

### 5.2 Article Structure

Every use-case study follows the same structure to establish a recognizable, trustworthy format:

- **The Problem** — what specific pain point motivated the build, stated honestly.
- **The Stack Decision** — what was chosen, what was evaluated and rejected, and why.
- **Key Trade-offs** — a direct table: decision, benefit, cost. No sanitization.
- **The Build** — architecture decisions, package structure, key engineering choices.
- **What We'd Do Differently** — honest retrospective. This section is what builds trust.
- **The Outcome** — what was built, what it does, what it does not do.
- **CTA** — links to the free demo on .studio and the paid template on .com.

### 5.3 Content Tone

Written for a technically literate reader — from experienced developers to technical decision-makers — who need to understand real trade-offs, not simplified explanations. The content assumes the reader is capable of making or influencing implementation decisions, even if they are not writing the code themselves. Respect the reader's time and expertise.

*[Kept verbatim from BNR §5.1–§5.3.]*

---

## 6. Distribution Approach

tekrogen.org is the canonical source for all content. Every channel links back to the full study. The distribution strategy is not about producing different content for each channel — it is about adapting the presentation of the same canonical content to each channel's format and audience.

Channels and their audiences:

| Channel | Audience | Content Format |
|---|---|---|
| tekrogen.org | Organic / SEO | Full case study (canonical source) |
| Hashnode | Developer community | Cross-post |
| ProductHunt | Builders and early adopters | Launch post per template |
| Dev.to | Developer generalists | Condensed study excerpt |
| LinkedIn | Technical founders, CTOs | Decision summary + link |
| Discord (AI-adjacent communities) | Builder communities | Conversational update + link |
| Newsletter | Opted-in audience | Digest: study + demo + template |

> *ProductHunt is not treated as a vanity metric. It is a demand validation signal.*

*[From BNR §6.1. "Strategic Role" column stripped — reveals go-to-market sequencing. Full per-launch workflow stripped — operational.]*

---

## 7. Ethics & Governance (Voice Principles)

Tekrogen's credibility is its business. The following principles are not aspirational — they are operational commitments that govern every content, product, and business decision. They shape voice directly.

| Principle | Commitment |
|---|---|
| **Build first, sell second** | Every template sold was built to solve a real problem for real use. No template is designed to sell — it is designed to work, then packaged to sell. |
| **Honest trade-off documentation** | Every use-case study documents what was done and why, including what failed or what we'd do differently. No retrospective is sanitized for marketing purposes. |
| **Clear licensing terms** | Buyers receive a complete, plain-language license at point of purchase. License tiers are clearly differentiated. No dark patterns around what is and is not permitted. |
| **AI use transparency** | Tekrogen uses AI tools in research and development. This is disclosed. AI-generated content is reviewed and validated by a human before publication. |
| **Data minimization** | Tekrogen collects only what is necessary to complete a transaction and deliver a license. No behavioral data sold or shared with third parties. |
| **Accessible pricing** | Free starters and demos are genuinely free, no email gate. Premium pricing reflects the value of real, documented, production-ready work. |

*[Kept verbatim from BNR §8.]*

---

## 8. Phase Priority (Current)

Credibility comes before proof. Proof comes before commerce. Commerce comes before distribution infrastructure.

The current priority is **establishing credibility via published research on tekrogen.org** before building demos, commerce, or distribution infrastructure. This ordering is deliberate: published research is the foundation of trust, and everything downstream assumes that trust exists.

*[From BNR §9 dependency logic. Phase names, timelines, dated deliverables, and success signals stripped — all temporally competitive.]*

---

## 9. Visual Identity & Brand System

Tekrogen's visual identity reinforces the Four Pillars architecture as a verbal-visual anchor. The brand mark is the **geometric dragonfly** (v1): four wings for four pillars, one spine for the flywheel.

### Brand Narrative

> **Four wings. Four pillars. One spine.**
>
> The dragonfly's four wings map one-to-one to the Four Pillars architecture (BNR §4). Dragonflies are precision-built fliers with compound eyes — multi-directional awareness, rigorous perspective. That's the Tekrogen thesis.
>
> - **Upper pair (blue)** = the credibility/knowledge layer (.org + .studio)
> - **Lower pair (teal/mint)** = the output/infrastructure layer (.com + .net)
> - **Body** = the flywheel connecting all four, driving the compounding loop

### Four Pillars Color System

| Wing | Color | Hex | Domain |
|---|---|---|---|
| Upper-left | Primary 500 | `#446e88` | `.org` — Knowledge Base |
| Upper-right | Primary 300 | `#6491ac` | `.studio` — Demos |
| Lower-left | Accent 500 | `#0db4b9` | `.com` — Commerce |
| Lower-right | Mint | `#7edba5` | `.net` — Code Library |
| Body/spine | Primary 900 | `#1f2d3d` | The flywheel |

### Canonical Asset References

- **Brand assets (SVG masters, lockups, icons, favicon, OG cards):** `assets/`
- **Type system, palette, and design tokens:** `colors_and_type.css` and `tokens/` — `tokens/palette.js` is the single source of truth for pillar/surface hexes.
- **Brand narrative, voice, and full visual spec:** `README.md` (see "VISUAL FOUNDATIONS").
- **Mark exploration (7 concept directions):** `ui_kits/mark-explorations/` and `ui_kits/_shared/marks.jsx`.

*[Brand narrative and color system summarized from this repo's `README.md` and `colors_and_type.css`. Full asset inventory lives under `assets/`.]*

---

## What This Brief Omits (and Why)

For the record, so anyone ingesting this brief knows what is intentionally excluded:

| BNR Section | Omitted | Reason |
|---|---|---|
| §7 Revenue Model | License tier details, pricing, platform selection, hosted-API decision | Competitive / financial |
| §9 Phase Roadmap | Phase timing, dated deliverables, success signals, supporting-pillar details | Temporally competitive |
| §10 Open Decisions | All unresolved deliberations | Reveals internal indecision |
| §4 Infrastructure Principles | "Zero-budget stage" posture, cost reasoning, registrar choices | Reveals financial position |
| §6.2 Distribution Workflow | Per-launch operational sequence | Operational playbook |
| §5.4 Publishing Pipeline | Automation timeline, platform-specific API plans | Operational |
| Vendor evaluations | All named vendor comparisons | Competitive |

---

## Authority & Re-sync

- **Source of truth:** `admin/internal/business/01.Tekrogen_BNR_Roadmap_v1.md` (Confidential).
- **Re-sync trigger:** any amendment to BNR §1, §2, §3, §4 (non-financial parts), §5, §6.1 channel list, or §8.
- **Last sync:** 2026-06-02 — re-verified against BNR Amended April 2026 (Amendments 1–3 applied); no new BNR amendment since.
- **Safe to ingest into:** Agentic OS `brand_context/`, publishing pipelines, LLM context for tekrogen.org article writing, external-facing about/press pages, investor-safe summaries.
- **Not safe for:** pricing pages, phase-timing statements, platform commitments until BNR §7/§9/§10 are resolved.