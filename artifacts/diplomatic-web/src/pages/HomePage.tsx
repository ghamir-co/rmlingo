import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { useI18n } from '@/i18n'

const TRUSTED_LOGOS = [
  'media/credibility/undp.png',
  'media/credibility/world-bank.png',
  'media/credibility/red-cross.png',
  'media/credibility/tetra-tech-usaid.png',
]

export default function HomePage() {
  const { lang, dict } = useI18n()
  const t = dict.home
  const isAr = lang === 'ar'
  // Arabic headings render in the premium IBM Plex Sans Arabic stack with a
  // strong modern weight; English keeps the editorial serif voice.
  const headingFont = isAr ? 'font-sans font-bold' : 'font-serif'
  const headingFontItalic = isAr ? 'font-sans font-bold' : 'font-serif italic'

  return (
    <div className="relative">
      {/* HERO — split layout on deep emerald */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <div className="hero-deep absolute inset-0" aria-hidden="true" />
        <div
          className="geometric-pattern pointer-events-none absolute inset-0 z-0 opacity-40"
          aria-hidden="true"
        />
        <ScriptBackground />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center px-6 py-24 md:px-12">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Text column */}
            <div>
              <motion.div
                className="text-[11px] uppercase tracking-[0.22em] text-gold-bright"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                {t.eyebrow}
              </motion.div>

              <h1
                className={`mt-8 text-hero-foreground ${headingFont}`}
              >
                <motion.span
                  className="block text-[52px] leading-[1.06] sm:text-[68px] md:text-[88px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.heroLine1}
                </motion.span>
                <motion.span
                  className={`block text-[52px] leading-[1.06] sm:text-[68px] md:ms-12 md:text-[88px] ${headingFontItalic}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.heroLine2}
                </motion.span>
                <motion.span
                  className="mt-2 block text-[40px] leading-[1.08] font-light sm:text-[50px] md:ms-24 md:text-[68px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.heroLine3}
                </motion.span>
              </h1>

              {/* Gold rule */}
              <motion.div
                className="mt-10 h-px w-[200px] bg-gold-bright/80"
                initial={{ opacity: 0, scaleX: 0, transformOrigin: 'left' }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              />

              {/* Descriptor */}
              <motion.p
                className="mt-6 max-w-[620px] font-serif text-[18px] leading-relaxed text-hero-foreground/75 md:text-[20px]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                {t.heroDesc}
              </motion.p>

              {/* Text links */}
              <motion.div
                className="mt-12 flex flex-col gap-5 sm:flex-row sm:gap-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  href="/services"
                  className="di-underline text-[14px] uppercase tracking-[0.18em] text-hero-foreground"
                  data-testid="link-hero-services"
                >
                  {t.ctaServices}
                </Link>
                <Link
                  href="/contact"
                  className="di-underline text-[14px] uppercase tracking-[0.18em] text-hero-foreground/70 hover:text-hero-foreground"
                  data-testid="link-hero-contact"
                >
                  {t.ctaContact}
                </Link>
              </motion.div>
            </div>

            {/* Ornament column — gold octagram medallion */}
            <motion.div
              className="hidden justify-self-end lg:block"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="octagram" aria-hidden="true">
                <div className="octagram-core">
                  <span className="octagram-word">لغة</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick facts */}
          <motion.div
            className="mt-20 grid grid-cols-1 gap-6 border-t border-hero-foreground/15 pt-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {t.facts.map((fact) => (
              <div
                key={fact}
                className="text-[12px] uppercase tracking-[0.18em] text-hero-foreground/60"
              >
                <span className="me-3 inline-block h-1.5 w-1.5 rotate-45 bg-gold-bright/80" />
                {fact}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Vertical rotated strip */}
        <div className="absolute end-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <span
            className="block text-[10px] uppercase text-hero-foreground/50"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '0.25em',
              fontVariant: 'small-caps',
            }}
          >
            {t.vertical}
          </span>
        </div>
      </section>

      {/* SERVICES — elevated cards */}
      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2
              className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
              data-testid="label-what-we-do"
            >
              {t.whatWeDo}
            </h2>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {t.services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="service-card h-full p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span
                      className="pointer-events-none font-serif text-[64px] leading-none text-foreground/[0.08] md:text-[80px]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="star-eight mt-2 shrink-0" aria-hidden="true" />
                  </div>
                  <h3
                    className={`mt-8 text-[24px] leading-tight text-foreground md:text-[28px] ${headingFontItalic}`}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="font-serif text-[32px] italic text-foreground md:text-[40px]">
              {t.trustedTitle}
            </h2>
            <div className="mt-4 h-px w-[60px] bg-accent" />
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-14 md:grid-cols-4 md:gap-x-16">
            {t.trusted.map((trusted, i) => (
              <motion.div
                key={trusted.name}
                className="flex flex-col items-start gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${TRUSTED_LOGOS[i]}`}
                  alt={trusted.alt}
                  loading="lazy"
                  className="h-12 w-auto max-w-full object-contain object-left opacity-75 transition-opacity hover:opacity-100 md:h-14 rtl:object-right"
                />
                <span className="text-[12px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">
                  {trusted.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
