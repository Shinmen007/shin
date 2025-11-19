"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      if (typeof document !== "undefined") {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(scrolled);
        setIsVisible(scrollTop > 100);
      }
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-40 w-full bg-transparent">
      {/* Enhanced progress bar with glow effect */}
      <div className="relative h-1.5 bg-transparent">
        {/* Background track */}
        <div className="from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10 absolute inset-0 bg-gradient-to-r backdrop-blur-sm" />

        {/* Progress fill with enhanced effects */}
        <motion.div
          className="from-cyber-cyan via-cyber-magenta to-cyber-purple shadow-cyber-cyan/30 relative h-full bg-gradient-to-r shadow-lg"
          style={{ width: `${progress}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated glow effect */}
          <motion.div
            className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute inset-0 bg-gradient-to-r opacity-60 blur-sm"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pulse effect at the end */}
          {progress > 5 && (
            <motion.div
              className="bg-cyber-cyan absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: [`-${progress}%`, `${progress}%`],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            clipPath: `polygon(${progress}% 0%, ${progress}% 100%, ${progress + 2}% 100%, ${progress + 2}% 0%)`,
          }}
        />
      </div>

      {/* Progress percentage indicator */}
      <motion.div
        className="bg-background/80 border-border/40 text-cyber-cyan absolute right-4 top-2 rounded-md border px-2 py-1 text-xs font-medium shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isVisible && progress > 10 ? 1 : 0,
          y: isVisible && progress > 10 ? 0 : -10,
        }}
        transition={{ duration: 0.3 }}
      >
        {Math.round(progress)}%
      </motion.div>
    </div>
  );
}
