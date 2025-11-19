# RK Digital Experience Portfolio - UI & UX Design

## 1. Design Principles

- **Futuristic, not noisy:** Neon accents on a dark or neutral base, with plenty of white/empty space.
- **Readable and focused:** Strong typography hierarchy, high contrast, minimal clutter.
- **Fast and responsive:** Mobile-first design with smooth, purposeful motion.
- **Accessible by default:** Keyboard-first, screen-reader aware, respectful of user preferences.

---

## 2. Visual Language

### 2.1 Color Palette (example placeholders)

- Background: `#020617` (near-black with blue tint)
- Surface: `#0f172a` (dark slate)
- Primary: `#22d3ee` (neon cyan)
- Accent: `#a855f7` (neon violet)
- Text Primary: `#e5e7eb` (light gray)
- Text Muted: `#9ca3af` (muted gray)
- Success: `#22c55e`
- Danger: `#ef4444`

Usage:

- Background/Surface for layout.
- Primary for key CTAs and highlights.
- Accent for 3D glow, outlines, and small details.

### 2.2 Typography

- Base font: system UI stack (e.g., Inter or system default).
- Hierarchy:
  - `h1`: home hero headline and page titles.
  - `h2`: section titles (Projects, Blog, About).
  - `h3`: card titles and subsections.
- Body text should stay highly readable on dark backgrounds.

---

## 3. Layout & Information Architecture

### 3.1 Global Layout

- **Header:**
  - Left: logo or text mark (e.g., RK).
  - Center/Right: navigation links (Home, Projects, Blog, About, Contact).
  - Right: theme toggle, possibly a Resume button.
  - Mobile: hamburger menu with full-screen slide-out nav.

- **Footer:**
  - Left: brief tagline.
  - Right: social links (GitHub, LinkedIn, Twitter, email).
  - Secondary: link to RSS, sitemap, and privacy info.

### 3.2 Routes & Content

- `/` - overview, hero, featured projects/posts.
- `/projects` - grid with filters.
- `/projects/[slug]` - detailed case studies.
- `/blog` - list of posts with tags.
- `/blog/[slug]` - full posts.
- `/about` - bio, skills, timeline.
- `/contact` - contact form and alternative contact info.
- `/studio` - admin-lite dashboard (authenticated).

---

## 4. Page-Level Designs

### 4.1 Home (`/`)

Sections:

1. **Hero:**
   - Left: animated introduction with name, title, rotating roles.
   - Right: 3D scene (or above/below on mobile).
   - Primary CTA: View Projects.
   - Secondary CTA: Download Resume or Contact Me.

2. **Highlights:**
   - 2-3 feature cards for flagship projects.
   - Each card: title, one-line impact, stack badges, CTA.

3. **Latest Posts:**
   - 2-3 blog summaries with links.

4. **Skills Snapshot:**
   - Compact skills matrix or key skill badges.

5. **Contact Banner:**
   - Short copy and button linking to `/contact`.

### 4.2 Projects (`/projects`)

- Intro text explaining how projects are curated.
- Filter bar:
  - Tag filters (e.g., Full Stack, Data, 3D, Real-time).
- Grid of project cards:
  - Image/thumbnail or abstract visual.
  - Title, short summary, tags, year.
  - Hover state with subtle motion and extra metadata.

### 4.3 Project Detail (`/projects/[slug]`)

- Hero section:
  - Title, tags, links (live, repo).
  - Quick facts (timeline, role, key metric).
- Content sections (MDX):
  - Problem.
  - Solution.
  - Architecture (possibly with simple diagrams).
  - Tech stack and reasoning.
  - Metrics and outcomes.
  - Lessons learned.
- Sticky or top Back to projects link.

### 4.4 Blog (`/blog`, `/blog/[slug]`)

- `/blog`:
  - Intro (What I write about).
  - Tag filters (e.g., Architecture, Frontend, Career).
  - List of posts with title, summary, tags, reading time.

- `/blog/[slug]`:
  - Title, date, reading time, tags.
  - MDX content with:
    - Code blocks.
    - Notes/callouts.
    - Inline images.
  - End of article: Related posts and Contact CTA.

### 4.5 About (`/about`)

- Hero section:
  - Photo or avatar + short positioning.
- Bio:
  - Background story and current focus.
- Skills matrix:
  - Grouped by category (frontend, backend, DevOps, data, soft skills).
  - Visual level indicators.
- Timeline:
  - Key roles, projects, and milestones in a vertical timeline.

### 4.6 Contact (`/contact`)

- Copy:
  - Short message explaining what types of contact are welcome.
- Form:
  - Fields: name, email, topic (optional), message.
  - Clear inline validation states and error messages.
- Confirmation:
  - On success: success UI with next steps.
  - On error: try again option and alt contact info.

### 4.7 Studio (`/studio`)

- Admin navigation:
  - Tabs or sidebar: Projects, Posts, Messages, Settings.
- Projects management:
  - Table/list of projects with status (draft/published).
  - Form to edit metadata and link to MDX content.
- Posts management:
  - Similar to projects.
- Messages:
  - List of contact messages with status (unread/replied).

---

## 5. Components & Interaction Patterns

### 5.1 Core Components

- `Button`: primary, secondary, subtle variants; loading and disabled states.
- `Card`: for projects, posts, and highlights.
- `Badge/Tag`: for stack tags and filters.
- `Input`, `Textarea`, `Select`, `Checkbox`: consistent form styles and validation feedback.
- `Modal/Dialog`: for confirmations or details (Radix + shadcn).
- `Timeline`: for experience and milestones.
- `Navbar` and `Footer` components.

### 5.2 Interaction Guidelines

- Hover and focus states:
  - Use color and subtle motion, not just color alone.
- Keyboard support:
  - All interactive elements focusable and operable via keyboard.
- Scroll behavior:
  - Smooth scroll for in-page navigation.
  - Back to top where useful.

---

## 6. Accessibility & UX Guidelines

- Provide `skip to content` link.
- Ensure landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`) are correctly used.
- Always label form fields and controls clearly.
- Ensure color contrast >= 4.5:1 for text.
- Respect `prefers-reduced-motion`:
  - Disable non-essential animations.
  - Provide static alternatives for 3D elements.

---

## 7. Responsive Design

- Mobile (320-480px):
  - Stack hero content.
  - Single-column layouts for lists.
  - Collapsed navigation (hamburger).
- Tablet (~768px):
  - Two-column grids for projects/posts where possible.
- Desktop (1024px+):
  - Multi-column layouts and more white space.
- Ultra-wide:
  - Maximum content width; avoid lines too long to read.

---

## 8. Component API Guidelines

- `Button`:
  - Props: `variant` (`primary` | `secondary` | `ghost`), `size` (`sm` | `md` | `lg`), `icon`, `loading`.
  - Wrap text in a `<span>` to keep layout stable when adding spinners.
- `Card`:
  - Props: `title`, `description`, optional `href`, `eyebrow`, `tags[]`.
- `Tag`:
  - Props: `label`, `selected`, `onClick`.
  - Used for filters and stack labels.
- `Layout`:
  - Props: `title`, `description`, optional `cta`, `children`.
  - Responsible for setting `<head>` metadata via Next's metadata system.

## 9. States & Feedback

- Projects list empty:
  - Show a friendly message and a CTA to contact or view GitHub.
- Blog list empty:
  - Show a message that posts are “coming soon”.
- Loading:
  - Use skeletons for project cards and post previews.
- Error:
  - Show an inline error message with a “Retry” button for failed API fetches, plus a link to contact if the issue persists.
