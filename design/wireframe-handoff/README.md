# Handoff: Gopher the Gold Productions — Website (Homepage + 2 subpages)

## Overview
Public website for Gopher the Gold Productions, a nonprofit-style production company that gives people more chances to create in three ways: (1) hosting the "Write 7 in 7" competition (external site), (2) producing its own scripts, and (3) funding/highlighting other people's creative projects ("Projects we're funding"). This bundle covers the homepage and two subpages it links to: a script detail ("learn more") page and a funded-projects ("cool stuff") page. Site will be hosted on GitHub Pages.

## About the Design Files
The HTML files in `screens/` are **design references**, not production code — rough wireframes sketched to show structure, content, and navigation, not final visual styling. Recreate the layout and flows described here in whatever framework/setup you choose for a static GitHub Pages site (plain HTML/CSS, or a static site generator/React build that outputs static files) — do not ship these files as-is.

## Fidelity
**Low-fidelity (lofi).** Dashed boxes are image/media placeholders, monospace uppercase labels are annotations (not real UI text), and colors/type are indicative, not final. Treat this as a structural and content guide — feel free to apply cleaner, production-quality visual styling as long as the layout, sections, and flows are preserved. Real brand colors, fonts, and logo ARE final (see Design Tokens / Assets) — those should carry through into the finished site.

## Screens / Views

### 1. Homepage (`screens/2a-homepage.html`)
**Purpose:** Landing page introducing the org and its three ways to create; routes visitors to the competition, scripts-in-production, and funded-projects content.

**Layout:** Single column, max content width ~1100px on desktop (wireframe shown at 420px mobile-first scale — treat as a mobile/compact layout that should also have a comfortable desktop version).
- **Header bar** — dark background (#1E2426), logo left, horizontal nav right: `Compete · Watch · Fund · About · Contact`. Nav should link to: Write 7 in 7 (external), Scripts section, Projects we're funding section/page, About section, Contact section.
- **Hero** — two-column split (image left ~55%, text right ~45% on desktop; stack on mobile). Left: full logo/gopher mark on a solid pink/salmon (#CF9181) background (placeholder — real hero photography/art should replace this). Right: headline "Stories need more chances." + one-line mission tagline, on cream (#ECDABE) background.
- **"Currently producing" section** — section label + heading "In the Writers' Room", followed by a 2-column grid of script cards. Each card: media placeholder thumbnail, script title (quoted), status label (e.g. "in development", "pre-production"), and a **"learn more →"** link that navigates to the script detail page (3a) for that title.
- **"Already produced" section** — section label + heading "From the archive", 3-column grid of smaller completed-work thumbnails, each with title + year + **"learn more →"** link to that script's detail page.
- **Two-up promo banner** — dark green (#314939) background, two columns: "Write 7 in 7" (links out to the separate competition website) and "Projects we're funding" tagged "cool stuff by cool people" (links to the funded-projects page, 3b).
- **Footer** — orange (#BB5D33) background, small text, contact email left, copyright right: `contact@gopherthegold.com` / `© 2026 Gopher the Gold Productions. All rights reserved.`

**Content/copy used:** "Stories need more chances." / "In the Writers' Room" / "From the archive" / "cool stuff by cool people" / footer copy above. Titles ("Script Title A/B", "Title C/D/E") are placeholders — replace with real script names.

### 2. Script "Learn more" page (`screens/3a-script-detail.html`)
**Purpose:** Detail page for one script in production; overview now, script/film embed later once available. One instance of this page per script, linked from the homepage's "learn more →" links.

**Layout:** Single column.
- Same header/nav and footer as homepage.
- "← back to scripts" link near top (returns to homepage's producing section, or a future full scripts-listing page).
- Status label (e.g. "in development") + script title (large) + one-line logline/byline.
- Poster/key-art image placeholder (full width within content column).
- **Synopsis** — 2–3 paragraphs of body copy.
- **Credits block** — rows for Writer, Director, Stage (each a label/value pair; add more rows as needed — producer, cast, etc.).
- **Script / film section** — placeholder for an embedded video player or a "read the script" link/download; this section should degrade gracefully (e.g. show "coming soon") until the asset exists.

### 3. "Cool stuff" funded projects page (`screens/3b-funded-projects.html`)
**Purpose:** Lists projects Gopher the Gold has funded or is currently backing — active crowdfunding campaigns and completed projects — each linking out to the external campaign/project page.

**Layout:** Single column.
- Same header/nav and footer as homepage.
- Intro band (cream background): page title "Projects we're funding" + one-line description "cool stuff by cool people by cool people — campaigns and finished work we've backed".
- **Active campaigns** section — vertical list of cards, each: square thumbnail, project name, campaign type + status (e.g. "seed campaign · ends in 12 days", "spark campaign · funded 60%"), and a **"view campaign →"** external link.
- **Completed projects** section — 2-column grid of smaller cards, each: thumbnail, project name, **"view project →"** external link.
- "Seed" and "Spark" are the two campaign types/tiers referenced by the client — confirm exact definitions/criteria with the client if not already documented elsewhere.

## Interactions & Behavior
- All nav items are simple anchor/route links; "Compete" opens the external Write 7 in 7 site in a new tab.
- "learn more →" links route to the matching script's detail page (3a template, one page per script).
- "view campaign →" / "view project →" links are external links to third-party crowdfunding/project pages — open in new tab.
- No animations specified; simple hover state (underline or color shift) expected on all text links, using standard browser/anchor conventions.
- Responsive behavior: wireframes are shown at a compact/mobile width; scripts and completed-projects grids should reflow to more columns at desktop widths (e.g. 2→3 or 3→4 columns).

## State Management
- Homepage script/archive cards and funded-project cards should be data-driven (e.g. a JSON/YAML/markdown collection per script and per funded project) rather than hardcoded, so new entries can be added without touching layout code — a natural fit for a static site generator's collections/content model.
- Each script needs at minimum: title, status, logline, synopsis, credits (writer/director/etc.), poster image, and optional script/video embed URL (nullable until available).
- Each funded project needs: name, type (seed/spark/completed), status text, thumbnail, external URL.

## Design Tokens
**Colors** (from brand guide):
- Cream (background): `#ECDABE`
- Gold/brown (primary accent, text on light): `#8D6837`
- Pink/salmon: `#CF9181`
- Orange (footer/CTA accent): `#BB5D33`
- Dark green (banner accent): `#314939`
- Near-black (header/text): `#1E2426`

**Typography:**
- Display/heading font: **Kiwi Maru** (Google Font)
- Body font: **Public Sans** (Google Font)

**Other:**
- Card border: 1.5–2px solid `#1E2426`
- Card shadow (wireframe only, optional in final): `3px 3px 0 rgba(30,36,38,.15)`
- Small label style: uppercase, monospace, letterspaced, low-opacity dark — this was a wireframe annotation convention; replace with the production type system's small-label/eyebrow style.

## Assets
- `assets/logo-white.svg` — white logo lockup, for use on the dark (#1E2426) header.
- `assets/logo.png` — full-color logo, used in the homepage hero and elsewhere on light backgrounds.
- Additional brand assets (color variants, dark-background logo, typography files) exist in the client's brand kit and should be requested if more variants are needed.
- All dashed/striped placeholder boxes represent real photography, poster art, or campaign thumbnails to be supplied later.

## Files
- `screens/2a-homepage.html` — homepage wireframe
- `screens/3a-script-detail.html` — script detail/"learn more" page wireframe
- `screens/3b-funded-projects.html` — funded projects/"cool stuff" page wireframe
- `screenshots/` — PNG screenshots of each screen above, for quick reference without opening the HTML
