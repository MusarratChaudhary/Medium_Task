import React from "react";

export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--color-foreground)]/15 bg-[var(--color-foreground)]/5 p-2 shadow dark:border-[var(--color-foreground)]/10 dark:bg-[var(--color-foreground)]/5">
      {/* Aspect ratio box for image shimmer */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-[var(--color-foreground)]/15 dark:bg-[var(--color-foreground)]/10">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" />
      </div>

      {/* Info shimmer */}
      <div className="mt-3 space-y-2 px-1">
        {/* Title line */}
        <div className="relative h-4 w-3/4 overflow-hidden rounded bg-[var(--color-foreground)]/15 dark:bg-[var(--color-foreground)]/10">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" />
        </div>

        {/* Subtitle/Rating line */}
        <div className="flex items-center justify-between">
          <div className="relative h-3 w-1/3 overflow-hidden rounded bg-[var(--color-foreground)]/15 dark:bg-[var(--color-foreground)]/10">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" />
          </div>
          <div className="relative h-3 w-1/4 overflow-hidden rounded bg-[var(--color-foreground)]/15 dark:bg-[var(--color-foreground)]/10">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
