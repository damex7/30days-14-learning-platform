import { Logo } from '@/components/site/logo'
import { NavLink } from '@/components/site/nav-link'
import { ThemeToggle } from '@/components/site/theme-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur print:hidden">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-2 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="flex items-center gap-0.5 xs:gap-1">
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/dashboard">My learning</NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
