#!/usr/bin/env python3
"""Generate the star tiles behind the page, assets/img/stars-*.svg.

Run it once after changing a parameter and commit the output, so the site
itself still has no build step. Every layer is seeded, so re-running
reproduces the same sky.

    python3 tools/starfield.py
"""

import random
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "img"

# name: tile size (px), star count, radius range, opacity range,
#       share of stars with a soft halo, seed.
# Tile sizes differ from one another, so the layers drift out of step and
# the combined pattern never visibly repeats, even on a very wide screen.
LAYERS = {
    "stars-far": (1500, 260, (0.35, 0.75), (0.2, 0.55), 0.0, 11),
    "stars-near": (2100, 60, (0.7, 1.2), (0.45, 0.8), 0.12, 23),
    "stars-twinkle-a": (1800, 22, (0.85, 1.3), (0.75, 1.0), 0.5, 37),
    "stars-twinkle-b": (1700, 18, (0.85, 1.3), (0.75, 1.0), 0.5, 41),
}

# mostly white, some blue-white, a few warm, as in a real field
COLOURS = ["#ffffff"] * 7 + ["#cdd9ff"] * 2 + ["#ffe8c4"]

# keeps every halo inside its tile, so nothing clips at a seam
MARGIN = 6

HALO_DEFS = (
    '<defs><radialGradient id="h">'
    '<stop offset="0" stop-color="#dfe6ff" stop-opacity=".55"/>'
    '<stop offset="1" stop-color="#dfe6ff" stop-opacity="0"/>'
    "</radialGradient></defs>"
)


def tile(size, count, radius, opacity, halo_share, seed):
    rng = random.Random(seed)
    parts = []
    for _ in range(count):
        x = rng.uniform(MARGIN, size - MARGIN)
        y = rng.uniform(MARGIN, size - MARGIN)
        r = rng.uniform(*radius)
        o = rng.uniform(*opacity)
        colour = rng.choice(COLOURS)
        if rng.random() < halo_share:
            parts.append(
                f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r * 3.2:.2f}" '
                f'fill="url(#h)" opacity="{o * 0.5:.2f}"/>'
            )
        parts.append(
            f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.2f}" '
            f'fill="{colour}" opacity="{o:.2f}"/>'
        )
    defs = HALO_DEFS if halo_share else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" '
        f'height="{size}" viewBox="0 0 {size} {size}">'
        f"{defs}{''.join(parts)}</svg>\n"
    )


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, params in LAYERS.items():
        path = OUT / f"{name}.svg"
        path.write_text(tile(*params))
        print(f"{path.relative_to(OUT.parent.parent)}  {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
