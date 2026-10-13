export default function InstructorLoading() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <p role="status" className="sr-only">
        Loading instructor…
      </p>
      <div aria-hidden className="space-y-6">
        <div className="skeleton h-48 rounded-card" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="skeleton h-80 rounded-card" />
          <div className="skeleton h-80 rounded-card" />
        </div>
      </div>
    </div>
  )
}
