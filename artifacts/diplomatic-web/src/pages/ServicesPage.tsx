import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { Link } from 'wouter'
import { useI18n } from '@/i18n'

export default function ServicesPage() {
  const { lang, dict } = useI18n()
  const t = dict.servicesPage
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

      {/* Services — elevated cards */}
      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {t.services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <div className="service-card h-full p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="text-[12px] uppercase tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="star-eight shrink-0" aria-hidden="true" />
                  </div>
                  <h3
                    className={`mt-8 text-[24px] leading-tight text-foreground md:text-[30px] ${headingFontItalic}`}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Language families */}
      <section id="languages" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {t.languagesLabel}
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
            <h2
              className={`mt-8 text-[30px] leading-tight text-foreground md:text-[42px] ${headingFontItalic}`}
            >
              {t.languagesTitle}
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {t.families.map((f) => (
              <Reveal key={f.family} className="bg-background p-10">
                <h3 className="font-serif text-[22px] text-foreground md:text-[26px]">
                  {f.family}
                </h3>
                <div className="mt-3 h-px w-[40px] bg-accent" />
                <ul className="mt-6 space-y-2.5">
                  {f.languages.map((language) => (
                    <li key={language} className="text-[15px] text-muted-foreground">
                      {language}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="font-serif text-[24px] italic text-foreground md:text-[32px]">
              {t.ctaLine}
            </p>
            <Link
              href="/contact"
              className="di-underline mt-6 inline-block text-[14px] uppercase tracking-[0.18em] text-foreground"
              data-testid="link-services-contact"
            >
              {t.ctaLink}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
