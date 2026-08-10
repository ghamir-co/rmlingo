import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────────────────
   RMLingo — editorial homepage
   Palette: ivory #FAF7F2 · navy #0D1B2A · gold #B8963E · warm gray #6B6560
   Type:    Cormorant Garamond (display) · Inter (UI) · Amiri (Arabic script)
   ───────────────────────────────────────────────────────────────────────── */

const NAVY = '#0D1B2A'
const IVORY = '#FAF7F2'
const GOLD = '#B8963E'
const WARM_GRAY = '#6B6560'

const arabicPhrases: {
  text: string
  size: number
  top: string
  left: string
  opacity: number
  rotate?: number
}[] = [
  { text: 'الترجمة', size: 260, top: '-2rem', left: '-3rem', opacity: 0.05 },
  {
    text: 'الدبلوماسية',
    size: 180,
    top: '22rem',
    left: '30rem',
    opacity: 0.04,
    rotate: 4,
  },
  {
    text: 'اللغة',
    size: 220,
    top: '34rem',
    left: '-2rem',
    opacity: 0.05,
    rotate: -3,
  },
  {
    text: 'التفاهم',
    size: 140,
    top: '8rem',
    left: '48rem',
    opacity: 0.04,
    rotate: 5,
  },
  { text: 'السلام', size: 300, top: '28rem', left: '24rem', opacity: 0.03 },
]

const englishPhrases: {
  text: string
  size: number
  top: string
  left: string
  opacity: number
  rotate?: number
}[] = [
  {
    text: 'Diplomacy',
    size: 120,
    top: '4rem',
    left: '34rem',
    opacity: 0.06,
    rotate: -2,
  },
  {
    text: 'Interpretation',
    size: 90,
    top: '30rem',
    left: '6rem',
    opacity: 0.07,
    rotate: 3,
  },
  {
    text: 'Understanding',
    size: 70,
    top: '18rem',
    left: '50rem',
    opacity: 0.05,
    rotate: -4,
  },
  {
    text: 'Translation',
    size: 150,
    top: '36rem',
    left: '40rem',
    opacity: 0.04,
    rotate: 2,
  },
]

function ScriptBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ color: NAVY }}
    >
      {/* Arabic layer */}
      {arabicPhrases.map((p, i) => (
        <span
          key={`ar-${i}`}
          className="absolute whitespace-nowrap select-none"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            fontFamily: "'Amiri', serif",
            opacity: p.opacity,
            transform: p.rotate ? `rotate(${p.rotate}deg)` : undefined,
            lineHeight: 1,
          }}
        >
          {p.text}
        </span>
      ))}
      {/* English layer */}
      {englishPhrases.map((p, i) => (
        <span
          key={`en-${i}`}
          className="absolute whitespace-nowrap select-none"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            opacity: p.opacity,
            transform: p.rotate ? `rotate(${p.rotate}deg)` : undefined,
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  )
}

const services = [
  {
    num: '01',
    name: 'Conference Interpretation',
    desc: 'Simultaneous and consecutive interpretation for high-stakes diplomatic summits, bilateral talks, and multilateral forums.',
    align: 'left' as const,
  },
  {
    num: '02',
    name: 'Document Translation',
    desc: 'Certified translation of treaties, communiqués, diplomatic notes, and ministerial correspondence across 87 language pairs.',
    align: 'right' as const,
  },
  {
    num: '03',
    name: 'RMLingo Transcription',
    desc: 'Verbatim transcripts of closed-door proceedings with strict chain-of-custody and confidentiality protocols.',
    align: 'left' as const,
  },
  {
    num: '04',
    name: 'Multilingual Consultation',
    desc: 'Cultural and linguistic advisory for missions navigating protocol, register, and cross-cultural nuance.',
    align: 'right' as const,
  },
]

const institutions = [
  {
    name: 'United Nations',
    size: '3.5rem',
    opacity: 1,
    top: '0rem',
    left: '0rem',
    color: NAVY,
  },
  {
    name: 'U.S. Department of State',
    size: '2rem',
    opacity: 0.75,
    top: '3.5rem',
    left: '14rem',
    color: WARM_GRAY,
  },
  {
    name: 'African Union',
    size: '2.6rem',
    opacity: 0.9,
    top: '1rem',
    left: '32rem',
    color: NAVY,
  },
  {
    name: 'International Monetary Fund',
    size: '1.5rem',
    opacity: 0.6,
    top: '7rem',
    left: '4rem',
    color: WARM_GRAY,
  },
  {
    name: 'Embassy of France',
    size: '2.2rem',
    opacity: 0.85,
    top: '6.5rem',
    left: '26rem',
    color: NAVY,
  },
  {
    name: 'UNHCR',
    size: '2.8rem',
    opacity: 0.7,
    top: '11rem',
    left: '1rem',
    color: WARM_GRAY,
  },
  {
    name: 'World Health Organization',
    size: '1.7rem',
    opacity: 0.65,
    top: '12rem',
    left: '22rem',
    color: NAVY,
  },
  {
    name: 'NATO',
    size: '3rem',
    opacity: 1,
    top: '9.5rem',
    left: '40rem',
    color: NAVY,
  },
]

export default function Homepage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: IVORY, color: NAVY }}
    >
      {/* ───────────────────────── Navigation ───────────────────────── */}
      <nav className="relative z-20 mx-auto flex max-w-[1400px] items-end justify-between px-8 pt-10 md:px-16">
        <div>
          <h1
            className="text-[1.05rem] font-medium uppercase leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.18em',
              color: NAVY,
            }}
          >
            RMLingo
          </h1>
          <div className="mt-2 h-px w-28" style={{ backgroundColor: GOLD }} />
        </div>
        <div className="hidden items-baseline gap-8 md:flex">
          {['Services', 'About', 'Languages', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] tracking-wide transition-opacity hover:opacity-60"
              style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
            >
              {link}
            </a>
          ))}
          <span
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
          >
            Est. 2003
          </span>
        </div>
      </nav>

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative mx-auto max-w-[1400px] px-8 md:px-16">
        {/* Script background confined to hero */}
        <div
          className="pointer-events-none absolute inset-0 h-[100dvh] overflow-hidden"
          style={{ color: NAVY }}
        >
          <ScriptBackground />
        </div>

        <div className="relative z-10 flex min-h-[88dvh] flex-col justify-center">
          {/* Right-margin vertical city list */}
          <div
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            style={{ writingMode: 'vertical-rl' }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
            >
              Washington D.C. · New York · Geneva · Nairobi
            </span>
          </div>

          {/* Headline — three lines, three treatments */}
          <h2
            className="font-light leading-[0.92]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span
              className="block text-[clamp(3rem,9vw,8.5rem)]"
              style={{
                WebkitTextStroke: `1px ${NAVY}`,
                color: 'transparent',
                letterSpacing: '0.04em',
              }}
            >
              The Language
            </span>
            <span
              className="block text-[clamp(3rem,9vw,8.5rem)]"
              style={{ color: NAVY, letterSpacing: '0.03em' }}
            >
              of Diplomacy,
            </span>
            <span
              className="block text-[clamp(3rem,9vw,8.5rem)] italic"
              style={{ color: NAVY, letterSpacing: '0.05em', fontWeight: 300 }}
            >
              Precisely Rendered.
            </span>
          </h2>

          {/* Gold rule */}
          <div className="mt-10 h-px w-24" style={{ backgroundColor: GOLD }} />

          {/* Descriptor */}
          <p
            className="mt-6 max-w-xl text-[1.15rem] italic leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: WARM_GRAY,
            }}
          >
            Since 2003, we have rendered meaning across the diplomatic table —
            where every word carries weight and no nuance is lost in transit.
          </p>

          {/* Text-only CTAs */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12">
            <a
              href="#"
              className="group text-[15px] tracking-wide transition-opacity hover:opacity-60"
              style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
            >
              Explore Our Services
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#"
              className="text-[15px] tracking-wide transition-opacity hover:opacity-60"
              style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
            >
              Request Interpretation
              <span className="ml-3 inline-block">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Services ───────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-8 py-32 md:px-16 md:py-44">
        {/* Section heading */}
        <div className="mb-20 flex items-center gap-6">
          <span
            className="text-[12px] font-medium uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
          >
            What We Do
          </span>
          <div className="h-px w-16" style={{ backgroundColor: GOLD }} />
        </div>

        <div className="space-y-0">
          {services.map((s, i) => (
            <div key={s.num}>
              <div
                className={cn(
                  'flex flex-col gap-6 py-12 md:flex-row md:items-baseline',
                  s.align === 'right'
                    ? 'md:justify-end md:pl-[35%]'
                    : 'md:pl-0',
                )}
              >
                {/* Numeral anchor */}
                <span
                  className="text-[5.5rem] font-light leading-none md:text-[7rem]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: NAVY,
                    opacity: 0.3,
                  }}
                >
                  {s.num}
                </span>
                <div className="max-w-md">
                  <h3
                    className="text-[2rem] font-medium leading-tight md:text-[2.4rem]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: NAVY,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="mt-3 text-[15px] leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: WARM_GRAY,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
              {/* Horizontal rule divider */}
              {i < services.length - 1 && (
                <div
                  className="h-px w-full"
                  style={{ backgroundColor: 'rgba(13,27,42,0.12)' }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Trusted By ───────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-8 py-32 md:px-16 md:py-44">
        <h2
          className="mb-24 text-[2.2rem] italic font-light leading-tight md:text-[2.8rem]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: NAVY,
            letterSpacing: '0.01em',
          }}
        >
          Trusted by the Diplomatic Community
        </h2>

        {/* Typographic constellation */}
        <div className="relative min-h-[18rem]">
          {institutions.map((inst) => (
            <span
              key={inst.name}
              className="absolute whitespace-nowrap font-medium"
              style={{
                top: inst.top,
                left: inst.left,
                fontSize: inst.size,
                fontFamily: "'Cormorant Garamond', serif",
                color: inst.color,
                opacity: inst.opacity,
                letterSpacing: '0.02em',
              }}
            >
              {inst.name}
            </span>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Footer ───────────────────────── */}
      <footer className="relative z-10 mx-auto max-w-[1400px] px-8 py-16 md:px-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span
            className="text-[12px] tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
          >
            © 2024 RMLingo
          </span>
          <div className="h-px w-24" style={{ backgroundColor: GOLD }} />
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-6">
            <span
              className="text-[12px] tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
            >
              Washington D.C.
            </span>
            <span
              className="text-[12px] tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
            >
              info@diplomatic-intl.com
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
