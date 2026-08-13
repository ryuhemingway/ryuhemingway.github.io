# ryuhemingway.github.io

Personal site — AI engineering portfolio for Ryu Hemingway.

Static, hand-written, no build step and no dependencies. Three files and a folder of assets.

```
index.html      the whole page
styles.css      design system + layout
script.js       scroll reveals, counting stats, diagram animation
assets/
  Ryu-Hemingway-Resume.pdf
  img/          Ghost screenshots (cropped to the app window, ~1 MB total)
```

## Run it locally

```bash
python3 -m http.server 4321
# → http://localhost:4321
```

## Deploy (GitHub Pages)

The repo name `ryuhemingway.github.io` is what makes this serve at the root domain.

```bash
gh repo create ryuhemingway.github.io --public --source=. --remote=origin --push
```

Then in **Settings → Pages**, set *Source: Deploy from a branch*, branch `main`, folder `/ (root)`.
The site is live at `https://ryuhemingway.github.io` within a minute or two.

Subsequent updates are just `git push`.

## Design notes

- **Type**: Instrument Serif (display) · Inter (body) · IBM Plex Mono (metadata).
- **Colour**: one accent (`--accent: #e0653a`) on warm near-black. Deliberately not Ghost's
  neon-green brand — the portfolio should not read as the same site as the product.
- **Motion**: reveal-on-scroll and a counting stat strip, both disabled under
  `prefers-reduced-motion`. Reveals are gated behind an `html.js` class, so with JavaScript off
  the page is fully visible rather than blank.
- **Images**: screenshots are cropped to the app window and capped at 1400 px wide. Everything
  below the fold is `loading="lazy"`.

## Keeping it honest

Every number on the page traces to something checkable:

| Claim | Source |
|---|---|
| 66,500 lines / 161 files | `find Sources -name '*.swift'` in the Ghost repo |
| 83 tools | distinct `ghost_*` tool identifiers in `Sources/` |
| 763 tests | `@Test` cases across 68 suites in `Tests/` |
| 8 providers + BYO CLI | Ghost's provider picker |

If Ghost changes, update the stat strip in `index.html` and the résumé together so the two
never disagree in front of a recruiter.
