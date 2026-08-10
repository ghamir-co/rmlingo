import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   RMLingo — Editorial Refined
   A tighter, more polished version of the existing homepage direction.

   Same design intent — ivory ground, navy type, gold rule, bilingual
   script palimpsest — refined through:
     · Sharper proportional type scale & vertical rhythm
     · A measured two-column hero (headline / lead) instead of a centered stack
     · Editorial numbered services with hover-reveal descriptions
     · A calm, grid-aligned "trusted by" wall (replaces the cramped scatter)
     · A closing "by the numbers" ledger — quiet institutional credibility
     · Subtle scroll-reveal & gold-rule motion (transform/opacity only)
     · Sticky thin gold progress hairline at the very top

   Palette: ivory #F7F3EC · navy #0E1E33 · gold #B8963E · warm gray #6B6560
   Type:    Cormorant Garamond (display) · Inter (UI) · Amiri (Arabic script)
   ───────────────────────────────────────────────────────────────────────── */

const NAVY = '#0E1E33'
const NAVY_12 = 'rgba(14,30,51,0.12)'
const NAVY_06 = 'rgba(14,30,51,0.06)'
const IVORY = '#F7F3EC'
const IVORY_2 = '#EFE9DF'
const GOLD = '#B8963E'
const WARM_GRAY = '#6B6560'

const SERIF = "'Cormorant Garamond', Georgia, serif"
const SANS = "'Inter', system-ui, sans-serif"
const AMIRI = "'Amiri', serif"

/* ─── scroll-reveal hook ──────────────────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])
  return { ref, shown }
}

/* ─── script palimpsest ───────────────────────────────────────────────── */
const arabicPhrases = [
  {
    text: 'الترجمة',
    size: 230,
    top: '-2.5rem',
    left: '-2.5rem',
    opacity: 0.05,
    rotate: -3,
  },
  {
    text: 'الدبلوماسية',
    size: 150,
    top: '20rem',
    left: '32rem',
    opacity: 0.04,
    rotate: 4,
  },
  {
    text: 'اللغة',
    size: 190,
    top: '33rem',
    left: '-1.5rem',
    opacity: 0.045,
    rotate: -2,
  },
  {
    text: 'التفاهم',
    size: 110,
    top: '7rem',
    left: '50rem',
    opacity: 0.04,
    rotate: 5,
  },
  {
    text: 'السلام',
    size: 260,
    top: '26rem',
    left: '22rem',
    opacity: 0.03,
    rotate: 1,
  },
] as const

const englishPhrases = [
  {
    text: 'Diplomacy',
    size: 96,
    top: '3rem',
    left: '36rem',
    opacity: 0.05,
    rotate: -2,
  },
  {
    text: 'Interpretation',
    size: 76,
    top: '30rem',
    left: '5rem',
    opacity: 0.06,
    rotate: 3,
  },
  {
    text: 'Understanding',
    size: 60,
    top: '17rem',
    left: '52rem',
    opacity: 0.045,
    rotate: -4,
  },
  {
    text: 'Translation',
    size: 130,
    top: '35rem',
    left: '40rem',
    opacity: 0.035,
    rotate: 2,
  },
] as const

function ScriptPalimpsest() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ color: NAVY }}
    >
      {arabicPhrases.map((p, i) => (
        <span
          key={`ar-${i}`}
          className="absolute whitespace-nowrap select-none"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            fontFamily: AMIRI,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {p.text}
        </span>
      ))}
      {englishPhrases.map((p, i) => (
        <span
          key={`en-${i}`}
          className="absolute whitespace-nowrap select-none"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            fontFamily: SERIF,
            fontStyle: 'italic',
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
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

/* ─── data ────────────────────────────────────────────────────────────── */
const NAV_LINKS = ['Services', 'About', 'Languages', 'Contact'] as const

const services = [
  {
    num: '01',
    name: 'Conference Interpretation',
    desc: 'Simultaneous and consecutive interpretation for high-stakes diplomatic summits, bilateral talks, and multilateral forums.',
    pairs: '38 language pairs · 6 UN tongues',
  },
  {
    num: '02',
    name: 'Document Translation',
    desc: 'Certified translation of treaties, communiqués, diplomatic notes, and ministerial correspondence across 87 language pairs.',
    pairs: '87 language pairs · certified',
  },
  {
    num: '03',
    name: 'RMLingo Transcription',
    desc: 'Verbatim transcripts of closed-door proceedings with strict chain-of-custody and confidentiality protocols.',
    pairs: 'Chain-of-custody · sealed delivery',
  },
  {
    num: '04',
    name: 'Multilingual Consultation',
    desc: 'Cultural and linguistic advisory for missions navigating protocol, register, and cross-cultural nuance.',
    pairs: 'Protocol · register · register-craft',
  },
] as const

const institutions = [
  { name: 'United Nations', weight: 600 },
  { name: 'U.S. Department of State', weight: 400 },
  { name: 'African Union', weight: 500 },
  { name: 'International Monetary Fund', weight: 300 },
  { name: 'Embassy of France', weight: 400 },
  { name: 'UNHCR', weight: 500 },
  { name: 'World Health Organization', weight: 300 },
  { name: 'NATO', weight: 600 },
  { name: 'European External Action Service', weight: 300 },
  { name: 'World Bank Group', weight: 400 },
] as const

const ledger = [
  { figure: '20', label: 'Years at the diplomatic table' },
  { figure: '87', label: 'Certified language pairs' },
  { figure: '6,400+', label: 'Sessions rendered, on the record' },
  { figure: '4', label: 'Offices — Washington, New York, Geneva, Nairobi' },
] as const

/* ─── progress hairline ───────────────────────────────────────────────── */
function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px]"
      style={{ background: 'transparent' }}
    >
      <div
        className="h-full origin-left"
        style={{
          backgroundColor: GOLD,
          transform: `scaleX(${p})`,
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}

/* ─── reveal wrapper ──────────────────────────────────────────────────── */
function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  y?: number
  delay?: number
  as?: 'div' | 'section' | 'li' | 'header'
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  // Polymorphic element ref; any is required for the union of tags.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagRef = ref as React.Ref<any>
  return (
    <Tag
      ref={tagRef}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0px)' : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  )
}

/* ─── component ───────────────────────────────────────────────────────── */
export default function EditorialRefined() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: IVORY, color: NAVY }}
    >
      <ScrollProgress />

      {/* ───────────── Navigation ───────────── */}
      <nav className="relative z-30 mx-auto flex max-w-[1320px] items-end justify-between px-8 pt-10 md:px-16">
        <div>
          <h1
            className="text-[1rem] font-medium uppercase leading-none"
            style={{ fontFamily: SANS, letterSpacing: '0.22em', color: NAVY }}
          >
            RMLingo
          </h1>
          <div className="mt-2.5 h-px w-32" style={{ backgroundColor: GOLD }} />
        </div>
        <div className="hidden items-baseline gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="di-underline text-[12.5px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
              style={{ fontFamily: SANS, color: NAVY }}
            >
              {link}
            </a>
          ))}
          <span
            className="ml-2 text-[10px] uppercase tracking-[0.24em]"
            style={{ fontFamily: SANS, color: WARM_GRAY }}
          >
            Est. 2003
          </span>
        </div>
      </nav>

      {/* ───────────── Hero ───────────── */}
      <section className="relative mx-auto max-w-[1320px] px-8 md:px-16">
        <div className="pointer-events-none absolute inset-0 h-[92dvh] overflow-hidden">
          <ScriptPalimpsest />
        </div>

        <div className="relative z-10 grid min-h-[88dvh] grid-cols-1 items-center gap-12 pt-20 md:grid-cols-[1.45fr_1fr]">
          {/* Left — headline */}
          <div>
            {/* Right-margin vertical city list (absolute, lg+) */}
            <div
              className="absolute right-[-0.5rem] top-1/2 hidden -translate-y-1/2 lg:block"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ fontFamily: SANS, color: WARM_GRAY }}
              >
                Washington D.C. · New York · Geneva · Nairobi
              </span>
            </div>

            <h2
              className="font-light leading-[0.94]"
              style={{ fontFamily: SERIF }}
            >
              <span
                className="block text-[clamp(2.8rem,8.5vw,7.75rem)]"
                style={{
                  WebkitTextStroke: `1px ${NAVY}`,
                  color: 'transparent',
                  letterSpacing: '0.035em',
                }}
              >
                The Language
              </span>
              <span
                className="block text-[clamp(2.8rem,8.5vw,7.75rem)]"
                style={{ color: NAVY, letterSpacing: '0.025em' }}
              >
                of Diplomacy,
              </span>
              <span
                className="block text-[clamp(2.8rem,8.5vw,7.75rem)] italic"
                style={{
                  color: NAVY,
                  letterSpacing: '0.045em',
                  fontWeight: 300,
                }}
              >
                Precisely Rendered.
              </span>
            </h2>

            {/* Gold rule — animated in */}
            <div
              className="mt-9 h-px origin-left"
              style={{
                backgroundColor: GOLD,
                width: '6rem',
                animation:
                  'di-rule-grow 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both',
              }}
            />

            {/* Descriptor */}
            <p
              className="mt-6 max-w-xl text-[1.12rem] italic leading-relaxed"
              style={{ fontFamily: SERIF, color: WARM_GRAY }}
            >
              Since 2003, we have rendered meaning across the diplomatic table —
              where every word carries weight and no nuance is lost in transit.
            </p>

            {/* Text-only CTAs */}
            <div className="mt-11 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12">
              <a
                href="#"
                className="di-underline group text-[14px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                style={{ fontFamily: SANS, color: NAVY }}
              >
                Explore Our Services
                <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#"
                className="di-underline text-[14px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                style={{ fontFamily: SANS, color: WARM_GRAY }}
              >
                Request Interpretation
                <span className="ml-3 inline-block">→</span>
              </a>
            </div>
          </div>

          {/* Right — quiet editorial column */}
          <div
            className="hidden flex-col items-start gap-7 border-l pl-8 md:flex"
            style={{ borderColor: NAVY_12 }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ fontFamily: SANS, color: WARM_GRAY }}
            >
              A Note from the Founder
            </span>
            <p
              className="text-[1.02rem] leading-[1.7]"
              style={{ fontFamily: SERIF, color: NAVY }}
            >
              “A treaty is only as faithful as its quietest sentence. We were
              founded to protect that sentence — and the twenty thousand that
              follow it.”
            </p>
            <div className="flex items-center gap-3">
              <span
                className="text-[1.6rem] italic"
                style={{ fontFamily: SERIF, color: NAVY }}
              >
                L. Khoury
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.2em]"
                style={{ fontFamily: SANS, color: WARM_GRAY }}
              >
                Director
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Services ───────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-8 py-28 md:px-16 md:py-40">
        <Reveal className="mb-16 flex items-center gap-6">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ fontFamily: SANS, color: NAVY }}
          >
            What We Do
          </span>
          <div className="h-px w-16" style={{ backgroundColor: GOLD }} />
          <span
            className="ml-auto hidden text-[11px] uppercase tracking-[0.2em] md:inline"
            style={{ fontFamily: SANS, color: WARM_GRAY }}
          >
            Four disciplines
          </span>
        </Reveal>

        <div>
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.07} y={22}>
              <div
                className="group relative grid grid-cols-1 gap-6 border-b py-12 transition-colors duration-500 md:grid-cols-[7rem_1.1fr_1.4fr] md:items-baseline md:gap-12"
                style={{ borderColor: i === 0 ? NAVY_12 : NAVY_12 }}
              >
                {/* Numeral */}
                <span
                  className="text-[3.5rem] font-light leading-none md:text-[4.25rem]"
                  style={{
                    fontFamily: SERIF,
                    color: NAVY,
                    opacity: 0.28,
                    transition: 'opacity 0.5s',
                  }}
                >
                  {s.num}
                </span>

                {/* Name */}
                <h3
                  className="text-[1.85rem] font-medium leading-tight md:text-[2.2rem]"
                  style={{
                    fontFamily: SERIF,
                    color: NAVY,
                    letterSpacing: '0.015em',
                  }}
                >
                  {s.name}
                </h3>

                {/* Description + meta */}
                <div className="max-w-[34rem]">
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ fontFamily: SANS, color: WARM_GRAY }}
                  >
                    {s.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100"
                    style={{ transform: 'translateY(4px)' }}
                  >
                    <span
                      className="h-px w-6"
                      style={{ backgroundColor: GOLD }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-[0.22em]"
                      style={{ fontFamily: SANS, color: NAVY }}
                    >
                      {s.pairs}
                    </span>
                  </div>
                </div>

                {/* hover gold edge */}
                <span
                  className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ backgroundColor: GOLD }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── Trusted By (grid wall) ───────────── */}
      <section className="relative z-10" style={{ backgroundColor: IVORY_2 }}>
        <div className="mx-auto max-w-[1320px] px-8 py-28 md:px-16 md:py-40">
          <Reveal className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.32em]"
                style={{ fontFamily: SANS, color: NAVY }}
              >
                In Confidence
              </span>
              <h2
                className="mt-4 text-[2rem] italic font-light leading-tight md:text-[2.6rem]"
                style={{
                  fontFamily: SERIF,
                  color: NAVY,
                  letterSpacing: '0.01em',
                }}
              >
                Trusted by the Diplomatic Community
              </h2>
            </div>
            <div
              className="hidden h-px w-24 md:block"
              style={{ backgroundColor: GOLD }}
            />
          </Reveal>

          <Reveal>
            <ul
              className="grid grid-cols-1 border-t sm:grid-cols-2"
              style={{ borderColor: NAVY_12 }}
            >
              {institutions.map((inst, i) => (
                <li
                  key={inst.name}
                  className="group flex items-center gap-5 border-b py-7 transition-colors duration-300 sm:even:border-l sm:even:pl-10"
                  style={{ borderColor: NAVY_12 }}
                >
                  <span
                    className="text-[11px] tabular-nums"
                    style={{
                      fontFamily: SANS,
                      color: WARM_GRAY,
                      letterSpacing: '0.15em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[1.35rem] leading-tight transition-colors duration-300"
                    style={{
                      fontFamily: SERIF,
                      color: NAVY,
                      fontWeight: inst.weight,
                      letterSpacing: '0.012em',
                    }}
                  >
                    {inst.name}
                  </span>
                  <span
                    className="ml-auto h-px w-0 transition-all duration-500 group-hover:w-8"
                    style={{ backgroundColor: GOLD }}
                  />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="mt-10 max-w-2xl text-[14px] leading-relaxed"
              style={{ fontFamily: SANS, color: WARM_GRAY }}
            >
              A partial register of missions, ministries, and multilateral
              bodies served under standing arrangement or per-session contract.
              Full references available upon request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Ledger — by the numbers ───────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-8 py-28 md:px-16 md:py-40">
        <Reveal className="mb-16 flex items-center gap-6">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ fontFamily: SANS, color: NAVY }}
          >
            By the Numbers
          </span>
          <div className="h-px w-16" style={{ backgroundColor: GOLD }} />
        </Reveal>

        <div
          className="grid grid-cols-2 gap-px md:grid-cols-4"
          style={{ backgroundColor: NAVY_06 }}
        >
          {ledger.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08} y={20}>
              <div
                className="h-full px-6 py-10"
                style={{ backgroundColor: IVORY }}
              >
                <div
                  className="text-[clamp(2.6rem,5vw,4rem)] font-light leading-none"
                  style={{
                    fontFamily: SERIF,
                    color: NAVY,
                    letterSpacing: '0.01em',
                  }}
                >
                  {l.figure}
                </div>
                <div
                  className="mt-4 max-w-[14rem] text-[12.5px] leading-relaxed"
                  style={{ fontFamily: SANS, color: WARM_GRAY }}
                >
                  {l.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── Footer ───────────── */}
      <footer
        className="relative z-10"
        style={{ borderTop: `1px solid ${NAVY_12}` }}
      >
        <div className="mx-auto max-w-[1320px] px-8 py-14 md:px-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <h3
                className="text-[1rem] font-medium uppercase leading-none"
                style={{
                  fontFamily: SANS,
                  letterSpacing: '0.22em',
                  color: NAVY,
                }}
              >
                RMLingo
              </h3>
              <div
                className="mt-2.5 h-px w-28"
                style={{ backgroundColor: GOLD }}
              />
              <p
                className="mt-5 max-w-sm text-[13px] leading-relaxed"
                style={{ fontFamily: SANS, color: WARM_GRAY }}
              >
                Linguistic precision for the world's most demanding
                institutions. Confidential, certified, and on the record.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="di-underline text-[12px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
                  style={{ fontFamily: SANS, color: NAVY }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-7 md:flex-row"
            style={{ borderColor: NAVY_06 }}
          >
            <span
              className="text-[11px] tracking-wide"
              style={{ fontFamily: SANS, color: WARM_GRAY }}
            >
              © 2025 RMLingo
            </span>
            <span
              className="text-[11px] tracking-wide"
              style={{ fontFamily: SANS, color: WARM_GRAY }}
            >
              Washington D.C. · New York · Geneva · Nairobi
            </span>
            <a
              href="#"
              className="di-underline text-[11px] tracking-wide"
              style={{ fontFamily: SANS, color: NAVY }}
            >
              info@diplomatic-intl.com
            </a>
          </div>
        </div>
      </footer>

      {/* local keyframes + underline utility (self-contained) */}
      <style>{`
        @keyframes di-rule-grow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        .di-underline { position: relative; }
        .di-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1px;
          width: 0;
          background-color: currentColor;
          transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .di-underline:hover::after { width: 100%; }
      `}</style>
    </div>
  )
}
