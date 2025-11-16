# RK Digital Experience Portfolio - Architecture

## 1. High-Level Overview

The portfolio is a Next.js application deployed on Vercel with Supabase as the backend (Postgres + Auth + Storage). It uses MDX for content (projects and posts) and a small admin-lite studio to edit content and manage messages.

- **Frontend:** Next.js (App Router, Server Components, React 18), TypeScript.
- **Backend:** Next.js Route Handlers + Supabase (Postgres, Edge Functions optional).
- **Content:** MDX via Contentlayer.
- **Infra:** Vercel (deployments, edge functions), Supabase (DB, auth, storage).
- **Analytics & Monitoring:** Plausible or PostHog; Sentry.

---

## 2. Technology Stack

### 2.1 Framework & Runtime

- Next.js with App Router (`app/` directory).
- React Server Components where possible, Client Components for interactive parts (3D, forms).
- Server Actions for certain mutations where helpful.

### 2.2 Language & Tooling

- TypeScript end-to-end.
- Linting via ESLint.
- Formatting via Prettier or Biome.
- Unit testing with Vitest; E2E with Playwright.
- Monorepo managed by Turborepo; package manager `pnpm`.

### 2.3 UI & Motion

- Tailwind CSS for utility-first styling.
- shadcn/ui for headless, accessible UI components.
- Radix UI primitives for dialogs, menus, etc.
- Framer Motion for micro-interactions.
- Three.js + @react-three/fiber + drei for 3D hero scene.

### 2.4 Data & Content

- Supabase for:
  - Postgres database.
  - Auth (OAuth providers + email).
  - Storage (media uploads).
- RLS (Row-Level Security) policies on all tables.
- MDX via Contentlayer for:
  - Project case study bodies.
  - Blog posts.

### 2.5 Analytics & Monitoring

- Plausible or PostHog for privacy-friendly analytics.
- Sentry for error tracking on client and server.

---

## 3. Monorepo Structure

```text
apps/
  web/        # Public site (pages, APIs, OG routes, /studio)
  admin/      # Optional separate admin app (may be skipped in MVP)

packages/
  ui/         # Shared UI components (buttons, cards, layout, etc.)
  config/     # Shared ESLint, TSConfig, Tailwind config
  types/      # Shared TypeScript types and Zod schemas
```

**Note:** MVP can keep `/studio` inside `apps/web` and skip `apps/admin` if not needed.

---

## 4. Web App Architecture (`apps/web`)

### 4.1 Route Layout

- Route organization:
  - Use route groups to separate marketing and studio:
    - `app/(marketing)/...` for public pages.
    - `app/(studio)/studio/...` for authenticated admin routes.
  - Code-splitting:
    - 3D components and heavy libraries are imported as client components and only on routes that require them.
    - Use dynamic imports (`next/dynamic`) for 3D hero and optional heavy UI, with SSR disabled for 3D where necessary.

- Layouts:
  - `app/layout.tsx` - root layout with theme provider, header, footer, analytics.
  - `app/(marketing)/layout.tsx` - shared layout for public routes.
  - `app/(studio)/studio/layout.tsx` - authenticated layout for admin-lite.

- Routes:
  - `/` - home.
  - `/projects`, `/projects/[slug]`.
  - `/blog`, `/blog/[slug]`.
  - `/about`.
  - `/contact`.
  - `/studio` and subroutes (projects, posts, messages).
  - `/api/*` - route handlers.
  - `/sitemap.xml`, `/robots.txt`, `/rss.xml`, etc.

### 4.2 Components

- Layout components: Header, Footer, Layout wrappers.
- Shared: Button, Card, Badge, Tag, Avatar, Input, Textarea, Select, Modal, Timeline.
- Hero: 3D Canvas wrapper, motion text, call-to-action section.
- Project & Post: Cards, detail sections, MDX renderer.
- Forms: Contact form, project/post forms (in studio).

---

## 5. Backend & Data Layer

### 5.1 Database (Supabase/Postgres)

Core tables (detailed in CONTENT_MODEL.md):

- `projects`
- `posts`
- `skills`
- `testimonials`
- `messages`
- `users` (auth)
- Optional: `events` for analytics or audit logs.

Design:

- Use normalized schema with junction tables where needed (e.g., `project_skills`).
- Store MDX content either in files (for public content) or in DB (for admin-edited content), or a hybrid approach.

### 5.3 Hybrid Content Model

- Public content (published case studies and posts) lives primarily as MDX files under `content/projects` and `content/posts`.
- The database stores:
  - Slug and metadata (for querying/filtering from API).
  - A reference to the MDX file or a copy of the body for editing.
- Synchronization strategy (MVP):
  - /studio edits metadata in DB only; MDX content is still updated manually in the repo.
  - Future: add a `body` column and use DB as the source of truth for edited posts.


### 5.2 RLS & Security

- Enable RLS on all tables.
- Public read policies:
  - `projects`: only published projects.
  - `posts`: only published posts.
- Write policies:
  - Only authenticated admin user(s) can modify projects/posts.
  - `messages` table: insert allowed via service key / server-side API; not directly from client.

---

## 6. API Design

### 6.3 Rate Limiting & Edge

- All write APIs (especially `/api/contact`) run on the Edge Runtime with:
  - A simple IP + path based rate limiter (e.g., 3 requests / 5 minutes / IP).
  - Fallback to blocking the request with a structured error response.
- Read APIs (`/api/projects`, `/api/posts`) can be cached at the edge with a short TTL (e.g., 60s) and `stale-while-revalidate` where supported.


### 6.1 Route Handlers

- `/api/projects`:
  - GET (list projects).
  - Optional filter parameters (tag, featured).
- `/api/projects/[slug]`:
  - GET (single project).
- `/api/posts` and `/api/posts/[slug]` similarly.
- `/api/contact`:
  - POST (create message).
  - Validates payload, checks rate limit, inserts into DB, triggers email.
- `/api/resume`:
  - GET JSON resume structure.
- `/api/og`:
  - GET; accepts slug and type, returns dynamically rendered OG image.

### 6.2 Authentication & Sessions

- Auth.js integration:
  - OAuth (GitHub, Google) and/or email OTP.
  - Store session in secure cookies.
- Protect `/studio` and admin APIs:
  - Middleware or server actions checking session.
  - Role/claims from Supabase or Auth.js callback.

---

## 7. 3D & Performance Considerations

- Keep 3D scene minimal:
  - Low polygon count.
  - Optimize materials and textures.
  - Pause animation on tab blur.
- Fallback:
  - Static image or simplified hero for older/weak devices.
  - Respect `prefers-reduced-motion`.
- Render 3D client-side only, with SSR friendly shell to avoid hydration issues.

---

## 8. Deployment & Environments

### 8.1 Environments

- `development` - local:
  - Local Next dev server.
  - Supabase local or remote dev project.
- `staging` - preview deployments for feature branches.
- `production` - main branch on Vercel.

### 8.2 CI/CD

- GitHub Actions:
  - Lint and test on PRs.
  - Build checks.
- Vercel:
  - Preview deployments per branch.
  - Production deployment on merge to main.

### 8.3 Environment Variables

- Next/Vercel:
  - SUPABASE_URL, SUPABASE_ANON_KEY (client).
  - SUPABASE_SERVICE_ROLE_KEY (server only).
  - AUTH_SECRET, provider secrets.
  - Analytics keys.
- All secrets stored securely and not exposed to client bundles unnecessarily.

---

## 9. Observability

- Sentry:
  - Client and server SDK initialized.
  - Important errors annotated with context (user ID, route).
- Analytics:
  - Event tracking for key user actions.
  - Simple dashboard in Plausible/PostHog.


## 10. Client State Management

- Prefer React Server Components for data fetching wherever possible.
- Use TanStack Query only where live client re-fetching or optimistic mutations are needed (e.g., filters that do not warrant full server navigation, admin forms with auto-save).
- Avoid additional global state libraries in MVP; rely on React context sparingly and only for cross-cutting concerns (theme, auth session).

