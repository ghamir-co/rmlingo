import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'

// Language/direction: the site defaults to Arabic (RTL) for the MENA market.
// A returning visitor's saved choice is restored before the first paint so
// the correct direction renders with no flash of the wrong layout.
const savedLang = (() => {
  try {
    return localStorage.getItem('rmlingo-lang')
  } catch {
    return null
  }
})()
const lang = savedLang === 'en' ? 'en' : 'ar'
document.documentElement.lang = lang
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

createRoot(document.getElementById('root')!).render(<App />)

// Offline caching (production only).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => {
        /* service worker unsupported or unavailable */
      })
  })
}
