import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CertificateGate } from '@/components/learner/certificate-gate'
import { getProgressOutline, listCourseSlugs } from '@/lib/data'

export async function generateStaticParams() {
  const slugs = await listCourseSlugs()
  return slugs.map((courseSlug) => ({ courseSlug }))
}

export async function generateMetadata({ params }: PageProps<'/certificate/[courseSlug]'>): Promise<Metadata> {
  const { courseSlug } = await params
  const course = await getProgressOutline(courseSlug)
  return { title: course ? `Certificate: ${course.title}` : 'Certificate not found' }
}

/*
  The page is static (one per course); whether YOU have earned the
  certificate is decided in the browser from your saved progress. If not,
  the gate shows exactly what's left to do instead.
*/
export default async function CertificatePage({ params }: PageProps<'/certificate/[courseSlug]'>) {
  const { courseSlug } = await params
  const course = await getProgressOutline(courseSlug)
  if (!course) notFound()
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 print:p-0">
      <CertificateGate course={course} />
    </div>
  )
}
