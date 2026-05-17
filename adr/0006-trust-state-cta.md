# ADR-0006 — Trust-state CTAs: paired-content primitive

- **Status:** Accepted
- **Date:** 2026-05-16

## Context

The Cursor analysis correctly named the failure mode: the design system currently models the *happy path*. The subscribe form fakes success and shows the toast. There are no mocks for what a paid member sees, what an entitled-download user sees, or what an anonymous reader hits when they reach a paywalled field note. When `.com` lights up commerce, the first real payment flow collides with placeholder optimism — and the brand's procedural-honesty stance breaks under load at the worst possible moment.

The cyan accent (`--tk-cyan`, used "once per surface") is the brand's CTA color. It needs to mean something consistent across the four trust states, or it means nothing.

## Decision

Tekrogen treats **paired content** (a field note + its associated artifact: template, repo, dataset) as a first-class primitive with four trust-state variants. Each variant has a defined CTA treatment.

| State                    | Reader status                              | CTA treatment                                                                                          |
|--------------------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **Anonymous**            | Not logged in, hits a free or preview note | Cyan border + cyan text on ink. Label: "Subscribe to read." Secondary text-link: "Already a member?"   |
| **Member (free)**        | Logged in, free tier                       | Cyan border + cyan text on ink. Label: "Unlock the artifact — $X." Reading is unlocked; download isn't. |
| **Paid**                 | Logged in, has paid subscription           | Solid cyan fill on ink, ink text. Label: "Download — N MB." Glow shadow on hover (`--tk-shadow-glow`). |
| **Download-entitled**    | Paid AND has already redeemed              | Outlined cyan + cyan text. Label: "Re-download." Smaller affordance — not the page's primary action.    |

State indicators:

- **Mono pill above the CTA** carries the state label: `STATE · ANONYMOUS` / `STATE · MEMBER` / `STATE · PAID` / `STATE · ENTITLED`. Uppercase mono, 11px, 0.14em tracking. Pillar-color border for the relevant entity (`.com` for commercial, `.net` for platform tools).
- **Receipt block** appears below the CTA for `paid` and `entitled` only: order ID, redemption date, license tier. Hairline border, mono content.

The full mock matrix lives in `trust-state-matrix.html`. It exists so engineers cannot ship the happy path alone — the matrix is the source of truth for what the four states look like, and the assertion that paying users see something credibly different from placeholders.

## Consequences

- New file: `trust-state-matrix.html` — visual mocks of all four states for a representative paired note.
- Existing `ui_kits/tekrogen-org/SubscribeBlock.jsx` already mocks the anonymous state; it remains canonical for that one.
- The other three are new — when commerce lights up, the implementation must match the matrix or update the matrix in the same change.

## Verification

A new pair-content page is "complete" when:

- It has at least the four trust-state variants implemented or stubbed.
- The CTA color matches the table above.
- The state pill is present and accurate.
- The receipt block is present iff state ∈ {paid, entitled}.
