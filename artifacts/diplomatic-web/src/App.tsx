import { lazy, Suspense, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Spinner } from '@/components/ui/spinner'
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'

// Route-level code splitting: secondary routes are lazy-loaded so the initial
// bundle only contains what the landing page needs. Improves FCP/LCP/TTI.
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.default })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.default })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.default })),
)
const InsightsPage = lazy(() =>
  import('@/pages/InsightsPage').then((m) => ({ default: m.default })),
)
const ArticlePage = lazy(() =>
  import('@/pages/ArticlePage').then((m) => ({ default: m.default })),
)
const NotFound = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.default })),
)

const queryClient = new QueryClient()

/** App shell: persistent nav + footer wrapping routed pages. */
function Shell() {
  const [location] = useLocation()

  // Scroll to top (or to hash target) on route change.
  useEffect(() => {
    const hashIndex = location.indexOf('#')
    if (hashIndex !== -1) {
      const id = location.slice(hashIndex + 1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Nav />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Spinner className="size-8" />
            </div>
          }
        >
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/insights" component={InsightsPage} />
            <Route path="/insights/:slug" component={ArticlePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Shell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
