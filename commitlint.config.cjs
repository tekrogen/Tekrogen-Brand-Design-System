/**
 * Tekrogen commit conventions — plain Conventional Commits, NO leading emoji.
 * This is exactly what release-please parses to bump the version and build
 * CHANGELOG.md. Security fixes use `fix(security):`, dep bumps use `chore(deps):`.
 * Guide: GIT-Workflows/release-please/00.install-release-please.md
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
