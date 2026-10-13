import { cn } from '@/lib/cn'
import { initials } from '@/lib/format'

/** Initials in a circle. Decorative: the person's name is always shown next to it. */
export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('grid size-10 shrink-0 place-items-center rounded-pill bg-brand-soft font-display font-semibold text-brand', className)}
    >
      {initials(name)}
    </span>
  )
}
