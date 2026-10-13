import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CourseProgressMeter } from '@/components/lesson/course-progress-meter'
import { LessonSidebar } from '@/components/lesson/lesson-sidebar'
import { ThemeToggle } from '@/components/site/theme-toggle'
import { Icon } from '@/components/ui/icon'
import { getCourseOutline } from '@/lib/data'
import { site } from '@/lib/site'

/*
  THE LESSON PLAYER LAYOUT (route group "(learn)", URL /learn/[courseSlug]/...)

  A different layout from the rest of the site on purpose: no big header, no
  footer, no promotions. Just a slim bar, the outline and the lesson.

  A LAYOUT stays mounted while you move between its child pages, so going
  from lesson 3 to lesson 4 swaps only the page; the sidebar keeps its
  scroll position. LayoutProps<'/learn/[courseSlug]'> types `params` from
  the folder names: here it only has courseSlug (the lesson slug belongs to
  the child page).
*/
export default async function LearnLayout({ children, params }: LayoutProps<'/learn/[courseSlug]'>) {
  const { courseSlug } = await params
  const outline = await getCourseOutline(courseSlug)
  if (!outline) notFound()

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur print:hidden">
        <div className="flex h-14 items-center gap-2 px-3 sm:gap-3 sm:px-5">
          <Link href="/" className="rounded-control px-1 font-display text-xl font-semibold text-brand" lang="yo">
            {site.name}
            <span className="sr-only">, home</span>
          </Link>
          <span aria-hidden className="h-6 w-px bg-line" />
          <Link href={`/courses/${outline.slug}`} className="group flex min-w-0 flex-1 items-center gap-1 rounded-control text-sm font-semibold">
            <Icon name="chevronLeft" className="text-muted group-hover:text-ink" />
            <span className="truncate group-hover:text-brand">{outline.title}</span>
          </Link>
          <CourseProgressMeter course={{ id: outline.id, lessons: outline.lessons }} />
          <ThemeToggle />
        </div>
      </header>
      <div className="mx-auto max-w-[90rem] lg:grid lg:grid-cols-[19rem_1fr]">
        <LessonSidebar courseId={outline.id} courseSlug={outline.slug} modules={outline.modules} />
        <main id="main" className="min-w-0 border-line lg:border-l">
          {children}
        </main>
      </div>
    </div>
  )
}
