import { Link } from 'wouter'
import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { ARTICLES, asset } from '@/content/insights'

const EXPERIENCE = [
  {
    title: 'United Nations Development Programme',
    summary:
      'A credibility anchor for the multilingual meetings, field-facing communication, and technical coordination international development work demands.',
    source: 'United Nations Development Programme (UNDP)',
    role: 'International development',
    logo: 'media/credibility/undp.png',
    logoAlt: 'United Nations Development Programme logo',
  },
  {
    title: 'The World Bank',
    summary:
      'A reference point for exact, context-aware language work across global financial and institutional conversations.',
    source: 'The World Bank',
    role: 'Global finance',
    logo: 'media/credibility/world-bank.png',
    logoAlt: 'The World Bank logo',
  },
  {
    title: 'Red Cross',
    summary:
      'A standard for language support where clarity, cultural sensitivity, and responsiveness matter in humanitarian settings.',
    source: 'Red Cross',
    role: 'Humanitarian response',
    logo: 'media/credibility/red-cross.png',
    logoAlt: 'Red Cross logo',
  },
  {
    title: 'USAID & Tetra Tech',
    summary:
      'Experience that reflects the needs of multilingual programme delivery, practical localization, and diverse regional audiences.',
    source: 'USAID / Tetra Tech',
    role: 'International programmes',
    logo: 'media/credibility/tetra-tech-usaid.png',
    logoAlt: 'Tetra Tech and USAID logos',
  },
]

export default function InsightsPage() {
  return (
    <div className="relative">
      {/* Page header */}
      <section className="relative min-h-[60dvh] w-full overflow-hidden px-6 md:px-12">
        <ScriptBackground />
        <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-[1400px] flex-col justify-center py-24">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            INSIGHTS &amp; EXPERIENCE
          </div>
          <div className="mt-3 h-px w-[80px] bg-accent" />
          <h1 className="mt-8 max-w-[900px] font-serif text-[44px] leading-[1.05] text-foreground md:text-[68px]">
            Perspective born of practice. Trust earned through precision.
          </h1>
          <p className="mt-8 max-w-[600px] font-serif text-[18px] italic text-muted-foreground md:text-[20px]">
            Explore the work that shapes our standards and our reflections on
            the evolving landscape of global language services.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              EXPERIENCE
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
            <h2 className="mt-8 font-serif text-[32px] italic text-foreground md:text-[44px]">
              Built for the work that crosses borders.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
            {EXPERIENCE.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1}>
                <div className="relative border-t border-accent pt-8">
                  <img
                    src={asset(t.logo)}
                    alt={t.logoAlt}
                    loading="lazy"
                    className="h-10 w-auto max-w-[180px] object-contain object-left opacity-80 md:h-12"
                  />
                  <h3 className="mt-6 font-serif text-[22px] leading-tight text-foreground md:text-[26px]">
                    {t.title}
                  </h3>
                  <p className="mt-5 font-serif text-[19px] leading-relaxed text-foreground md:text-[21px]">
                    {t.summary}
                  </p>
                  <div className="mt-8">
                    <div className="font-sans text-[14px] font-medium tracking-wide text-foreground">
                      {t.source}
                    </div>
                    <div className="mt-1 text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="relative bg-muted/20 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              PUBLISHED INSIGHTS
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {ARTICLES.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col bg-background transition-colors hover:bg-muted/10"
                  data-testid={`link-article-${post.slug}`}
                >
                  <img
                    src={asset(post.image)}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-10">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                      {post.category}
                    </span>
                    <h3 className="mt-6 font-serif text-[22px] leading-tight text-foreground md:text-[26px]">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="di-underline mt-10 inline-block self-start text-[12px] uppercase tracking-[0.18em] text-foreground">
                      Read Article →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
