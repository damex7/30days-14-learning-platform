import { addDays, lagosDay } from '@/lib/dates'
// `import type` is erased when the code is compiled, so this file never loads
// lib/progress.ts (which is client-only). These pure functions can run anywhere.
import type { ProgressState } from '@/lib/progress'
import type { CourseId, LessonId } from '@/lib/schema/ids'
import type { QuizAttempt } from '@/lib/schema/learner'
import type { LessonSummary, ProgressOutline } from '@/lib/types'

/*
  PROGRESS CALCULATIONS: pure functions over (course outline + saved progress).

  Like course stats, none of these numbers is stored. "40% complete", "best
  score 80%" and "5-day streak" are all worked out from the raw records each
  time, so they can never disagree with them.
*/

/** The bits of an outline progress needs. Pick keeps callers honest about it. */
type OutlineForProgress = Pick<ProgressOutline, 'id' | 'lessons'>

export const isEnrolled = (state: ProgressState, courseId: CourseId) => state.enrollments.some((e) => e.courseId === courseId)

export const completedLessons = (state: ProgressState): ReadonlySet<LessonId> => new Set(state.lessonProgress.map((p) => p.lessonId))

export type CourseProgress = {
  completed: number
  total: number
  percent: number
  /** The first lesson not yet completed, or null when everything is done. */
  nextLesson: LessonSummary | null
  started: boolean
}

export function courseProgress(outline: OutlineForProgress, state: ProgressState): CourseProgress {
  const done = completedLessons(state)
  const completed = outline.lessons.filter((l) => done.has(l.id)).length
  const total = outline.lessons.length
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    nextLesson: outline.lessons.find((l) => !done.has(l.id)) ?? null,
    started: completed > 0,
  }
}

/** The highest-scoring attempt at a quiz lesson (earliest wins a tie), or null if never attempted. */
export function bestAttempt(state: ProgressState, lessonId: LessonId): QuizAttempt | null {
  let best: QuizAttempt | null = null
  for (const attempt of state.quizAttempts) {
    if (attempt.lessonId !== lessonId) continue
    if (!best || attempt.scorePercent > best.scorePercent) best = attempt
  }
  return best
}

export type QuizStanding = {
  lesson: LessonSummary
  best: QuizAttempt | null
  attempts: number
  passed: boolean
}

export function quizStandings(outline: OutlineForProgress, state: ProgressState): QuizStanding[] {
  return outline.lessons
    .filter((l) => l.kind === 'quiz')
    .map((lesson) => {
      const best = bestAttempt(state, lesson.id)
      return {
        lesson,
        best,
        attempts: state.quizAttempts.filter((a) => a.lessonId === lesson.id).length,
        passed: best?.passed ?? false,
      }
    })
}

/*
  CERTIFICATE STATUS as a discriminated union: each state carries exactly the
  data that state needs. Only 'complete' has a completion date; only
  'in-progress' has a to-do list. The page switches on `kind`.
*/
export type CertificateStatus =
  | { kind: 'not-enrolled' }
  | { kind: 'in-progress'; percent: number; remainingLessons: LessonSummary[]; quizzesToPass: QuizStanding[] }
  | { kind: 'complete'; completedAt: string }

export function certificateStatus(outline: OutlineForProgress, state: ProgressState): CertificateStatus {
  if (!isEnrolled(state, outline.id)) return { kind: 'not-enrolled' }
  const done = completedLessons(state)
  // Quiz lessons are listed under "quizzes to pass", not twice.
  const remainingLessons = outline.lessons.filter((l) => l.kind !== 'quiz' && !done.has(l.id))
  const quizzesToPass = quizStandings(outline, state).filter((q) => !q.passed || !done.has(q.lesson.id))
  if (remainingLessons.length === 0 && quizzesToPass.length === 0) {
    const ids = new Set(outline.lessons.map((l) => l.id))
    const finishedAt = state.lessonProgress
      .filter((p) => ids.has(p.lessonId))
      .map((p) => p.completedAt)
      .sort()
      .at(-1)
    return { kind: 'complete', completedAt: finishedAt ?? new Date().toISOString() }
  }
  return { kind: 'in-progress', percent: courseProgress(outline, state).percent, remainingLessons, quizzesToPass }
}

export type Streak = { current: number; longest: number; activeToday: boolean; activeDays: number }

/**
 * Consecutive Lagos days with at least one completed lesson or quiz attempt.
 * The current streak survives until the end of TODAY: if you learned
 * yesterday but not yet today, the streak is still alive.
 */
export function learningStreak(state: ProgressState, today: string = lagosDay(new Date())): Streak {
  const days = new Set([...state.lessonProgress.map((p) => lagosDay(p.completedAt)), ...state.quizAttempts.map((a) => lagosDay(a.submittedAt))])
  const activeToday = days.has(today)

  let current = 0
  let cursor = activeToday ? today : addDays(today, -1)
  while (days.has(cursor)) {
    current++
    cursor = addDays(cursor, -1)
  }

  let longest = 0
  let run = 0
  let previous: string | null = null
  for (const day of [...days].sort()) {
    run = previous !== null && addDays(previous, 1) === day ? run + 1 : 1
    longest = Math.max(longest, run)
    previous = day
  }

  return { current, longest, activeToday, activeDays: days.size }
}
