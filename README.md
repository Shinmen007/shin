<div align="center">

# 🚀 RK Portfolio

### A Modern Digital Experience

<p align="center">
  <strong>Immersive 3D Portfolio • Next.js 16 • React 19 • TypeScript</strong>
</p>

<p align="center">
  <a href="https://roshankhatri.dev"><strong>🌐 View Live Site →</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js" alt="Three.js" />
</p>

---

</div>

## ✨ Overview

A cutting-edge personal portfolio showcasing **immersive digital experiences** through modern web technologies. Built with Next.js 16, TypeScript, and featuring **interactive 3D elements** powered by Three.js and React Three Fiber.

The portfolio emphasizes **performance**, **accessibility**, and **stunning visual experiences** while maintaining excellent Web Vitals scores.

<br />

## 🎯 Key Features

<table>
<tr>
<td width="50%">

### 🔥 Performance & Experience
- ⚡ **Lightning Fast** - Edge-optimized with minimal blocking
- 🎨 **Stunning 3D Visuals** - Interactive hero scenes
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📱 **Fully Responsive** - Mobile-first design approach

</td>
<td width="50%">

### 💎 Technical Excellence
- ♿ **Accessible** - WCAG compliant, keyboard navigation
- 🌙 **Cyberpunk Theme** - Neon accents, dark UI
- 📝 **MDX Content** - Rich blog posts & project cases
- 📊 **Real-time Stats** - Dynamic GitHub metrics

</td>
</tr>
</table>

<br />

## 🛠️ Technology Stack

<details open>
<summary><b>Frontend & UI</b></summary>
<br />

| Category | Technologies |
|----------|-------------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js) ![React](https://img.shields.io/badge/React_19-61DAFB?logo=react) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript) (Strict Mode) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css) + Cyberpunk Theme |
| **Animation** | ![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer) |
| **3D Graphics** | ![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js) + React Three Fiber + Drei |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?logo=lucide) |

</details>

<details>
<summary><b>Content & Data</b></summary>
<br />

| Category | Technologies |
|----------|-------------|
| **Content** | ![MDX](https://img.shields.io/badge/MDX-1B1F24?logo=mdx) via Contentlayer2 |
| **Database** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase) (Postgres + Storage) |
| **Authentication** | NextAuth v5 + GitHub OAuth |
| **Data Fetching** | TanStack Query (React Query) |
| **Security** | Row-Level Security (RLS) Policies |

</details>

<details>
<summary><b>Forms & Validation</b></summary>
<br />

- **react-hook-form** - Form state management
- **Zod** - Runtime schema validation
- **@hookform/resolvers** - Form integration

</details>

<details>
<summary><b>Development & Tooling</b></summary>
<br />

| Tool | Purpose |
|------|---------|
| ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo) | Monorepo orchestration |
| ![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm) | Fast package manager |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint) | Code linting |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier) | Code formatting |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel) | Deployment platform |

</details>

<br />

## 📁 Project Structure

```
shin/
├── 📱 apps/
│   └── web/                      # Next.js portfolio application
│       ├── src/
│       │   ├── app/              # App Router pages & API routes
│       │   │   ├── api/          # 🔌 API route handlers
│       │   │   ├── blog/         # 📝 Blog pages
│       │   │   ├── projects/     # 💼 Project pages
│       │   │   └── ...           # Other pages (home, about, contact)
│       │   ├── components/       # 🧩 Reusable UI components
│       │   │   ├── hero/         # 🎨 3D hero components
│       │   │   ├── ui/           # 🎯 Base UI components
│       │   │   └── ...           # Feature-specific components
│       │   └── lib/              # 🛠️ Utilities and helpers
│       ├── contentlayer.config.ts
│       ├── next.config.ts
│       └── tailwind.config.ts
├── 📄 content/                   # MDX content files
│   ├── projects/                 # Project case studies
│   └── posts/                    # Blog posts
├── 📚 docs/                      # Architecture documentation
│   ├── ARCHITECTURE.md
│   ├── CONTENT_MODEL.md
│   └── UI_DESIGN.md
├── 📦 packages/                  # Shared packages (planned)
│   ├── ui/
│   ├── config/
│   └── types/
├── turbo.json
├── CLAUDE.md
└── AGENTS.md
```

<br />

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation & Setup

```bash
# 1️⃣ Install dependencies
pnpm install

# 2️⃣ Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your configuration

# 3️⃣ Start development server
pnpm dev
# 🌐 Open http://localhost:3000
```

### 🎮 Available Commands

```bash
pnpm dev          # 🔥 Start development server
pnpm build        # 📦 Build for production
pnpm start        # 🚀 Start production server
pnpm lint         # 🔍 Run ESLint
pnpm type-check   # ✅ TypeScript type checking
pnpm format       # 💅 Format code with Prettier
pnpm clean        # 🧹 Clean build outputs
```

<br />

## 🔐 Environment Configuration

<details>
<summary><b>Click to expand environment variables</b></summary>
<br />

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

### Optional Variables

```env
# GitHub OAuth (for authentication)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email (contact form functionality)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com

# Analytics & Monitoring
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
SENTRY_DSN=your_sentry_dsn
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

</details>

<br />

## 📝 Content Management

### 📰 Creating Blog Posts

Create a new `.mdx` file in `content/posts/`:

```yaml
---
title: "Your Awesome Post Title"
summary: "A compelling description that hooks readers"
publishedAt: "2024-01-01"
published: true
tags: ["nextjs", "typescript", "webdev"]
cover: "/images/cover.jpg"  # optional
---

Your amazing content here...
```

### 💼 Adding Projects

Create a new `.mdx` file in `content/projects/`:

```yaml
---
title: "Project Name"
summary: "What makes this project special"
cover: "/images/project-cover.jpg"
tags: ["nextjs", "react", "typescript"]
stack: ["Next.js", "TypeScript", "Supabase"]
repoUrl: "https://github.com/username/repo"  # optional
liveUrl: "https://project-demo.com"  # optional
dates:
  start: "2024-01"
  end: "2024-03"
metrics:
  users: 1000
  performance: 95
highlights:
  - "🚀 Achieved 95+ Lighthouse score"
  - "📈 Served 10k+ users with 99.9% uptime"
  - "⚡ Reduced load time by 60%"
---

Detailed project description...
```

### ✨ Content Features

- ✅ Auto-generated slugs from filenames
- ⏱️ Automatic reading time calculation
- 🎨 Syntax highlighting with `one-dark-pro` theme
- 📖 GitHub Flavored Markdown support
- 🔗 Auto-linked headings

<br />

## 🎨 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| 🏠 **Home** | `/` | Interactive 3D hero with featured projects |
| 💼 **Projects** | `/projects` | Complete project portfolio showcase |
| 📝 **Blog** | `/blog` | Technical writing and insights |
| 👤 **About** | `/about` | Professional background and skills |
| 📄 **Resume** | `/resume` | Downloadable resume and experience |
| 📧 **Contact** | `/contact` | Get in touch for opportunities |

<br />

## ⚡ Performance Optimizations

- ✅ Server-side rendering with React Server Components
- 🖼️ Image optimization with Next.js Image component (AVIF/WebP)
- 📦 Code splitting and lazy loading
- 🎯 3D scene optimization with proper cleanup
- 🎨 Minimal bundle size with Tailwind CSS
- 🚀 Edge caching for read APIs
- 🛡️ Security headers configured
- 📊 Excellent Web Vitals scores

<br />

## 📚 Documentation

<table>
<tr>
<td>

📘 **[CLAUDE.md](./CLAUDE.md)**
Project overview & AI assistant instructions

</td>
<td>

🔧 **[AGENTS.md](./AGENTS.md)**
Development guidelines & coding standards

</td>
</tr>
<tr>
<td>

🏗️ **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)**
Complete technical architecture

</td>
<td>

📊 **[CONTENT_MODEL.md](./docs/CONTENT_MODEL.md)**
Data models & database schema

</td>
</tr>
<tr>
<td colspan="2">

🎨 **[UI_DESIGN.md](./docs/UI_DESIGN.md)**
Design guidelines & cyberpunk theme

</td>
</tr>
</table>

<br />

## 🤝 Contributing

Contributions are welcome! See **[AGENTS.md](./AGENTS.md)** for detailed development guidelines.

<br />

## 📄 License

No explicit license yet; assume private/internal use unless a LICENSE is added.

<br />

---

<div align="center">

### 🌟 Built with ❤️ by [Roshan Khatri](https://roshankhatri.dev)

**[Website](https://roshankhatri.dev)** • **[GitHub](https://github.com/roshankhatri)** • **[LinkedIn](https://linkedin.com/in/roshankhatri)**

<p>
  <sub>Powered by Next.js • Designed for Developers • Crafted for Performance</sub>
</p>

</div>
