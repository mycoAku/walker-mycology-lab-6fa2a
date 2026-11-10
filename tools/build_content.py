#!/usr/bin/env python3
"""Validate editor content and generate the JavaScript used by the static site."""

import html
import json
from pathlib import Path
import re
from urllib.parse import quote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
CATEGORIES = {"PhD", "MSc", "Honors", "Undergraduate trainees", "Alumni"}
LAYOUTS = {"side-by-side", "side-by-side-compact", "stacked", "stacked-compact", "full-image"}
POSITIONS = {"center center", "center top", "center 22%"}


def text(value):
    return html.escape(value or "", quote=True)


def rich_text(value):
    value = text(value)
    value = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", value)
    value = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", value)
    return value.replace("\n", "<br>")


def url(value, label, *, image=False):
    if not value:
        return ""
    if re.search(r"[\x00-\x1f\x7f\\]", value):
        raise ValueError(f"{label}: URL contains unsupported characters")
    parsed = urlsplit(value)
    if parsed.scheme in {"http", "https"} and parsed.netloc:
        return text(quote(value, safe=":/?#[]@!$&*+,;=%~-._"))
    if image and not parsed.scheme and not parsed.netloc and value.lstrip("/").startswith("uploads/") and ".." not in parsed.path.split("/"):
        return text(quote(value.lstrip("/"), safe="/?#[]@!$&*+,;=%~-._"))
    raise ValueError(f"{label}: use an http(s) URL" + (" or an uploads/ image" if image else ""))


def required(entry, key, label):
    value = entry.get(key)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label}: {key} is required")
    return value


def build(source=ROOT / "content" / "website.json", destination=ROOT / "content.generated.js"):
    content = json.loads(source.read_text())
    members = []
    for index, entry in enumerate(content["members"], 1):
        label = f"Member {index}"
        category = required(entry, "category", label)
        if category not in CATEGORIES:
            raise ValueError(f"{label}: unknown category {category!r}")
        position = entry.get("imagePosition", "")
        if position and position not in POSITIONS:
            raise ValueError(f"{label}: unknown photo position {position!r}")
        special = entry.get("specialProfile") or ""
        if special not in {"", "kendra"}:
            raise ValueError(f"{label}: unknown special profile")
        members.append({
            "category": category,
            "name": text(required(entry, "name", label)),
            "role": text(required(entry, "role", label)),
            "bio": rich_text(entry.get("bio", "")),
            "image": url(entry.get("image", ""), label, image=True),
            "imagePosition": position or "center center",
            "artwork": url(entry.get("artwork", ""), label, image=True),
            "artworkAlt": text(entry.get("artworkAlt", "")),
            "artworkCaption": rich_text(entry.get("artworkCaption", "")),
            "specialProfile": special,
        })

    news = []
    for index, entry in enumerate(content["news"] or [], 1):
        label = f"News story {index}"
        layout = entry.get("layout") or "side-by-side"
        if layout not in LAYOUTS:
            raise ValueError(f"{label}: unknown layout {layout!r}")
        news.append([
            text(required(entry, "label", label)), rich_text(required(entry, "title", label)), "↗",
            url(entry.get("url", ""), label), html.unescape(url(entry.get("image", ""), label, image=True)),
            entry.get("imageAlt", ""), layout, entry.get("home", True),
            text(entry.get("date", "")), entry.get("newsPage", True), text(entry.get("summary", "")),
        ])

    archive = []
    for index, entry in enumerate(content["archive"] or [], 1):
        label = f"Archive story {index}"
        archive.append({
            "label": text(required(entry, "label", label)),
            "title": text(required(entry, "title", label)),
            "date": text(entry.get("date", "")),
            "url": url(required(entry, "url", label), label),
            "coverageUrl": url(entry.get("coverageUrl", ""), label),
            "coverageLabel": text(entry.get("coverageLabel", "")),
            "image": url(entry.get("image", ""), label, image=True),
            "imageAlt": text(entry.get("imageAlt", "")),
        })

    resources = []
    for index, entry in enumerate(content["resources"] or [], 1):
        label = f"Resource {index}"
        resources.append({
            "number": str(index).zfill(2),
            "name": text(required(entry, "name", label)),
            "url": url(required(entry, "url", label), label),
            "image": url(entry.get("image", ""), label, image=True),
        })
    contacts = {key: url(required(content["contacts"], key, "Contact links"), "Contact links")
                for key in ("admissions", "society", "instagram", "shop")}
    result = {"members": members, "news": news, "archive": archive, "resources": resources, "contacts": contacts}
    output = "const siteContent = " + json.dumps(result, ensure_ascii=False, indent=2) + ";\n"
    destination.write_text(output)
    print(f"Built {len(members)} member profiles, {len(news)} news stories, {len(resources)} resources.")


if __name__ == "__main__":
    build()
