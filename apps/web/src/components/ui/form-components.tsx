import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  showSuccess?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      showSuccess = false,
      leftIcon,
      rightIcon,
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-500">{leftIcon}</span>
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "flex h-11 w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-3 py-2 text-white transition-all duration-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
              showSuccess && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20",
              "hover:border-slate-500/70",
              className
            )}
            {...props}
          />

          {rightIcon && !error && !showSuccess && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-500">{rightIcon}</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          )}

          {showSuccess && !error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
          )}
        </div>

        {error && (
          <p className="flex items-center gap-1 text-sm text-red-400">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}

        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  charCount?: number;
  containerClassName?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      showCharCount = false,
      maxLength,
      charCount = 0,
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-300">
            {label}
            {required && <span className="ml-1 text-red-400">*</span>}
          </label>
          {showCharCount && maxLength && (
            <span className="text-xs text-slate-500">
              {charCount}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[120px] w-full resize-none rounded-lg border border-slate-600/50 bg-slate-700/30 px-3 py-2 text-white transition-all duration-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            "hover:border-slate-500/70",
            className
          )}
          {...props}
        />

        {error && (
          <p className="flex items-center gap-1 text-sm text-red-400">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}

        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  containerClassName?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      required = false,
      options,
      placeholder = "Select an option",
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>

        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-600/50 bg-slate-700/30 px-3 py-2 text-white transition-all duration-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            "hover:border-slate-500/70",
            "bg-[right_0.5rem_center] bg-no-repeat",
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundSize: "1.5em 1.5em",
          }}
          {...props}
        >
          <option value="" disabled className="text-slate-500">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-slate-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="flex items-center gap-1 text-sm text-red-400">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const FormSubmitButton = React.forwardRef<HTMLButtonElement, FormSubmitButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText = "Processing...",
      icon,
      loadingIcon,
      variant = "primary",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white",
      outline: "border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            {loadingIcon || (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {loadingText}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {icon}
            {children}
          </span>
        )}
      </button>
    );
  }
);

FormSubmitButton.displayName = "FormSubmitButton";
