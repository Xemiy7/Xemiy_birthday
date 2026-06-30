import { cn } from "@/lib/utils";

type LoadingVariant = "spinner" | "dots" | "pulse" | "shimmer";

interface LoadingProps {
  variant?: LoadingVariant;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
} as const;

export function Loading({
  variant = "spinner",
  label = "Loading",
  className,
  size = "md",
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {variant === "spinner" && (
        <span className={cn("loading-spinner", sizeMap[size])} />
      )}
      {variant === "dots" && (
        <span className="loading-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      )}
      {variant === "pulse" && (
        <span
          className={cn(
            "rounded-full bg-mono-400 loading-pulse",
            sizeMap[size],
          )}
        />
      )}
      {variant === "shimmer" && (
        <span className={cn("loading-shimmer rounded-md", sizeMap[size], "w-16")} />
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface LoadingOverlayProps {
  label?: string;
  className?: string;
}

export function LoadingOverlay({
  label = "Loading content",
  className,
}: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center glass-strong",
        className,
      )}
    >
      <Loading variant="dots" size="md" label={label} />
    </div>
  );
}

interface LoadingScreenProps {
  label?: string;
}

export function LoadingScreen({ label = "Loading" }: LoadingScreenProps) {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center stack-md">
      <Loading variant="spinner" size="lg" label={label} />
      <p className="text-overline">{label}</p>
    </div>
  );
}
