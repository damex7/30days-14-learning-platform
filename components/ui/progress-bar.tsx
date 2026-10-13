import { cn } from '@/lib/cn'

/**
 * A real <progress> element would be ideal, but it is very hard to style
 * consistently, so this uses role="progressbar" with the same ARIA values a
 * screen reader needs: "Course progress, 40%".
 */
export function ProgressBar({ value, label, className, tone = 'bg-leaf' }: { value: number; label: string; className?: string; tone?: string }) {
  const percent = Math.round(Math.min(100, Math.max(0, value)))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn('h-2 w-full overflow-hidden rounded-pill bg-sunken', className)}
    >
      <div className={cn('h-full rounded-pill transition-[width] duration-500', tone)} style={{ width: `${percent}%` }} />
    </div>
  )
}
