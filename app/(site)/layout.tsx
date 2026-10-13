import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

// ROUTE GROUP (site): the folder name in brackets is not part of the URL.
// Every page in here (/, /courses, /dashboard...) shares this header and
// footer. The lesson player lives in the (learn) group with its own layout.
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
