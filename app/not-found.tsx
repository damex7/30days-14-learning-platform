import { Logo } from '@/components/site/logo'
import { NotFoundPanel } from '@/components/states/not-found-panel'

// Unknown URLs anywhere in the app. It renders inside the ROOT layout only
// (no site header), so it brings a logo and its own <main>.
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center px-4 pt-10">
      <Logo />
      <main id="main">
        <NotFoundPanel title="Page not found">That page doesn’t exist. It may have moved, or the link may have a typo.</NotFoundPanel>
      </main>
    </div>
  )
}
