import { Icon, type IconName } from '@/components/ui/icon'
import { assertNever } from '@/lib/guards'
import type { LessonKind } from '@/lib/schema/lesson'

/** One more exhaustive switch: a new lesson kind needs an icon before it compiles. */
function iconFor(kind: LessonKind): IconName {
  switch (kind) {
    case 'video':
      return 'play'
    case 'article':
      return 'read'
    case 'quiz':
      return 'quiz'
    default:
      return assertNever(kind, 'Unknown lesson kind')
  }
}

export function LessonKindIcon({ kind, className }: { kind: LessonKind; className?: string }) {
  return <Icon name={iconFor(kind)} className={className} />
}
