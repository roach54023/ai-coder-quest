"use client";

import { useState, useEffect } from "react";
import type { Database } from "@/types/database";

type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const data = await res.json();
          setProgress(data.progress || []);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const getLevelStatus = (levelId: string) => {
    const p = progress.find((item) => item.level_id === levelId);
    return p?.status || "locked";
  };

  const completedCount = progress.filter((p) => p.status === "completed").length;

  return { progress, loading, getLevelStatus, completedCount };
}
