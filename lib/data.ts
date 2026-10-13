// THE DATA ACCESS LAYER. Every page gets catalogue data from here and nowhere
// else; nothing outside this file (and the check script) imports /data.
//
// Today these functions read the typed seed data. On Day 16 their BODIES
// become PostgreSQL queries, while their names, arguments and return types
// stay the same. Every function is already `async` for that reason: a
// database call is async, so the pages already `await` as if it were one.
//
// `server-only` makes it a build error to import this file into a Client
// Component, so database code (and, later, credentials) can never end up in
// the browser bundle.
import 'server-only'

import { cacheLife } from 'next/cache'
import { seed } from '@/data'
import { byPosition } from '@/lib/collections'
import { DURATION_BUCKETS, type SortKey } from '@/lib/constants'
import { assertNever } from '@/lib/guards'
import { buildCourseOutline, buildIndex, describeOutlineError, toSummary, type TableIndex } from '@/lib/outline'
import { parseSeed } from '@/lib/seed'
import type { Instructor, Review } from '@/lib/schema/catalog'
import type { CourseId, LessonId } from '@/lib/schema/ids'
import type { Lesson } from '@/lib/schema/lesson'
import type {
  CatalogFilters,
  CatalogQuery,
  CategoryWithCount,
  CourseOutline,
  CourseSummary,
  InstructorProfile,
  LessonDetail,
  LessonPage,
  ProgressOutline,
} from '@/lib/types'

// ---------------------------------------------------------------------------
// Plumbing
// ---------------------------------------------------------------------------

type Database = TableIndex & { lessonsById: ReadonlyMap<LessonId, Lesson> }
let database: Database | null = null

/**
 * Parses the seed ONCE per server process and builds the lookup index.
 * Parsing is where plain seed strings become branded IDs, and where bad seed
 * data stops the app with a clear message instead of a confusing page later.
 * (Day 16: this becomes the database connection pool.)
 */
function db(): Database {
  if (database) return database
  const parsed = parseSeed(seed)
  if (!parsed.ok) {
    const lines = parsed.error.slice(0, 10).map((p) => `  ${p.where}: ${p.message}`)
    throw new Error(`Seed data failed validation. Run \`npm run check:data\` for the full report.\n${lines.join('\n')}`)
  }
  const index = buildIndex(parsed.value)
  database = { ...index, lessonsById: new Map(parsed.value.lessons.map((l) => [l.id, l])) }
  return database
}

/** Builds an outline, turning anything but "not found" into a loud error (broken seed data). */
function outlineFor(courseId: CourseId): CourseOutline {
  const result = buildCourseOutline(courseId, db())
  if (!result.ok) throw new Error(describeOutlineError(result.error))
  return result.value
}

function allOutlines(): CourseOutline[] {
  return db().tables.courses.map((c) => outlineFor(c.id))
}

function courseIdForSlug(slug: string): CourseId | undefined {
  return db().tables.courses.find((c) => c.slug === slug)?.id
}

/*
  CACHING. Each exported read starts with 'use cache' and cacheLife('max').
  The seed data only changes when the app is rebuilt, so these results are
  computed once and reused, and pages that use them are prerendered into
  static HTML at build time.

  Day 16: when data lives in PostgreSQL and instructors can edit it, each
  function also gets a cacheTag('course:<id>'), and saving a course calls
  revalidateTag() so the next visitor sees the change.
*/

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

export async function listCategories(): Promise<CategoryWithCount[]> {
  'use cache'
  cacheLife('max')
  const { tables } = db()
  return tables.categories.map((category) => ({
    ...category,
    courseCount: tables.courses.filter((c) => c.categoryId === category.id).length,
  }))
}

/*
  RECORD<SortKey, Comparator>: one sort function for every sort key. Adding a
  key to SORT_KEYS without adding its comparator here is a compile error.
*/
type Comparator = (a: CourseSummary, b: CourseSummary) => number
const SORTERS: Record<SortKey, Comparator> = {
  newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
  // Unrated courses (null) sort after every rated one.
  rating: (a, b) => (b.stats.averageRating ?? -1) - (a.stats.averageRating ?? -1),
  shortest: (a, b) => a.stats.durationSeconds - b.stats.durationSeconds,
  'price-low': (a, b) => a.priceKobo - b.priceKobo,
  'price-high': (a, b) => b.priceKobo - a.priceKobo,
}

/** Does a course pass every filter that is set? Unset (undefined) filters pass everything. */
function matches(course: CourseSummary, filters: CatalogFilters): boolean {
  if (filters.category && course.category.slug !== filters.category) return false
  if (filters.level && course.level !== filters.level) return false
  if (filters.price) {
    switch (filters.price) {
      case 'free':
        if (course.priceKobo !== 0) return false
        break
      case 'paid':
        if (course.priceKobo === 0) return false
        break
      default:
        assertNever(filters.price)
    }
  }
  if (filters.duration) {
    const { min, max } = DURATION_BUCKETS[filters.duration]
    if (course.stats.durationSeconds < min || course.stats.durationSeconds >= max) return false
  }
  return true
}

/** The catalogue: filter, then sort. Every option comes from the URL (lib/search-params.ts). */
export async function listCourses(query: CatalogQuery): Promise<CourseSummary[]> {
  'use cache'
  cacheLife('max')
  const { sort, ...filters } = query
  return allOutlines()
    .map(toSummary)
    .filter((course) => matches(course, filters))
    .sort((a, b) => SORTERS[sort](a, b) || a.title.localeCompare(b.title))
}

export async function getFeaturedCourses(limit = 4): Promise<CourseSummary[]> {
  'use cache'
  cacheLife('max')
  return allOutlines()
    .filter((c) => c.featured)
    .map(toSummary)
    .sort(SORTERS.newest)
    .slice(0, limit)
}

/** Totals for the home page hero, all calculated. */
export async function getCatalogTotals(): Promise<{ courses: number; lessons: number; instructors: number; freeCourses: number }> {
  'use cache'
  cacheLife('max')
  const outlines = allOutlines()
  return {
    courses: outlines.length,
    lessons: outlines.reduce((n, o) => n + o.stats.lessonCount, 0),
    instructors: db().tables.instructors.length,
    freeCourses: outlines.filter((o) => o.priceKobo === 0).length,
  }
}

// ---------------------------------------------------------------------------
// One course
// ---------------------------------------------------------------------------

/** The full outline for /courses/[slug], or null for an unknown slug (a 404). */
export async function getCourseOutline(slug: string): Promise<CourseOutline | null> {
  'use cache'
  cacheLife('max')
  const id = courseIdForSlug(slug)
  return id ? outlineFor(id) : null
}

export async function getCourseReviews(courseId: CourseId): Promise<Review[]> {
  'use cache'
  cacheLife('max')
  return [...(db().reviewsByCourse[courseId] ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/**
 * Attaches a lesson's content for the player. Videos and articles already
 * carry it; a quiz lesson gets its quiz and questions joined in. The
 * exhaustive switch means a new lesson kind must decide here what it needs.
 */
function toDetail(lesson: Lesson): LessonDetail {
  switch (lesson.kind) {
    case 'video':
    case 'article':
      return lesson
    case 'quiz': {
      const quiz = db().quizzesById.get(lesson.quizId)
      if (!quiz) throw new Error(`Lesson ${lesson.id} points at missing quiz ${lesson.quizId}`)
      return { ...lesson, quiz, questions: byPosition(db().questionsByQuiz[quiz.id] ?? []) }
    }
    default:
      return assertNever(lesson, 'Unknown lesson kind')
  }
}

/** Everything the lesson player needs, or null if the course or lesson doesn't exist. */
export async function getLessonPage(courseSlug: string, lessonSlug: string): Promise<LessonPage | null> {
  'use cache'
  cacheLife('max')
  const id = courseIdForSlug(courseSlug)
  if (!id) return null
  const outline = outlineFor(id)
  const position = outline.lessons.findIndex((l) => l.slug === lessonSlug)
  const summary = outline.lessons[position] // noUncheckedIndexedAccess: LessonSummary | undefined
  if (!summary) return null
  const lesson = db().lessonsById.get(summary.id)
  if (!lesson) return null
  return {
    outline,
    lesson: toDetail(lesson),
    summary,
    moduleTitle: outline.modules.find((m) => m.id === summary.moduleId)?.title ?? '',
    previous: outline.lessons[position - 1] ?? null,
    next: outline.lessons[position + 1] ?? null,
  }
}

// ---------------------------------------------------------------------------
// Instructors
// ---------------------------------------------------------------------------

export async function listInstructors(): Promise<(Instructor & { courseCount: number })[]> {
  'use cache'
  cacheLife('max')
  const { tables } = db()
  return tables.instructors.map((instructor) => ({
    ...instructor,
    courseCount: tables.courses.filter((c) => c.instructorId === instructor.id).length,
  }))
}

export async function getInstructor(slug: string): Promise<InstructorProfile | null> {
  'use cache'
  cacheLife('max')
  const instructor = db().tables.instructors.find((i) => i.slug === slug)
  if (!instructor) return null
  const outlines = allOutlines().filter((o) => o.instructorId === instructor.id)
  // The instructor's average across ALL their reviews, not an average of averages.
  const ratings = outlines.flatMap((o) => (db().reviewsByCourse[o.id] ?? []).map((r) => r.rating))
  return {
    instructor,
    courses: outlines.map(toSummary).sort(SORTERS.newest),
    averageRating: ratings.length ? ratings.reduce((s, r) => s + r, 0) / ratings.length : null,
    lessonCount: outlines.reduce((n, o) => n + o.stats.lessonCount, 0),
  }
}

// ---------------------------------------------------------------------------
// For the learner's progress views (dashboard, home, certificate)
// ---------------------------------------------------------------------------

function toProgressOutline(outline: CourseOutline): ProgressOutline {
  return {
    id: outline.id,
    slug: outline.slug,
    title: outline.title,
    cover: outline.cover,
    lessons: outline.lessons,
    stats: outline.stats,
    instructorName: outline.instructor.name,
  }
}

/**
 * Every course, trimmed to what progress calculations need. Progress lives in
 * the browser today, so the dashboard receives all courses and picks the
 * enrolled ones on the client. (Day 16: the server will know who is signed in
 * and send only their courses.)
 */
export async function listProgressOutlines(): Promise<ProgressOutline[]> {
  'use cache'
  cacheLife('max')
  return allOutlines().map(toProgressOutline)
}

export async function getProgressOutline(courseSlug: string): Promise<ProgressOutline | null> {
  'use cache'
  cacheLife('max')
  const id = courseIdForSlug(courseSlug)
  return id ? toProgressOutline(outlineFor(id)) : null
}

// ---------------------------------------------------------------------------
// For generateStaticParams
// ---------------------------------------------------------------------------

export async function listCourseSlugs(): Promise<string[]> {
  'use cache'
  cacheLife('max')
  return db().tables.courses.map((c) => c.slug)
}

export async function listInstructorSlugs(): Promise<string[]> {
  'use cache'
  cacheLife('max')
  return db().tables.instructors.map((i) => i.slug)
}

export async function listLessonParams(): Promise<{ courseSlug: string; lessonSlug: string }[]> {
  'use cache'
  cacheLife('max')
  return allOutlines().flatMap((o) => o.lessons.map((l) => ({ courseSlug: o.slug, lessonSlug: l.slug })))
}
