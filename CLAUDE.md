# CLAUDE.md

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
yarn format       # Format all JS/TS/JSON files with Prettier
```

No test runner script is configured — Jest is set up in `package.json` but no test files exist yet.
To run tests when added: `yarn jest` or `yarn jest <file>`.

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
