# Project Directive: Fix fabricated trust signals + apply new design toolchain
**Target Agent:** JCode (Terminal)
**Backend Model:** DeepSeek-V4-Flash (use V4-Pro if available for the audit/judgment calls in Phase 1)
**Base Project:** ./ (rmlingo)

## Why this directive exists

A design/content audit found that this site's credibility is built on unauthorized use of real
institutions' trademarks and a real humanitarian organization's document photo used out of
context. This is not a styling issue — do not "restyle" your way around it. The content itself
must change.

## Phase 1: Remove fabricated trust signals (do this first, before any visual polish)

1. `src/pages/HomePage.tsx` renders a "Trusted by leading institutions" section using
   `public/media/credibility/undp.png`, `world-bank.png`, `red-cross.png`, `tetra-tech-usaid.png`.
   These are the **real, current trademarked logos** of the UN Development Programme, World Bank
   Group, Norwegian Red Cross, and Tetra Tech — not stylized placeholders. Displaying them implies
   a verified client/partner relationship. Unless the business owner confirms an actual,
   documented relationship with each of these organizations, **remove this entire section**
   (do not swap in different real orgs' logos as a fix — same problem, different logos).
2. `src/pages/AboutPage.tsx` uses `public/media/field/language-services-overview.png` as generic
   "field work" imagery. This photo is a real image of a legal document from UNDP's "Sawasya III"
   access-to-justice program for Palestinians — a specific, real, unrelated humanitarian program's
   material. Remove it and replace with either (a) a photo the business actually owns the rights
   to, or (b) a genuinely generic, non-identifiable stock photo with no visible real organization
   branding, program names, or document contents.
3. **Audit every other asset** under `public/media/` (and any image referenced anywhere in `src/`)
   for the same pattern before calling this phase done — a real company logo, a real person's
   identifiable photo, a real document, a real quote attributed to a real person/org without
   permission. Do not assume the problem is limited to the two spots above. List everything you
   find and what you did about it in a short `CONTENT_AUDIT.md`.
4. If removing a section leaves an obvious gap (e.g. an empty "trusted by" row), ask the business
   owner for real client logos/testimonials rather than inventing a replacement. Do not fabricate
   new fake trust content to fill the space.

## Phase 2: Apply the new design toolchain to whatever you touch

1. Read `~/.jcode/skills/design-system/SKILL.md` before touching any markup or CSS. It locks the
   visual direction (colors, type scale, spacing) and the service-business structural rules
   (real trust content, not generic icon grids or carousels) — this project already mostly follows
   it (the serif/warm-neutral direction is good), keep it consistent in whatever you rebuild.
2. Use the MCP tools now configured in `~/.jcode/mcp.json` instead of guessing:
   - `context7` for correct, current Tailwind/Radix/React API usage
   - `shadcn` / `magic` if you need a new component rather than hand-rolling one
   - `playwright` (or `chrome-devtools`) to actually screenshot the page after changes and look
     at it — don't claim a section is fixed without seeing it rendered
   - `framelink-figma` if a Figma file exists for this project
3. Re-run the pre-flight checklist at the bottom of the design-system skill before calling this
   done.

## Phase 3: Redeploy

1. Rebuild, verify the build succeeds, redeploy to here.now using the same method as the prior
   deployment (check memory / prior session for the exact command).
2. Output the live URL for confirmation.

## Safety

If you're unsure whether a piece of content is real/identifiable vs. safely generic, stop and ask
rather than guessing. Getting this wrong is what caused the problem in the first place.
