import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "default" | "text" | "circular" | "image";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "loading-shimmer rounded-md bg-mono-800",
        variant === "text" && "h-4 w-full max-w-xs rounded-sm",
        variant === "circular" && "size-10 rounded-full",
        variant === "image" && "image-landscape w-full rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
