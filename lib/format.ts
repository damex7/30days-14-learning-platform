// Display formatting for durations, dates and counts. (Money has its own
// module, lib/money.ts, so there is exactly one place kobo become naira.)

/**
 * Seconds to a short human duration: "45 sec", "8 min", "1 hr 20 min", "2 hr".
 * Every duration in the app is stored in SECONDS; this is the only place they
 * become words.
 */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${Math.max(0, Math.round(totalSeconds))} sec`
  const totalMinutes = Math.round(totalSeconds / 60)
  if (totalMinutes < 60) return `${totalMinutes} min`
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`
}

/** For a video player label: 6:40, 1:02:05. */
export function formatClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

const dateFormat = new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' })
const shortDateFormat = new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' })

/**
 * "2026-10-13" or a full timestamp → "13 October 2026".
 * A bare date is read as midday UTC so it can't slip to the previous day in
 * any time zone.
 */
export function formatDate(iso: string, style: 'long' | 'short' = 'long'): string {
  const date = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso)
  return (style === 'long' ? dateFormat : shortDateFormat).format(date)
}

/** "1 lesson", "4 lessons". */
export function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

/** 4.666 → "4.7". */
export const formatRating = (rating: number) => rating.toFixed(1)

/** "Tunde Bakare" → "TB". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
