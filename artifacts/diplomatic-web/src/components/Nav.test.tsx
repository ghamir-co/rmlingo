import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Nav from './Nav'
import { I18nProvider } from '@/i18n'

function renderNav() {
  return render(
    <I18nProvider>
      <Nav />
    </I18nProvider>,
  )
}

describe('Nav bilingual toggle', () => {
  const originalLang = document.documentElement.lang
  const originalDir = document.documentElement.dir

  beforeEach(() => {
    localStorage.clear()
    // The site defaults to Arabic (RTL) for the MENA market.
    document.documentElement.lang = 'ar'
    document.documentElement.dir = 'rtl'
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.lang = originalLang
    document.documentElement.dir = originalDir
    vi.restoreAllMocks()
  })

  it('defaults to Arabic (rtl), switches text and direction to English, and persists', async () => {
    const user = userEvent.setup()
    renderNav()

    // Default: Arabic, RTL, Arabic nav labels.
    expect(document.documentElement.dir).toBe('rtl')
    expect(screen.getByTestId('button-toggle-lang')).toHaveTextContent('EN')
    expect(screen.getByTestId('link-nav-services')).toHaveTextContent('خدماتنا')

    await user.click(screen.getByTestId('button-toggle-lang'))

    expect(document.documentElement.lang).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
    expect(localStorage.getItem('rmlingo-lang')).toBe('en')
    expect(screen.getByTestId('button-toggle-lang')).toHaveTextContent('عربي')
    expect(screen.getByTestId('link-nav-services')).toHaveTextContent('Services')

    // Toggling back returns to Arabic / RTL.
    await user.click(screen.getByTestId('button-toggle-lang'))
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(localStorage.getItem('rmlingo-lang')).toBe('ar')
    expect(screen.getByTestId('link-nav-services')).toHaveTextContent('خدماتنا')
  })

  it('restores a saved English preference on mount', () => {
    // main.tsx applies the saved lang to <html> before React mounts; the
    // provider reads that attribute. Mirror the real app flow here.
    localStorage.setItem('rmlingo-lang', 'en')
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    renderNav()

    expect(document.documentElement.dir).toBe('ltr')
    expect(screen.getByTestId('button-toggle-lang')).toHaveTextContent('عربي')
    expect(screen.getByTestId('link-nav-services')).toHaveTextContent('Services')
  })

  it('degrades gracefully when localStorage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError: storage disabled')
    })
    const user = userEvent.setup()
    renderNav()

    await user.click(screen.getByTestId('button-toggle-lang'))

    // Direction still flips even though persistence failed.
    expect(document.documentElement.dir).toBe('ltr')
  })
})
