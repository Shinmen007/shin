"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export function CyberpunkLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      animate={{
        boxShadow: [
          "0 0 20px rgba(0,245,255,0.5)",
          "0 0 30px rgba(255,0,255,0.8)",
          "0 0 20px rgba(0,245,255,0.5)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Hexagon background with data streams */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Outer hexagon with animated stroke */}
          <motion.path
            d="M 50,5 L 90,30 L 90,70 L 50,95 L 10,70 L 10,30 Z"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            animate={{
              pathLength: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Inner pulsing hexagon */}
          <motion.path
            d="M 50,15 L 80,35 L 80,65 L 50,85 L 20,65 L 20,35 Z"
            fill="rgba(0,245,255,0.1)"
            stroke="url(#gradient2)"
            strokeWidth="2"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "50px 50px" }}
          />
          {/* Circuit-like connecting lines */}
          <motion.line
            x1="50" y1="5" x2="50" y2="25"
            stroke="#00f5ff"
            strokeWidth="1.5"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.line
            x1="90" y1="30" x2="75" y2="40"
            stroke="#ff00ff"
            strokeWidth="1.5"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.25,
            }}
          />
          <motion.line
            x1="90" y1="70" x2="75" y2="60"
            stroke="#9d00ff"
            strokeWidth="1.5"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          {/* Data flow particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.circle
              key={i}
              r="2"
              fill="#00f5ff"
              filter="url(#glow)"
              animate={{
                cx: [
                  50 + Math.cos((angle * Math.PI) / 180) * 45,
                  50 + Math.cos((angle * Math.PI) / 180) * 20,
                ],
                cy: [
                  50 + Math.sin((angle * Math.PI) / 180) * 45,
                  50 + Math.sin((angle * Math.PI) / 180) * 20,
                ],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#9d00ff" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9d00ff" />
              <stop offset="50%" stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#00f5ff" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Cpu className="h-1/2 w-1/2 text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,245,255,1)] relative z-10" />
      </motion.div>
    </motion.div>
  );
}
