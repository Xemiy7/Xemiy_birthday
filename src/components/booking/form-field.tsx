"use client";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("stack-xs", className)}>
      <label htmlFor={htmlFor} className="text-overline">
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </label>
      {children}
      {error && <p className="text-caption text-mono-300">{error}</p>}
    </div>
  );
}

export const inputClassName = cn(
  "w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3",
  "text-body-sm text-foreground placeholder:text-muted-foreground",
  "transition-premium outline-none",
  "focus:border-white/25 focus:bg-white/6",
);

export const selectClassName = cn(inputClassName, "cursor-pointer appearance-none");

export const textareaClassName = cn(inputClassName, "min-h-[140px] resize-y");
