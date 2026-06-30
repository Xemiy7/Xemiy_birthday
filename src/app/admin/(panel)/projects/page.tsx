import Link from "next/link";
import { ProjectsTable } from "@/components/admin/projects-table";
import { buttonVariants } from "@/components/ui/button";

export default function AdminProjectsPage() {
  return (
    <div className="stack-xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-display-sm">Projects</h1>
          <p className="text-body-sm text-muted-foreground mt-2">
            Upload, edit, and manage portfolio work
          </p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ variant: "primary" })}>
          New Project
        </Link>
      </div>

      <ProjectsTable />
    </div>
  );
}
