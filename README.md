# RMLingo

A prestigious marketing website for a US-based language interpretation and
translation firm (est. 2003) serving diplomatic missions, UN agencies, and
global corporate entities.

> **Note:** This is the legacy/Replit-authored readme (`replit.md`) moved into a
> proper `README.md`. See `MIGRATION_GUIDE.md` for the 2026 modernization
> upgrade (Phase 1–5).

## Requirements

- **Node.js 24+**
- **pnpm 11+** (this repo is a pnpm workspace; `npm install` is blocked on
  purpose)

## Setup

```bash
pnpm install          # install workspace dependencies
```

## Scripts

Run these from the repo root (`pnpm -w` is implicit for root scripts).

| Command                                           | Description                                              |
| ------------------------------------------------- | -------------------------------------------------------- |
| `pnpm run dev`                                    | Start the Vite dev server for the website                |
| `pnpm run build`                                  | Typecheck + build all packages                           |
| `pnpm run typecheck`                              | Full typecheck across all packages                       |
| `pnpm run typecheck:libs`                         | Typecheck the shared `lib/*` packages                    |
| `pnpm run lint`                                   | ESLint across the workspace                              |
| `pnpm run format` / `format:check`                | Prettier write / check                                   |
| `pnpm --filter @workspace/diplomatic-web run dev` | Dev server for the website                               |
| `pnpm --filter @workspace/api-server run dev`     | Run the API server                                       |
| `pnpm --filter @workspace/api-spec run codegen`   | Regenerate API hooks + Zod schemas from the OpenAPI spec |
| `pnpm --filter @workspace/db run push`            | Push DB schema changes (dev only)                        |
| `pnpm audit`                                      | Security audit                                           |

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Website:** React 19 + Vite 7 + Tailwind CSS 4 + Radix UI + framer-motion + wouter (client-side SPA)
- **API:** Express 5
- **DB:** PostgreSQL + Drizzle ORM
- **Validation:** Zod + `drizzle-zod`
- **API codegen:** Orval (from OpenAPI spec)
- **Build:** esbuild (CJS bundle) for the API; Vite for the web app

## Workspace layout

- `artifacts/diplomatic-web/` — main marketing website (React + Vite, presentation-first, no backend)
- `artifacts/api-server/` — Express API server
- `artifacts/mockup-sandbox/` — design-mockup playground
- `lib/api-spec/` — OpenAPI spec + Orval codegen
- `lib/api-zod/` — generated Zod schemas
- `lib/api-client-react/` — generated React-Query API client
- `lib/db/` — Drizzle schema + DB tooling
- `scripts/` — workspace scripts

## Environment variables

| Variable       | Used by                              | Default                 |
| -------------- | ------------------------------------ | ----------------------- |
| `PORT`         | Vite dev/preview (web app + sandbox) | `5173`                  |
| `BASE_PATH`    | Vite public base path                | `/`                     |
| `DATABASE_URL` | API server / DB tooling              | — (required for API/DB) |

## Architecture decisions

- **Presentation-first, no backend:** the site is pure React/Vite with no API
  or database; all content is static (`src/content/`).
- **`--radius: 0rem`:** sharp corners everywhere — editorial, not a product.
- **`ScriptBackground`** renders Arabic (Amiri) + English at 4–9% opacity —
  pure CSS, no images.
- **framer-motion** handles entrance animations (staggered hero, scroll-triggered).
- **Palette** is set via CSS HSL variables in `index.css` (navy / ivory / gold).
- **Route-level code splitting:** secondary pages are lazy-loaded
  (`React.lazy` + `Suspense`) to keep the initial bundle small.
- **Webfonts load asynchronously** (`font-display: optional`) to avoid
  render-blocking the first paint.
- **Service worker** (`public/sw.js`) provides offline caching in production.

## Accessibility & performance

- Lighthouse: **Performance 75, Accessibility 100, Best Practices 100, SEO 100**
  (baseline before upgrade: 62 / 89 / 100 / 100).
- `pnpm audit`: **0 known vulnerabilities** (baseline: 11).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The repo is a pnpm workspace; `npm install` is intentionally blocked.
- `pnpm-workspace.yaml` enforces a 1-day minimum package release age as a
  supply-chain defense. Don't disable it.
- Bump the `CACHE` name in `public/sw.js` whenever the app shell changes.
