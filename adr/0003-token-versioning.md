# ADR-0003 — Token versioning: semver, even pre-1.0

- **Status:** Accepted
- **Date:** 2026-05-16

## Context

Tekrogen will eventually ship `@tekrogen/tokens` as an npm package consumed by `.studio`, `.com`, `.net`, and any future surface. Pre-1.0 token packages frequently break consumers because "we're pre-1.0" gets used as a license to skip the discipline of communicating breaking changes. The result: a token bump is a Russian roulette pull.

The Cursor analysis correctly noted that the `CHANGELOG.md` was "barely bootstrapped" and there was no semver discipline. Without it, the moment `.com` and `.net` start consuming tokens, the brand fragments invisibly.

## Decision

**Token versions follow semver, starting now.** The current version is `0.2.0`.

Pre-1.0 rules — tightened from the conventional "anything goes":

- **PATCH** (`0.2.0 → 0.2.1`): non-visual changes. Comments, README, file moves, sync-script bugfixes. Should never affect rendered pixels.
- **MINOR** (`0.2.0 → 0.3.0`): any visual change — pillar hex nudge, type-scale step, new token added, deprecated token removed. **Equivalent to a major in 1.0+ semantics.** Pre-1.0 minor is deliberately conservative; we communicate breaking changes as breaking changes even before 1.0.
- **MAJOR** (`0.x → 1.0.0`): "we have consumers other than this repo." Triggers the first ADR-0007 (package boundary).

Post-1.0 — conventional semver. PATCH = no visual change. MINOR = additive token, no break. MAJOR = pillar hex change, token removal, semantic re-binding.

The CHANGELOG entry for every release MUST include:

1. **Versioning intent** — patch / minor / major + which rule above applied.
2. **Pixel diff scope** — "no visual change" / "pillar hex moved by ΔE < 2" / "wing color reassigned."
3. **Migration note** — if a token is removed or renamed, the rewrite or codemod.
4. **Assets-to-regenerate** — explicit list when the SVG exception (ADR-0002) bites.

## Consequences

- `CHANGELOG.md` follows the Keep-a-Changelog format. Each release gets one header with the four sections above plus a free-form "Notes" tail.
- `package.json` ships in a future commit; for now, the version is tracked in `CHANGELOG.md` only.
- No automated release tooling yet — manual discipline. When the npm package lands, add a `release` script that refuses to publish without a CHANGELOG entry for the version it's about to ship.

## Open question

Should print-tuned pillar variants (`--tk-com-print` etc.) follow the same versioning, or do they get their own track? Current answer: same track. A print nudge that the screen palette doesn't reflect is a real visual change and should bump MINOR. Revisit if print-only consumers emerge.
