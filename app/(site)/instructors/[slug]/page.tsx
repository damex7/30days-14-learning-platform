import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CourseGrid } from '@/components/course/course-card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { getInstructor, listInstructorSlugs } from '@/lib/data'
import { formatRating, plural } from '@/lib/format'

export async function generateStaticParams() {
  const slugs = await listInstructorSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/instructors/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const profile = await getInstructor(slug)
  return profile ? { title: profile.instructor.name, description: profile.instructor.headline } : { title: 'Instructor not found' }
}

export default async function InstructorPage({ params }: PageProps<'/instructors/[slug]'>) {
  const { slug } = await params
  const profile = await getInstructor(slug)
  if (!profile) notFound()
  const { instructor, courses, averageRating, lessonCount } = profile

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <header className="grid gap-6 rounded-card border border-line bg-raised p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        <Avatar name={instructor.name} className="size-20 text-2xl" />
        <div>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Instructor</p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{instructor.name}</h1>
          <p className="mt-1 text-lg text-muted">{instructor.headline}</p>
          {/* Calculated from this instructor's courses and their reviews. */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <li className="inline-flex items-center gap-1.5">
              <Icon name="pin" /> {instructor.location}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="layers" /> {plural(courses.length, 'course')}, {plural(lessonCount, 'lesson')}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="star" /> {averageRating === null ? 'No reviews yet' : `${formatRating(averageRating)} average rating`}
            </li>
          </ul>
          <p className="mt-4 max-w-reading leading-relaxed">{instructor.bio}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Expertise">
            {instructor.expertise.map((skill) => (
              <li key={skill}>
                <Badge className="bg-sunken text-muted">{skill}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section aria-labelledby="courses-heading" className="mt-12">
        <h2 id="courses-heading" className="text-2xl font-semibold">
          Courses by {instructor.name.split(' ')[0]}
        </h2>
        <div className="mt-5">
          <CourseGrid courses={courses} />
        </div>
      </section>
    </div>
  )
}
