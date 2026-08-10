import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

export default function AboutPage() {
  const { lang, dict } = useI18n()
  const t = dict.aboutPage
  const isAr = lang === 'ar'
  const headingFont = isAr ? 'font-sans font-bold' : 'font-serif'
  const headingFontItalic = isAr ? 'font-sans font-bold' : 'font-serif italic'

  return (
    <div className="relative">
      {/* Hero quote — deep emerald */}
      <section className="relative min-h-[60dvh] w-full overflow-hidden">
        <div className="hero-deep absolute inset-0" aria-hidden="true" />
        <div
          className="geometric-pattern pointer-events-none absolute inset-0 z-0 opacity-40"
          aria-hidden="true"
        />
        <ScriptBackground />
        <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-[1000px] flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-gold-bright">
              {t.label}
            </div>
            <div className="mx-auto mt-3 h-px w-[80px] bg-gold-bright/80" />
            <blockquote className="mt-10 font-serif text-[30px] leading-[1.25] text-hero-foreground md:text-[46px]">
              {t.quote}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Founding narrative */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {t.founded}
            </div>
            <div className="mt-3 h-px w-[60px] bg-accent" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 font-serif text-[19px] leading-[1.7] text-foreground md:text-[21px]">
              {t.narrative1}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 font-serif text-[19px] leading-[1.7] text-muted-foreground md:text-[21px]">
              {t.narrative2}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-[1100px]">
          <Reveal delay={0.2}>
            <figure>
              <img
                src={`${import.meta.env.BASE_URL}media/field/language-services-overview.png`}
                alt={t.figureAlt}
                width={1024}
                height={669}
                loading="lazy"
                className="w-full object-cover"
              />
              <figcaption className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                {t.figureCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Values — elevated cards */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {t.valuesLabel}
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.values.map((v, i) => (
              <Reveal key={v.label} delay={i * 0.08}>
                <div className="service-card h-full p-8 md:p-10">
                  <span className="star-eight" aria-hidden="true" />
                  <h3
                    className={`mt-8 text-[26px] leading-tight text-foreground md:text-[30px] ${headingFontItalic}`}
                  >
                    {v.label}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {t.leadershipLabel}
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16">
            <Reveal>
              <div className="grid grid-cols-1 gap-3 border-b border-border py-10 md:grid-cols-[1fr_1fr_2fr] md:gap-12">
                <h3 className={`font-serif text-[22px] text-foreground md:text-[26px] ${headingFont}`}>
                  {t.leader.name}
                </h3>
                <span className="text-[12px] uppercase tracking-[0.15em] text-accent md:mt-2">
                  {t.leader.title}
                </span>
                <p className="max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">
                  {t.leader.bio}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
