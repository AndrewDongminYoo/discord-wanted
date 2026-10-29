# Quality Tooling Refresh

<!-- cspell:words Pinact SARIF GHSA-gcqx-w48m-w2h4 -->

## Approved Scope

Refresh supported dependencies and existing quality tooling.
Preserve public APIs, generated artifacts and repository-specific boundaries.

## Acceptance

- Pinact remains locked to `4.1.1` with `lint` and `upgrade`.
- The full no-fix Trunk scan and declared project gates pass.
- Changed manifests have package-manager-generated lock files under repository policy.
- Advisory dispositions have specific evidence and affected knowledge claims are reconciled.

## Compatibility Decisions

- Refresh direct dependencies within the installed supported graph, including Axios `1.21.0`, Discord Interactions `4.4.0`, Express types `5.0.6`, and TypeScript ESLint `8.72.1`.
- Retain TypeScript `6.0.3`: TypeScript ESLint `8.72.1` requires TypeScript `>=4.8.4 <6.1.0`, and `ts-jest` `29.4.15` requires TypeScript `>=4.3 <7`.
- Remove global security resolutions that forced incompatible major versions.
  Yarn's native parent ranges resolve `brace-expansion` `2.1.7` and `5.0.12`, `js-yaml` `3.15.2`, and Serverless's exact `undici` `6.29.1` separately.
- Keep the application's `.nvmrc` at Node.js `22.23.3` and CI on Node.js 22.
  Change only Trunk's managed Node.js runtime to `24.22.1` because Renovate `44.190.2` requires Node.js `^24.11.0`.
- Update Actionlint to `1.7.12`, OSV Scanner to `2.7.0`, Renovate to `44.190.2`, and TruffleHog to `3.99.7`.
  Preserve the Trunk CLI, plugin source, Python runtime, and already-current enabled linter versions.
- Run TruffleHog with `--no-verification` and without `--only-verified` while preserving the SARIF result contract through the local filesystem reader.

## Verification Meaning

| Check | Property inspected |
| --- | --- |
| Frozen Yarn install | The manifest resolves from the committed lockfile without changing it. |
| ESLint | Configured source and test lint rules pass without automatic edits. |
| TypeScript | The project type-checks under strict mode without emitting files. |
| Jest | The committed request clients and installed dependency APIs work with offline fixtures. |
| Focused consumer reads | Both brace-expansion major lines and the YAML and Undici consumers resolve the compatible installed APIs. |
| Trunk | Applicable enabled linters run through their configured readers, including offline secret detection and the documented OSV disposition. |

Offline checks do not establish live Wanted, Saramin, or Discord acceptance, command registration, or deployment behavior.

## Unresolved Advisory

The [GitHub advisory for `GHSA-gcqx-w48m-w2h4`](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) lists `deepmerge` `>=4.2.0 <=4.3.1` as affected and has no patched version as of `2026-10-28`.
The npm registry still lists `4.3.1` as the latest release.
`yarn why deepmerge --json` reports the development dependency path `jest -> @jest/core -> jest-config -> deepmerge`.
Jest `30.5.2` is already current, and its `jest-config` dependency requests `deepmerge` `^4.3.1`.
A lower incompatible version or replacement test framework is outside this maintenance change.
Synthetic evidence confirms the package-level prototype-poisoning condition remains reachable; the reviewed repository uses trusted Jest configuration.
Any accepted scanner exception remains an unresolved development-tool risk, must name this advisory only, and must be removed when a compatible patch or parent dependency change becomes available.

## Precedent

The Oracle result for `wiki/sources/claude--rules--scoped-dependency-overrides.md` was partial and unverified at source commit `9670d54de3076c5239713f54900c7a855bd18478`.
Its compatible-major guidance was confirmed independently against the installed parent ranges and Yarn's generated graph; this led to removal of blanket resolutions rather than a major-version override.
The `wiki/concepts/authoring-time-vs-runtime-verification.md` precedent confirmed that offline checks must not be described as live provider verification.

## Publication

Push and PR creation require explicit repository-specific approval.
After approval, continue the requested hosted gates, merge, cleanup and memory recording.

## Filesystem Reader Follow-up

Use the reviewed standard-library reader and 17 CLI regressions from the shared maintenance implementation.
Include the reader in the copy sandbox through `direct_configs` and retain decoded findings at file level when a literal position is unavailable.
Keep `--no-verification --no-update`, omit secret values from SARIF messages and fail malformed input without partial clean output.
CI invokes the exact reader test file separately from the existing application checks.
Preserve application source, public contracts, package manifests, lock files, credentials, deployment paths and existing spelling scope.

## Offline scanner resource boundary

Run `python3 -B .trunk/configs/tests/test_trufflehog_to_sarif.py` for the 17 command-line reader regressions.
Source context is limited to 1 MiB plus a sentinel byte per read and at most eight cached files.
Oversized, unreadable, binary or decoded-only findings retain file-level diagnostics instead of disappearing.
Native Trunk paths and Unicode code-point columns are preserved.
The large-source and multi-file regressions measure traced Python allocations on ASCII fixtures; they do not establish a universal process RSS or I/O timeout bound.
Malformed scanner input fails the gate, and candidate credentials are never verified with a provider.
