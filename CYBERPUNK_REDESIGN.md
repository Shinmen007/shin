# 🌃 Cyberpunk Website Redesign

## Overview

This document describes the comprehensive cyberpunk-themed redesign of the portfolio website, featuring immersive 3D WebGL scenes, holographic UI components, dynamic asset loading, and an integrated audio system—all powered by assets fetched dynamically from the web.

---

## 🎨 Design Philosophy

### Core Principles

1. **Neon-Drenched Aesthetic**: Vibrant cyan, magenta, and purple color palette with glowing effects
2. **Dynamic Asset Loading**: All resources (fonts, images, sounds, 3D models) loaded from CDNs at runtime
3. **Cinematic Experience**: Page transitions, particle systems, and micro-interactions create a movie-like feel
4. **Performance-First**: Optimized for both desktop and mobile with adaptive quality settings
5. **Immersive Audio**: Optional sound effects and ambient music enhance the experience

### Color Palette

```css
--cyber-cyan: #00f5ff
--cyber-magenta: #ff00ff
--cyber-purple: #9d00ff
--cyber-success: #00ff88
--cyber-warning: #ffaa00
--cyber-error: #ff0055
```

---

## 🚀 New Features

### 1. Dynamic Asset Loader (`/src/lib/asset-loader.ts`)

Fetches all assets from public CDNs and web sources:

#### Supported Asset Types
- **Fonts**: Google Fonts (Orbitron, Rajdhani, Source Code Pro, Audiowide)
- **Images**: Textures, patterns, and backgrounds from jsdelivr and transparenttextures.com
- **3D Models**: GLTF/GLB models from Three.js examples
- **Audio**: Sound effects from Freesound
- **Icons**: SVG icons from Simple Icons

#### Usage Example

```typescript
import { loadImage, loadFont, preloadAssets, ASSET_URLS } from '@/lib/asset-loader';

// Load a single image
const texture = await loadImage(ASSET_URLS.images.gridTexture);

// Load a font
await loadFont(ASSET_URLS.fonts.orbitron);

// Preload multiple assets
await preloadAssets([
  { type: 'fonts', key: 'orbitron' },
  { type: 'images', key: 'particleTexture' },
  { type: 'audio', key: 'hover' },
]);
```

#### Asset Sources

- **Google Fonts**: https://fonts.googleapis.com/
- **Three.js CDN**: https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/
- **Simple Icons**: https://cdn.jsdelivr.net/npm/simple-icons@v9/
- **Transparent Textures**: https://www.transparenttextures.com/
- **Freesound**: https://cdn.freesound.org/ (ambient sounds and UI feedback)

---

### 2. Audio System (`/src/lib/audio-system.ts`)

Manages all audio for the website with user control.

#### Features
- ✅ Ambient background music (looped)
- ✅ UI sound effects (hover, click, success, error)
- ✅ Volume controls (master and ambient)
- ✅ Enable/disable toggle
- ✅ Respects browser autoplay policies

#### Usage Example

```typescript
import { audioSystem, useAudioSystem } from '@/lib/audio-system';

// In a React component
function MyComponent() {
  const { playHover, playClick, enable } = useAudioSystem();

  return (
    <button
      onMouseEnter={playHover}
      onClick={() => {
        playClick();
        enable(); // Enable audio system
      }}
    >
      Click me
    </button>
  );
}
```

#### Available Sounds
- `hover`: Subtle electronic beep (320655_5260872-lq.mp3)
- `click`: Crisp UI click (320652_5260872-lq.mp3)
- `ambient`: Cyberpunk atmosphere loop (445978_3797507-lq.mp3)
- `success`: Positive confirmation (320776_5260872-lq.mp3)
- `error`: Negative feedback (320775_5260872-lq.mp3)

---

### 3. WebGL Hero Scene (`/src/components/hero/cyberpunk-hero-3d.tsx`)

Immersive 3D scene with particle systems and holographic elements.

#### Components
1. **ParticleField**: 5,000 animated particles in a rotating sphere
2. **CyberpunkGrid**: Animated wireframe grid planes with depth
3. **HolographicSpheres**: Floating, rotating wireframe spheres with point lights
4. **OrbitControls**: Auto-rotating camera with user interaction

#### Features
- ✅ 60 FPS on desktop, 30 FPS on mobile (adaptive)
- ✅ WebGL renderer with antialiasing
- ✅ Additive blending for neon glow effects
- ✅ Fallback loading state with animated spinner

#### Usage

```tsx
import { CyberpunkHero3D } from '@/components/hero/cyberpunk-hero-3d';

<div className="relative w-full h-screen">
  <CyberpunkHero3D />
</div>
```

---

### 4. Enhanced UI Components

#### A. Holographic Buttons (`/src/components/ui/button.tsx`)

Three new button variants with advanced effects:

**Variants:**
- `holographic`: Magenta-themed with shimmer and animated gradients
- `plasma`: Purple/cyan gradient with pulsing glow
- `neon`: Cyan-bordered with corner brackets

**Props:**
```typescript
interface ButtonProps {
  variant: 'default' | 'neon' | 'holographic' | 'plasma';
  enableSound?: boolean;  // Play audio on interaction
  glowIntensity?: 'low' | 'medium' | 'high';  // Glow layer count
  showRipple?: boolean;  // Click ripple effect
}
```

**Example:**
```tsx
<Button
  variant="holographic"
  enableSound
  glowIntensity="high"
  size="lg"
>
  Launch Experience
</Button>
```

**Effects:**
- ✅ Animated gradient backgrounds (5s loop)
- ✅ Scanline overlay (0.5s)
- ✅ Corner accent brackets
- ✅ Multi-layer glow on hover (2-3 layers based on intensity)
- ✅ Shimmer sweep on hover (0.8s)

---

#### B. Cyberpunk Cards (`/src/components/ui/cyberpunk-card.tsx`)

Advanced 3D cards with mouse-tracking effects.

**Variants:**
- `default`: Standard card with subtle effects
- `holographic`: Full holographic treatment with gradients
- `neon`: Cyan-bordered with grid overlay
- `glass`: Glassmorphism with backdrop blur

**Props:**
```typescript
interface CyberpunkCardProps {
  variant?: 'default' | 'holographic' | 'neon' | 'glass';
  enable3D?: boolean;  // 3D rotation on mouse move
  enableSound?: boolean;  // Audio feedback
  glowColor?: 'cyan' | 'magenta' | 'purple' | 'multi';
  intensity?: 'low' | 'medium' | 'high';
}
```

**Example:**
```tsx
<CyberpunkCard
  variant="holographic"
  enable3D
  glowColor="multi"
  intensity="high"
  className="p-6"
>
  <h3>Project Title</h3>
  <p>Description...</p>
</CyberpunkCard>
```

**Effects:**
- ✅ 3D tilt following mouse position (±15deg)
- ✅ Dynamic spotlight glow tracking cursor
- ✅ Animated gradient background (8s loop)
- ✅ Scanline overlay (1s repeat)
- ✅ Corner brackets with pulsing animation
- ✅ Outer glow layers on hover (2-3 layers)

---

#### C. Audio Control Panel (`/src/components/ui/audio-control.tsx`)

Floating UI for managing audio settings.

**Features:**
- ✅ Master enable/disable toggle
- ✅ Effects volume slider (0-100%)
- ✅ Ambient music toggle and volume
- ✅ Real-time status indicator (ONLINE/OFFLINE)
- ✅ Animated gradient background
- ✅ Scanline effect overlay

**Location:** Fixed bottom-right corner (z-index: 50)

**Auto-initialization:** Audio system initializes on first user click (browser policy compliance)

---

#### D. Cinematic Page Transitions (`/src/components/ui/page-transition-cyberpunk.tsx`)

Smooth page transitions with loading overlay.

**Components:**
1. **CyberpunkPageTransition**: Fade transition wrapper
2. **CyberpunkTransitionOverlay**: Full-screen loading animation

**Overlay Features:**
- ✅ Animated scanlines filling screen (0.5s)
- ✅ Cyberpunk grid background
- ✅ Rotating hexagon loader with CPU icon
- ✅ Orbiting particles (3 rings)
- ✅ Loading text with animated dots
- ✅ Progress bar with gradient sweep
- ✅ Corner brackets

**Duration:** 1 second (adjustable)

---

### 5. Enhanced Page Layout (`/src/components/page-layout.tsx`)

Global layout with ambient effects.

**New Features:**
- ✅ Animated gradient orbs (floating background)
- ✅ Subtle grid pattern overlay
- ✅ Integrated audio control
- ✅ Cyberpunk page transitions
- ✅ Persistent navigation and footer

---

## 📦 Asset URLs Reference

All assets are loaded from public CDNs. See `/src/lib/asset-loader.ts` for the complete list.

### Fonts
```
https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap
https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap
https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600;700;800;900&display=swap
https://fonts.googleapis.com/css2?family=Audiowide&display=swap
```

### Textures
```
https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/uv_grid_opengl.jpg
https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/sprites/spark1.png
https://www.transparenttextures.com/patterns/hexellence.png
https://www.transparenttextures.com/patterns/carbon-fibre.png
```

### 3D Models (GLTF)
```
https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf
https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/RobotExpressive/RobotExpressive.gltf
```

### Audio (MP3)
```
https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3  (hover)
https://cdn.freesound.org/previews/320/320652_5260872-lq.mp3  (click)
https://cdn.freesound.org/previews/445/445978_3797507-lq.mp3  (ambient)
https://cdn.freesound.org/previews/320/320776_5260872-lq.mp3  (success)
https://cdn.freesound.org/previews/320/320775_5260872-lq.mp3  (error)
```

---

## 🎯 Usage Examples

### Complete Page with Cyberpunk Theme

```tsx
import { CyberpunkHero3D } from '@/components/hero/cyberpunk-hero-3d';
import { CyberpunkCard } from '@/components/ui/cyberpunk-card';
import { Button } from '@/components/ui/button';
import { useAudioSystem } from '@/lib/audio-system';

export default function Page() {
  const { playClick, enable } = useAudioSystem();

  return (
    <div className="relative">
      {/* Hero section with 3D scene */}
      <section className="relative h-screen">
        <CyberpunkHero3D />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-black gradient-text">
              Welcome to the Future
            </h1>
            <Button
              variant="holographic"
              size="lg"
              enableSound
              glowIntensity="high"
              onClick={() => {
                enable();
                playClick();
              }}
            >
              Enter the Matrix
            </Button>
          </div>
        </div>
      </section>

      {/* Content with cyberpunk cards */}
      <section className="container mx-auto py-20 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <CyberpunkCard variant="holographic" enable3D intensity="high">
            <h3 className="text-2xl font-bold mb-4">Project Alpha</h3>
            <p className="text-muted-foreground">
              Revolutionary blockchain platform...
            </p>
          </CyberpunkCard>

          <CyberpunkCard variant="neon" enable3D glowColor="cyan">
            <h3 className="text-2xl font-bold mb-4">Project Beta</h3>
            <p className="text-muted-foreground">
              AI-powered analytics engine...
            </p>
          </CyberpunkCard>

          <CyberpunkCard variant="glass" enable3D glowColor="purple">
            <h3 className="text-2xl font-bold mb-4">Project Gamma</h3>
            <p className="text-muted-foreground">
              Real-time collaboration suite...
            </p>
          </CyberpunkCard>
        </div>
      </section>
    </div>
  );
}
```

---

## 🔧 Performance Optimization

### Desktop (High-end)
- Full particle count (5,000)
- All glow layers enabled
- 60 FPS target
- High-resolution textures

### Mobile / Low-end
- Reduced particle count (2,000)
- Single glow layer
- 30 FPS target
- Compressed textures
- Reduced blur effects

### Adaptive Settings
The system automatically detects device capabilities and adjusts:
- `window.devicePixelRatio` for DPR
- `navigator.hardwareConcurrency` for CPU cores
- Canvas `dpr` prop set to `[1, 2]` for optimal quality

---

## 🎬 Animation Reference

### Keyframes
All custom animations are defined in `/src/styles/globals.css`:

- `float-slow`: Vertical float (4s, ease-in-out)
- `float-fast`: Quick float (2s, ease-in-out)
- `pulse-ring`: Expanding ring effect (2s, infinite)
- `shimmer`: Horizontal sweep (8s, linear)
- `text-shimmer`: Gradient text animation (4s, linear)
- `scan`: Vertical scanline (8s, linear)
- `rotate-gradient`: Full rotation (10s, linear)

---

## 🚨 Important Notes

### Browser Autoplay Policy
Audio will NOT play automatically. Users must interact with the page first (click, tap, etc.). The audio system initializes on the first user interaction.

### CORS Considerations
All CDN assets have proper CORS headers. If you encounter issues:
1. Verify the asset URL is accessible
2. Check browser console for CORS errors
3. Consider adding `crossOrigin="anonymous"` to image/audio elements

### Performance Tips
1. **Preload critical assets** during app initialization
2. **Lazy load** 3D scenes below the fold
3. **Use Suspense boundaries** for React Three Fiber components
4. **Monitor frame rates** with `useFrame` and adjust quality dynamically

---

## 📚 Additional Resources

- **Three.js Docs**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber/
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js App Router**: https://nextjs.org/docs/app

---

## 🎉 Credits

### Asset Sources
- **Fonts**: Google Fonts (Open Source)
- **3D Models**: Three.js Examples (MIT License)
- **Audio**: Freesound.org (Creative Commons)
- **Icons**: Simple Icons (CC0 License)
- **Patterns**: Transparent Textures (Free for commercial use)

### Libraries
- React 19
- Next.js 16
- Three.js + React Three Fiber + Drei
- Framer Motion
- Tailwind CSS + tailwindcss-animate
- Lucide React (icons)

---

## 🛠️ Troubleshooting

### Audio Not Playing
- Ensure user has interacted with the page
- Check browser console for autoplay policy errors
- Verify audio URLs are accessible
- Try enabling audio via the control panel

### 3D Scene Not Rendering
- Check WebGL support: `document.createElement('canvas').getContext('webgl')`
- Verify Three.js CDN is accessible
- Look for console errors in React Three Fiber
- Ensure `ssr: false` for dynamic imports

### Performance Issues
- Reduce particle count in `ParticleField`
- Lower glow intensity on cards/buttons
- Disable 3D rotation on cards
- Use `loading="lazy"` for images

---

**Last Updated**: November 19, 2025
**Version**: 2.0.0 (Cyberpunk Redesign)
