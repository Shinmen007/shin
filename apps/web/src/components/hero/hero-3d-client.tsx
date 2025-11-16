"use client";

import dynamic from "next/dynamic";

// Dynamically import Hero3D with no SSR to prevent hydration errors
const Hero3D = dynamic(
  () => import("./hero-3d").then((mod) => ({ default: mod.Hero3D })),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cyber-cyan/10 via-background to-cyber-magenta/10">
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyber-cyan border-r-cyber-magenta" style={{ animationDuration: '1.5s' }} />
            <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-cyber-magenta border-r-cyber-purple" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            <div className="absolute inset-4 animate-spin rounded-full border-2 border-transparent border-t-cyber-purple border-r-cyber-cyan" style={{ animationDuration: '1s' }} />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyber-cyan via-cyber-magenta to-cyber-purple animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-lg font-semibold text-foreground/90">
              Loading 3D experience
              <span className="animate-pulse">...</span>
            </div>
          </div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-cyber-cyan/30 blur-3xl" style={{ animationDuration: '3s' }} />
          <div className="absolute top-3/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-cyber-magenta/30 blur-3xl" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 right-1/3 h-32 w-32 animate-pulse rounded-full bg-cyber-purple/30 blur-3xl" style={{ animationDuration: '5s' }} />
        </div>
      </div>
    )
  }
);

export function Hero3DClient() {
  return <Hero3D />;
}
