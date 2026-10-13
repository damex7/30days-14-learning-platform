import type { Metadata } from 'next'
import { DashboardView } from '@/components/learner/dashboard-view'
import { listProgressOutlines } from '@/lib/data'

export const metadata: Metadata = { title: 'My learning' }

/*
  The server part fetches every course outline (cached, so this page is
  prerendered); the Client Component picks the enrolled ones using progress
  saved in this browser. On Day 16 the server will know who is signed in and
  send only their courses.
*/
export default async function DashboardPage() {
  const outlines = await listProgressOutlines()
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <DashboardView outlines={outlines} />
    </div>
  )
}
