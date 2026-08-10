/**
 * Editorial metadata for the Insights section.
 *
 * Copy (titles, excerpts, categories, and full article bodies) is localized and
 * lives in src/i18n/en.json and src/i18n/ar.json, keyed by the same slugs.
 * This file only holds structure: slugs, dates, and imagery.
 */

export type ArticleMeta = {
  slug: string
  date: string
  dateISO: string
  image: string
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: 'benefits-of-real-time-interpretation',
    date: 'February 3, 2025',
    dateISO: '2025-02-03',
    image: 'media/insights/real-time-interpretation.jpg',
  },
  {
    slug: 'choosing-a-subtitling-and-dubbing-provider',
    date: 'February 3, 2025',
    dateISO: '2025-02-03',
    image: 'media/insights/subtitling-and-dubbing.jpg',
  },
  {
    slug: 'professional-translation-in-global-communication',
    date: 'February 3, 2025',
    dateISO: '2025-02-03',
    image: 'media/insights/professional-translation.jpg',
  },
]

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

/** Resolve a public asset path against the artifact base path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`
}
