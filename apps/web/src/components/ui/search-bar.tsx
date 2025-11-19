"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearching?: boolean;
}

export function SearchBar({ value, onChange, placeholder = "Search...", isSearching = false }: SearchBarProps) {
  const handleClear = () => onChange("");
  
  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative group">
        <motion.div
          className="from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10 absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
          animate={{ opacity: value ? 0.3 : 0 }}
        />

        <Search className="text-muted-foreground group-focus-within:text-cyber-cyan absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 group-focus-within:scale-110 group-focus-within:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />

        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-background/80 border-border/60 focus:border-cyber-cyan/50 focus:ring-cyber-cyan/20 focus:bg-background/90 group-hover:border-cyber-cyan/30 group-focus-within:shadow-cyber-cyan/20 rounded-xl py-6 pl-12 pr-16 text-base transition-all duration-300 focus:ring-2 group-focus-within:shadow-lg"
        />

        {isSearching && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute right-10 top-1/2 -translate-y-1/2"
          >
            <Sparkles className="text-cyber-cyan h-4 w-4 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
          </motion.div>
        )}

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Search pulse effect */}
        {value && (
          <motion.div
            className="border-cyber-cyan/30 absolute inset-0 rounded-xl border-2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}
