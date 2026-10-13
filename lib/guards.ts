import type { LessonKind } from '@/lib/schema/lesson'

/*
  TYPE GUARDS AND EXHAUSTIVENESS
*/

/**
 * THE `never` CHECK.
 *
 * `never` is the type with no values. In the `default:` branch of a switch
 * that has handled every member of a union, TypeScript has narrowed the value
 * down to `never`: there is nothing left it could be. So this call compiles:
 *
 *     switch (lesson.kind) {
 *       case 'video':   ...
 *       case 'article': ...
 *       case 'quiz':    ...
 *       default: return assertNever(lesson)   // lesson: never ✓
 *     }
 *
 * Add a fourth kind ('assignment') to LessonSchema and, in every switch that
 * doesn't handle it yet, `lesson` in the default branch is now an
 * AssignmentLesson, not never:
 *
 *     Argument of type '{ kind: "assignment"; ... }' is not assignable to parameter of type 'never'.
 *
 * The compiler hands you a to-do list of exactly the places to update.
 * At runtime (e.g. bad data that slipped past validation) it throws loudly
 * instead of silently rendering nothing.
 */
export function assertNever(value: never, message = 'Unhandled case'): never {
  throw new Error(`${message}: ${JSON.stringify(value)}`)
}

/*
  TYPE PREDICATES: a function whose return type is `value is X` tells the
  compiler "if I return true, treat the argument as X from now on". So after

      if (isVideoLesson(lesson)) { lesson.durationSeconds }

  the property is available, just like checking `lesson.kind === 'video'`
  inline. A named guard is handy in .filter(), where an inline check would
  NOT narrow the resulting array's type:

      lessons.filter(isQuizLesson)   // QuizLesson[], not Lesson[]
*/

/**
 * A guard FACTORY, generic in two ways:
 * - K: which kind to check for ('video', 'quiz'...)
 * - T: what kind of object it receives. Anything with a `kind` works: a full
 *   Lesson, a LessonDetail or a LessonSummary from the outline.
 *
 * EXTRACT<T, { kind: K }> keeps only the union members whose `kind` is K, so
 * the guard narrows to exactly the right member.
 */
export function isLessonKind<K extends LessonKind>(kind: K) {
  return <T extends { kind: LessonKind }>(lesson: T): lesson is Extract<T, { kind: K }> => lesson.kind === kind
}

export const isVideoLesson = isLessonKind('video')
export const isArticleLesson = isLessonKind('article')
export const isQuizLesson = isLessonKind('quiz')

/** Narrows away null and undefined; handy for `.filter(isPresent)`. */
export const isPresent = <T>(value: T | null | undefined): value is T => value != null
