// CLIENT COMPONENT: it reads the current URL with usePathname() to mark the
// active link. Layouts don't re-render on navigation, so a Server Component
// in the header could never update this.
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-control px-2.5 py-2 text-sm font-semibold transition-colors xs:px-3',
        active ? 'bg-brand-soft text-brand' : 'text-muted hover:bg-sunken hover:text-ink',
      )}
    >
      {children}
    </Link>
  )
}
