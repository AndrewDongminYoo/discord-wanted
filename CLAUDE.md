# CLAUDE.md

<!-- cspell:words SARIF GHSA-gcqx-w48m-w2h4 -->

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Discord bot that fetches and displays job listings from Korean job boards (Wanted.co.kr and Saramin/JumpIt) as Discord slash commands.
Deployed as an AWS Lambda function via the Serverless Framework.

## Commands

```bash
yarn dev          # Run locally with serverless-offline (port 3000)
yarn register     # Register slash commands with Discord API (tsx commands.ts)
yarn deploy       # Deploy to AWS Lambda
yarn logs         # Tail Lambda function logs
yarn lint         # Lint and auto-fix with ESLint
yarn eslint .     # Check ESLint without changing files (CI)
yarn tsc --noEmit # Check TypeScript without emitting files
yarn jest --runInBand # Run the committed offline test suites
yarn format       # Format all JS/TS/JSON files with Prettier
```

Jest is configured in `package.json`; invoke it directly with `yarn jest --runInBand`.
`src/request-clients.test.ts` mocks dotenv and uses an in-memory Axios adapter to check request construction, mappings, and transport failures.
`src/dependency-consumers.test.ts` checks the Istanbul YAML loader and Serverless's installed Undici API with synthetic fixtures and a network-disabled dispatcher.
These offline checks do not verify live provider acceptance, command registration, or deployment behavior.

Use Node.js `22.23.3` from `.nvmrc` and Yarn Classic `1.22.22`, matching the CI package-manager setup.
After dependency changes, verify `yarn install --frozen-lockfile --non-interactive` and the three CI checks above.
TypeScript stays on `6.0.3` because the current `typescript-eslint` peer range is below `6.1.0` and `ts-jest` requires a version below `7`.
Run `trunk check --all --no-fix --jobs=2` for the full configured quality gate.
Trunk manages Node.js `24.22.1` for Renovate `44.190.2`, whose engine range is `^24.11.0`; the application and CI stay on Node.js 22.
TruffleHog uses `--no-verification` to keep secret detection offline; its JSON-to-SARIF parser must continue reporting unverified findings.
`osv-scanner.toml` accepts the unpatched `GHSA-gcqx-w48m-w2h4` advisory only for the reviewed Jest development dependency on `deepmerge@4.3.1`.
The risk remains unresolved and must be re-evaluated when a patch, parent dependency, or consumer scope changes.


Run `python3 -B .trunk/configs/tests/test_trufflehog_to_sarif.py` for 17 standard-library filesystem-reader regressions.
The local reader retains decoded findings at file level when no literal location exists and omits secret values from SARIF messages.

## Required Environment Variables

```env
PUBLIC_KEY=        # Discord public key for request signature verification
APPLICATION_ID=    # Discord application/bot ID
DISCORD_TOKEN=     # Discord bot token
```

## Architecture

### **Request flow:**

```log
Discord → POST /interactions → verifyKeyMiddleware (Ed25519 signature check)
       → Express handler in app.ts → command router
       → fetchJobs() or fetchSaraminJobs() → external job board API
       → Discord embed response
```

### **Key files:**

- `app.ts` — Express server, interaction handler, command routing, embed formatting
- `commands.ts` — Discord slash command definitions (run once to register with Discord)
- `src/utils.ts` — Discord API request helper (`DiscordRequest`), command installer (`InstallGlobalCommands`), emoji utility
- `i-job-info-display.ts` — Abstract base class `IJobInfoDisplay` that both job sources implement

### **Job board integrations:**

- `wanted/` — Wanted.co.kr integration: `index.ts` (fetch), `job-info-display.ts` (model), `types/` (API response types, user enums)
- `jumpit/` — Saramin/JumpIt integration: same structure as `wanted/`

Each integration has its own `JobInfoDisplay` class extending `IJobInfoDisplay`, and tag/location mapping files that translate numeric IDs to human-readable strings.

## Code Conventions

- **Formatter**: Prettier — 100 char line width, 2-space indent, single quotes, trailing commas
- **Linter**: ESLint flat config (`eslint.config.mjs`) with `typescript-eslint` and `simple-import-sort`; no `any`, no `var`, max 7 function params
- **Imports**: Sorted by `simple-import-sort` — fix with `eslint --fix`
- **TypeScript**: Strict mode, `ES2018` target, `CommonJS` modules

## Deployment

Runs on AWS Lambda (Node.js 22.x, `ap-northeast-2` region) behind HTTP API Gateway.
`serverless-http` wraps the Express app as a Lambda handler.
The `serverless.yml` sets `NODE_ENV=production` automatically.
