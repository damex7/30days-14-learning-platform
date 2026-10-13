// CLIENT COMPONENT: whether the certificate is earned depends on progress
// stored in localStorage, and printing calls window.print().
'use client'

import Link from 'next/link'
import { buttonClass } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'
import { ProgressBar } from '@/components/ui/progress-bar'
import { formatDate, formatDuration, plural } from '@/lib/format'
import { assertNever } from '@/lib/guards'
import { certificateStatus } from '@/lib/learning'
import { useProgress } from '@/lib/progress'
import { site } from '@/lib/site'
import type { ProgressOutline } from '@/lib/types'

export function CertificateGate({ course }: { course: ProgressOutline }) {
  const progress = useProgress()
  if (!progress) return <div aria-hidden className="skeleton mx-auto aspect-[1.414] w-full max-w-4xl rounded-card" />

  const status = certificateStatus(course, progress.state)

  // The status is a discriminated union, so each branch gets exactly the
  // data it needs: only 'complete' has completedAt, only 'in-progress' has
  // the to-do lists.
  switch (status.kind) {
    case 'not-enrolled':
      return (
        <EmptyState
          icon="lock"
          title="You’re not enrolled in this course"
          action={
            <Link href={`/courses/${course.slug}`} className={buttonClass('primary')}>
              Go to the course
            </Link>
          }
        >
          Enroll, complete every lesson and pass every quiz to earn a certificate for <strong>{course.title}</strong>.
        </EmptyState>
      )

    case 'in-progress':
      return (
        <section aria-labelledby="todo-heading" className="mx-auto max-w-2xl rounded-card border border-line bg-raised p-6 sm:p-8">
          <span className="grid size-12 place-items-center rounded-pill bg-accent-soft text-accent">
            <Icon name="award" className="size-6" />
          </span>
          <h1 id="todo-heading" className="mt-4 text-3xl font-semibold">
            Almost there
          </h1>
          <p className="mt-2 text-muted">
            Your certificate for <strong className="text-ink">{course.title}</strong> unlocks when every lesson is complete and every quiz is
            passed (70% or more).
          </p>
          <div className="mt-5 flex items-center gap-3">
            <ProgressBar value={status.percent} label="Course progress" className="flex-1" />
            <span className="text-sm font-semibold">{status.percent}%</span>
          </div>

          {status.remainingLessons.length > 0 && (
            <div className="mt-7">
              <h2 className="text-lg font-semibold">{plural(status.remainingLessons.length, 'lesson')} to complete</h2>
              <ul className="mt-2 divide-y divide-line rounded-control border border-line">
                {status.remainingLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link href={`/learn/${course.slug}/${lesson.slug}`} className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-sunken">
                      <span>{lesson.title}</span>
                      <Icon name="chevronRight" className="text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {status.quizzesToPass.length > 0 && (
            <div className="mt-7">
              <h2 className="text-lg font-semibold">{plural(status.quizzesToPass.length, 'quiz', 'quizzes')} to pass</h2>
              <ul className="mt-2 divide-y divide-line rounded-control border border-line">
                {status.quizzesToPass.map(({ lesson, best }) => (
                  <li key={lesson.id}>
                    <Link href={`/learn/${course.slug}/${lesson.slug}`} className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-sunken">
                      <span>{lesson.title}</span>
                      <span className="shrink-0 text-sm text-muted">{best ? `Best ${best.scorePercent}%` : 'Not taken yet'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )

    case 'complete':
      return <Certificate course={course} learnerName={progress.state.learner.displayName} completedAt={status.completedAt} learnerId={progress.state.learner.id} />

    default:
      return assertNever(status, 'Unknown certificate status')
  }
}

/** A short, stable reference made from the learner, course and completion time. */
function certificateNumber(...parts: string[]): string {
  let hash = 2166136261
  for (const char of parts.join('|')) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  return `IMO-${(hash >>> 0).toString(36).toUpperCase().padStart(7, '0')}`
}

function Certificate({ course, learnerName, completedAt, learnerId }: { course: ProgressOutline; learnerName: string; completedAt: string; learnerId: string }) {
  const number = certificateNumber(learnerId, course.id, completedAt)
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p role="status" className="flex items-center gap-2 font-semibold text-leaf">
          <Icon name="checkCircle" className="size-5" /> Course complete. Well done!
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard" className={buttonClass('secondary')}>
            Change the name on it
          </Link>
          <button type="button" onClick={() => window.print()} className={buttonClass('primary')}>
            <Icon name="print" /> Print or save as PDF
          </button>
        </div>
      </div>

      {/* The certificate. Print styles in globals.css: A4 landscape, light colours, site chrome hidden. */}
      <article
        aria-label={`Certificate of completion for ${course.title}`}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-card border border-line bg-[#fffdf8] p-3 text-[#1f1b16] shadow-raised sm:aspect-[1.414] print:max-w-none print:rounded-none print:border-0 print:shadow-none"
      >
        <div className="flex h-full flex-col items-center justify-between gap-6 rounded-[0.8rem] border-[3px] border-double border-[#233f73] px-5 py-8 text-center sm:px-12 sm:py-10">
          <div>
            <p className="font-display text-3xl font-semibold text-[#233f73]" lang="yo">
              {site.name}
              <span aria-hidden className="ml-0.5 inline-block size-2 rounded-full bg-[#b04a22]" />
            </p>
            <p className="mt-1 text-xs tracking-[0.25em] text-[#5b5247] uppercase">Certificate of completion</p>
          </div>

          <div>
            <p className="text-sm text-[#5b5247]">This certifies that</p>
            <p className="mt-2 font-display text-4xl font-semibold sm:text-5xl">{learnerName}</p>
            <p className="mt-3 text-sm text-[#5b5247]">has successfully completed</p>
            <p className="mt-2 font-display text-2xl font-semibold text-[#233f73] sm:text-3xl">{course.title}</p>
            <p className="mt-3 text-sm text-[#5b5247]">
              {plural(course.stats.lessonCount, 'lesson')} · {formatDuration(course.stats.durationSeconds)} of learning ·{' '}
              {plural(course.stats.quizCount, 'quiz', 'quizzes')} passed at 70% or above
            </p>
          </div>

          <div className="grid w-full gap-6 text-sm sm:grid-cols-3 sm:items-end">
            <div>
              <p className="font-semibold">{formatDate(completedAt)}</p>
              <p className="mt-1 border-t border-[#d1c1a6] pt-1 text-xs text-[#5b5247]">Date completed</p>
            </div>
            <div>
              <p className="font-mono text-xs">{number}</p>
              <p className="mt-1 border-t border-[#d1c1a6] pt-1 text-xs text-[#5b5247]">Certificate number</p>
            </div>
            <div>
              <p className="font-display text-lg italic">{course.instructorName}</p>
              <p className="mt-1 border-t border-[#d1c1a6] pt-1 text-xs text-[#5b5247]">Instructor</p>
            </div>
          </div>

          <p className="text-[0.65rem] text-[#7d7366]">Sample certificate from a demo project. Not an accredited qualification.</p>
        </div>
      </article>
    </div>
  )
}
