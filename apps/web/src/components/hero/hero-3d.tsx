"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import GalaxyScene from "./galaxy-scene";

interface Hero3DProps {
  className?: string;
}

// Loading fallback component
function LoadingFallback() {
  return (
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
  );
}

export function Hero3D({ className }: Hero3DProps) {
  const [hasError, setHasError] = useState(false);

  // Fallback if WebGL or 3D rendering fails
  if (hasError) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cyber-cyan/10 via-background to-cyber-magenta/10">
          {/* Static animated background as fallback */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-cyber-cyan/30 blur-3xl" style={{ animationDuration: '3s' }} />
            <div className="absolute top-3/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-cyber-magenta/30 blur-3xl" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/2 right-1/3 h-32 w-32 animate-pulse rounded-full bg-cyber-purple/30 blur-3xl" style={{ animationDuration: '5s' }} />
            <div className="absolute top-1/3 left-1/2 h-40 w-40 animate-pulse rounded-full bg-cyber-cyan/20 blur-3xl" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 5, 25], fov: 75 }}
          dpr={[1, 2]} // Limit pixel ratio for performance
          performance={{ min: 0.5 }} // Adaptive performance
          className="touch-none" // Prevent touch interference
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            // Prevent context loss
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            // Handle context loss
            gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              console.warn('WebGL context lost. Attempting to restore...');
              setHasError(true);
            });

            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored.');
              setHasError(false);
            });
          }}
          onError={() => {
            console.error('WebGL rendering error');
            setHasError(true);
          }}
        >
          <GalaxyScene />
        </Canvas>
      </Suspense>

      {/* Accessibility: Provide context */}
      <div className="sr-only">
        Interactive 3D galaxy visualization with swirling particle nebula effects
      </div>
    </div>
  );
}
