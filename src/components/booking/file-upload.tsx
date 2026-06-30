"use client";

import { useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { validateFile } from "@/lib/supabase/upload";
import { MAX_FILES } from "@/constants/booking";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface FileUploadProps {
  label: string;
  description?: string;
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function FileUpload({
  label,
  description,
  files,
  onChange,
  accept = "image/*,.pdf,.zip",
  multiple = true,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setError(null);

    const newFiles = Array.from(incoming);
    const combined = multiple ? [...files, ...newFiles] : newFiles;

    if (combined.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }

    for (const file of newFiles) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
    }

    onChange(multiple ? combined.slice(0, MAX_FILES) : [newFiles[0]]);
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("stack-sm", className)}>
      <div>
        <label className="text-overline">{label}</label>
        {description && (
          <p className="text-caption mt-1">{description}</p>
        )}
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-8 transition-premium",
          dragOver
            ? "border-foreground/40 bg-white/6"
            : "border-white/15 bg-white/2 hover:border-white/25 hover:bg-white/4",
        )}
      >
        <Upload className="mb-3 size-5 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-body-sm text-foreground">
          Drop files here or <span className="underline">browse</span>
        </p>
        <p className="text-caption mt-1">
          JPG, PNG, WebP, PDF, ZIP — max 10MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {error && <p className="text-caption text-mono-300">{error}</p>}

      <AnimatePresence>
        {files.length > 0 && (
          <m.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="stack-xs overflow-hidden"
          >
            {files.map((file, index) => (
              <m.li
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: duration.fast, ease: easing.premium }}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/3 px-3 py-2"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  ) : (
                    <FileText className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  )}
                  <span className="truncate text-caption">{file.name}</span>
                  <span className="text-mono shrink-0 text-muted-foreground">
                    {(file.size / 1024).toFixed(0)}KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                  className="ml-2 flex size-7 shrink-0 items-center justify-center rounded-full transition-colors-premium hover:bg-white/10"
                >
                  <X className="size-3.5" strokeWidth={1.5} />
                </button>
              </m.li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
