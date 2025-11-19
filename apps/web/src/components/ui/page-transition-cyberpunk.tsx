"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Cpu, Zap, Terminal } from "lucide-react";

export function CyberpunkPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
          exit: {
            opacity: 0,
          },
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Cyberpunk loading overlay with glitch effects
 */
export function CyberpunkTransitionOverlay() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated scanlines */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, originY: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Cyberpunk grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}
            />

            {/* Animated scanlines */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
              }}
              animate={{
                y: [0, 32],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 -m-12 rounded-full border-4 border-cyber-cyan/30"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />

                {/* Middle ring */}
                <motion.div
                  className="absolute inset-0 -m-8 rounded-full border-4 border-cyber-magenta/30"
                  animate={{
                    rotate: -360,
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                  }}
                />

                {/* Inner hexagon */}
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <motion.path
                      d="M 50,5 L 90,30 L 90,70 L 50,95 L 10,70 L 10,30 Z"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f5ff" />
                        <stop offset="50%" stopColor="#ff00ff" />
                        <stop offset="100%" stopColor="#9d00ff" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Central CPU icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Cpu className="h-10 w-10 text-cyber-cyan drop-shadow-[0_0_20px_rgba(0,245,255,1)]" />
                  </motion.div>
                </div>

                {/* Orbiting particles */}
                <motion.div
                  className="absolute top-1/2 left-1/2"
                  style={{ x: '-50%', y: '-50%' }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_10px_rgba(0,245,255,1)]"
                    style={{ x: 50, y: 0 }}
                  />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2"
                  style={{ x: '-50%', y: '-50%' }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyber-magenta shadow-[0_0_10px_rgba(255,0,255,1)]"
                    style={{ x: -40, y: 0 }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
              className="absolute bottom-32 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Terminal className="h-5 w-5 text-cyber-cyan" />
                </motion.div>

                <div className="text-xl font-black tracking-wider" style={{ fontFamily: 'monospace' }}>
                  <span className="bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent">
                    LOADING
                  </span>
                  <motion.span
                    className="inline-block ml-1"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    ...
                  </motion.span>
                </div>

                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Zap className="h-5 w-5 text-cyber-magenta" />
                </motion.div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </motion.div>

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-cyber-cyan/40" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-cyber-cyan/40" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-cyber-cyan/40" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-cyber-cyan/40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
