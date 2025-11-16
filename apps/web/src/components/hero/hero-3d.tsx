"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GalaxyScene from "./galaxy-scene";

interface Hero3DProps {
  className?: string;
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="from-cyber-cyan/10 via-background to-cyber-magenta/10 relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br">
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative h-16 w-16 sm:h-24 sm:w-24">
          <div
            className="border-t-cyber-cyan border-r-cyber-magenta absolute inset-0 animate-spin rounded-full border-2 border-transparent"
            style={{ animationDuration: "1.5s" }}
          />
          <div
            className="border-t-cyber-magenta border-r-cyber-purple absolute inset-2 animate-spin rounded-full border-2 border-transparent"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          />
          <div
            className="border-t-cyber-purple border-r-cyber-cyan absolute inset-4 animate-spin rounded-full border-2 border-transparent"
            style={{ animationDuration: "1s" }}
          />
          <div className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute inset-6 animate-pulse rounded-full bg-gradient-to-br sm:inset-8" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-foreground/90 text-base font-semibold sm:text-lg">
            Loading 3D experience
            <span className="animate-pulse">...</span>
          </div>
        </div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="bg-cyber-cyan/30 absolute left-1/4 top-1/4 h-24 w-24 animate-pulse rounded-full blur-3xl sm:h-32 sm:w-32"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="bg-cyber-magenta/30 absolute right-1/4 top-3/4 h-24 w-24 animate-pulse rounded-full blur-3xl sm:h-32 sm:w-32"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="bg-cyber-purple/30 absolute right-1/3 top-1/2 h-24 w-24 animate-pulse rounded-full blur-3xl sm:h-32 sm:w-32"
          style={{ animationDuration: "5s" }}
        />
      </div>
    </div>
  );
}

export function Hero3D({ className }: Hero3DProps) {
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fallback if WebGL or 3D rendering fails
  if (hasError) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <div className="from-cyber-cyan/10 via-background to-cyber-magenta/10 relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br">
          {/* Static animated background as fallback */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="bg-cyber-cyan/30 absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full blur-3xl"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="bg-cyber-magenta/30 absolute right-1/4 top-3/4 h-32 w-32 animate-pulse rounded-full blur-3xl"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="bg-cyber-purple/30 absolute right-1/3 top-1/2 h-32 w-32 animate-pulse rounded-full blur-3xl"
              style={{ animationDuration: "5s" }}
            />
            <div
              className="bg-cyber-cyan/20 absolute left-1/2 top-1/3 h-40 w-40 animate-pulse rounded-full blur-3xl"
              style={{ animationDuration: "6s" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 5, 28], fov: 75, far: 200 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile for better performance
          performance={{ min: 0.5, max: 1 }} // Adaptive performance
          className="touch-none" // Prevent touch interference
          gl={{
            antialias: !isMobile, // Disable antialiasing on mobile for performance
            alpha: true,
            powerPreference: isMobile ? "default" : "high-performance", // Use default power on mobile to save battery
            // Prevent context loss
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            // Handle context loss
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault();
              console.warn("WebGL context lost. Attempting to restore...");
              setHasError(true);
            });

            gl.domElement.addEventListener("webglcontextrestored", () => {
              console.log("WebGL context restored.");
              setHasError(false);
            });
          }}
          onError={() => {
            console.error("WebGL rendering error");
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
