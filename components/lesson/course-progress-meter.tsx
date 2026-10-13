// CLIENT COMPONENT: reads progress from localStorage.
'use client'

import { ProgressBar } from '@/components/ui/progress-bar'
import { courseProgress, isEnrolled } from '@/lib/learning'
import { useProgress } from '@/lib/progress'
import type { ProgressOutline } from '@/lib/types'

/** The small "42%" meter in the lesson player's top bar. Hidden until we know, and for visitors who haven't enrolled. */
export function CourseProgressMeter({ course }: { course: Pick<ProgressOutline, 'id' | 'lessons'> }) {
  const progress = useProgress()
  if (!progress || !isEnrolled(progress.state, course.id)) return null
  const { percent } = courseProgress(course, progress.state)
  return (
    <div className="hidden items-center gap-2 text-xs font-semibold text-muted sm:flex">
      <ProgressBar value={percent} label="Course progress" className="w-24" />
      <span aria-hidden>{percent}%</span>
    </div>
  )
}
