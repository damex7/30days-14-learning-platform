import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { CatalogFilters } from '@/components/course/catalog-filters'
import { CourseGrid } from '@/components/course/course-card'
import { CatalogSkeleton } from '@/components/course/catalog-skeleton'
import { buttonClass } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'
import { DURATION_BUCKETS, LEVEL_LABELS, PRICE_FILTER_LABELS } from '@/lib/constants'
import { listCategories, listCourses } from '@/lib/data'
import { plural } from '@/lib/format'
import { catalogHref, hasFilters, parseCatalogQuery } from '@/lib/search-params'
import type { CatalogQuery } from '@/lib/types'

export const metadata: Metadata = {
  title: 'All courses',
  description: 'Browse short, practical courses in tech skills, design, small business, money skills and exam prep.',
}

/*
  The page itself never touches searchParams, so its heading is part of the
  static shell that Next.js prerenders. Reading searchParams makes a component
  request-time, so that part (<Catalog>) sits inside <Suspense> and streams
  in. (`searchParams` is a Promise in current Next.js; we pass the promise
  down and await it where it's needed.)
*/
export default function CoursesPage({ searchParams }: PageProps<'/courses'>) {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">All courses</h1>
      <p className="mt-2 max-w-2xl text-muted">Short, practical courses with Nigerian examples. Free courses are free for good; paid ones use a demo checkout.</p>
      <Suspense fallback={<CatalogSkeleton />}>
        <Catalog searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function Catalog({ searchParams }: Pick<PageProps<'/courses'>, 'searchParams'>) {
  // Zod turns whatever is in the URL into a valid CatalogQuery. A bad value
  // (?level=banana) falls back to "no filter" instead of throwing.
  const query = parseCatalogQuery(await searchParams)
  const [courses, categories] = await Promise.all([listCourses(query), listCategories()])
  const chips = activeFilterChips(query, categories)

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <CatalogFilters query={query} categories={categories} activeCount={chips.length} />
      <section aria-labelledby="results-heading">
        <h2 id="results-heading" className="sr-only">
          Results
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <p role="status" className="mr-2 font-semibold">
            {plural(courses.length, 'course')}
          </p>
          {chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.removeHref}
              scroll={false}
              className="inline-flex min-h-8 items-center gap-1 rounded-pill bg-brand-soft px-3 text-sm font-semibold text-brand hover:bg-brand hover:text-brand-ink"
            >
              {chip.label}
              <span aria-hidden>×</span>
              <span className="sr-only">(remove filter)</span>
            </Link>
          ))}
          {hasFilters(query) && (
            <Link href={catalogHref(query, { category: undefined, level: undefined, price: undefined, duration: undefined })} className="text-sm text-muted underline hover:text-ink">
              Clear all
            </Link>
          )}
        </div>
        <div className="mt-5">
          {courses.length > 0 ? (
            <CourseGrid courses={courses} />
          ) : (
            <EmptyState
              icon="layers"
              title="No courses match those filters"
              action={
                <Link href="/courses" className={buttonClass('primary')}>
                  <Icon name="refresh" /> Show all courses
                </Link>
              }
            >
              Try removing a filter. New courses are added regularly.
            </EmptyState>
          )}
        </div>
      </section>
    </div>
  )
}

/** One removable chip per active filter, with a link that removes just that one. */
function activeFilterChips(query: CatalogQuery, categories: readonly { slug: string; name: string }[]) {
  const chips: { label: string; removeHref: string }[] = []
  if (query.category) {
    const name = categories.find((c) => c.slug === query.category)?.name ?? query.category
    chips.push({ label: name, removeHref: catalogHref(query, { category: undefined }) })
  }
  if (query.level) chips.push({ label: LEVEL_LABELS[query.level], removeHref: catalogHref(query, { level: undefined }) })
  if (query.price) chips.push({ label: PRICE_FILTER_LABELS[query.price], removeHref: catalogHref(query, { price: undefined }) })
  if (query.duration) chips.push({ label: DURATION_BUCKETS[query.duration].label, removeHref: catalogHref(query, { duration: undefined }) })
  return chips
}
