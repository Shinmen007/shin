/**
 * Performance optimization utilities to eliminate lag and ensure 60fps
 */

export interface PerformanceConfig {
  enableAnimations: boolean;
  particleCount: number;
  glowLayers: number;
  use3D: boolean;
  quality: 'low' | 'medium' | 'high';
}

class PerformanceManager {
  private config: PerformanceConfig = {
    enableAnimations: true,
    particleCount: 5000,
    glowLayers: 3,
    use3D: true,
    quality: 'high',
  };

  private fps = 60;
  private frameCount = 0;
  private lastTime = performance.now();

  constructor() {
    if (typeof window !== 'undefined') {
      this.detectPerformance();
      this.startMonitoring();
    }
  }

  /**
   * Detect device capabilities and set optimal config
   */
  private detectPerformance() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4; // GB

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const hasWebGL = !!gl;

    // Low-end device detection
    const isLowEnd = isMobile || cores < 4 || memory < 4;

    if (isLowEnd) {
      this.config = {
        enableAnimations: true,
        particleCount: 1000,
        glowLayers: 1,
        use3D: hasWebGL,
        quality: 'low',
      };
    } else if (cores >= 8 && memory >= 8) {
      // High-end device
      this.config = {
        enableAnimations: true,
        particleCount: 8000,
        glowLayers: 3,
        use3D: true,
        quality: 'high',
      };
    } else {
      // Mid-range device
      this.config = {
        enableAnimations: true,
        particleCount: 3000,
        glowLayers: 2,
        use3D: true,
        quality: 'medium',
      };
    }

    // Performance config set based on device capabilities
  }

  /**
   * Monitor FPS and adjust quality dynamically
   */
  private startMonitoring() {
    const measureFPS = () => {
      this.frameCount++;
      const now = performance.now();
      const delta = now - this.lastTime;

      if (delta >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / delta);
        this.frameCount = 0;
        this.lastTime = now;

        // Auto-adjust quality if FPS drops
        if (this.fps < 30 && this.config.quality !== 'low') {
          this.reduceQuality();
        }
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  /**
   * Reduce quality settings to maintain performance
   */
  private reduceQuality() {
    if (this.config.quality === 'high') {
      this.config.quality = 'medium';
      this.config.particleCount = 3000;
      this.config.glowLayers = 2;
      console.warn('⚡ Reduced to medium quality due to low FPS');
    } else if (this.config.quality === 'medium') {
      this.config.quality = 'low';
      this.config.particleCount = 1000;
      this.config.glowLayers = 1;
      console.warn('⚡ Reduced to low quality due to low FPS');
    }
  }

  /**
   * Get current config
   */
  getConfig(): PerformanceConfig {
    return { ...this.config };
  }

  /**
   * Get current FPS
   */
  getFPS(): number {
    return this.fps;
  }

  /**
   * Force set quality level
   */
  setQuality(quality: 'low' | 'medium' | 'high') {
    this.config.quality = quality;

    switch (quality) {
      case 'low':
        this.config.particleCount = 1000;
        this.config.glowLayers = 1;
        break;
      case 'medium':
        this.config.particleCount = 3000;
        this.config.glowLayers = 2;
        break;
      case 'high':
        this.config.particleCount = 8000;
        this.config.glowLayers = 3;
        break;
    }
  }
}

// Export singleton instance
export const performanceManager = new PerformanceManager();

/**
 * React hook for performance-aware components
 */
export function usePerformance() {
  const config = performanceManager.getConfig();

  return {
    ...config,
    fps: performanceManager.getFPS(),
    setQuality: (quality: 'low' | 'medium' | 'high') => performanceManager.setQuality(quality),
  };
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => setTimeout(cb, 1);

/**
 * Lazy load component when it enters viewport
 */
export function lazyLoadOnView(element: HTMLElement, callback: () => void) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  } else {
    // Fallback for browsers without IntersectionObserver
    callback();
    return () => {};
  }
}

/**
 * Preload critical assets
 */
export function preloadCriticalAssets() {
  const criticalAssets = [
    // Add critical asset URLs here
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap',
  ];

  criticalAssets.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = url.endsWith('.woff2') ? 'font' : 'style';
    link.href = url;
    if (url.endsWith('.woff2')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
