# RK Digital Experience Portfolio - Content & Data Model

This document defines the logical content model used for both static MDX content and the database schema (Supabase).

---

## 1. Projects

Represents a case-study style project shown on the site.

**Fields:**

- `id` - string/UUID; primary key.
- `slug` - string; URL slug (unique).
- `title` - string; project title.
- `summary` - string; 1-2 sentence summary.
- `coverImage` - string; URL or path to cover image.
- `repoUrl` - string; optional URL to source repository.
- `liveUrl` - string; optional URL to live demo.
- `tags` - string[]; e.g., `["full-stack", "realtime", "3d"]`.
- `stack` - string[]; e.g., `["Next.js", "Postgres", "Redis"]`.
- `metrics` - object:
  - `lighthouseScore` - number; e.g., 98.
  - `usersImpacted` - number; e.g., 1200.
  - `performanceGain` - string; e.g., -40% load time.
- `dates` - object:
  - `start` - date/string; start date.
  - `end` - date/string or null; end date or ontgoing.
- `role` - string; e.g., Solo full-stack developer.
- `highlights` - string[]; bullet points of key outcomes.
- `bodyMdx` - MDX content; full case study (problem, solution, architecture, metrics, lessons).
- `featured` - boolean; whether to show prominently on home page.
- `status` - enum; `draft` | `published`.
- `createdAt` - date.
- `updatedAt` - date.

**DB Types (Supabase/Postgres suggestion):**

- `id` → `uuid` (default `gen_random_uuid()`)
- `slug` → `text` (unique)
- `title` → `text`
- `summary` → `text`
- `cover_image` → `text`
- `repo_url` → `text`
- `live_url` → `text`
- `tags` → `text[]`
- `stack` → `text[]`
- `metrics` → `jsonb`
- `dates` → `jsonb`
- `role` → `text`
- `highlights` → `text[]`
- `featured` → `boolean` (default `false`)
- `status` → `text` (`draft` | `published`)
- `created_at` → `timestamptz` (default `now()`)
- `updated_at` → `timestamptz` (default `now()`)

---

## 2. Posts (Blog)

Represents a blog post.

**Fields:**

- `id` - string/UUID; primary key.
- `slug` - string; URL slug (unique).
- `title` - string.
- `summary` - string.
- `coverImage` - string; optional.
- `tags` - string[]; topics (e.g., architecture, frontend).
- `bodyMdx` - MDX content for the full article.
- `readingMinutes` - number; precomputed reading time.
- `publishedAt` - date; publication date.
- `status` - enum; `draft` | `published`.
- `createdAt` - date.
- `updatedAt` - date.

**DB Types (Supabase/Postgres suggestion):**

- `id` → `uuid`
- `slug` → `text` (unique)
- `title` → `text`
- `summary` → `text`
- `cover_image` → `text`
- `tags` → `text[]`
- `body` → `text` or `jsonb` (optional, when storing MDX body)
- `reading_minutes` → `integer`
- `published_at` → `timestamptz`
- `status` → `text` (`draft` | `published`)
- `created_at` → `timestamptz` (default `now()`)
- `updated_at` → `timestamptz` (default `now()`)

---

## 3. Skills

Represents a skill for the skills matrix.

**Fields:**

- `id` - string/UUID.
- `name` - string; skill name (e.g., Next.js).
- `category` - enum/string; e.g., `frontend`, `backend`, `devops`, `data`, `soft`.
- `level` - enum; e.g., `beginner` | `intermediate` | `advanced` | `expert`.
- `years` - number; years of experience.
- `description` - string; short explanation of how it's used.
- `sortOrder` - number; for ordering in UI.

---

## 4. Testimonials

Optional social proof.

**Fields:**

- `id` - string/UUID.
- `author` - string; person's name.
- `role` - string; their title/relationship.
- `avatar` - string; URL to image or placeholder.
- `quote` - string; testimonial text.
- `sourceUrl` - string; link to LinkedIn or reference.
- `createdAt` - date.

---

## 5. Messages (Contact Form)

Represents a message sent via `/contact`.

**Fields:**

- `id` - string/UUID.
- `name` - string; sender's name.
- `email` - string; sender's email.
- `topic` - string; optional topic/category.
- `message` - string; full message body.
- `status` - enum; `new` | `read` | `replied`.
- `createdAt` - date/time.
- `updatedAt` - date/time.

Security:

- Writes only via server-side API (`/api/contact`).
- Never exposed for unauthenticated writes directly from client.

---

## 6. Resume (JSON API)

The resume is a structured JSON document returned by `/api/resume`.

**Top-Level Fields:**

- `name` - string.
- `title` - string; e.g., Full-Stack Engineer.
- `location` - string; city/country or remote.
- `contact` - object:
  - `email` - string.
  - `website` - string.
  - `github` - string.
  - `linkedin` - string.
- `summary` - string; 3-4 line professional summary.
- `skills` - object:
  - `languages` - string[].
  - `frameworks` - string[].
  - `tools` - string[].
  - `other` - string[].
- `experience` - array of objects:
  - `company` - string.
  - `role` - string.
  - `location` - string.
  - `startDate` - date/string.
  - `endDate` - date/string or `present`.
  - `summary` - string.
  - `highlights` - string[]; bullet points.
- `projects` - array of objects:
  - `name` - string.
  - `slug` - string; link to /projects/[slug].
  - `summary` - string.
  - `stack` - string[].
  - `metrics` - string[]; key outcomes.
- `education` - array of objects:
  - `institution` - string.
  - `degree` - string.
  - `startDate` - date/string.
  - `endDate` - date/string.
- `certifications` - array of objects (optional):
  - `name` - string.
  - `issuer` - string.
  - `date` - date/string.

This structure should be stable so a PDF generator or external consumer can rely on it.

---

## 7. Relationships

- Project Skills: many-to-many via junction table (`project_skills`) or tags.
- Project Metrics: stored inline in `metrics` field or in related table if needed.
- User Messages: messages are not tied to an authenticated user (public contact).
- Posts Tags: tags stored as array (simple for MVP).

---

## 8. Storage Decisions

- MDX content for `projects` and `posts`:
  - MVP: stored in repo as MDX files; Contentlayer indexes them.
  - Admin edits: can either:
    - Update MDX in repo (requires git changes), or
    - Use Supabase for storing updated content in a `body` column.
- Media assets:
  - Stored in Supabase Storage or remote CDN; referenced via URL.

---

## 9. MDX File Conventions

- Project MDX files:
  - Stored under `content/projects`.
  - Filename: `<slug>.mdx` (e.g., `realtime-analytics-dashboard.mdx`).
  - Frontmatter fields mirror `projects` table metadata (title, summary, tags, stack, dates, featured).
- Blog MDX files:
  - Stored under `content/posts`.
  - Filename: `<yyyy>-<mm>-<dd>-<slug>.mdx` (e.g., `2025-01-15-optimizing-nextjs-3d.mdx`).
  - Frontmatter fields: title, summary, tags, readingMinutes, publishedAt, status.
