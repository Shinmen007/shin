"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success: "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan backdrop-blur-xl",
        error: "border-cyber-error/50 bg-cyber-error/10 text-cyber-error backdrop-blur-xl",
        warning: "border-cyber-warning/50 bg-cyber-warning/10 text-cyber-warning backdrop-blur-xl",
        info: "border-cyber-purple/50 bg-cyber-purple/10 text-cyber-purple backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
}

interface ToastProps extends VariantProps<typeof toastVariants> {
  toast: Toast;
  onClose: () => void;
}

export function Toast({ toast, variant, onClose }: ToastProps) {
  React.useEffect(() => {
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  return (
    <div
      className={cn(
        toastVariants({ variant: toast.variant || variant }),
        "animate-in slide-in-from-right-full fade-in-0 duration-300"
      )}
    >
      <div className="grid gap-1">
        {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
        {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
      </div>
      <button
        onClick={onClose}
        className="text-foreground/50 hover:text-foreground absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-20">
        <div
          className="animate-in fade-in-0 h-full bg-current opacity-60"
          style={{
            animation: `shrink ${toast.duration || 5000}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Make toast functions available globally
  React.useEffect(() => {
    (window as any).toast = {
      success: (title: string, description?: string) =>
        addToast({ title, description, variant: "success" }),
      error: (title: string, description?: string) =>
        addToast({ title, description, variant: "error" }),
      warning: (title: string, description?: string) =>
        addToast({ title, description, variant: "warning" }),
      info: (title: string, description?: string) =>
        addToast({ title, description, variant: "info" }),
      message: (title: string, description?: string) =>
        addToast({ title, description, variant: "default" }),
    };
  }, [addToast]);

  return (
    <>
      {children}
      <div className="pointer-events-none fixed right-0 top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-4 p-4 sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </>
  );
}

// Add keyframe animation for progress bar
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;
  document.head.appendChild(style);
}
