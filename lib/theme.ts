// Shared by the inline <head> script (app/layout.tsx) and the ThemeToggle.

export const THEME_STORAGE_KEY = 'imo-theme'

export type ThemeChoice = 'light' | 'dark'

/**
 * Runs in <head> before the page is painted, so a saved dark theme never
 * flashes light first. Plain ES5 in a string because it runs before React or
 * any bundle has loaded.
 *
 * - A saved "light"/"dark" choice is written to data-theme on <html>.
 * - With no saved choice there is no attribute, and `color-scheme: light dark`
 *   in globals.css follows the OS with no script at all.
 * - If localStorage is blocked, the catch leaves the OS theme in place.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`
