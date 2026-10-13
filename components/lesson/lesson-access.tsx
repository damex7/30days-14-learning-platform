// CLIENT COMPONENT: whether a lesson is unlocked depends on enrolment, which
// is stored in localStorage, and enrolling is a click.
'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { isEnrolled } from '@/lib/learning'
import { formatPrice, type Kobo } from '@/lib/money'
import { progressActions, useProgress } from '@/lib/progress'
import type { CourseId } from '@/lib/schema/ids'

type Props = {
  courseId: CourseId
  courseSlug: string
  priceKobo: Kobo
  isPreview: boolean
  children: ReactNode
}

/*
  The lesson content (children) is rendered on the SERVER and passed in. This
  Client Component only decides whether to show it. Passing server-rendered
  children through a Client Component is how you keep most of the page on
  the server while one wrapper has state.

  (This is a demo gate in the browser, not security: without accounts there
  is nothing to protect. On Day 16 the server checks enrolment instead.)
*/
export function LessonAccess({ courseId, courseSlug, priceKobo, isPreview, children }: Props) {
  const progress = useProgress()

  if (isPreview) {
    const showHint = progress !== null && !isEnrolled(progress.state, courseId)
    return (
      <>
        {showHint && (
          <p className="mb-6 flex items-start gap-2 rounded-control border border-leaf/40 bg-leaf-soft px-4 py-3 text-sm">
            <Icon name="play" className="mt-0.5 text-leaf" />
            <span>
              This lesson is a <strong>free preview</strong>.{' '}
              <Link href={`/courses/${courseSlug}`} className="font-semibold text-brand underline">
                Enrol
              </Link>{' '}
              to unlock the rest and save your progress.
            </span>
          </p>
        )}
        {children}
      </>
    )
  }

  if (!progress) {
    return (
      <div aria-hidden className="space-y-4">
        <div className="skeleton aspect-video w-full rounded-card" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    )
  }

  if (isEnrolled(progress.state, courseId)) return <>{children}</>

  const free = priceKobo === 0
  return (
    <div className="rounded-card border border-line bg-raised p-6 text-center sm:p-10">
      <span className="mx-auto grid size-12 place-items-center rounded-pill bg-sunken text-muted">
        <Icon name="lock" className="size-6" />
      </span>
      <h2 className="mt-4 text-2xl font-semibold">Enrol to continue</h2>
      <p className="mx-auto mt-2 max-w-md text-muted">
        {free ? 'This course is free. Enrol to unlock every lesson and track your progress.' : 'Enrol to unlock every lesson, take the quizzes and earn a certificate.'}
      </p>
      <div className="mt-6 flex flex-col items-center gap-2">
        <button type="button" className={buttonClass('primary', 'lg')} onClick={() => progressActions.enroll(courseId)}>
          {free ? 'Enrol for free' : `Enrol for ${formatPrice(priceKobo)}`}
        </button>
        {!free && <p className="text-xs text-muted">Demo checkout: no payment is taken.</p>}
      </div>
    </div>
  )
}
