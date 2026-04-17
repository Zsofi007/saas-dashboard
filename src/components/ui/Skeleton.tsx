type SkeletonProps = {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-border/60 dark:bg-border/40 ${className}`}
      aria-hidden
    />
  )
}

export function ChartSkeleton() {
  return (
    <div
      className="flex h-[280px] w-full flex-col gap-3 pt-2"
      role="status"
      aria-live="polite"
      aria-label="Loading chart"
    >
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-4 h-48 w-full rounded-xl" />
      <div className="mt-auto flex justify-between gap-2" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
    </div>
  )
}
