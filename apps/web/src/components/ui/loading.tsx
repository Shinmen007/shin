"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = "md", text, className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  const innerSizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 gap-4", className)}>
      <motion.div
        className={cn("from-cyber-cyan to-cyber-magenta rounded-full border-4 border-border/40", sizeClasses[size])}
        animate={{ 
          rotate: 360,
          rotateZ: 360,
          boxShadow: [
            "0 0 0 0 rgba(0, 245, 255, 0.5)",
            "0 0 0 10px rgba(255, 0, 255, 0.2)",
            "0 0 0 20px rgba(0, 245, 255, 0)"
          ]
        }}
        transition={{
          rotate: { duration: 1, repeat: Infinity, ease: "linear" },
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className={cn("from-cyber-cyan to-cyber-magenta absolute inset-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-20 blur-sm", innerSizeClasses[size])} />
      </motion.div>
      {text && (
        <div className="text-cyber-cyan text-sm font-medium">{text}</div>
      )}
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="border-border/40 bg-background/50 rounded-xl border backdrop-blur-sm h-80 animate-pulse"
        >
          <div className="p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-10 bg-muted rounded w-1/4 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
