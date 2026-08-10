import { Link } from 'wouter'
import ScriptBackground from '@/components/ScriptBackground'
import { useI18n } from '@/i18n'

export default function NotFound() {
  const { dict } = useI18n()

  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="hero-deep absolute inset-0" aria-hidden="true" />
      <div
        className="geometric-pattern pointer-events-none absolute inset-0 z-0 opacity-40"
        aria-hidden="true"
      />
      <ScriptBackground />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-6 text-center">
        <div className="text-[11px] uppercase tracking-[0.25em] text-gold-bright">
          404
        </div>
        <div className="mt-3 h-px w-[60px] bg-gold-bright/80" />
        <h1 className="mt-10 font-serif text-[38px] leading-tight text-hero-foreground md:text-[56px]">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 max-w-[480px] font-serif text-[17px] italic leading-relaxed text-hero-foreground/70 md:text-[19px]">
          {dict.notFound.subtitle}
        </p>
        <Link
          href="/"
          className="di-underline mt-12 text-[14px] uppercase tracking-[0.18em] text-gold-bright"
          data-testid="link-notfound-home"
        >
          RMLingo
        </Link>
      </div>
    </div>
  )
}
