import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import Reveal from '@/components/Reveal'
import NotFound from '@/pages/not-found'
import { ARTICLES, asset, getArticle } from '@/content/insights'

export default function ArticlePage() {
  const [, params] = useRoute('/insights/:slug')
  const slug = params?.slug ?? ''
  const article = getArticle(slug)

  useEffect(() => {
    if (!article) return
    const previousTitle = document.title
    document.title = `${article.title} | RMLingo`
    return () => {
      document.title = previousTitle
    }
  }, [article])

  if (!article) return <NotFound />

  const others = ARTICLES.filter((a) => a.slug !== article.slug)

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
              ← Back to Insights
            </Link>

            <div className="mt-10 text-[10px] uppercase tracking-[0.2em] text-accent">
              {article.category}
            </div>
            <h1
              className="mt-5 font-serif text-[34px] leading-[1.12] text-foreground md:text-[52px]"
              data-testid="text-article-title"
            >
              {article.title}
            </h1>
            <div className="mt-6 h-px w-[80px] bg-accent" />
            <time
              dateTime={article.dateISO}
              className="mt-6 block text-[13px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {article.date}
            </time>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={asset(article.image)}
              alt={article.imageAlt}
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
          {article.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.05}>
              <section className="mt-14 first:mt-0">
                <h2 className="font-serif text-[24px] italic leading-tight text-foreground md:text-[30px]">
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
              <p className="font-serif text-[20px] italic leading-relaxed text-foreground md:text-[24px]">
                Planning an engagement that crosses languages?
              </p>
              <Link
                href="/contact"
                className="di-underline mt-6 inline-block text-[13px] uppercase tracking-[0.18em] text-foreground"
                data-testid="link-article-contact"
              >
                Begin a conversation →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Further reading */}
      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            CONTINUE READING
          </div>
          <div className="mt-3 h-px w-[60px] bg-accent" />

          <div className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/insights/${other.slug}`}
                className="group block bg-background p-10 transition-colors hover:bg-muted/20"
                data-testid={`link-related-${other.slug}`}
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                  {other.category}
                </span>
                <h3 className="mt-5 font-serif text-[21px] leading-tight text-foreground md:text-[24px]">
                  {other.title}
                </h3>
                <span className="di-underline mt-8 inline-block text-[12px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
