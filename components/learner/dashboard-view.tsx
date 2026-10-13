// CLIENT COMPONENT: everything on the dashboard comes from the learner's
// progress in localStorage, and the name form and demo tools are interactive.
// The course data it needs is fetched on the server and passed in as props.
'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { CourseCover } from '@/components/course/course-cover'
import { buttonClass } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon, type IconName } from '@/components/ui/icon'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn } from '@/lib/cn'
import { plural } from '@/lib/format'
import { assertNever } from '@/lib/guards'
import { certificateStatus, courseProgress, isEnrolled, learningStreak, quizStandings } from '@/lib/learning'
import { progressActions, useProgress, type ProgressState, type StorageNotice } from '@/lib/progress'
import type { ProgressOutline } from '@/lib/types'

export function DashboardView({ outlines }: { outlines: readonly ProgressOutline[] }) {
  const progress = useProgress()
  if (!progress) return <DashboardSkeleton />

  const { state, notice } = progress
  const enrolled = outlines.filter((o) => isEnrolled(state, o.id))
  const streak = learningStreak(state)
  const quizzesPassed = enrolled.flatMap((o) => quizStandings(o, state)).filter((q) => q.passed).length

  return (
    <div className="space-y-10">
      {notice && <NoticeBanner notice={notice} />}

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-accent">
            <span lang="yo">Ẹ káàbọ̀</span> (welcome back)
          </p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{state.learner.displayName}</h1>
        </div>
        <NameForm current={state.learner.displayName} />
      </header>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Your numbers
        </h2>
        {/* Every number here is calculated from the saved records. */}
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat icon="layers" label="Courses" value={enrolled.length} />
          <Stat icon="checkCircle" label="Lessons completed" value={state.lessonProgress.length} />
          <Stat icon="quiz" label="Quizzes passed" value={quizzesPassed} />
          <Stat
            icon="flame"
            label="Day streak"
            value={streak.current}
            note={streak.current === 0 ? 'Complete a lesson to start one' : streak.activeToday ? 'You learned today' : 'Learn today to keep it going'}
            highlight={streak.current > 0}
          />
        </dl>
        {streak.longest > 0 && <p className="mt-2 text-sm text-muted">Longest streak: {plural(streak.longest, 'day')}.</p>}
      </section>

      <section aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="text-2xl font-semibold">
          Your courses
        </h2>
        {enrolled.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon="read"
              title="You haven’t enrolled in a course yet"
              action={
                <Link href="/courses" className={buttonClass('primary')}>
                  Browse courses <Icon name="arrowRight" />
                </Link>
              }
            >
              Pick a short course to start. Your progress, quiz scores and streak will appear here.
            </EmptyState>
          </div>
        ) : (
          <ul className="mt-4 space-y-5">
            {enrolled.map((outline) => (
              <EnrolledCourse key={outline.id} outline={outline} state={state} />
            ))}
          </ul>
        )}
      </section>

      <DemoTools />
    </div>
  )
}

/**
 * One enrolled course. A top-level component (not defined inside
 * DashboardView), so React keeps its state, like an open <details>, between
 * renders instead of remounting it each time progress changes.
 */
function EnrolledCourse({ outline, state }: { outline: ProgressOutline; state: ProgressState }) {
  const stats = courseProgress(outline, state)
  const quizzes = quizStandings(outline, state)
  const certificate = certificateStatus(outline, state)
  return (
    <li className="overflow-hidden rounded-card border border-line bg-raised shadow-card">
      <div className="grid gap-5 p-4 sm:grid-cols-[11rem_1fr] sm:p-5">
        <CourseCover cover={outline.cover} className="rounded-control" />
        <div className="min-w-0">
          <h3 className="text-xl leading-snug font-semibold">
            <Link href={`/courses/${outline.slug}`} className="hover:text-brand hover:underline">
              {outline.title}
            </Link>
          </h3>
          <p className="text-sm text-muted">{outline.instructorName}</p>
          <div className="mt-3 flex items-center gap-3">
            <ProgressBar value={stats.percent} label={`${outline.title} progress`} className="flex-1" />
            <span className="text-sm font-semibold">{stats.percent}%</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {stats.completed} of {plural(stats.total, 'lesson')} completed
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {certificate.kind === 'complete' ? (
              <Link href={`/certificate/${outline.slug}`} className={buttonClass('accent', 'sm')}>
                <Icon name="award" /> View certificate
              </Link>
            ) : (
              stats.nextLesson && (
                <Link href={`/learn/${outline.slug}/${stats.nextLesson.slug}`} className={buttonClass('primary', 'sm')}>
                  {stats.started ? 'Continue' : 'Start'}: <span className="max-w-52 truncate">{stats.nextLesson.title}</span>
                </Link>
              )
            )}
            {certificate.kind !== 'complete' && (
              <Link href={`/certificate/${outline.slug}`} className={buttonClass('ghost', 'sm')}>
                What’s left for the certificate?
              </Link>
            )}
          </div>
        </div>
      </div>
      {quizzes.length > 0 && (
        <details className="group border-t border-line">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between px-4 text-sm font-semibold sm:px-5">
            Quiz scores ({quizzes.filter((q) => q.passed).length} of {quizzes.length} passed)
            <Icon name="chevronDown" className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="overflow-x-auto px-4 pb-4 sm:px-5">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Best quiz scores for {outline.title}</caption>
              <thead className="text-xs text-subtle uppercase">
                <tr>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Quiz
                  </th>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Best score
                  </th>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Attempts
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.lesson.id} className="border-t border-line">
                    <td className="py-2 pr-3">
                      <Link href={`/learn/${outline.slug}/${quiz.lesson.slug}`} className="hover:text-brand hover:underline">
                        {quiz.lesson.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-3 tabular-nums">{quiz.best ? `${quiz.best.scorePercent}%` : '—'}</td>
                    <td className="py-2 pr-3 tabular-nums">{quiz.attempts}</td>
                    <td className={cn('py-2 font-semibold', quiz.passed ? 'text-leaf' : quiz.best ? 'text-sun' : 'text-subtle')}>
                      {quiz.passed ? 'Passed' : quiz.best ? 'Retake' : 'Not taken'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </li>
  )
}

function Stat({ icon, label, value, note, highlight = false }: { icon: IconName; label: string; value: number; note?: string; highlight?: boolean }) {
  return (
    <div className={cn('rounded-card border p-4', highlight ? 'border-accent/40 bg-accent-soft' : 'border-line bg-raised')}>
      <dt className="flex items-center gap-1.5 text-sm text-muted">
        <Icon name={icon} className={highlight ? 'text-accent' : undefined} /> {label}
      </dt>
      <dd className="mt-1 font-display text-3xl font-semibold">{value}</dd>
      {note && <dd className="mt-0.5 text-xs text-muted">{note}</dd>}
    </div>
  )
}

/** What happened to the saved data, in plain words. An exhaustive switch over StorageNotice. */
function NoticeBanner({ notice }: { notice: StorageNotice }) {
  const message = (() => {
    switch (notice.kind) {
      case 'migrated':
        return 'We updated your saved progress from an older version of Ìmọ̀. Nothing was lost.'
      case 'recovered':
        return notice.problem.kind === 'unsupported-version'
          ? `Your saved progress came from a newer version of Ìmọ̀ (version ${notice.problem.version}) that this page can’t read, so we started fresh. A backup was kept.`
          : 'Your saved progress couldn’t be read (it may have been damaged), so we started fresh. A backup copy was kept in your browser.'
      case 'unavailable':
        return 'Your browser is blocking storage, so progress will only last until you close this tab.'
      default:
        return assertNever(notice, 'Unknown notice')
    }
  })()
  return (
    <div role="status" className="flex items-start gap-3 rounded-card border border-sun/40 bg-sun-soft p-4">
      <Icon name="alert" className="mt-0.5 size-5 text-sun" />
      <p className="flex-1 text-sm">{message}</p>
      <button type="button" onClick={progressActions.dismissNotice} className="rounded-control px-2 text-sm font-semibold text-muted hover:text-ink">
        Dismiss
      </button>
    </div>
  )
}

function NameForm({ current }: { current: string }) {
  const [name, setName] = useState(current)
  const [saved, setSaved] = useState(false)
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    progressActions.setDisplayName(name)
    setSaved(true)
  }
  return (
    <form onSubmit={save} className="flex flex-wrap items-end gap-2">
      <div>
        <label htmlFor="display-name" className="block text-sm font-semibold">
          Name on your certificates
        </label>
        <input
          id="display-name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value)
            setSaved(false)
          }}
          maxLength={60}
          required
          autoComplete="name"
          className="mt-1 min-h-11 w-60 max-w-full rounded-control border border-line-strong bg-raised px-3"
        />
      </div>
      <button type="submit" className={buttonClass('secondary')}>
        Save
      </button>
      <span role="status" className="text-sm text-leaf">
        {saved ? 'Saved' : ''}
      </span>
    </form>
  )
}

/**
 * Buttons that write an old or broken save into localStorage and reload it,
 * so you can watch the schema, the migration and the recovery path work.
 */
function DemoTools() {
  const [confirmReset, setConfirmReset] = useState(false)
  return (
    <details className="rounded-card border border-dashed border-line-strong bg-raised/60">
      <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 text-sm font-semibold">
        <Icon name="refresh" /> Demo tools: saved data
      </summary>
      <div className="space-y-3 border-t border-line p-4 text-sm">
        <p className="text-muted">
          Progress is stored in this browser under <code className="rounded bg-sunken px-1 font-mono">imo-progress</code> with a version
          number and a schema. Try loading a save that an older (or newer, or broken) version of the app might have left behind.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonClass('secondary', 'sm')} onClick={() => progressActions.loadDemoSave('v1')}>
            Load a version 1 save
          </button>
          <button type="button" className={buttonClass('secondary', 'sm')} onClick={() => progressActions.loadDemoSave('corrupt')}>
            Load a corrupted save
          </button>
          <button type="button" className={buttonClass('secondary', 'sm')} onClick={() => progressActions.loadDemoSave('future')}>
            Load a save from a newer version
          </button>
          {confirmReset ? (
            <button
              type="button"
              className={buttonClass('primary', 'sm', 'bg-danger hover:bg-danger')}
              onClick={() => {
                progressActions.resetProgress()
                setConfirmReset(false)
              }}
            >
              Yes, delete all my progress
            </button>
          ) : (
            <button type="button" className={buttonClass('ghost', 'sm', 'text-danger')} onClick={() => setConfirmReset(true)}>
              Reset all progress
            </button>
          )}
        </div>
      </div>
    </details>
  )
}

function DashboardSkeleton() {
  return (
    <div aria-hidden className="space-y-8">
      <div className="skeleton h-12 w-64" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton h-24" />
        ))}
      </div>
      <div className="skeleton h-48" />
    </div>
  )
}
