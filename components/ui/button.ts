import { cn } from '@/lib/cn'

/*
  Button styles as a function rather than a component, so the SAME look can
  go on a <button>, a <Link> or an <a> without wrapper components.
  Record<Variant, string> means every variant must have a style.
*/
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-brand-ink hover:bg-brand-hover shadow-card',
  secondary: 'border border-line-strong bg-raised text-ink hover:border-brand hover:text-brand',
  ghost: 'text-muted hover:bg-sunken hover:text-ink',
  accent: 'bg-accent text-white hover:opacity-90 shadow-card dark:text-paper',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-sm gap-1.5',
  md: 'min-h-11 px-4 text-[0.95rem] gap-2',
  lg: 'min-h-12 px-6 text-base gap-2',
}

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center rounded-control font-semibold transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}
