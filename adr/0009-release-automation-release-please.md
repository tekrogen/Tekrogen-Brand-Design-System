# ADR-0009 — Release automation: release-please + enforced conventional commits

- **Status:** Accepted
- **Date:** 2026-06-11
- **Relates to:** ADR-0003 (token versioning — pre-1.0 semver). ADR-0003 fixes *how the version number is decided*; this fixes *how the release is cut*. Also reconciles stale "no package.json / no install" prose in `CLAUDE.md` (see Scope).

## Context

The repo already ships releases — tags run `v0.3.1 … v0.8.0`, each with a rich, hand-authored `CHANGELOG.md` entry whose versioning intent is governed by ADR-0003. But everything around the release was **manual**: bumping the version, writing the changelog, tagging, and creating the GitHub release were done by hand (with `npm version` / `pnpm stamp` for the version label). That is slow, easy to get out of order, and easy to forget.

Three facts make automation low-risk here:

1. **Conventional commits are already the de facto style.** `git log` shows `feat(scope): …`, `fix(scope): …`, `docs: …`, `chore(release): v0.8.0` — clean, no leading emoji. The raw material a commit-driven release tool needs is already present.
2. **The repo is already node-tooled.** It has a `package.json` (with `tokens/sync.mjs` / `version-stamp.mjs` scripts) **and** a `pnpm-lock.yaml`, so `pnpm install` already happens. The "no package.json, no lockfile" line in `CLAUDE.md`'s Dependencies section is stale.
3. **Nothing enforced the commit convention.** A sibling repo accumulated leading-emoji commits (`📝 docs: …`) that a commit-parsing release tool cannot read. Without a hook, the same drift can land here.

A cross-project library (`GIT-Workflows`) was standardized in parallel, with `release-please/` chosen as the recommended engine over the alternate `release-it/`. This ADR records adopting it **in this repo**.

## Decision

**Adopt release-please as the release engine, and enforce conventional commits with commitlint + husky.**

- **Engine — release-please (GitHub Action, manifest mode, `release-type: node`).** A merge to `main` opens/updates a standing "Release PR" that bumps the version and writes the `CHANGELOG.md` entry from the conventional commits; merging that PR tags `vX.Y.Z`, cuts the GitHub release, and commits the changelog. Files added: `.github/workflows/release-please.yml`, `release-please-config.json`, `.release-please-manifest.json` (bootstrapped at `0.8.0`).
- **Version policy — `bump-minor-pre-major: true`, `include-component-in-tag: false`.** Tags stay `vX.Y.Z`. While the repo is pre-1.0, breaking changes bump the **minor** — consistent with ADR-0003's rule that any visual change is at least MINOR pre-1.0. Features → minor; fixes → patch.
- **Commit enforcement — commitlint (`@commitlint/config-conventional`) via a husky `commit-msg` hook.** Plain `type(scope): subject`, **no leading emoji** (it breaks parsing and is rejected). Security fixes use `fix(security):`; dependency bumps use `chore(deps):` / `build(deps):` — staying inside the standard type set so no custom config is needed. Files added: `commitlint.config.cjs`, `.husky/commit-msg`; `package.json` gains a `"prepare": "husky"` script and the husky/commitlint devDependencies.
- **Human judgment stays.** release-please mechanizes the *plumbing* (tag, changelog skeleton, GitHub release). It does **not** replace ADR-0003's discipline: the author still chooses the commit types and still writes the versioning-intent / pixel-diff / migration notes into the changelog entry.

## Scope — what this does NOT change

- **The no-build stance (ADR-0002) stands.** This remains a static, browser-rendered, no-bundler design system. husky, commitlint, and release-please are **dev-time / CI tooling**, not a runtime build step — nothing new ships to the browser, and no artifact is compiled.
- **It does supersede the stale prose** in `CLAUDE.md` → *Dependencies → Tooling* that claims "No package.json, no lockfile." Both already exist; that sentence should be updated to "Node + pnpm for tooling and release automation; still no bundler."
- **`version-stamp.mjs` still owns the on-page version label**, sourced from `package.json`. After a release bumps `package.json`, run `pnpm stamp` (a future refinement could wire the stamp as a release-please `extra-files` target so it updates inside the Release PR).

## Consequences

- Contributors must run `pnpm install` once to activate the `commit-msg` hook; thereafter non-conventional commit messages are rejected locally.
- The **first** Release PR will splice generated sections into the existing hand-authored `CHANGELOG.md`; that first diff must be hand-tidied so the new section sits cleanly above the historical entries. Subsequent releases append cleanly.
- GitHub repo settings must allow Actions to create PRs (Settings → Actions → General → Workflow permissions) and default squash-merges to the PR title (so the squashed commit stays conventional).
- The reusable how-to lives in `GIT-Workflows/release-please/`; this ADR is the repo-specific record of adoption and the pre-1.0 bump policy.

## Verification

- The five files exist and parse: `release-please-config.json`, `.release-please-manifest.json` (`{".":"0.8.0"}`), `.github/workflows/release-please.yml`, `commitlint.config.cjs`, `.husky/commit-msg` (executable). `package.json` has `prepare: husky` + the three devDependencies.
- `git commit -m "bad message"` is rejected by commitlint; `git commit -m "feat: x"` is accepted.
- After `pnpm install` and a push to `main`, release-please opens a Release PR proposing the next version from the commits since `v0.8.0`.
