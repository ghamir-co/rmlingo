import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()

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
          <span
            className="font-serif text-[15px] small-caps leading-none tracking-[0.12em] text-foreground"
            style={{ fontVariant: 'small-caps' }}
          >
            RMLingo
          </span>
          <span className="mt-1.5 block h-px w-[60px] bg-accent transition-all duration-500 group-hover:w-[120px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`di-underline text-[13px] uppercase tracking-[0.18em] transition-colors ${
                isActive(l.href)
                  ? 'text-foreground'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              data-testid={`link-nav-${l.label.toLowerCase()}`}
            >
              {l.label}
            </Link>
          ))}
          <span className="ml-4 uppercase tracking-[0.2em] text-muted-foreground text-[11px]">
            Est. 2003
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
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[13px] uppercase tracking-[0.18em] text-foreground"
              data-testid={`link-nav-mobile-${l.label.toLowerCase()}`}
            >
              {l.label}
            </Link>
          ))}
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Est. 2003
          </span>
        </nav>
      )}
    </header>
  )
}
