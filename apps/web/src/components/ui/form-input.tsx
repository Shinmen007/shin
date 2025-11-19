"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, Eye, EyeOff } from "lucide-react";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  showValidation?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { className, type, label, error, success, helperText, showValidation = false, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const hasValue = props.value !== undefined && props.value !== "";
    const showSuccess = success && hasValue && !error;
    const showError = error && hasValue;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            className={cn(
              "text-sm font-medium leading-none transition-colors duration-200",
              showError ? "text-cyber-error" : showSuccess ? "text-cyber-cyan" : "text-foreground"
            )}
          >
            {label}
            {props.required && <span className="text-cyber-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "bg-background/50 flex h-11 w-full rounded-lg border-2 px-4 py-2 text-sm",
              "backdrop-blur-sm transition-all duration-300",
              "placeholder:text-muted-foreground/50",
              "focus:outline-none focus:ring-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              showError
                ? "border-cyber-error/50 focus:border-cyber-error focus:ring-cyber-error/20"
                : showSuccess
                  ? "border-cyber-cyan/50 focus:border-cyber-cyan focus:ring-cyber-cyan/20"
                  : "border-border/40 focus:border-cyber-cyan focus:ring-cyber-cyan/20",
              showError && "pr-10",
              showSuccess && showValidation && "pr-10",
              isPassword && "pr-12",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Validation icons */}
          {showValidation && hasValue && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {showError ? (
                <AlertCircle className="text-cyber-error animate-in zoom-in-50 h-5 w-5 duration-200" />
              ) : showSuccess ? (
                <Check className="text-cyber-cyan animate-in zoom-in-50 h-5 w-5 duration-200" />
              ) : null}
            </div>
          )}

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2",
                "hover:text-foreground transition-colors duration-200",
                "focus:text-cyber-cyan focus:outline-none"
              )}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}

          {/* Glow effect on focus */}
          {isFocused && !showError && (
            <div className="from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 animate-in fade-in-0 pointer-events-none absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r opacity-50 blur-xl duration-300" />
          )}
        </div>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <p
            className={cn(
              "animate-in slide-in-from-top-1 text-xs duration-200",
              showError ? "text-cyber-error" : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
