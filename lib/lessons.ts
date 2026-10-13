import { SECONDS_PER_QUIZ_QUESTION, WORDS_PER_MINUTE } from '@/lib/constants'
import { assertNever } from '@/lib/guards'
import type { Lesson, LessonKind } from '@/lib/schema/lesson'
import { formatDuration } from '@/lib/format'

/*
  EVERYTHING THAT DEPENDS ON A LESSON'S KIND, IN ONE PLACE.

  Each function switches on `lesson.kind` and ends in assertNever, so adding a
  new kind to LessonSchema turns each of these into a compile error until it
  is handled. The README shows the errors.
*/

/** Words in a Markdown body, ignoring the Markdown symbols themselves. */
export function wordCount(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' code ') // a code block reads as roughly one "word" per glance
    .replace(/[#>*_`|[\]()-]/g, ' ')
  return text.split(/\s+/).filter(Boolean).length
}

/** Whole minutes to read, never less than 1. */
export function readingMinutes(markdown: string): number {
  return Math.max(1, Math.ceil(wordCount(markdown) / WORDS_PER_MINUTE))
}

/**
 * How long a lesson takes, in seconds.
 * - video:   its recorded length
 * - article: reading time, calculated from the text
 * - quiz:    about a minute per question
 *
 * The quiz case needs the question count, which lives in another table, so
 * the caller passes it in.
 */
export function lessonDurationSeconds(lesson: Lesson, questionCount: number): number {
  switch (lesson.kind) {
    case 'video':
      return lesson.durationSeconds
    case 'article':
      return readingMinutes(lesson.bodyMarkdown) * 60
    case 'quiz':
      return Math.max(1, questionCount) * SECONDS_PER_QUIZ_QUESTION
    default:
      return assertNever(lesson, 'Unknown lesson kind')
  }
}

/**
 * Labels for each kind. `satisfies Record<LessonKind, ...>` makes a missing
 * kind a compile error here too: a Record must have EVERY key.
 */
export const LESSON_KIND_LABELS = {
  video: 'Video',
  article: 'Reading',
  quiz: 'Quiz',
} as const satisfies Record<LessonKind, string>

/**
 * A short description for outline rows and the sidebar, e.g. "Video · 8 min",
 * "Reading · 3 min", "Quiz · 5 questions".
 *
 * It takes anything with a kind, a duration and a question count, so it works
 * for LessonSummary from the outline without needing the full lesson.
 */
export function describeLesson(lesson: { kind: LessonKind; durationSeconds: number; questionCount: number }): string {
  const label = LESSON_KIND_LABELS[lesson.kind]
  switch (lesson.kind) {
    case 'video':
    case 'article':
      return `${label} · ${formatDuration(lesson.durationSeconds)}`
    case 'quiz':
      return `${label} · ${lesson.questionCount} ${lesson.questionCount === 1 ? 'question' : 'questions'}`
    default:
      return assertNever(lesson.kind, 'Unknown lesson kind')
  }
}
