import Link from 'next/link'
import { CourseGrid } from '@/components/course/course-card'
import { ContinueLearning } from '@/components/learner/continue-learning'
import { Avatar } from '@/components/ui/avatar'
import { buttonClass } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { TONE_CLASSES } from '@/components/ui/tone'
import { getCatalogTotals, getFeaturedCourses, listCategories, listInstructors, listProgressOutlines } from '@/lib/data'
import { cn } from '@/lib/cn'
import { plural } from '@/lib/format'
import { site } from '@/lib/site'

// A Server Component: it awaits the data layer directly. Only the
// "Continue learning" strip is a Client Component, because it reads
// localStorage.
export default async function HomePage() {
  const [featured, categories, totals, instructors, outlines] = await Promise.all([
    getFeaturedCourses(3),
    listCategories(),
    getCatalogTotals(),
    listInstructors(),
    listProgressOutlines(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-linear-to-b from-brand-soft/70 to-paper">
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr] md:py-20">
          <div className="animate-rise">
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              <span lang="yo">{site.name}</span> · {site.meaning}
            </p>
            <h1 className="mt-3 text-4xl leading-[1.08] font-semibold sm:text-5xl">Learn something useful this week.</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Short, practical courses for Nigerian learners: build a website, keep your shop’s books, sell on WhatsApp or prepare for
              JAMB, in lessons you can finish on a lunch break.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/courses" className={buttonClass('primary', 'lg')}>
                Browse courses <Icon name="arrowRight" />
              </Link>
              <Link href="/courses?price=free" className={buttonClass('secondary', 'lg')}>
                {plural(totals.freeCourses, 'free course')}
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-3 rounded-card border border-line bg-raised p-5 text-center shadow-raised md:grid-cols-1 md:text-left">
            {[
              { label: 'Courses', value: totals.courses },
              { label: 'Short lessons', value: totals.lessons },
              { label: 'Instructors', value: totals.instructors },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col md:flex-row md:items-baseline md:justify-between md:border-b md:border-line md:pb-3 md:last:border-0 md:last:pb-0"
              >
                <dt className="text-xs text-muted sm:text-sm">{stat.label}</dt>
                <dd className="order-first font-display text-3xl font-semibold text-brand md:order-last">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContinueLearning outlines={outlines} />

      {/* Featured */}
      <section aria-labelledby="featured-heading" className="mx-auto mt-14 max-w-content px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-heading" className="text-2xl font-semibold sm:text-3xl">
              Featured courses
            </h2>
            <p className="mt-1 text-muted">Popular places to start.</p>
          </div>
          <Link href="/courses" className="shrink-0 text-sm font-semibold text-brand hover:underline">
            See all courses
          </Link>
        </div>
        <div className="mt-6">
          <CourseGrid courses={featured} />
        </div>
      </section>

      {/* Categories */}
      <section aria-labelledby="categories-heading" className="mx-auto mt-16 max-w-content px-4 sm:px-6">
        <h2 id="categories-heading" className="text-2xl font-semibold sm:text-3xl">
          Browse by category
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/courses?category=${category.slug}`}
                className="group flex h-full flex-col rounded-card border border-line bg-raised p-4 transition-shadow hover:shadow-raised"
              >
                <span className={cn('h-1.5 w-10 rounded-pill', TONE_CLASSES[category.tone].bar)} aria-hidden />
                <span className="mt-3 font-display text-lg font-semibold group-hover:text-brand">{category.name}</span>
                <span className="mt-1 text-sm text-muted">{category.description}</span>
                <span className="mt-auto pt-3 text-xs font-semibold text-subtle">{plural(category.courseCount, 'course')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="mx-auto mt-16 max-w-content px-4 sm:px-6">
        <h2 id="how-heading" className="text-2xl font-semibold sm:text-3xl">
          How it works
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: 'Pick a short course', body: 'Most courses take about an hour in total, split into lessons of a few minutes each.' },
            { title: 'Watch, read, then check', body: 'Each module mixes short videos, readings and a quick quiz with explanations.' },
            { title: 'Finish and print', body: 'Complete every lesson and pass every quiz (70%) to unlock a printable certificate.' },
          ].map((step, i) => (
            <li key={step.title} className="rounded-card border border-line bg-raised p-5">
              <span className="font-display text-3xl font-semibold text-accent" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Instructors */}
      <section aria-labelledby="instructors-heading" className="mx-auto mt-16 max-w-content px-4 sm:px-6">
        <h2 id="instructors-heading" className="text-2xl font-semibold sm:text-3xl">
          Learn from practitioners
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <li key={instructor.id}>
              <Link
                href={`/instructors/${instructor.slug}`}
                className="group flex items-center gap-3 rounded-card border border-line bg-raised p-4 hover:shadow-raised"
              >
                <Avatar name={instructor.name} />
                <span className="min-w-0">
                  <span className="block font-semibold group-hover:text-brand">{instructor.name}</span>
                  <span className="block truncate text-sm text-muted">{instructor.headline}</span>
                  <span className="block text-xs text-subtle">{plural(instructor.courseCount, 'course')}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
