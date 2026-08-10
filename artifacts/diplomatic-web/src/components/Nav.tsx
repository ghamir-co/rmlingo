import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, Languages } from 'lucide-react'
import { useI18n } from '@/i18n'

export default function Nav() {
  const { dict, toggle } = useI18n()
  const [open, setOpen] = useState(false)
  const [location] = useLocation()

  const LINKS = [
    { label: dict.nav.services, href: '/services' },
    { label: dict.nav.insights, href: '/insights' },
    { label: dict.nav.about, href: '/about' },
    { label: dict.nav.contact, href: '/contact' },
  ]

  const isActive = (href: string) => {
    const path = href.split('#')[0]
    if (path === '/') return location === '/'
    return location === path
  }

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex flex-col"
          data-testid="link-home"
          onClick={() => setOpen(false)}
        >
          <span className="flex items-center gap-2.5">
            <span className="star-eight shrink-0" aria-hidden="true" />
            <span
              className="font-serif text-[15px] small-caps leading-none tracking-[0.12em] text-foreground"
              style={{ fontVariant: 'small-caps' }}
            >
              RMLingo
            </span>
          </span>
          <span className="mt-1.5 block h-px w-[60px] bg-accent transition-all duration-500 group-hover:w-[120px] ms-[26px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`di-underline text-[13px] uppercase tracking-[0.18em] transition-colors ${
                isActive(l.href)
                  ? 'text-foreground'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              data-testid={`link-nav-${l.href.replace(/\W/g, '')}`}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="di-underline flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
            data-testid="button-toggle-lang"
            aria-label="Toggle language"
            title="Switch between Arabic and English"
          >
            <Languages size={13} aria-hidden="true" />
            {dict.nav.toggleDesktop}
          </button>
          <span className="ms-4 uppercase tracking-[0.2em] text-muted-foreground text-[11px]">
            {dict.nav.est}
          </span>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
          data-testid="button-menu-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-5 border-t border-border bg-background px-6 py-6 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[13px] uppercase tracking-[0.18em] text-foreground"
              data-testid={`link-nav-mobile-${l.href.replace(/\W/g, '')}`}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-2 text-start text-[12px] uppercase tracking-[0.18em] text-muted-foreground"
            data-testid="button-toggle-lang-mobile"
          >
            <Languages size={14} aria-hidden="true" />
            {dict.nav.toggleMobile}
          </button>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {dict.nav.est}
          </span>
        </nav>
      )}
    </header>
  )
}
