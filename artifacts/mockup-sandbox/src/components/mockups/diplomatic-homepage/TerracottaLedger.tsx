import { useEffect, useRef, useState } from 'react'
import './TerracottaLedger.css'

/* ─────────────────────────────────────────────────────────────────────────
   RMLingo — Terracotta Ledger
   A warm, earthen variant of the Editorial Refined homepage.

   Same structural skeleton — two-column hero with script palimpsest,
   numbered services with hover-reveal meta, grid "trusted-by" wall,
   by-the-numbers ledger, sticky progress hairline, footer — reinterpreted
   through a warmer, denser, more tactile register:

     · Clay-parchment ground with drifting paper-grain noise
     · Deep ink type instead of cool navy; oxidised-brass accent
     · Fraunces (warm optical display) + Spline Sans Mono (archival meta)
       in place of Cormorant + Inter — feels like a field bureau's
       leather ledger rather than a Geneva editorial
     · Denser hairlines, ledger-rule dividers, monospaced cataloguing
       numerals — a "logged and stamped" texture
     · Warmer, first-person copy register

   This is a coherent design opinion, not a recolour: every material
   choice (type, grain, rule weight, numeral style, copy voice) serves
   the warm-archive mood.
   ───────────────────────────────────────────────────────────────────────── */

const CLAY = 'var(--tl-clay)'
const CLAY_2 = 'var(--tl-clay-2)'
const INK = 'var(--tl-ink)'
const INK_60 = 'var(--tl-ink-60)'
const INK_14 = 'var(--tl-ink-14)'
const INK_07 = 'var(--tl-ink-07)'
const INK_04 = 'var(--tl-ink-04)'
const BRASS = 'var(--tl-brass)'
const TAUPE = 'var(--tl-taupe)'
const DISPLAY = 'var(--tl-display)'
const MONO = 'var(--tl-mono)'
const AMIRI = 'var(--tl-amiri)'

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

/* ─── script palimpsest (re-tuned for warm ground) ────────────────────── */
const arabicPhrases = [
  {
    text: 'الترجمة',
    size: 240,
    top: '-2.5rem',
    left: '-2rem',
    opacity: 0.055,
    rotate: -3,
  },
  {
    text: 'الدبلوماسية',
    size: 156,
    top: '20rem',
    left: '30rem',
    opacity: 0.045,
    rotate: 4,
  },
  {
    text: 'اللغة',
    size: 196,
    top: '33rem',
    left: '-1rem',
    opacity: 0.05,
    rotate: -2,
  },
  {
    text: 'التفاهم',
    size: 112,
    top: '7rem',
    left: '50rem',
    opacity: 0.045,
    rotate: 5,
  },
  {
    text: 'السلام',
    size: 268,
    top: '26rem',
    left: '21rem',
    opacity: 0.035,
    rotate: 1,
  },
] as const

const englishPhrases = [
  {
    text: 'Diplomacy',
    size: 98,
    top: '3rem',
    left: '35rem',
    opacity: 0.055,
    rotate: -2,
  },
  {
    text: 'Interpretation',
    size: 78,
    top: '30rem',
    left: '4rem',
    opacity: 0.065,
    rotate: 3,
  },
  {
    text: 'Understanding',
    size: 62,
    top: '17rem',
    left: '52rem',
    opacity: 0.05,
    rotate: -4,
  },
  {
    text: 'Translation',
    size: 132,
    top: '35rem',
    left: '40rem',
    opacity: 0.04,
    rotate: 2,
  },
] as const

function ScriptPalimpsest() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ color: INK }}
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
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            lineHeight: 1,
            letterSpacing: '0.01em',
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
  {
    figure: '4',
    label: 'Field offices — Washington, New York, Geneva, Nairobi',
  },
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
          backgroundColor: BRASS,
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

/* ─── a small wax-seal mark, drawn in CSS ─────────────────────────────── */
function SealMark() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-full"
      style={{
        width: '2.6rem',
        height: '2.6rem',
        border: `1px solid ${BRASS}`,
        color: BRASS,
        fontFamily: DISPLAY,
        fontStyle: 'italic',
        fontSize: '1.1rem',
        lineHeight: 1,
        background: 'transparent',
        flexShrink: 0,
      }}
    >
      DI
    </span>
  )
}

/* ─── component ───────────────────────────────────────────────────────── */
export default function TerracottaLedger() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: CLAY, color: INK }}
    >
      {/* paper grain overlay */}
      <div className="tl-grain" aria-hidden />
      <ScrollProgress />

      {/* ───────────── Navigation ───────────── */}
      <nav className="relative z-30 mx-auto flex max-w-[1320px] items-end justify-between px-8 pt-10 md:px-16">
        <div className="flex items-end gap-4">
          <SealMark />
          <div>
            <h1
              className="text-[1rem] font-medium uppercase leading-none"
              style={{ fontFamily: MONO, letterSpacing: '0.22em', color: INK }}
            >
              RMLingo
            </h1>
            <div
              className="mt-2.5 h-px w-28"
              style={{ backgroundColor: BRASS }}
            />
          </div>
        </div>
        <div className="hidden items-baseline gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="tl-underline text-[12px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
              style={{ fontFamily: MONO, color: INK }}
            >
              {link}
            </a>
          ))}
          <span
            className="ml-2 text-[10px] uppercase tracking-[0.24em]"
            style={{ fontFamily: MONO, color: TAUPE }}
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
                className="text-[10px] uppercase tracking-[0.34em]"
                style={{ fontFamily: MONO, color: TAUPE }}
              >
                Washington D.C. · New York · Geneva · Nairobi
              </span>
            </div>

            <h2
              className="tl-display font-light leading-[0.95]"
              style={{ fontFamily: DISPLAY }}
            >
              <span
                className="block text-[clamp(2.8rem,8.5vw,7.75rem)]"
                style={{
                  WebkitTextStroke: `1px ${INK}`,
                  color: 'transparent',
                  letterSpacing: '0.015em',
                }}
              >
                The Language
              </span>
              <span
                className="block text-[clamp(2.8rem,8.5vw,7.75rem)]"
                style={{ color: INK, letterSpacing: '0.005em' }}
              >
                of Diplomacy,
              </span>
              <span
                className="block text-[clamp(2.8rem,8.5vw,7.75rem)] italic"
                style={{ color: INK, letterSpacing: '0.02em', fontWeight: 300 }}
              >
                Precisely Rendered.
              </span>
            </h2>

            {/* Brass rule — animated in */}
            <div
              className="mt-9 h-px origin-left"
              style={{
                backgroundColor: BRASS,
                width: '6rem',
                animation:
                  'tl-rule-grow 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both',
              }}
            />

            {/* Descriptor */}
            <p
              className="mt-6 max-w-xl text-[1.18rem] italic leading-relaxed"
              style={{ fontFamily: DISPLAY, color: INK_60, fontWeight: 300 }}
            >
              Since 2003, we have carried meaning across the diplomatic table —
              where every word carries weight, and no nuance is lost in transit.
            </p>

            {/* Text-only CTAs */}
            <div className="mt-11 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12">
              <a
                href="#"
                className="tl-underline group text-[13px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
                style={{ fontFamily: MONO, color: INK }}
              >
                Explore Our Services
                <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#"
                className="tl-underline text-[13px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
                style={{ fontFamily: MONO, color: TAUPE }}
              >
                Request Interpretation
                <span className="ml-3 inline-block">→</span>
              </a>
            </div>
          </div>

          {/* Right — quiet editorial column */}
          <div
            className="hidden flex-col items-start gap-7 border-l pl-8 md:flex"
            style={{ borderColor: INK_14 }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ fontFamily: MONO, color: TAUPE }}
            >
              A Note from the Founder
            </span>
            <p
              className="text-[1.06rem] leading-[1.72]"
              style={{ fontFamily: DISPLAY, color: INK, fontWeight: 400 }}
            >
              “A treaty is only as faithful as its quietest sentence. We were
              founded to protect that sentence — and the twenty thousand that
              follow it.”
            </p>
            <div className="flex items-center gap-3">
              <span
                className="text-[1.6rem] italic"
                style={{ fontFamily: DISPLAY, color: INK, fontWeight: 300 }}
              >
                L. Khoury
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.24em]"
                style={{ fontFamily: MONO, color: TAUPE }}
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
            className="text-[11px] font-medium uppercase tracking-[0.34em]"
            style={{ fontFamily: MONO, color: INK }}
          >
            What We Do
          </span>
          <div className="h-px w-16" style={{ backgroundColor: BRASS }} />
          <span
            className="ml-auto hidden text-[11px] uppercase tracking-[0.2em] md:inline"
            style={{ fontFamily: MONO, color: TAUPE }}
          >
            Four disciplines
          </span>
        </Reveal>

        <div>
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.07} y={22}>
              <div
                className="group relative grid grid-cols-1 gap-6 border-b py-12 transition-colors duration-500 md:grid-cols-[7rem_1.1fr_1.4fr] md:items-baseline md:gap-12"
                style={{ borderColor: INK_14 }}
              >
                {/* Numeral — monospaced cataloguing style */}
                <span
                  className="text-[2.6rem] font-medium leading-none md:text-[3.1rem]"
                  style={{
                    fontFamily: MONO,
                    color: INK,
                    opacity: 0.3,
                    letterSpacing: '0.04em',
                    transition: 'opacity 0.5s, color 0.5s',
                  }}
                >
                  {s.num}
                </span>

                {/* Name */}
                <h3
                  className="text-[1.9rem] font-medium leading-tight md:text-[2.25rem]"
                  style={{
                    fontFamily: DISPLAY,
                    color: INK,
                    letterSpacing: '0.005em',
                  }}
                >
                  {s.name}
                </h3>

                {/* Description + meta */}
                <div className="max-w-[34rem]">
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      fontFamily: DISPLAY,
                      color: INK_60,
                      fontWeight: 400,
                    }}
                  >
                    {s.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100"
                    style={{ transform: 'translateY(4px)' }}
                  >
                    <span
                      className="h-px w-6"
                      style={{ backgroundColor: BRASS }}
                    />
                    <span
                      className="text-[10.5px] uppercase tracking-[0.24em]"
                      style={{ fontFamily: MONO, color: INK }}
                    >
                      {s.pairs}
                    </span>
                  </div>
                </div>

                {/* hover brass edge */}
                <span
                  className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ backgroundColor: BRASS }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── Trusted By (grid wall) ───────────── */}
      <section className="relative z-10" style={{ backgroundColor: CLAY_2 }}>
        <div className="mx-auto max-w-[1320px] px-8 py-28 md:px-16 md:py-40">
          <Reveal className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.34em]"
                style={{ fontFamily: MONO, color: INK }}
              >
                In Confidence
              </span>
              <h2
                className="tl-display mt-4 text-[2rem] italic font-light leading-tight md:text-[2.6rem]"
                style={{
                  fontFamily: DISPLAY,
                  color: INK,
                  letterSpacing: '0.005em',
                }}
              >
                Trusted by the Diplomatic Community
              </h2>
            </div>
            <div
              className="hidden h-px w-24 md:block"
              style={{ backgroundColor: BRASS }}
            />
          </Reveal>

          <Reveal>
            <ul
              className="grid grid-cols-1 border-t sm:grid-cols-2"
              style={{ borderColor: INK_14 }}
            >
              {institutions.map((inst, i) => (
                <li
                  key={inst.name}
                  className="group flex items-center gap-5 border-b py-7 transition-colors duration-300 sm:even:border-l sm:even:pl-10"
                  style={{ borderColor: INK_14 }}
                >
                  <span
                    className="text-[11px] tabular-nums"
                    style={{
                      fontFamily: MONO,
                      color: TAUPE,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[1.35rem] leading-tight transition-colors duration-300"
                    style={{
                      fontFamily: DISPLAY,
                      color: INK,
                      fontWeight: inst.weight,
                      letterSpacing: '0.005em',
                    }}
                  >
                    {inst.name}
                  </span>
                  <span
                    className="ml-auto h-px w-0 transition-all duration-500 group-hover:w-8"
                    style={{ backgroundColor: BRASS }}
                  />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="mt-10 max-w-2xl text-[14px] leading-relaxed"
              style={{ fontFamily: DISPLAY, color: INK_60, fontWeight: 400 }}
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
            className="text-[11px] font-medium uppercase tracking-[0.34em]"
            style={{ fontFamily: MONO, color: INK }}
          >
            By the Numbers
          </span>
          <div className="h-px w-16" style={{ backgroundColor: BRASS }} />
        </Reveal>

        <div
          className="grid grid-cols-2 gap-px md:grid-cols-4"
          style={{ backgroundColor: INK_07 }}
        >
          {ledger.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08} y={20}>
              <div
                className="h-full px-6 py-10"
                style={{ backgroundColor: CLAY }}
              >
                <div
                  className="text-[clamp(2.6rem,5vw,4rem)] font-light leading-none"
                  style={{
                    fontFamily: DISPLAY,
                    color: INK,
                    letterSpacing: '0.005em',
                  }}
                >
                  {l.figure}
                </div>
                <div
                  className="mt-4 max-w-[14rem] text-[11.5px] leading-relaxed"
                  style={{
                    fontFamily: MONO,
                    color: TAUPE,
                    letterSpacing: '0.04em',
                  }}
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
        style={{ borderTop: `1px solid ${INK_14}` }}
      >
        <div className="mx-auto max-w-[1320px] px-8 py-14 md:px-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-4">
                <SealMark />
                <div>
                  <h3
                    className="text-[1rem] font-medium uppercase leading-none"
                    style={{
                      fontFamily: MONO,
                      letterSpacing: '0.22em',
                      color: INK,
                    }}
                  >
                    RMLingo
                  </h3>
                  <div
                    className="mt-2.5 h-px w-24"
                    style={{ backgroundColor: BRASS }}
                  />
                </div>
              </div>
              <p
                className="mt-6 max-w-sm text-[13.5px] leading-relaxed"
                style={{ fontFamily: DISPLAY, color: INK_60, fontWeight: 400 }}
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
                  className="tl-underline text-[11.5px] uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
                  style={{ fontFamily: MONO, color: INK }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-7 md:flex-row"
            style={{ borderColor: INK_04 }}
          >
            <span
              className="text-[10.5px] tracking-[0.06em]"
              style={{ fontFamily: MONO, color: TAUPE }}
            >
              © 2025 RMLingo
            </span>
            <span
              className="text-[10.5px] tracking-[0.06em]"
              style={{ fontFamily: MONO, color: TAUPE }}
            >
              Washington D.C. · New York · Geneva · Nairobi
            </span>
            <a
              href="#"
              className="tl-underline text-[10.5px] tracking-[0.06em]"
              style={{ fontFamily: MONO, color: INK }}
            >
              info@rmlingo.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
