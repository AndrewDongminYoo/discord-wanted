# Quality Tooling Refresh Plan

## Work

1. Verify repository identity, instructions, current changes and Oracle precedent.
2. Refresh compatible dependency and linter versions with existing package managers.
3. Run the declared local gates and `trunk check --all --no-fix`.
4. Reconcile affected knowledge and review the scoped candidate.
5. Commit locally and prepare visible evidence before requesting publication approval.

## Declared Gates

- `yarn install --frozen-lockfile --non-interactive`
- `yarn eslint .`
- `yarn tsc --noEmit`
- `yarn jest --runInBand`
- `trunk check --all --no-fix --jobs=2`

## Local Progress

1. Repository identity and instructions are verified.
   Verify: the root is `/Volumes/dongminyu/Development/01_personal/discord-wanted` and origin is the personal `AndrewDongminYoo/discord-wanted` repository.
2. Compatible dependency versions and existing linter pins are refreshed.
   Verify: Yarn-generated `yarn.lock`, `yarn list --pattern 'brace-expansion|js-yaml|undici|qs|deepmerge' --json`, focused consumer reads, and `trunk config print`.
3. The frozen Yarn install and project checks pass.
   Verify: the frozen install leaves `yarn.lock` unchanged; ESLint and TypeScript exit zero; Jest passes the two committed suites and eight tests.
4. Scanner controls and the root-approved unpatched-advisory disposition are verified.
   Verify: the raw OSV scan fails for `deepmerge@4.3.1`; the configured scan filters that advisory only and an unrelated vulnerable Lodash fixture still fails.
   The actual TruffleHog reader fails on a synthetic GitHub token and passes after removing it, with external verification disabled and the temporary fixture removed.
5. Run the full no-fix Trunk gate when the shared machine slot is available, then review the final diff.
   Verify: `trunk check --all --no-fix --jobs=2` and `git diff --check`.

The optional whole-graph manifest helper failed on package exports and Node's builtin resolution and is not a verification gate.
Use Yarn-native graph evidence, focused actual consumers, and the declared project gates.
The root coordinator owns final review, local commits, publication approval, and later hosted checks.

## Reader Follow-up Verification

1. Verify byte identity with the independently reviewed shared reader/test and run all 17 standard-library regressions.
2. Reproduce old-reader decoded loss and actual configured encoded/literal failures plus clean success.
3. Run the full no-fix Trunk gate and observed spelling controls without expanding dictionary scope.
4. Verify exact CI-step addition and retain prior application gates only after protected inputs compare equal.

## Offline scanner resource boundary

Run `python3 -B .trunk/configs/tests/test_trufflehog_to_sarif.py` for the 17 command-line reader regressions.
Source context is limited to 1 MiB plus a sentinel byte per read and at most eight cached files.
Oversized, unreadable, binary or decoded-only findings retain file-level diagnostics instead of disappearing.
Native Trunk paths and Unicode code-point columns are preserved.
The large-source and multi-file regressions measure traced Python allocations on ASCII fixtures; they do not establish a universal process RSS or I/O timeout bound.
Malformed scanner input fails the gate, and candidate credentials are never verified with a provider.
