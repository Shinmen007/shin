"use client";

import { Button } from "@/components/ui/button";
import { Accessibility, Contrast, Moon, Sun, Zap, Volume2, Text } from "lucide-react";

export function AccessibilityMenu() {
  // Client-side only operations
  const toggleHighContrast = () => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle('high-contrast');
    }
  };

  const toggleDarkMode = () => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
      } else {
        html.classList.add('dark');
      }
    }
  };

  const toggleFontSize = () => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      const currentSize = parseFloat(getComputedStyle(root).fontSize);
      root.style.fontSize = currentSize > 18 ? '16px' : '18px';
    }
  };

  const toggleReducedMotion = () => {
    if (typeof document !== "undefined") {
      const body = document.body;
      body.classList.toggle('reduced-motion', !body.classList.contains('reduced-motion'));
    }
  };

  // Safe checks for SSR
  const isDarkMode = typeof document !== "undefined" ? document.documentElement.classList.contains('dark') : false;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="from-background/90 to-background/70 border-border/40 flex flex-col rounded-lg border bg-gradient-to-br p-2 backdrop-blur-xl shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-2 font-medium"
          onClick={toggleHighContrast}
        >
          <Contrast className="h-4 w-4" />
          <span className="text-xs">High Contrast</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-2 font-medium"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 
            <Sun className="h-4 w-4" /> : 
            <Moon className="h-4 w-4" />
          }
          <span className="text-xs">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-2 font-medium"
          onClick={toggleFontSize}
        >
          <Text className="h-4 w-4" />
          <span className="text-xs">Font Size</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-2 font-medium"
          onClick={toggleReducedMotion}
        >
          <Zap className="h-4 w-4" />
          <span className="text-xs">Reduce Motion</span>
        </Button>
      </div>
    </div>
  );
}
