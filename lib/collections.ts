/*
  GENERIC COLLECTION HELPERS

  These work for ANY list. The type parameters connect the input to the output:

      groupBy(lessons, (l) => l.moduleId)
      // T = Lesson, K = ModuleId  →  Partial<Record<ModuleId, Lesson[]>>

  `K extends PropertyKey` is a CONSTRAINT: K can be any string, number or
  symbol type (anything usable as an object key), including branded IDs like
  ModuleId. Without the constraint, `record[key]` wouldn't compile.

  (Object.groupBy now exists in modern JavaScript. We write our own because
  writing the types is the point today, and ours returns a typed Record.)
*/

/**
 * Splits a list into groups by a key.
 *
 * Returns PARTIAL<Record<K, T[]>>: a key with no items has no entry at all, so
 * every lookup is `T[] | undefined` and the compiler makes you handle the
 * empty case (usually `?? []`). A plain Record<K, T[]> would claim every
 * possible ModuleId has a list, which is a lie.
 */
export function groupBy<T, K extends PropertyKey>(items: readonly T[], keyOf: (item: T) => K): Partial<Record<K, T[]>> {
  const groups: Partial<Record<K, T[]>> = {}
  for (const item of items) {
    const key = keyOf(item)
    const group = groups[key]
    if (group) group.push(item)
    else groups[key] = [item]
  }
  return groups
}

/**
 * Builds a Map from key to item, for O(1) lookups by ID. A Map (not an object)
 * because `map.get(id)` already returns `T | undefined`, which is honest.
 */
export function indexBy<T, K>(items: readonly T[], keyOf: (item: T) => K): ReadonlyMap<K, T> {
  return new Map(items.map((item) => [keyOf(item), item] as const))
}

/** Finds values that appear more than once, e.g. duplicate slugs. */
export function duplicates<T>(values: readonly T[]): T[] {
  const seen = new Set<T>()
  const dupes = new Set<T>()
  for (const value of values) {
    if (seen.has(value)) dupes.add(value)
    seen.add(value)
  }
  return [...dupes]
}

/** Sorts a copy by numeric `position` (modules within a course, lessons within a module). */
export const byPosition = <T extends { position: number }>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => a.position - b.position)

/** The average of a list, or null for an empty list (an average of nothing is not 0). */
export function average(values: readonly number[]): number | null {
  if (values.length === 0) return null
  return values.reduce((sum, v) => sum + v, 0) / values.length
}
