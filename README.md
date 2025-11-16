# RK Portfolio - Modern Digital Experience

## About
A cutting-edge personal portfolio showcasing immersive digital experiences through modern web technologies. Built with Next.js, TypeScript, and featuring interactive 3D elements powered by Three.js and React Three Fiber. The portfolio emphasizes performance, accessibility, and stunning visual experiences while maintaining excellent Web Vitals.

**Live Portfolio**: [roshankhatri.dev](https://roshankhatri.dev)

## Features
- 🚀 **High Performance**: Edge-friendly rendering with minimal blocking scripts
- 🎨 **Stunning Visuals**: Interactive 3D hero scenes with Framer Motion animations
- 📱 **Responsive Design**: Mobile-first approach with seamless cross-device experience
- ♿ **Accessibility**: Semantic HTML, keyboard navigation, and reduced motion support
- 🌙 **Dark Theme**: Cyberpunk-inspired color scheme with neon accents
- 📝 **Content Management**: MDX-powered blog and project case studies
- 📊 **Real-time Stats**: Dynamic GitHub statistics and project metrics

## Technology Stack

### Frontend
- **Next.js 16** with App Router and React Server Components
- **React 19** for cutting-edge features
- **TypeScript** for type safety throughout
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Three.js** + **@react-three/fiber** for 3D experiences

### Content & Data
- **MDX** via Contentlayer for blog posts and projects
- **Supabase** for database, authentication, and storage
- **Row-Level Security** policies on all tables

### Development Tools
- **Turborepo** for monorepo management
- **pnpm** as package manager
- **ESLint** + **Prettier** for code quality
- **Vercel** for deployments

## Project Structure

```
shin/
├── portfolio/                    # Main monorepo
│   ├── apps/web/                 # Next.js portfolio application
│   │   ├── src/
│   │   │   ├── app/              # App Router structure
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   ├── hero/         # 3D hero components
│   │   │   │   ├── skills/       # Skills showcase
│   │   │   │   ├── projects/     # Project components
│   │   │   │   └── blog/         # Blog components
│   │   │   └── lib/              # Utilities and helpers
│   │   └── contentlayer.config.ts # MDX configuration
│   ├── content/                  # MDX content files
│   │   ├── projects/             # Project case studies
│   │   └── posts/                # Blog posts
│   └── turbo.json               # Turborepo configuration
├── docs/                        # Architecture and design docs
└── AGENTS.md                    # Development guidelines
```

## Development

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm type-check

# Format code
pnpm format
```

## Key Pages
- **Home** (`/`) - Interactive 3D hero with featured projects
- **Projects** (`/projects`) - Complete project portfolio
- **Blog** (`/blog`) - Technical writing and insights
- **Contact** - Get in touch for opportunities

## Content Management
Projects and blog posts are written in MDX format and automatically processed by Contentlayer. Each piece of content includes:
- Metadata (title, date, tags, featured status)
- SEO optimization
- Reading time calculation
- Responsive layouts

## Performance Optimizations
- Server-side rendering with React Server Components
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- 3D scene optimization with proper cleanup
- CSS-in-JS with Tailwind for minimal bundle size

## Contributing
See `AGENTS.md` for detailed development guidelines and contribution process.

## License
No explicit license yet; assume private/internal use unless a LICENSE is added.
