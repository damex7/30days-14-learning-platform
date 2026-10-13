import type { SeedTables } from '@/lib/schema/tables'

/*
  A DELIBERATELY BROKEN COPY OF THE SEED, for `npm run check:data -- --broken`.
  It shows what the checker reports when references are wrong.

  The real seed is readonly all the way down, so to break a copy we need a
  MUTABLE version of its type. This mapped type removes `readonly` from every
  property (the `-readonly` modifier) and recurses into nested objects and
  arrays:
*/
type DeepMutable<T> = T extends readonly (infer Item)[]
  ? DeepMutable<Item>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T

export function breakSeed(seed: SeedTables): { seed: SeedTables; changes: string[] } {
  // structuredClone makes a brand-new deep copy that nothing else refers to,
  // so changing it can't affect the real seed. That is why this one type
  // assertion (`as`) is safe here: we are only dropping `readonly` from our
  // own private copy.
  const copy = structuredClone(seed) as DeepMutable<SeedTables>
  const changes: string[] = []

  const [firstCourse, secondCourse] = copy.courses
  if (firstCourse) {
    firstCourse.instructorId = 'ins_nobody'
    changes.push(`courses ${firstCourse.id}: instructorId set to "ins_nobody"`)
  }
  if (firstCourse && secondCourse) {
    secondCourse.slug = firstCourse.slug
    changes.push(`courses ${secondCourse.id}: slug set to "${firstCourse.slug}" (already used)`)
  }

  const lesson = copy.lessons.find((l) => l.kind === 'article')
  if (lesson) {
    lesson.moduleId = 'mod_does-not-exist'
    changes.push(`lessons ${lesson.id}: moduleId set to "mod_does-not-exist"`)
  }

  const question = copy.questions.find((q) => q.type === 'single')
  if (question?.type === 'single') {
    question.correctOptionId = 'f'
    changes.push(`questions ${question.id}: correctOptionId set to "f" (not one of its options)`)
  }

  return { seed: copy, changes }
}
