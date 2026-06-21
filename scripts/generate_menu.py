#!/usr/bin/env python3
"""Generate src/data/menu.js from the Italiano Tira menu docx."""
from __future__ import annotations

import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = Path("/Users/saebabukhet/Downloads/תפריט תמונות עבור איטליאנו -מג'ד עיראקי.docx")
OUT = ROOT / "src" / "data" / "menu.js"
IMAGES_DIR = ROOT / "public" / "menu-images"

CATEGORIES = [
    {"id": "breakfast", "name": {"he": "ארוחות בוקר איטלקיות", "ar": "افطارات ايطالية"}},
    {"id": "starters", "name": {"he": "מנות ראשונות", "ar": "وجبات أولى"}},
    {"id": "salads", "name": {"he": "סלטים", "ar": "سلطات"}},
    {"id": "main-italian", "name": {"he": "מנות עיקריות - מטבח איטלקי", "ar": "وجبات رئيسية - المطبخ الإيطالي"}},
    {"id": "main-chef", "name": {"he": "מנות עיקריות - מטבח השף", "ar": "وجبات رئيسية - مطبخ الشيف"}},
    {"id": "burgers", "name": {"he": "המבורגר איטליאנו מיוחד", "ar": "برجر ايطاليانو المميز"}},
]

# Manual price overrides (item id -> display label)
PRICE_LABELS = {
    "ftwr-zwjy-frdy": "69/129",
}

# Image filenames in docx menu order (matches extracted public/menu-images)
IMAGE_FILES = [
    "ftwr-zwjy-frdy.png",
    "ftwr-sytsylyany.png",
    "krbatshw-fyla-ajl.png",
    "krbatshw-slmwn.png",
    "swshy-brjr.png",
    "fylw-altyn-alaytaly-krym.png",
    "qrnbyt-kransh-balbankw.png",
    "shryms-blak-tayjr.png",
    "ajnha-aytalyanw.png",
    "badhnjan-bldy.png",
    "ftr-albwrtwbylw-bjbn-alrykwta.png",
    "kba-aytalyanw.png",
    "albakyj-1.png",
    "albakyj-2.png",
    "krat-albtata-mn-twskana.png",
    "tshyzy-tshybs.png",
    "hwm-frayz.png",
    "mydalywny-shrms-balkafyar.png",
    "asaba-almwtzaryla.png",
    "mklwt-tshykn-najts.png",
    "brwskata-kabryza-mylanw.png",
    "jardn-dylwks.png",
    "slta-alandyf.png",
    "slta-hlwmy.png",
    "slta-alqysr.png",
    "slta-aytalyanw.png",
    "slta-alsytsylyany.png",
    "slta-altbwla.png",
    "slta-ywnanya.png",
    "slta-almlywn-dwlar.png",
    "slta-albntsanyla.jpeg",
    "rafywly-4-ajban.png",
    "rafywly-btata-hlwa.png",
    "rafywly-btata-bkrym-albtata-alhlwa-wjbn-almyskarbwnya.png",
    "lazanya-bwlwnyz-fwr-syzwnz.png",
    "basta-byny-alfrydw.png",
    "basta-byny-bystw.png",
    "fwtwtshyny-krbwnara.png",
    "fwtwtshyny-sytsylyany.png",
    "fwtwshyny-krym-alslmwn.png",
    "fwtwtshyny-aytalyanw.png",
    "fwtwtshyny-trafl-kstnaa-wsdr-aldjaj.png",
    "nywky-aytalyanw-kstnaa.png",
    "nywky-aytalyanw.png",
    "nywky-awly-awlyw.png",
    "fwkatsha-ma-mqblat.png",
    "fwkatsha-brjr.png",
    "fwkatsha-ytalya.png",
    "bytsa-mrjryta.png",
    "jbyta-asadw.png",
    "styk-fylyh-alajl-almatq.png",
    "styk-antrykwt-arjntyny.png",
    "shnytsl-fylyh-alajl.png",
    "kbab-aytalyanw.png",
    "shnytsl-sdr-djaj.png",
    "styk-sdr-djaj.png",
    "skalwb-aytalyanw.png",
    "strwjwnwf-aldjaj.png",
    "fwlwstyr.png",
    "kbda-aldjaj-alaytalya.png",
    "nwdlz-aytalyanw.png",
    "fylyh-slmwn-aytalyanw.png",
    "slmwn-mshwy.png",
    "fkhara-alslmwn-balkhdar.png",
    "fkhara-fwakh-bhr-twskana.png",
    "shryms-bzbda-bdhwr-albndwra.png",
    "brjr-aytalyanw.png",
    "brjr-kryzy-man.png",
    "brjr-dwrytws.png",
    "brjr-tksas.jpeg",
]

HEBREW_NAMES = [
    "ארוחת בוקר זוגית / אישית",
    "ארוחת בוקר סיציליאנית",
    "קרפצ'יו פילה עגל",
    "קרפצ'יו סלמון",
    "סושי בורגר",
    "פילו תאנה איטלקי עם קרם",
    "כרובית קריספי בפנקו",
    "שרימפס בלאק טייגר",
    "כנפיים איטליאנו",
    "חצילים ביתיים",
    "פטריות פורטובלו עם ריקוטה",
    "קובה איטליאנו",
    "חבילה 1",
    "חבילה 2",
    "כדורי תפוחי אדמה טוסקנים",
    "צ'יזי צ'יפס",
    "הום פרייז",
    "מדליוני שרימפס עם קוויאר",
    "אצבעות מוצרלה",
    "מיקס נאגטס עוף",
    "ברוסקטה קפרזה מילאנו",
    "גארדן דלוקס",
    "סלט צ'יקורי",
    "סלט חלומי",
    "סלט קיסר",
    "סלט איטליאנו",
    "סלט סיציליאני",
    "סלט טאבולה",
    "סלט יווני",
    "סלט מיליון דולר",
    "סלט פנטסנילה",
    "רביולי ארבע גבינות",
    "רביולי תפוחי אדמה מתוקים",
    "רביולי תפוחי אדמה בקרם תפוחי אדמה מתוקים ומסקרפונה",
    "לזניה בולונז / ארבע עונות",
    "פסטה פנה אלפרדו",
    "פסטה פנה פסטו",
    "פטוצ'יני קרבונרה",
    "פטוצ'יני סיציליאני",
    "פטוצ'יני ברוטב קרם סלמון",
    "פטוצ'יני איטליאנו",
    "פטוצ'יני טרופל ערמונים וחזה עוף",
    "ניוקי איטליאני ערמונים",
    "ניוקי איטליאני",
    "ניוקי אוליו אוליו",
    "פוקצ'ה עם מנות פתיחה",
    "פוקצ'ה בורגר",
    "פוקצ'ה איטלקית",
    "פיצה מרגריטה",
    "ג'יביטה אסאדו",
    "סטייק פילה עגל מיושן",
    "סטייק אנטריקוט ארגנטינאי",
    "שניצל פילה עגל",
    "קבב איטליאנו",
    "שניצל חזה עוף",
    "סטייק חזה עוף",
    "סקאלופ איטליאנו",
    "סטרוגנוף עוף",
    "וולוון עוף",
    "כבד עוף איטלקי",
    "נודלס איטליאני",
    "פילה סלמון איטליאני",
    "סלמון צלוי",
    "סיר סלמון עם ירקות",
    "סיר פירות ים טוסקני",
    "שרימפס בחמאת עגבניות שרי",
    "בורגר איטליאנו",
    "בורגר קרייזי מאן",
    "בורגר דוריטוס",
    "בורגר טקסס",
]

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def extract_paragraphs(docx_path: Path) -> list[str]:
    with zipfile.ZipFile(docx_path) as zf:
        root = ET.fromstring(zf.read("word/document.xml"))
    paras: list[str] = []
    for p in root.iter(f"{W_NS}p"):
        texts: list[str] = []
        for t in p.iter(f"{W_NS}t"):
            if t.text:
                texts.append(t.text)
            if t.tail:
                texts.append(t.tail)
        line = "".join(texts).strip()
        if line:
            paras.append(line)
    return paras


def parse_menu_lines(paras: list[str]) -> list[tuple[str, str]]:
    """Return (category_id, raw_line) for each menu item."""
    skip_exact = {"كلازيون"}
    category_by_header = {
        "افطارات ايطالية": "breakfast",
        "وجبات أولى": "starters",
        "سلطات": "salads",
    }
    burger_header = "برجر ايطاليانو المميز"

    current_cat: str | None = None
    main_header_count = 0
    items: list[tuple[str, str]] = []

    for line in paras:
        if line in skip_exact:
            continue
        if line in category_by_header:
            current_cat = category_by_header[line]
            continue
        if line == "وجبات رئيسية":
            main_header_count += 1
            current_cat = "main-italian" if main_header_count == 1 else "main-chef"
            continue
        if line.startswith("(من"):
            continue
        if line == burger_header:
            current_cat = "burgers"
            continue

        if current_cat is None:
            raise ValueError(f"Item before category: {line!r}")
        items.append((current_cat, line))

    return items


def parse_name_price(raw: str) -> tuple[str, int | None]:
    line = " ".join(raw.split())
    parts = line.rsplit(" ", 1)
    if len(parts) == 2 and parts[1].isdigit():
        return parts[0], int(parts[1])
    return line, None


def js_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def write_menu_js(items: list[dict]) -> None:
    lines: list[str] = []
    lines.append("export const categories = [")
    for i, cat in enumerate(CATEGORIES):
        comma = "," if i < len(CATEGORIES) - 1 else ""
        lines.append(
            f'  {{ id: {js_string(cat["id"])}, name: {{ he: {js_string(cat["name"]["he"])}, ar: {js_string(cat["name"]["ar"])} }} }}{comma}'
        )
    lines.append("];")
    lines.append("")
    lines.append("export const menuItems = [")
    for i, item in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        price = "null" if item["price"] is None else str(item["price"])
        lines.append("  {")
        lines.append(f'    id: {js_string(item["id"])},')
        lines.append(f'    categoryId: {js_string(item["categoryId"])},')
        lines.append(
            f'    name: {{ he: {js_string(item["name"]["he"])}, ar: {js_string(item["name"]["ar"])} }},'
        )
        lines.append(
            f'    description: {{ he: {js_string(item["description"]["he"])}, ar: {js_string(item["description"]["ar"])} }},'
        )
        lines.append(f"    price: {price},")
        if item.get("priceLabel"):
            lines.append(f'    priceLabel: {js_string(item["priceLabel"])},')
        lines.append(f'    image: {js_string(item["image"])},')
        lines.append(f'    recommended: {"true" if item["recommended"] else "false"},')
        lines.append(f"  }}{comma}")
    lines.append("];")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    if not DOCX.is_file():
        raise SystemExit(f"Docx not found: {DOCX}")

    paras = extract_paragraphs(DOCX)
    parsed = parse_menu_lines(paras)

    if len(parsed) != len(IMAGE_FILES):
        raise SystemExit(
            f"Expected {len(IMAGE_FILES)} items from docx, got {len(parsed)}"
        )
    if len(parsed) != len(HEBREW_NAMES):
        raise SystemExit(
            f"HEBREW_NAMES length {len(HEBREW_NAMES)} != items {len(parsed)}"
        )

    menu_items: list[dict] = []
    for idx, ((category_id, raw), image_file, he_name) in enumerate(
        zip(parsed, IMAGE_FILES, HEBREW_NAMES)
    ):
        ar_name, price = parse_name_price(raw)
        image_path = IMAGES_DIR / image_file
        if not image_path.is_file():
            raise SystemExit(f"Missing image: {image_path}")

        item_id = Path(image_file).stem
        menu_items.append(
            {
                "id": item_id,
                "categoryId": category_id,
                "name": {"he": he_name, "ar": ar_name},
                "description": {"he": "", "ar": ""},
                "price": price,
                "priceLabel": PRICE_LABELS.get(item_id),
                "image": f"/menu-images/{image_file}",
                "recommended": False,
            }
        )

    write_menu_js(menu_items)

    counts: dict[str, int] = {}
    for item in menu_items:
        counts[item["categoryId"]] = counts.get(item["categoryId"], 0) + 1

    print(f"Wrote {OUT} ({len(menu_items)} items)")
    for cat in CATEGORIES:
        print(f"  {cat['id']}: {counts.get(cat['id'], 0)}")


if __name__ == "__main__":
    main()
