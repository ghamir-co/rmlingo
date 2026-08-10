import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Nav from './Nav'

describe('Nav RTL language toggle', () => {
  const originalLang = document.documentElement.lang
  const originalDir = document.documentElement.dir

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.lang = originalLang
    document.documentElement.dir = originalDir
    vi.restoreAllMocks()
  })

  it('switches the document to Arabic (rtl) and persists the choice', async () => {
    const user = userEvent.setup()
    render(<Nav />)

    const toggle = screen.getByTestId('button-toggle-lang')
    expect(toggle).toHaveTextContent('عربي')
    expect(document.documentElement.dir).toBe('ltr')

    await user.click(toggle)

    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(localStorage.getItem('rmlingo-lang')).toBe('ar')
    expect(screen.getByTestId('button-toggle-lang')).toHaveTextContent('EN')

    // Toggling back returns to English / LTR.
    await user.click(screen.getByTestId('button-toggle-lang'))
    expect(document.documentElement.lang).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
    expect(localStorage.getItem('rmlingo-lang')).toBe('en')
  })

  it('restores the saved Arabic direction on mount', () => {
    // main.tsx applies the saved lang to <html> before React mounts; the Nav
    // reads that attribute. Mirror the real app flow here.
    localStorage.setItem('rmlingo-lang', 'ar')
    document.documentElement.lang = 'ar'
    document.documentElement.dir = 'rtl'
    render(<Nav />)

    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(screen.getByTestId('button-toggle-lang')).toHaveTextContent('EN')
  })

  it('degrades gracefully when localStorage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError: storage disabled')
    })
    const user = userEvent.setup()
    render(<Nav />)

    await user.click(screen.getByTestId('button-toggle-lang'))

    // Direction still flips even though persistence failed.
    expect(document.documentElement.dir).toBe('rtl')
  })
})
