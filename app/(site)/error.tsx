'use client'

import { ErrorPanel, type ErrorProps } from '@/components/states/error-panel'

// Catches errors in any (site) page. The header and footer (in the layout
// above this boundary) stay on screen.
export default function SiteError(props: ErrorProps) {
  return <ErrorPanel {...props} />
}
