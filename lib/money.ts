import { z } from 'zod'

/*
  MONEY RULE (same as my Day 9 storefront and Day 12 dashboard): every amount
  in Ìmọ̀ is a whole number of KOBO (₦1 = 100 kobo). Kobo only become
  "₦4,500" when printed, and that happens in exactly one place: formatNaira().

  Why not naira with decimals? JavaScript numbers are binary floating point:
      0.1 + 0.2   → 0.30000000000000004
      19.99 * 3   → 59.97000000000001
  Integers don't drift. A course price of 450000 kobo is exact.

  A price of 0 means the course is free. There is no separate `isFree` field,
  because two fields that must agree eventually disagree.
*/

/** A whole, non-negative number of kobo. The schema the Course price uses. */
export const KoboSchema = z.number().int({ error: 'Money is stored in whole kobo' }).nonnegative()
export type Kobo = z.infer<typeof KoboSchema>

/** Whole naira (e.g. typed by an instructor later) to kobo. */
export const nairaToKobo = (naira: number): Kobo => Math.round(naira * 100)

/** Add up amounts. Integers in, integer out. */
export const sumKobo = (amounts: readonly Kobo[]): Kobo => amounts.reduce((total, k) => total + k, 0)

const whole = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  currencyDisplay: 'narrowSymbol', // "₦", not "NGN"
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const withKobo = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * THE place kobo becomes text. Whole-naira amounts drop the ".00" (₦4,500);
 * anything with kobo shows two decimals (₦4,500.50).
 */
export function formatNaira(kobo: Kobo): string {
  if (!Number.isFinite(kobo)) return '₦—'
  const abs = Math.abs(kobo)
  const text = (abs % 100 === 0 ? whole : withKobo).format(abs / 100)
  return kobo < 0 ? `−${text}` : text
}

/** A course price for display: "Free" or "₦4,500". */
export function formatPrice(kobo: Kobo): string {
  return kobo === 0 ? 'Free' : formatNaira(kobo)
}

export const isFree = (priceKobo: Kobo) => priceKobo === 0
