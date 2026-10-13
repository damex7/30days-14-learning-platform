// Calendar days in Lagos time, as "YYYY-MM-DD" strings.
//
// A learning streak counts DAYS, and a day must be a Lagos day: a lesson
// finished at 00:30 on Tuesday in Lagos is still 23:30 on Monday in UTC.

const lagosDayFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Lagos',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}) // en-CA formats as 2026-10-13

/** The Lagos calendar day of a moment: "2026-10-13". */
export function lagosDay(moment: Date | string): string {
  return lagosDayFormat.format(typeof moment === 'string' ? new Date(moment) : moment)
}

/** "2026-10-13" plus n days (n may be negative). */
export function addDays(day: string, n: number): string {
  const date = new Date(`${day}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + n)
  return date.toISOString().slice(0, 10)
}
