import Image from 'next/image'
import { cn } from '@/lib/cn'
import type { CoverImage } from '@/lib/schema/catalog'

/**
 * Covers are original SVG artwork in /public/covers. next/image serves .svg
 * files without "optimising" them (vectors are already sharp at any size).
 * The alt text comes from the course data, where the schema requires it.
 */
export function CourseCover({ cover, className, priority = false }: { cover: CoverImage; className?: string; priority?: boolean }) {
  return (
    <div className={cn('relative aspect-[16/9] overflow-hidden bg-sunken', className)}>
      <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={priority} className="object-cover" />
    </div>
  )
}
