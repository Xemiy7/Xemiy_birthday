import { createBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILES,
} from "@/constants/booking";

export function validateFile(file: File): string | null {
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return `${file.name}: unsupported file type.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name}: exceeds 10MB limit.`;
  }
  return null;
}

export async function uploadBookingFiles(
  files: File[],
  folder: "attachments" | "references",
): Promise<string[]> {
  if (files.length === 0) return [];

  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  if (files.length > MAX_FILES) {
    throw new Error(`Maximum ${MAX_FILES} files allowed.`);
  }

  const supabase = createBrowserClient();
  const urls: string[] = [];

  for (const file of files) {
    const error = validateFile(file);
    if (error) throw new Error(error);

    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("booking-uploads")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      throw new Error(`Failed to upload ${file.name}.`);
    }

    urls.push(path);
  }

  return urls;
}
