import { z } from 'zod'
import { CategorySchema, CourseSchema, InstructorSchema, ModuleSchema, ReviewSchema } from '@/lib/schema/catalog'
import { LessonSchema, QuestionSchema, QuizSchema } from '@/lib/schema/lesson'

/*
  THE "TABLES"

  The catalogue is stored as FLAT LISTS of rows, one list per entity, that
  point at each other by ID. That is exactly how they will look as PostgreSQL
  tables on Day 16: `courses`, `modules`, `lessons`, ... each row with foreign
  keys like `course_id`.

  One object maps each table name to the schema for its rows. Both table types
  below are generated from it with a MAPPED TYPE, so adding a table here adds
  it everywhere.
*/
export const TABLE_SCHEMAS = {
  instructors: InstructorSchema,
  categories: CategorySchema,
  courses: CourseSchema,
  modules: ModuleSchema,
  lessons: LessonSchema,
  quizzes: QuizSchema,
  questions: QuestionSchema,
  reviews: ReviewSchema,
} as const

/** 'instructors' | 'categories' | 'courses' | ... (keyof turns an object's keys into a union). */
export type TableName = keyof typeof TABLE_SCHEMAS

/*
  MAPPED TYPES: `{ [K in TableName]: ... }` loops over every key and builds a
  property for each.

  - Tables: what the app works with after parsing (z.infer = OUTPUT type:
    branded IDs, defaults filled in).
  - SeedTables: what the files in /data contain before parsing (z.input =
    INPUT type: plain strings, optional defaults).

  Both are READONLY (`readonly` on the property AND `readonly T[]` for the
  array): seed data is reference data, and nothing in the app is allowed to
  push to it or reassign it. The compiler enforces that; no Object.freeze needed.
*/
export type Tables = {
  readonly [K in TableName]: readonly z.infer<(typeof TABLE_SCHEMAS)[K]>[]
}

export type SeedTables = {
  readonly [K in TableName]: readonly z.input<(typeof TABLE_SCHEMAS)[K]>[]
}

/** One row of a seed table, e.g. SeedRow<'courses'> is the input type of a course. */
export type SeedRow<K extends TableName> = SeedTables[K][number]
