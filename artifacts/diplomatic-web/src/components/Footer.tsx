import { Link } from 'wouter'
import { useI18n } from '@/i18n'

export default function Footer() {
  const { dict } = useI18n()
  const t = dict.footer

  const NAV_LINKS = [
    { label: dict.nav.services, href: '/services' },
    { label: dict.nav.insights, href: '/insights' },
    { label: dict.nav.about, href: '/about' },
    { label: dict.nav.contact, href: '/contact' },
  ]

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 md:grid-cols-4 md:gap-12 md:px-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span
            className="font-serif text-[15px] text-foreground"
            style={{ fontVariant: 'small-caps', letterSpacing: '0.12em' }}
          >
            RMLingo
          </span>
          <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-muted-foreground">
            {t.tagline}
          </p>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {t.navigate}
          </h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="di-underline text-[13px] text-foreground/80 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {dict.nav.services}
          </h4>
          <ul className="mt-5 space-y-3">
            {dict.home.services.map((s) => (
              <li key={s.name}>
                <Link
                  href="/services"
                  className="di-underline text-[13px] text-foreground/80 hover:text-foreground"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {dict.nav.contact}
          </h4>
          <div className="mt-5 space-y-3 text-[13px] text-foreground/80">
            <a
              href="tel:+16197525604"
              dir="ltr"
              className="di-underline block w-fit hover:text-foreground"
            >
              +1 619-752-5604
            </a>
            <a
              href="mailto:info@rmlingo.com"
              dir="ltr"
              className="di-underline block w-fit break-all hover:text-foreground"
            >
              info@rmlingo.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-6 text-[11px] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
          <span>
            © {new Date().getFullYear()} RMLingo. {t.founded}
          </span>
          <span className="uppercase tracking-[0.15em]">{t.motto}</span>
        </div>
      </div>
    </footer>
  )
}
