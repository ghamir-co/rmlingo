export default function Footer() {
  return (
    <footer className="mt-24">
      {/* Thin full-width gold rule */}
      <div className="h-px w-full bg-accent" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-12">
        {/* Left — copyright */}
        <div className="text-[12px] text-muted-foreground md:text-start">
          © {new Date().getFullYear()} RMLingo
          <br />
          <span className="mt-1 inline-block text-[11px]">Founded 2003</span>
        </div>

        {/* Center — wordmark */}
        <div className="text-center">
          <span
            className="font-serif text-[12px] text-foreground"
            style={{ fontVariant: 'small-caps', letterSpacing: '0.14em' }}
          >
            RMLingo
          </span>
        </div>

        {/* Right — offices / contact */}
        <div className="text-[12px] text-muted-foreground md:text-end">
          +1 619-752-5604 &nbsp;|&nbsp; info@rmlingo.com
        </div>
      </div>
    </footer>
  )
}
