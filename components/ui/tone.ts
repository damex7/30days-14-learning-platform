import type { Tone } from '@/lib/constants'

/*
  Category tones → Tailwind classes. Written out in full (not built with
  string templates like `bg-${tone}-soft`) because Tailwind finds classes by
  scanning the source for complete names.
  Record<Tone, ...>: adding a tone to TONES without styling it here is a
  compile error.
*/
export const TONE_CLASSES: Record<Tone, { soft: string; text: string; bar: string }> = {
  indigo: { soft: 'bg-brand-soft', text: 'text-brand', bar: 'bg-brand' },
  kola: { soft: 'bg-accent-soft', text: 'text-accent', bar: 'bg-accent' },
  leaf: { soft: 'bg-leaf-soft', text: 'text-leaf', bar: 'bg-leaf' },
  sun: { soft: 'bg-sun-soft', text: 'text-sun', bar: 'bg-sun' },
  plum: { soft: 'bg-plum-soft', text: 'text-plum', bar: 'bg-plum' },
}
