import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'

// RTL readiness: restore the visitor's saved language/direction before the
// first paint so an Arabic build can be dropped in with no layout work.
const savedLang = (() => {
  try {
    return localStorage.getItem('rmlingo-lang')
  } catch {
    return null
  }
})()
const lang = savedLang === 'ar' ? 'ar' : 'en'
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
