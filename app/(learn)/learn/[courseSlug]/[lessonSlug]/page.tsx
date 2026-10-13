import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CompleteButton } from '@/components/lesson/complete-button'
import { LessonAccess } from '@/components/lesson/lesson-access'
import { LessonKindIcon } from '@/components/lesson/lesson-kind-icon'
import { LessonView } from '@/components/lesson/lesson-view'
import { Icon } from '@/components/ui/icon'
import { getLessonPage, listLessonParams } from '@/lib/data'
import { isQuizLesson } from '@/lib/guards'
import { describeLesson } from '@/lib/lessons'

/*
  /learn/[courseSlug]/[lessonSlug]: TWO dynamic segments.
  generateStaticParams returns every { courseSlug, lessonSlug } pair (102
  lessons), so each lesson is prerendered at build time. PageProps types
  `params` as Promise<{ courseSlug: string; lessonSlug: string }>.
*/

export async function generateStaticParams() {
  return listLessonParams()
}

export async function generateMetadata({ params }: PageProps<'/learn/[courseSlug]/[lessonSlug]'>): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params
  const page = await getLessonPage(courseSlug, lessonSlug)
  if (!page) return { title: 'Lesson not found' }
  return { title: `${page.lesson.title} · ${page.outline.title}`, description: page.lesson.summary }
}

export default async function LessonPage({ params }: PageProps<'/learn/[courseSlug]/[lessonSlug]'>) {
  const { courseSlug, lessonSlug } = await params
  const page = await getLessonPage(courseSlug, lessonSlug)
  if (!page) notFound()

  const { outline, lesson, summary, previous, next, moduleTitle } = page
  const nextHref = next ? `/learn/${outline.slug}/${next.slug}` : null
  const lessonNumber = outline.lessons.findIndex((l) => l.id === lesson.id) + 1

  return (
    <article className="mx-auto max-w-reading px-4 pt-8 pb-16 sm:px-6 lg:pt-12">
      <header className="mb-8">
        <p className="text-sm text-muted">
          Module {outline.modules.find((m) => m.id === summary.moduleId)?.position}: {moduleTitle}
          <span aria-hidden> · </span>
          <span className="whitespace-nowrap">
            Lesson {lessonNumber} of {outline.lessons.length}
          </span>
        </p>
        <h1 className="mt-2 text-3xl leading-tight font-semibold sm:text-4xl">{lesson.title}</h1>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
          <LessonKindIcon kind={lesson.kind} />
          {describeLesson(summary)}
        </p>
      </header>

      <LessonAccess courseId={outline.id} courseSlug={outline.slug} priceKobo={outline.priceKobo} isPreview={summary.isPreview}>
        <LessonView lesson={lesson} courseSlug={outline.slug} nextHref={nextHref} />

        {/* A type guard in JSX: quizzes complete themselves when passed. */}
        {!isQuizLesson(lesson) && (
          <div className="mt-10 border-t border-line pt-6">
            <CompleteButton courseId={outline.id} lessonId={lesson.id} nextHref={nextHref} certificateHref={`/certificate/${outline.slug}`} />
          </div>
        )}
      </LessonAccess>

      <nav aria-label="Lesson navigation" className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/learn/${outline.slug}/${previous.slug}`}
            className="group flex flex-col rounded-card border border-line bg-raised p-4 hover:border-line-strong"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-subtle">
              <Icon name="chevronLeft" className="size-3.5" /> Previous
            </span>
            <span className="mt-1 font-semibold group-hover:text-brand">{previous.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/learn/${outline.slug}/${next.slug}`}
            className="group flex flex-col rounded-card border border-line bg-raised p-4 text-right hover:border-line-strong"
          >
            <span className="inline-flex items-center justify-end gap-1 text-xs font-semibold text-subtle">
              Next <Icon name="chevronRight" className="size-3.5" />
            </span>
            <span className="mt-1 font-semibold group-hover:text-brand">{next.title}</span>
          </Link>
        ) : (
          <Link href={`/certificate/${outline.slug}`} className="group flex flex-col rounded-card border border-accent/50 bg-accent-soft p-4 text-right">
            <span className="text-xs font-semibold text-accent">Last lesson</span>
            <span className="mt-1 inline-flex items-center justify-end gap-1.5 font-semibold">
              <Icon name="award" /> Your certificate
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}
