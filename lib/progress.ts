// THE LEARNER'S PROGRESS STORE (localStorage, one demo learner).
//
// Every read and write of saved progress goes through this module, the same
// way every catalogue read goes through lib/data.ts. On Day 16 the body of
// each action becomes a server action that writes to PostgreSQL, and the
// hook reads from the server; components keep calling the same functions.
//
// `client-only` makes importing this from a Server Component a build error:
// localStorage only exists in the browser. (Files that only need the TYPES
// use `import type`, which is erased at build time and never loads this file.)
import 'client-only'

import { useSyncExternalStore } from 'react'
import { z } from 'zod'
import { PASS_MARK_PERCENT } from '@/lib/constants'
import { assertNever } from '@/lib/guards'
import { err, ok, type Result } from '@/lib/result'
import { AttemptIdSchema, CourseIdSchema, LearnerIdSchema, LessonIdSchema, type CourseId, type LessonId } from '@/lib/schema/ids'
import { EnrollmentSchema, LessonProgressSchema, QuizAttemptSchema, type QuizAttempt } from '@/lib/schema/learner'

/*
  WHY SAVED DATA NEEDS A SCHEMA, JUST LIKE API DATA

  It's tempting to trust localStorage: "we wrote it, so we know its shape".
  But the data you read back may have been
  - written by an OLDER version of the app, before a field was renamed;
  - edited by hand in DevTools, or half-written when a tab crashed;
  - written by a NEWER version in another tab, after a deploy;
  - cleared by the browser at any time.
  From the code's point of view that is input from outside, exactly like an
  API response. TypeScript can't check it (types vanish at runtime), so we
  PARSE it with Zod, and every outcome (missing, corrupt, old, too new) has a
  planned answer instead of a crash.

  The saved object carries a `version` number. When its shape changes, the
  version goes up and we write a MIGRATION from the old shape to the new one,
  so nobody loses their progress when the app updates.
*/

export const STORAGE_KEY = 'imo-progress'
export const BACKUP_KEY = 'imo-progress:backup'
const DEMO_LEARNER_ID = LearnerIdSchema.parse('lrn_demo')
export const DEFAULT_DISPLAY_NAME = 'Demo learner'

/**
 * VERSION 1: what an earlier release saved. Flat lists of IDs and a score per
 * quiz lesson. No timestamps (so no streaks) and no learner name.
 * We never write this shape any more, but we must still be able to READ it.
 */
const ProgressV1Schema = z.object({
  version: z.literal(1),
  enrolled: z.array(CourseIdSchema),
  completed: z.array(LessonIdSchema),
  quizScores: z.record(LessonIdSchema, z.object({ correct: z.number().int().nonnegative(), total: z.number().int().positive() })),
})

/** VERSION 2: the current shape. Each list mirrors a future database table. */
const ProgressV2Schema = z.object({
  version: z.literal(2),
  learner: z.object({ id: LearnerIdSchema, displayName: z.string().trim().min(1).max(60) }),
  enrollments: z.array(EnrollmentSchema),
  lessonProgress: z.array(LessonProgressSchema),
  quizAttempts: z.array(QuizAttemptSchema),
})

/** Any version we know how to read, told apart by `version`. */
const StoredProgressSchema = z.discriminatedUnion('version', [ProgressV1Schema, ProgressV2Schema])

export const CURRENT_VERSION = 2
type ProgressV1 = z.infer<typeof ProgressV1Schema>
export type ProgressState = z.infer<typeof ProgressV2Schema>

export function freshState(): ProgressState {
  return {
    version: 2,
    learner: { id: DEMO_LEARNER_ID, displayName: DEFAULT_DISPLAY_NAME },
    enrollments: [],
    lessonProgress: [],
    quizAttempts: [],
  }
}

/**
 * THE MIGRATION from version 1 to version 2. A pure function: old shape in,
 * new shape out, nothing lost that v1 knew.
 * - v1 had no timestamps, so everything is dated to the moment of migration.
 * - v1 kept one score per quiz; it becomes one attempt per quiz.
 * - v1 had no name, so the learner gets the default display name.
 */
export function migrateV1toV2(v1: ProgressV1, now: string): ProgressState {
  // Object.entries() always returns string keys (a JavaScript rule), which
  // drops the LessonId brand. Parsing each key again restores it safely.
  const attempts = Object.entries(v1.quizScores).flatMap(([key, score]): QuizAttempt[] => {
    const lessonId = LessonIdSchema.safeParse(key)
    if (!lessonId.success || !score) return []
    const scorePercent = Math.floor((Math.min(score.correct, score.total) / score.total) * 100)
    return [
      {
        id: AttemptIdSchema.parse(`att_v1-${lessonId.data.replace(/^les_/, '')}`),
        lessonId: lessonId.data,
        answers: {},
        correctCount: Math.min(score.correct, score.total),
        questionCount: score.total,
        scorePercent,
        passed: scorePercent >= PASS_MARK_PERCENT, // v1 used the same pass mark
        submittedAt: now,
      },
    ]
  })
  const passedLessons = attempts.filter((a) => a.passed).map((a) => a.lessonId)
  return {
    version: 2,
    learner: { id: DEMO_LEARNER_ID, displayName: DEFAULT_DISPLAY_NAME },
    enrollments: [...new Set(v1.enrolled)].map((courseId) => ({ courseId, enrolledAt: now })),
    lessonProgress: [...new Set([...v1.completed, ...passedLessons])].map((lessonId) => ({ lessonId, completedAt: now })),
    quizAttempts: attempts,
  }
}

/** Every way loading can go wrong, as data. */
export type LoadProblem =
  | { kind: 'corrupt-json' }
  | { kind: 'invalid'; issues: string[] }
  | { kind: 'unsupported-version'; version: number }

export type LoadOutcome = { state: ProgressState; migratedFrom: 1 | null }

/**
 * Raw string from storage → current state. A pure function returning a
 * Result: it never throws, never touches storage, and is easy to test.
 * ok(null) means "nothing saved yet".
 */
export function parseStoredProgress(raw: string | null, now: string): Result<LoadOutcome | null, LoadProblem> {
  if (raw === null) return ok(null)

  // JSON.parse is typed as returning `any`, which would switch off type
  // checking for everything it touches. We put it straight into `unknown`,
  // which forces us to check it (with Zod, below) before using it.
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return err({ kind: 'corrupt-json' })
  }

  // Look at the version first, so a save from a NEWER app gets a clear answer
  // instead of a confusing list of schema errors.
  const probe = z.object({ version: z.number() }).safeParse(data)
  if (probe.success && probe.data.version > CURRENT_VERSION) {
    return err({ kind: 'unsupported-version', version: probe.data.version })
  }

  const parsed = StoredProgressSchema.safeParse(data)
  if (!parsed.success) {
    return err({ kind: 'invalid', issues: parsed.error.issues.slice(0, 5).map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`) })
  }

  const stored = parsed.data
  switch (stored.version) {
    case 1:
      return ok({ state: migrateV1toV2(stored, now), migratedFrom: 1 })
    case 2:
      return ok({ state: stored, migratedFrom: null })
    default:
      return assertNever(stored, 'Unknown progress version')
  }
}

// ---------------------------------------------------------------------------
// The store: localStorage + a tiny subscription system for React
// ---------------------------------------------------------------------------

/** Something the learner should be told about their saved data. */
export type StorageNotice =
  | { kind: 'migrated'; from: 1 }
  | { kind: 'recovered'; problem: LoadProblem }
  | { kind: 'unavailable' }

export type ProgressSnapshot = { state: ProgressState; notice: StorageNotice | null }

let snapshot: ProgressSnapshot | null = null
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((listener) => listener())

/** localStorage can throw (blocked in some private modes), so every access is guarded. */
function readRaw(): { ok: true; raw: string | null } | { ok: false } {
  try {
    return { ok: true, raw: window.localStorage.getItem(STORAGE_KEY) }
  } catch {
    return { ok: false }
  }
}

function writeRaw(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Full or blocked storage: progress still works for this visit.
  }
}

function load(): ProgressSnapshot {
  const read = readRaw()
  if (!read.ok) return { state: freshState(), notice: { kind: 'unavailable' } }

  const result = parseStoredProgress(read.raw, new Date().toISOString())
  if (result.ok) {
    if (result.value === null) return { state: freshState(), notice: null }
    const { state, migratedFrom } = result.value
    if (migratedFrom !== null && read.raw !== null) {
      // Keep the old save until the new one is written, then upgrade in place.
      writeRaw(BACKUP_KEY, read.raw)
      writeRaw(STORAGE_KEY, JSON.stringify(state))
      return { state, notice: { kind: 'migrated', from: migratedFrom } }
    }
    return { state, notice: null }
  }

  // Unreadable: keep a copy of what was there (never destroy data we don't
  // understand), start fresh, and say so.
  if (read.raw !== null) writeRaw(BACKUP_KEY, read.raw)
  console.warn('[progress] Saved progress could not be read and was reset.', result.error)
  const state = freshState()
  writeRaw(STORAGE_KEY, JSON.stringify(state))
  return { state, notice: { kind: 'recovered', problem: result.error } }
}

/** For useSyncExternalStore: must return the SAME object until something changes. */
function getSnapshot(): ProgressSnapshot {
  snapshot ??= load()
  return snapshot
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // The `storage` event fires when ANOTHER tab changes localStorage, so two
  // open tabs stay in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return
    snapshot = null
    emit()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * The learner's progress, or null while rendering on the server and during
 * hydration (the server can't see localStorage). Components show a skeleton
 * for null, then the real data a moment later.
 */
export function useProgress(): ProgressSnapshot | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

/** Applies a change, saves it, and tells every subscribed component. */
function commit(update: (state: ProgressState) => ProgressState) {
  const current = getSnapshot()
  const next = update(current.state)
  if (next === current.state) return
  snapshot = { state: next, notice: current.notice }
  writeRaw(STORAGE_KEY, JSON.stringify(next))
  emit()
}

const now = () => new Date().toISOString()

/** A new attempt ID: "att_" + time + randomness, run through the schema to brand it. */
const newAttemptId = () => AttemptIdSchema.parse(`att_${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`)

/** The input for a new attempt: everything except what the store adds (Omit). */
export type NewQuizAttempt = Omit<QuizAttempt, 'id' | 'submittedAt'>

export const progressActions = {
  /** Enrolling is free in this demo: paid courses use a demo button, no payment. */
  enroll(courseId: CourseId) {
    commit((s) => (s.enrollments.some((e) => e.courseId === courseId) ? s : { ...s, enrollments: [...s.enrollments, { courseId, enrolledAt: now() }] }))
  },

  setLessonComplete(lessonId: LessonId, complete: boolean) {
    commit((s) => {
      const done = s.lessonProgress.some((p) => p.lessonId === lessonId)
      if (done === complete) return s
      return {
        ...s,
        lessonProgress: complete
          ? [...s.lessonProgress, { lessonId, completedAt: now() }]
          : s.lessonProgress.filter((p) => p.lessonId !== lessonId),
      }
    })
  },

  /** Saves an attempt. A passing attempt also completes the quiz lesson. */
  recordQuizAttempt(input: NewQuizAttempt): QuizAttempt {
    const attempt: QuizAttempt = { ...input, id: newAttemptId(), submittedAt: now() }
    commit((s) => {
      const alreadyComplete = s.lessonProgress.some((p) => p.lessonId === attempt.lessonId)
      return {
        ...s,
        quizAttempts: [...s.quizAttempts, attempt],
        lessonProgress:
          attempt.passed && !alreadyComplete ? [...s.lessonProgress, { lessonId: attempt.lessonId, completedAt: attempt.submittedAt }] : s.lessonProgress,
      }
    })
    return attempt
  },

  setDisplayName(displayName: string) {
    const name = displayName.trim().slice(0, 60)
    if (!name) return
    commit((s) => ({ ...s, learner: { ...s.learner, displayName: name } }))
  },

  dismissNotice() {
    const current = getSnapshot()
    snapshot = { state: current.state, notice: null }
    emit()
  },

  resetProgress() {
    snapshot = { state: freshState(), notice: null }
    writeRaw(STORAGE_KEY, JSON.stringify(snapshot.state))
    emit()
  },

  /**
   * DEMO TOOLS (dashboard): write an old or broken save, then reload it, to
   * watch the migration and the recovery path work.
   */
  loadDemoSave(kind: 'v1' | 'corrupt' | 'future') {
    const raw = kind === 'v1' ? JSON.stringify(V1_SAMPLE) : kind === 'corrupt' ? '{"version":2,"enrollments":[oops' : JSON.stringify({ version: 3, everything: 'new' })
    writeRaw(STORAGE_KEY, raw)
    snapshot = null
    emit()
  },
}

/**
 * A version-1 save, as an older release of the app would have written it.
 * `satisfies z.input<typeof ProgressV1Schema>` checks it against the v1 shape
 * at compile time, so the demo can't drift from the schema it demonstrates.
 */
const V1_SAMPLE = {
  version: 1,
  enrolled: ['crs_web', 'crs_jamb-english'],
  completed: ['les_web-1-1', 'les_web-1-2', 'les_jamb-1-1'],
  quizScores: { 'les_web-1-3': { correct: 3, total: 4 }, 'les_jamb-1-3': { correct: 1, total: 3 } },
} satisfies z.input<typeof ProgressV1Schema>
