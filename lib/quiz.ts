import { assertNever } from '@/lib/guards'
import type { QuestionId } from '@/lib/schema/ids'
import type { Answer } from '@/lib/schema/learner'
import type { Question } from '@/lib/schema/lesson'

/*
  QUIZ GRADING: pure functions, no React and no storage, so the quiz player,
  the dashboard and (later) a server action can all use the same rules.

  Every function switches on `question.type` and ends in assertNever, so a new
  question type (say, "fill in the blank") is a compile error here until it
  can be graded.
*/

/**
 * The learner's answers so far. PARTIAL<Record<...>>: a lookup table from
 * question ID to answer where unanswered questions have no entry yet.
 */
export type AnswerSheet = Partial<Record<QuestionId, Answer>>

export type QuestionResult = {
  questionId: QuestionId
  answered: boolean
  correct: boolean
}

export type QuizGrade = {
  results: QuestionResult[]
  correctCount: number
  questionCount: number
  scorePercent: number
  passed: boolean
}

/** Is this answer right? An answer of the wrong shape is simply wrong. */
export function isCorrect(question: Question, answer: Answer | undefined): boolean {
  if (!answer) return false
  switch (question.type) {
    case 'single':
      return answer.type === 'single' && answer.optionId === question.correctOptionId
    case 'multiple': {
      if (answer.type !== 'multiple') return false
      // Pick-all-that-apply is all or nothing: exactly the right set, no extras.
      const chosen = new Set(answer.optionIds)
      return chosen.size === question.correctOptionIds.length && question.correctOptionIds.every((id) => chosen.has(id))
    }
    case 'true-false':
      return answer.type === 'true-false' && answer.value === question.correct
    default:
      return assertNever(question, 'Unknown question type')
  }
}

/** Has the learner actually chosen something? (An empty multiple-choice selection doesn't count.) */
export function isAnswered(answer: Answer | undefined): boolean {
  if (!answer) return false
  switch (answer.type) {
    case 'single':
    case 'true-false':
      return true
    case 'multiple':
      return answer.optionIds.length > 0
    default:
      return assertNever(answer, 'Unknown answer type')
  }
}

/** Grades a whole quiz. The score is rounded DOWN, so 69.9% never shows as a passing 70%. */
export function gradeQuiz(questions: readonly Question[], answers: AnswerSheet, passMarkPercent: number): QuizGrade {
  const results = questions.map((question) => {
    const answer = answers[question.id]
    return { questionId: question.id, answered: isAnswered(answer), correct: isCorrect(question, answer) }
  })
  const correctCount = results.filter((r) => r.correct).length
  const questionCount = questions.length
  const scorePercent = questionCount === 0 ? 0 : Math.floor((correctCount / questionCount) * 100)
  return { results, correctCount, questionCount, scorePercent, passed: scorePercent >= passMarkPercent }
}

/** The correct answer in words, for the explanation shown after submitting. */
export function correctAnswerText(question: Question): string {
  switch (question.type) {
    case 'single':
      return question.options.find((o) => o.id === question.correctOptionId)?.text ?? ''
    case 'multiple':
      return question.options
        .filter((o) => question.correctOptionIds.includes(o.id))
        .map((o) => o.text)
        .join('; ')
    case 'true-false':
      return question.correct ? 'True' : 'False'
    default:
      return assertNever(question, 'Unknown question type')
  }
}

/** The instruction shown under each question prompt. */
export function questionHint(question: Question): string {
  switch (question.type) {
    case 'single':
      return 'Choose one answer.'
    case 'multiple':
      return 'Choose all that apply.'
    case 'true-false':
      return 'True or false?'
    default:
      return assertNever(question, 'Unknown question type')
  }
}
