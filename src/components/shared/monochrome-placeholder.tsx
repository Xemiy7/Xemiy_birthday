import { cn } from "@/lib/utils";

interface MonochromePlaceholderProps {
  variant?: 1 | 2 | 3 | 4;
  className?: string;
  label?: string;
}

const variants = {
  1: "from-mono-800 via-mono-900 to-mono-1000",
  2: "from-mono-900 via-mono-800 to-mono-950",
  3: "from-mono-1000 via-mono-800 to-mono-900",
  4: "from-mono-950 via-mono-700 to-mono-1000",
};

export function MonochromePlaceholder({
  variant = 1,
  className,
  label,
}: MonochromePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-mono-900",
        className,
      )}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80",
          variants[variant],
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div className="absolute inset-0 bg-gradient-to-t from-mono-1000/40 via-transparent to-transparent" />
    </div>
  );
}
