import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import Reveal from '@/components/Reveal'
import NotFound from '@/pages/not-found'
import { ARTICLES, asset, getArticle } from '@/content/insights'
import { useI18n, type ArticleCopy } from '@/i18n'

export default function ArticlePage() {
  const { lang, dict } = useI18n()
  const t = dict.articlePage
  const isAr = lang === 'ar'
  const headingFontItalic = isAr ? 'font-sans font-bold' : 'font-serif italic'

  const [, params] = useRoute('/insights/:slug')
  const slug = params?.slug ?? ''
  const meta = getArticle(slug)
  const copy = (
    slug ? dict.articles[slug as keyof typeof dict.articles] : undefined
  ) as ArticleCopy | undefined

  useEffect(() => {
    if (!copy) return
    const previousTitle = document.title
    document.title = `${copy.title} | RMLingo`
    return () => {
      document.title = previousTitle
    }
  }, [copy])

  if (!meta || !copy) return <NotFound />

  const others = ARTICLES.filter((a) => a.slug !== meta.slug)

  return (
    <article className="relative">
      {/* Hero image + title */}
      <header className="px-6 pt-16 md:px-12">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <Link
              href="/insights"
              className="di-underline text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              data-testid="link-back-to-insights"
            >
              {t.back}
            </Link>

            <div className="mt-10 text-[10px] uppercase tracking-[0.2em] text-accent">
              {copy.category}
            </div>
            <h1
              className={`mt-5 text-[32px] leading-[1.14] text-foreground md:text-[50px] ${headingFontItalic}`}
              data-testid="text-article-title"
            >
              {copy.title}
            </h1>
            <div className="mt-6 h-px w-[80px] bg-accent" />
            <time
              dateTime={meta.dateISO}
              className="mt-6 block text-[13px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {copy.date}
            </time>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={asset(meta.image)}
              alt={copy.imageAlt}
              width={1700}
              height={700}
              loading="eager"
              className="mt-12 aspect-[17/7] w-full object-cover"
            />
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[760px]">
          {copy.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.05}>
              <section className="mt-14 first:mt-0">
                <h2 className={`font-serif text-[24px] leading-tight text-foreground md:text-[30px] ${headingFontItalic}`}>
                  {section.heading}
                </h2>
                <p className="mt-5 text-[17px] leading-[1.75] text-muted-foreground md:text-[18px]">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}

          {/* Inline CTA */}
          <Reveal>
            <div className="mt-20 border-s border-accent ps-8">
              <p className={`font-serif text-[20px] leading-relaxed text-foreground md:text-[24px] ${headingFontItalic}`}>
                {t.ctaTitle}
              </p>
              <Link
                href="/contact"
                className="di-underline mt-6 inline-block text-[13px] uppercase tracking-[0.18em] text-foreground"
                data-testid="link-article-contact"
              >
                {t.ctaLink}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Further reading */}
      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {t.continueReading}
          </div>
          <div className="mt-3 h-px w-[60px] bg-accent" />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {others.map((other) => {
              const otherCopy = dict.articles[
                other.slug as keyof typeof dict.articles
              ] as ArticleCopy
              return (
                <Link
                  key={other.slug}
                  href={`/insights/${other.slug}`}
                  className="service-card group block p-8 md:p-10"
                  data-testid={`link-related-${other.slug}`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                    {otherCopy.category}
                  </span>
                  <h3 className={`mt-5 text-[20px] leading-tight text-foreground md:text-[23px] ${headingFontItalic}`}>
                    {otherCopy.title}
                  </h3>
                  <span className="di-underline mt-8 inline-block text-[12px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground">
                    {t.readArticle}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </article>
  )
}
