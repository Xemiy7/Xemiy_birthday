"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { BookingTypeSelector } from "@/components/booking/booking-type-selector";
import { BookingSuccess } from "@/components/booking/booking-success";
import { FileUpload } from "@/components/booking/file-upload";
import {
  FormField,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/booking/form-field";
import { buttonVariants } from "@/components/ui/button";
import {
  budgetRanges,
  countries,
  PORTFOLIO_INTEREST_MESSAGE,
  preferredStyles,
  projectTypes,
} from "@/constants/booking";
import { uploadBookingFiles } from "@/lib/supabase/upload";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { BookingFormData, BookingType } from "@/types/booking";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface BookingFormProps {
  initialType?: BookingType;
  projectSlug?: string;
  projectTitle?: string;
}

type FormErrors = Partial<Record<keyof BookingFormData, string>>;

export function BookingForm({
  initialType = "new_project",
  projectSlug,
  projectTitle,
}: BookingFormProps) {
  const fromPortfolio = Boolean(projectSlug && projectTitle);

  const [bookingType, setBookingType] = useState<BookingType>(
    fromPortfolio ? "exact_design" : initialType,
  );
  const [form, setForm] = useState<BookingFormData>({
    bookingType: fromPortfolio ? "exact_design" : initialType,
    projectSlug,
    projectTitle,
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    budget: "",
    deadline: "",
    description: fromPortfolio ? PORTFOLIO_INTEREST_MESSAGE : "",
    preferredStyle: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [references, setReferences] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | undefined>();

  const update = <K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleTypeChange = (type: BookingType) => {
    setBookingType(type);
    update("bookingType", type);

    if (type === "exact_design" && fromPortfolio) {
      update("description", PORTFOLIO_INTEREST_MESSAGE);
    } else if (type === "new_project" && form.description === PORTFOLIO_INTEREST_MESSAGE) {
      update("description", "");
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.country) next.country = "Country is required.";
    if (!form.projectType) next.projectType = "Project type is required.";
    if (!form.budget) next.budget = "Budget is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.preferredStyle) next.preferredStyle = "Preferred style is required.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    if (!isSupabaseConfigured()) {
      setSubmitError(
        "Booking is not configured yet. Add Supabase keys to your environment.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const [attachmentUrls, referenceImageUrls] = await Promise.all([
        uploadBookingFiles(attachments, "attachments"),
        uploadBookingFiles(references, "references"),
      ]);

      const payload = {
        ...form,
        bookingType,
        projectSlug: bookingType === "exact_design" ? projectSlug : undefined,
        projectTitle: bookingType === "exact_design" ? projectTitle : undefined,
        attachmentUrls,
        referenceImageUrls,
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Submission failed.");
      }

      setBookingId(data.id);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <BookingSuccess name={form.name} bookingId={bookingId} />;
  }

  return (
    <m.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.cinematic, ease: easing.premium }}
      className="stack-xl"
    >
      {/* Portfolio context banner */}
      <AnimatePresence>
        {fromPortfolio && bookingType === "exact_design" && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-white/12 glass-strong px-5 py-4"
          >
            <p className="text-overline mb-1">Selected Project</p>
            <p className="text-title-sm">{projectTitle}</p>
            <p className="text-caption mt-1 text-muted-foreground">
              Your message has been pre-filled. Add any specific requirements below.
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <BookingTypeSelector
        value={bookingType}
        onChange={handleTypeChange}
        projectTitle={projectTitle}
      />

      {/* Personal info */}
      <div className="stack-md">
        <h3 className="text-title-sm border-b border-white/8 pb-3">Your Details</h3>
        <div className="grid-2 gap-4">
          <FormField label="Name" htmlFor="name" required error={errors.name}>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClassName}
              placeholder="Full name"
              autoComplete="name"
            />
          </FormField>

          <FormField label="Email" htmlFor="email" required error={errors.email}>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClassName}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </FormField>

          <FormField label="Phone" htmlFor="phone" required error={errors.phone}>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClassName}
              placeholder="+234 800 000 0000"
              autoComplete="tel"
            />
          </FormField>

          <FormField label="Country" htmlFor="country" required error={errors.country}>
            <select
              id="country"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={selectClassName}
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Project info */}
      <div className="stack-md">
        <h3 className="text-title-sm border-b border-white/8 pb-3">Project Brief</h3>
        <div className="grid-2 gap-4">
          <FormField
            label="Project Type"
            htmlFor="projectType"
            required
            error={errors.projectType}
          >
            <select
              id="projectType"
              value={form.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              className={selectClassName}
            >
              <option value="">Select type</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Budget" htmlFor="budget" required error={errors.budget}>
            <select
              id="budget"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={selectClassName}
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Deadline" htmlFor="deadline" className="col-span-full sm:col-span-1">
            <input
              id="deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => update("deadline", e.target.value)}
              className={inputClassName}
              min={new Date().toISOString().split("T")[0]}
            />
          </FormField>

          <FormField
            label="Preferred Style"
            htmlFor="preferredStyle"
            required
            error={errors.preferredStyle}
            className="col-span-full sm:col-span-1"
          >
            <select
              id="preferredStyle"
              value={form.preferredStyle}
              onChange={(e) => update("preferredStyle", e.target.value)}
              className={selectClassName}
            >
              <option value="">Select style</option>
              {preferredStyles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField
          label="Description"
          htmlFor="description"
          required
          error={errors.description}
        >
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={textareaClassName}
            placeholder="Tell me about your project, goals, and vision..."
          />
        </FormField>
      </div>

      {/* Uploads */}
      <div className="stack-md">
        <h3 className="text-title-sm border-b border-white/8 pb-3">Files</h3>
        <div className="grid-2 gap-6">
          <FileUpload
            label="Attachment"
            description="Briefs, brand guidelines, or project documents."
            files={attachments}
            onChange={setAttachments}
          />
          <FileUpload
            label="Reference Images"
            description="Visual references, mood boards, or inspiration."
            files={references}
            onChange={setReferences}
            accept="image/*"
          />
        </div>
      </div>

      {submitError && (
        <m.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-body-sm text-mono-200"
          role="alert"
        >
          {submitError}
        </m.p>
      )}

      <m.button
        type="submit"
        disabled={isSubmitting}
        whileTap={{ scale: 0.98 }}
        className={cn(
          buttonVariants({ variant: "primary", size: "xl" }),
          "w-full sm:w-auto",
          isSubmitting && "pointer-events-none opacity-70",
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-4" strokeWidth={1.5} />
            Submit Booking
          </>
        )}
      </m.button>
    </m.form>
  );
}
