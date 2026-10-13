// ROOT LAYOUT: the one layout every route shares. It holds only what every
// page needs: <html>/<body>, fonts, the theme set-up and the skip link.
// Headers live in the route groups below: (site) has the full header and
// footer; (learn) has the calm lesson player with a slim bar instead.

import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Fraunces, JetBrains_Mono } from 'next/font/google'
import { site } from '@/lib/site'
import { themeScript } from '@/lib/theme'
import './globals.css'

// next/font downloads the fonts at build time and serves them from this
// site: no request to Google from the learner's browser and no layout jump.
// All three include the `vietnamese` subset, which carries the dot-below
// letters and combining tone marks Yoruba needs (Ì, ọ̀, ẹ́, ṣ).
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext', 'vietnamese'], axes: ['SOFT', 'opsz'], variable: '--font-fraunces' })
const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
})
const jetbrains = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-jetbrains', preload: false })

export const metadata: Metadata = {
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_NG' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf6ee' },
    { media: '(prefers-color-scheme: dark)', color: '#15130f' },
  ],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en-NG"
      // The <head> script sets data-theme before React loads, so the server's
      // <html> and the browser's may differ on purpose. This silences that
      // one expected warning (it applies to this element only).
      suppressHydrationWarning
      className={`${fraunces.variable} ${beVietnam.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        {/* SKIP LINK: the first Tab stop on every page. Every layout puts
            id="main" on its <main>. */}
        <a
          href="#main"
          className="sr-only z-50 rounded-control bg-brand px-4 py-2 font-semibold text-brand-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
