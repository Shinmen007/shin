# RK Digital Experience Portfolio - Execution Plan

Target: MVP in 7-10 days, then iterate.

---

## 1. Milestones Overview

- **M1 - Foundation & Scaffold**
- **M2 - Content & Layout**
- **M3 - 3D Hero & Motion**
- **M4 - Data, Contact, Admin-Lite**
- **M5 - SEO, Analytics, Launch**

---

## 2. M1 - Foundation & Scaffold (Day 1-2)

**Goals:** Working Next.js app, monorepo structure, core tooling.

**Tasks:**

- Set up Turborepo with `apps/web` and `packages/*` (2–3 hours, RK).
- Configure Tailwind, TSConfig, ESLint, Prettier across monorepo (2 hours, RK).
- Implement base layout (`app/layout.tsx`) with navbar and footer (2 hours, RK).

- Initialize monorepo:
  - Set up Turborepo with `apps/web` and `packages/ui`, `packages/config`, `packages/types`.
  - Configure `pnpm` workspaces.
- Tooling:
  - Add TypeScript, ESLint, Prettier (or Biome).
  - Set up shared `tsconfig`, Tailwind config, and ESLint rules in `packages/config`.
- UI foundation:
  - Add Tailwind CSS to `apps/web`.
  - Install shadcn/ui and Radix.
  - Create base components: `Button`, `Card`, `Badge`, `Container`, `Navbar`, `Footer`.
- Theming:
  - Implement light/dark theme toggle (system-aware).
  - Define color tokens for primary, accent, background, text.

**Acceptance:**

- `apps/web` runs locally.
- Linting and formatting pass.
- Basic layout with header, footer, theme toggle.

---

## 3. M2 - Content & Layout (Day 2-3)

**Goals:** Core routes and MDX content pipeline.

**Tasks:**

- Routing & layouts:
  - Implement `app/layout.tsx` and section layouts for public pages.
  - Stub routes: `/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/about`, `/contact`.
- Content pipeline:
  - Set up Contentlayer for MDX.
  - Define MDX content types for `Project` and `Post` matching `CONTENT_MODEL.md`.
  - Add example MDX files for 3 projects and 2 posts.
- Page shells:
  - Build basic versions of each page with static content and MDX renderers.
  - Implement header navigation and footer links.

**Acceptance:**

- All core routes load with dummy content.
- Content changes in MDX files reflect on pages.
- Navigation is functional and accessible.

---

## 4. M3 - 3D Hero & Motion (Day 3-4)

**Goals:** Implement 3D hero and motion, while preserving performance and accessibility.

- Risks:
  - 3D hero might hurt LCP if not carefully optimized.
  - Motion might conflict with `prefers-reduced-motion` if not wired correctly.

**Tasks:**

- 3D setup:
  - Add Three.js, @react-three/fiber, and drei.
  - Create a minimal, performant scene for the home hero.
- Motion:
  - Integrate Framer Motion for:
    - Hero text entrance.
    - Button hover and click states.
    - Subtle scroll-based animations.
- Accessibility & performance:
  - Implement `prefers-reduced-motion` fallback:
    - Disable heavy animations and use static hero for users who prefer reduced motion.
  - Add static fallback image or simplified illustration for non-supporting environments.

**Acceptance:**

- Home page hero shows 3D scene on capable devices.
- Motion is smooth and does not significantly harm LCP.
- Reduced motion users see a simpler, non-animated variant.

---

## 5. M4 - Data, Contact, Admin-Lite (Day 4-6)

**Goals:** Connect Supabase, implement contact flow, and create admin-lite studio.

**Tasks:**

- Supabase integration:
  - Create Supabase project.
  - Define schema for `projects`, `posts`, `skills`, `messages`, `testimonials`.
  - Add RLS policies for each table.
- Auth:
  - Integrate Auth.js with Supabase or direct providers.
  - Protect `/studio` route.
- Contact form:
  - Implement `/contact` form with React Hook Form + Zod validation.
  - Create `/api/contact` route:
    - Validate payload.
    - Enforce rate limiting.
    - Insert into `messages`.
    - Trigger email (e.g., via Supabase function or external service).
- Admin-lite studio:
  - `/studio` route with:
    - View list of projects and posts.
    - Basic create/edit UI for metadata (slug, title, summary, tags).
    - Edit MDX or reference MDX file locations.
    - View contact messages.

**Acceptance:**

- Contact form fully functional (DB insert + email).
- `/studio` is only accessible when logged in.
- Admin can create/update project metadata and see changes reflected on the site.

---

## 6. M5 - SEO, Analytics, Launch (Day 6-10)

**Goals:** Harden app, add observability, polish experience, and launch.

**Tasks:**

- SEO:
  - Implement dynamic meta tags, OG and Twitter cards for key routes.
  - Add `/sitemap.xml` and `/robots.txt`.
  - Add structured data (schema.org Person and Article/Project).
- OG image generator:
  - Implement `/api/og` using image rendering for project and post pages.
- Analytics & error monitoring:
  - Add analytics (Plausible or PostHog).
  - Add Sentry for client and server.
  - Track key events: `view_project`, `view_post`, `contact_submit`, `resume_download`.
- Testing & QA:
  - Add unit tests for core components.
  - Add E2E tests for navigation and contact flow with Playwright.
  - Accessibility scan and fixes.
- Launch:
  - Connect domain on Vercel.
  - Configure SSL, redirects, and caching.
  - Sanity check performance with Lighthouse.
  - Soft launch, gather feedback, then announce.

**Acceptance:**

- Lighthouse scores -6 95 on main pages.
- SEO tags and OG images verified.
- Analytics receiving events; Sentry capturing errors.
- Domain live with HTTPS.

---

## 7. Risk Management

- 3D performance:
  - Keep scene simple; provide easy fallback.
- Admin complexity:
  - Start with minimal metadata editing; expand later.
- External services:
  - Handle failure gracefully (fallback content, retry where appropriate).

---

## 8. Post-Launch Iteration Ideas

- Search (Algolia or Postgres full-text).
- Internationalization for one additional language.
- Better WYSIWYG or MDX editing in /studio.
- Newsletter and double opt-in.
- Case study PDF exports and shareable assets.

---

## 9. Definition of Done

- All M1–M5 acceptance criteria met.
- All pages and critical flows covered by at least one automated test (unit or E2E).
- Lighthouse mobile score ≥ 95 on `/`, `/projects`, `/projects/[slug]`, `/blog/[slug]`.
- No critical issues in accessibility audit (axe, Lighthouse).
- Sentry and analytics dashboards show live data from at least one manual smoke test.
