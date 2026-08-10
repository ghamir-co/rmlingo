import { Link } from 'wouter'
import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { ARTICLES, asset } from '@/content/insights'
import { useI18n, type ArticleCopy } from '@/i18n'

export default function InsightsPage() {
  const { lang, dict } = useI18n()
  const t = dict.insightsPage
  const isAr = lang === 'ar'
  const headingFontItalic = isAr ? 'font-sans font-bold' : 'font-serif italic'

  return (
    <div className="relative">
      {/* Page header — deep emerald */}
      <section className="relative min-h-[60dvh] w-full overflow-hidden">
        <div className="hero-deep absolute inset-0" aria-hidden="true" />
        <div
          className="geometric-pattern pointer-events-none absolute inset-0 z-0 opacity-40"
          aria-hidden="true"
        />
        <ScriptBackground />
        <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-[1400px] flex-col justify-center px-6 py-24 md:px-12">
          <div className="text-[11px] uppercase tracking-[0.2em] text-gold-bright">
            {t.label}
          </div>
          <div className="mt-3 h-px w-[80px] bg-gold-bright/80" />
          <h1 className="mt-8 max-w-[900px] font-serif text-[40px] leading-[1.08] text-hero-foreground md:text-[64px]">
            {t.title}
          </h1>
          <p className="mt-8 max-w-[620px] font-serif text-[18px] leading-relaxed text-hero-foreground/75 md:text-[20px]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Insights */}
      <section className="relative bg-muted/20 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {t.publishedLabel}
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {ARTICLES.map((post, i) => {
              const copy = dict.articles[
                post.slug as keyof typeof dict.articles
              ] as ArticleCopy
              return (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="service-card group flex h-full flex-col"
                    data-testid={`link-article-${post.slug}`}
                  >
                    <img
                      src={asset(post.image)}
                      alt={copy.imageAlt}
                      loading="lazy"
                      className="aspect-[16/9] w-full rounded-t-[1rem] object-cover"
                    />
                    <div className="flex flex-1 flex-col p-8">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                        {copy.category}
                      </span>
                      <h3
                        className={`mt-5 text-[21px] leading-tight text-foreground md:text-[24px] ${headingFontItalic}`}
                      >
                        {copy.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                        {copy.excerpt}
                      </p>
                      <span className="di-underline mt-8 inline-block self-start text-[12px] uppercase tracking-[0.18em] text-foreground">
                        {t.readMore}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
