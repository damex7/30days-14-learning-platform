/** Placeholder while the catalogue streams in. Hidden from screen readers; the status text says what's happening. */
export function CatalogSkeleton() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <p className="sr-only" role="status">
        Loading courses…
      </p>
      <div aria-hidden className="hidden space-y-3 lg:block">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton h-8" />
        ))}
      </div>
      <div aria-hidden>
        <div className="skeleton h-12 lg:hidden" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="overflow-hidden rounded-card border border-line bg-raised">
              <div className="skeleton aspect-[16/9] rounded-none" />
              <div className="space-y-3 p-5">
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-6 w-4/5" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
