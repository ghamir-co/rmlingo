import { useState, type FormEvent } from 'react'
import ScriptBackground from '@/components/ScriptBackground'
import Reveal from '@/components/Reveal'
import { ArrowRight } from 'lucide-react'

const LANGUAGE_PAIRS = [
  'Arabic ↔ English',
  'French ↔ English',
  'Spanish ↔ English',
  'Mandarin ↔ English',
  'Russian ↔ English',
  'German ↔ English',
  'Portuguese ↔ English',
  'Farsi ↔ English',
  'Hebrew ↔ English',
  'Amharic ↔ English',
  'Other (specify in message)',
]

const SERVICE_TYPES = [
  'Interpretation (Simultaneous/Consecutive)',
  'Interpretation (Sign-Language)',
  'Document Translation',
  'Editing & Proofreading',
  'Media Accessibility (Transcription/Captioning)',
  'Media Accessibility (Subtitling/Dubbing)',
  'Consultation & Training',
  'Localization & Relocation',
  'Event Technical Support & Equipment',
]

const INQUIRY_EMAIL = 'info@rmlingo.com'
const INQUIRY_PHONE = '+1 619-752-5604'

/**
 * The site is front-end only: there is no server to accept an inquiry. Rather
 * than implying a message was delivered, the form composes a prefilled email
 * that the visitor sends from their own mail client.
 */
function buildMailto(fields: {
  name: string
  organization: string
  languagePair: string
  serviceType: string
  message: string
}): string {
  const subject = fields.serviceType
    ? `Inquiry: ${fields.serviceType}`
    : 'Inquiry: Language services'

  const body = [
    `Name: ${fields.name || '—'}`,
    `Organization: ${fields.organization || '—'}`,
    `Language pair: ${fields.languagePair || '—'}`,
    `Service type: ${fields.serviceType || '—'}`,
    '',
    'Project details:',
    fields.message || '—',
  ].join('\n')

  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactPage() {
  const [prepared, setPrepared] = useState<string | null>(null)
  const [fields, setFields] = useState({
    name: '',
    organization: '',
    languagePair: '',
    serviceType: '',
    message: '',
  })

  const update =
    (key: keyof typeof fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!fields.name.trim() || !fields.message.trim()) return
    const mailto = buildMailto(fields)
    setPrepared(mailto)
    // Hand off to the visitor's mail client.
    window.location.href = mailto
  }

  return (
    <div className="relative">
      {/* Header */}
      <section className="relative min-h-[45dvh] w-full overflow-hidden px-6 md:px-12">
        <ScriptBackground />
        <div className="relative z-10 mx-auto flex min-h-[45dvh] max-w-[1400px] flex-col justify-center py-24">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            CONTACT
          </div>
          <div className="mt-3 h-px w-[80px] bg-accent" />
          <h1 className="mt-8 font-serif text-[44px] leading-[1.05] text-foreground md:text-[64px]">
            Begin a Conversation
          </h1>
          <p className="mt-6 max-w-[560px] font-serif text-[18px] italic text-muted-foreground md:text-[20px]">
            Write to us by email or telephone. Every engagement begins with a
            direct conversation.
          </p>
        </div>
      </section>

      {/* Form + offices */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-20 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            {prepared ? (
              <div
                className="border-l border-accent pl-8"
                data-testid="status-inquiry-prepared"
              >
                <h2 className="font-serif text-[28px] italic text-foreground md:text-[34px]">
                  Your email is ready to send.
                </h2>
                <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
                  We have opened a prefilled message to{' '}
                  <span className="text-foreground">{INQUIRY_EMAIL}</span> in
                  your email application. Your inquiry reaches RMLingo once
                  you send it from there.
                </p>
                <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
                  If nothing opened, use the direct link below, or telephone{' '}
                  <a
                    href={`tel:${INQUIRY_PHONE.replace(/[^+\d]/g, '')}`}
                    className="text-foreground underline decoration-accent underline-offset-4"
                  >
                    {INQUIRY_PHONE}
                  </a>{' '}
                  for urgent interpretation needs.
                </p>

                <a
                  href={prepared}
                  className="di-underline mt-8 inline-block text-[14px] uppercase tracking-[0.18em] text-foreground"
                  data-testid="link-open-email-draft"
                >
                  Open the email draft →
                </a>
                <br />
                <button
                  onClick={() => setPrepared(null)}
                  className="di-underline mt-6 text-[14px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                  data-testid="button-edit-inquiry"
                >
                  ← Edit the details
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-[640px]"
                noValidate
              >
                <p className="mb-10 max-w-[560px] text-[14px] leading-relaxed text-muted-foreground">
                  Complete the details below and we will compose the message in
                  your email application, ready for you to send to{' '}
                  {INQUIRY_EMAIL}.
                </p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={fields.name}
                      onChange={update('name')}
                      className="border-b border-primary bg-transparent py-3 text-[16px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
                      placeholder="Full name"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="organization"
                      className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      value={fields.organization}
                      onChange={update('organization')}
                      className="border-b border-primary bg-transparent py-3 text-[16px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
                      placeholder="Mission, agency, or institution"
                      data-testid="input-organization"
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-2">
                  <label
                    htmlFor="languagePair"
                    className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Language Pair
                  </label>
                  <select
                    id="languagePair"
                    name="languagePair"
                    className="border-b border-primary bg-background py-3 text-[16px] text-foreground outline-none transition-colors focus:border-accent"
                    data-testid="select-language-pair"
                    value={fields.languagePair}
                    onChange={update('languagePair')}
                  >
                    <option value="" disabled>
                      Select a language pair
                    </option>
                    {LANGUAGE_PAIRS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-10 flex flex-col gap-2">
                  <label
                    htmlFor="serviceType"
                    className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    className="border-b border-primary bg-background py-3 text-[16px] text-foreground outline-none transition-colors focus:border-accent"
                    data-testid="select-service-type"
                    value={fields.serviceType}
                    onChange={update('serviceType')}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-10 flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={fields.message}
                    onChange={update('message')}
                    className="border-b border-primary bg-transparent py-3 text-[16px] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
                    placeholder="Describe the engagement, dates, and any protocol considerations."
                    data-testid="input-message"
                  />
                </div>

                <button
                  type="submit"
                  className="di-underline group mt-12 flex items-center gap-3 text-[14px] uppercase tracking-[0.18em] text-foreground"
                  data-testid="button-submit-inquiry"
                >
                  Compose Inquiry Email
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </Reveal>

          {/* Offices */}
          <Reveal delay={0.1}>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              CONTACT INFORMATION
            </div>
            <div className="mt-3 h-px w-[60px] bg-accent" />

            <div className="mt-12 space-y-12">
              <div>
                <h3 className="font-serif text-[24px] text-foreground md:text-[28px]">
                  Global Headquarters
                </h3>
                <div className="mt-3 space-y-1">
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    Available for global deployments and remote engagements.
                  </p>
                  <p className="mt-4 text-[15px] text-foreground">
                    +1 619-752-5604
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
                  General Inquiries
                </p>
                <a
                  href="mailto:info@rmlingo.com"
                  className="mt-2 inline-block text-[15px] text-foreground underline decoration-accent underline-offset-4"
                >
                  info@rmlingo.com
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
