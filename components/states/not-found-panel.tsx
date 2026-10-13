import Link from 'next/link'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export function NotFoundPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto my-16 max-w-lg px-4 text-center">
      <p className="font-display text-6xl font-semibold text-brand">404</p>
      <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-muted">{children}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/courses" className={buttonClass('primary')}>
          Browse courses <Icon name="arrowRight" />
        </Link>
        <Link href="/" className={buttonClass('secondary')}>
          Home
        </Link>
      </div>
    </div>
  )
}
