"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "./ui/scroll-to-top";
import { ErrorBoundary } from "./ui/error-boundary";
import { CyberpunkPageTransition, CyberpunkTransitionOverlay } from "./ui/page-transition-cyberpunk";
import { AudioControl } from "./ui/audio-control";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        {/* Cyberpunk ambient background effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-magenta/5 rounded-full blur-3xl animate-float-fast" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <Navbar />
        <main className="flex-1 relative z-10">
          <CyberpunkPageTransition>{children}</CyberpunkPageTransition>
        </main>
        <Footer />

        {/* Floating UI Elements */}
        <ScrollToTop />
        <AudioControl />

        {/* Page transition overlay */}
        <CyberpunkTransitionOverlay />
      </div>
    </ErrorBoundary>
  );
}
