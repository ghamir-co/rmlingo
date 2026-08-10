import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn', () => {
  it('joins simple class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('ignores falsy values', () => {
    expect(cn('a', false, undefined, null, 0, 'b')).toBe('a b')
  })

  it('resolves Tailwind conflicts with tailwind-merge', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-600')).toBe('text-blue-600')
  })

  it('supports conditional object syntax', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo')
  })
})
