import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'

const VALUES = [
  {
    label: 'Precision',
    desc: 'Every rendering is measured against the original utterance. A misplaced register can alter a negotiation; a softened verb can redraw a boundary. We treat exactness as a diplomatic instrument, not a stylistic preference.',
  },
  {
    label: 'Confidentiality',
    desc: 'Our linguists operate under the same discretion expected of the principals they serve. Protocols, clearances, and chain-of-custody are not add-ons — they are the conditions under which we work.',
  },
  {
    label: 'Cultural Fluency',
    desc: 'Language is the surface of culture. We render not only what is said but what is meant, carrying idiom, honorific, and historical weight across the distance between one worldview and another.',
  },
]

const LEADERSHIP = [
  {
    name: 'Dr. Rawan Manna',
    title: 'Founder & Managing Director',
    bio: 'Founded RMLingo in 2003. A renowned language specialist orchestrating high-stakes institutional engagements across the globe, with particular expertise bridging Arabic and English diplomatic contexts.',
  },
]

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero quote */}
      <section className="relative min-h-[60dvh] w-full overflow-hidden px-6 md:px-12">
        <ScriptBackground />
        <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-[1000px] flex-col items-center justify-center py-24 text-center">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              ABOUT
            </div>
            <div className="mx-auto mt-3 h-px w-[80px] bg-accent" />
            <blockquote className="mt-10 font-serif text-[34px] italic leading-[1.2] text-foreground md:text-[48px]">
              “Precision is not merely a technical standard. It is a diplomatic
              imperative.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Founding narrative */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              FOUNDED 2003
            </div>
            <div className="mt-3 h-px w-[60px] bg-accent" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 font-serif text-[19px] leading-[1.7] text-foreground md:text-[21px]">
              RMLingo was established in 2003 by Dr. Rawan
              Manna to provide interpretation and translation worthy of the word
              "diplomatic." Recognizing that global institutions rely on nuance
              and precision, she built a practice dedicated to absolute
              fidelity.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 font-serif text-[19px] leading-[1.7] text-muted-foreground md:text-[21px]">
              Rooted in deep expertise with the Arabic-English pairing, the firm
              rapidly expanded into a multilingual global language service.
              Today, whether delivering remote simultaneous interpretation for a
              UN session or translating a pivotal treaty, RMLingo serves the
              organizations that shape the world.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-[1100px]">
          <Reveal delay={0.2}>
            <figure>
              <img
                src={`${import.meta.env.BASE_URL}media/field/language-services-overview.png`}
                alt="A delegate holds Arabic-language conference papers beside a wireless interpretation receiver and earpiece during an on-site session."
                width={1024}
                height={669}
                loading="lazy"
                className="w-full object-cover"
              />
              <figcaption className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                On-site interpretation in practice: receivers, briefing
                documents, and prepared terminology at a working session.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              WHAT WE HOLD
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16">
            {VALUES.map((v, i) => (
              <Reveal key={v.label} delay={i * 0.08} x={-30}>
                <div className="grid grid-cols-1 gap-6 border-b border-border py-12 md:grid-cols-[0.8fr_1.8fr] md:gap-16">
                  <h3 className="font-serif text-[28px] italic text-foreground md:text-[40px]">
                    {v.label}
                  </h3>
                  <p className="max-w-[640px] text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
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
              LEADERSHIP
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
          </Reveal>

          <div className="mt-16">
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} x={-30}>
                <div className="grid grid-cols-1 gap-3 border-b border-border py-10 md:grid-cols-[1fr_1fr_2fr] md:gap-12">
                  <h3 className="font-serif text-[22px] text-foreground md:text-[26px]">
                    {p.name}
                  </h3>
                  <span className="text-[12px] uppercase tracking-[0.15em] text-accent md:mt-2">
                    {p.title}
                  </span>
                  <p className="max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">
                    {p.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
