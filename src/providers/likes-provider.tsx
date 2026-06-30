"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getVisitorId } from "@/lib/likes/visitor";
import { portfolioItems } from "@/data/portfolio";

interface LikesContextValue {
  counts: Record<string, number>;
  liked: Set<string>;
  isLoading: boolean;
  toggleLike: (projectId: string) => Promise<void>;
  registerProjects: (ids: string[]) => void;
  getCount: (projectId: string, fallback?: number) => number;
  isLiked: (projectId: string) => boolean;
  isToggling: (projectId: string) => boolean;
}

const LikesContext = createContext<LikesContextValue | null>(null);

const defaultCounts = Object.fromEntries(
  portfolioItems.map((p) => [p.id, p.likes]),
);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<Record<string, number>>(defaultCounts);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [toggling, setToggling] = useState<Set<string>>(new Set());
  const registeredIds = useRef<Set<string>>(new Set());
  const visitorId = useRef("");

  const fetchLikes = useCallback(async (ids: string[]) => {
    if (ids.length === 0) return;

    const vid = visitorId.current || getVisitorId();
    visitorId.current = vid;

    try {
      const res = await fetch(
        `/api/likes?ids=${ids.join(",")}&visitorId=${encodeURIComponent(vid)}`,
      );
      const data = await res.json();

      if (data.counts) {
        setCounts((prev) => ({ ...prev, ...data.counts }));
      }
      if (data.liked) {
        setLiked((prev) => new Set([...prev, ...data.liked]));
      }
    } catch {
      // keep defaults on error
    }
  }, []);

  const registerProjects = useCallback(
    (ids: string[]) => {
      const newIds = ids.filter((id) => !registeredIds.current.has(id));
      if (newIds.length === 0) return;

      newIds.forEach((id) => registeredIds.current.add(id));
      fetchLikes(newIds);
    },
    [fetchLikes],
  );

  useEffect(() => {
    visitorId.current = getVisitorId();
    setIsLoading(false);
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createBrowserClient();

    const channel = supabase
      .channel("like-counts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "project_like_counts" },
        (payload) => {
          const row = payload.new as { project_id: string; count: number } | undefined;
          if (!row?.project_id) return;

          const base = defaultCounts[row.project_id] ?? 0;
          setCounts((prev) => ({
            ...prev,
            [row.project_id]: base + Number(row.count),
          }));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleLike = useCallback(async (projectId: string) => {
    if (toggling.has(projectId)) return;

    const vid = visitorId.current || getVisitorId();
    visitorId.current = vid;
    const wasLiked = liked.has(projectId);
    const action = wasLiked ? "unlike" : "like";

    setToggling((prev) => new Set(prev).add(projectId));

    // Optimistic update
    setLiked((prev) => {
      const next = new Set(prev);
      if (wasLiked) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
    setCounts((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] ?? defaultCounts[projectId] ?? 0) + (wasLiked ? -1 : 1),
    }));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, visitorId: vid, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Revert optimistic update
        setLiked((prev) => {
          const next = new Set(prev);
          if (wasLiked) next.add(projectId);
          else next.delete(projectId);
          return next;
        });
        setCounts((prev) => ({
          ...prev,
          [projectId]:
            (prev[projectId] ?? defaultCounts[projectId] ?? 0) + (wasLiked ? 1 : -1),
        }));
      }
    } catch {
      // Revert on network error
      setLiked((prev) => {
        const next = new Set(prev);
        if (wasLiked) next.add(projectId);
        else next.delete(projectId);
        return next;
      });
      setCounts((prev) => ({
        ...prev,
        [projectId]:
          (prev[projectId] ?? defaultCounts[projectId] ?? 0) + (wasLiked ? 1 : -1),
      }));
    } finally {
      setToggling((prev) => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
    }
  }, [liked, toggling]);

  const value = useMemo(
    () => ({
      counts,
      liked,
      isLoading,
      toggleLike,
      registerProjects,
      getCount: (id: string, fallback = 0) => counts[id] ?? fallback,
      isLiked: (id: string) => liked.has(id),
      isToggling: (id: string) => toggling.has(id),
    }),
    [counts, liked, isLoading, toggleLike, registerProjects, toggling],
  );

  return (
    <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
  );
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) {
    throw new Error("useLikes must be used within LikesProvider");
  }
  return ctx;
}

export function useLikesOptional() {
  return useContext(LikesContext);
}
