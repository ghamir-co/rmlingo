import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   RMLingo — mobile editorial variant (390px portrait)
   Same palette · same type families · re-composed for the vertical canvas.
   Palette: ivory #FAF7F2 · navy #0D1B2A · gold #B8963E · warm gray #6B6560
   Type:    Cormorant Garamond (display) · Inter (UI) · Amiri (Arabic script)
   ───────────────────────────────────────────────────────────────────────── */

const NAVY = '#0D1B2A'
const IVORY = '#FAF7F2'
const GOLD = '#B8963E'
const WARM_GRAY = '#6B6560'
const HAIR = 'rgba(13,27,42,0.12)'

/* Arabic script backdrop — tuned for a narrow vertical canvas.
   Phrases run top-to-bottom, several clipped at the edges so the field
   feels like a drifting manuscript rather than a tiled pattern. */
const arabicPhrases: {
  text: string
  size: number
  top: string
  left: string
  opacity: number
  rotate?: number
}[] = [
  { text: 'الترجمة', size: 150, top: '3rem', left: '-2.5rem', opacity: 0.05 },
  {
    text: 'الدبلوماسية',
    size: 110,
    top: '16rem',
    left: '1rem',
    opacity: 0.045,
    rotate: 4,
  },
  {
    text: 'اللغة',
    size: 140,
    top: '30rem',
    left: '-1.5rem',
    opacity: 0.05,
    rotate: -3,
  },
  {
    text: 'التفاهم',
    size: 90,
    top: '9rem',
    left: '11rem',
    opacity: 0.04,
    rotate: 5,
  },
  { text: 'السلام', size: 175, top: '24rem', left: '3rem', opacity: 0.035 },
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
    size: 64,
    top: '1.5rem',
    left: '9rem',
    opacity: 0.06,
    rotate: -2,
  },
  {
    text: 'Interpretation',
    size: 46,
    top: '22rem',
    left: '-1rem',
    opacity: 0.07,
    rotate: 3,
  },
  {
    text: 'Understanding',
    size: 40,
    top: '13rem',
    left: '8rem',
    opacity: 0.05,
    rotate: -4,
  },
  {
    text: 'Translation',
    size: 72,
    top: '28rem',
    left: '4rem',
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
  },
  {
    num: '02',
    name: 'Document Translation',
    desc: 'Certified translation of treaties, communiqués, diplomatic notes, and ministerial correspondence across 87 language pairs.',
  },
  {
    num: '03',
    name: 'RMLingo Transcription',
    desc: 'Verbatim transcripts of closed-door proceedings with strict chain-of-custody and confidentiality protocols.',
  },
  {
    num: '04',
    name: 'Multilingual Consultation',
    desc: 'Cultural and linguistic advisory for missions navigating protocol, register, and cross-cultural nuance.',
  },
]

/* Constellation of institutions re-laid into a vertical column that
   drifts down the portrait canvas. */
const institutions = [
  {
    name: 'United Nations',
    size: '2.2rem',
    opacity: 1,
    top: '0rem',
    left: '0rem',
  },
  {
    name: 'U.S. Dept. of State',
    size: '1.4rem',
    opacity: 0.78,
    top: '2.4rem',
    left: '4.5rem',
  },
  {
    name: 'African Union',
    size: '1.85rem',
    opacity: 0.9,
    top: '4.6rem',
    left: '1rem',
  },
  {
    name: 'International Monetary Fund',
    size: '1.05rem',
    opacity: 0.6,
    top: '6.9rem',
    left: '2.2rem',
  },
  {
    name: 'Embassy of France',
    size: '1.55rem',
    opacity: 0.85,
    top: '8.9rem',
    left: '0.4rem',
  },
  {
    name: 'UNHCR',
    size: '1.95rem',
    opacity: 0.72,
    top: '11rem',
    left: '5.5rem',
  },
  {
    name: 'World Health Org.',
    size: '1.2rem',
    opacity: 0.65,
    top: '13rem',
    left: '1.4rem',
  },
  { name: 'NATO', size: '2.1rem', opacity: 1, top: '15rem', left: '3.2rem' },
]

export default function HomepageMobile() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-x-hidden"
      style={{ backgroundColor: IVORY, color: NAVY }}
    >
      {/* ───────────────────────── Navigation ───────────────────────── */}
      <nav className="relative z-30 flex items-start justify-between px-6 pt-7">
        <div>
          <h1
            className="text-[0.92rem] font-medium uppercase leading-[1.1]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.16em',
              color: NAVY,
            }}
          >
            RMLingo
          </h1>
          <div className="mt-2.5 h-px w-20" style={{ backgroundColor: GOLD }} />
        </div>

        {/* Burger */}
        <button
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-40 flex flex-col items-end gap-[5px] pt-2"
          style={{ color: NAVY }}
        >
          <span
            className="block h-px bg-current transition-all duration-300"
            style={{
              width: menuOpen ? '1.6rem' : '1.75rem',
              transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block h-px bg-current transition-all duration-300"
            style={{ width: '1.25rem', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-px bg-current transition-all duration-300"
            style={{
              width: menuOpen ? '1.6rem' : '1.75rem',
              transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Slide-down editorial menu */}
      <div
        className="fixed inset-0 z-20 transition-opacity duration-300"
        style={{
          backgroundColor: IVORY,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
          <div className="space-y-7">
            {['Services', 'About', 'Languages', 'Contact'].map((link, i) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: NAVY,
                  opacity: menuOpen ? 1 : 0,
                  transition: `opacity 400ms ${i * 80 + 120}ms`,
                }}
              >
                <span
                  className="text-[0.7rem]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: GOLD,
                    letterSpacing: '0.1em',
                  }}
                >
                  0{i + 1}
                </span>
                <span className="text-[2.1rem] font-light leading-none">
                  {link}
                </span>
              </a>
            ))}
          </div>
          <div>
            <div className="mb-5 h-px w-16" style={{ backgroundColor: GOLD }} />
            <span
              className="text-[0.7rem] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
            >
              Est. 2003 · Washington D.C.
            </span>
          </div>
        </div>
      </div>

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative px-6">
        {/* Script background confined to hero */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[92dvh] overflow-hidden"
          style={{ color: NAVY }}
        >
          <ScriptBackground />
        </div>

        <div className="relative z-10 flex min-h-[82dvh] flex-col justify-center pt-10">
          {/* Vertical city list — rotated on left margin */}
          <div
            className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2"
            style={{ writingMode: 'vertical-rl' }}
          >
            <span
              className="text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
            >
              Washington D.C. · New York · Geneva · Nairobi
            </span>
          </div>

          {/* Headline — three lines, three treatments, scaled for portrait */}
          <h2
            className="font-light leading-[0.95]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span
              className="block text-[3.1rem]"
              style={{
                WebkitTextStroke: `1px ${NAVY}`,
                color: 'transparent',
                letterSpacing: '0.02em',
              }}
            >
              The Language
            </span>
            <span
              className="block text-[3.1rem]"
              style={{ color: NAVY, letterSpacing: '0.015em' }}
            >
              of Diplomacy,
            </span>
            <span
              className="block text-[3.1rem] italic"
              style={{ color: NAVY, letterSpacing: '0.03em', fontWeight: 300 }}
            >
              Precisely Rendered.
            </span>
          </h2>

          {/* Gold rule */}
          <div className="mt-8 h-px w-20" style={{ backgroundColor: GOLD }} />

          {/* Descriptor */}
          <p
            className="mt-5 max-w-[19rem] text-[1.05rem] italic leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: WARM_GRAY,
            }}
          >
            Since 2003, we have rendered meaning across the diplomatic table —
            where every word carries weight and no nuance is lost in transit.
          </p>

          {/* Text-only CTAs — stacked */}
          <div className="mt-9 flex flex-col gap-4">
            <a
              href="#"
              className="group text-[0.95rem] tracking-wide transition-opacity active:opacity-50"
              style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
            >
              Explore Our Services
              <span className="ml-3 inline-block transition-transform group-active:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#"
              className="text-[0.95rem] tracking-wide transition-opacity active:opacity-50"
              style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
            >
              Request Interpretation
              <span className="ml-3 inline-block">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Services ───────────────────────── */}
      <section className="relative z-10 px-6 pb-20 pt-12">
        {/* Section heading */}
        <div className="mb-10 flex items-center gap-4">
          <span
            className="text-[0.66rem] font-medium uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}
          >
            What We Do
          </span>
          <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
        </div>

        <div className="space-y-0">
          {services.map((s, i) => (
            <div key={s.num}>
              <div className="flex flex-col gap-3 py-8">
                {/* Numeral + name on one line, numeral floats left */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[3.4rem] font-light leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: NAVY,
                      opacity: 0.3,
                    }}
                  >
                    {s.num}
                  </span>
                  <h3
                    className="text-[1.55rem] font-medium leading-[1.05]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: NAVY,
                      letterSpacing: '0.015em',
                    }}
                  >
                    {s.name}
                  </h3>
                </div>
                <p
                  className="pl-1 text-[0.92rem] leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: WARM_GRAY,
                  }}
                >
                  {s.desc}
                </p>
              </div>
              {i < services.length - 1 && (
                <div
                  className="h-px w-full"
                  style={{ backgroundColor: HAIR }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Trusted By ───────────────────────── */}
      <section className="relative z-10 px-6 pb-20 pt-6">
        <h2
          className="mb-14 text-[1.85rem] italic font-light leading-[1.15]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: NAVY,
            letterSpacing: '0.01em',
          }}
        >
          Trusted by the Diplomatic Community
        </h2>

        {/* Typographic constellation — vertical drift */}
        <div className="relative min-h-[20rem]">
          {institutions.map((inst) => (
            <span
              key={inst.name}
              className="absolute whitespace-nowrap font-medium"
              style={{
                top: inst.top,
                left: inst.left,
                fontSize: inst.size,
                fontFamily: "'Cormorant Garamond', serif",
                color: inst.opacity > 0.8 ? NAVY : WARM_GRAY,
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
      <footer className="relative z-10 px-6 pb-10 pt-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <span
            className="text-[0.7rem] tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
          >
            © 2024 RMLingo
          </span>
          <div className="h-px w-20" style={{ backgroundColor: GOLD }} />
          <div className="flex flex-col items-center gap-1">
            <span
              className="text-[0.7rem] tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
            >
              Washington D.C.
            </span>
            <span
              className="text-[0.7rem] tracking-wide"
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
