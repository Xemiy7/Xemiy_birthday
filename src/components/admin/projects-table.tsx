"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Star, Loader2 } from "lucide-react";
import type { AdminProject } from "@/types/admin";
import { cn } from "@/lib/utils";

export function ProjectsTable() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Delete failed");
        return;
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const toggleFeatured = async (project: AdminProject) => {
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !project.featured }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, ...updated } : p)),
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="card card-glass p-12 text-center">
        <p className="text-body-sm text-muted-foreground">No projects yet.</p>
        <Link href="/admin/projects/new" className="text-body-sm underline mt-2 inline-block">
          Create your first project
        </Link>
      </div>
    );
  }

  return (
    <div className="card card-glass overflow-hidden">
      <table className="w-full text-left text-body-sm">
        <thead>
          <tr className="border-b border-white/8 text-overline">
            <th className="px-6 py-4 font-normal">Project</th>
            <th className="px-6 py-4 font-normal">Category</th>
            <th className="px-6 py-4 font-normal">Tags</th>
            <th className="px-6 py-4 font-normal">Status</th>
            <th className="px-6 py-4 font-normal text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-white/5 hover:bg-white/3">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  {project.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.cover_image}
                      alt=""
                      className="size-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-caption text-muted-foreground">{project.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{project.category}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {project.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/6 px-2 py-0.5 text-caption"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-caption",
                      project.published ? "bg-white/10" : "bg-white/4 text-muted-foreground",
                    )}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFeatured(project)}
                    className={cn(
                      "rounded-full p-1 transition-premium",
                      project.featured ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                    title={project.featured ? "Remove from featured" : "Mark as featured"}
                  >
                    <Star
                      className="size-4"
                      strokeWidth={1.5}
                      fill={project.featured ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="flex size-9 items-center justify-center rounded-lg hover:bg-white/8"
                    aria-label={`Edit ${project.title}`}
                  >
                    <Pencil className="size-4" strokeWidth={1.5} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deletingId === project.id}
                    className="flex size-9 items-center justify-center rounded-lg hover:bg-white/8 disabled:opacity-50"
                    aria-label={`Delete ${project.title}`}
                  >
                    {deletingId === project.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
