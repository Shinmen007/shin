"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const LOADING_TEXTS = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL NET...",
  "DECRYPTING DATA...",
  "ESTABLISHING UPLINK...",
  "BYPASSING FIREWALLS...",
  "COMPILING ASSETS...",
];

export function CyberpunkLoader({ className }: { className?: string }) {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[50vh] w-full bg-black/90 text-cyber-cyan relative overflow-hidden", className)}>
      
      {/* Background Grid/Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 245, 255, .3) 25%, rgba(0, 245, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 245, 255, .3) 75%, rgba(0, 245, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 245, 255, .3) 25%, rgba(0, 245, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 245, 255, .3) 75%, rgba(0, 245, 255, .3) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Central Reactor Core */}
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-cyber-cyan/30 rounded-full border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle Tech Ring */}
        <motion.div
          className="absolute inset-4 border-4 border-t-cyber-magenta border-r-transparent border-b-cyber-purple border-l-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Hexagon Spinner */}
        <motion.div 
          className="relative w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
           <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,245,255,0.8)]">
             <path 
               d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2"
               strokeDasharray="10 5"
             />
             <path 
               d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" 
               fill="rgba(0,245,255,0.1)" 
               stroke="currentColor" 
               strokeWidth="1"
             />
           </svg>
        </motion.div>

        {/* Center Core Pulse */}
        <motion.div
          className="absolute w-16 h-16 bg-cyber-cyan rounded-full blur-md"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Terminal Output Area */}
      <div className="w-80 font-mono text-sm relative z-10">
        <div className="flex justify-between items-end mb-2 border-b border-cyber-cyan/30 pb-1">
          <span className="font-bold tracking-wider text-cyber-magenta">SYSTEM.STATUS</span>
          <span className="text-xs animate-pulse">ONLINE</span>
        </div>

        <div className="h-8 relative overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={textIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center gap-2"
            >
              <span className="text-cyber-success">❯</span>
              {LOADING_TEXTS[textIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-black border border-cyber-cyan/50 rounded-sm overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-cyber-cyan shadow-[0_0_10px_#00f5ff]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
          {/* Striped overlay for progress */}
          <div 
            className="absolute inset-0 opacity-30" 
            style={{
              backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)',
              backgroundSize: '10px 10px'
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs mt-1 text-cyber-cyan/70">
          <span>[ MEM: {Math.floor(Math.random() * 4000) + 1000}MB ]</span>
          <span>{Math.min(Math.floor(progress), 100)}%</span>
        </div>
      </div>
    </div>
  );
}
