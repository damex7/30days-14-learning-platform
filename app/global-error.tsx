'use client'

import type { ErrorProps } from '@/components/states/error-panel'

/*
  The last-resort boundary, for errors in the root layout itself. It replaces
  the whole document, so it brings its own <html>, <body> and minimal inline
  styles (globals.css and fonts aren't loaded here). The colours follow the
  OS theme through `color-scheme`.
*/
export default function GlobalError({ error, retry }: ErrorProps) {
  return (
    <html lang="en-NG">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', colorScheme: 'light dark', display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: 16 }}>
        <title>Something went wrong · Ìmọ̀</title>
        <main style={{ maxWidth: 480, textAlign: 'center' }}>
          <h1 style={{ fontSize: 28 }}>Something went wrong</h1>
          <p>Ìmọ̀ couldn’t load. Your saved progress is safe in this browser.</p>
          {error.digest && <p style={{ fontFamily: 'monospace', fontSize: 12 }}>Reference: {error.digest}</p>}
          <button type="button" onClick={() => retry()} style={{ marginTop: 16, padding: '10px 18px', fontSize: 16, borderRadius: 10, cursor: 'pointer' }}>
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
