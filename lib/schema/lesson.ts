import { z } from 'zod'
import { PASS_MARK_PERCENT } from '@/lib/constants'
import { LessonIdSchema, ModuleIdSchema, OptionIdSchema, QuestionIdSchema, QuizIdSchema, SlugSchema } from '@/lib/schema/ids'

/*
  LESSONS: A DISCRIMINATED UNION

  A lesson is a video, an article OR a quiz, and each kind carries different
  data. A single type with every field optional

      { kind: string; durationSeconds?: number; bodyMarkdown?: string; quizId?: QuizId }

  would allow nonsense (a video with no duration, an article with a quizId)
  and force `?.` and `!` everywhere. Instead each kind is its own object type,
  and the union is "one of these three":

      type Lesson = VideoLesson | ArticleLesson | QuizLesson

  The shared `kind` field is the DISCRIMINANT: a literal ('video', 'article',
  'quiz') that is different in every member. Checking it NARROWS the type:

      if (lesson.kind === 'video') lesson.durationSeconds   // ✓ known to exist
      lesson.durationSeconds                                 // ✗ might be an article

  z.discriminatedUnion('kind', [...]) builds the runtime check AND the union
  type from the same three schemas. It also gives better errors than
  z.union: it reads `kind` first and reports problems for that kind only.

  Every function that handles all kinds uses an exhaustive switch ending in
  assertNever (lib/guards.ts). Add a fourth kind here and the compiler points
  at every switch that hasn't handled it yet. The README shows this.
*/

/** Fields every kind of lesson has. `.extend()` below adds the kind-specific ones. */
const LessonBaseSchema = z.object({
  id: LessonIdSchema,
  moduleId: ModuleIdSchema,
  /** Unique within a course, used in /learn/[courseSlug]/[lessonSlug]. */
  slug: SlugSchema,
  /** 1, 2, 3... Order within the module. */
  position: z.number().int().positive(),
  title: z.string().min(3).max(80),
  summary: z.string().min(10).max(200),
})

export const VideoLessonSchema = LessonBaseSchema.extend({
  kind: z.literal('video'),
  durationSeconds: z.number().int().min(30).max(60 * 60),
  // There is no video URL or YouTube ID: video hosting is out of scope today,
  // and the player is a placeholder. The transcript is the real content.
  transcript: z.string().min(80),
})

export const ArticleLessonSchema = LessonBaseSchema.extend({
  kind: z.literal('article'),
  /** Markdown (a small subset, see lib/markdown.ts). Reading time is calculated from it. */
  bodyMarkdown: z.string().min(200),
})

export const QuizLessonSchema = LessonBaseSchema.extend({
  kind: z.literal('quiz'),
  // The questions are separate rows that point at this quiz (by ID), the
  // same way they will be separate rows in a database table.
  quizId: QuizIdSchema,
})

export const LessonSchema = z.discriminatedUnion('kind', [VideoLessonSchema, ArticleLessonSchema, QuizLessonSchema])

export type VideoLesson = z.infer<typeof VideoLessonSchema>
export type ArticleLesson = z.infer<typeof ArticleLessonSchema>
export type QuizLesson = z.infer<typeof QuizLessonSchema>
export type Lesson = z.infer<typeof LessonSchema>

/**
 * 'video' | 'article' | 'quiz', read off the union itself (an INDEXED ACCESS
 * type). Add a kind to LessonSchema and this widens on its own.
 */
export type LessonKind = Lesson['kind']

export const QuizSchema = z.object({
  id: QuizIdSchema,
  lessonId: LessonIdSchema,
  passMarkPercent: z.number().int().min(1).max(100).default(PASS_MARK_PERCENT),
})
export type Quiz = z.infer<typeof QuizSchema>

/*
  QUESTIONS: ANOTHER DISCRIMINATED UNION, on `type`.
  - single:     pick one option. The answer is ONE option ID.
  - multiple:   pick all that apply. The answer is a LIST of option IDs.
  - true-false: no options at all. The answer is a boolean.

  Each shape stores its correct answer in the form that fits it, so a
  true/false question can't accidentally have three options, and a single
  choice question can't have two right answers.

  Whether a correct answer points at a REAL option is a cross-reference check
  in scripts/check-data.ts.
*/

const OptionSchema = z.object({
  id: OptionIdSchema,
  text: z.string().min(1),
})

const QuestionBaseSchema = z.object({
  id: QuestionIdSchema,
  quizId: QuizIdSchema,
  position: z.number().int().positive(),
  prompt: z.string().min(5),
  /** Shown after submitting, whether the answer was right or wrong. */
  explanation: z.string().min(10),
})

export const SingleChoiceQuestionSchema = QuestionBaseSchema.extend({
  type: z.literal('single'),
  options: z.array(OptionSchema).min(2).max(6),
  correctOptionId: OptionIdSchema,
})

export const MultipleChoiceQuestionSchema = QuestionBaseSchema.extend({
  type: z.literal('multiple'),
  options: z.array(OptionSchema).min(3).max(6),
  correctOptionIds: z.array(OptionIdSchema).min(1),
})

export const TrueFalseQuestionSchema = QuestionBaseSchema.extend({
  type: z.literal('true-false'),
  correct: z.boolean(),
})

export const QuestionSchema = z.discriminatedUnion('type', [
  SingleChoiceQuestionSchema,
  MultipleChoiceQuestionSchema,
  TrueFalseQuestionSchema,
])

export type QuestionOption = z.infer<typeof OptionSchema>
export type SingleChoiceQuestion = z.infer<typeof SingleChoiceQuestionSchema>
export type MultipleChoiceQuestion = z.infer<typeof MultipleChoiceQuestionSchema>
export type TrueFalseQuestion = z.infer<typeof TrueFalseQuestionSchema>
export type Question = z.infer<typeof QuestionSchema>
export type QuestionType = Question['type']
