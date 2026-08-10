# CONTENT_AUDIT.md — fabricated trust signals & media audit

Audit date: 2026-08-10. Scope: every asset under `public/media/` plus every image
and trust-claim reference in `src/` for the RMLingo site
(`artifacts/diplomatic-web`).

## Verdicts (fixed this pass)

| Asset / location                                           | What it was                                                                                                                                                    | Action                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `public/media/credibility/undp.png`                        | Real UNDP trademark logo                                                                                                                                       | **Deleted.** Entire "Trusted by Leading Institutions" section removed from `HomePage.tsx`.                                                                                                                                                                                     |
| `public/media/credibility/world-bank.png`                  | Real World Bank Group trademark logo                                                                                                                           | **Deleted.** Same removal (Home).                                                                                                                                                                                                                                              |
| `public/media/credibility/red-cross.png`                   | Real Norwegian Red Cross trademark logo                                                                                                                        | **Deleted.** Same removal (Home).                                                                                                                                                                                                                                              |
| `public/media/credibility/tetra-tech-usaid.png`            | Real Tetra Tech / USAID trademark logos                                                                                                                        | **Deleted.** Same removal (Home).                                                                                                                                                                                                                                              |
| `HomePage.tsx` "Trusted by Leading Institutions" section   | Displaying real, current trademarks implies verified client/partner relationships not confirmed by the owner                                                   | **Section removed.** Not replaced with other orgs' logos, per directive. No replacement trust content invented.                                                                                                                                                                |
| `InsightsPage.tsx` "Experience" section + the same 4 logos | Same fabricated-trust pattern: cards named after UNDP, World Bank, Red Cross, USAID/Tetra Tech with their logos                                                | **Section removed entirely**, logos deleted.                                                                                                                                                                                                                                   |
| `public/media/field/language-services-overview.png`        | Real photo of a legal document from UNDP's "Sawasya III" access-to-justice program (unrelated real humanitarian program), used as generic "field work" imagery | **Deleted.** Replaced with an original in-house SVG illustration (`src/components/FieldworkIllustration.tsx`): interpretation receivers, a briefing card with blank lines, and bilingual speech marks. No photos, no identifiable people, no org marks, no readable documents. |
| `public/media/insights/transcription.jpg`                  | Unreferenced 423×423 thumbnail crop of a Shutterstock stock image                                                                                              | **Deleted** (orphan asset; nothing in `src/` referenced it).                                                                                                                                                                                                                   |
| `src/i18n/en.json` / `ar.json`                             | `home.trusted*`, `insightsPage.experience*` copy naming real orgs                                                                                              | **Removed** the dead keys in both locales.                                                                                                                                                                                                                                     |

## Kept, with rationale

| Asset                                                                                         | Why it stays                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/media/insights/real-time-interpretation.jpg`                                          | Licensed Shutterstock stock imagery already published by the business on its live site (rmlingo.com `/wp-content/uploads/2025/01/shutterstock_*`), used for its own three blog posts. Business-owned/licensed, not fabricated trust content. **Owner should confirm the Shutterstock license is current.** |
| `public/media/insights/professional-translation.jpg`                                          | Same provenance as above.                                                                                                                                                                                                                                                                                  |
| `public/media/insights/subtitling-and-dubbing.jpg`                                            | Same provenance as above.                                                                                                                                                                                                                                                                                  |
| `public/favicon.svg`, `public/sw.js`, `public/robots.txt`, `public/sitemap.xml`, `index.html` | Checked: no legacy source brand, no fabricated claims; canonical `rmlingo.com` throughout.                                                                                                                                                                                                                 |

## Other observations (not fixed here)

1. **Founder name discrepancy.** `aboutPage.leader` names "Dr. Rawan Manna" with a
   "Founder & Managing Director" title, but the source scrape of the business's
   live site names the founder "Rania". The name/title/credential on the site is
   **unverified** — the owner should confirm the exact legal name, title, and
   whether the "Dr." credential is accurate before this is treated as fact.
2. **Favicon.** `public/favicon.svg` is a plain `#FF3C00` square placeholder, not
   on-brand. Outside this directive's scope, but worth replacing with the
   RMLingo mark.
3. **Contact details** (`+1 619-752-5604`, `info@rmlingo.com`) come from the
   business's live site; per prior project memory they still need explicit owner
   confirmation.

## Needed from the business owner (no fabrication to fill gaps)

- Real client logos or written testimonials with permission, if the "trusted by"
  space is to be filled again.
- Confirmation of the founder's name/title/credential.
