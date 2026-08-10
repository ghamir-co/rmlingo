# Migration Guide — 2026 Website Repository Upgrade

This guide documents the modernization work performed across Phases 1–5 of the
upgrade (see `UPGRADE_DIRECTIVE.md`). Use it for future reference and as a
rollback/caveat reference.

## Summary

| Area                      | Before                                         | After                                           |
| ------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| Security                  | 11 vulnerabilities (9 high, 1 moderate, 1 low) | **0 known vulnerabilities**                     |
| Lighthouse Performance    | 62                                             | **75**                                          |
| Lighthouse Accessibility  | 89                                             | **100**                                         |
| Lighthouse Best Practices | 100                                            | 100                                             |
| Lighthouse SEO            | 100                                            | 100                                             |
| Initial JS bundle         | 480.9 kB (153 kB gzip)                         | 446.7 kB (145 kB gzip) + small per-route chunks |
| Build reliability         | Root `pnpm run build` failed (mockup-sandbox)  | Full workspace build passes                     |

---

## Phase 1 — Audit

Deliverable: `AUDIT_REPORT.md`. Findings:

- Stack was already modern (React 19, Vite 7, Tailwind 4, Express 5, Drizzle).
- `pnpm audit` found 11 vulnerabilities, all in build/codegen tooling.
- Performance baseline 62; main cause: single 480 kB bundle and render-blocking
  Google Fonts.

## Phase 2 — Core Modernization (dependencies)

Security fixes in `pnpm-workspace.yaml` overrides and package manifests:

| Change                                                   | File(s)                                                    | Rationale                                                  |
| -------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `esbuild` override `0.27.3` → `^0.28.1`                  | `pnpm-workspace.yaml`, `artifacts/api-server/package.json` | Patches GHSA-g7r4-m6w7-qqqr (Windows dev-server file read) |
| `postcss: >=8.5.23`, `nanoid: >=3.3.17` overrides        | `pnpm-workspace.yaml`                                      | Patches Vite's bundled postcss/nanoid advisories           |
| `fast-uri: ^3.1.5`, `brace-expansion: >=5.0.9` overrides | `pnpm-workspace.yaml`                                      | Patches orval transitive advisories                        |
| `orval` `^8.20.0` → `^8.24.0`                            | `lib/api-spec/package.json`                                | Latest stable codegen                                      |

Notes:

- Framework migration was **not** required (already React 19 function
  components + hooks). State management (React Query) and styling (Tailwind 4)
  were already modern.
- Vite was kept on 7.x (a major 8.x exists) with patched postcss/nanoid
  overrides to avoid a risky major bump. Revisit for Vite 8 in a future pass.

## Phase 3 — Performance & Optimization

- **Route-level code splitting** (`artifacts/diplomatic-web/src/App.tsx`):
  secondary pages are `React.lazy` + `Suspense`. HomePage stays eager.
- **Async webfonts** (`artifacts/diplomatic-web/index.html`): all three Google
  Fonts now load asynchronously with `font-display: optional` (removed
  render-blocking; FCP 6.0s → 3.6s; no font-swap CLS).
- **Accessibility/performance viewport fix**: removed `maximum-scale=1`.
- **Image sizing**: added intrinsic `width`/`height` to the credibility logos
  (`pages/HomePage.tsx`) to satisfy `unsized-images`.
- **Service worker**: added `public/sw.js` + registration in
  `src/main.tsx` (production only) for offline/shell caching.
- **Build fragility**: `vite.config.ts` (both web apps) no longer throws when
  `PORT`/`BASE_PATH` are unset — sensible defaults now.

### Not done / remaining

- **SSR / SSG:** not applicable — this is a client-side SPA (wouter + Vite).
  If SEO becomes a priority, consider a prerender step or migrating to a
  framework with SSG.
- **Image modern formats (`srcset`, WebP/AVIF):** the heaviest images live on
  lazy-loaded pages, so they don't affect the homepage score. Adding
  WebP/AVIF + `srcset` requires an image-processing build step (`sharp`).
- **Performance >90:** the remaining gap is the eager 446 kB bundle, dominated
  by framer-motion on the critical path. Deferring framer-motion (async chunk
  or removal) is a **visual change** that requires design approval.

## Phase 4 — Quality Assurance

- **Accessibility (WCAG 2.1 AA):** Lighthouse Accessibility now 100.
  - Color contrast: darkened light-theme `--muted-foreground`
    (`index.css`) and removed `opacity-70` on the footer "Founded 2003" text.
  - Heading order: promoted the "WHAT WE DO" label to an `<h2>`
    (`pages/HomePage.tsx`).
  - Image sizing + viewport zoom (see Phase 3).
- **Tests:** added Vitest + React Testing Library (`vitest.config.ts`,
  `src/test/setup.ts`, `src/lib/utils.test.ts`, `src/components/Footer.test.tsx`).
  Run with `pnpm --filter @workspace/diplomatic-web test`.
- **Linting:** added ESLint 9 flat config (`eslint.config.mjs`) with
  `typescript-eslint`, `eslint-plugin-react-hooks`, and
  `eslint-plugin-react-refresh`. Run with `pnpm lint` — **0 errors** (14
  advisory fast-refresh warnings remain). Notable fixes:
  - `use-mobile` refactored to lazy `useState` initializer (no setState-in-effect).
  - `use-toast` `actionTypes` const converted to a pure type.
  - Prettier config (`.prettierrc.json`) + `.prettierignore`; whole repo
    reformatted (`pnpm format` / `pnpm format:check`).
- Legacy files were not force-reformatted beyond Prettier; ESLint errors were
  resolved with targeted fixes or justified inline disables.

## Phase 5 — Documentation

- Created `README.md` (project overview, setup, scripts, architecture).
- Created this `MIGRATION_GUIDE.md`.
- Updated `AUDIT_REPORT.md` with final metrics.

## Rollback notes

- All changes are committed atomically per phase. `git log` will show commits
  prefixed by phase (e.g. "Phase 2: …", "Phase 3: …").
- To revert a specific phase: `git revert <commit>`.
- The `pnpm-workspace.yaml` overrides and `allowBuilds`/`onlyBuiltDependencies`
  must be kept in sync with the dependency versions they patch.
