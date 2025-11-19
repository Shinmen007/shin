"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated data bars with neon glow
 */
export function DataBars({ data, className }: { data: { label: string; value: number; max?: number }[]; className?: string }) {
  const maxValue = Math.max(...data.map(d => d.value), ...data.map(d => d.max || 0));

  return (
    <div className={cn("space-y-4", className)}>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;

        return (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-cyber-cyan" style={{ fontFamily: 'monospace' }}>
                {item.label.toUpperCase()}
              </span>
              <span className="text-xs text-cyber-magenta font-mono">
                {item.value}%
              </span>
            </div>

            <div className="relative h-3 bg-black/50 rounded-full overflow-hidden border border-cyber-cyan/30">
              {/* Animated fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{
                  delay: index * 0.1,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  boxShadow: '0 0 20px rgba(0,245,255,0.6), inset 0 0 10px rgba(255,255,255,0.3)',
                }}
              />

              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 bg-cyber-cyan/20 rounded-full"
                style={{ width: `${percentage}%` }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Scanline effect */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)',
                  width: `${percentage}%`,
                }}
                animate={{
                  x: [0, 16],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Circular progress indicator
 */
export function CircularProgress({
  value,
  max = 100,
  size = 120,
  label,
  className,
}: {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={45}
          fill="none"
          stroke="rgba(0,245,255,0.1)"
          strokeWidth="8"
        />

        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="50%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#9d00ff" />
          </linearGradient>
        </defs>

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={45}
          fill="none"
          stroke={`url(#gradient-${label})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0,245,255,0.8))',
          }}
        />
      </svg>

      {/* Rotating outer ring */}
      <motion.svg
        className="absolute inset-0"
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={55}
          fill="none"
          stroke="rgba(0,245,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </motion.svg>

      {/* Center content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="text-3xl font-black text-cyber-cyan"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(0,245,255,1)' }}
        >
          {Math.round(percentage)}%
        </motion.div>
        {label && (
          <div className="text-xs text-gray-400 mt-1 font-mono">
            {label.toUpperCase()}
          </div>
        )}
      </div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyber-cyan opacity-0"
        animate={{
          scale: [1, 1.2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </div>
  );
}

/**
 * Stat counter with animated numbers
 */
export function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration * 60); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <motion.div
      className={cn("text-center space-y-2", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-5xl font-black gradient-text" style={{ fontFamily: 'monospace' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-400 font-semibold tracking-wider">
        {label.toUpperCase()}
      </div>

      {/* Animated underline */}
      <motion.div
        className="h-1 bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple rounded-full mx-auto"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </motion.div>
  );
}

/**
 * Live data feed simulation
 */
export function LiveDataFeed({ className }: { className?: string }) {
  const [logs, setLogs] = useState<{ id: number; text: string; type: 'info' | 'success' | 'error' }[]>([]);

  const logMessages = [
    { text: 'System online - All modules operational', type: 'success' as const },
    { text: 'Initializing neural network...', type: 'info' as const },
    { text: 'Quantum encryption activated', type: 'success' as const },
    { text: 'Warning: High data throughput detected', type: 'error' as const },
    { text: 'Establishing secure connection', type: 'info' as const },
    { text: 'Blockchain verification complete', type: 'success' as const },
    { text: 'AI model training in progress...', type: 'info' as const },
  ];

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      const message = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs(prev => [{ id: id++, ...message }, ...prev].slice(0, 8));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const typeColors = {
    info: 'text-cyber-cyan',
    success: 'text-cyber-success',
    error: 'text-cyber-error',
  };

  return (
    <div className={cn("bg-black/80 border-2 border-cyber-cyan/30 rounded-xl p-4 backdrop-blur-xl overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 border-b border-cyber-cyan/30 pb-3">
        <motion.div
          className="w-3 h-3 rounded-full bg-cyber-cyan"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <span className="text-sm font-bold text-cyber-cyan" style={{ fontFamily: 'monospace' }}>
          LIVE DATA STREAM
        </span>
      </div>

      {/* Logs */}
      <div className="space-y-2 font-mono text-xs">
        {logs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex gap-2", typeColors[log.type])}
            style={{ opacity: 1 - index * 0.1 }}
          >
            <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
            <span>{log.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
        }}
        animate={{
          y: [0, 16],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
