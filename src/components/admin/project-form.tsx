"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/admin/image-uploader";
import {
  inputClassName,
  selectClassName,
  textareaClassName,
  FormField,
} from "@/components/booking/form-field";
import { buttonVariants } from "@/components/ui/button";
import { ADMIN_CATEGORIES, ADMIN_SIZES, parseSoftware, parseTags, slugify } from "@/lib/admin/utils";
import type { AdminProject } from "@/types/admin";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ProjectFormProps {
  initial?: Partial<AdminProject>;
  projectId?: string;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  long_description: "",
  category: "Branding",
  client: "",
  year: new Date().getFullYear(),
  software: "",
  tags: "",
  cover_image: "",
  gallery_images: [] as string[],
  before_image: "",
  after_image: "",
  featured: false,
  size: "medium" as const,
  likes_seed: 0,
  published: true,
};

export function ProjectForm({ initial, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    ...emptyForm,
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    long_description: initial?.long_description ?? "",
    category: initial?.category ?? "Branding",
    client: initial?.client ?? "",
    year: initial?.year ?? new Date().getFullYear(),
    software: initial?.software?.join(", ") ?? "",
    tags: initial?.tags?.join(", ") ?? "",
    cover_image: initial?.cover_image ?? "",
    gallery_images: initial?.gallery_images ?? [],
    before_image: initial?.before_image ?? "",
    after_image: initial?.after_image ?? "",
    featured: initial?.featured ?? false,
    size: initial?.size ?? "medium",
    likes_seed: initial?.likes_seed ?? 0,
    published: initial?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !projectId) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      software: parseSoftware(form.software),
      tags: parseTags(form.tags),
      slug: form.slug || slugify(form.title),
    };

    try {
      const url = projectId
        ? `/api/admin/projects/${projectId}`
        : "/api/admin/projects";
      const method = projectId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stack-xl max-w-4xl">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Title" htmlFor="title" required>
          <input
            id="title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputClassName}
            required
          />
        </FormField>

        <FormField label="Slug" htmlFor="slug" required>
          <input
            id="slug"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={inputClassName}
            required
          />
        </FormField>

        <FormField label="Category" htmlFor="category" required>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={selectClassName}
          >
            {ADMIN_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Client" htmlFor="client">
          <input
            id="client"
            value={form.client}
            onChange={(e) => update("client", e.target.value)}
            className={inputClassName}
          />
        </FormField>

        <FormField label="Year" htmlFor="year">
          <input
            id="year"
            type="number"
            value={form.year}
            onChange={(e) => update("year", Number(e.target.value))}
            className={inputClassName}
          />
        </FormField>

        <FormField label="Grid Size" htmlFor="size">
          <select
            id="size"
            value={form.size}
            onChange={(e) => update("size", e.target.value as typeof form.size)}
            className={selectClassName}
          >
            {ADMIN_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Software" htmlFor="software">
          <input
            id="software"
            value={form.software}
            onChange={(e) => update("software", e.target.value)}
            className={inputClassName}
            placeholder="Figma, Illustrator, Photoshop"
          />
        </FormField>

        <FormField label="Tags" htmlFor="tags">
          <input
            id="tags"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            className={inputClassName}
            placeholder="branding, luxury, minimal"
          />
        </FormField>

        <FormField label="Likes Seed" htmlFor="likes_seed">
          <input
            id="likes_seed"
            type="number"
            value={form.likes_seed}
            onChange={(e) => update("likes_seed", Number(e.target.value))}
            className={inputClassName}
          />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description" required>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={textareaClassName}
          required
        />
      </FormField>

      <FormField label="Long Description" htmlFor="long_description">
        <textarea
          id="long_description"
          value={form.long_description}
          onChange={(e) => update("long_description", e.target.value)}
          className={textareaClassName}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-8">
        <ImageUploader
          label="Cover Image"
          value={form.cover_image}
          onChange={(url) => update("cover_image", url)}
        />
        <ImageUploader
          label="Gallery Images"
          multiple
          values={form.gallery_images}
          onMultipleChange={(urls) => update("gallery_images", urls)}
        />
        <ImageUploader
          label="Before Image"
          value={form.before_image}
          onChange={(url) => update("before_image", url)}
        />
        <ImageUploader
          label="After Image"
          value={form.after_image}
          onChange={(url) => update("after_image", url)}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 text-body-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="size-4 rounded border-white/20"
          />
          Featured project
        </label>
        <label className="flex items-center gap-3 text-body-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
            className="size-4 rounded border-white/20"
          />
          Published
        </label>
      </div>

      {error && (
        <p className="text-caption text-mono-300" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-fit")}
      >
        {saving ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Saving...
          </>
        ) : (
          projectId ? "Update Project" : "Create Project"
        )}
      </button>
    </form>
  );
}
