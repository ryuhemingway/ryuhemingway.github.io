# ryuhemingway.github.io

Personal site — software &amp; AI engineering portfolio for Ryu Hemingway.

Static and hand-written. No framework, no build step, no JavaScript, no tracking.

```
index.html      the whole page
styles.css      plain document styling, ~330 lines
favicon.svg
assets/
  Ryu-Hemingway-Resume.pdf
  img/          Ghost screenshots, cropped to the app window (jpg + webp),
                plus two figures from the Huffman coding research paper (png)
  media/        two demo videos: Milky Way (tool action) and golden retriever
                (local small model), each behind a poster frame
```

Screenshots ship as `<picture>` with a WebP source and a JPEG fallback. The demo videos are
`preload="none"` behind poster frames, so they cost nothing until someone presses play.

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

Then in **Settings -> Pages**, set _Source: Deploy from a branch_, branch `main`, folder `/ (root)`.
Live at `https://ryuhemingway.github.io` within a minute or two. After that, updates are `git push`.

## Keeping it honest

Every number on the page traces to something checkable in the Ghost repository:

| Claim                                                                                     | How to re-check                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 66,500 lines / 161 files                                                                  | `find Sources -name '*.swift' \| wc -l`, then `cat` them and count                                                                                      |
| 83 tools                                                                                  | distinct `ghost_*` tool identifiers in `Sources/`                                                                                                       |
| 763 tests                                                                                 | `@Test` cases across 68 suites in `Tests/`                                                                                                              |
| 8 providers + BYO CLI                                                                     | Ghost's provider picker                                                                                                                                 |
| Graduating December 2028                                                                  | Northeastern program record                                                                                                                             |
| Huffman figures and claims                                                                | figures in the paper repo `ryuhemingway/Lossless-Data-Compression-Research---Huffman-Coding-Algorithm`; reproduce with `empirical_analysis.py`, seed 42 |
| Small-model claims (schema narrowing, KV-prefix reuse, streaming fallback, vision gating) | `GhostLocalToolSelector` and `DirectAPIClient+ToolLoops.swift` in the Ghost source                                                                      |
| gemma-4-e2b, no API key, no network                                                       | the golden retriever demo in the Ghost README, filmed on LM Studio                                                                                      |

If Ghost changes, update the facts box in `index.html` and the résumé PDF together, so a recruiter
reading both never sees two different numbers.
