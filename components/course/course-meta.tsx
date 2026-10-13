import { Badge } from '@/components/ui/badge'
import { TONE_CLASSES } from '@/components/ui/tone'
import { LEVEL_LABELS, type Level, type Tone } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { formatPrice, type Kobo } from '@/lib/money'

export function CategoryBadge({ name, tone }: { name: string; tone: Tone }) {
  const classes = TONE_CLASSES[tone]
  return <Badge className={cn(classes.soft, classes.text)}>{name}</Badge>
}

/** Level shown as a word plus 1–3 bars, so it never relies on colour. */
export function LevelBadge({ level }: { level: Level }) {
  const bars = { beginner: 1, intermediate: 2, advanced: 3 }[level]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
      <span aria-hidden className="inline-flex items-end gap-0.5">
        {[1, 2, 3].map((n) => (
          <span key={n} className={cn('w-1 rounded-sm', n <= bars ? 'bg-brand' : 'bg-line-strong')} style={{ height: `${4 + n * 3}px` }} />
        ))}
      </span>
      {LEVEL_LABELS[level]}
    </span>
  )
}

export function PriceTag({ priceKobo, className }: { priceKobo: Kobo; className?: string }) {
  return (
    <span className={cn('font-display font-semibold', priceKobo === 0 ? 'text-leaf' : 'text-ink', className)}>
      {formatPrice(priceKobo)}
    </span>
  )
}
