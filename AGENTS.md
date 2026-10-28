# Repository Guidelines

<!-- cspell:words SARIF GHSA-gcqx-w48m-w2h4 -->

## Project Structure & Module Organization

This repository is a TypeScript Discord bot deployed with Serverless to AWS Lambda. `app.ts` is the main interaction handler, `commands.ts` registers slash commands, and `src/utils.ts` contains shared Discord API helpers. Job-board integrations live in `wanted/` and `jumpit/`; each folder owns its fetch logic, display model, and type definitions. Keep new source files close to the provider or feature they belong to instead of growing `app.ts`.

## Build, Test, and Development Commands

- `yarn dev` runs the bot locally with `serverless-offline` on port `3000`.
- `yarn register` registers slash commands with Discord using `commands.ts`.
- `yarn lint` runs ESLint with `--fix` and should be used before opening a PR.
- `yarn format` applies Prettier to `*.js`, `*.ts`, `*.mjs`, and `*.json`.
- `yarn eslint .` checks ESLint without changing files and matches CI.
- `yarn jest --runInBand` runs the committed offline request-client and dependency-consumer tests.
- `yarn tsc --noEmit` is the safest type-check before deploy.
- `yarn deploy` publishes the Lambda, and `yarn logs` tails the deployed function logs.

## Coding Style & Naming Conventions

Use 2-space indentation, single quotes, semicolons, trailing commas, and a 100-character line width. Follow the flat ESLint config in `eslint.config.mjs`; TypeScript runs in `strict` mode. Prefer inline `type` imports, keep imports sorted, and name files in lowercase kebab or concise feature form such as `job-info-display.ts` or `skill-tags.ts`. Match existing provider APIs: fetchers in `index.ts`, data shapes in `types/`, and formatting helpers near the consumer.

## Testing Guidelines

Run `python3 -B .trunk/configs/tests/test_trufflehog_to_sarif.py` for ten standard-library filesystem-reader regressions.
The local reader retains decoded findings at file level when no literal location exists and omits secret values from SARIF messages.

Jest with `ts-jest` runs the committed `src/request-clients.test.ts` and `src/dependency-consumers.test.ts` suites and looks for `*.test.ts`.
The request-client suite uses an in-memory Axios adapter and mocks dotenv loading; the consumer suite reads synthetic YAML and uses Undici's network-disabled mock dispatcher.
These tests check request construction, result mapping, transport failures, and installed dependency APIs without contacting Wanted, Saramin, or Discord.
They do not verify live provider acceptance or deployment behavior.
Add tests next to the code they verify or in a nearby `__tests__/` folder.
Run `yarn eslint .`, `yarn tsc --noEmit`, and `yarn jest --runInBand` before submission.

## Toolchain

Use Node.js `22.23.3` from `.nvmrc` and Yarn Classic `1.22.22`, matching the CI package-manager setup.
Generate dependency changes with Yarn, then verify `yarn install --frozen-lockfile --non-interactive`.
Keep TypeScript on the supported `6.0.3` line while `typescript-eslint` requires TypeScript below `6.1.0` and `ts-jest` requires TypeScript below `7`.
Run `trunk check --all --no-fix --jobs=2` for the complete configured quality gate.
Trunk uses its own Node.js `24.22.1` runtime because Renovate `44.190.2` requires Node.js `^24.11.0`; the application and CI remain on Node.js 22.
TruffleHog scans offline with `--no-verification --no-update`; preserve its SARIF result contract and do not add `--only-verified`, which would hide unverified offline findings.
`osv-scanner.toml` records the unresolved `GHSA-gcqx-w48m-w2h4` advisory in Jest's development-only `deepmerge@4.3.1` dependency.
Re-evaluate that exception when a patch, parent dependency, or consumer scope changes; a configured scanner pass does not mean the package is fixed.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit types with gitmoji, for example `feat: ✨ implement discord command validation` and `refactor: ♻️ simplify eslint configuration`. Keep that format and write imperative subjects. PRs should explain the affected command flow, list verification commands, link related issues, and include screenshots or sample Discord payloads when the user-facing response changes.

## Security & Configuration Tips

Required secrets include `PUBLIC_KEY`, `APPLICATION_ID`, and `DISCORD_TOKEN`. Never commit credentials or raw API responses containing sensitive headers. Validate new environment variables in `serverless.yml` and document them in `README.md` and this guide when added.
