// CLIENT COMPONENT: error boundaries must be Client Components, because they
// catch errors while React renders in the browser, and the button calls retry().
'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export type ErrorProps = {
  error: Error & { digest?: string }
  retry: () => void
}

export function ErrorPanel({ error, retry, title = 'Something went wrong' }: ErrorProps & { title?: string }) {
  useEffect(() => {
    // Day 16+: send this to an error-reporting service instead.
    console.error(error)
  }, [error])

  return (
    <div role="alert" className="mx-auto my-16 max-w-lg rounded-card border border-line bg-raised p-8 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-pill bg-danger-soft text-danger">
        <Icon name="alert" className="size-6" />
      </span>
      <h1 className="mt-4 text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted">This part of the page couldn’t load. Your saved progress is safe. Try again, or go back to the course list.</p>
      {error.digest && <p className="mt-2 font-mono text-xs text-subtle">Reference: {error.digest}</p>}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => retry()} className={buttonClass('primary')}>
          <Icon name="refresh" /> Try again
        </button>
        <Link href="/courses" className={buttonClass('secondary')}>
          All courses
        </Link>
      </div>
    </div>
  )
}
