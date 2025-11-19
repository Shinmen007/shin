# 🚀 Cyberpunk Redesign - Installation & Setup Guide

## Quick Start

The cyberpunk redesign is already integrated into your project. Here's how to use and test the new components.

---

## ✅ What's Already Set Up

All new cyberpunk components have been created and integrated:

1. ✅ **Dynamic Asset Loader** (`/src/lib/asset-loader.ts`)
2. ✅ **Audio System** (`/src/lib/audio-system.ts`)
3. ✅ **WebGL Hero Scene** (`/src/components/hero/cyberpunk-hero-3d.tsx`)
4. ✅ **Enhanced Buttons** (Updated `/src/components/ui/button.tsx`)
5. ✅ **Cyberpunk Cards** (`/src/components/ui/cyberpunk-card.tsx`)
6. ✅ **Audio Control Panel** (`/src/components/ui/audio-control.tsx`)
7. ✅ **Page Transitions** (`/src/components/ui/page-transition-cyberpunk.tsx`)
8. ✅ **Updated Layout** (Enhanced `/src/components/page-layout.tsx`)

---

## 🎨 Using the New Components

### 1. Holographic Buttons

```tsx
import { Button } from '@/components/ui/button';

// Basic holographic button
<Button variant="holographic" size="lg">
  Launch Experience
</Button>

// With sound effects and high glow
<Button
  variant="holographic"
  enableSound
  glowIntensity="high"
  size="lg"
>
  Interactive Button
</Button>

// Plasma variant
<Button variant="plasma" enableSound>
  Plasma Effect
</Button>

// Neon variant (already in use on your site)
<Button variant="neon">
  Neon Style
</Button>
```

### 2. Cyberpunk Cards

```tsx
import { CyberpunkCard } from '@/components/ui/cyberpunk-card';

// Holographic card with 3D tilt
<CyberpunkCard
  variant="holographic"
  enable3D
  glowColor="multi"
  intensity="high"
  className="p-6"
>
  <h3 className="text-2xl font-bold">Card Title</h3>
  <p className="text-muted-foreground">Card content...</p>
</CyberpunkCard>

// Neon-bordered card
<CyberpunkCard variant="neon" enable3D enableSound>
  <div>Content...</div>
</CyberpunkCard>

// Glass morphism card
<CyberpunkCard variant="glass" intensity="low">
  <div>Subtle effect...</div>
</CyberpunkCard>
```

### 3. WebGL Hero Scene

```tsx
import { CyberpunkHero3D } from '@/components/hero/cyberpunk-hero-3d';

// Full-screen hero with 3D scene
<section className="relative h-screen">
  <CyberpunkHero3D />

  {/* Overlay content */}
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <div className="text-center">
      <h1 className="text-6xl font-black gradient-text">
        Your Title Here
      </h1>
    </div>
  </div>
</section>
```

### 4. Audio System

```tsx
import { useAudioSystem } from '@/lib/audio-system';

function MyComponent() {
  const { playHover, playClick, playSuccess, enable } = useAudioSystem();

  return (
    <button
      onMouseEnter={playHover}
      onClick={() => {
        playClick();
        // Your logic here
        playSuccess();
      }}
    >
      Interactive Element
    </button>
  );
}
```

The audio control panel is automatically available in the bottom-right corner of every page.

---

## 🧪 Testing the Features

### Test the Audio System

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Open the site** in your browser (http://localhost:3000)

3. **Click the floating audio button** in the bottom-right corner

4. **Enable audio** using the toggle switch

5. **Test sound effects:**
   - Hover over buttons → hear subtle hover sound
   - Click buttons → hear click sound
   - Toggle "Ambient Music" → background music plays

### Test the 3D Hero

1. Navigate to a page using `CyberpunkHero3D`

2. **Observe the animation:**
   - 5,000 particles rotating in 3D space
   - Wireframe grid planes moving toward camera
   - Floating holographic spheres with neon glow

3. **Interact with the scene:**
   - Drag to rotate camera
   - Watch auto-rotation

4. **Check performance:**
   - Open DevTools → Performance tab
   - Should maintain 50-60 FPS on desktop
   - 30+ FPS on mobile

### Test Cyberpunk Cards

1. Create a page with multiple `CyberpunkCard` components

2. **Hover over cards:**
   - 3D tilt effect follows mouse
   - Glow follows cursor position
   - Animated gradient background

3. **Check variants:**
   - `holographic`: Multi-color gradient with shimmer
   - `neon`: Cyan border with grid overlay
   - `glass`: Blur effect with subtle opacity

### Test Page Transitions

1. **Navigate between pages:**
   - Click any navigation link
   - Watch the loading overlay animation
   - See smooth fade transitions

2. **Observe effects:**
   - Animated scanlines
   - Rotating hexagon loader
   - Orbiting particles
   - Progress bar sweep

---

## 🎯 Quick Integration Examples

### Example 1: Enhanced Homepage Hero

Replace the existing hero section in `/apps/web/src/app/page.tsx`:

```tsx
import { CyberpunkHero3D } from '@/components/hero/cyberpunk-hero-3d';
import { Button } from '@/components/ui/button';

// Inside your component
<section className="relative h-screen border-b border-border/40">
  {/* 3D Background */}
  <CyberpunkHero3D />

  {/* Content Overlay */}
  <div className="absolute inset-0 z-10 flex items-center">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-6xl md:text-8xl font-black gradient-text">
          Roshan Khatri
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Full-Stack Developer crafting immersive digital experiences
        </p>
        <div className="flex gap-4">
          <Button variant="holographic" size="lg" enableSound glowIntensity="high">
            View Projects
          </Button>
          <Button variant="plasma" size="lg" enableSound>
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Example 2: Project Grid with Cyberpunk Cards

```tsx
import { CyberpunkCard } from '@/components/ui/cyberpunk-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map((project, index) => (
    <CyberpunkCard
      key={project.id}
      variant="holographic"
      enable3D
      enableSound
      glowColor={['cyan', 'magenta', 'purple'][index % 3]}
      intensity="high"
    >
      <div className="p-6 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="cyan">{tag}</Badge>
          ))}
        </div>

        <h3 className="text-2xl font-bold gradient-text">
          {project.title}
        </h3>

        <p className="text-muted-foreground">
          {project.description}
        </p>

        <Button variant="neon" className="w-full" enableSound>
          View Details →
        </Button>
      </div>
    </CyberpunkCard>
  ))}
</div>
```

### Example 3: Contact Form with Audio Feedback

```tsx
import { Button } from '@/components/ui/button';
import { CyberpunkCard } from '@/components/ui/cyberpunk-card';
import { useAudioSystem } from '@/lib/audio-system';

function ContactForm() {
  const { playSuccess, playError } = useAudioSystem();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Submit form logic
      await submitForm(formData);
      playSuccess(); // Success sound
      // Show success message
    } catch (error) {
      playError(); // Error sound
      // Show error message
    }
  };

  return (
    <CyberpunkCard variant="neon" intensity="high" className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <h2 className="text-3xl font-bold gradient-text">Get in Touch</h2>

        {/* Form fields... */}

        <Button
          type="submit"
          variant="holographic"
          size="lg"
          className="w-full"
          enableSound
          glowIntensity="high"
        >
          Send Message
        </Button>
      </form>
    </CyberpunkCard>
  );
}
```

---

## 🔧 Configuration Options

### Adjusting Audio Volumes

Edit `/src/lib/audio-system.ts`:

```typescript
private config: AudioSystemConfig = {
  enabled: false,
  volume: 0.3,        // Change default effects volume (0-1)
  ambientVolume: 0.15, // Change default music volume (0-1)
};
```

### Reducing Particle Count (Performance)

Edit `/src/components/hero/cyberpunk-hero-3d.tsx`:

```typescript
const particles = useMemo(() => {
  const count = 2000;  // Reduce from 5000 to 2000
  // ...
}, []);
```

### Disabling Auto-Rotation

```typescript
<OrbitControls
  enableZoom={false}
  enablePan={false}
  autoRotate={false}  // Change to false
  autoRotateSpeed={0.5}
  // ...
/>
```

### Changing Glow Colors

Edit `/src/tailwind.config.ts`:

```typescript
cyber: {
  cyan: "#00f5ff",      // Change these values
  magenta: "#ff00ff",
  purple: "#9d00ff",
  // ...
}
```

---

## 🎬 Performance Optimization

### For Production Builds

1. **Enable code splitting:**
   ```tsx
   const CyberpunkHero3D = dynamic(() => import('@/components/hero/cyberpunk-hero-3d'), {
     ssr: false,
     loading: () => <LoadingSpinner />
   });
   ```

2. **Lazy load audio:**
   ```tsx
   useEffect(() => {
     const initAudio = async () => {
       if (isVisible) {
         await audioSystem.initialize();
       }
     };
     initAudio();
   }, [isVisible]);
   ```

3. **Reduce animation complexity on mobile:**
   ```tsx
   const isMobile = window.innerWidth < 768;

   <CyberpunkCard
     enable3D={!isMobile}
     intensity={isMobile ? 'low' : 'high'}
   >
   ```

---

## 📱 Mobile Optimization Tips

1. **Disable 3D effects on small screens:**
   ```css
   @media (max-width: 768px) {
     .enable-3d {
       transform: none !important;
     }
   }
   ```

2. **Reduce blur effects:**
   Already handled in `globals.css`:
   ```css
   @media (max-width: 768px) {
     * {
       --mobile-blur: 8px;
     }
   }
   ```

3. **Simplify particle systems:**
   Use viewport detection:
   ```tsx
   const particleCount = window.innerWidth < 768 ? 1000 : 5000;
   ```

---

## 🐛 Troubleshooting

### "Audio not playing"
✅ **Solution**: Click anywhere on the page first (browser autoplay policy). Then enable audio via the floating control panel.

### "3D scene is blank"
✅ **Solution**: Check browser console for WebGL errors. Ensure Three.js CDN is accessible. Try disabling ad blockers.

### "Cards not tilting"
✅ **Solution**: Ensure `enable3D={true}` prop is set and mouse events are not blocked by overlays.

### "Build errors with Three.js"
✅ **Solution**: Three.js components must be client-side only. Add `"use client"` at the top of the file.

### "Audio files not loading"
✅ **Solution**: Check network tab for 404 errors. Verify Freesound CDN URLs in `/src/lib/asset-loader.ts`.

---

## 🎉 You're All Set!

The cyberpunk redesign is fully integrated. Start the dev server and explore:

```bash
pnpm dev
```

Visit **http://localhost:3000** and:
1. Enable audio via the floating button
2. Hover over buttons to hear sound effects
3. Navigate between pages to see transitions
4. Check project cards for 3D tilt effects

For detailed documentation, see: **[CYBERPUNK_REDESIGN.md](./CYBERPUNK_REDESIGN.md)**

---

**Happy Coding! 🚀**
