# Tekrogen — Investor Pitch

*Derivative of `admin/internal/business/01.Tekrogen_BNR_Roadmap_v1.md` (v1.0, March 2026, Amended April 2026).*
*Status: Public-safe. Financial specifics (funding ask, use-of-funds, margins, pricing), dated phase timing, and platform selection are intentionally omitted — those remain Confidential in the BNR and are available in the full investor packet under NDA.*

---

## The Problem

Technical solutions are rebuilt from scratch every day — finance dashboards, SaaS integrations, workflow tools, productivity apps — because existing template marketplaces sell code without context. Buyers get a zip file and no explanation of why anything was built the way it was. Developers start over. Founders can't evaluate architecture quality. Business owners have no way to tell a good technical decision from a bad one.

The template market is a $2B+ industry (ThemeForest alone processes $1B+ lifetime), but trust is low. Buyers can't evaluate quality before purchase. Sellers compete on screenshots, not substance.

## The Solution

Tekrogen is a technology research company that sells what it builds. Every product follows the same cycle:

1. **Build** a real solution to a real problem.
2. **Document** every decision — what was chosen, what was rejected, and why — as a published use-case study.
3. **Demo** the working result as a free, interactive proof anyone can evaluate.
4. **Sell** the production-ready source code as a template.

The research IS the marketing. The documentation IS the sales funnel. The demo IS the evaluation layer. The template IS the revenue. They are not separate activities — they are one flywheel that compounds with each cycle.

## The Market

**Primary audience:** Anyone who needs a real technical solution and wants to understand the thinking behind it. Three segments:

- **Builders** — developers and engineers who implement solutions directly. They buy templates and components.
- **Technical Decision-Makers** — founders, CTOs, and leads evaluating architecture and trade-offs. They consume the research and demos to make build-vs-buy decisions.
- **Operators & Buyers** — individuals or teams seeking working solutions without building from scratch. They hire someone to deploy the template, or use the research to evaluate vendors.

Audience prioritization is market-driven: the flywheel's feedback loop determines which segments convert, not a predefined niche definition.

**Market signals:**
- Developer template purchases on platforms like ThemeForest, Creative Tim, and Tailwind UI exceed $500M annually.
- The "build in public" movement has proven that documented process drives trust and purchasing intent (Pieter Levels, Tony Dinh, Marc Lou).
- AI-assisted development is accelerating the number of people who can USE technical solutions but need expert-level architecture decisions made for them — expanding the market beyond developers alone.

**Tekrogen's wedge:** No major player combines rigorous, published research with the templates they sell. Envato sells volume without context. Tailwind UI sells design without architecture decisions. Tekrogen sells the full stack: the reasoning, the proof, and the code — and the demo that lets anyone evaluate it before buying.

## Business Model

### Revenue streams

| Stream | Model |
|---|---|
| **Modular components** (API wrappers, utilities, UI themes) | One-time purchase, digital delivery, no hosting cost. High margin. Available from the commerce phase (first sale). |
| **Full application templates** (assembled from components) | One-time purchase, assembled from components. High margin. Commerce phase onward. |
| **Hosted API tier** (managed service for buyers who don't self-host) | Subscription; deferred until source-code demand validates it and revenue can fund hosting. |

### Unit economics

- **Zero marginal cost per sale.** Source code is delivered digitally. No hosting, no support SLA, no uptime obligation.
- **Compounding catalog.** Each new product adds permanent revenue capacity. Unlike SaaS, there is no churn — templates are one-time purchases with no recurring obligation.
- **SEO compounds.** Every use-case study is a permanent search asset. Every free demo is a permanent conversion tool.

### Pricing philosophy

Free starters are genuinely free (MIT license, no email gate). Premium templates are priced to reflect the value of documented, production-ready work. No dark patterns, no bait-and-switch.

## The Flywheel

```
    Build real tool
         │
         ▼
    Document decisions ──→ SEO asset (tekrogen.org)
         │
         ▼
    Ship free demo ──────→ Conversion tool (tekrogen.studio)
         │
         ▼
    Sell template ───────→ Revenue (tekrogen.com)
         │
         ▼
    Credibility grows ───→ Next cycle starts faster
```

Each completed cycle lowers the barrier to the next. Published research builds domain authority. Demos build trust. Sales validate demand. The flywheel is self-reinforcing — the first turn is the hardest, and every subsequent turn is cheaper.

## Four-Pillar Architecture

| Pillar | Domain | Role | Investment |
|---|---|---|---|
| **1. Knowledge Base** | tekrogen.org | Research hub — published studies + internal documentation. Establishes credibility. | Low (Next.js MDX, free hosting) |
| **2. Demonstration** | tekrogen.studio | Live demos + free templates. Proves the research produces real things. | Low (Vercel free tier) |
| **3. Commerce** | tekrogen.com | Product catalog + checkout. Monetizes demand from Pillars 1--2. | Medium (auth + payments, Phase C) |
| **4. Distribution** | tekrogen.net / GitHub | Code library + versioning + delivery. Infrastructure. | Low (GitHub, Phase D+) |

**Pillars 1 and 2 are the business.** Pillars 3 and 4 are infrastructure that only matters once credibility and demand exist. This sequencing means Tekrogen can reach market with near-zero infrastructure spend.

## Execution Roadmap

| Phase | Name | Key milestone |
|---|---|---|
| **A** | Credibility Foundation | tekrogen.org live with first published articles; tekrogen.studio landing page live |
| **B** | Proof of Concept | EBIA demo live on .studio; modular component demos; multichannel distribution operational |
| **C** | Revenue Infrastructure | tekrogen.com live with checkout; first modular components for sale; EULA finalized |
| **D** | Flywheel Turn Two | Second product through the full cycle; newsletter launched; ProductHunt submission |

The architecture runs on free infrastructure tiers. The only hard costs ahead of commerce are LLC formation and EULA legal review, both prerequisites for the revenue-infrastructure phase. Phase durations and capital figures are in the full investor packet.

## Competitive Landscape

| Competitor | What they sell | What they lack |
|---|---|---|
| **ThemeForest / Envato** | Volume — 80k+ templates | No research, no documentation, race-to-bottom pricing, quality varies wildly |
| **Tailwind UI** | Design system components | No full-stack architecture decisions, no use-case studies, no free demos |
| **Creative Tim** | Dashboard templates | Pre-built UI only, no documented decision process, no modular sales |
| **Shadcn/ui** | Open-source component primitives | Not a business — no templates, no research, no commerce |
| **Build-in-public creators** (Levels, Dinh, Lou) | Personal brand + SaaS products | Sell running services, not source code; no structured research methodology |

**Tekrogen's defensible position:** The intersection of rigorous published research + working demos + purchasable source code. Competitors own one or two of these. No one owns all three tied together in a documented flywheel.

## First Product: EBIA

EBIA (personal finance dashboard) is ~75% production-ready and serves as the proof-of-concept for the entire model. It will be sold as modular components first:

| Component | Description |
|---|---|
| Plaid integration wrapper | Bank account connection with transaction sync |
| Transaction categorization engine | AI-assisted categorization with manual override |
| Cashflow projection utility | Forward-looking balance projection from transaction history |
| Themed dashboard layout | Finance-specific dashboard with charts, tables, and responsive panels |
| **Full EBIA template** | All of the above assembled into a complete application |

Each component gets its own use-case study on .org, its own demo on .studio, and its own listing on .com. The "drip" path: a developer buys one component, reads the study, tries the demo of the next, and eventually purchases the full template.

## The Ask

Tekrogen is currently self-funded by the sole founder, working part-time. The model is designed to reach first revenue with near-zero capital. Investment accelerates two things:

1. **Time to market.** A full-time commitment (or a part-time developer) compresses the part-time roadmap substantially.
2. **Catalog depth.** Each additional product expands the permanent revenue base. Investment funds the build cycle for the next products while the first product's revenue validates the model.

**Not seeking:** Infrastructure capital. The architecture is deliberately lightweight. There is nothing to host, no servers to scale, no SaaS uptime to guarantee until the hosted API tier is validated.

**Seeking:** Runway to go full-time on the first several flywheel cycles, plus legal (LLC, EULA, trademark) and design (brand polish for .studio and .com) costs.

*The runway amount, use-of-funds breakdown, and timeline are provided in the full investor packet under NDA. They are intentionally omitted from this public brief.*

## Why Now

- **AI-assisted development** is creating a new wave of developers who can build but need expert architecture decisions. The market for "decisions + code" is growing faster than the market for "code alone."
- **The "build in public" movement** has normalized selling process transparency as a product. Tekrogen industrializes this into a repeatable business model.
- **Template fatigue** is real. Buyers are tired of purchasing code they don't understand. The first company to consistently pair research with templates wins trust and repeat purchases across developers, founders, and technical buyers alike.

## Team

**Marti** — Sole founder. Full-stack developer with experience in Next.js, React, TypeScript, and infrastructure architecture. Building Tekrogen as a deliberate, research-first business where the process of building is itself the product.

---

*Tekrogen LLC · Florida · tekrogen.com*

---

## Authority & Re-sync

- **Source of truth:** `admin/internal/business/01.Tekrogen_BNR_Roadmap_v1.md` (Confidential).
- **Status:** Public-safe. Financial specifics (funding ask, use-of-funds, margins, pricing), dated phase timing, and platform selection are intentionally omitted — those remain Confidential in the BNR. Figures are available in the full investor packet under NDA.
- **Last sync:** 2026-06-02 — against BNR Amended April 2026 (Amendments 1–3 applied).
- **Re-sync trigger:** any amendment to BNR §2, §3, §4 (non-financial parts), §7 (non-financial parts), or §9 ordering.
