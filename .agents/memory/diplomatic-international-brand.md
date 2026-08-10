---
name: RMLingo brand and sourcing rules
description: Public-facing naming, contact-detail, and content-sourcing constraints for the RMLingo marketing site.
---

# Public brand name

The only public-facing brand is **RMLingo**. The uploaded source material comes from a
legacy site under a different name; that legacy name must never appear in shipped markup, copy, asset
filenames, alt text, or metadata.

**Why:** The source export is the legacy site, so nearly every source page, image URL, and footer string
carries the old brand. Copying source content verbatim silently reintroduces it.

**How to apply:** After any content import, grep the built app for the legacy brand in all casings and
separator forms before declaring the work done. Rename downloaded assets to descriptive, brand-neutral
filenames rather than keeping their original CDN names.

# Contact details are user-confirmed, not inferred

Phone and email on the site must be values the user explicitly confirmed, never derived from the domain
name or invented to match the new brand.

**Why:** A plausible-looking address at the new domain can be an inbox nobody owns, so real client
inquiries silently disappear. This exact failure was caught in review: the site had been given an address
constructed from the brand name rather than a confirmed one.

**How to apply:** When the source and the new brand disagree on contact details, stop and ask the user
rather than picking one. Keep the canonical URL, schema.org block, sitemap, robots, footer, and contact
page all consistent with the confirmed value.

# No decorative affordances without destinations

Do not ship "Read more"-style controls unless the destination actually exists.

**Why:** Review rejected a version whose article cards had read affordances but no routes, which reads as
a broken or deceptive site.

**How to apply:** Either build the route and real content, or drop the control entirely. When article
content is needed, adapt the client's own published writing from the source export rather than inventing
thought-leadership copy.
