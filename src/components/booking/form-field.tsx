"use client";

import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

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
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn("stack-xs", className)}>
      <label htmlFor={htmlFor} className="text-overline">
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </label>
      <div className="relative">
        {children}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <m.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: duration.fast, ease: easing.premium }}
            className="text-caption text-mono-300"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Re-export field styles from ui/input for backward compatibility
export {
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/ui/input";
