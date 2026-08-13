# ryuhemingway.github.io

Personal site — AI engineering portfolio for Ryu Hemingway.

Static and hand-written. No framework, no build step, no JavaScript, no tracking.

```
index.html      the whole page
styles.css      ~300 lines of plain document styling
assets/
  Ryu-Hemingway-Resume.pdf
  img/          Ghost screenshots, cropped to the app window (~950 KB total)
```

## Run it locally

```bash
python3 -m http.server 4321
# -> http://localhost:4321
```

## Deploy (GitHub Pages)

The repo name `ryuhemingway.github.io` is what makes this serve at the root domain.

```bash
gh repo create ryuhemingway.github.io --public --source=. --remote=origin --push
```

Then in **Settings -> Pages**, set *Source: Deploy from a branch*, branch `main`, folder `/ (root)`.
Live at `https://ryuhemingway.github.io` within a minute or two. After that, updates are `git push`.

## Keeping it honest

Every number on the page traces to something checkable in the Ghost repository:

| Claim | How to re-check |
|---|---|
| 66,500 lines / 161 files | `find Sources -name '*.swift' \| wc -l`, then `cat` them and count |
| 83 tools | distinct `ghost_*` tool identifiers in `Sources/` |
| 763 tests | `@Test` cases across 68 suites in `Tests/` |
| 8 providers + BYO CLI | Ghost's provider picker |

If Ghost changes, update the facts box in `index.html` and the résumé PDF together, so a recruiter
reading both never sees two different numbers.
