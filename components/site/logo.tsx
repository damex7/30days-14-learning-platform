import Link from 'next/link'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'

/** The wordmark: Ìmọ̀ in the display face with a kola-red dot. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('group inline-flex items-baseline gap-0.5 rounded-control', className)}>
      <span className="font-display text-2xl font-semibold tracking-tight text-brand" lang="yo">
        {site.name}
      </span>
      <span aria-hidden className="size-1.5 rounded-pill bg-accent transition-transform group-hover:scale-125" />
      <span className="sr-only">, home</span>
    </Link>
  )
}
