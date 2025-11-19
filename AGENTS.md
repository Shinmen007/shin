# Agent Guidelines for Roshan Khatri Portfolio

## Build & Development Commands

- Install: `pnpm install`
- Dev server: `pnpm dev` (runs `turbo dev` for monorepo)
- Build: `pnpm build` (Next.js build via turbo)
- Lint: `pnpm lint` (ESLint + Next.js rules)
- Format: `pnpm format` (Prettier + Tailwind plugin)
- Type check: `pnpm type-check` (TypeScript strict mode)
- Clean: `pnpm clean` (purges outputs + node_modules)

## Code Style Guidelines

- Language: TypeScript everywhere with strict mode enabled
- Formatting: Prettier (2-space indent, double quotes, semicolons, trailing commas)
- Components: PascalCase (`ProjectCard.tsx`), Hooks: `useX`, Utils: `camelCase`
- Imports: Use absolute paths via `@/*` alias for src/ directory
- ESLint: Next.js core web vitals + TypeScript rules, warn on `any` types
- File organization: Co-locate components with styles, use `src/` structure

## Testing (Not Yet Configured)

- No test framework currently set up
- When adding tests: Use Vitest for unit tests, place `.spec.ts` files alongside code
- For E2E: Consider Playwright when needed

## Project Structure

- Monorepo with `apps/web` (Next.js portfolio)
- Content: MDX files in `content/posts/` with Contentlayer2
- Styling: Tailwind CSS with custom design system
- No Cursor/Copilot rules found in repository
