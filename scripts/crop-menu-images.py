#!/usr/bin/env python3
"""Crop menu images to a single main dish photo (removes collage extras and padding)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

IMAGES_DIR = Path(__file__).resolve().parents[1] / "public" / "menu-images"


def is_background(r: int, g: int, b: int) -> bool:
    brightness = (r + g + b) / 3
    if brightness > 245:
        return True
    if brightness > 175 and abs(r - g) < 18 and abs(g - b) < 18:
        return True
    return False


def find_components(mask: bytearray, w: int, h: int) -> list[tuple[int, int, int, int, int]]:
    visited = bytearray(w * h)
    components: list[tuple[int, int, int, int, int]] = []

    for sy in range(h):
        for sx in range(w):
            idx = sy * w + sx
            if not mask[idx] or visited[idx]:
                continue

            stack = [(sx, sy)]
            visited[idx] = 1
            minx = maxx = sx
            miny = maxy = sy
            size = 0

            while stack:
                x, y = stack.pop()
                size += 1
                minx = min(minx, x)
                maxx = max(maxx, x)
                miny = min(miny, y)
                maxy = max(maxy, y)
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        nidx = ny * w + nx
                        if mask[nidx] and not visited[nidx]:
                            visited[nidx] = 1
                            stack.append((nx, ny))

            components.append((size, minx, miny, maxx, maxy))

    return sorted(components, reverse=True)


def trim_margins(im: Image.Image, pad: int = 20) -> Image.Image:
    im = im.convert("RGB")
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False

    for y in range(h):
        for x in range(w):
            if not is_background(*px[x, y]):
                found = True
                minx = min(minx, x)
                maxx = max(maxx, x)
                miny = min(miny, y)
                maxy = max(maxy, y)

    if not found:
        return im

    return im.crop(
        (max(0, minx - pad), max(0, miny - pad), min(w, maxx + pad), min(h, maxy + pad))
    )


def crop_to_main_photo(im: Image.Image, scale: int = 8) -> Image.Image:
    im = im.convert("RGB")
    w, h = im.size
    sw, sh = max(1, w // scale), max(1, h // scale)
    small = im.resize((sw, sh))
    px = small.load()

    mask = bytearray(sw * sh)
    content_pixels = 0
    for y in range(sh):
        for x in range(sw):
            if not is_background(*px[x, y]):
                mask[y * sw + x] = 1
                content_pixels += 1

    if content_pixels == 0:
        return im

    min_area = sw * sh * 0.02
    components = [c for c in find_components(mask, sw, sh) if c[0] >= min_area]

    if not components:
        return trim_margins(im)

    largest = components[0]
    content_ratio = largest[0] / content_pixels

    # One connected scene (single dish or platter): just trim empty margins.
    if len(components) == 1 or content_ratio > 0.72:
        return trim_margins(im)

    _, minx, miny, maxx, maxy = largest
    pad = 12
    left = max(0, minx - pad) * scale
    top = max(0, miny - pad) * scale
    right = min(sw - 1, maxx + pad) * scale + scale
    bottom = min(sh - 1, maxy + pad) * scale + scale
    return im.crop((left, top, right, bottom))


def main() -> None:
    files = sorted(
        p for p in IMAGES_DIR.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg"}
    )
    for path in files:
        cropped = crop_to_main_photo(Image.open(path))
        cropped.save(path, optimize=True)
        print(f"{path.name}: {cropped.size[0]}x{cropped.size[1]}")

    print(f"Processed {len(files)} images")


if __name__ == "__main__":
    main()
