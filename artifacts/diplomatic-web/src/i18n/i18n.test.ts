import { describe, expect, it } from 'vitest'

import en from './en.json'
import ar from './ar.json'

/** Flatten a dictionary into `path -> value` leaves (arrays become `[i]`). */
function leaves(obj: unknown, prefix = ''): [string, unknown][] {
  const out: [string, unknown][] = []
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => out.push(...leaves(v, `${prefix}[${i}]`)))
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      out.push(...leaves(v, prefix ? `${prefix}.${k}` : k))
    }
  } else {
    out.push([prefix, obj])
  }
  return out
}

describe('i18n dictionaries', () => {
  it('ar.json mirrors en.json key-for-key (including array lengths)', () => {
    const enLeaves = leaves(en)
    const arLeaves = leaves(ar)
    expect(arLeaves.map(([k]) => k).sort()).toEqual(
      enLeaves.map(([k]) => k).sort(),
    )
  })

  it('every Arabic value is non-empty and the file is real Arabic', () => {
    const arLeaves = leaves(ar)
    for (const [key, value] of arLeaves) {
      expect(String(value).trim().length, `ar.${key} is empty`).toBeGreaterThan(
        0,
      )
    }
    // Sanity: the Arabic dictionary must actually contain Arabic script.
    const arabicChars = arLeaves
      .map(([, v]) => String(v))
      .join('')
      .match(/[\u0600-\u06FF]/g)
    expect(arabicChars ? arabicChars.length : 0).toBeGreaterThan(500)
  })

  it('localizes article copy for every slug with sections', () => {
    expect(Object.keys(en.articles).length).toBe(3)
    expect(Object.keys(ar.articles)).toEqual(Object.keys(en.articles))
    for (const slug of Object.keys(en.articles)) {
      expect(ar.articles[slug].sections.length).toBe(
        en.articles[slug].sections.length,
      )
    }
  })
})
