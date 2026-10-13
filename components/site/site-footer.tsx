import Link from 'next/link'
import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-sunken/50 print:hidden">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 text-sm text-muted sm:grid-cols-[2fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-display text-xl font-semibold text-ink" lang="yo">
            {site.name}
          </p>
          <p className="mt-1">
            <span lang="yo">{site.name}</span> ({site.pronunciation}) is {site.meaning}. {site.tagline}.
          </p>
          <p className="mt-3 rounded-control border border-line bg-raised px-3 py-2 text-xs">
            Demo project: every course, instructor and review is sample content, and payments are not real.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-semibold text-ink">Learn</p>
          <ul className="mt-2 space-y-1.5">
            <li><Link className="hover:text-ink hover:underline" href="/courses">All courses</Link></li>
            <li><Link className="hover:text-ink hover:underline" href="/courses?price=free">Free courses</Link></li>
            <li><Link className="hover:text-ink hover:underline" href="/dashboard">My learning</Link></li>
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-ink">Categories</p>
          <ul className="mt-2 space-y-1.5">
            <li><Link className="hover:text-ink hover:underline" href="/courses?category=tech-skills">Tech skills</Link></li>
            <li><Link className="hover:text-ink hover:underline" href="/courses?category=small-business">Small business</Link></li>
            <li><Link className="hover:text-ink hover:underline" href="/courses?category=exam-prep">Exam prep</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
