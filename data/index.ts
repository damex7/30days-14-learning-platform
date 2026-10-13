import type { SeedTables } from '@/lib/schema/tables'
import { categories } from '@/data/categories'
import { bookkeepingForMarketTraders } from '@/data/courses/bookkeeping-for-market-traders'
import { buildYourFirstWebsite } from '@/data/courses/build-your-first-website'
import { excelForSmallBusiness } from '@/data/courses/excel-for-small-business'
import { introToUiDesign } from '@/data/courses/intro-to-ui-design'
import { jambUseOfEnglish } from '@/data/courses/jamb-use-of-english-practice'
import { pythonForBeginners } from '@/data/courses/python-for-absolute-beginners'
import { sellingOnWhatsApp } from '@/data/courses/selling-on-whatsapp-business'
import { waecMathsPastQuestions } from '@/data/courses/waec-maths-past-questions'
import { instructors } from '@/data/instructors'
import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT. Every course, instructor and review in /data was written for
// this demo; the people are fictional.
//
// Nothing outside lib/data.ts (and the check script) may import this file.
// Pages ask lib/data.ts, which on Day 16 will ask PostgreSQL instead.

const courseBundles: readonly CourseBundle[] = [
  buildYourFirstWebsite,
  excelForSmallBusiness,
  jambUseOfEnglish,
  bookkeepingForMarketTraders,
  introToUiDesign,
  sellingOnWhatsApp,
  pythonForBeginners,
  waecMathsPastQuestions,
]

/** The raw seed "tables": flat lists of rows, as they will be in the database. */
export const seed: SeedTables = {
  instructors,
  categories,
  courses: courseBundles.map((b) => b.course),
  modules: courseBundles.flatMap((b) => b.modules),
  lessons: courseBundles.flatMap((b) => b.lessons),
  quizzes: courseBundles.flatMap((b) => b.quizzes),
  questions: courseBundles.flatMap((b) => b.questions),
  reviews: courseBundles.flatMap((b) => b.reviews),
}
