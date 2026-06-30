"use client";

import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/animations/text-reveal";

interface SectionHeaderProps {
  overline: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  overline,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "stack-md max-w-2xl",
        align === "center" && "mx-auto text-center items-center",
        className,
      )}
    >
      <p className="text-overline">{overline}</p>
      <TextReveal
        as="h2"
        text={title}
        className={cn(
          "text-display-md text-foreground",
          align === "center" && "justify-center",
        )}
      />
      {description && (
        <p className="text-body-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
