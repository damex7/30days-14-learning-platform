// CLIENT COMPONENT: whether the learner is enrolled lives in localStorage,
// and enrolling is a click that changes state. Both need the browser.
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { ProgressBar } from '@/components/ui/progress-bar'
import { courseProgress, isEnrolled } from '@/lib/learning'
import { formatPrice, type Kobo } from '@/lib/money'
import { progressActions, useProgress } from '@/lib/progress'
import type { ProgressOutline } from '@/lib/types'

type Props = {
  course: Pick<ProgressOutline, 'id' | 'slug' | 'title' | 'lessons'>
  priceKobo: Kobo
}

export function EnrollPanel({ course, priceKobo }: Props) {
  const progress = useProgress()
  const [justEnrolled, setJustEnrolled] = useState(false)
  const continueRef = useRef<HTMLAnchorElement>(null)

  // After enrolling, the Enroll button is replaced by a link. Move keyboard
  // focus to that link so it isn't lost to the top of the page. This is an
  // EFFECT because the link only exists after React re-renders.
  useEffect(() => {
    if (justEnrolled) continueRef.current?.focus()
  }, [justEnrolled])

  // Server render and hydration: we can't know yet, so hold the space.
  if (!progress) return <div className="skeleton h-12" aria-hidden />

  if (!isEnrolled(progress.state, course.id)) {
    const free = priceKobo === 0
    return (
      <div className="space-y-2">
        <button
          type="button"
          className={buttonClass('primary', 'lg', 'w-full')}
          onClick={() => {
            progressActions.enroll(course.id)
            setJustEnrolled(true)
          }}
        >
          {free ? 'Enroll for free' : `Enroll for ${formatPrice(priceKobo)}`}
        </button>
        {!free && <p className="text-center text-xs text-muted">Demo checkout: no payment is taken and no card is needed.</p>}
      </div>
    )
  }

  const stats = courseProgress(course, progress.state)
  const target = stats.nextLesson ?? course.lessons[0]
  const done = stats.nextLesson === null

  return (
    <div className="space-y-3">
      <p role="status" className="flex items-center gap-1.5 text-sm font-semibold text-leaf">
        <Icon name="checkCircle" /> {justEnrolled ? 'You’re enrolled. Welcome!' : 'You’re enrolled'}
      </p>
      <ProgressBar value={stats.percent} label="Course progress" />
      <p className="text-xs text-muted">
        {stats.completed} of {stats.total} lessons complete · {stats.percent}%
      </p>
      {done ? (
        <Link ref={continueRef} href={`/certificate/${course.slug}`} className={buttonClass('accent', 'lg', 'w-full')}>
          <Icon name="award" /> View your certificate
        </Link>
      ) : (
        target && (
          <Link ref={continueRef} href={`/learn/${course.slug}/${target.slug}`} className={buttonClass('primary', 'lg', 'w-full')}>
            {stats.started ? 'Continue learning' : 'Start the course'} <Icon name="arrowRight" />
          </Link>
        )
      )}
    </div>
  )
}
