// CLIENT COMPONENT: it responds to clicks, reads the OS colour preference and
// writes localStorage. All three only exist in the browser.
'use client'

import { useSyncExternalStore } from 'react'
import { Icon } from '@/components/ui/icon'
import { THEME_STORAGE_KEY, type ThemeChoice } from '@/lib/theme'

const CHANGE_EVENT = 'imo-theme-change'
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

/** The theme actually showing: a saved choice, or else the OS setting. */
function currentTheme(): ThemeChoice {
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  return darkQuery().matches ? 'dark' : 'light'
}

function subscribe(onChange: () => void) {
  const media = darkQuery()
  media.addEventListener('change', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    media.removeEventListener('change', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function choose(theme: ThemeChoice) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage blocked (some private modes): still switch for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/**
 * One button that switches between light and dark. Until it is used the site
 * follows the OS. The server can't know the theme, so it renders a neutral
 * button (null snapshot) and the browser fills in the real state after
 * hydration. Colours are already right by then: the <head> script set them.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore<ThemeChoice | null>(subscribe, currentTheme, () => null)
  const next: ThemeChoice = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => choose(next)}
      aria-label={theme ? `Switch to ${next} theme` : 'Switch colour theme'}
      title={theme ? `Switch to ${next} theme` : 'Switch colour theme'}
      className="grid size-10 place-items-center rounded-pill text-muted transition-colors hover:bg-sunken hover:text-ink"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="size-5" />
    </button>
  )
}
