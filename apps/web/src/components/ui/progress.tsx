"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ value, max = 100, className = "", showPercentage = false }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="from-cyber-cyan to-cyber-magenta h-full rounded-full bg-gradient-to-r"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Animated gradient overlay for shine effect */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
      
      {showPercentage && (
        <div className="mt-1 text-right text-xs font-medium text-cyber-cyan">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
