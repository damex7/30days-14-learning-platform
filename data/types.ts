import type { SeedRow, SeedTables, TableName } from '@/lib/schema/tables'

/*
  HOW THE SEED FILES ARE TYPED

  Seed files are written with the schemas' INPUT types (z.input, via SeedRow).
  So IDs are plain strings here and optional defaults (like `featured`) may be
  left out. lib/seed.ts parses every row, which checks it and turns the IDs
  into branded types.

  Each course lives in its own file for easier writing and reviewing, but the
  file still holds FLAT rows (modules, lessons, questions... that point at
  each other by ID), not one nested object. data/index.ts concatenates the
  files into the tables.

  The big course files use a TYPE ANNOTATION (`const x: CourseBundle = ...`).
  Small constant lists use `as const satisfies ...` (see categories.ts). On a
  file with a hundred lessons, `as const` would make TypeScript track every
  string as a literal type, which is slow and buys nothing.
*/

/** The tables a course file contributes rows to. Exclude removes members from a union. */
type CourseChildTable = Exclude<TableName, 'courses' | 'instructors' | 'categories'>

/**
 * One course file: the course row plus its child rows.
 * A MAPPED TYPE builds `modules`, `lessons`, `quizzes`, `questions` and
 * `reviews` from the table list, each a readonly array of that table's seed
 * rows.
 */
export type CourseBundle = { readonly course: SeedRow<'courses'> } & {
  readonly [K in CourseChildTable]: SeedTables[K]
}
