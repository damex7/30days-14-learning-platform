import { z } from 'zod'
import { CATEGORY_SLUGS, DEFAULT_SORT, DURATION_FILTERS, LEVELS, PRICE_FILTERS, SORT_KEYS } from '@/lib/constants'
import type { CatalogQuery } from '@/lib/types'

/*
  THE URL IS USER INPUT

  /courses?level=banana&sort=zzz&category=tech-skills&category=design

  Anyone can type anything into a URL, and an old bookmark may use a filter
  that no longer exists. Next.js gives searchParams as

      { [key: string]: string | string[] | undefined }

  so `level` might be missing, a string, or an array of strings. Instead of
  trusting it, we PARSE it with the same tool we use for seed data and
  localStorage.

  Each field has `.catch(...)`: if that one field is invalid, it falls back to
  "no filter" (or the default sort) INSTEAD OF failing the whole parse. So
  ?level=banana&category=design still filters by design; it just ignores the
  banana. A bad URL never crashes the page or shows an error.
*/

/** `?a=1&a=2` arrives as ['1', '2']: use the first. Blank means unset. */
function first(value: unknown): unknown {
  const v = Array.isArray(value) ? value[0] : value
  return typeof v === 'string' && v.trim() !== '' ? v.trim().toLowerCase() : undefined
}

/** An optional enum read from the URL: invalid or missing → undefined (no filter). */
const optionalParam = <const T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(first, z.enum(values).optional()).catch(undefined)

export const CatalogQuerySchema = z.object({
  category: optionalParam(CATEGORY_SLUGS),
  level: optionalParam(LEVELS),
  price: optionalParam(PRICE_FILTERS),
  duration: optionalParam(DURATION_FILTERS),
  sort: z.preprocess(first, z.enum(SORT_KEYS)).catch(DEFAULT_SORT),
})

// The schema's output type and CatalogQuery (lib/types.ts, built with
// Partial and &) must agree. `satisfies` checks a VALUE against a type; to
// compare two TYPES we use a tiny compile-time test. This line fails to
// compile if they ever drift apart.
//
// Simplify<T> is a mapped type that copies every property into one flat
// object, so `A & B` and `{ ...A, ...B }` compare as equal.
type Simplify<T> = { [K in keyof T]: T[K] }
type Equals<A, B> = (<T>() => T extends Simplify<A> ? 1 : 2) extends <T>() => T extends Simplify<B> ? 1 : 2 ? true : false
const schemaMatchesType: Equals<z.infer<typeof CatalogQuerySchema>, CatalogQuery> = true
void schemaMatchesType

export type RawSearchParams = Record<string, string | string[] | undefined>

/** Never throws: every field has a fallback. */
export function parseCatalogQuery(raw: RawSearchParams): CatalogQuery {
  return CatalogQuerySchema.parse(raw)
}

/** Is any filter set (ignoring sort)? */
export const hasFilters = (query: CatalogQuery) =>
  Boolean(query.category || query.level || query.price || query.duration)

/**
 * The URL for the catalogue with some values changed. `Partial<CatalogQuery>`:
 * the caller passes only what changes; `undefined` removes a filter.
 * Defaults are left out so URLs stay short and shareable.
 */
export function catalogHref(current: CatalogQuery, change: Partial<CatalogQuery>): string {
  const next = { ...current, ...change }
  const params = new URLSearchParams()
  if (next.category) params.set('category', next.category)
  if (next.level) params.set('level', next.level)
  if (next.price) params.set('price', next.price)
  if (next.duration) params.set('duration', next.duration)
  if (next.sort !== DEFAULT_SORT) params.set('sort', next.sort)
  const query = params.toString()
  return query ? `/courses?${query}` : '/courses'
}
