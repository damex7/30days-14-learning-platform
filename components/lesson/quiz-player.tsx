// CLIENT COMPONENT: the learner's answers and the result are interactive
// state, focus is moved after submitting (an effect), and attempts are saved
// to localStorage. None of that can happen on the server.
//
// NOTE for Day 16: the questions arrive here WITH their correct answers, so
// a curious learner could find them in DevTools. That is fine for a demo.
// With a database, grading moves into a server action and the browser only
// ever receives the questions.
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { InlineMarkdown } from '@/components/lesson/markdown'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/cn'
import { assertNever } from '@/lib/guards'
import { bestAttempt } from '@/lib/learning'
import { progressActions, useProgress } from '@/lib/progress'
import { correctAnswerText, gradeQuiz, isAnswered, questionHint, type AnswerSheet, type QuizGrade } from '@/lib/quiz'
import type { LessonId, QuestionId } from '@/lib/schema/ids'
import type { Answer } from '@/lib/schema/learner'
import type { Question } from '@/lib/schema/lesson'

type Props = {
  lessonId: LessonId
  questions: readonly Question[]
  passMarkPercent: number
  courseSlug: string
  nextHref: string | null
}

export function QuizPlayer({ lessonId, questions, passMarkPercent, courseSlug, nextHref }: Props) {
  const progress = useProgress()
  const [answers, setAnswers] = useState<AnswerSheet>({})
  const [grade, setGrade] = useState<QuizGrade | null>(null)
  const [missing, setMissing] = useState<QuestionId[]>([])
  const [round, setRound] = useState(0) // bumps on retake to reset the form
  const resultsHeading = useRef<HTMLHeadingElement>(null)
  const errorSummary = useRef<HTMLDivElement>(null)
  const firstQuestion = useRef<HTMLFieldSetElement>(null)

  // FOCUS MANAGEMENT (effects run after React has updated the page):
  // after submitting, move focus to the results so keyboard and screen-reader
  // users land on them; after a failed submit, to the list of missed questions.
  useEffect(() => {
    if (grade) resultsHeading.current?.focus()
  }, [grade])
  useEffect(() => {
    if (missing.length) errorSummary.current?.focus()
  }, [missing])

  const best = progress ? bestAttempt(progress.state, lessonId) : null
  const submitted = grade !== null

  function setAnswer(questionId: QuestionId, answer: Answer) {
    setAnswers((current) => ({ ...current, [questionId]: answer }))
    setMissing((current) => current.filter((id) => id !== questionId))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const unanswered = questions.filter((q) => !isAnswered(answers[q.id])).map((q) => q.id)
    if (unanswered.length) {
      setMissing(unanswered)
      return
    }
    const result = gradeQuiz(questions, answers, passMarkPercent)
    progressActions.recordQuizAttempt({
      lessonId,
      answers: answersRecord(answers),
      correctCount: result.correctCount,
      questionCount: result.questionCount,
      scorePercent: result.scorePercent,
      passed: result.passed,
    })
    setGrade(result)
  }

  function retake() {
    setAnswers({})
    setGrade(null)
    setMissing([])
    setRound((r) => r + 1)
    // Wait one frame for the fresh form to render, then focus question 1.
    requestAnimationFrame(() => firstQuestion.current?.focus())
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-card border border-line bg-raised px-4 py-3 text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Icon name="quiz" /> {questions.length} questions
        </span>
        <span className="text-muted">Pass mark {passMarkPercent}%</span>
        {best && (
          <span className={cn('inline-flex items-center gap-1.5 font-semibold', best.passed ? 'text-leaf' : 'text-sun')}>
            <Icon name={best.passed ? 'checkCircle' : 'refresh'} /> Best score {best.scorePercent}%{best.passed ? ' · Passed' : ''}
          </span>
        )}
      </div>

      {/* Always in the page, so screen readers announce changes to it. */}
      <div role="status" aria-live="polite" className="sr-only">
        {grade ? `You scored ${grade.correctCount} out of ${grade.questionCount}, ${grade.scorePercent} percent. ${grade.passed ? 'You passed.' : `You need ${passMarkPercent} percent to pass.`}` : ''}
      </div>

      {grade && (
        <section
          aria-labelledby="quiz-result-heading"
          className={cn('mb-8 rounded-card border-2 p-5 sm:p-6', grade.passed ? 'border-leaf bg-leaf-soft' : 'border-sun bg-sun-soft')}
        >
          <h2 id="quiz-result-heading" ref={resultsHeading} tabIndex={-1} className="text-2xl font-semibold focus:outline-none">
            {grade.passed ? 'You passed!' : 'Not quite yet'}
          </h2>
          <p className="mt-1 text-lg">
            You scored <strong>{grade.correctCount}</strong> out of <strong>{grade.questionCount}</strong> ({grade.scorePercent}%).
            {!grade.passed && ` You need ${passMarkPercent}% to pass.`}
          </p>
          <p className="mt-1 text-sm text-muted">Each question below now shows the right answer and why. Your best score is kept.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={retake} className={buttonClass(grade.passed ? 'secondary' : 'primary')}>
              <Icon name="refresh" /> Retake quiz
            </button>
            {grade.passed &&
              (nextHref ? (
                <Link href={nextHref} className={buttonClass('primary')}>
                  Next lesson <Icon name="arrowRight" />
                </Link>
              ) : (
                <Link href={`/certificate/${courseSlug}`} className={buttonClass('accent')}>
                  <Icon name="award" /> Check your certificate
                </Link>
              ))}
          </div>
        </section>
      )}

      {missing.length > 0 && (
        <div ref={errorSummary} tabIndex={-1} role="alert" className="mb-6 rounded-card border-2 border-danger bg-danger-soft p-4 focus:outline-none">
          <p className="font-semibold text-danger">Please answer every question before submitting.</p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {missing.map((id) => {
              const n = questions.findIndex((q) => q.id === id) + 1
              return (
                <li key={id}>
                  <a href={`#${id}`} className="underline">
                    Question {n}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <form key={round} onSubmit={submit} noValidate className="space-y-6">
        {questions.map((question, index) => (
          <QuestionField
            key={question.id}
            ref={index === 0 ? firstQuestion : undefined}
            question={question}
            number={index + 1}
            total={questions.length}
            answer={answers[question.id]}
            onAnswer={(answer) => setAnswer(question.id, answer)}
            result={grade ? (grade.results[index]?.correct ?? false) : null}
            isMissing={missing.includes(question.id)}
          />
        ))}
        {!submitted && (
          <button type="submit" className={buttonClass('primary', 'lg', 'w-full sm:w-auto')}>
            Submit answers
          </button>
        )}
      </form>
    </div>
  )
}

/*
  The answer sheet is Partial<Record<...>> (unanswered questions have no
  entry). A saved attempt's `answers` is a plain Record, so we copy only the
  answers that exist. By submit time every question is answered, but the
  types don't know that, and this keeps them honest.
*/
function answersRecord(sheet: AnswerSheet): Record<QuestionId, Answer> {
  const record: Record<QuestionId, Answer> = {}
  // Object.entries() types every key as plain string. The keys of an
  // AnswerSheet are QuestionIds by construction (setAnswer is the only
  // writer), so this assertion restores what the compiler lost.
  for (const [id, answer] of Object.entries(sheet) as [QuestionId, Answer | undefined][]) {
    if (answer) record[id] = answer
  }
  return record
}

type QuestionFieldProps = {
  question: Question
  number: number
  total: number
  answer: Answer | undefined
  onAnswer: (answer: Answer) => void
  /** null before submitting; then whether this answer was right. */
  result: boolean | null
  isMissing: boolean
  ref?: React.Ref<HTMLFieldSetElement>
}

/**
 * One question as a <fieldset> with a <legend>: screen readers announce the
 * question when focus enters any of its options. Radios for single choice and
 * true/false, checkboxes for multiple choice, each with a real <label>.
 */
function QuestionField({ question, number, total, answer, onAnswer, result, isMissing, ref }: QuestionFieldProps) {
  const hintId = `${question.id}-hint`
  const submitted = result !== null

  // The options to show, as { value, label }, for every question type. An
  // OptionId is a branded string, so it can be passed where a string is
  // expected (the brand only blocks the other direction).
  const toOption = (value: string, label: string) => ({ value, label })
  // Another exhaustive switch over the Question union.
  const options = (() => {
    switch (question.type) {
      case 'single':
      case 'multiple':
        return question.options.map((o) => toOption(o.id, o.text))
      case 'true-false':
        return [toOption('true', 'True'), toOption('false', 'False')]
      default:
        return assertNever(question, 'Unknown question type')
    }
  })()

  /** Is this option currently chosen? */
  const isChosen = (value: string): boolean => {
    if (!answer) return false
    switch (answer.type) {
      case 'single':
        return answer.optionId === value
      case 'multiple':
        return answer.optionIds.some((id) => id === value)
      case 'true-false':
        return String(answer.value) === value
      default:
        return assertNever(answer, 'Unknown answer type')
    }
  }

  /** Is this option one of the correct ones? (Only shown after submitting.) */
  const isRight = (value: string): boolean => {
    switch (question.type) {
      case 'single':
        return question.correctOptionId === value
      case 'multiple':
        return question.correctOptionIds.some((id) => id === value)
      case 'true-false':
        return String(question.correct) === value
      default:
        return assertNever(question, 'Unknown question type')
    }
  }

  function choose(value: string, checked: boolean) {
    switch (question.type) {
      case 'single': {
        const option = question.options.find((o) => o.id === value)
        if (option) onAnswer({ type: 'single', optionId: option.id })
        return
      }
      case 'multiple': {
        const current = answer?.type === 'multiple' ? answer.optionIds : []
        const option = question.options.find((o) => o.id === value)
        if (!option) return
        onAnswer({ type: 'multiple', optionIds: checked ? [...current, option.id] : current.filter((id) => id !== option.id) })
        return
      }
      case 'true-false':
        onAnswer({ type: 'true-false', value: value === 'true' })
        return
      default:
        assertNever(question, 'Unknown question type')
    }
  }

  const inputType = question.type === 'multiple' ? 'checkbox' : 'radio'

  return (
    <fieldset
      ref={ref}
      id={question.id}
      tabIndex={-1}
      disabled={submitted}
      aria-describedby={hintId}
      className={cn(
        'scroll-mt-24 rounded-card border bg-raised p-4 focus:outline-none sm:p-5',
        isMissing ? 'border-2 border-danger' : 'border-line',
        result === true && 'border-leaf',
        result === false && 'border-sun',
      )}
    >
      <legend className="float-left w-full">
        <span className="block text-xs font-semibold tracking-wide text-subtle uppercase">
          Question {number} of {total}
        </span>
        <span className="mt-1 block text-lg leading-snug font-semibold">
          <InlineMarkdown text={question.prompt} />
        </span>
      </legend>
      <p id={hintId} className="clear-both pt-1 text-sm text-muted">
        {questionHint(question)}
        {isMissing && <span className="ml-2 font-semibold text-danger">Not answered yet</span>}
      </p>

      <div className="mt-3 grid gap-2">
        {options.map((option) => {
          const id = `${question.id}-${option.value}`
          const chosen = isChosen(option.value)
          const right = submitted && isRight(option.value)
          const wrongChoice = submitted && chosen && !isRight(option.value)
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                'flex min-h-12 cursor-pointer items-center gap-3 rounded-control border px-3 py-2 transition-colors',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus',
                chosen && !submitted ? 'border-brand bg-brand-soft' : 'border-line hover:border-line-strong',
                right && 'border-leaf bg-leaf-soft',
                wrongChoice && 'border-sun bg-sun-soft',
                submitted && 'cursor-default',
              )}
            >
              <input
                id={id}
                type={inputType}
                name={question.id}
                value={option.value}
                checked={chosen}
                onChange={(e) => choose(option.value, e.currentTarget.checked)}
                className="size-4.5 shrink-0 accent-brand focus-visible:outline-none"
              />
              <span className="flex-1">
                <InlineMarkdown text={option.label} />
              </span>
              {right && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-leaf">
                  <Icon name="check" /> Correct answer
                </span>
              )}
              {wrongChoice && <span className="text-xs font-semibold text-sun">Your answer</span>}
            </label>
          )
        })}
      </div>

      {submitted && (
        <div className="mt-4 rounded-control bg-sunken p-3 text-sm">
          <p className={cn('font-semibold', result ? 'text-leaf' : 'text-sun')}>
            {result ? 'Correct.' : `Not quite. The answer is: ${correctAnswerText(question)}.`}
          </p>
          <p className="mt-1 text-muted">{question.explanation}</p>
        </div>
      )}
    </fieldset>
  )
}
