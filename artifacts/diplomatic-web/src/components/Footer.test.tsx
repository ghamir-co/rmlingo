import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Footer from '../components/Footer'
import { I18nProvider } from '@/i18n'

describe('Footer', () => {
  it('renders the wordmark and copyright (Arabic default)', () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    )
    expect(screen.getAllByText(/RMLingo/).length).toBeGreaterThan(0)
    expect(screen.getByText(/تأسست عام 2003/)).toBeInTheDocument()
  })

  it('renders contact details', () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    )
    expect(screen.getByText(/619-752-5604/)).toBeInTheDocument()
    expect(screen.getByText(/info@rmlingo.com/)).toBeInTheDocument()
  })
})
