"use client";

import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const inputClassName = "field-control";

export const textareaClassName = cn(inputClassName, "min-h-[140px] resize-y");

export const selectClassName = cn(
  inputClassName,
  "cursor-pointer bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
  "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23a3a3a3%22 stroke-width=%221.5%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')]",
);

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(inputClassName, "pressable", className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

type TextareaProps = ComponentProps<"textarea"> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(textareaClassName, className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

type SelectProps = ComponentProps<"select"> & { invalid?: boolean };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(selectClassName, "pressable", className)}
      {...props}
    />
  ),
);
Select.displayName = "Select";
