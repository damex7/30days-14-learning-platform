export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <p role="status" className="sr-only">
        Loading your learning…
      </p>
      <div aria-hidden className="space-y-8">
        <div className="skeleton h-12 w-64" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="skeleton h-24" />
          <div className="skeleton h-24" />
          <div className="skeleton h-24" />
          <div className="skeleton h-24" />
        </div>
        <div className="skeleton h-48" />
      </div>
    </div>
  )
}
