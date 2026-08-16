# ryuhemingway.github.io

Personal site, software &amp; AI engineering portfolio for Ryu Hemingway.

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

Every number on the page traces to something checkable. Most come from `METRICS.md` in the Ghost
repo, which `script/metrics.sh` generates from the working tree; the rest are re-derived by the
commands below. Exact counts are used where a generated source exists (`1,094` tests, `76` tools),
rounded down where the number drifts release to release (`76,000+` lines).
Last re-derived **16 August 2026** against Ghost 2.7.0.

| Claim                                                                                     | How to re-check                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 76,000+ lines / 179 files                                                                 | `find Sources -name '*.swift' \| wc -l`, then `find Sources -name '*.swift' -exec cat {} + \| wc -l` (76,307)                                           |
| 76 tools                                                                                  | `manifest("ghost_*"` entries in `Sources/Ghost/Services/GhostCapabilityHarness.swift`. Count the manifest, not `ghost_*` string literals, which include aliases and references and come to 83 |
| 1,094 tests, 114 suites                                                                   | `@Test` and `@Suite` counts in `Tests/`; also the "Unit tests" row of Ghost's generated `METRICS.md`                                                     |
| 8 providers + BYO CLI                                                                     | cases in `Sources/Ghost/Models/GhostProvider.swift`                                                                                                     |
| Version 2.7.0, August 2026                                                                | `VERSION` in the Ghost repo; `gh release list --repo ryuhemingway/Ghost-App`                                                                             |
| 24.6% / 43.5% line coverage, CI-regenerated metrics                                       | the coverage rows of Ghost's `METRICS.md`, produced by `script/metrics.sh` from `swift test --enable-code-coverage`                                      |
| Graduating April 2028                                                                     | Northeastern program record                                                                                                                             |
| ClaudeMaxing, Homebrew tap                                                                | public repos `ryuhemingway/ClaudeMaxing` (MIT) and `ryuhemingway/homebrew-tap`                                                                           |
| 244 lessons, execution-based grading                                                      | `counts.total` in `curriculum/_index.json` and `tests/test_execution_grading.py` in the curriculum repo (private). Say "lessons", not "authored lessons": only 74 of the 244 are authored, 170 are migrated |
| Huffman figures and claims                                                                | figures in the paper repo `ryuhemingway/Lossless-Data-Compression-Research---Huffman-Coding-Algorithm`; reproduce with `empirical_analysis.py`, seed 42 |
| Small-model claims (schema narrowing, KV-prefix reuse, streaming fallback, vision gating) | `GhostLocalToolSelector` and `DirectAPIClient+ToolLoops.swift` in the Ghost source                                                                      |
| gemma-4-e2b, no API key, no network                                                       | the golden retriever demo in the Ghost README, filmed on LM Studio                                                                                      |

If Ghost changes, update the facts box in `index.html` and the résumé PDF together, so a recruiter
reading both never sees two different numbers.

`assets/Ryu-Hemingway-Resume.pdf` was regenerated on 16 August 2026 and now agrees with the page.
Its source of truth is `~/Desktop/Admin & Career/Resume/Ryu Hemingway Resume 2026 (corrected).docx`;
edit that, export to PDF from Word, and copy the result over `assets/Ryu-Hemingway-Resume.pdf`.
