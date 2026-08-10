# Audit Report — Phase 1

**Date:** 2026-08-09
**Target:** Website repository upgrade (`rmlingo`)
**Scope:** Phase 1 (Audit & Analysis) only. Report findings before Phase 2.

> **Update (post-upgrade, Phases 2–5 complete):** see `MIGRATION_GUIDE.md` for
> the full changelog. Final state vs. baseline:

| Metric                          | Baseline               | Final                            | Δ      |
| ------------------------------- | ---------------------- | -------------------------------- | ------ |
| `pnpm audit` vulnerabilities    | 11 (9 high)            | **0**                            | −11    |
| Lighthouse Performance          | 62                     | **75**                           | +13    |
| Lighthouse Accessibility        | 89                     | **100**                          | +11    |
| Lighthouse Best Practices       | 100                    | 100                              | —      |
| Lighthouse SEO                  | 100                    | 100                              | —      |
| Initial JS bundle (gzip)        | 480.9 kB (153 kB)      | 446.7 kB (145 kB) + route chunks | −34 kB |
| Full workspace `pnpm run build` | fails (mockup-sandbox) | passes                           | fixed  |
| Tests                           | none                   | 6 (Vitest + RTL)                 | added  |

---

## 1. Current Tech Stack

A pnpm workspace monorepo (`pnpm-workspace.yaml`) with 9 projects across `artifacts/*`, `lib/*`, and `scripts`.

| Layer              | Technology                                                  | Version (resolved) |
| ------------------ | ----------------------------------------------------------- | ------------------ |
| Package manager    | pnpm                                                        | 11.21.0            |
| Runtime            | Node.js                                                     | v24.19.0           |
| Frontend framework | React (function components + hooks)                         | 19.1.0             |
| Build tool         | Vite                                                        | 7.3.6              |
| Styling            | Tailwind CSS v4 (`@tailwindcss/vite`) + Radix UI primitives | 4.1.x              |
| Routing            | wouter (client-side SPA)                                    | 3.3.5              |
| Server             | Express                                                     | 5.2.1              |
| ORM / DB           | drizzle-orm + pg                                            | 0.45.x             |
| Data fetching      | @tanstack/react-query                                       | 5.90.x             |
| Validation         | zod                                                         | 3.25.x             |
| Animation          | framer-motion                                               | 12.x               |
| TypeScript         | —                                                           | ~5.9.3             |

**Assessment:** The stack is already modern and bleeding-edge (React 19, Vite 7, Tailwind 4). No legacy-framework migration is required. The main artifacts are:

- `artifacts/diplomatic-web` — the production website (React SPA).
- `artifacts/api-server` — Express API server.
- `artifacts/mockup-sandbox` — design-mockup playground.
- `lib/*` — API spec/codegen (`orval`), zod schemas, DB schema, React API client.

---

## 2. Build / Verification Status

- **Typecheck:** PASSES for all projects (`api-server`, `diplomatic-web`, `mockup-sandbox`, `scripts`, and libs).
- **Main web build (`diplomatic-web`):** PASSES — single bundle output:
  - `index.js` **480.86 kB** (gzip **152.99 kB**)
  - `index.css` **100.34 kB** (gzip **16.71 kB**)
- **Root `pnpm run build`:** FAILS at `mockup-sandbox` — its `vite.config.ts` throws at load time when `PORT`/`BASE_PATH` env vars are absent.

---

## 3. Security Audit (`pnpm audit`)

**11 vulnerabilities — 9 high, 1 moderate, 1 low.**

| Sev      | Package         | Advisory                                                                          | Path                          |
| -------- | --------------- | --------------------------------------------------------------------------------- | ----------------------------- |
| high     | js-yaml         | Quadratic CPU (merge-key / `!!omap`) — GHSA-52cp-r559-cp3m, GHSA-5p4m-2wfm-xmqj   | `orval` (api-spec codegen)    |
| high     | fast-uri        | Host confusion via backslash authority — GHSA-v2hh-gcrm-f6hx, GHSA-7p8r-x3mc-p8w7 | `orval` → ajv                 |
| high     | brace-expansion | DoS via unbounded expansion — GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895            | `orval` → typedoc → minimatch |
| high     | postcss         | Path traversal in source map auto-loading — GHSA-r28c-9q8g-f849                   | `vite` → postcss              |
| high     | nanoid          | Non-secure generator infinite loop — GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8     | `vite` → postcss → nanoid     |
| moderate | postcss         | Incomplete source map fix — GHSA-fxqj-rqcc-2cmp                                   | `vite` → postcss              |
| low      | esbuild         | Arbitrary file read on Windows dev server — GHSA-g7r4-m6w7-qqqr                   | api-server + override         |

**Root causes (all in build/codegen tooling, not runtime app code):**

1. `esbuild` is **pinned to `0.27.3`** via a `pnpm-workspace.yaml` override and directly in `api-server`. Patched at `>=0.28.1`. This is the highest-priority fix.
2. `orval`'s transitive `typedoc → minimatch → brace-expansion`, `js-yaml`, and `ajv → fast-uri` are outdated (6 of the 9 high findings).
3. Vite's bundled `postcss`/`nanoid` are outdated (remaining 4 findings).

No runtime application dependencies are vulnerable.

---

## 4. Performance Baseline (Lighthouse)

Audited the built SPA served locally via headless Chrome.

| Category        | Score  |
| --------------- | ------ |
| **Performance** | **62** |
| Accessibility   | 89     |
| Best Practices  | 100    |
| SEO             | 100    |

**Core Web Vitals / metrics:**

| Metric                         | Value | Rating |
| ------------------------------ | ----- | ------ |
| First Contentful Paint (FCP)   | 6.0 s | poor   |
| Largest Contentful Paint (LCP) | 6.5 s | poor   |
| Total Blocking Time (TBT)      | 70 ms | good   |
| Cumulative Layout Shift (CLS)  | 0     | good   |
| Speed Index                    | 6.0 s | poor   |
| Time to Interactive (TTI)      | 6.6 s | poor   |

**Main performance levers (opportunities):**

- **Reduce unused JavaScript — est. 252 KiB savings.** The entire app ships as a single 480 kB bundle (no route-level code splitting; all 2178 modules + all pages statically imported in `App.tsx`). This is the dominant cause of the poor FCP/LCP/TTI.
- **Improve image delivery — est. 157 KiB savings.** No `srcset`, no modern image formats, images lack explicit `width`/`height` (CLS-safe, but unsized).

**Performance verdict:** Target >90 requires route-level code splitting (React.lazy), image optimization, and preconnect — all achievable in Phase 3.

---

## 5. Accessibility Baseline (WCAG 2.1 AA)

Current score **89** (not AA). Failures found by Lighthouse:

- **Color contrast (4 violations):** muted text `#766b60` / `#9b9288` on `#f1ece4` background (ratios 4.41 and 2.6 vs required 4.5) in homepage link and footer.
- **`unsized-images`:** image elements lack explicit `width`/`height`.
- **`heading-order`:** headings not in sequentially-descending order.
- **`meta-viewport`:** `user-scalable=no` / `maximum-scale` < 5 restricts zoom — WCAG 1.4.4 violation.

---

## 6. Technical Debt & Process Gaps

| Area                | Finding                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tests               | **No tests exist** anywhere in the workspace (no Jest/Vitest/RTL). Phase 4 must add them.                                                         |
| Linting             | No ESLint config; **no Prettier config** despite `prettier` being a root devDependency.                                                           |
| Docs                | **No `README.md`**; only `replit.md`. No `MIGRATION_GUIDE.md`.                                                                                    |
| Build fragility     | Both Vite configs **throw at config load if `PORT`/`BASE_PATH` env vars are unset**. Root `pnpm run build` fails (mockup-sandbox) without `PORT`. |
| Bundling            | No code splitting / lazy loading; single 480 kB JS entry.                                                                                         |
| Router              | `wouter` (hash/SPA) rather than file-based routing — acceptable, but note for SEO/caching.                                                        |
| Committed artifacts | `dist/` output, `*.tsbuildinfo`, and screenshots are committed in git (no `.gitignore` coverage for build artifacts).                             |

---

## 7. Upgrade Targets (input to Phase 2)

**Immediate / dependency upgrades:**

1. Bump `esbuild` override + `api-server` pin from `0.27.3` → `>=0.28.1` (fixes low-sev + removes stale override).
2. Update `orval` and/or override its transitive `js-yaml`, `fast-uri`, `brace-expansion` (clears 6 high findings).
3. Update `vite` (and re-run `pnpm update`) so bundled `postcss`/`nanoid` reach patched versions (clears remaining findings).

**Architecture / code (Phase 2–3):** 4. Add route-level code splitting (`React.lazy`) for pages — primary performance win. 5. Optimize images: `srcset`, modern formats, explicit dimensions, lazy-load below-fold. 6. Fix accessibility: color contrast, heading order, viewport zoom, image sizing.

**Process (Phase 4–5):** 7. Add Jest/Vitest + RTL tests; add ESLint + Prettier config; add README + MIGRATION_GUIDE. 8. Make Vite config resilient to missing `PORT`/`BASE_PATH` (defaults) so `pnpm run build` succeeds.

---

_Phase 1 complete. Awaiting go-ahead before proceeding to Phase 2 (Core Modernization)._
