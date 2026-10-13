// CLIENT COMPONENT: enrollments live in localStorage (lib/progress.ts), which
// only the browser can read. The course data arrives from the server as props.
'use client'

import Link from 'next/link'
import { CourseCover } from '@/components/course/course-cover'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { ProgressBar } from '@/components/ui/progress-bar'
import { courseProgress, isEnrolled } from '@/lib/learning'
import { useProgress } from '@/lib/progress'
import type { ProgressOutline } from '@/lib/types'

/**
 * "Continue learning" on the home page. Renders nothing for a new visitor,
 * and nothing during server rendering (progress is null until hydration), so
 * there is no empty box flashing for people who haven't enrolled.
 */
export function ContinueLearning({ outlines }: { outlines: readonly ProgressOutline[] }) {
  const progress = useProgress()
  if (!progress) return null

  const inProgress = outlines
    .filter((o) => isEnrolled(progress.state, o.id))
    .map((outline) => ({ outline, stats: courseProgress(outline, progress.state) }))
    .filter(({ stats }) => stats.nextLesson !== null)
    .slice(0, 3)

  if (inProgress.length === 0) return null

  return (
    <section aria-labelledby="continue-heading" className="mx-auto mt-12 max-w-content px-4 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <h2 id="continue-heading" className="text-2xl font-semibold">
          Continue learning
        </h2>
        <Link href="/dashboard" className="text-sm font-semibold text-brand hover:underline">
          My learning
        </Link>
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inProgress.map(({ outline, stats }) => (
          <li key={outline.id} className="flex gap-4 rounded-card border border-line bg-raised p-4 shadow-card">
            <CourseCover cover={outline.cover} className="hidden w-28 shrink-0 self-start rounded-control xs:block" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="leading-snug font-semibold">{outline.title}</h3>
              <ProgressBar value={stats.percent} label={`${outline.title} progress`} />
              <p className="text-xs text-muted">
                {stats.completed} of {stats.total} lessons · {stats.percent}%
              </p>
              {stats.nextLesson && (
                <Link href={`/learn/${outline.slug}/${stats.nextLesson.slug}`} className={buttonClass('secondary', 'sm', 'mt-auto max-w-full self-start')}>
                  <span className="sr-only">Continue {outline.title}: </span>
                  <span className="truncate">{stats.nextLesson.title}</span>
                  <Icon name="arrowRight" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
