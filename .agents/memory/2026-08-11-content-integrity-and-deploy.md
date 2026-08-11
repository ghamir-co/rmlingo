---
name: Content integrity fix, octagram bug, and deployment status
description: What was wrong with the trust signals/field photo/hero medallion, what's fixed. LIVE IN PRODUCTION at rmlingo.com.
---

# Trust signals and field photo were real business assets, not fabrications — but check before reusing

The "Trusted by" logos (UNDP, World Bank, Norwegian Red Cross, Tetra Tech/USAID) and the About
page field photo were flagged and removed as unverified/unauthorized third-party content. Reading
`attached_assets/pages_*.zip` → `pages/testimonials.md` (the full scrape, not just
`CONTENT_MAP_*.md`'s one-line summary) turned up real, named, dated recommendation letters — with
linked PDFs on the live rmlingo.com — from people at all four organizations. Logos restored
(recovered from git history) and rebuilt as a compact bilingual trust bar right after the hero,
using new `home.trustedByLabel` / `home.trusted` / `home.testimonials` i18n keys (EN + AR). The
field photo (a real UNDP "Sawasya III" Palestinian justice-program document, genuinely unrelated
to this business) stays removed — replaced with an original in-house SVG,
`FieldworkIllustration.tsx`.

**Why this matters:** `CONTENT_MAP_*.md`'s one-line asset summaries are auto-generated and can be
wrong (it also mislabeled the founder as "Rania" — the actual page copy says "founded ... by Dr.
Rawan Manna, Ph.D." twice, correctly matching this site; "Rania Filfil" is a different real person,
a named strategic partner). Don't trust the summary file over the actual scraped page text in
`pages/*.md` inside the zip.

**How to apply:** before removing or restoring any client-facing claim (logo, testimonial, name,
credential) as "unverified," check `pages/*.md` inside `attached_assets/pages_*.zip` for the
actual source copy, not just `CONTENT_MAP_*.md`. If still genuinely unverifiable, stop and ask —
same rule as the existing contact-details policy in [rmlingo-brand.md](rmlingo-brand.md).

# Hero octagram medallion CSS bug (fixed)

The gold "octagram" star medallion in the hero (`.octagram` in `index.css`, used from
`HomePage.tsx`) had collapsed to ~2px, leaving only the "لغة" label floating with no visible star
around it. Cause: `.octagram` was `width: 100%` inside a parent with `justify-self-end` in a CSS
grid track — `justify-self-end` makes that parent shrink-to-fit its content instead of stretching
to the grid track, so the child's `width:100%` and the parent's content-based size become
circularly dependent and collapse near zero. Fixed by sizing `.octagram` with `clamp(220px, 24vw,
26rem)` instead of a percentage, which has no dependency on the ambiguous parent width. Watch for
this same pattern (`width: 100%` on a child of a `justify-self-end`/`justify-self-start` grid
item) anywhere else in this codebase.

# Current state (2026-08-11) — LIVE IN PRODUCTION

Pushed to `origin/main` at `72f76e3`. Deployed to **https://silent-maple-s7tr.here.now/**
(permanent, authenticated via `~/.herenow/credentials`, `--spa` for client-side routing), and that
site is now mapped to the real production domain **rmlingo.com** — this is the actual live
business website now, replacing the previous WordPress site at that domain (verified: HTTPS 200,
serving this build). Full history of the content fix is in `CONTENT_AUDIT.md` at the repo root.
`.playwright-mcp/` is now gitignored (tool cache from the Playwright MCP server, not source).

**Any future change to this repo is a production change** — treat with the same care as editing a
live site directly, not a draft/prototype.

Still open, needs the business owner: the sibling `dip-int` project's contact email situation (see
its own memory) — this project (`rmlingo`) already uses the confirmed real `info@rmlingo.com`.
