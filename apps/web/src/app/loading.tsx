"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Terminal } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative">
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-20 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, #00f5ff, #ff00ff, #b300ff)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main container */}
        <div className="relative flex flex-col items-center gap-8">
          {/* Rotating hexagon with CPU */}
          <div className="relative w-32 h-32">
            {/* Hexagon border */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.path
                d="M 50,5 L 90,30 L 90,70 L 50,95 L 10,70 L 10,30 Z"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="50%" stopColor="#ff00ff" />
                  <stop offset="100%" stopColor="#b300ff" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Center CPU icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cpu className="h-12 w-12 text-cyber-cyan drop-shadow-[0_0_20px_rgba(0,245,255,1)]" />
            </motion.div>

            {/* Orbiting particles */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                style={{
                  background: ['#00f5ff', '#ff00ff', '#b300ff'][i],
                  boxShadow: `0 0 10px ${['#00f5ff', '#ff00ff', '#b300ff'][i]}`,
                }}
                animate={{
                  rotate: [angle, angle + 360],
                  x: [0, 60 * Math.cos((angle * Math.PI) / 180), 0, -60 * Math.cos((angle * Math.PI) / 180), 0],
                  y: [0, 60 * Math.sin((angle * Math.PI) / 180), 0, -60 * Math.sin((angle * Math.PI) / 180), 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="flex items-center gap-3 font-mono text-xl font-black"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Terminal className="h-5 w-5 text-cyber-magenta" />
              <span className="bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent">
                INITIALIZING
              </span>
              <Zap className="h-5 w-5 text-cyber-cyan" />
            </motion.div>

            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-cyber-cyan"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    boxShadow: '0 0 10px #00f5ff',
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  boxShadow: '0 0 20px #00f5ff',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
