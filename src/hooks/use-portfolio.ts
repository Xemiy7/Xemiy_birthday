"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PortfolioCategory } from "@/types/portfolio";
import {
  filterPortfolio,
  hasMorePortfolio,
  paginatePortfolio,
  portfolioItems,
  PAGE_SIZE,
} from "@/data/portfolio";

const SAVES_KEY = "xemiy-portfolio-saves";

function loadSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function usePortfolio() {
  const [category, setCategory] = useState<PortfolioCategory>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSaved(loadSet(SAVES_KEY));
  }, []);

  const filtered = useMemo(
    () => filterPortfolio(portfolioItems, category, query),
    [category, query],
  );

  const visible = useMemo(
    () => paginatePortfolio(filtered, page),
    [filtered, page],
  );

  const visibleIds = useMemo(
    () => visible.map((item) => item.id),
    [visible],
  );

  const hasMore = hasMorePortfolio(filtered, page);

  useEffect(() => {
    setPage(1);
  }, [category, query]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setIsLoading(false);
    }, 600);
  }, [hasMore, isLoading]);

  const toggleSave = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveSet(SAVES_KEY, next);
      return next;
    });
  }, []);

  return {
    category,
    setCategory,
    query,
    setQuery,
    visible,
    visibleIds,
    filteredCount: filtered.length,
    hasMore,
    isLoading,
    loadMore,
    saved,
    toggleSave,
    pageSize: PAGE_SIZE,
  };
}
