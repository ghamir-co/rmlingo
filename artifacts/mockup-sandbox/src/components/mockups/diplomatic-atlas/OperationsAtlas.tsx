import './operations-atlas.css'
import { useEffect, useRef, useState } from 'react'

/* ───────────────────────────────────────────────────────────────────────────
   Operations Atlas — a distinct design hypothesis for RMLingo.

   Concept:  "Diplomacy never sleeps."
   The homepage is reframed from an editorial print spread into a NOCTURNAL
   OPERATIONS OBSERVATORY — a living cartographic atlas of the agency's active
   language-pair flows between world capitals at this moment.

   Information architecture (vs. the source editorial spread):
     1. Live dispatch ticker (replaces nothing; introduces real-time posture)
     2. Cartographic flow map of active interpretation channels (replaces static
        "Trusted by" constellation — same institutions, now geographically placed
        and actively connected)
     3. Active channels roster = the services, but framed as live operations
        with real-time state instead of a static numbered list
     4. Capitals registry strip (replaces the vertical office-city list)

   Interaction model:
     Source  → passive scroll-reveal typography
     Variant → always-alive telemetry: flowing arcs, pulsing capitals, a
     cycling dispatch ticker, channels that carry live state. The user
     observes diplomacy in motion rather than reading a brochure.

   Aesthetic: deep ink-navy ground, warm ivory type, gold as the flow/active
   signal. Fraunces (display) × Space Grotesk (UI) × Spline Sans Mono (data).
   ─────────────────────────────────────────────────────────────────────────── */

const C = {
  ground: '#0A1628',
  panel: '#0F1E33',
  ivory: '#EDE6D6',
  muted: '#7E8AA0',
  gold: '#C9973A',
  goldBright: '#E2B659',
  hair: 'rgba(237,230,214,0.12)',
  hairStrong: 'rgba(237,230,214,0.22)',
}

/* ── World map: capitals as normalized x/y coordinates on a 1000×520 field ── */
type Capital = {
  id: string
  city: string
  x: number
  y: number
  status: 'active' | 'relay' | 'standby'
}

const CAPITALS: Capital[] = [
  { id: 'wdc', city: 'Washington D.C.', x: 252, y: 200, status: 'active' },
  { id: 'nyc', city: 'New York', x: 278, y: 192, status: 'active' },
  { id: 'par', city: 'Paris', x: 504, y: 178, status: 'active' },
  { id: 'gva', city: 'Geneva', x: 514, y: 188, status: 'relay' },
  { id: 'lon', city: 'London', x: 478, y: 172, status: 'active' },
  { id: 'ber', city: 'Berlin', x: 528, y: 168, status: 'relay' },
  { id: 'cai', city: 'Cairo', x: 566, y: 232, status: 'standby' },
  { id: 'nbo', city: 'Nairobi', x: 576, y: 326, status: 'active' },
  { id: 'add', city: 'Addis Ababa', x: 598, y: 312, status: 'relay' },
  { id: 'jeddah', city: 'Jeddah', x: 612, y: 250, status: 'standby' },
  { id: 'ryadh', city: 'Riyadh', x: 624, y: 250, status: 'standby' },
  { id: 'dxb', city: 'Dubai', x: 648, y: 248, status: 'active' },
  { id: 'ist', city: 'Istanbul', x: 562, y: 200, status: 'relay' },
  { id: 'del', city: 'New Delhi', x: 690, y: 250, status: 'active' },
  { id: 'bkk', city: 'Bangkok', x: 766, y: 282, status: 'standby' },
  { id: 'sin', city: 'Singapore', x: 790, y: 312, status: 'active' },
  { id: 'tyo', city: 'Tokyo', x: 870, y: 210, status: 'active' },
  { id: 'pek', city: 'Beijing', x: 818, y: 210, status: 'active' },
  { id: 'sel', city: 'Seoul', x: 850, y: 208, status: 'relay' },
  { id: 'can', city: 'Ottawa', x: 248, y: 182, status: 'standby' },
  { id: 'mex', city: 'Mexico City', x: 226, y: 252, status: 'standby' },
  { id: 'bras', city: 'Brasília', x: 332, y: 340, status: 'standby' },
]

/* flow channels — pairs of capital ids */
type Flow = {
  from: string
  to: string
  pair: string
  speed: 'fast' | 'normal' | 'slow'
}

const FLOWS: Flow[] = [
  { from: 'nyc', to: 'par', pair: 'EN ↔ FR', speed: 'fast' },
  { from: 'gva', to: 'wdc', pair: 'FR ↔ EN', speed: 'normal' },
  { from: 'wdc', to: 'tyo', pair: 'EN ↔ JA', speed: 'slow' },
  { from: 'par', to: 'add', pair: 'FR ↔ AM', speed: 'normal' },
  { from: 'del', to: 'lon', pair: 'HI ↔ EN', speed: 'normal' },
  { from: 'dxb', to: 'ber', pair: 'AR ↔ DE', speed: 'fast' },
  { from: 'nbo', to: 'gva', pair: 'SW ↔ FR', speed: 'slow' },
  { from: 'pek', to: 'nyc', pair: 'ZH ↔ EN', speed: 'fast' },
  { from: 'ist', to: 'cai', pair: 'TR ↔ AR', speed: 'slow' },
  { from: 'sel', to: 'sin', pair: 'KO ↔ EN', speed: 'normal' },
  { from: 'lon', to: 'ryadh', pair: 'EN ↔ AR', speed: 'normal' },
  { from: 'ber', to: 'jeddah', pair: 'DE ↔ AR', speed: 'slow' },
]

const capitalById = (id: string) => CAPITALS.find((c) => c.id === id)!

function arcPath(a: Capital, b: Capital): string {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  // lift the midpoint perpendicular to the chord → arc
  const lift = Math.min(len * 0.28, 90)
  const nx = -dy / (len || 1)
  const ny = dx / (len || 1)
  const cx = mx + nx * lift
  const cy = my + ny * lift
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
}

/* ── Active channels roster (= the services, reframed as live operations) ── */
type Channel = {
  code: string
  name: string
  state: 'LIVE' | 'QUEUED' | 'EN ROUTE' | 'SEALING'
  detail: string
  pair: string
  ops: number
}

const CHANNELS: Channel[] = [
  {
    code: 'INT-01',
    name: 'Conference Interpretation',
    state: 'LIVE',
    detail: 'UN Security Council — informal consultation, chamber relay',
    pair: 'EN · FR · ZH · RU · ES',
    ops: 4,
  },
  {
    code: 'TR-02',
    name: 'Document Translation',
    state: 'SEALING',
    detail: 'Bilateral framework agreement, certified seal pending',
    pair: 'AR ↔ EN',
    ops: 1,
  },
  {
    code: 'TRC-03',
    name: 'RMLingo Transcription',
    state: 'EN ROUTE',
    detail: 'Closed-door bilateral, verbatim under chain-of-custody',
    pair: 'FR ↔ EN',
    ops: 2,
  },
  {
    code: 'ADV-04',
    name: 'Multilingual Consultation',
    state: 'QUEUED',
    detail: 'Protocol & register advisory for incoming delegation',
    pair: 'JA ↔ EN',
    ops: 1,
  },
]

const stateColor: Record<Channel['state'], string> = {
  LIVE: C.gold,
  QUEUED: C.muted,
  'EN ROUTE': C.ivory,
  SEALING: C.goldBright,
}

/* ── Dispatch ticker — cycling live entries ── */
const DISPATCHES = [
  {
    t: '04:12:08',
    loc: 'GVA → WDC',
    msg: 'Simultaneous relay engaged — Security Council informal.',
  },
  {
    t: '04:11:51',
    loc: 'DXB → BER',
    msg: 'Arabic–German certified draft sealed and transmitted.',
  },
  {
    t: '04:11:33',
    loc: 'PEK → NYC',
    msg: 'Mandarin–English consecutive channel opened.',
  },
  {
    t: '04:10:47',
    loc: 'NBO → GVA',
    msg: 'Swahili–French relay handoff confirmed in chamber.',
  },
  {
    t: '04:10:20',
    loc: 'PAR → ADD',
    msg: 'Français–Amharique advisory dispatched to observer mission.',
  },
  {
    t: '04:09:55',
    loc: 'LON → RUH',
    msg: 'English–Arabic note verbale translation queue cleared.',
  },
  {
    t: '04:09:12',
    loc: 'DEL → LON',
    msg: 'Hindi–English verbatim transcription under custody.',
  },
  {
    t: '04:08:39',
    loc: 'SEL → SIN',
    msg: 'Korean–English briefing pack filed to delegation.',
  },
]

/* ─────────────────────────────── Components ─────────────────────────────── */

function LiveBadge() {
  return (
    <span
      className="atlas-live-dot inline-flex items-center gap-2"
      style={{
        fontFamily: 'var(--font-mono)',
        color: C.gold,
        fontSize: 11,
        letterSpacing: '0.18em',
      }}
    >
      <span
        className="atlas-breathe"
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          backgroundColor: C.gold,
          boxShadow: `0 0 8px ${C.gold}`,
          display: 'inline-block',
        }}
      />
      LIVE · UTC 04:12
    </span>
  )
}

function Ticker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % DISPATCHES.length), 3400)
    return () => clearInterval(t)
  }, [])
  const d = DISPATCHES[i]
  return (
    <div
      className="atlas-ticker-line flex items-center gap-5"
      key={i}
      style={{ fontFamily: 'var(--font-mono)', color: C.ivory, fontSize: 13 }}
    >
      <span style={{ color: C.gold, letterSpacing: '0.1em' }}>{d.t}</span>
      <span style={{ color: C.muted }}>│</span>
      <span style={{ color: C.goldBright, letterSpacing: '0.12em' }}>
        {d.loc}
      </span>
      <span style={{ color: C.muted }}>│</span>
      <span style={{ color: C.ivory, opacity: 0.85 }}>{d.msg}</span>
    </div>
  )
}

function FlowMap() {
  return (
    <svg
      viewBox="0 0 1000 520"
      className="h-full w-full"
      style={{ display: 'block' }}
    >
      {/* faint graticule */}
      <g stroke={C.hair} strokeWidth={0.5} fill="none">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`gx${i}`} x1={i * 100} y1={0} x2={i * 100} y2={520} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`gy${i}`} x1={0} y1={i * 104} x2={1000} y2={i * 104} />
        ))}
      </g>

      {/* latitude band labels */}
      <g
        fill={C.muted}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: '0.15em',
        }}
      >
        <text x={6} y={178} opacity={0.5}>
          N 45°
        </text>
        <text x={6} y={282} opacity={0.5}>
          N 23°
        </text>
        <text x={6} y={386} opacity={0.5}>
          S 02°
        </text>
      </g>

      {/* flow arcs */}
      <g fill="none">
        {FLOWS.map((f, i) => {
          const a = capitalById(f.from)
          const b = capitalById(f.to)
          const speedClass =
            f.speed === 'fast' ? 'fast' : f.speed === 'slow' ? 'slow' : ''
          return (
            <g key={`flow-${i}`}>
              {/* ghost base arc */}
              <path
                d={arcPath(a, b)}
                stroke={C.hairStrong}
                strokeWidth={0.8}
                fill="none"
              />
              {/* animated flow */}
              <path
                d={arcPath(a, b)}
                stroke={C.gold}
                strokeWidth={1.4}
                fill="none"
                className={`atlas-arc-flow ${speedClass}`}
                style={{ filter: `drop-shadow(0 0 3px ${C.gold}55)` }}
              />
              {/* mid-arc language-pair tag */}
              {(() => {
                const mx = (a.x + b.x) / 2
                const my = (a.y + b.y) / 2 - 6
                return (
                  <text
                    x={mx}
                    y={my}
                    textAnchor="middle"
                    fill={C.goldBright}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 8,
                      letterSpacing: '0.08em',
                    }}
                    opacity={0.7}
                  >
                    {f.pair}
                  </text>
                )
              })()}
            </g>
          )
        })}
      </g>

      {/* capitals */}
      <g>
        {CAPITALS.map((cap) => {
          const isActive = cap.status === 'active'
          const isRelay = cap.status === 'relay'
          const fill = isActive ? C.gold : isRelay ? C.ivory : C.muted
          const r = isActive ? 4 : isRelay ? 3 : 2.2
          return (
            <g key={cap.id} transform={`translate(${cap.x} ${cap.y})`}>
              {isActive && (
                <>
                  <circle
                    r={r}
                    fill={C.gold}
                    className="atlas-ping"
                    opacity={0.5}
                  />
                  <circle
                    r={r}
                    fill={C.gold}
                    className="atlas-ping delay-1"
                    opacity={0.4}
                  />
                  <circle
                    r={r}
                    fill={C.gold}
                    className="atlas-ping delay-2"
                    opacity={0.3}
                  />
                </>
              )}
              <circle
                r={r}
                fill={fill}
                className={isActive ? 'atlas-breathe' : undefined}
                style={
                  isActive
                    ? { filter: `drop-shadow(0 0 5px ${C.gold})` }
                    : undefined
                }
              />
              <text
                x={r + 5}
                y={3}
                fill={isActive ? C.ivory : C.muted}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: isActive ? 9.5 : 8.5,
                  letterSpacing: '0.04em',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {cap.city}
              </text>
              {isActive && (
                <text
                  x={r + 5}
                  y={14}
                  fill={C.gold}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 7,
                    letterSpacing: '0.1em',
                  }}
                  opacity={0.85}
                >
                  ACTIVE
                </text>
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

function ChannelRow({ ch }: { ch: Channel }) {
  return (
    <div
      className="atlas-channel grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b px-6 py-7"
      style={{ borderColor: C.hair }}
    >
      {/* code + state */}
      <div className="flex flex-col gap-2">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: C.muted,
            letterSpacing: '0.14em',
          }}
        >
          {ch.code}
        </span>
        <span
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: stateColor[ch.state],
            letterSpacing: '0.16em',
          }}
        >
          {ch.state === 'LIVE' && (
            <span
              className="atlas-live-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                backgroundColor: C.gold,
                display: 'inline-block',
              }}
            />
          )}
          {ch.state}
        </span>
      </div>

      {/* name + detail */}
      <div className="min-w-0">
        <h3
          className="truncate"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: C.ivory,
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          {ch.name}
        </h3>
        <p
          className="mt-1.5 truncate"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.5,
          }}
        >
          {ch.detail}
        </p>
        <span
          className="mt-2 inline-block"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: C.gold,
            letterSpacing: '0.12em',
          }}
        >
          {ch.pair}
        </span>
      </div>

      {/* ops count */}
      <div className="flex flex-col items-end gap-1">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 30,
            color: C.ivory,
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          {ch.ops.toString().padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: C.muted,
            letterSpacing: '0.16em',
          }}
        >
          LINGUISTS
        </span>
      </div>
    </div>
  )
}

/* ───────────────────────────────── Main ───────────────────────────────── */

export default function OperationsAtlas() {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={rootRef}
      className="atlas-root relative min-h-[100dvh] w-full overflow-x-hidden"
      style={{ backgroundColor: C.ground, color: C.ivory }}
    >
      {/* drifting graticule grid */}
      <div
        className="atlas-grid pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(${C.hair} 1px, transparent 1px), linear-gradient(90deg, ${C.hair} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          opacity: 0.5,
        }}
      />
      {/* topo texture overlay */}
      <img
        src="/__mockup/images/diplomatic-atlas-topo.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.12, mixBlendMode: 'screen' }}
      />
      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `radial-gradient(120% 90% at 50% 30%, transparent 40%, ${C.ground} 100%)`,
        }}
      />

      {/* ─────────────── Navigation ─────────────── */}
      <nav className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between px-6 pt-7 md:px-12">
        <div className="flex items-center gap-4">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 15,
              color: C.ivory,
              letterSpacing: '0.14em',
              fontWeight: 500,
            }}
          >
            RMLingo
          </span>
          <span
            className="hidden h-px w-10 md:block"
            style={{ backgroundColor: C.gold }}
          />
          <span
            className="hidden md:block"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: C.muted,
              letterSpacing: '0.2em',
            }}
          >
            OPS · ATLAS
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {['Operations', 'Languages', 'Missions', 'Contact'].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                color: C.ivory,
                letterSpacing: '0.14em',
                opacity: 0.7,
              }}
              className="transition-opacity hover:opacity-100"
            >
              {l}
            </a>
          ))}
          <LiveBadge />
        </div>
        <div className="md:hidden">
          <LiveBadge />
        </div>
      </nav>

      {/* ─────────────── Dispatch ticker ─────────────── */}
      <div className="relative z-20 mx-auto mt-6 max-w-[1320px] px-6 md:px-12">
        <div
          className="flex items-center gap-4 overflow-hidden border-y px-5 py-3"
          style={{ borderColor: C.hair, backgroundColor: 'rgba(15,30,51,0.5)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: C.gold,
              letterSpacing: '0.2em',
            }}
          >
            DISPATCH
          </span>
          <span
            className="h-4 w-px"
            style={{ backgroundColor: C.hairStrong }}
          />
          <div className="min-w-0 flex-1 overflow-hidden">
            <Ticker />
          </div>
        </div>
      </div>

      {/* ─────────────── Hero — atlas + headline ─────────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-6 pb-10 pt-14 md:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* headline column */}
          <div
            className="atlas-rise flex flex-col justify-center"
            style={{ animationDelay: '0.1s' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: C.gold,
                letterSpacing: '0.22em',
              }}
            >
              OPERATIONS BRIEF — {new Date().getFullYear()}
            </span>
            <h1
              className="mt-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: '-0.01em',
              }}
            >
              <span
                className="block"
                style={{ fontSize: 'clamp(2.6rem,6vw,4.6rem)', color: C.ivory }}
              >
                Diplomacy
              </span>
              <span
                className="block italic"
                style={{ fontSize: 'clamp(2.6rem,6vw,4.6rem)', color: C.ivory }}
              >
                never sleeps.
              </span>
              <span
                className="mt-3 block"
                style={{
                  fontSize: 'clamp(1.1rem,1.6vw,1.4rem)',
                  color: C.muted,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                  maxWidth: 460,
                }}
              >
                Twenty years of interpretation, translation, and transcription —
                rendered across{' '}
                <span style={{ color: C.gold }}>87 language pairs</span> and
                twenty-two capitals, in continuous session.
              </span>
            </h1>

            <div
              className="mt-9 h-px w-24"
              style={{ backgroundColor: C.gold }}
            />

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:gap-10">
              <a
                href="#"
                className="group inline-flex items-center gap-3"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: C.ivory,
                  letterSpacing: '0.14em',
                }}
              >
                <span
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: C.gold }}
                >
                  →
                </span>
                Open the operations log
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: C.muted,
                  letterSpacing: '0.14em',
                }}
              >
                <span style={{ color: C.muted }}>→</span>
                Request interpretation
              </a>
            </div>
          </div>

          {/* atlas column */}
          <div
            className="atlas-rise relative"
            style={{ animationDelay: '0.25s' }}
          >
            <div
              className="relative overflow-hidden border"
              style={{
                borderColor: C.hair,
                backgroundColor: C.panel,
                aspectRatio: '1000 / 520',
              }}
            >
              <FlowMap />
              {/* map legend */}
              <div
                className="absolute bottom-3 left-4 flex flex-wrap items-center gap-x-5 gap-y-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: C.muted,
                  letterSpacing: '0.14em',
                }}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      backgroundColor: C.gold,
                      display: 'inline-block',
                    }}
                  />
                  ACTIVE
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 999,
                      backgroundColor: C.ivory,
                      display: 'inline-block',
                    }}
                  />
                  RELAY
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 999,
                      backgroundColor: C.muted,
                      display: 'inline-block',
                    }}
                  />
                  STANDBY
                </span>
              </div>
              <div
                className="absolute right-4 top-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: C.muted,
                  letterSpacing: '0.2em',
                }}
              >
                FIG. 01 · LIVE FLOW
              </div>
            </div>

            {/* stat strip under map */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                { v: '12', l: 'ACTIVE CHANNELS' },
                { v: '22', l: 'CAPITALS' },
                { v: '87', l: 'LANGUAGE PAIRS' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="border px-4 py-3"
                  style={{
                    borderColor: C.hair,
                    backgroundColor: 'rgba(15,30,51,0.4)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 26,
                      color: C.ivory,
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      color: C.muted,
                      letterSpacing: '0.16em',
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Active channels roster ─────────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-6 py-20 md:px-12">
        <div className="flex items-end justify-between gap-6">
          <div className="atlas-rise">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: C.gold,
                letterSpacing: '0.22em',
              }}
            >
              ACTIVE CHANNELS
            </span>
            <h2
              className="mt-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem,3.6vw,3rem)',
                color: C.ivory,
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: '-0.01em',
              }}
            >
              Four disciplines,{' '}
              <span className="italic" style={{ color: C.gold }}>
                in continuous session.
              </span>
            </h2>
          </div>
          <span
            className="hidden shrink-0 md:block"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: C.muted,
              letterSpacing: '0.18em',
            }}
          >
            REFRESHED 04:12 UTC
          </span>
        </div>

        <div className="mt-10 border-t" style={{ borderColor: C.hair }}>
          {CHANNELS.map((c) => (
            <ChannelRow key={c.code} ch={c} />
          ))}
        </div>

        <p
          className="mt-6 max-w-xl"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          Every channel carries chain-of-custody protocols and certified seals.
          State updates in real time as assignments move from queue to chamber
          to archive.
        </p>
      </section>

      {/* ─────────────── Capitals registry strip ─────────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-6 pb-20 md:px-12">
        <div className="flex items-center gap-5">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: C.gold,
              letterSpacing: '0.22em',
            }}
          >
            CAPITALS REGISTRY
          </span>
          <span className="h-px flex-1" style={{ backgroundColor: C.hair }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: C.muted,
              letterSpacing: '0.18em',
            }}
          >
            22 STATIONS · 4 BUREAUS
          </span>
        </div>

        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
          {CAPITALS.map((cap) => (
            <span
              key={cap.id}
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                color: cap.status === 'active' ? C.ivory : C.muted,
                letterSpacing: '0.04em',
              }}
            >
              <span
                style={{
                  width: cap.status === 'active' ? 6 : 4,
                  height: cap.status === 'active' ? 6 : 4,
                  borderRadius: 999,
                  backgroundColor:
                    cap.status === 'active'
                      ? C.gold
                      : cap.status === 'relay'
                        ? C.ivory
                        : C.muted,
                  display: 'inline-block',
                  boxShadow:
                    cap.status === 'active' ? `0 0 6px ${C.gold}` : 'none',
                }}
              />
              {cap.city}
            </span>
          ))}
        </div>
      </section>

      {/* ─────────────── Footer ─────────────── */}
      <footer className="relative z-10 mx-auto max-w-[1320px] px-6 pb-10 md:px-12">
        <div
          className="h-px w-full"
          style={{ backgroundColor: C.gold, opacity: 0.6 }}
        />
        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: C.muted,
              letterSpacing: '0.12em',
            }}
          >
            © {new Date().getFullYear()} RMLingo
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              color: C.ivory,
              letterSpacing: '0.12em',
              fontStyle: 'italic',
            }}
          >
            Washington D.C. · New York · Geneva · Nairobi
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: C.gold,
              letterSpacing: '0.12em',
            }}
          >
            info@rmlingo.com
          </span>
        </div>
      </footer>
    </div>
  )
}
