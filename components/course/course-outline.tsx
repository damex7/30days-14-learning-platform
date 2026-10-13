import Link from 'next/link'
import { LessonKindIcon } from '@/components/lesson/lesson-kind-icon'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { formatDuration, plural } from '@/lib/format'
import { describeLesson } from '@/lib/lessons'
import type { CourseOutline } from '@/lib/types'

/**
 * The course outline: modules (as native <details>, so they open and close
 * without JavaScript) with each lesson's kind and calculated duration.
 */
export function CourseOutlineList({ outline }: { outline: CourseOutline }) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-card border border-line bg-raised">
      {outline.modules.map((mod, index) => (
        <li key={mod.id}>
          <details className="group" open={index === 0}>
            <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-4 hover:bg-sunken/60 sm:px-5">
              <span>
                <span className="block text-xs font-semibold tracking-wide text-subtle uppercase">Module {mod.position}</span>
                <span className="mt-0.5 block font-display text-lg font-semibold">{mod.title}</span>
                <span className="mt-0.5 block text-sm text-muted">
                  {plural(mod.lessons.length, 'lesson')} · {formatDuration(mod.durationSeconds)}
                </span>
              </span>
              <Icon name="chevronDown" className="mt-1 size-5 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <ol className="border-t border-line bg-paper/40 px-2 py-2 sm:px-3">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/learn/${outline.slug}/${lesson.slug}`}
                    className="flex items-center gap-3 rounded-control px-2 py-2.5 hover:bg-sunken sm:px-3"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-sunken text-muted">
                      <LessonKindIcon kind={lesson.kind} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{lesson.title}</span>
                      <span className="block text-xs text-muted">{describeLesson(lesson)}</span>
                    </span>
                    {lesson.isPreview && <Badge className="bg-leaf-soft text-leaf">Free preview</Badge>}
                  </Link>
                </li>
              ))}
            </ol>
          </details>
        </li>
      ))}
    </ol>
  )
}
