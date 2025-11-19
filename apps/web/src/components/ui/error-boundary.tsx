"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ReactNode }>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{ fallback?: React.ReactNode }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="from-cyber-cyan/10 to-cyber-magenta/10 bg-gradient-to-r rounded-xl p-8 border border-border/40">
            <AlertTriangle className="text-cyber-cyan h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">Something went wrong</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              An error occurred while loading this content. Please try again.
            </p>
            <Button
              variant="outline"
              onClick={this.resetError}
              className="border-cyber-cyan/30 hover:bg-cyber-cyan hover:text-background hover:border-cyber-cyan group gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reload Content</span>
            </Button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
