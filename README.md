# Gopher the Gold Productions — Website

Public website for Gopher the Gold Productions, a production company that
gives people more chances to create in three ways: hosting the **Write 7 in
7** competition, producing its own **scripts**, and **funding**/highlighting
other people's creative projects.

This is a static site (plain HTML/CSS/JS, no framework) built from the
design handoff in [`design/wireframe-handoff`](design/wireframe-handoff),
meant to be served with **GitHub Pages**.

## Live site

Once GitHub Pages is enabled for this repo (Settings → Pages → Deploy from
branch `main` / root), the site will be live at:

```
https://<your-username>.github.io/<repo-name>/
```

## Structure

```
index.html          Homepage (generated)
funding.html         "Projects we're funding" page (generated)
scripts/*.html        One page per script, e.g. scripts/script-title-a.html (generated)
css/style.css         Shared stylesheet (design tokens, layout, components)
js/main.js             Mobile nav toggle
assets/                 Logo files
data/scripts.json         Content for the writers'-room + archive script cards
data/funded-projects.json  Content for active/completed funded projects
build.js               Static site generator — reads data/*.json, writes the HTML above
design/wireframe-handoff  Original lofi wireframes + brand tokens from the design handoff
```

## Editing content

The homepage script cards, script detail pages, and funding page are all
**data-driven** — don't hand-edit the generated `.html` files. Instead:

1. Edit `data/scripts.json` (add/update a script) or
   `data/funded-projects.json` (add/update a campaign or completed project).
2. Regenerate the static pages:

   ```
   node build.js
   ```

3. Commit the changes, including the regenerated HTML files.

### `data/scripts.json` fields

| field | notes |
|---|---|
| `slug` | used as the filename, e.g. `scripts/<slug>.html` |
| `section` | `"writers-room"` (currently producing) or `"archive"` (already produced) |
| `title`, `status`, `year` | `year` only shown for archive entries |
| `writer`, `director`, `stage` | credits block |
| `logline`, `synopsis` (array of paragraphs) | |
| `poster` | path to an image, or `null` to show the placeholder |
| `embedUrl` / `scriptUrl` | video embed or "read the script" link; leave `null` until available — the page shows a "coming soon" state |

### `data/funded-projects.json` fields

Two arrays, `active` and `completed`. Each entry needs `name`, `url`
(external link — leave `null` to show "coming soon" instead of a dead link),
and `thumbnail`. Active entries also take `type` (e.g. `"seed & spark
campaign"`) and `statusText` (e.g. `"seed campaign · ends in 12 days"`).

## Known placeholders to replace before launch

This build carries over the **placeholder content** from the wireframe
handoff (script titles, credits, project names, synopsis copy) since no real
copy/assets were supplied yet. Before going live, replace:

- Real script titles, loglines, synopses, credits, and poster art in
  `data/scripts.json`
- Real funded-project names, thumbnails, and campaign URLs in
  `data/funded-projects.json`
- The Write 7 in 7 competition URL — currently `null` in `build.js`
  (`SITE.write7in7Url`), which renders as "coming soon" until set
- Poster/thumbnail/hero images — currently placeholder dashed boxes

## Design tokens

Colors, type (Kiwi Maru / Public Sans), and spacing come from the brand
guide in the wireframe handoff README — see
[`design/wireframe-handoff/README.md`](design/wireframe-handoff/README.md)
and are implemented as CSS custom properties at the top of `css/style.css`.
