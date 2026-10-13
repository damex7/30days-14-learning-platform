import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/ui/icon'

export function EmptyState({ icon, title, children, action }: { icon: IconName; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line-strong bg-raised/60 px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-pill bg-sunken text-muted">
        <Icon name={icon} className="size-6" />
      </span>
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      {children && <div className="mt-2 max-w-md text-muted">{children}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
