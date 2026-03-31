# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript Discord bot deployed with Serverless to AWS Lambda. `app.ts` is the main interaction handler, `commands.ts` registers slash commands, and `src/utils.ts` contains shared Discord API helpers. Job-board integrations live in `wanted/` and `jumpit/`; each folder owns its fetch logic, display model, and type definitions. Keep new source files close to the provider or feature they belong to instead of growing `app.ts`.

## Build, Test, and Development Commands

- `yarn dev` runs the bot locally with `serverless-offline` on port `3000`.
- `yarn register` registers slash commands with Discord using `commands.ts`.
- `yarn lint` runs ESLint with `--fix` and should be used before opening a PR.
- `yarn format` applies Prettier to `*.js`, `*.ts`, `*.mjs`, and `*.json`.
- `yarn jest` runs tests once they are added; Jest is already configured in `package.json`.
- `yarn tsc --noEmit` is the safest type-check before deploy.
- `yarn deploy` publishes the Lambda, and `yarn logs` tails the deployed function logs.

## Coding Style & Naming Conventions

Use 2-space indentation, single quotes, semicolons, trailing commas, and a 100-character line width. Follow the flat ESLint config in `eslint.config.mjs`; TypeScript runs in `strict` mode. Prefer inline `type` imports, keep imports sorted, and name files in lowercase kebab or concise feature form such as `job-info-display.ts` or `skill-tags.ts`. Match existing provider APIs: fetchers in `index.ts`, data shapes in `types/`, and formatting helpers near the consumer.

## Testing Guidelines

No committed tests exist yet, but Jest with `ts-jest` is configured and looks for `*.test.ts`. Add tests next to the code they verify or in a nearby `__tests__/` folder. Cover URL builders, tag mapping, and Discord response formatting before touching deploy logic. Run `yarn jest` and `yarn tsc --noEmit` before submission.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit types with gitmoji, for example `feat: ✨ implement discord command validation` and `refactor: ♻️ simplify eslint configuration`. Keep that format and write imperative subjects. PRs should explain the affected command flow, list verification commands, link related issues, and include screenshots or sample Discord payloads when the user-facing response changes.

## Security & Configuration Tips

Required secrets include `PUBLIC_KEY`, `APPLICATION_ID`, and `DISCORD_TOKEN`. Never commit credentials or raw API responses containing sensitive headers. Validate new environment variables in `serverless.yml` and document them in `README.md` and this guide when added.
