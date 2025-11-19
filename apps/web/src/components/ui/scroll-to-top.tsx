"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { smoothScrollToTop } from "@/lib/scroll-utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={smoothScrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "border-cyber-cyan/40 bg-background/80 text-cyber-cyan border-2 backdrop-blur-md",
        "shadow-cyber-cyan/20 shadow-lg transition-all duration-300",
        "hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-cyber-cyan/40 hover:scale-110 hover:shadow-xl",
        "focus-visible:ring-cyber-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />

      {/* Glow effect */}
      <div className="bg-cyber-cyan/20 pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-300 hover:opacity-100" />
    </button>
  );
}
