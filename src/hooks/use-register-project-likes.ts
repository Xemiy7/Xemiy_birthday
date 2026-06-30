"use client";

import { useEffect } from "react";
import { useLikes } from "@/providers/likes-provider";

export function useRegisterProjectLikes(projectIds: string[]) {
  const { registerProjects } = useLikes();

  useEffect(() => {
    if (projectIds.length > 0) {
      registerProjects(projectIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectIds.join(","), registerProjects]);
}
