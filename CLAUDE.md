# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js portfolio website with immersive 3D experiences, built as a monorepo using Turborepo and pnpm workspaces. The project uses Next.js 16 with App Router, TypeScript, Three.js for 3D graphics, and Supabase for backend services.

**Live Site**: https://roshankhatri.dev

## Essential Commands

All commands should be run from the repository root (`/workspaces/shin`):

```bash
# Development
pnpm dev          # Start all development servers (turbo dev)
pnpm build        # Build all applications (turbo build)
pnpm lint         # Run linting across all packages (turbo lint)
pnpm format       # Format code with Prettier + Tailwind plugin
pnpm type-check   # Run TypeScript type checking (turbo type-check)
pnpm clean        # Clean build outputs and node_modules
```

For working specifically with the web app (`/workspaces/shin/apps/web`):
```bash
pnpm dev          # Next.js development server (port 3000)
pnpm build        # Next.js production build
pnpm start        # Start production server
pnpm lint         # Next.js specific linting
pnpm type-check   # TypeScript checking for web app
```

## Environment Setup

Copy `apps/web/.env.example` to `apps/web/.env.local` and configure:

**Required for basic functionality:**
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase project credentials
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side database operations
- `NEXTAUTH_URL` - Your site URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`

**Optional features:**
- GitHub OAuth: `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (for Studio authentication)
- Email: `RESEND_API_KEY` / `CONTACT_EMAIL` (for contact form)
- Analytics: `NEXT_PUBLIC_POSTHOG_KEY` / `SENTRY_DSN` (monitoring)

## Architecture & Key Patterns

### Monorepo Structure
```
/workspaces/shin/
├── apps/web/           # Main Next.js portfolio application
├── content/            # MDX content files (posts, projects)
├── docs/               # Architecture and design documentation
└── packages/           # Shared packages (ui, config, types)
```

### Technology Stack
- **Framework**: Next.js 16 with App Router, React Server Components
- **React**: Version 19 (latest stable)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with cyberpunk theme + tailwindcss-animate
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Content**: MDX via Contentlayer2
- **Backend**: Supabase (Postgres + Auth + Storage)
- **Authentication**: NextAuth v5 (beta) with GitHub OAuth
- **Forms**: react-hook-form + @hookform/resolvers + Zod validation
- **Data Fetching**: @tanstack/react-query
- **Animations**: Framer Motion
- **UI Components**: Custom components with class-variance-authority + lucide-react icons

### Route Organization
- `app/` - Public pages (home, about, blog, projects, contact) using App Router
- `app/blog/[slug]/` - Dynamic blog post pages
- `app/projects/[slug]/` - Dynamic project detail pages
- `app/api/` - API route handlers
- Content served from `/content/posts/` and `/content/projects/` directories
- Loading states: `loading.tsx` files for Suspense boundaries
- Error boundaries: `error.tsx` files for error handling

### Key Configuration Files
- `apps/web/next.config.ts` - Next.js config with security headers and 3D optimizations
- `apps/web/tailwind.config.ts` - Cyberpunk theme with neon colors
- `apps/web/contentlayer.config.ts` - MDX processing configuration
- `turbo.json` - Turborepo build pipeline

### Performance Considerations
- 3D components are client-side only with SSR disabled
- Use dynamic imports with `ssr: false` for heavy 3D libraries
- Package optimization enabled for: `lucide-react`, `@react-three/fiber`, `@react-three/drei`
- Images are optimized via Next.js Image component with AVIF/WebP support
- Allowed remote image patterns: Supabase storage, CDN jsdelivr, vectorlogo.zone, iconify
- API routes have rate limiting (especially `/api/contact`)
- Edge caching for read APIs with short TTL

### Security Patterns
- All Supabase tables use Row-Level Security (RLS) policies
- Public read access to published content only
- Write operations require authentication
- Rate limiting on all write APIs
- Security headers configured in next.config.ts

### Content Management
- MDX-based content via Contentlayer2 in `/content/` directory
- **Post schema**: title, summary, cover (optional), tags, publishedAt, published flag
- **Project schema**: title, summary, cover, repoUrl/liveUrl (optional), tags, stack, metrics (JSON), dates (JSON), highlights
- Computed fields: slug (auto-generated from file path), readingTime (calculated)
- Code syntax highlighting: `one-dark-pro` theme with rehype-pretty-code
- MDX plugins: remark-gfm (GitHub Flavored Markdown), rehype-slug, rehype-autolink-headings

## Development Guidelines

### Code Conventions
- TypeScript everywhere with strict mode
- Components: PascalCase (`ProjectCard.tsx`)
- Hooks: `useX` prefix
- Utilities: camelCase exports
- Use absolute imports for shared packages, relative for local siblings
- Co-locate component + styles + tests when possible

### Testing Approach (Planned)
- Unit tests: Vitest with `.spec.ts` files co-located
- E2E tests: Playwright in `apps/web/e2e/`
- Target >70% coverage for core utilities
- Mock external services (Supabase) with lightweight stubs

### Git Workflow
- Imperative present tense commits: `Add project card grid`
- Optionally use Conventional Commits: `feat:`, `fix:`, `docs:`
- Keep PRs focused with clear purpose and screenshots for UI changes
- Update docs when architecture changes

### Important Documentation
- `docs/ARCHITECTURE.md` - Complete technical architecture
- `docs/CONTENT_MODEL.md` - Data models and database schema
- `docs/UI_DESIGN.md` - Design guidelines and cyberpunk theme
- `AGENTS.md` - Development guidelines and coding standards

## Common Development Tasks

### Adding a New Component
1. Create component in appropriate directory under `apps/web/src/components/`
2. Follow naming convention (PascalCase)
3. Use TypeScript with proper prop types
4. Apply Tailwind classes following cyberpunk theme
5. Add to exports if shared component

### Working with 3D Graphics
1. Components must be client-side only (`'use client'`)
2. Use dynamic imports with `ssr: false` for heavy 3D scenes
3. Implement fallback for devices that don't support WebGL
4. Respect `prefers-reduced-motion` media query
5. Optimize for performance (low poly count, efficient materials)

### Adding Content (Posts/Projects)
1. Create MDX file in `content/posts/` or `content/projects/`
2. Follow frontmatter schema defined in `contentlayer.config.ts`:
   - Posts: title, summary, tags[], publishedAt (date), published (boolean), cover (optional)
   - Projects: title, summary, cover, tags[], stack[], dates (JSON), repoUrl/liveUrl (optional), metrics (JSON), highlights[]
3. Slug is auto-generated from filename
4. Run `pnpm dev` to see changes (Contentlayer watches for file changes)

### API Development
1. Create route handler in `apps/web/src/app/api/`
2. Implement rate limiting for write operations
3. Use proper HTTP status codes and error responses
4. Validate input with Zod schemas
5. Follow RLS policies for database access