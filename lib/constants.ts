// CONSTANT LISTS
//
// Each list is written ONCE as a value, and its TypeScript type is DERIVED
// from that value. Adding "expert" to LEVELS automatically widens the `Level`
// type, the Zod schema, the URL parser and the filter chips, with no second
// list to forget.
//
// Two tools make that work:
//
// - `as const` freezes a literal. Without it, ['beginner', 'advanced'] is
//   typed string[] and the exact words are lost. With it, the type is
//   readonly ['beginner', 'advanced'], so we can pull the union
//   'beginner' | 'advanced' back out with (typeof LEVELS)[number].
//
// - `satisfies` checks a value against a type WITHOUT changing the value's own
//   type. `LEVEL_LABELS satisfies Record<Level, string>` fails to compile if a
//   level is missing a label, but the object keeps its exact literal type.
//   (A plain annotation `const x: Record<Level, string>` would also check it,
//   but would widen every label to plain `string`.)

/** The difficulty levels a course can have. */
export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const

/** 'beginner' | 'intermediate' | 'advanced', derived from the list above. */
export type Level = (typeof LEVELS)[number]

// RECORD: an object with one entry for EVERY key in the union. Forgetting
// 'advanced' here is a compile error, which is exactly what we want.
export const LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const satisfies Record<Level, string>

/** The five category slugs. Category rows in /data must use exactly these. */
export const CATEGORY_SLUGS = ['tech-skills', 'design', 'small-business', 'money-skills', 'exam-prep'] as const
export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

/** Colour "tones" a category can use. Each maps to design tokens in components/ui/tone.ts. */
export const TONES = ['indigo', 'kola', 'leaf', 'sun', 'plum'] as const
export type Tone = (typeof TONES)[number]

/** Languages a course can be taught in. */
export const LANGUAGES = ['English', 'English and Pidgin', 'Yoruba', 'Hausa', 'Igbo'] as const
export type Language = (typeof LANGUAGES)[number]

/** Catalogue price filter. */
export const PRICE_FILTERS = ['free', 'paid'] as const
export type PriceFilter = (typeof PRICE_FILTERS)[number]
export const PRICE_FILTER_LABELS = { free: 'Free', paid: 'Paid' } as const satisfies Record<PriceFilter, string>

/**
 * Catalogue duration filter. The bounds are in SECONDS (the unit every
 * duration in the app uses) and `max` is exclusive.
 */
export const DURATION_FILTERS = ['short', 'medium', 'long'] as const
export type DurationFilter = (typeof DURATION_FILTERS)[number]
export const DURATION_BUCKETS = {
  short: { label: 'Under 1 hour', min: 0, max: 60 * 60 },
  medium: { label: '1 to 1½ hours', min: 60 * 60, max: 90 * 60 },
  long: { label: 'Over 1½ hours', min: 90 * 60, max: Number.POSITIVE_INFINITY },
} as const satisfies Record<DurationFilter, { label: string; min: number; max: number }>

/** Catalogue sort orders. The first one is the default. */
export const SORT_KEYS = ['newest', 'rating', 'shortest', 'price-low', 'price-high'] as const
export type SortKey = (typeof SORT_KEYS)[number]
export const DEFAULT_SORT: SortKey = 'newest'
export const SORT_LABELS = {
  newest: 'Newest',
  rating: 'Highest rated',
  shortest: 'Shortest',
  'price-low': 'Price: low to high',
  'price-high': 'Price: high to low',
} as const satisfies Record<SortKey, string>

/** A quiz is passed at 70% or more. */
export const PASS_MARK_PERCENT = 70

/** Reading speed used to turn an article's word count into minutes. */
export const WORDS_PER_MINUTE = 200

/** A quiz takes about this long per question. */
export const SECONDS_PER_QUIZ_QUESTION = 60
