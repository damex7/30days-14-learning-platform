import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/cn'
import { formatRating, plural } from '@/lib/format'

/**
 * Stars plus the number. The stars are decorative (aria-hidden); the visible
 * text carries the meaning for everyone, so screen readers hear "4.7 (3 reviews)".
 * A null rating means "no reviews yet", which is not the same as zero stars.
 */
export function Rating({ value, count, className, size = 'sm' }: { value: number | null; count: number; className?: string; size?: 'sm' | 'lg' }) {
  if (value === null) return <span className={cn('text-sm text-subtle', className)}>No reviews yet</span>
  const rounded = Math.round(value)
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="inline-flex text-sun" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Icon key={n} name="star" filled={n <= rounded} className={size === 'lg' ? 'size-5' : 'size-3.5'} />
        ))}
      </span>
      <span className={cn('font-semibold', size === 'lg' ? 'text-lg' : 'text-sm')}>{formatRating(value)}</span>
      <span className="text-sm text-subtle">({plural(count, 'review')})</span>
    </span>
  )
}
