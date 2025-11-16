# Repository Guidelines

Welcome. This document orients human contributors and AI agents working in this repo.

## Project Structure & Organization
- Root: `README.md`, `docs/` (architecture, plan, content model, design). Treat `docs/` as authoritative for product/domain decisions.
- Monorepo lives in `portfolio/` (pnpm + Turborepo). Workspaces: `apps/*`, `packages/*`.
- Expected (per architecture docs): `apps/web`, optional `apps/admin`. Shared code in `packages/ui`, `packages/config`, `packages/types`.
- Add MDX/content under a future `content/` directory inside `apps/web` (e.g., `content/projects/*.mdx`, `content/posts/*.mdx`).

## Build, Dev, and Utility Commands (run inside `portfolio/`)
- Install: `pnpm install`
- Dev (all apps): `pnpm dev` (runs `turbo dev`).
- Build: `pnpm build` (caches per Turborepo task graph).
- Lint: `pnpm lint`
- Format: `pnpm format` (Prettier + Tailwind plugin).
- Type check: `pnpm type-check`
- Clean: `pnpm clean` (purges outputs + `node_modules`).

## Coding Style & Conventions
- Language: TypeScript everywhere.
- Formatting: Prettier (2‑space indent, double quotes, trailing commas). Do not hand‑edit formatting; run `pnpm format`.
- Imports: use absolute (via TS config paths) for shared packages; relative for local module siblings.
- Components: PascalCase (`ProjectCard.tsx`). Hooks: `useX`. Utility modules: `camelCase` exports.
- Avoid large multifunction files; co-locate component + styles + tests.

## Testing Guidelines (planned)
- Unit: Vitest; place in same folder as code (`Component.spec.tsx`) or `__tests__/` sibling. Name with `.spec.ts` or `.test.ts`.
- E2E: Playwright in `e2e/` at app root (`apps/web/e2e/home.spec.ts`).
- Prefer fast unit tests over broad integration. Mock external services (Supabase) with lightweight stubs.
- Aim for critical path coverage (routing, data transforms, forms). Target >70% for core utils; do not chase 100%.

## Commit & Pull Request Guidelines
- Commits: imperative present tense, concise: `Add project card grid`, `Refactor MDX loader`. Group related changes; avoid monolithic "misc" commits.
- Optionally follow Conventional Commits types (`feat:`, `fix:`, `docs:`) for clarity.
- PRs: include purpose, key changes, any follow‑ups, and screenshots for UI/UX changes. Link issue/ticket if exists.
- Keep diffs focused; update docs when architecture or content model shifts.

## Security & Configuration Notes
- Do not commit secrets; keep environment variables in `.env` (git‑ignored) and document required keys in a future `docs/ENV.md`.
- Follow RLS guidance in `docs/ARCHITECTURE.md` for data access; never bypass policies in client code.

## Agent-Specific Instructions
- When modifying code, respect these conventions and update this file if rules change.
- Prefer minimal diffs and avoid speculative refactors.
- Cross‑check decisions against `docs/ARCHITECTURE.md` & `docs/CONTENT_MODEL.md` before introducing new models.

