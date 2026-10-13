import { z } from 'zod'
import { CATEGORY_SLUGS, LANGUAGES, LEVELS, TONES } from '@/lib/constants'
import { KoboSchema } from '@/lib/money'
import {
  CategoryIdSchema,
  CourseIdSchema,
  InstructorIdSchema,
  ISODateSchema,
  ModuleIdSchema,
  ReviewIdSchema,
  SlugSchema,
} from '@/lib/schema/ids'

/*
  SCHEMA FIRST: WHY THE TYPES COME FROM ZOD

  The usual way is to write each shape twice: a TypeScript `type Course = {...}`
  for the compiler, and validation code for runtime. The two copies drift. Add
  a field to the type and forget the validator, and bad data gets through
  while the compiler says everything is fine.

  Here each shape is written ONCE, as a Zod schema, and the type is DERIVED:

      export const CourseSchema = z.object({ ... })
      export type Course = z.infer<typeof CourseSchema>

  - The type can't disagree with the check, because it IS the check.
  - The same schema guards every boundary: the seed data (scripts/check-data.ts
    and lib/seed.ts), the URL (lib/search-params.ts) and localStorage
    (lib/progress.ts). On Day 16 it will guard database rows too.
  - TypeScript types disappear when the code runs. Only a schema can say "this
    JSON from outside really is a Course".

  z.infer gives the OUTPUT type (after parsing: defaults filled in, brands
  applied). z.input gives the INPUT type (what you may write before parsing).
  The seed files in /data are typed with z.input, see data/types.ts.

  NOTE WHAT IS MISSING from Course: duration, lesson count and average rating.
  Those are CALCULATED from lessons and reviews (lib/outline.ts), never stored.
  A stored copy would go stale the moment someone adds a lesson or a review,
  and then two numbers that should agree would disagree.
*/

export const InstructorSchema = z.object({
  id: InstructorIdSchema,
  slug: SlugSchema,
  name: z.string().min(2),
  /** One line under the name, e.g. "Software developer, Lagos". */
  headline: z.string().min(5).max(80),
  bio: z.string().min(40),
  location: z.string().min(2),
  expertise: z.array(z.string().min(2)).min(1),
})

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  // z.enum built from the `as const` list, so a category row can only use
  // one of the five known slugs, and CategorySlug is a literal union.
  slug: z.enum(CATEGORY_SLUGS),
  name: z.string().min(2),
  description: z.string().min(10),
  tone: z.enum(TONES),
})

export const CoverImageSchema = z.object({
  src: z.string().regex(/^\/covers\/[a-z0-9-]+\.svg$/, { error: 'Covers live in /public/covers as SVG files' }),
  /** Every image needs real alt text: what a sighted learner would see. */
  alt: z.string().min(15),
})

export const CourseSchema = z.object({
  id: CourseIdSchema,
  slug: SlugSchema,
  title: z.string().min(5).max(70),
  subtitle: z.string().min(10).max(140),
  description: z.string().min(80),
  level: z.enum(LEVELS),
  // RELATIONSHIPS BY ID: the course stores WHICH category and instructor,
  // not a copy of them. See lib/outline.ts for why.
  categoryId: CategoryIdSchema,
  instructorId: InstructorIdSchema,
  /** In kobo. 0 means free. */
  priceKobo: KoboSchema,
  language: z.enum(LANGUAGES),
  /** "What you'll learn" bullet points. */
  outcomes: z.array(z.string().min(10)).min(3).max(8),
  requirements: z.array(z.string().min(5)).min(1).max(6),
  cover: CoverImageSchema,
  publishedAt: ISODateSchema,
  updatedAt: ISODateSchema,
  // .default(false): in the seed files `featured` may be left out (input type
  // has `featured?: boolean`), but after parsing it is always a boolean.
  featured: z.boolean().default(false),
})

export const ModuleSchema = z.object({
  id: ModuleIdSchema,
  courseId: CourseIdSchema,
  /** 1, 2, 3... Order within the course. */
  position: z.number().int().positive(),
  title: z.string().min(3),
  summary: z.string().min(10),
})

export const ReviewSchema = z.object({
  id: ReviewIdSchema,
  courseId: CourseIdSchema,
  learnerName: z.string().min(2),
  location: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(10),
  createdAt: ISODateSchema,
})

export type Instructor = z.infer<typeof InstructorSchema>
export type Category = z.infer<typeof CategorySchema>
export type CoverImage = z.infer<typeof CoverImageSchema>
export type Course = z.infer<typeof CourseSchema>
export type Module = z.infer<typeof ModuleSchema>
export type Review = z.infer<typeof ReviewSchema>
