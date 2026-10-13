'use client'

import { ErrorPanel, type ErrorProps } from '@/components/states/error-panel'

// Errors inside a lesson keep the player's top bar and outline on screen.
export default function LessonError(props: ErrorProps) {
  return <ErrorPanel {...props} title="This lesson couldn’t load" />
}
