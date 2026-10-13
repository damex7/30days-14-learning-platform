import { z } from 'zod'
import { AttemptIdSchema, CourseIdSchema, ISODateTimeSchema, LessonIdSchema, OptionIdSchema, QuestionIdSchema, QuizIdSchema } from '@/lib/schema/ids'

/*
  LEARNER RECORDS: what a learner has DONE.

  Today these live in localStorage (lib/progress.ts); on Day 16 each becomes a
  database table with a learner_id column. They don't include a learner ID
  yet because there is only one demo learner: the whole saved object belongs
  to them.

  These are EVENTS (things that happened at a moment), not catalogue data.
  That is why a QuizAttempt DOES store its score even though we said
  "calculate, don't store" for course stats: an attempt is a record of what
  happened at the time. If a question is reworded next month, last month's
  score must not silently change.
*/

/**
 * A learner's answer to one question. Its shape mirrors the question's
 * `type`, so it is a discriminated union on the same field.
 */
export const AnswerSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('single'), optionId: OptionIdSchema }),
  z.object({ type: z.literal('multiple'), optionIds: z.array(OptionIdSchema) }),
  z.object({ type: z.literal('true-false'), value: z.boolean() }),
])
export type Answer = z.infer<typeof AnswerSchema>

export const EnrollmentSchema = z.object({
  courseId: CourseIdSchema,
  enrolledAt: ISODateTimeSchema,
})

export const LessonProgressSchema = z.object({
  lessonId: LessonIdSchema,
  completedAt: ISODateTimeSchema,
  // No courseId: the lesson already knows its module, and the module its
  // course. Storing it again would be a second copy that could disagree.
})

export const QuizAttemptSchema = z.object({
  id: AttemptIdSchema,
  quizId: QuizIdSchema,
  lessonId: LessonIdSchema,
  // z.record(keySchema, valueSchema): an object used as a lookup table.
  // Its type is Record<QuestionId, Answer>. Unanswered questions are simply
  // absent, so read it with care (noUncheckedIndexedAccess makes every read
  // `Answer | undefined`).
  answers: z.record(QuestionIdSchema, AnswerSchema),
  correctCount: z.number().int().nonnegative(),
  questionCount: z.number().int().nonnegative(),
  scorePercent: z.number().int().min(0).max(100),
  passed: z.boolean(),
  submittedAt: ISODateTimeSchema,
})

export type Enrollment = z.infer<typeof EnrollmentSchema>
export type LessonProgress = z.infer<typeof LessonProgressSchema>
export type QuizAttempt = z.infer<typeof QuizAttemptSchema>
