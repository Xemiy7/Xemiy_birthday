"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LikeCount {
  project_id: string;
  count: number;
}

interface RecentLike {
  project_id: string;
  visitor_id: string;
  created_at: string;
}

export function LikesPanel() {
  const [counts, setCounts] = useState<LikeCount[]>([]);
  const [recent, setRecent] = useState<RecentLike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/likes")
      .then((r) => r.json())
      .then((data) => {
        setCounts(data.counts ?? []);
        setRecent(data.recent ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalLikes = counts.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="stack-xl">
      <div className="card card-glass p-6">
        <p className="text-overline mb-2">Total Likes</p>
        <p className="text-display-md">{totalLikes}</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="card card-glass overflow-hidden">
          <h2 className="border-b border-white/8 px-6 py-4 text-title-sm">By Project</h2>
          {counts.length === 0 ? (
            <p className="p-6 text-body-sm text-muted-foreground">No likes recorded.</p>
          ) : (
            <table className="w-full text-body-sm">
              <tbody>
                {counts.map((row) => (
                  <tr key={row.project_id} className="border-b border-white/5">
                    <td className="px-6 py-3 font-mono text-caption">{row.project_id}</td>
                    <td className="px-6 py-3 text-right">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card card-glass overflow-hidden">
          <h2 className="border-b border-white/8 px-6 py-4 text-title-sm">Recent Activity</h2>
          {recent.length === 0 ? (
            <p className="p-6 text-body-sm text-muted-foreground">No recent activity.</p>
          ) : (
            <table className="w-full text-body-sm">
              <tbody>
                {recent.map((row, i) => (
                  <tr key={`${row.project_id}-${i}`} className="border-b border-white/5">
                    <td className="px-6 py-3 font-mono text-caption">{row.project_id}</td>
                    <td className="px-6 py-3 text-caption text-muted-foreground">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
