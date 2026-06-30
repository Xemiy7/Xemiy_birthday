"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import type { AdminProject } from "@/types/admin";
import { Loader2 } from "lucide-react";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<AdminProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Not found");
        setProject(data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <p className="text-body-sm text-muted-foreground">{error ?? "Project not found"}</p>
    );
  }

  return (
    <div className="stack-xl">
      <div>
        <h1 className="text-display-sm">Edit Project</h1>
        <p className="text-body-sm text-muted-foreground mt-2">{project.title}</p>
      </div>

      <ProjectForm initial={project} projectId={project.id} />
    </div>
  );
}
