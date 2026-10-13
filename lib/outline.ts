import { average, byPosition, groupBy, indexBy } from '@/lib/collections'
import { lessonDurationSeconds } from '@/lib/lessons'
import { err, ok, type Result } from '@/lib/result'
import type { Category, Course, Instructor, Module, Review } from '@/lib/schema/catalog'
import type { CategoryId, CourseId, InstructorId, LessonId, ModuleId, QuizId } from '@/lib/schema/ids'
import type { Lesson, Question, Quiz } from '@/lib/schema/lesson'
import type { Tables } from '@/lib/schema/tables'
import type { CourseOutline, CourseStats, CourseSummary, LessonSummary, ModuleOutline } from '@/lib/types'

/*
  RELATIONSHIPS BY ID, AND THE JOIN

  The seed data could have been written NESTED, one big object per course:

      { title: 'Excel...', instructor: { name: 'Ngozi Eze', bio: '...' },
        modules: [{ title: '...', lessons: [{ ... }] }] }

  It reads nicely, but:
  - Ngozi teaches two courses, so her bio would be copied twice and the copies
    would drift the first time one is edited.
  - "All of Ngozi's courses" or "every review by rating" means digging through
    every course object.
  - It is not how a database stores data, so Day 16 would need a rewrite.

  Instead every entity is a FLAT list of rows that point at each other by ID
  (course.instructorId, module.courseId, lesson.moduleId, question.quizId...).
  Each fact lives in exactly one place. These lists are the tables we will
  create in PostgreSQL on Day 16, column for column.

  The TRADE-OFF: a page that wants "the course with everything in it" has to
  put the pieces back together. That is buildCourseOutline() below, the
  JavaScript version of a SQL JOIN:

      SELECT ... FROM courses
      JOIN instructors ON instructors.id = courses.instructor_id
      JOIN modules     ON modules.course_id = courses.id
      JOIN lessons     ON lessons.module_id = modules.id ...

  To make the joins cheap we first build an INDEX: Maps and grouped Records
  keyed by ID, so each lookup is O(1) instead of scanning a list.
*/

export type TableIndex = {
  tables: Tables
  coursesById: ReadonlyMap<CourseId, Course>
  categoriesById: ReadonlyMap<CategoryId, Category>
  instructorsById: ReadonlyMap<InstructorId, Instructor>
  quizzesById: ReadonlyMap<QuizId, Quiz>
  /** Grouped lookups: Partial<Record<...>>, so a course with no modules gives undefined. */
  modulesByCourse: Partial<Record<CourseId, Module[]>>
  lessonsByModule: Partial<Record<ModuleId, Lesson[]>>
  questionsByQuiz: Partial<Record<QuizId, Question[]>>
  reviewsByCourse: Partial<Record<CourseId, Review[]>>
}

export function buildIndex(tables: Tables): TableIndex {
  return {
    tables,
    coursesById: indexBy(tables.courses, (c) => c.id),
    categoriesById: indexBy(tables.categories, (c) => c.id),
    instructorsById: indexBy(tables.instructors, (i) => i.id),
    quizzesById: indexBy(tables.quizzes, (q) => q.id),
    modulesByCourse: groupBy(tables.modules, (m) => m.courseId),
    lessonsByModule: groupBy(tables.lessons, (l) => l.moduleId),
    questionsByQuiz: groupBy(tables.questions, (q) => q.quizId),
    reviewsByCourse: groupBy(tables.reviews, (r) => r.courseId),
  }
}

/*
  WHAT CAN GO WRONG, AS A TYPE. Each failure is a member of a discriminated
  union with the details that failure needs. The caller decides what each
  means: 'course-not-found' is a 404; the rest are broken seed data, which
  `npm run check:data` should have caught first.
*/
export type OutlineError =
  | { kind: 'course-not-found'; courseId: CourseId }
  | { kind: 'missing-category'; courseId: CourseId; categoryId: CategoryId }
  | { kind: 'missing-instructor'; courseId: CourseId; instructorId: InstructorId }
  | { kind: 'missing-quiz'; lessonId: LessonId; quizId: QuizId }

export function describeOutlineError(error: OutlineError): string {
  switch (error.kind) {
    case 'course-not-found':
      return `Course ${error.courseId} does not exist`
    case 'missing-category':
      return `Course ${error.courseId} points at category ${error.categoryId}, which does not exist`
    case 'missing-instructor':
      return `Course ${error.courseId} points at instructor ${error.instructorId}, which does not exist`
    case 'missing-quiz':
      return `Lesson ${error.lessonId} points at quiz ${error.quizId}, which does not exist`
  }
  // No `default` needed here: the function's return type is string, and if a
  // case were missing TypeScript would report "Function lacks ending return
  // statement". Another way to get exhaustiveness for free.
}

/**
 * Joins one course with its category, instructor, modules, lessons, question
 * counts and reviews, and CALCULATES its stats.
 *
 * Stats are calculated here on every build of the outline, never stored on
 * the course: duration comes from the lessons, the rating from the reviews.
 * Add a lesson or a review and the numbers are right immediately; there is
 * no second copy to forget to update.
 */
export function buildCourseOutline(courseId: CourseId, index: TableIndex): Result<CourseOutline, OutlineError> {
  const course = index.coursesById.get(courseId)
  if (!course) return err({ kind: 'course-not-found', courseId })

  const category = index.categoriesById.get(course.categoryId)
  if (!category) return err({ kind: 'missing-category', courseId, categoryId: course.categoryId })

  const instructor = index.instructorsById.get(course.instructorId)
  if (!instructor) return err({ kind: 'missing-instructor', courseId, instructorId: course.instructorId })

  const modules: ModuleOutline[] = []
  const lessons: LessonSummary[] = []

  for (const mod of byPosition(index.modulesByCourse[courseId] ?? [])) {
    const moduleLessons: LessonSummary[] = []
    for (const lesson of byPosition(index.lessonsByModule[mod.id] ?? [])) {
      let questionCount = 0
      if (lesson.kind === 'quiz') {
        if (!index.quizzesById.has(lesson.quizId)) return err({ kind: 'missing-quiz', lessonId: lesson.id, quizId: lesson.quizId })
        questionCount = index.questionsByQuiz[lesson.quizId]?.length ?? 0
      }
      const summary: LessonSummary = {
        id: lesson.id,
        moduleId: lesson.moduleId,
        courseId,
        slug: lesson.slug,
        position: lesson.position,
        title: lesson.title,
        summary: lesson.summary,
        kind: lesson.kind,
        durationSeconds: lessonDurationSeconds(lesson, questionCount),
        questionCount,
        isPreview: lessons.length === 0, // the very first lesson of the course
      }
      moduleLessons.push(summary)
      lessons.push(summary)
    }
    modules.push({ ...mod, lessons: moduleLessons, durationSeconds: sum(moduleLessons.map((l) => l.durationSeconds)) })
  }

  const reviews = index.reviewsByCourse[courseId] ?? []
  const stats: CourseStats = {
    moduleCount: modules.length,
    lessonCount: lessons.length,
    quizCount: lessons.filter((l) => l.kind === 'quiz').length,
    durationSeconds: sum(lessons.map((l) => l.durationSeconds)),
    averageRating: average(reviews.map((r) => r.rating)),
    reviewCount: reviews.length,
  }

  return ok({ ...course, category, instructor, modules, lessons, stats })
}

/** Trims a full outline down to the card-sized CourseSummary. */
export function toSummary(outline: CourseOutline): CourseSummary {
  return {
    id: outline.id,
    slug: outline.slug,
    title: outline.title,
    subtitle: outline.subtitle,
    level: outline.level,
    priceKobo: outline.priceKobo,
    cover: outline.cover,
    publishedAt: outline.publishedAt,
    language: outline.language,
    featured: outline.featured,
    category: { slug: outline.category.slug, name: outline.category.name, tone: outline.category.tone },
    instructor: { slug: outline.instructor.slug, name: outline.instructor.name },
    stats: outline.stats,
  }
}

const sum = (values: readonly number[]) => values.reduce((total, v) => total + v, 0)
