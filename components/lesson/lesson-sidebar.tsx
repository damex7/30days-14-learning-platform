// CLIENT COMPONENT: the tick marks come from localStorage (lib/progress.ts)
// and the highlighted row from the current URL (useParams). The sidebar lives
// in the course LAYOUT, which does not re-render when you move between
// lessons, so only a Client Component can keep up with the URL.
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LessonKindIcon } from '@/components/lesson/lesson-kind-icon'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/cn'
import { formatDuration } from '@/lib/format'
import { completedLessons, isEnrolled } from '@/lib/learning'
import { useProgress } from '@/lib/progress'
import type { CourseId } from '@/lib/schema/ids'
import type { ModuleOutline } from '@/lib/types'

type Props = { courseId: CourseId; courseSlug: string; modules: readonly ModuleOutline[] }

function OutlineNav({ courseId, courseSlug, modules }: Props) {
  // useParams is generic: we tell it which params this route has.
  const params = useParams<{ lessonSlug?: string }>()
  const progress = useProgress()
  const done = progress ? completedLessons(progress.state) : new Set()
  const enrolled = progress ? isEnrolled(progress.state, courseId) : false

  return (
    <nav aria-label="Course outline">
      <ol className="space-y-5">
        {modules.map((mod) => (
          <li key={mod.id}>
            <p className="px-2 text-xs font-semibold tracking-wide text-subtle uppercase">
              Module {mod.position} · {mod.title}
            </p>
            <ol className="mt-1.5 space-y-0.5">
              {mod.lessons.map((lesson) => {
                const current = params.lessonSlug === lesson.slug
                const complete = done.has(lesson.id)
                const locked = progress !== null && !enrolled && !lesson.isPreview
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/learn/${courseSlug}/${lesson.slug}`}
                      aria-current={current ? 'page' : undefined}
                      className={cn(
                        'flex items-start gap-2.5 rounded-control px-2 py-2 text-sm transition-colors',
                        current ? 'bg-brand-soft font-semibold text-brand' : 'text-muted hover:bg-sunken hover:text-ink',
                      )}
                    >
                      <span className="mt-0.5">
                        {complete ? (
                          <Icon name="checkCircle" className="size-4.5 text-leaf" label="Completed" />
                        ) : locked ? (
                          <Icon name="lock" className="size-4.5 text-subtle" label="Locked until you enroll" />
                        ) : (
                          <Icon name="circle" className="size-4.5 text-line-strong" label="Not completed" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block leading-snug">{lesson.title}</span>
                        <span className="mt-0.5 flex items-center gap-1 text-xs font-normal text-subtle">
                          <LessonKindIcon kind={lesson.kind} className="size-3" />
                          {formatDuration(lesson.durationSeconds)}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * On phones the outline folds into a <details> above the lesson, so the
 * lesson itself gets the whole screen. On large screens it is a sticky
 * sidebar. Only one copy is ever visible (the other is display:none).
 */
export function LessonSidebar(props: Props) {
  const progress = useProgress()
  const total = props.modules.reduce((n, m) => n + m.lessons.length, 0)
  const done = progress ? props.modules.flatMap((m) => m.lessons).filter((l) => completedLessons(progress.state).has(l.id)).length : null

  return (
    <>
      <details className="group border-b border-line bg-raised lg:hidden">
        <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 text-sm font-semibold">
          <span>
            Course outline
            {done !== null && (
              <span className="ml-2 font-normal text-muted">
                {done} of {total} complete
              </span>
            )}
          </span>
          <Icon name="chevronDown" className="size-5 transition-transform group-open:rotate-180" />
        </summary>
        <div className="max-h-[60vh] overflow-y-auto border-t border-line px-2 py-4">
          <OutlineNav {...props} />
        </div>
      </details>
      <aside className="hidden lg:block">
        <div className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-3 py-6">
          <OutlineNav {...props} />
        </div>
      </aside>
    </>
  )
}
