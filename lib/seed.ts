import type { z } from 'zod'
import { CATEGORY_SLUGS } from '@/lib/constants'
import { duplicates, groupBy } from '@/lib/collections'
import { assertNever } from '@/lib/guards'
import { buildIndex } from '@/lib/outline'
import { err, ok, type Result } from '@/lib/result'
import { CategorySchema, CourseSchema, InstructorSchema, ModuleSchema, ReviewSchema } from '@/lib/schema/catalog'
import type { LessonKind } from '@/lib/schema/lesson'
import { LessonSchema, QuestionSchema, QuizSchema } from '@/lib/schema/lesson'
import type { SeedTables, TableName, Tables } from '@/lib/schema/tables'

/*
  SEED VALIDATION, in two stages:

  1. parseSeed(): run every row through its Zod schema. This checks each row
     ON ITS OWN (types, formats, required fields) and turns plain strings into
     branded IDs. lib/data.ts calls this when the app starts.

  2. checkSeed(): check rows AGAINST EACH OTHER: references point at rows that
     exist, slugs are unique, quiz answers point at real options... A schema
     looks at one row at a time, so it can't know any of this. In a database,
     foreign keys and UNIQUE constraints do this job; until Day 16, we do.

  `npm run check:data` (scripts/check-data.ts) runs both and fails loudly.
*/

export type SeedProblem = {
  kind: 'schema' | 'duplicate' | 'reference' | 'rule'
  table: TableName
  /** Which row, e.g. "courses[3] crs_excel-for-small-business". */
  where: string
  message: string
}

const rowLabel = (table: TableName, index: number, row: unknown) => {
  const id = typeof row === 'object' && row !== null && 'id' in row && typeof row.id === 'string' ? ` ${row.id}` : ''
  return `${table}[${index}]${id}`
}

/**
 * Parses one table. Generic over the schema S, so the return type is exactly
 * that schema's OUTPUT type: parseRows(CourseSchema, ...) returns Course[].
 *
 * `rows` is `readonly unknown[]`: this function must not trust its input.
 * (`unknown` is the safe opposite of `any`: you can't use an unknown value
 * until you've checked what it is, and safeParse is that check.)
 */
function parseRows<S extends z.ZodType>(table: TableName, schema: S, rows: readonly unknown[], problems: SeedProblem[]): z.output<S>[] {
  const parsed: z.output<S>[] = []
  rows.forEach((row, i) => {
    const result = schema.safeParse(row)
    if (result.success) {
      parsed.push(result.data)
      return
    }
    for (const issue of result.error.issues) {
      const path = issue.path.length ? `${issue.path.join('.')}: ` : ''
      problems.push({ kind: 'schema', table, where: rowLabel(table, i, row), message: `${path}${issue.message}` })
    }
  })
  return parsed
}

/** Stage 1: every row against its schema. */
export function parseSeed(seed: SeedTables): Result<Tables, SeedProblem[]> {
  const problems: SeedProblem[] = []
  // Listing each table by hand (instead of looping over TABLE_SCHEMAS) keeps
  // the link between a table name and its row type visible to the compiler.
  // `satisfies Tables` then confirms none is missing or mistyped.
  const tables = {
    instructors: parseRows('instructors', InstructorSchema, seed.instructors, problems),
    categories: parseRows('categories', CategorySchema, seed.categories, problems),
    courses: parseRows('courses', CourseSchema, seed.courses, problems),
    modules: parseRows('modules', ModuleSchema, seed.modules, problems),
    lessons: parseRows('lessons', LessonSchema, seed.lessons, problems),
    quizzes: parseRows('quizzes', QuizSchema, seed.quizzes, problems),
    questions: parseRows('questions', QuestionSchema, seed.questions, problems),
    reviews: parseRows('reviews', ReviewSchema, seed.reviews, problems),
  } satisfies Tables
  return problems.length ? err(problems) : ok(tables)
}

/** Stage 2: rows against each other. Returns every problem found, not just the first. */
export function checkSeed(tables: Tables): SeedProblem[] {
  const problems: SeedProblem[] = []
  const report = (kind: SeedProblem['kind'], table: TableName, where: string, message: string) =>
    problems.push({ kind, table, where, message })
  const index = buildIndex(tables)

  // --- Unique IDs and slugs -------------------------------------------------
  const unique = (table: TableName, field: string, values: readonly string[]) => {
    for (const dupe of duplicates(values)) report('duplicate', table, `${table}.${field}`, `"${dupe}" is used more than once`)
  }
  unique('instructors', 'id', tables.instructors.map((r) => r.id))
  unique('instructors', 'slug', tables.instructors.map((r) => r.slug))
  unique('categories', 'id', tables.categories.map((r) => r.id))
  unique('categories', 'slug', tables.categories.map((r) => r.slug))
  unique('courses', 'id', tables.courses.map((r) => r.id))
  unique('courses', 'slug', tables.courses.map((r) => r.slug))
  unique('modules', 'id', tables.modules.map((r) => r.id))
  unique('lessons', 'id', tables.lessons.map((r) => r.id))
  unique('quizzes', 'id', tables.quizzes.map((r) => r.id))
  unique('questions', 'id', tables.questions.map((r) => r.id))
  unique('reviews', 'id', tables.reviews.map((r) => r.id))

  // Every category slug from lib/constants.ts must have a row.
  for (const slug of CATEGORY_SLUGS) {
    if (!tables.categories.some((c) => c.slug === slug)) report('rule', 'categories', 'categories', `No category row for "${slug}"`)
  }

  // --- Courses --------------------------------------------------------------
  for (const course of tables.courses) {
    const where = `courses ${course.id}`
    if (!index.categoriesById.has(course.categoryId))
      report('reference', 'courses', where, `categoryId "${course.categoryId}" does not match any category`)
    if (!index.instructorsById.has(course.instructorId))
      report('reference', 'courses', where, `instructorId "${course.instructorId}" does not match any instructor`)
    if (course.updatedAt < course.publishedAt)
      report('rule', 'courses', where, `updatedAt ${course.updatedAt} is before publishedAt ${course.publishedAt}`)

    const modules = index.modulesByCourse[course.id] ?? []
    if (modules.length < 3 || modules.length > 5) report('rule', 'courses', where, `has ${modules.length} modules (expected 3 to 5)`)
    checkPositions('modules', where, modules.map((m) => m.position), report)

    // Lesson slugs only need to be unique WITHIN a course: the URL is
    // /learn/[courseSlug]/[lessonSlug].
    const courseLessons = modules.flatMap((m) => index.lessonsByModule[m.id] ?? [])
    for (const dupe of duplicates(courseLessons.map((l) => l.slug)))
      report('duplicate', 'lessons', where, `lesson slug "${dupe}" is used more than once in this course`)

    const kinds = new Set<LessonKind>(courseLessons.map((l) => l.kind))
    for (const kind of ['video', 'article', 'quiz'] as const satisfies readonly LessonKind[])
      if (!kinds.has(kind)) report('rule', 'courses', where, `has no ${kind} lessons (every course mixes all three kinds)`)
  }

  // --- Modules --------------------------------------------------------------
  for (const mod of tables.modules) {
    const where = `modules ${mod.id}`
    if (!index.coursesById.has(mod.courseId)) report('reference', 'modules', where, `courseId "${mod.courseId}" does not match any course`)
    const lessons = index.lessonsByModule[mod.id] ?? []
    if (lessons.length < 3 || lessons.length > 6) report('rule', 'modules', where, `has ${lessons.length} lessons (expected 3 to 6)`)
    checkPositions('lessons', where, lessons.map((l) => l.position), report)
  }

  // --- Lessons: an exhaustive switch, so a new kind needs its own checks ----
  const moduleIds = new Set(tables.modules.map((m) => m.id))
  const quizLessonCount = groupBy(
    tables.lessons.flatMap((l) => (l.kind === 'quiz' ? [l.quizId] : [])),
    (quizId) => quizId,
  )
  for (const lesson of tables.lessons) {
    const where = `lessons ${lesson.id}`
    if (!moduleIds.has(lesson.moduleId)) report('reference', 'lessons', where, `moduleId "${lesson.moduleId}" does not match any module`)
    switch (lesson.kind) {
      case 'video':
        if (lesson.transcript.trim().split(/\s+/).length < 40) report('rule', 'lessons', where, 'video transcript is too short to be useful')
        break
      case 'article':
        // Reading time is calculated from the body, so a body is all we need.
        break
      case 'quiz': {
        const quiz = index.quizzesById.get(lesson.quizId)
        if (!quiz) report('reference', 'lessons', where, `quizId "${lesson.quizId}" does not match any quiz`)
        else if (quiz.lessonId !== lesson.id)
          report('reference', 'quizzes', `quizzes ${quiz.id}`, `belongs to lesson ${quiz.lessonId} but lesson ${lesson.id} uses it`)
        if ((quizLessonCount[lesson.quizId]?.length ?? 0) > 1) report('duplicate', 'lessons', where, `quiz ${lesson.quizId} is used by more than one lesson`)
        break
      }
      default:
        assertNever(lesson, 'Unknown lesson kind')
    }
  }

  // --- Quizzes --------------------------------------------------------------
  const lessonsById = new Map(tables.lessons.map((l) => [l.id, l]))
  for (const quiz of tables.quizzes) {
    const where = `quizzes ${quiz.id}`
    const lesson = lessonsById.get(quiz.lessonId)
    if (!lesson) report('reference', 'quizzes', where, `lessonId "${quiz.lessonId}" does not match any lesson`)
    else if (lesson.kind !== 'quiz') report('reference', 'quizzes', where, `lesson ${lesson.id} is a ${lesson.kind} lesson, not a quiz`)
    const questions = index.questionsByQuiz[quiz.id] ?? []
    if (questions.length < 2) report('rule', 'quizzes', where, `has ${questions.length} questions (expected at least 2)`)
    checkPositions('questions', where, questions.map((q) => q.position), report)
  }

  // --- Questions: answers must point at real options --------------------------
  for (const question of tables.questions) {
    const where = `questions ${question.id}`
    if (!index.quizzesById.has(question.quizId)) report('reference', 'questions', where, `quizId "${question.quizId}" does not match any quiz`)
    switch (question.type) {
      case 'single': {
        const ids = question.options.map((o) => o.id)
        for (const dupe of duplicates(ids)) report('duplicate', 'questions', where, `option "${dupe}" appears twice`)
        if (!ids.includes(question.correctOptionId))
          report('reference', 'questions', where, `correctOptionId "${question.correctOptionId}" is not one of the options (${ids.join(', ')})`)
        break
      }
      case 'multiple': {
        const ids = question.options.map((o) => o.id)
        for (const dupe of duplicates(ids)) report('duplicate', 'questions', where, `option "${dupe}" appears twice`)
        for (const id of question.correctOptionIds)
          if (!ids.includes(id)) report('reference', 'questions', where, `correct option "${id}" is not one of the options (${ids.join(', ')})`)
        if (question.correctOptionIds.length >= ids.length)
          report('rule', 'questions', where, 'every option is correct, so the question tests nothing')
        break
      }
      case 'true-false':
        // The answer is a boolean: there is nothing it could fail to point at.
        break
      default:
        assertNever(question, 'Unknown question type')
    }
  }

  // --- Reviews --------------------------------------------------------------
  for (const review of tables.reviews) {
    const where = `reviews ${review.id}`
    const course = index.coursesById.get(review.courseId)
    if (!course) report('reference', 'reviews', where, `courseId "${review.courseId}" does not match any course`)
    else if (review.createdAt < course.publishedAt)
      report('rule', 'reviews', where, `written on ${review.createdAt}, before the course was published (${course.publishedAt})`)
  }

  return problems
}

/** Positions must run 1, 2, 3... with no gaps or repeats. */
function checkPositions(
  child: TableName,
  where: string,
  positions: readonly number[],
  report: (kind: SeedProblem['kind'], table: TableName, where: string, message: string) => void,
) {
  const sorted = [...positions].sort((a, b) => a - b)
  const expected = sorted.map((_, i) => i + 1)
  if (sorted.join() !== expected.join())
    report('rule', child, where, `${child} positions are [${sorted.join(', ')}], expected [${expected.join(', ')}]`)
}

/** Both stages. Used by `npm run check:data`. */
export function validateSeed(seed: SeedTables): Result<Tables, SeedProblem[]> {
  const parsed = parseSeed(seed)
  if (!parsed.ok) return parsed
  const problems = checkSeed(parsed.value)
  return problems.length ? err(problems) : parsed
}
