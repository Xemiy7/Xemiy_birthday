import { LikesPanel } from "@/components/admin/likes-panel";

export default function AdminLikesPage() {
  return (
    <div className="stack-xl">
      <div>
        <h1 className="text-display-sm">Likes</h1>
        <p className="text-body-sm text-muted-foreground mt-2">
          Engagement across your portfolio projects
        </p>
      </div>

      <LikesPanel />
    </div>
  );
}
