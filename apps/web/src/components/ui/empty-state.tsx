"use client";

import { Button } from "@/components/ui/button";
import { FileText, Search, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
  isSearch?: boolean;
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  actionLabel, 
  actionLink,
  onAction,
  isSearch = false 
}: EmptyStateProps) {
  const defaultIcon = isSearch ? (
    <Search className="text-cyber-cyan h-16 w-16 mx-auto mb-4" />
  ) : (
    <FileText className="text-cyber-cyan h-16 w-16 mx-auto mb-4" />
  );

  const actionButton = actionLink ? (
    <Link href={actionLink}>
      <Button
        variant="outline"
        className="hover:bg-cyber-cyan hover:text-background hover:border-cyber-cyan group relative overflow-hidden transition-all duration-300"
      >
        <span className="relative z-10">{actionLabel || "View All"}</span>
        <div className="from-cyber-cyan to-cyber-magenta absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
      </Button>
    </Link>
  ) : onAction ? (
    <Button
      variant="outline"
      className="hover:bg-cyber-cyan hover:text-background hover:border-cyber-cyan group relative overflow-hidden transition-all duration-300"
      onClick={onAction}
    >
      <RotateCcw className="mr-2 h-4 w-4" />
      {actionLabel || "Try Again"}
    </Button>
  ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-cyber-cyan/5 h-32 w-32 animate-pulse rounded-full blur-3xl" />
        </div>
      </div>

      {icon || defaultIcon}

      <motion.h3
        className="from-cyber-cyan to-cyber-magenta mb-3 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-muted-foreground mx-auto mb-8 max-w-md text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {description}
      </motion.p>

      {actionButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
        >
          {actionButton}
        </motion.div>
      )}
    </motion.div>
  );
}
