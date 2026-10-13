import type { CategorySlug, DurationFilter, Level, PriceFilter, SortKey } from '@/lib/constants'
import type { Category, Course, Instructor, Module } from '@/lib/schema/catalog'
import type { CourseId } from '@/lib/schema/ids'
import type { Enrollment } from '@/lib/schema/learner'
import type { Lesson, LessonKind, Question, Quiz, QuizLesson } from '@/lib/schema/lesson'

/*
  VIEW TYPES: shapes the PAGES work with, all derived from the schema types.

  The schema types (lib/schema/*) describe a single row. Pages usually need
  either LESS (a card doesn't need the full description) or MORE (a course
  page needs the course plus its modules, lessons and stats). Utility types
  build those shapes from the originals, so a renamed field in a schema shows
  up as an error here instead of drifting.
*/

/** Numbers CALCULATED from lessons and reviews (lib/outline.ts). Never stored. */
export type CourseStats = {
  moduleCount: number
  lessonCount: number
  quizCount: number
  durationSeconds: number
  /** null when there are no reviews yet: "no rating" is not the same as a rating of 0. */
  averageRating: number | null
  reviewCount: number
}

/**
 * PICK<T, Keys>: a new type with only the listed properties.
 *
 * A course CARD needs about a third of a Course. Passing the whole course to a
 * card means sending the long description to every catalogue page for
 * nothing, and makes it unclear what the card actually depends on.
 */
export type CourseSummary = Pick<
  Course,
  'id' | 'slug' | 'title' | 'subtitle' | 'level' | 'priceKobo' | 'cover' | 'publishedAt' | 'language' | 'featured'
> & {
  category: Pick<Category, 'slug' | 'name' | 'tone'>
  instructor: Pick<Instructor, 'slug' | 'name'>
  stats: CourseStats
}

/**
 * One lesson as listed in a course outline: everything EXCEPT its content.
 *
 * OMIT<T, Keys> is the opposite of Pick: all properties but these. Note that
 * Pick and Omit are NOT "distributive" over a union: Omit<Lesson, ...> keeps
 * only the fields ALL three kinds share, and `kind` becomes the plain union
 * 'video' | 'article' | 'quiz'. That is exactly right for an outline row,
 * which shows any kind of lesson the same way.
 */
export type LessonSummary = Omit<Lesson, 'transcript' | 'bodyMarkdown' | 'quizId'> & {
  kind: LessonKind
  courseId: CourseId
  /** Calculated: video length, article reading time, or 1 minute per quiz question. */
  durationSeconds: number
  /** Number of questions for a quiz lesson, 0 otherwise. */
  questionCount: number
  /** The first lesson of every course can be opened without enrolling. */
  isPreview: boolean
}

export type ModuleOutline = Module & {
  lessons: LessonSummary[]
  durationSeconds: number
}

/**
 * The whole course, JOINED: the course row plus the rows it points at.
 * Built from the flat tables by buildCourseOutline() in lib/outline.ts.
 * The intersection (&) adds properties to Course without repeating its fields.
 */
export type CourseOutline = Course & {
  category: Category
  instructor: Instructor
  modules: ModuleOutline[]
  /** Every lesson in order, across modules: handy for "next lesson" and progress. */
  lessons: LessonSummary[]
  stats: CourseStats
}

/**
 * The slice of an outline the learner's dashboard needs to work out progress.
 * Pick again: the dashboard gets every course, so it should get less of each.
 */
export type ProgressOutline = Pick<CourseOutline, 'id' | 'slug' | 'title' | 'cover' | 'lessons' | 'stats'> & {
  instructorName: string
}

/*
  A lesson WITH its content, for the lesson player.

  Videos and articles already carry their content. A quiz lesson only has a
  quizId, so for the player we attach the quiz and its questions.

  EXCLUDE<Union, X> removes members from a union; EXTRACT keeps them. So
  LessonDetail is "video or article, unchanged" OR "a quiz lesson plus its
  questions". It has the same three `kind`s as Lesson, so the same exhaustive
  switch works on it.
*/
export type QuizLessonDetail = QuizLesson & { quiz: Quiz; questions: Question[] }
export type LessonDetail = Exclude<Lesson, { kind: 'quiz' }> | QuizLessonDetail

export type LessonPage = {
  outline: CourseOutline
  lesson: LessonDetail
  summary: LessonSummary
  moduleTitle: string
  previous: LessonSummary | null
  next: LessonSummary | null
}

/**
 * PARTIAL<T>: every property becomes optional.
 *
 * A filter is "some subset of these": no filters, just a level, or a level and
 * a price. Writing `{ category?: ...; level?: ... }` by hand would repeat the
 * field list; Partial derives it.
 */
export type CatalogFilters = Partial<{
  category: CategorySlug
  level: Level
  price: PriceFilter
  duration: DurationFilter
}>

export type CatalogQuery = CatalogFilters & { sort: SortKey }

/** OMIT for a "create" input: the caller says WHICH course, the store adds WHEN. */
export type NewEnrollment = Omit<Enrollment, 'enrolledAt'>

export type InstructorProfile = {
  instructor: Instructor
  courses: CourseSummary[]
  averageRating: number | null
  lessonCount: number
}

export type CategoryWithCount = Category & { courseCount: number }
