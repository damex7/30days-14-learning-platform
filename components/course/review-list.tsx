import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'
import { Rating } from '@/components/ui/rating'
import { formatDate } from '@/lib/format'
import type { Review } from '@/lib/schema/catalog'
import type { CourseStats } from '@/lib/types'

export function ReviewList({ reviews, stats }: { reviews: readonly Review[]; stats: CourseStats }) {
  if (reviews.length === 0) {
    return (
      <EmptyState icon="star" title="No reviews yet">
        This course is new. Reviews appear here once learners have taken it.
      </EmptyState>
    )
  }

  // The rating breakdown is calculated from the reviews, like the average.
  const counts = [5, 4, 3, 2, 1].map((stars) => ({ stars, count: reviews.filter((r) => r.rating === stars).length }))

  return (
    <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
      <div>
        <Rating value={stats.averageRating} count={stats.reviewCount} size="lg" className="flex-wrap" />
        <dl className="mt-4 space-y-1.5 text-sm">
          {counts.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-2">
              <dt className="w-12 shrink-0 text-muted">{stars} star</dt>
              <dd className="flex flex-1 items-center gap-2">
                <span className="h-2 flex-1 overflow-hidden rounded-pill bg-sunken" aria-hidden>
                  <span className="block h-full rounded-pill bg-sun" style={{ width: `${(count / reviews.length) * 100}%` }} />
                </span>
                <span className="w-4 text-right text-muted">{count}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-card border border-line bg-raised p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">
                {review.learnerName} <span className="font-normal text-muted">· {review.location}</span>
              </p>
              <span className="inline-flex text-sun" role="img" aria-label={`Rated ${review.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Icon key={n} name="star" filled={n <= review.rating} className="size-3.5" />
                ))}
              </span>
            </div>
            <p className="mt-2 text-muted">{review.body}</p>
            <p className="mt-2 text-xs text-subtle">
              <time dateTime={review.createdAt}>{formatDate(review.createdAt, 'short')}</time>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
