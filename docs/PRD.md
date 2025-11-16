# RK Digital Experience Portfolio - Product Requirements Document (PRD)

## 1. Overview

**Product Name:** RK Digital Experience Portfolio  
**Owner:** Roshan Khatri  
**Type:** Interactive, 3D-accented personal portfolio and blog  
**Goal:** Demonstrate full-stack capability through implementation and UX, not just claims.

The portfolio should feel like a live product: fast, robust, and thoughtfully engineered, showing front-end craft (3D, motion, accessibility) and back-end maturity (auth, DB, APIs, RLS, observability).

---

## 2. Vision & Objectives

### 2.1 Vision Statement

Build a futuristic, minimal, neon-accented portfolio that feels like a polished product and proves Roshan's skills end-to-end: architecture, implementation, performance, security, and UX.

### 2.2 Objectives

- Generate **3+ interview invites** within 30 days of launch.
- Maintain **Core Web Vitals Good** on mobile.
- Achieve **contact conversion ≥ 3%** and **average time on page ≥ 90s**.
- Use the site itself as a **demonstration of engineering quality** in interviews.
- Maintain Lighthouse scores ≥ 95 on `/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]` in mobile mode (Simulated slow 4G).
- Maintain error logging coverage for ≥ 90% of known failure points (API calls, DB access, form submissions).

---

## 3. Target Users & Needs

### 3.1 Recruiter / Hiring Manager

- Needs: quick understanding of who Roshan is, what he does, and whether he's relevant for a role.
- Wants:
  - Clear headline and positioning.
  - One-page downloadable resume.
  - Easy contact flow with low friction.

### 3.2 Tech Lead / Senior Engineer

- Needs: evidence of real projects, depth of thinking, familiarity with modern stack and best practices.
- Wants:
  - Case studies with problem/solution/architecture/performance outcomes.
  - Links to code and live demos.
  - A sense of how Roshan approaches design, testing, and reliability.

### 3.3 Collaborator / Client

- Needs: clarity on services, availability, and how collaboration might work.
- Wants:
  - Skills overview and strengths.
  - Project examples similar to their needs.
  - Easy way to reach out and get a reply.

---

## 4. Scope (MVP v1)

### 4.1 In-Scope

- Public routes: `/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/about`, `/contact`.
- Protected route: `/studio` (admin-lite).
- API routes: `/api/projects`, `/api/posts`, `/api/contact`, `/api/resume`, `/api/og`.
- MDX-driven content for projects and posts.
- Client-side search across project and post titles and tags on `/projects` and `/blog`.
- Resume download via `/api/resume` (JSON) and `/resume.pdf` (PDF generated from the same data).
- 3D hero with graceful fallback and reduced-motion support.
- Contact form with validation, spam protection, DB storage, and email dispatch.
- Analytics (key events) and error monitoring.

### 4.2 Out-of-Scope (for MVP)

- Payments or e-commerce.
- Multi-tenant CMS.
- Heavy AI features beyond basic assistant/navigation ideas.
- Mobile app or browser extension.
- Internationalization beyond basic structure.

---

## 5. Functional Requirements

### 5.1 Home (`/`)

- 3D hero: a simple scene (e.g., orbiting geometric nodes) rendered via `@react-three/fiber`, with:
  - < 1 MB of total 3D assets.
  - At most 2–3 meshes and a simple light setup.
  - Animations driven via `requestAnimationFrame` or React fiber loops, paused on tab blur.
- Short, clear tagline and primary CTAs (View Projects, View Resume, Contact).
- Highlight 2-3 flagship projects.
- Surface latest 1-2 blog posts.
- Performance-aware motion with reduced-motion fallback.

### 5.2 Projects (`/projects` & `/projects/[slug]`)

- Project list/grid:
  - Filter by tag/technology.
  - Sort by recency or impact if needed.
- Project detail page:
  - Case study structure: problem  solution  stack  architecture  metrics  lessons learned.
  - Links to live demo and repository (if public).
  - Stack badges and metrics (e.g., Lighthouse score, users, performance).
  - Dynamic Open Graph image per project.

### 5.3 Blog (`/blog` & `/blog/[slug]`)

- Blog index:
  - List of posts with title, summary, tags, reading time, and date.
  - Tag filters.
- Blog post detail:
  - MDX content (code blocks, images).
  - Reading time estimate.
  - Proper meta tags and OG data.
- RSS feed for posts.

### 5.4 About (`/about`)

- Short biography and positioning.
- Skills matrix grouped by category (frontend, backend, DevOps, tools, soft skills).
- Timeline of experience and education.
- Optional certifications/testimonials.

### 5.5 Contact (`/contact`)

- Contact form:
  - Fields: name, email, message, optional topic.
  - Client and server validation.
  - Spam protection (e.g., hCaptcha or similar).
  - On submit: write to DB + send email.
  - Clear success and error states.

### 5.6 Admin-Lite Studio (`/studio`)

- Requires authentication (Auth.js + Supabase).
- Basic dashboard:
- Minimum UX:
  - Projects list page with search by title/slug.
  - Create/edit form with inline validation and preview link.
  - Posts list page with draft/published toggle.
  - Messages page with status toggles (new → read → replied) and filter.
  - List/create/edit projects (metadata + MDX body).
  - List/create/edit posts.
  - View contact messages.
- Draft/publish workflow flag for content.

### 5.7 API

- `/api/projects`: public read (list + detail).
- `/api/posts`: public read.
- `/api/contact`: write; rate-limited; spam-protected.
- `/api/resume`: returns JSON resume.
- `/api/og`: generates OG images per project/post.

### 5.8 Analytics & Monitoring

- Track events:
  - `view_project`
  - `view_post`
  - `contact_submit`
  - `resume_download`
- Error tracking via Sentry or equivalent.

---

## 6. Non-Functional Requirements

### 6.1 Performance

- Target on mid-range mobile (4G, throttled):
  - LCP: < 1.3s on home.
  - CLS: < 0.05.
  - TTI: < 3s.
- JavaScript budget:
  - < 200KB gzipped on initial route.
- Per-route performance targets:
  - `/`: LCP < 1.3s, JS payload < 200KB gzipped.
  - `/projects`: LCP < 1.5s, grid loads above-the-fold within 1s.
  - `/projects/[slug]`: TTI < 2.5s, hero visible within 800ms.
  - `/blog/[slug]`: TTI < 2.5s, content rendered server-side with minimal client hydration.
- Use:
  - Image optimization.
  - Code-splitting and lazy loading.
  - Edge caching where appropriate.

### 6.2 Accessibility

- WCAG 2.1 AA targets:
  - Full keyboard navigation.
  - Visible focus states.
  - Screen reader friendly landmarks and labels.
  - High contrast mode and adequate color contrast.
  - `prefers-reduced-motion` respected.
  - Alt text for all meaningful images.

### 6.3 Security

- Supabase RLS enabled on all tables.
- Rate limiting on write APIs (especially `/api/contact`).
- No secrets exposed to the client.
- Content Security Policy and secure cookies.
- Input validation with Zod or equivalent.

### 6.4 Reliability

- Aim for 99.9% uptime for public site.
- Graceful degradation when DB or external services are down (fallback content where possible).
- Logging and alerting on critical errors.

---

## 7. Success Metrics

### 7.1 Technical

- Lighthouse scores ≥ 95 on performance, accessibility, best practices, SEO on key routes.
- Zero critical accessibility violations in automated audits.
- Error rate within acceptable threshold (no repeated unhandled errors).

### 7.2 Business / Career

- Within 30 days:
  - 1,000 unique visitors.
  - 3+ interview conversations.
  - 10 legitimate contact submissions.
- Within 90 days:
  - 5,000 visitors.
  - 3 job interviews plus 2 freelance leads.
  - 100 newsletter or follow-up subscribers (optional feature).

---

## 8. Constraints & Assumptions

- Use latest stable versions of stack components when building.
- Deploy primarily on Vercel and Supabase.
- Focus on a single language (English) in MVP while keeping structure ready for future locales.
- Roshan can maintain and extend the codebase solo, so architecture must be clear and documented.
