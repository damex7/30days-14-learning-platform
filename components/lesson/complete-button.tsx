// CLIENT COMPONENT: marking a lesson complete is a click that writes to
// localStorage and updates the sidebar ticks immediately.
'use client'

import Link from 'next/link'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { completedLessons, isEnrolled } from '@/lib/learning'
import { progressActions, useProgress } from '@/lib/progress'
import type { CourseId, LessonId } from '@/lib/schema/ids'

type Props = { courseId: CourseId; lessonId: LessonId; nextHref: string | null; certificateHref: string }

/**
 * A toggle button (aria-pressed) for videos and articles. Quiz lessons don't
 * use it: they are completed by passing the quiz.
 */
export function CompleteButton({ courseId, lessonId, nextHref, certificateHref }: Props) {
  const progress = useProgress()
  if (!progress) return <div className="skeleton h-11 w-48" aria-hidden />
  if (!isEnrolled(progress.state, courseId)) return null

  const complete = completedLessons(progress.state).has(lessonId)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        aria-pressed={complete}
        onClick={() => progressActions.setLessonComplete(lessonId, !complete)}
        className={buttonClass(complete ? 'secondary' : 'primary', 'md', complete ? 'border-leaf text-leaf hover:border-leaf hover:text-leaf' : '')}
      >
        <Icon name={complete ? 'checkCircle' : 'circle'} />
        {complete ? 'Completed' : 'Mark as complete'}
      </button>
      {complete && (
        <>
          <span role="status" className="sr-only">
            Lesson marked as complete.
          </span>
          {nextHref ? (
            <Link href={nextHref} className={buttonClass('primary')}>
              Next lesson <Icon name="arrowRight" />
            </Link>
          ) : (
            <Link href={certificateHref} className={buttonClass('accent')}>
              <Icon name="award" /> Check your certificate
            </Link>
          )}
        </>
      )}
    </div>
  )
}
