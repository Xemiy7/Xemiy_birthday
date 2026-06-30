"use client";

import { useCallback, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange?: (url: string) => void;
  multiple?: boolean;
  values?: string[];
  onMultipleChange?: (urls: string[]) => void;
  className?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  multiple = false,
  values = [],
  onMultipleChange,
  className,
}: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");

        if (multiple && onMultipleChange) {
          onMultipleChange([...values, data.url]);
        } else if (onChange) {
          onChange(data.url);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [multiple, onChange, onMultipleChange, values],
  );

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    uploadFile(files[0]);
  };

  const removeGalleryImage = (index: number) => {
    if (onMultipleChange) {
      onMultipleChange(values.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={cn("stack-sm", className)}>
      <label className="text-overline">{label}</label>

      {/* Preview */}
      {!multiple && value && (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="image-cover h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange?.("")}
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full glass hover:bg-white/12"
            aria-label="Remove image"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {multiple && values.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {values.map((url, i) => (
            <div key={url} className="relative size-24 overflow-hidden rounded-lg border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-mono-1000/80"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 transition-premium",
          dragOver ? "border-foreground/40 bg-white/8" : "border-white/15 bg-white/3 hover:border-white/25",
          uploading && "pointer-events-none opacity-60",
        )}
      >
        {uploading ? (
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        ) : (
          <>
            <Upload className="mb-2 size-5 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-body-sm">Drag & drop or click to upload</p>
            <p className="text-caption mt-1">Cloudinary · Max 10MB</p>
          </>
        )}

        <input
          type="file"
          accept="image/*,.pdf"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
      </div>

      {/* URL fallback */}
      {!multiple && onChange && (
        <div className="flex items-center gap-2">
          <ImageIcon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="url"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL..."
            className="w-full rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-caption outline-none focus:border-white/25"
          />
        </div>
      )}

      <AnimatePresence>
        {error && (
          <m.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-caption text-mono-300"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
