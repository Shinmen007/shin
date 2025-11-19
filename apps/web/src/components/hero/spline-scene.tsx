"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Lazy load Spline to avoid SSR issues
const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay Spline loading until after initial render
    const timer = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Main Spline container - Full background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="relative w-full h-full"
      >
        {shouldLoad ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-full opacity-30">
                <div className="relative">
                  {/* Minimal loading animation */}
                  <div className="w-12 h-12 rounded-full border-2 border-cyber-cyan/30 border-t-cyber-cyan animate-spin" />
                </div>
              </div>
            }
          >
            <Spline
              scene="https://prod.spline.design/u5nO9AcOvzh4Ytpu/scene.splinecode"
              className="w-full h-full"
            />
          </Suspense>
        ) : (
          <div className="w-full h-full bg-black" />
        )}

        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/70 via-transparent to-black/50" />

        {/* Cyberpunk scan line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.3) 2px, rgba(0,245,255,0.3) 4px)',
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
