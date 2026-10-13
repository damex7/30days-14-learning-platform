import { z } from 'zod'

/*
  BRANDED ID TYPES

  TypeScript is STRUCTURALLY typed: two types with the same shape are
  interchangeable. A course ID and a lesson ID are both strings, so without
  help this compiles and fails at runtime:

      const lesson = await getLesson(course.id)   // wrong ID, no error

  A BRAND fixes that. Zod's .brand<'CourseId'>() makes the parsed type

      string & { [z.$brand]: { CourseId: true } }

  The extra property exists only for the compiler: at runtime a CourseId is
  still a plain string (nothing extra is stored, sent or printed). But now
  CourseId and LessonId are DIFFERENT types, so passing one where the other is
  expected is a compile error:

      getLesson(course.id)
      // Argument of type 'CourseId' is not assignable to parameter of type 'LessonId'.

  The only way to GET a branded value is to run a string through its schema
  (.parse). So every ID in the app has been checked at a boundary: the seed
  data (lib/seed.ts), a URL, or localStorage (lib/progress.ts).

  Zod brands the OUTPUT type only. The INPUT type (z.input<...>) is still a
  plain string, which is why the seed files in /data can be written with
  ordinary string literals and become branded once lib/seed.ts parses them.

  Each ID also has a prefix ("crs_", "les_"...). That is a runtime guard for
  the same mistake: a lesson ID pasted into a course field fails the regex.
  Stripe and many other APIs use prefixed IDs for the same reason.
*/

/** "crs_" + lowercase letters, digits and hyphens. */
const prefixed = (prefix: string) => z.string().regex(new RegExp(`^${prefix}_[a-z0-9]+(?:-[a-z0-9]+)*$`), {
  error: `Expected an ID like "${prefix}_example"`,
})

export const InstructorIdSchema = prefixed('ins').brand<'InstructorId'>()
export const CategoryIdSchema = prefixed('cat').brand<'CategoryId'>()
export const CourseIdSchema = prefixed('crs').brand<'CourseId'>()
export const ModuleIdSchema = prefixed('mod').brand<'ModuleId'>()
export const LessonIdSchema = prefixed('les').brand<'LessonId'>()
export const QuizIdSchema = prefixed('quiz').brand<'QuizId'>()
export const QuestionIdSchema = prefixed('q').brand<'QuestionId'>()
export const ReviewIdSchema = prefixed('rev').brand<'ReviewId'>()
export const LearnerIdSchema = prefixed('lrn').brand<'LearnerId'>()
export const AttemptIdSchema = prefixed('att').brand<'AttemptId'>()

/** Answer options are only unique WITHIN a question, so they are short: "a", "b", "c"... */
export const OptionIdSchema = z.string().regex(/^[a-f]$/, { error: 'Expected an option ID from "a" to "f"' }).brand<'OptionId'>()

// z.infer turns each schema into its TypeScript type. These are the ONLY
// declarations of the ID types; there is no hand-written duplicate.
export type InstructorId = z.infer<typeof InstructorIdSchema>
export type CategoryId = z.infer<typeof CategoryIdSchema>
export type CourseId = z.infer<typeof CourseIdSchema>
export type ModuleId = z.infer<typeof ModuleIdSchema>
export type LessonId = z.infer<typeof LessonIdSchema>
export type QuizId = z.infer<typeof QuizIdSchema>
export type QuestionId = z.infer<typeof QuestionIdSchema>
export type ReviewId = z.infer<typeof ReviewIdSchema>
export type LearnerId = z.infer<typeof LearnerIdSchema>
export type AttemptId = z.infer<typeof AttemptIdSchema>
export type OptionId = z.infer<typeof OptionIdSchema>

/*
  SLUGS are NOT branded on purpose. They arrive from URLs as plain strings and
  are only ever used to LOOK SOMETHING UP; a slug that matches nothing is a 404,
  not a bug. IDs are what the rest of the app passes around, so that is where
  the brands earn their keep.
*/
export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
  error: 'Slugs are lowercase words joined by hyphens',
})

/** A calendar date, "2026-10-13". Stored as text so it never shifts time zone. */
export const ISODateSchema = z.iso.date()

/** A moment in time, "2026-10-13T09:30:00.000Z" (always UTC). */
export const ISODateTimeSchema = z.iso.datetime()

export type ISODate = z.infer<typeof ISODateSchema>
export type ISODateTime = z.infer<typeof ISODateTimeSchema>
