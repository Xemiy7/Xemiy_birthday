import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="stack-xl">
      <div>
        <h1 className="text-display-sm">New Project</h1>
        <p className="text-body-sm text-muted-foreground mt-2">
          Upload images and publish to your portfolio
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
