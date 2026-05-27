export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="notes-masonry">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-black/5 p-5 shadow-sm dark:border-white/5"
          style={{ height: `${140 + (i % 3) * 40}px` }}
        >
          <div className="skeleton-shimmer mb-3 h-4 w-2/3 rounded-lg" />
          <div className="skeleton-shimmer mb-2 h-3 w-full rounded-lg" />
          <div className="skeleton-shimmer mb-2 h-3 w-4/5 rounded-lg" />
          <div className="skeleton-shimmer mt-6 h-3 w-1/3 rounded-lg" />
        </div>
      ))}
    </div>
  )
}
