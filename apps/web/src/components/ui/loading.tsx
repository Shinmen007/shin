"use client";

import { CyberpunkLoader } from "@/components/ui/cyberpunk-loader";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

// Backward compatibility wrapper for simple spinner use cases
export function LoadingSpinner({ size = "md", text, className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "scale-50",
    md: "scale-75",
    lg: "scale-100"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className={cn("transform", sizeClasses[size])}>
        <CyberpunkLoader className="min-h-[200px] bg-transparent" />
      </div>
      {text && (
        <div className="text-cyber-cyan text-sm font-medium mt-4 animate-pulse">{text}</div>
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
          className="border-border/40 bg-background/50 rounded-xl border backdrop-blur-sm h-80 relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />
          
          <div className="p-6 space-y-4 opacity-50">
            <div className="h-6 bg-cyber-cyan/20 rounded w-3/4" />
            <div className="h-4 bg-cyber-magenta/20 rounded w-full" />
            <div className="h-4 bg-cyber-purple/20 rounded w-5/6" />
            <div className="h-10 bg-white/10 rounded w-1/4 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
