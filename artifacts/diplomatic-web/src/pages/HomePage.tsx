import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { motion } from 'framer-motion'
import { Link } from 'wouter'

const SERVICES = [
  {
    num: '01',
    name: 'Conference Interpretation',
    desc: 'Simultaneous, consecutive, and sign-language interpretation for diplomatic summits and bilateral negotiations, delivered remotely or on-site.',
  },
  {
    num: '02',
    name: 'Document Translation',
    desc: 'Certified translation of treaties, legal instruments, and institutional communications bridging precise cultural nuances.',
  },
  {
    num: '03',
    name: 'Media Accessibility',
    desc: 'Verbatim transcription, captioning, subtitling, dubbing, and voiceover with strict confidentiality protocols.',
  },
  {
    num: '04',
    name: 'Consultation & Localization',
    desc: 'Strategic language advisory, cultural relocation support, and seamless adaptation for international audiences.',
  },
]

const TRUSTED = [
  {
    name: 'United Nations Development Programme',
    logo: 'media/credibility/undp.png',
    alt: 'United Nations Development Programme logo',
    width: 512,
    height: 270,
  },
  {
    name: 'The World Bank',
    logo: 'media/credibility/world-bank.png',
    alt: 'The World Bank logo',
    width: 768,
    height: 348,
  },
  {
    name: 'Red Cross',
    logo: 'media/credibility/red-cross.png',
    alt: 'Red Cross logo',
    width: 300,
    height: 129,
  },
  {
    name: 'USAID / Tetra Tech',
    logo: 'media/credibility/tetra-tech-usaid.png',
    alt: 'Tetra Tech and USAID logos',
    width: 414,
    height: 122,
  },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden px-6 md:px-12">
        <ScriptBackground />
        <div
          className="geometric-pattern pointer-events-none absolute inset-0 z-0 opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center py-24">
          {/* Headline — staggered line entrance */}
          <h1 className="font-serif text-foreground">
            <motion.span
              className="block text-[58px] leading-[1.02] sm:text-[72px] md:text-[96px] md:font-normal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              The Language
            </motion.span>
            <motion.span
              className="block text-[58px] leading-[1.02] italic sm:text-[72px] md:ms-12 md:text-[96px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              of Diplomacy,
            </motion.span>
            <motion.span
              className="mt-2 block text-[44px] leading-[1.05] font-light sm:text-[54px] md:ms-24 md:text-[72px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Precisely Rendered.
            </motion.span>
          </h1>

          {/* Gold rule */}
          <motion.div
            className="mt-10 h-px w-[200px] bg-accent"
            initial={{ opacity: 0, scaleX: 0, transformOrigin: 'left' }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          />

          {/* Descriptor */}
          <motion.p
            className="mt-6 max-w-[620px] font-serif text-[18px] italic leading-relaxed text-muted-foreground md:text-[20px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Since 2003, providing exact linguistic execution across borders.
            Specialized in high-stakes Arabic-English pairing and multilingual
            global delivery.
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
              className="di-underline text-[14px] uppercase tracking-[0.18em] text-foreground"
              data-testid="link-hero-services"
            >
              Explore Our Services →
            </Link>
            <Link
              href="/contact"
              className="di-underline text-[14px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              data-testid="link-hero-contact"
            >
              Request Consultation →
            </Link>
          </motion.div>
        </div>

        {/* Vertical rotated office strip */}
        <div className="absolute end-5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <span
            className="block text-[10px] uppercase text-muted-foreground"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '0.25em',
              fontVariant: 'small-caps',
            }}
          >
            Serving Global Institutions Worldwide
          </span>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2
              className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
              data-testid="label-what-we-do"
            >
              WHAT WE DO
            </h2>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08} x={-30}>
                <div className="relative border-b border-border py-12">
                  <span
                    className="pointer-events-none absolute -top-4 start-0 font-serif text-[120px] leading-none text-foreground/[0.07] md:text-[180px]"
                    aria-hidden="true"
                  >
                    {s.num}
                  </span>
                  <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_1.6fr] md:gap-16">
                    <h3 className="font-serif text-[26px] leading-tight text-foreground md:text-[34px]">
                      {s.name}
                    </h3>
                    <p className="max-w-[560px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                      {s.desc}
                    </p>
                  </div>
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
              Trusted by Leading Institutions
            </h2>
            <div className="mt-4 h-px w-[60px] bg-accent" />
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-14 md:grid-cols-4 md:gap-x-16">
            {TRUSTED.map((t, i) => (
              <motion.div
                key={t.name}
                className="flex flex-col items-start gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${t.logo}`}
                  alt={t.alt}
                  width={t.width}
                  height={t.height}
                  loading="lazy"
                  className="h-12 w-auto max-w-full object-contain object-left opacity-75 transition-opacity hover:opacity-100 md:h-14"
                />
                <span className="text-[12px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
