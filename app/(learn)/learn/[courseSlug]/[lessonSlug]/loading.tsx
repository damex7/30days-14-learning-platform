// Inside the course layout: the top bar and outline stay put while the next
// lesson loads, and only the lesson area shows this calm placeholder.
export default function LessonLoading() {
  return (
    <div className="mx-auto max-w-reading px-4 pt-8 sm:px-6 lg:pt-12">
      <p role="status" className="sr-only">
        Loading lesson…
      </p>
      <div aria-hidden className="space-y-4">
        <div className="skeleton h-4 w-48" />
        <div className="skeleton h-10 w-4/5" />
        <div className="skeleton h-4 w-32" />
        <div className="skeleton mt-6 aspect-video w-full rounded-card" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-11/12" />
        <div className="skeleton h-4 w-3/4" />
      </div>
    </div>
  )
}
