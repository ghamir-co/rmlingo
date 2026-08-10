import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { Link } from 'wouter'

const SERVICES = [
  {
    num: '01',
    name: 'Interpretation Services',
    desc: 'Comprehensive interpretation solutions spanning simultaneous, consecutive, and whispered (chuchotage) modes. We deploy accredited linguists for high-stakes diplomatic gatherings, available via secure remote platforms or deployed on-site globally. Including certified sign-language interpretation for inclusive international forums.',
  },
  {
    num: '02',
    name: 'Document Translation',
    desc: 'Certified translation of treaties, diplomatic notes, legal instruments, protocols, and institutional communications. Every document carries the weight of its original register, reviewed by linguists with subject-matter expertise in international law and diplomacy.',
  },
  {
    num: '03',
    name: 'Editing & Proofreading',
    desc: 'Rigorous editorial review enforcing institutional style guides and terminological consistency. We ensure translated outputs maintain absolute fidelity to the source intent, guaranteeing public-facing and internal communications are flawless.',
  },
  {
    num: '04',
    name: 'Media Accessibility',
    desc: 'Secure, verbatim transcription of proceedings, testimony, and confidential deliberations. We also provide professional captioning, subtitling, dubbing, and voiceover for multimedia assets, bridging the gap between spoken word and global audience comprehension.',
  },
  {
    num: '05',
    name: 'Localization & Relocation',
    desc: 'Beyond literal translation, we adapt institutional communications, public diplomacy materials, and software for target audiences. Additionally, we provide comprehensive linguistic relocation support for staff moving across regions.',
  },
  {
    num: '06',
    name: 'Consultation & Training',
    desc: 'Strategic language advisory for cross-border communications, negotiation preparation, and protocol-sensitive messaging. We offer specialized training for principals and teams to navigate complex linguistic environments effectively.',
  },
  {
    num: '07',
    name: 'Technical Support & Equipment',
    desc: 'End-to-end technical deployment for multilingual events. We provide and operate soundproof booths, receiver systems, and digital interpretation platforms, overseen by experienced on-site engineers ensuring zero interruption.',
  },
]

const LANGUAGE_FAMILIES = [
  {
    family: 'Primary Focus',
    languages: ['Arabic', 'English'],
  },
  {
    family: 'Global Multilingual',
    languages: [
      'French',
      'Spanish',
      'Portuguese',
      'German',
      'Russian',
      'Mandarin',
    ],
  },
  {
    family: 'Regional Specialized',
    languages: ['Farsi', 'Pashto', 'Hebrew', 'Amharic', 'Tigrinya', 'Somali'],
  },
]

export default function ServicesPage() {
  return (
    <div className="relative">
      {/* Page header */}
      <section className="relative min-h-[70dvh] w-full overflow-hidden px-6 md:px-12">
        <ScriptBackground />
        <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-[1400px] flex-col justify-center py-24">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            SERVICES
          </div>
          <div className="mt-3 h-px w-[80px] bg-accent" />
          <h1 className="mt-8 max-w-[900px] font-serif text-[44px] leading-[1.05] text-foreground md:text-[68px]">
            A full spectrum of linguistic services, rendered to institutional
            standard.
          </h1>
          <p className="mt-8 max-w-[600px] font-serif text-[18px] italic text-muted-foreground md:text-[20px]">
            From the General Assembly floor to a closed bilateral, every
            engagement meets the same threshold: indistinguishable from the
            original.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05} x={-30}>
              <div className="relative border-b border-border py-14">
                <span
                  className="pointer-events-none absolute -top-6 left-0 font-serif text-[120px] leading-none text-foreground/[0.07] md:text-[180px]"
                  aria-hidden="true"
                >
                  {s.num}
                </span>
                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.8fr] md:gap-16">
                  <h3 className="font-serif text-[26px] leading-tight text-foreground md:text-[36px]">
                    {s.name}
                  </h3>
                  <p className="max-w-[640px] text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Language families */}
      <section id="languages" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              LANGUAGES SERVED
            </div>
            <div className="mt-3 h-px w-[80px] bg-accent" />
            <h2 className="mt-8 font-serif text-[32px] italic text-foreground md:text-[44px]">
              Expertise anchored in Arabic and English, extending across the
              globe.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {LANGUAGE_FAMILIES.map((f) => (
              <Reveal key={f.family} className="bg-background p-10">
                <h3 className="font-serif text-[24px] text-foreground md:text-[28px]">
                  {f.family}
                </h3>
                <div className="mt-3 h-px w-[40px] bg-accent" />
                <ul className="mt-6 space-y-2.5">
                  {f.languages.map((lang) => (
                    <li
                      key={lang}
                      className="text-[15px] text-muted-foreground"
                    >
                      {lang}
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
              Engagements begin with a conversation.
            </p>
            <Link
              href="/contact"
              className="di-underline mt-6 inline-block text-[14px] uppercase tracking-[0.18em] text-foreground"
              data-testid="link-services-contact"
            >
              Request Consultation →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
