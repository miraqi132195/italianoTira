#!/usr/bin/env python3
"""Crop menu images to a single main dish photo (removes collage extras and padding)."""
from __future__ import annotations

import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / "public" / "menu-images"
DOCX = Path("/Users/saebabukhet/Downloads/תפריט תמונות עבור איטליאנו -מג'ד עיראקי.docx")

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R_NS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


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


def strip_bottom_banner(im: Image.Image) -> Image.Image:
    """Remove bottom padding and text label strips from menu photos."""
    im = im.convert("RGB")
    px = im.load()
    w, h = im.size

    def row_is_banner(y: int) -> bool:
        samples = [px[x, y] for x in range(0, w, max(1, w // 24))]
        avg_r = sum(c[0] for c in samples) / len(samples)
        avg_g = sum(c[1] for c in samples) / len(samples)
        avg_b = sum(c[2] for c in samples) / len(samples)
        avg_bright = (avg_r + avg_g + avg_b) / 3

        if avg_bright > 248:
            return True
        if avg_r > 210 and avg_g > 165 and avg_b > 115:
            return True
        return False

    start = int(h * 0.78)
    cut_y = h
    found = False
    for y in range(h - 1, start, -1):
        if row_is_banner(y):
            cut_y = min(cut_y, y)
            found = True

    if found and cut_y < h - 10:
        return im.crop((0, 0, w, max(1, cut_y - 2)))
    return im


def restore_from_docx() -> None:
    """Re-extract original menu images from the source docx."""
    import sys

    sys.path.insert(0, str(ROOT / "scripts"))
    from generate_menu import IMAGE_FILES

    with zipfile.ZipFile(DOCX) as zf:
        rels = ET.fromstring(zf.read("word/_rels/document.xml.rels"))
        rid_to_media = {
            rel.get("Id"): "word/" + rel.get("Target")
            for rel in rels
            if rel.get("Target", "").startswith("media/")
        }

        root = ET.fromstring(zf.read("word/document.xml"))
        pages: list[list[str]] = []
        current_text = ""
        current_images: list[str] = []

        for p in root.iter(f"{W_NS}p"):
            texts: list[str] = []
            imgs_in_p: list[str] = []
            for child in p.iter():
                tag = child.tag.split("}")[-1] if "}" in child.tag else child.tag
                if tag == "t" and child.text:
                    texts.append(child.text)
                if tag == "blip":
                    embed = child.get(f"{R_NS}embed")
                    if embed in rid_to_media:
                        imgs_in_p.append(rid_to_media[embed])

            text = "".join(texts).strip()
            if text or imgs_in_p:
                if text:
                    if current_text or current_images:
                        pages.append((current_text, current_images))
                    current_text = text
                    current_images = imgs_in_p[:]
                else:
                    current_images.extend(imgs_in_p)

        if current_text or current_images:
            pages.append((current_text, current_images))

        media_in_order = [imgs[0] for _, imgs in pages if imgs]

        if len(media_in_order) != len(IMAGE_FILES):
            raise SystemExit(
                f"Docx has {len(media_in_order)} images, expected {len(IMAGE_FILES)}"
            )

        IMAGES_DIR.mkdir(parents=True, exist_ok=True)
        for media_path, filename in zip(media_in_order, IMAGE_FILES):
            (IMAGES_DIR / filename).write_bytes(zf.read(media_path))

    print(f"Restored {len(IMAGE_FILES)} images from docx")


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
        return strip_bottom_banner(trim_margins(im))

    def bbox_area(comp: tuple[int, int, int, int, int]) -> int:
        _, minx, miny, maxx, maxy = comp
        return (maxx - minx + 1) * (maxy - miny + 1)

    largest = max(components, key=bbox_area)
    content_ratio = largest[0] / content_pixels

    # One connected scene (single dish or platter): trim empty margins.
    if len(components) == 1 or content_ratio > 0.72:
        return strip_bottom_banner(trim_margins(im))

    _, minx, miny, maxx, maxy = largest
    pad = 4
    left = max(0, minx - pad) * scale
    top = max(0, miny - pad) * scale
    right = min(sw - 1, maxx + pad) * scale + scale
    bottom = min(sh - 1, maxy + pad) * scale + scale
    return strip_bottom_banner(im.crop((left, top, right, bottom)))


def main() -> None:
    import sys

    if "--no-restore" not in sys.argv:
        restore_from_docx()
    files = sorted(
        p for p in IMAGES_DIR.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg"}
    )
    for path in files:
        cropped = crop_to_main_photo(Image.open(path))
        cropped.save(path)
        print(f"{path.name}: {cropped.size[0]}x{cropped.size[1]}")

    print(f"Processed {len(files)} images")


if __name__ == "__main__":
    main()
