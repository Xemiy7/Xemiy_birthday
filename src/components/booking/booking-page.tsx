"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { m } from "framer-motion";
import { TextReveal } from "@/components/animations/text-reveal";
import { BookingForm } from "@/components/booking/booking-form";
import { PortfolioSkeletonGrid } from "@/components/portfolio/portfolio-skeleton";
import type { BookingType } from "@/types/booking";
import { easing, duration } from "@/lib/design-system";

function BookingContent() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const projectSlug = searchParams.get("project") ?? undefined;
  const projectTitle = searchParams.get("title") ?? undefined;
  const validType: BookingType =
    type === "exact_design" || (projectSlug && projectTitle)
      ? "exact_design"
      : "new_project";

  return (
    <BookingForm
      initialType={validType}
      projectSlug={projectSlug}
      projectTitle={projectTitle}
    />
  );
}

export function BookingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-28">
      <div className="grid-container">
        <m.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.cinematic, ease: easing.premium }}
          className="mb-12 max-w-2xl stack-md"
        >
          <p className="text-overline">Book a Project</p>
          <TextReveal
            as="h1"
            text="Let's Work Together"
            className="text-display-lg text-foreground"
          />
          <p className="text-body-lg text-muted-foreground">
            Whether you want an exact design from the portfolio or a completely
            new project — share your vision and I&apos;ll be in touch within 48 hours.
          </p>
        </m.header>

        <div className="max-w-3xl">
          <Suspense
            fallback={
              <div className="py-12">
                <PortfolioSkeletonGrid count={4} />
              </div>
            }
          >
            <BookingContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
