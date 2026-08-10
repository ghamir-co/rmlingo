# RMLingo

A prestigious marketing website for a US-based language interpretation and translation firm (est. 2003) serving diplomatic missions, UN agencies, and global corporate entities.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/diplomatic-web/` — main marketing website (React + Vite, presentation-first, no backend)
- `artifacts/diplomatic-web/src/index.css` — palette tokens (navy/ivory/gold) and font variables
- `artifacts/diplomatic-web/src/components/ScriptBackground.tsx` — signature Arabic/English palimpsest background
- `artifacts/diplomatic-web/src/pages/` — HomePage, ServicesPage, AboutPage, ContactPage
- `artifacts/mockup-sandbox/src/components/mockups/diplomatic-homepage/` — earlier canvas mockup

## Architecture decisions

- **Presentation-first, no backend**: Site is pure React/Vite with no API or database — all content is static.
- **`--radius: 0rem`**: Sharp corners everywhere; no SaaS rounding — this is editorial, not a product.
- **ScriptBackground** renders Arabic (Amiri font) + English at 4–9% opacity — pure CSS, no images.
- **framer-motion** handles all entrance animations (staggered hero lines, scroll-triggered sections).
- Palette is set via CSS HSL variables in `index.css`; all `red` placeholders have been replaced.

## Product

- 4-page marketing site: Home, Services, About, Contact
- Typographic hero with Arabic/English script background (palimpsest aesthetic)
- Editorial services overview (no card grids), trusted-by typographic constellation
- Inquiry form on Contact page (currently front-end only; not yet wired to a backend)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
