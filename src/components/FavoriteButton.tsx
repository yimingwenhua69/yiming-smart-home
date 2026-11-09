"use client";

import { useSyncExternalStore } from "react";
import { getFavoriteIds, subscribeFavorites, toggleFavorite } from "@/lib/favorites";

export function FavoriteButton({ deviceId, label = true }: { deviceId: string; label?: boolean }) {
  const on = useSyncExternalStore(
    subscribeFavorites,
    () => getFavoriteIds().includes(deviceId),
    () => false,
  );

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(deviceId)}
      aria-pressed={on}
      aria-label={on ? "取消收藏" : "收藏"}
      className="inline-flex items-center gap-1 rounded-full border border-current px-3 py-1 text-sm"
    >
      <span aria-hidden="true">{on ? "♥" : "♡"}</span>
      {label && <span>{on ? "已收藏" : "收藏"}</span>}
    </button>
  );
}
