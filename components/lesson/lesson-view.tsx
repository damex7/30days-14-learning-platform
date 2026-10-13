import { Markdown } from '@/components/lesson/markdown'
import { QuizPlayer } from '@/components/lesson/quiz-player'
import { Icon } from '@/components/ui/icon'
import { formatClock } from '@/lib/format'
import { assertNever } from '@/lib/guards'
import { readingMinutes } from '@/lib/lessons'
import type { ArticleLesson, VideoLesson } from '@/lib/schema/lesson'
import type { LessonDetail, QuizLessonDetail } from '@/lib/types'

/**
 * THE RIGHT VIEW FOR EACH KIND OF LESSON.
 *
 * Inside each `case`, TypeScript has narrowed `lesson` to that member of the
 * union: in case 'video' it is a VideoLesson (with durationSeconds and
 * transcript), in case 'quiz' a QuizLessonDetail (with questions). The
 * default branch is the exhaustiveness check: add a lesson kind and this
 * component stops compiling until it can show it.
 */
export function LessonView({ lesson, courseSlug, nextHref }: { lesson: LessonDetail; courseSlug: string; nextHref: string | null }) {
  switch (lesson.kind) {
    case 'video':
      return <VideoLessonView lesson={lesson} />
    case 'article':
      return <ArticleLessonView lesson={lesson} />
    case 'quiz':
      return <QuizLessonView lesson={lesson} courseSlug={courseSlug} nextHref={nextHref} />
    default:
      return assertNever(lesson, 'Unknown lesson kind')
  }
}

function VideoLessonView({ lesson }: { lesson: VideoLesson }) {
  // Split the transcript into short paragraphs (about three sentences each)
  // so it reads comfortably on a phone.
  const sentences = lesson.transcript.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [lesson.transcript]
  const paragraphs: string[] = []
  for (let i = 0; i < sentences.length; i += 3) paragraphs.push(sentences.slice(i, i + 3).join('').trim())

  return (
    <div>
      {/* A placeholder, not a real player: video hosting is out of scope today. */}
      <figure className="relative overflow-hidden rounded-card border border-line bg-brand text-brand-ink shadow-raised">
        <div className="relative flex aspect-video flex-col items-center justify-center gap-3 p-6 text-center">
          <svg aria-hidden className="absolute inset-0 size-full opacity-15" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="adire-player" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <path d="M36 8h18M36 15h18M36 22h18M8 40l8 8 8-8 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adire-player)" />
          </svg>
          <span className="relative grid size-16 place-items-center rounded-pill bg-brand-ink/15 ring-2 ring-brand-ink/40">
            <Icon name="play" className="size-7 translate-x-0.5" filled />
          </span>
          <p className="relative font-display text-lg font-semibold">Video placeholder</p>
          <p className="relative max-w-sm text-sm opacity-85">This demo has no video hosting yet. The full transcript is below.</p>
        </div>
        <figcaption className="relative flex items-center justify-between gap-3 border-t border-brand-ink/20 bg-black/15 px-4 py-2 text-sm">
          <span className="truncate">{lesson.title}</span>
          <span className="font-mono tabular-nums">0:00 / {formatClock(lesson.durationSeconds)}</span>
        </figcaption>
      </figure>

      <section aria-labelledby="transcript-heading" className="mt-8">
        <h2 id="transcript-heading" className="text-xl font-semibold">
          Transcript
        </h2>
        <div className="mt-3 space-y-4 text-[1.0625rem] leading-[1.75] text-ink/90">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  )
}

function ArticleLessonView({ lesson }: { lesson: ArticleLesson }) {
  return (
    <div>
      <p className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted">
        <Icon name="clock" /> {readingMinutes(lesson.bodyMarkdown)} min read
      </p>
      <Markdown source={lesson.bodyMarkdown} />
    </div>
  )
}

function QuizLessonView({ lesson, courseSlug, nextHref }: { lesson: QuizLessonDetail; courseSlug: string; nextHref: string | null }) {
  return <QuizPlayer lessonId={lesson.id} questions={lesson.questions} passMarkPercent={lesson.quiz.passMarkPercent} courseSlug={courseSlug} nextHref={nextHref} />
}
