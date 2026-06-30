import type { Metadata } from "next";
import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { BookingPage } from "@/components/booking/booking-page";

export const metadata: Metadata = createMetadata({
  title: "Book a Project",
  description:
    "Book an exact design from the xemiy portfolio or request a new custom project.",
  path: "/book",
});

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookingPage />
    </Suspense>
  );
}
