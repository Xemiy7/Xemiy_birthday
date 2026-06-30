"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface BookingSuccessProps {
  name: string;
  bookingId?: string;
}

export function BookingSuccess({ name, bookingId }: BookingSuccessProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center stack-lg px-6"
    >
      {/* Animated rings */}
      <div className="relative flex size-28 items-center justify-center">
        <m.div
          className="absolute inset-0 rounded-full border border-white/10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <m.div
          className="absolute inset-0 rounded-full border border-white/15"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 1.8,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        <m.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="relative flex size-20 items-center justify-center rounded-full bg-foreground"
        >
          <m.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Check className="size-9 text-background" strokeWidth={2} />
          </m.div>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.6, duration: duration.cinematic, ease: easing.premium }}
        className="stack-md max-w-md"
      >
        <h2 className="text-display-md">Request Received</h2>
        <p className="text-body-lg text-muted-foreground">
          Thank you, {name}. Your booking has been submitted successfully.
          I&apos;ll review your brief and respond within 48 hours.
        </p>
        {bookingId && (
          <p className="text-mono text-caption">
            Reference: {bookingId.slice(0, 8).toUpperCase()}
          </p>
        )}
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: duration.slow, ease: easing.premium }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Link href="/work" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
          View Portfolio
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
          Back Home
        </Link>
      </m.div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <m.span
          key={i}
          className="pointer-events-none absolute size-1 rounded-full bg-white/30"
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            delay: 0.5 + i * 0.08,
            duration: 1.5,
            ease: "easeOut",
          }}
          style={{
            left: "50%",
            top: "40%",
          }}
          aria-hidden
        />
      ))}
    </m.div>
  );
}
