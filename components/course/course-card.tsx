import Link from 'next/link'
import { CourseCover } from '@/components/course/course-cover'
import { CategoryBadge, LevelBadge, PriceTag } from '@/components/course/course-meta'
import { Icon } from '@/components/ui/icon'
import { Rating } from '@/components/ui/rating'
import { formatDuration, plural } from '@/lib/format'
import type { CourseSummary } from '@/lib/types'

/**
 * A catalogue card. It takes a CourseSummary (a Pick of Course plus stats),
 * not a full Course: the type says exactly what a card depends on.
 *
 * The whole card is clickable through the title link's ::after overlay, so
 * there is ONE link per card for keyboard and screen-reader users instead of
 * a link around a block of mixed content.
 */
export function CourseCard({ course, headingLevel = 'h3' }: { course: CourseSummary; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-raised shadow-card transition-shadow focus-within:shadow-raised hover:shadow-raised">
      <CourseCover cover={course.cover} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge name={course.category.name} tone={course.category.tone} />
          <LevelBadge level={course.level} />
        </div>
        <Heading className="text-lg leading-snug font-semibold">
          <Link
            href={`/courses/${course.slug}`}
            className="rounded-control after:absolute after:inset-0 after:content-[''] group-hover:text-brand focus-visible:outline-none"
          >
            {course.title}
          </Link>
        </Heading>
        <p className="line-clamp-2 text-sm text-muted">{course.subtitle}</p>
        <p className="text-sm text-muted">{course.instructor.name}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="inline-flex items-center gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <Icon name="clock" /> {formatDuration(course.stats.durationSeconds)}
            </span>
            <span>{plural(course.stats.lessonCount, 'lesson')}</span>
          </span>
          <PriceTag priceKobo={course.priceKobo} />
        </div>
        <Rating value={course.stats.averageRating} count={course.stats.reviewCount} />
      </div>
      {/* The focus ring for the stretched link, drawn on the whole card. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-card ring-focus group-has-[a:focus-visible]:ring-2" />
    </article>
  )
}

export function CourseGrid({ courses, headingLevel }: { courses: readonly CourseSummary[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <li key={course.id} className="flex">
          <div className="flex w-full">
            <CourseCard course={course} headingLevel={headingLevel} />
          </div>
        </li>
      ))}
    </ul>
  )
}
