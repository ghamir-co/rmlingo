import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Footer from '../components/Footer'

describe('Footer', () => {
  it('renders the wordmark and copyright', () => {
    render(<Footer />)
    expect(
      screen.getAllByText(/RMLingo/).length,
    ).toBeGreaterThan(0)
    expect(screen.getByText(/Founded 2003/)).toBeInTheDocument()
  })

  it('renders contact details', () => {
    render(<Footer />)
    expect(screen.getByText(/619-752-5604/)).toBeInTheDocument()
    expect(
      screen.getByText(/info@rmlingo.com/),
    ).toBeInTheDocument()
  })
})
