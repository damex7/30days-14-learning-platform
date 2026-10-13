// LOADING STATE: Next.js wraps the page in <Suspense> with this as the
// fallback. Today the course pages are prerendered, so it rarely shows; on
// Day 16, while the database answers, it will.
export default function CourseLoading() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <p role="status" className="sr-only">
        Loading course…
      </p>
      <div aria-hidden className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <div className="skeleton h-5 w-40" />
          <div className="skeleton h-10 w-4/5" />
          <div className="skeleton h-5 w-3/5" />
          <div className="skeleton h-5 w-2/5" />
          <div className="skeleton mt-8 h-64" />
        </div>
        <div className="skeleton h-96 rounded-card" />
      </div>
    </div>
  )
}
